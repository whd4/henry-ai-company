# ═══════════════════════════════════════════════════════════════
# HENRY AI — HARNESS TOGGLE v1.0
# Switch between HENRY ops harness and gstack YC dev harness
# Usage: .\toggle-harness.ps1 [henry|gstack|both|status]
# ═══════════════════════════════════════════════════════════════

param([string]$Mode = "status")

$CLAUDE_MD = "$env:USERPROFILE\.claude\CLAUDE.md"
$BACKUP = "$env:USERPROFILE\.claude\CLAUDE.md.backup"
$GSTACK_DIR = "$env:USERPROFILE\.claude\skills\gstack"
$HENRY_DIR = "$env:USERPROFILE\.claude\skills\henry-agent"

switch ($Mode.ToLower()) {
    "henry" {
        Write-Host "  HARNESS: HENRY (Operations)" -ForegroundColor Yellow
    }
    "gstack" {
        Write-Host "  HARNESS: GSTACK (YC Dev)" -ForegroundColor DarkYellow
    }
    "both" {
        Write-Host "  HARNESS: COMBINED" -ForegroundColor Magenta
    }
    "status" {
        Write-Host "  Run: .\toggle-harness.ps1 [henry|gstack|both]" -ForegroundColor Gray
    }
}
# Full script deployed locally at C:\ZeroHumanCompany\scripts\toggle-harness.ps1
