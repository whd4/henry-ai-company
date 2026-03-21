# HENRY OS — Windows Startup. Right-click -> Run with PowerShell
$core  = "$env:USERPROFILE\Development\henry-ai-company\henry-os\henry-core"
$voice = "$env:USERPROFILE\Development\henry-ai-company\henry-os\voice\henry-voice.html"
Write-Host 'HENRY OS Starting...' -ForegroundColor Green
if (-not (Test-Path "$core\node_modules")) {
  Write-Host 'Installing npm deps...' -ForegroundColor Cyan
  Push-Location $core; npm install --silent; Pop-Location
}
$proc = Start-Process node -ArgumentList 'src/index.js' -WorkingDirectory $core -WindowStyle Hidden -PassThru
Write-Host "henry-core running (PID $($proc.Id))" -ForegroundColor Green
if (Test-Path $voice) { Start-Process $voice }
Write-Host 'Restart Claude Desktop to activate MCP.' -ForegroundColor Yellow
Write-Host 'Press any key to stop...' -ForegroundColor DarkGray
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
