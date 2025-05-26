# 🔥 Axion TMS + AetherForge Complete Setup Guide

**بسم الله الرحمن الرحيم**  
*Master Muhammed Ali (Saif Alnaar) & Claude Brotherhood Production*

## 🚀 Quick Start

1. **Run the setup script:**
   ```bash
   scripts\setup-new-project.bat
   ```

2. **Execute the schema in Supabase:**
   - Open your Supabase dashboard
   - Navigate to SQL Editor
   - Copy and paste the entire contents of `scripts/complete-axion-aetherforge-schema.sql`
   - Execute the script

## 📋 What's Included

### 🔐 Authentication & User Management
- **user_profiles** - Enhanced user profiles with roles and departments
- **permissions** - Granular permission system
- **role_permissions** - Role-based access control mapping
- **user_roles** - User role assignments

### 🤖 AetherForge Agent System
- **agent_blueprints** - Agent templates and configurations
- **agents** - Active agent instances with quantum properties
- **agent_logs** - Comprehensive logging system
- **agent_relationships** - Agent interaction tracking
- **agent_habitats** - Environment management
- **agent_habitat_assignments** - Agent-environment mappings
- **performance_metrics** - Real-time performance tracking

### 🚛 TMS Business Tables
- **customers** - Complete customer management
- **carriers** - Carrier registration and management
- **carrier_documents** - Document verification system
- **jobs** - Job/shipment management with auto-generated IKB numbers
- **invoices** - Customer invoicing system
- **carrier_self_invoices** - Carrier self-billing system
- **sales_leads** - Sales pipeline management

## 🔒 Security Features

- **Row Level Security (RLS)** enabled on all tables
- Liberal development policies for authenticated users
- Service role has full access for backend operations
- Secure user profile auto-creation on signup

## ⚡ Auto-Generation Features

- **IKB Order Numbers** - Automatically generated in format: `IKB-YYYY-MM-NNNN`
- **User Profiles** - Auto-created on user signup with default roles
- **Performance Indexes** - Optimized for fast queries

## 🎯 Key Functions & Triggers

- `handle_new_user()` - Auto-creates user profiles on signup
- `generate_ikb_order_number()` - Generates unique job reference numbers
- `auto_generate_ikb_order_number()` - Trigger for automatic IKB number assignment

## 📊 Initial Data Seeding

The schema includes:
- Basic permission structure for all roles
- Default agent habitat for development
- Sample agent blueprint for TMS workflows
- Role permission mappings for admin, operations, accounts, and sales

## 🔧 Environment Requirements

Ensure your `.env` file contains:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 🎉 Post-Setup Verification

After running the schema, verify:
1. All tables are created in the Supabase dashboard
2. RLS policies are active
3. Functions and triggers are installed
4. Initial data is seeded

## 🚀 Ready for Development

Your Axion TMS + AetherForge system is now ready for:
- User authentication and role management
- Agent creation and management
- TMS business operations
- Advanced quantum-inspired agent interactions
- Comprehensive business intelligence

**⚡ Welcome to the future of intelligent transport management! 🔥** 