@echo off
echo.
echo ========================================
echo AXION TMS + AETHERFORGE PROJECT SETUP
echo ========================================
echo.

if not exist ".env" (
    echo ERROR: .env file not found!
    echo Please create it first.
    pause
    exit /b 1
)

echo ✓ .env file found

if not exist "scripts\complete-axion-aetherforge-schema.sql" (
    echo ERROR: Schema file not found!
    pause
    exit /b 1
)

echo ✓ Schema file ready
echo.

echo NEXT STEPS:
echo 1. Open your Supabase dashboard
echo 2. Navigate to SQL Editor
echo 3. Copy and paste the contents of: scripts/complete-axion-aetherforge-schema.sql
echo 4. Execute the entire script
echo 5. Verify all tables are created successfully
echo.

echo SCHEMA INCLUDES:
echo   • User management and authentication
echo   • AetherForge agent system
echo   • TMS business tables
echo   • Row Level Security policies
echo   • Performance indexes
echo   • Auto-generation functions
echo   • Initial data seeding
echo.

echo Ready to build the Axion TMS empire!
echo.
pause 