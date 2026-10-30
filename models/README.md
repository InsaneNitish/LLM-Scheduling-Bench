# Local Model Directory

This folder holds the local model weights for the real LLM inference backend (`BACKEND=real`).

## Expected Final Layout

```
models/Qwen2.5-0.5B-Instruct/
├── config.json
├── generation_config.json
├── model.safetensors
├── tokenizer.json
├── tokenizer_config.json
├── vocab.json
└── merges.txt
```

The expected layout consists of `models/Qwen2.5-0.5B-Instruct/config.json`, tokenizer files (`tokenizer.json`, `tokenizer_config.json`, `vocab.json`, `merges.txt`), and `model.safetensors`.

## Download Commands

First, install the Hugging Face Hub CLI:
```bash
pip install -U huggingface_hub
```

Then download the model weights:
```bash
hf download Qwen/Qwen2.5-0.5B-Instruct --local-dir models/Qwen2.5-0.5B-Instruct
```

Alternative download via Python:
```bash
python -c "from huggingface_hub import snapshot_download; snapshot_download('Qwen/Qwen2.5-0.5B-Instruct', local_dir='models/Qwen2.5-0.5B-Instruct')"
```

## Storage & Container Notes

- **Size:** Approximately 1 GB (the `model.safetensors` file is ~988 MB).
- **Git Ignore:** The `models/Qwen2.5-0.5B-Instruct/` folder is git-ignored (via `.gitignore`) so large binary model weights are never committed or bundled in submissions.
- **Docker Mount:** When running the real model inside Docker, this folder is mounted read-only into the container at `/models` (specifically `/models/Qwen2.5-0.5B-Instruct:ro`).
