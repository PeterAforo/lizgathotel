# ===========================================
# LIZGAT Hotel - Local Build & Deploy to cPanel
# ===========================================
# This script builds the app locally and pushes the
# standalone output to a 'deploy' branch on GitHub.
# Then you pull that branch on the server via cPanel Git.

$ErrorActionPreference = "Stop"

Write-Host "=== Building LIZGAT Hotel for Deployment ===" -ForegroundColor Cyan

# 1. Generate Prisma client
Write-Host ">> Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate
if ($LASTEXITCODE -ne 0) { throw "Prisma generate failed" }

# 2. Build Next.js
Write-Host ">> Building Next.js app..." -ForegroundColor Yellow
npx next build
if ($LASTEXITCODE -ne 0) { throw "Next.js build failed" }

# 3. Prepare deploy directory
Write-Host ">> Preparing deploy files..." -ForegroundColor Yellow
$deployDir = "deploy-output"
if (Test-Path $deployDir) { Remove-Item -Recurse -Force $deployDir }
New-Item -ItemType Directory -Path $deployDir | Out-Null

# Copy standalone output
Copy-Item -Recurse ".next\standalone\*" $deployDir

# Copy static files (not included in standalone)
New-Item -ItemType Directory -Path "$deployDir\.next\static" -Force | Out-Null
Copy-Item -Recurse ".next\static\*" "$deployDir\.next\static"

# Copy public folder
if (Test-Path "public") {
    Copy-Item -Recurse "public" "$deployDir\public"
}

# Copy app.js (Passenger entry point)
Copy-Item "app.js" "$deployDir\app.js"

# Copy prisma schema (needed at runtime)
New-Item -ItemType Directory -Path "$deployDir\prisma" -Force | Out-Null
Copy-Item "prisma\schema.prisma" "$deployDir\prisma\schema.prisma"

# Copy SQL files for reference
Copy-Item "prisma\schema.sql" "$deployDir\prisma\schema.sql" -ErrorAction SilentlyContinue
Copy-Item "prisma\seed.sql" "$deployDir\prisma\seed.sql" -ErrorAction SilentlyContinue

Write-Host ">> Deploy files prepared in '$deployDir'" -ForegroundColor Green
Write-Host ""
Write-Host "=== Next Steps ===" -ForegroundColor Cyan
Write-Host "1. Upload the contents of '$deployDir' to /home/lizgat/lizgathotel/ via cPanel File Manager"
Write-Host "2. Run schema.sql and seed.sql in phpMyAdmin"
Write-Host "3. Create .env file on server with correct DATABASE_URL"
Write-Host "4. Restart the Node.js app in cPanel"
Write-Host ""
Write-Host "=== Build Complete! ===" -ForegroundColor Green
