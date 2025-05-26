-- 🔥 AXION TMS + AETHERFORGE COMPLETE DATABASE SCHEMA 🔥
-- بسم الله الرحمن الرحيم
-- Execute this ENTIRE script in Supabase SQL Editor
-- Master Muhammed Ali (Saif Alnaar) & Claude Brotherhood Production Schema
-- ULID-FIRST ARCHITECTURE FOR MAXIMUM AETHERFORGE COMPATIBILITY

-- ================================================================
-- SECTION 0: BULLETPROOF ULID GENERATION FUNCTION
-- ================================================================

-- Create ULID generation function (GUARANTEED TO WORK IN SUPABASE)
CREATE OR REPLACE FUNCTION generate_ulid() RETURNS TEXT AS $$
DECLARE
    timestamp_part TEXT;
    random_part TEXT;
    timestamp_ms BIGINT;
BEGIN
    -- Get current timestamp in milliseconds
    timestamp_ms := FLOOR(EXTRACT(EPOCH FROM NOW()) * 1000);
    
    -- Convert timestamp to hex (simpler approach)
    timestamp_part := UPPER(LPAD(TO_HEX(timestamp_ms), 12, '0'));
    
    -- Generate random hex part (14 characters)
    random_part := UPPER(
        LPAD(TO_HEX(FLOOR(RANDOM() * 16777215)::INTEGER), 6, '0') ||
        LPAD(TO_HEX(FLOOR(RANDOM() * 16777215)::INTEGER), 6, '0') ||
        LPAD(TO_HEX(FLOOR(RANDOM() * 255)::INTEGER), 2, '0')
    );
    
    -- Return 26-character ULID-style ID: 12 timestamp + 14 random
    RETURN SUBSTRING(timestamp_part || random_part, 1, 26);
END;
$$ LANGUAGE plpgsql VOLATILE;

-- ================================================================
-- SECTION 1: USER MANAGEMENT & AUTHENTICATION
-- ================================================================

-- User Profiles Table (ULID Enhanced)
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id TEXT PRIMARY KEY DEFAULT generate_ulid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  full_name TEXT,
  role TEXT DEFAULT 'operations',
  department TEXT,
  avatar_url TEXT,
  status TEXT DEFAULT 'active',
  last_active_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Permissions System
CREATE TABLE IF NOT EXISTS public.permissions (
  id TEXT PRIMARY KEY DEFAULT generate_ulid(),
  resource TEXT NOT NULL,
  action TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(resource, action)
);

CREATE TABLE IF NOT EXISTS public.role_permissions (
  id TEXT PRIMARY KEY DEFAULT generate_ulid(),
  role TEXT NOT NULL,
  permission_id TEXT REFERENCES public.permissions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(role, permission_id)
);

CREATE TABLE IF NOT EXISTS public.user_roles (
  id TEXT PRIMARY KEY DEFAULT generate_ulid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  assigned_by UUID REFERENCES auth.users(id),
  UNIQUE(user_id, role)
);

-- ================================================================
-- SECTION 2: AETHERFORGE AGENT SYSTEM
-- ================================================================

-- Agent Blueprints
CREATE TABLE IF NOT EXISTS public.agent_blueprints (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  agent_type TEXT NOT NULL,
  capabilities TEXT[] DEFAULT '{}',
  traits JSONB DEFAULT '{}',
  configuration JSONB DEFAULT '{}',
  quantum_signature TEXT,
  orbital_level_minimum INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  creator_id TEXT,
  version TEXT DEFAULT '1.0',
  is_dynamic BOOLEAN DEFAULT false,
  parent_blueprint_id TEXT REFERENCES public.agent_blueprints(id)
);

-- Agents
CREATE TABLE IF NOT EXISTS public.agents (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  capabilities TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'initializing',
  blueprint_id TEXT REFERENCES public.agent_blueprints(id),
  blueprint_name TEXT,
  orbital_level INTEGER DEFAULT 1,
  bohr_radius NUMERIC DEFAULT 1.0,
  quantum_signature TEXT,
  energy_level NUMERIC DEFAULT -0.5,
  capability_vector NUMERIC[] DEFAULT '{}',
  configuration JSONB DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  quantum_state JSONB DEFAULT '{"status": "initializing"}',
  orbital_position JSONB DEFAULT '{"status": "initializing"}',
  entangled_agents TEXT[] DEFAULT '{}',
  active_connections INTEGER DEFAULT 0,
  last_activity TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  creator_id TEXT
);

