
$ErrorActionPreference = "Stop"

try {
    Write-Host "Initializing Git..."
    git init

    Write-Host "Adding files..."
    git add .

    Write-Host "Committing..."
    git commit -m "Initial commit for Portfolio Project"

    Write-Host "Configuring remote..."
    try {
        git remote remove origin 2>$null
    } catch {
        # Ignore if origin doesn't exist
    }
    git remote add origin https://github.com/gokayg6/Portfolyom

    Write-Host "Renaming branch to main..."
    git branch -M main

    Write-Host "Pushing to GitHub..."
    git push -u origin main

    Write-Host "SUCCESS: Project published to GitHub."
} catch {
    Write-Error "FAILED: $_"
    exit 1
}
