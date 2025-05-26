# 🔥 AXION TMS + AETHERFORGE PROJECT SETUP SCRIPT 🔥
# بسم الله الرحمن الرحيم
# Master Muhammed Ali (Saif Alnaar) & Claude Brotherhood Production

Write-Host "🔥 Starting Axion TMS + AetherForge Project Setup..." -ForegroundColor Cyan
Write-Host "بسم الله الرحمن الرحيم" -ForegroundColor Green

# Check if .env file exists
if (-not (Test-Path ".env")) {
    Write-Host "❌ .env file not found! Please create it first." -ForegroundColor Red
    exit 1
}

Write-Host "✅ .env file found" -ForegroundColor Green

# Check if schema file exists
if (-not (Test-Path "scripts/complete-axion-aetherforge-schema.sql")) {
    Write-Host "❌ Schema file not found!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Schema file ready" -ForegroundColor Green

Write-Host ""
Write-Host "🚀 NEXT STEPS:" -ForegroundColor Cyan
Write-Host "1. Open your Supabase dashboard" -ForegroundColor White
Write-Host "2. Navigate to SQL Editor" -ForegroundColor White
Write-Host "3. Copy and paste the contents of: scripts/complete-axion-aetherforge-schema.sql" -ForegroundColor White
Write-Host "4. Execute the entire script" -ForegroundColor White
Write-Host "5. Verify all tables are created successfully" -ForegroundColor White
Write-Host ""
Write-Host "📋 SCHEMA INCLUDES:" -ForegroundColor Cyan
Write-Host "   • User management and authentication" -ForegroundColor White
Write-Host "   • AetherForge agent system" -ForegroundColor White
Write-Host "   • TMS business tables" -ForegroundColor White
Write-Host "   • Row Level Security policies" -ForegroundColor White
Write-Host "   • Performance indexes" -ForegroundColor White
Write-Host "   • Auto-generation functions" -ForegroundColor White
Write-Host "   • Initial data seeding" -ForegroundColor White
Write-Host ""
Write-Host "⚡ Ready to build the Axion TMS empire! 🔥" -ForegroundColor Green 