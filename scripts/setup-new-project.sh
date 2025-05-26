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

# Load environment variables
Get-Content .env | ForEach-Object {
    if ($_ -match "^([^#][^=]+)=(.*)$") {
        [Environment]::SetEnvironmentVariable($matches[1], $matches[2])
    }
}

$SUPABASE_URL = [Environment]::GetEnvironmentVariable("NEXT_PUBLIC_SUPABASE_URL")
$SUPABASE_ANON_KEY = [Environment]::GetEnvironmentVariable("NEXT_PUBLIC_SUPABASE_ANON_KEY")

if (-not $SUPABASE_URL -or -not $SUPABASE_ANON_KEY) {
    Write-Host "❌ Supabase environment variables not found in .env" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Supabase configuration loaded" -ForegroundColor Green
Write-Host "📍 Supabase URL: $SUPABASE_URL" -ForegroundColor Yellow

Write-Host ""
Write-Host "🚀 NEXT STEPS:" -ForegroundColor Cyan
Write-Host "1. Go to your Supabase dashboard: $SUPABASE_URL" -ForegroundColor White
Write-Host "2. Navigate to SQL Editor" -ForegroundColor White
Write-Host "3. Copy and paste the contents of: scripts/complete-axion-aetherforge-schema.sql" -ForegroundColor White
Write-Host "4. Execute the entire script" -ForegroundColor White
Write-Host "5. Verify all tables are created successfully" -ForegroundColor White
Write-Host ""
Write-Host "📋 SCHEMA INCLUDES:" -ForegroundColor Cyan
Write-Host "   • User management & authentication" -ForegroundColor White
Write-Host "   • AetherForge agent system (agents, blueprints, habitats)" -ForegroundColor White
Write-Host "   • TMS business tables (customers, carriers, jobs, invoices)" -ForegroundColor White
Write-Host "   • Row Level Security (RLS) policies" -ForegroundColor White
Write-Host "   • Performance indexes" -ForegroundColor White
Write-Host "   • Auto-generation functions & triggers" -ForegroundColor White
Write-Host "   • Initial data seeding" -ForegroundColor White
Write-Host ""
Write-Host "⚡ Ready to build the Axion TMS empire! 🔥" -ForegroundColor Green 