# ============================================================
# LLM Scheduler Bench -- Package Submission Script (PowerShell 5.1+)
# Creates clean, verified .zip bundle for academic submission
# ============================================================

$ErrorActionPreference = "Stop"

# Determine project root and output zip path (one level above project root)
$ProjectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$ParentDir = (Resolve-Path (Join-Path $ProjectRoot "..")).Path
$ZipPath = Join-Path $ParentDir "LLM_Scheduler_Bench_Submission.zip"

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "LLM Scheduler Bench -- Packaging Submission Bundle" -ForegroundColor Cyan
Write-Host "Project Root: $ProjectRoot" -ForegroundColor Cyan
Write-Host "Target Zip:   $ZipPath" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan

# 1. Remove existing output zip if present
if (Test-Path $ZipPath) {
    Remove-Item $ZipPath -Force
    Write-Host "Removed existing zip at $ZipPath" -ForegroundColor Yellow
}

# Also clean up any accidental old submission zip inside project root
$OldInternalZip = Join-Path $ProjectRoot "LLM_Scheduler_Bench_Submission.zip"
if (Test-Path $OldInternalZip) {
    Remove-Item $OldInternalZip -Force
}

# 2. Use System.IO.Compression to ensure forward slashes and full Linux compatibility
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$zipStream = [System.IO.File]::Open($ZipPath, [System.IO.FileMode]::Create)
$archive = New-Object System.IO.Compression.ZipArchive($zipStream, [System.IO.Compression.ZipArchiveMode]::Create)

try {
    # Retrieve all files including hidden files
    $allFiles = Get-ChildItem -Path $ProjectRoot -Recurse -Force -File

    $addedCount = 0
    foreach ($file in $allFiles) {
        # Compute forward-slash relative path from project root
        $relPath = $file.FullName.Substring($ProjectRoot.Length).TrimStart('\', '/')
        $relPath = $relPath.Replace('\', '/')

        # Apply exclusion rules:
        # Exclude: .git/, any __pycache__/, .pytest_cache/, .venv/, dashboard/node_modules/, dashboard/dist/, *.zip, *.pyc
        if ($relPath.StartsWith(".git/") -or $relPath -eq ".git") { continue }
        if ($relPath.Contains("/__pycache__/") -or $relPath.StartsWith("__pycache__/")) { continue }
        if ($relPath.Contains("/.pytest_cache/") -or $relPath.StartsWith(".pytest_cache/")) { continue }
        if ($relPath.Contains("/.venv/") -or $relPath.StartsWith(".venv/")) { continue }
        if ($relPath.Contains("/venv/") -or $relPath.StartsWith(".venv/")) { continue }
        if ($relPath.StartsWith("dashboard/node_modules/")) { continue }
        if ($relPath.StartsWith("dashboard/dist/")) { continue }
        if ($relPath.EndsWith(".zip")) { continue }
        if ($relPath.EndsWith(".pyc")) { continue }

        # Exclude everything under models/ except models/.gitkeep and models/README.md
        if ($relPath.StartsWith("models/")) {
            if ($relPath -ne "models/.gitkeep" -and $relPath -ne "models/README.md") {
                continue
            }
        }

        # Add file entry with forward slashes
        [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive, $file.FullName, $relPath, [System.IO.Compression.CompressionLevel]::Optimal) | Out-Null
        $addedCount++
    }
}
finally {
    $archive.Dispose()
    $zipStream.Dispose()
}

Write-Host "Created archive with $addedCount packaged files." -ForegroundColor Green

# 3. Reopen archive and verify entries strictly
Write-Host "`nVerifying archive integrity and contents..." -ForegroundColor Yellow
$verifyStream = [System.IO.File]::OpenRead($ZipPath)
$verifyArchive = New-Object System.IO.Compression.ZipArchive($verifyStream, [System.IO.Compression.ZipArchiveMode]::Read)

try {
    $entryNames = @($verifyArchive.Entries | ForEach-Object { $_.FullName })

    # Required entries that MUST exist
    $requiredEntries = @(
        "Dockerfile",
        "docker-compose.yml",
        "README.md",
        "requirements.txt",
        "requirements-real.txt",
        ".gitignore",
        ".dockerignore",
        "src/api/server.py",
        "src/backend/real.py",
        "scripts/check_model.py",
        "scripts/demo_curl.sh",
        "scripts/demo_curl.ps1",
        "scripts/concurrent_demo.py",
        "scripts/package_submission.ps1",
        "models/README.md",
        "configs/experiments.yaml"
    )

    foreach ($req in $requiredEntries) {
        if (-not ($entryNames -contains $req)) {
            throw "Verification Error: Required entry '$req' was not found in the package zip!"
        }
    }

    # Verify no entry has backslashes or model weights
    foreach ($name in $entryNames) {
        if ($name.Contains("\")) {
            throw "Verification Error: Entry '$name' contains backslash separators!"
        }
        if ($name.StartsWith("models/Qwen")) {
            throw "Verification Error: Model weight entry '$name' was included in the package zip!"
        }
    }

    $finalEntryCount = $entryNames.Length
}
finally {
    $verifyArchive.Dispose()
    $verifyStream.Dispose()
}

# 4. Report statistics
$zipFileItem = Get-Item $ZipPath
$sizeMB = [math]::Round($zipFileItem.Length / 1MB, 2)

Write-Host "============================================================" -ForegroundColor Green
Write-Host "Verification Passed!" -ForegroundColor Green
Write-Host "Submission Zip: $ZipPath" -ForegroundColor Green
Write-Host "Total Entries:  $finalEntryCount" -ForegroundColor Green
Write-Host "Archive Size:   $sizeMB MB" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Green
