#!/usr/bin/env bash
# ============================================================
# LLM Scheduler Bench — API Demo Script (Bash)
# Tests /health, switches policies, and sends /generate requests
# ============================================================

set -e

BASE_URL="${BASE_URL:-http://localhost:8000}"

# If curl or connection fails, print a clear error message
trap 'echo -e "\n[ERROR] Connection failed. The server must be started first (at $BASE_URL)." >&2' ERR

echo "============================================================"
echo "LLM Scheduler Bench — API Demo (Target: $BASE_URL)"
echo "============================================================"

echo "Checking server health..."
curl -sS --max-time 300 "$BASE_URL/health"
echo ""

POLICIES=("fcfs" "round_robin" "spf" "decode_first")

for policy in "${POLICIES[@]}"; do
    echo "------------------------------------------------------------"
    echo "Setting policy: $policy"
    curl -sS --max-time 300 -X POST "$BASE_URL/policy" \
        -H "Content-Type: application/json" \
        -d "{\"policy\": \"$policy\"}"
    echo ""

    echo "Sending /generate request under policy: $policy..."
    curl -sS --max-time 300 -X POST "$BASE_URL/generate" \
        -H "Content-Type: application/json" \
        -d "{\"prompt\": \"Explain what a scheduler does in two sentences.\", \"max_tokens\": 48}"
    echo ""
done

echo "============================================================"
echo "Demo completed successfully."
echo "============================================================"