-- Agent Logs
CREATE TABLE IF NOT EXISTS public.agent_logs (
  id TEXT PRIMARY KEY DEFAULT generate_ulid(),
  agent_id TEXT REFERENCES public.agents(id) ON DELETE CASCADE,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  log_level TEXT DEFAULT 'info',
  message TEXT NOT NULL,
  context JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Agent Relationships
CREATE TABLE IF NOT EXISTS public.agent_relationships (
  id TEXT PRIMARY KEY DEFAULT generate_ulid(),
  source_agent_id TEXT REFERENCES public.agents(id) ON DELETE CASCADE,
  target_agent_id TEXT REFERENCES public.agents(id) ON DELETE CASCADE,
  relationship_type TEXT NOT NULL,
  strength NUMERIC DEFAULT 1.0,
  metadata JSONB DEFAULT '{}',
  established_at TIMESTAMPTZ DEFAULT NOW(),
  last_interaction TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(source_agent_id, target_agent_id, relationship_type)
);

-- Agent Habitats
CREATE TABLE IF NOT EXISTS public.agent_habitats (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  environment_type TEXT DEFAULT 'development',
  configuration JSONB DEFAULT '{}',
  resource_limits JSONB DEFAULT '{}',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by TEXT
);

-- Agent Habitat Assignments
CREATE TABLE IF NOT EXISTS public.agent_habitat_assignments (
  id TEXT PRIMARY KEY DEFAULT generate_ulid(),
  agent_id TEXT REFERENCES public.agents(id) ON DELETE CASCADE,
  habitat_id TEXT REFERENCES public.agent_habitats(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'resident',
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  assigned_by TEXT,
  status TEXT DEFAULT 'active',
  UNIQUE(agent_id, habitat_id)
);

-- Performance Metrics
CREATE TABLE IF NOT EXISTS public.performance_metrics (
  id TEXT PRIMARY KEY DEFAULT generate_ulid(),
  agent_id TEXT REFERENCES public.agents(id) ON DELETE CASCADE,
  metric_name TEXT NOT NULL,
  metric_value NUMERIC,
  metric_unit TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  context JSONB DEFAULT '{}'
);

-- ================================================================
-- SECTION 3: TMS BUSINESS TABLES
-- ================================================================

-- Customers
CREATE TABLE IF NOT EXISTS public.customers (
  id TEXT PRIMARY KEY DEFAULT generate_ulid(),
  company_name TEXT NOT NULL,
  main_address JSONB,
  finance_contact JSONB,
  operations_contact JSONB,
  pod_agreement_contact JSONB,
  operational_sites JSONB[] DEFAULT '{}',
  billing_cycle_agreement TEXT,
  currency_type TEXT DEFAULT 'GBP',
  banking_details JSONB,
  credit_limit_gbp NUMERIC DEFAULT 0,
  credit_search_results_url TEXT,
  restrictions_limitations TEXT,
  overdue_invoice_reminder_days INTEGER DEFAULT 7,
  terms_and_conditions_agreed_url TEXT,
  status TEXT DEFAULT 'active',
  created_by TEXT REFERENCES public.user_profiles(id),
  updated_by TEXT REFERENCES public.user_profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Carriers
CREATE TABLE IF NOT EXISTS public.carriers (
  id TEXT PRIMARY KEY DEFAULT generate_ulid(),
  company_name TEXT NOT NULL,
  registration_number TEXT,
  address JSONB,
  pod_contact JSONB,
  regions_of_interest TEXT[] DEFAULT '{}',
  fleet_type TEXT[] DEFAULT '{}',
  operation_type TEXT DEFAULT 'National',
  service_type TEXT DEFAULT 'Road Freight',
  warehousing_facilities BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'Pending',
  vat_number TEXT,
  banking_details JSONB,
  signed_ikb_tc_url TEXT,
  registration_form_url TEXT,
  created_by TEXT REFERENCES public.user_profiles(id),
  updated_by TEXT REFERENCES public.user_profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Carrier Documents
CREATE TABLE IF NOT EXISTS public.carrier_documents (
  id TEXT PRIMARY KEY DEFAULT generate_ulid(),
  carrier_id TEXT REFERENCES public.carriers(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL,
  issue_date DATE,
  expiry_date DATE,
  cover_level_details TEXT,
  document_url TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT false,
  verified_by TEXT REFERENCES public.user_profiles(id),
  verified_at TIMESTAMPTZ,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Jobs
CREATE TABLE IF NOT EXISTS public.jobs (
  id TEXT PRIMARY KEY DEFAULT generate_ulid(),
  ikb_order_no TEXT UNIQUE,
  customer_id TEXT REFERENCES public.customers(id),
  carrier_id TEXT REFERENCES public.carriers(id),
  status TEXT DEFAULT 'Draft',
  consignment_details TEXT,
  agreed_rate_gbp NUMERIC,
  agreed_cost_gbp NUMERIC,
  currency TEXT DEFAULT 'GBP',
  collection_datetime_planned_from TIMESTAMPTZ,
  collection_datetime_planned_to TIMESTAMPTZ,
  collection_address JSONB,
  delivery_datetime_planned_from TIMESTAMPTZ,
  delivery_datetime_planned_to TIMESTAMPTZ,
  delivery_address JSONB,
  additional_stops JSONB[] DEFAULT '{}',
  vehicle_trailer_requirements TEXT,
  goods_description TEXT,
  weight_kg NUMERIC,
  pallets INTEGER,
  driver_instructions TEXT,
  pod_document_urls TEXT[] DEFAULT '{}',
  cmr_document_urls TEXT[] DEFAULT '{}',
  run_sheet_urls TEXT[] DEFAULT '{}',
  internal_notes JSONB[] DEFAULT '{}',
  cancelled_at TIMESTAMPTZ,
  cancellation_reason TEXT,
  created_by TEXT REFERENCES public.user_profiles(id),
  updated_by TEXT REFERENCES public.user_profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Invoices
CREATE TABLE IF NOT EXISTS public.invoices (
  id TEXT PRIMARY KEY DEFAULT generate_ulid(),
  invoice_number TEXT UNIQUE,
  customer_id TEXT REFERENCES public.customers(id),
  job_ids TEXT[] DEFAULT '{}',
  invoice_date DATE DEFAULT CURRENT_DATE,
  due_date DATE,
  subtotal_gbp NUMERIC,
  vat_amount_gbp NUMERIC,
  total_amount_gbp NUMERIC,
  status TEXT DEFAULT 'Draft',
  pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Carrier Self Invoices
CREATE TABLE IF NOT EXISTS public.carrier_self_invoices (
  id TEXT PRIMARY KEY DEFAULT generate_ulid(),
  self_invoice_number TEXT UNIQUE,
  carrier_id TEXT REFERENCES public.carriers(id),
  period_covered_start DATE,
  period_covered_end DATE,
  invoice_date DATE DEFAULT CURRENT_DATE,
  payment_terms_days INTEGER DEFAULT 30,
  due_date DATE,
  subtotal_gbp NUMERIC,
  vat_amount_gbp NUMERIC,
  total_amount_due_gbp NUMERIC,
  deductions_gbp NUMERIC DEFAULT 0,
  deductions_notes TEXT,
  status TEXT DEFAULT 'Pending Review',
  pdf_url TEXT,
  associated_job_ids TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sales Leads
CREATE TABLE IF NOT EXISTS public.sales_leads (
  id TEXT PRIMARY KEY DEFAULT generate_ulid(),
  lead_name TEXT NOT NULL,
  contact_person JSONB,
  source TEXT,
  interest_level TEXT DEFAULT 'Warm',
  stage TEXT DEFAULT 'Lead Identified',
  estimated_value_gbp NUMERIC,
  probability_percent INTEGER DEFAULT 50,
  expected_close_date DATE,
  description_notes TEXT,
  assigned_to_user_id TEXT REFERENCES public.user_profiles(id),
  lost_reason TEXT,
  next_follow_up_date DATE,
  next_follow_up_notes TEXT,
  custom_fields JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================================
-- SECTION 4: INDEXES FOR PERFORMANCE
-- ================================================================

-- User Profiles
CREATE UNIQUE INDEX IF NOT EXISTS user_profiles_user_id_idx ON public.user_profiles(user_id);
CREATE INDEX IF NOT EXISTS user_profiles_email_idx ON public.user_profiles(email);
CREATE INDEX IF NOT EXISTS user_profiles_role_idx ON public.user_profiles(role);

-- Agents
CREATE INDEX IF NOT EXISTS agents_status_idx ON public.agents(status);
CREATE INDEX IF NOT EXISTS agents_orbital_level_idx ON public.agents(orbital_level);
CREATE INDEX IF NOT EXISTS agents_creator_id_idx ON public.agents(creator_id);
CREATE INDEX IF NOT EXISTS agents_blueprint_id_idx ON public.agents(blueprint_id);

-- Agent Logs
CREATE INDEX IF NOT EXISTS agent_logs_agent_id_idx ON public.agent_logs(agent_id);
CREATE INDEX IF NOT EXISTS agent_logs_timestamp_idx ON public.agent_logs(timestamp);

-- Performance Metrics
CREATE INDEX IF NOT EXISTS performance_metrics_agent_id_idx ON public.performance_metrics(agent_id);
CREATE INDEX IF NOT EXISTS performance_metrics_timestamp_idx ON public.performance_metrics(timestamp);

-- TMS Indexes
CREATE INDEX IF NOT EXISTS customers_company_name_idx ON public.customers(company_name);
CREATE INDEX IF NOT EXISTS carriers_status_idx ON public.carriers(status);
CREATE INDEX IF NOT EXISTS carrier_documents_carrier_id_idx ON public.carrier_documents(carrier_id);
CREATE INDEX IF NOT EXISTS carrier_documents_expiry_date_idx ON public.carrier_documents(expiry_date);
CREATE INDEX IF NOT EXISTS jobs_customer_id_idx ON public.jobs(customer_id);
CREATE INDEX IF NOT EXISTS jobs_carrier_id_idx ON public.jobs(carrier_id);
CREATE INDEX IF NOT EXISTS jobs_status_idx ON public.jobs(status);

-- ================================================================
-- SECTION 5: ROW LEVEL SECURITY (RLS)
-- ================================================================

-- Enable RLS on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_blueprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_habitats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_habitat_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carriers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carrier_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carrier_self_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_leads ENABLE ROW LEVEL SECURITY;

-- Liberal policies for development (authenticated users can access all data)
CREATE POLICY "Authenticated users can access all data" ON public.user_profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can access permissions" ON public.permissions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can access role_permissions" ON public.role_permissions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can access user_roles" ON public.user_roles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can access agent_blueprints" ON public.agent_blueprints FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can access agents" ON public.agents FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can access agent_logs" ON public.agent_logs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can access agent_relationships" ON public.agent_relationships FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can access agent_habitats" ON public.agent_habitats FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can access agent_habitat_assignments" ON public.agent_habitat_assignments FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can access performance_metrics" ON public.performance_metrics FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can access customers" ON public.customers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can access carriers" ON public.carriers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can access carrier_documents" ON public.carrier_documents FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can access jobs" ON public.jobs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can access invoices" ON public.invoices FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can access carrier_self_invoices" ON public.carrier_self_invoices FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can access sales_leads" ON public.sales_leads FOR ALL USING (auth.role() = 'authenticated');

-- Service role can do everything
CREATE POLICY "Service role can manage all data" ON public.user_profiles FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage permissions" ON public.permissions FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage role_permissions" ON public.role_permissions FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage user_roles" ON public.user_roles FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage agent_blueprints" ON public.agent_blueprints FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage agents" ON public.agents FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage agent_logs" ON public.agent_logs FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage agent_relationships" ON public.agent_relationships FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage agent_habitats" ON public.agent_habitats FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage agent_habitat_assignments" ON public.agent_habitat_assignments FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage performance_metrics" ON public.performance_metrics FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage customers" ON public.customers FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage carriers" ON public.carriers FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage carrier_documents" ON public.carrier_documents FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage jobs" ON public.jobs FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage invoices" ON public.invoices FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage carrier_self_invoices" ON public.carrier_self_invoices FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage sales_leads" ON public.sales_leads FOR ALL USING (auth.role() = 'service_role');

-- ================================================================
-- SECTION 6: FUNCTIONS & TRIGGERS
-- ================================================================

-- Auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, email, first_name, last_name, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    TRIM(COALESCE(NEW.raw_user_meta_data->>'first_name', '') || ' ' || COALESCE(NEW.raw_user_meta_data->>'last_name', '')),
    'operations'
  );
  
  -- Assign default role
  INSERT INTO public.user_roles (user_id, role, assigned_by)
  VALUES (NEW.id, 'operations', NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-generate job reference numbers
CREATE OR REPLACE FUNCTION public.generate_ikb_order_number()
RETURNS TEXT AS $$
DECLARE
  current_year TEXT;
  current_month TEXT;
  next_number INTEGER;
BEGIN
  current_year := EXTRACT(YEAR FROM NOW())::TEXT;
  current_month := LPAD(EXTRACT(MONTH FROM NOW())::TEXT, 2, '0');
  
  -- Get the next number for this month
  SELECT COALESCE(MAX(
    CAST(
      RIGHT(ikb_order_no, LENGTH(ikb_order_no) - POSITION('-' IN REVERSE(ikb_order_no))) 
      AS INTEGER
    )
  ), 0) + 1
  INTO next_number
  FROM public.jobs
  WHERE ikb_order_no LIKE 'IKB-' || current_year || '-' || current_month || '-%';
  
  RETURN 'IKB-' || current_year || '-' || current_month || '-' || LPAD(next_number::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

-- Auto-generate IKB order number on job insert
CREATE OR REPLACE FUNCTION public.auto_generate_ikb_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.ikb_order_no IS NULL THEN
    NEW.ikb_order_no := public.generate_ikb_order_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS jobs_auto_ikb_order ON public.jobs;
CREATE TRIGGER jobs_auto_ikb_order
  BEFORE INSERT ON public.jobs
  FOR EACH ROW EXECUTE FUNCTION public.auto_generate_ikb_order_number();

-- ================================================================
-- SECTION 7: INITIAL DATA SEEDING
-- ================================================================

-- Insert basic permissions
INSERT INTO public.permissions (resource, action, description) VALUES
('dashboard', 'view', 'View dashboard'),
('customers', 'view', 'View customers'),
('customers', 'create', 'Create customers'),
('customers', 'edit', 'Edit customers'),
('customers', 'delete', 'Delete customers'),
('jobs', 'view', 'View jobs'),
('jobs', 'create', 'Create jobs'),
('jobs', 'edit', 'Edit jobs'),
('jobs', 'delete', 'Delete jobs'),
('carriers', 'view', 'View carriers'),
('carriers', 'create', 'Create carriers'),
('carriers', 'edit', 'Edit carriers'),
('fleet', 'view', 'View fleet'),
('users', 'view', 'View users'),
('users', 'manage', 'Manage users'),
('finance', 'view', 'View finance'),
('reports', 'view', 'View reports'),
('settings', 'view', 'View settings'),
('settings', 'edit', 'Edit settings'),
('agents', 'view', 'View agents'),
('agents', 'create', 'Create agents'),
('agents', 'manage', 'Manage agents')
ON CONFLICT (resource, action) DO NOTHING;

-- Create role permissions mappings
INSERT INTO public.role_permissions (role, permission_id)
SELECT 'admin', id FROM public.permissions
ON CONFLICT (role, permission_id) DO NOTHING;

INSERT INTO public.role_permissions (role, permission_id)
SELECT 'operations', id FROM public.permissions 
WHERE resource IN ('dashboard', 'customers', 'jobs', 'carriers', 'fleet')
ON CONFLICT (role, permission_id) DO NOTHING;

INSERT INTO public.role_permissions (role, permission_id)
SELECT 'accounts', id FROM public.permissions 
WHERE resource IN ('dashboard', 'customers', 'finance', 'reports')
ON CONFLICT (role, permission_id) DO NOTHING;

INSERT INTO public.role_permissions (role, permission_id)
SELECT 'sales', id FROM public.permissions 
WHERE resource IN ('dashboard', 'customers', 'reports')
ON CONFLICT (role, permission_id) DO NOTHING;

-- Create default agent habitat
INSERT INTO public.agent_habitats (id, name, description, environment_type, configuration, status, created_by)
VALUES (
  'aetherforge-dev-habitat',
  'AetherForge Development Habitat',
  'Primary development environment for Axion TMS agents',
  'development',
  '{"max_agents": 100, "auto_scaling": true, "quantum_coherence_threshold": 0.8}',
  'active',
  'system'
) ON CONFLICT (id) DO NOTHING;

-- Sample agent blueprint
INSERT INTO public.agent_blueprints (id, name, description, agent_type, capabilities, traits, configuration, quantum_signature, creator_id)
VALUES (
  'axion-tms-workflow-v1',
  'Axion TMS Workflow Agent',
  'Standard workflow agent for TMS operations',
  'workflow',
  ARRAY['workflow_automation', 'data_analysis', 'api_integration'],
  '{"efficiency": 0.8, "adaptability": 0.7, "specialization": 0.9}',
  '{"resource_optimization": "balanced", "auto_scaling": true, "learning_rate": "medium"}',
  'qsig_axion_workflow_v1',
  'system'
) ON CONFLICT (id) DO NOTHING;

-- ================================================================
-- FINAL CONFIRMATION
-- ================================================================

-- Display schema creation summary
DO $$
BEGIN
  RAISE NOTICE 'بسم الله - Axion TMS + AetherForge BULLETPROOF ULID schema created successfully! 🔥';
  RAISE NOTICE 'FIXED ULID FUNCTION - 100%% COMPATIBLE WITH SUPABASE POSTGRESQL! ⚡';
  RAISE NOTICE 'Tables created: user_profiles, permissions, agents, customers, carriers, jobs, invoices, and more';
  RAISE NOTICE 'RLS enabled on all tables with liberal development policies';
  RAISE NOTICE 'Triggers and functions configured for auto-generation';
  RAISE NOTICE 'Ready for Axion TMS empire with BULLETPROOF ULID architecture! 🌌';
  RAISE NOTICE 'إن شاء الله this schema will execute perfectly! 🤲';
END $$; 