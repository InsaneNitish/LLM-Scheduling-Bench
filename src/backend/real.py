"""
RealBackend: Production-ready local LLM inference backend for Qwen2.5 on CPU.

Uses HuggingFace Transformers (AutoTokenizer + AutoModelForCausalLM) with:
- torch.float32, greedy decoding (argmax), CPU inference mode.
- Fine-grained iteration-level scheduling (chunked prefill + step-by-step decode).
- Per-request Key-Value (KV) cache management via DynamicCache.
"""
from __future__ import annotations

import logging
import os
import time
from pathlib import Path
from typing import Dict, List, Optional, Set

from src.backend.base import Backend
from src.core.request import Request

logger = logging.getLogger(__name__)


class RealBackend(Backend):
    """
    Real local LLM inference backend powered by Hugging Face Transformers.

    Executes inference on CPU with float32 precision, managing per-request
    KV caches and pending tokens across fine-grained prefill chunks and decode steps.
    """

    def __init__(self, model_path: Optional[str | Path] = None) -> None:
        # Determine model path: env var MODEL_PATH -> argument -> default path
        if model_path is None:
            env_path = os.environ.get("MODEL_PATH")
            if env_path:
                model_path = Path(env_path)
            else:
                # Default path inside Docker vs outside Docker
                docker_default = Path("/models/Qwen2.5-0.5B-Instruct")
                local_default = Path("./models/Qwen2.5-0.5B-Instruct")
                model_path = docker_default if docker_default.exists() else local_default
        else:
            model_path = Path(model_path)

        # Validate existence of model directory and configuration
        config_file = model_path / "config.json"
        if not model_path.exists() or not config_file.exists():
            raise FileNotFoundError(
                f"Model directory not found at '{model_path}'. "
                "Please download the model using:\n"
                "  hf download Qwen/Qwen2.5-0.5B-Instruct --local-dir models/Qwen2.5-0.5B-Instruct"
            )

        # Lazy import of torch and transformers
        try:
            import torch
            from transformers import AutoModelForCausalLM, AutoTokenizer
            try:
                from transformers.cache_utils import DynamicCache
            except ImportError:
                DynamicCache = None
        except ImportError as exc:
            raise ImportError(
                "RealBackend requires 'torch' and 'transformers'. "
                "Install dependencies with: pip install -r requirements-real.txt"
            ) from exc

        self._torch = torch
        self._DynamicCache = DynamicCache

        # Configure CPU threading
        num_threads = os.cpu_count() or 1
        torch.set_num_threads(num_threads)
        logger.info("RealBackend: loading model from %s (threads=%d)...", model_path, num_threads)

        # Load tokenizer and model in float32 for CPU
        self.tokenizer = AutoTokenizer.from_pretrained(str(model_path), local_files_only=True)
        self.model = AutoModelForCausalLM.from_pretrained(
            str(model_path),
            torch_dtype=torch.float32,
            local_files_only=True,
            low_cpu_mem_usage=True,
        )
        self.model.eval()

        # Collect EOS / generation stop token IDs
        self.eos_token_ids: Set[int] = set()
        if self.tokenizer.eos_token_id is not None:
            if isinstance(self.tokenizer.eos_token_id, (list, tuple, set)):
                self.eos_token_ids.update(self.tokenizer.eos_token_id)
            else:
                self.eos_token_ids.add(self.tokenizer.eos_token_id)

        for special_token in ("<|im_end|>", "<|endoftext|>"):
            tok_id = self.tokenizer.convert_tokens_to_ids(special_token)
            if tok_id is not None and tok_id != getattr(self.tokenizer, "unk_token_id", None):
                self.eos_token_ids.add(tok_id)

        # State tracking: per-request KV cache and next pending token
        self.caches: Dict[str, any] = {}
        self.pending_tokens: Dict[str, int] = {}

        logger.info(
            "RealBackend initialized successfully. EOS tokens: %s",
            sorted(list(self.eos_token_ids)),
        )

    def build_prompt_ids(self, text: str) -> List[int]:
        """
        Tokenize text using the model's chat template with generation prompt.

        Args:
            text: Raw user prompt text.

        Returns:
            List of input token IDs ready for prefill.
        """
        messages = [{"role": "user", "content": text}]
        if hasattr(self.tokenizer, "apply_chat_template") and self.tokenizer.chat_template:
            prompt_str = self.tokenizer.apply_chat_template(
                messages,
                tokenize=False,
                add_generation_prompt=True,
            )
            token_ids = self.tokenizer.encode(prompt_str, add_special_tokens=False)
        else:
            token_ids = self.tokenizer.encode(text)
        return list(token_ids)

    def prefill(self, request: Request, num_tokens: int) -> float:
        """
        Execute prefill for a request, supporting chunked prefill.

        Processes prompt_token_ids[tokens_prefilled : tokens_prefilled + num_tokens],
        updates the request's KV cache, and computes the pending next token on the
        final chunk.
        """
        if request.prompt_token_ids is None:
            if request.prompt_text:
                request.prompt_token_ids = self.build_prompt_ids(request.prompt_text)
                request.prompt_tokens = len(request.prompt_token_ids)
            else:
                raise ValueError(f"Request {request.id} has no prompt_token_ids or prompt_text.")

        start_idx = request.tokens_prefilled
        end_idx = min(len(request.prompt_token_ids), start_idx + num_tokens)
        chunk_ids = request.prompt_token_ids[start_idx:end_idx]

        if not chunk_ids:
            return 0.0

        torch = self._torch
        input_ids = torch.tensor([chunk_ids], dtype=torch.long)
        past_key_values = self.caches.get(request.id)

        t_start = time.perf_counter()
        with torch.inference_mode():
            outputs = self.model(
                input_ids=input_ids,
                past_key_values=past_key_values,
                use_cache=True,
            )
        duration = time.perf_counter() - t_start

        # Store updated KV cache
        self.caches[request.id] = outputs.past_key_values

        # If this prefill step processes the final prompt tokens, predict the first output token
        if end_idx >= len(request.prompt_token_ids):
            last_logits = outputs.logits[0, -1, :]
            next_token = int(torch.argmax(last_logits).item())
            self.pending_tokens[request.id] = next_token

        return duration

    def decode_step(self, requests: List[Request]) -> float:
        """
        Execute one decode step for active requests.

        Emits pending tokens, decodes text, checks EOS termination condition,
        and computes the subsequent token via a single forward pass.
        """
        if not requests:
            return 0.0

        torch = self._torch
        total_duration = 0.0

        for req in requests:
            token_id = self.pending_tokens.get(req.id)
            if token_id is None:
                continue

            # Emit pending token
            req.generated_token_ids.append(token_id)
            req.output_text = self.tokenizer.decode(
                req.generated_token_ids,
                skip_special_tokens=True,
            )

            # Check for EOS token termination
            if token_id in self.eos_token_ids:
                # Force request completion at the engine's next check
                req.max_output_tokens = req.tokens_generated + 1
                continue

            # If request reaches max tokens after this step, no need to compute next token
            if (req.tokens_generated + 1) >= req.max_output_tokens:
                continue

            # Autoregressive forward pass for next token
            input_ids = torch.tensor([[token_id]], dtype=torch.long)
            past_key_values = self.caches.get(req.id)

            t_step = time.perf_counter()
            with torch.inference_mode():
                outputs = self.model(
                    input_ids=input_ids,
                    past_key_values=past_key_values,
                    use_cache=True,
                )
            total_duration += (time.perf_counter() - t_step)

            self.caches[req.id] = outputs.past_key_values
            next_token = int(torch.argmax(outputs.logits[0, -1, :]).item())
            self.pending_tokens[req.id] = next_token

        return total_duration

    def release(self, request: Request) -> None:
        """Free KV cache and state for completed request."""
        self.caches.pop(request.id, None)
        self.pending_tokens.pop(request.id, None)

    def name(self) -> str:
        """Return backend identifier."""
        return "real"
