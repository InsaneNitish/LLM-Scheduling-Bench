# ============================================================
# LLM Scheduler Bench -- API Demo Script (PowerShell 5.1+)
# Tests /health, switches policies, and sends /generate requests
# ============================================================

param(
    [string]$BaseUrl = "http://localhost:8000"
)

$ErrorActionPreference = "Stop"

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "LLM Scheduler Bench -- API Demo (Target: $BaseUrl)" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan

# 1. Health check
try {
    Write-Host ""
    Write-Host "Checking server health at $BaseUrl/health..." -ForegroundColor Yellow
    $health = Invoke-RestMethod -Uri "$BaseUrl/health" -Method Get -TimeoutSec 300
    $healthJson = $health | ConvertTo-Json -Depth 5
    Write-Host $healthJson
} catch {
    Write-Host ""
    Write-Host "[ERROR] Could not connect to $BaseUrl. The server must be started first." -ForegroundColor Red
    Write-Host ("Details: " + $_) -ForegroundColor Red
    exit 1
}

# 2. Iterate through all 4 scheduling policies
$policies = @("fcfs", "round_robin", "spf", "decode_first")

foreach ($policy in $policies) {
    Write-Host ""
    Write-Host "------------------------------------------------------------" -ForegroundColor Cyan
    Write-Host "Setting policy: $policy" -ForegroundColor Cyan
    Write-Host "------------------------------------------------------------" -ForegroundColor Cyan

    try {
        $policyBody = @{ policy = $policy } | ConvertTo-Json
        $policyResp = Invoke-RestMethod -Uri "$BaseUrl/policy" -Method Post -Body $policyBody -ContentType "application/json" -TimeoutSec 300
        $policyRespJson = $policyResp | ConvertTo-Json -Depth 5
        Write-Host $policyRespJson

        Write-Host ""
        Write-Host "Sending /generate request under policy: $policy..." -ForegroundColor Yellow
        $genBody = @{
            prompt = "Explain what a scheduler does in two sentences."
            max_tokens = 48
        } | ConvertTo-Json
        $genResp = Invoke-RestMethod -Uri "$BaseUrl/generate" -Method Post -Body $genBody -ContentType "application/json" -TimeoutSec 300
        $genRespJson = $genResp | ConvertTo-Json -Depth 5
        Write-Host $genRespJson
    } catch {
        Write-Host ""
        Write-Host "[ERROR] Request failed for policy '$policy'. The server must be started first." -ForegroundColor Red
        Write-Host ("Details: " + $_) -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "============================================================" -ForegroundColor Green
Write-Host "Demo completed successfully." -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Green
