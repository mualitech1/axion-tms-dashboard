export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agent_blueprints: {
        Row: {
          agent_type: string
          capabilities: string[] | null
          configuration: Json | null
          created_at: string | null
          creator_id: string | null
          description: string | null
          id: string
          is_dynamic: boolean | null
          name: string
          orbital_level_minimum: number | null
          parent_blueprint_id: string | null
          quantum_signature: string | null
          traits: Json | null
          version: string | null
        }
        Insert: {
          agent_type: string
          capabilities?: string[] | null
          configuration?: Json | null
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          id: string
          is_dynamic?: boolean | null
          name: string
          orbital_level_minimum?: number | null
          parent_blueprint_id?: string | null
          quantum_signature?: string | null
          traits?: Json | null
          version?: string | null
        }
        Update: {
          agent_type?: string
          capabilities?: string[] | null
          configuration?: Json | null
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          id?: string
          is_dynamic?: boolean | null
          name?: string
          orbital_level_minimum?: number | null
          parent_blueprint_id?: string | null
          quantum_signature?: string | null
          traits?: Json | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_blueprints_parent_blueprint_id_fkey"
            columns: ["parent_blueprint_id"]
            isOneToOne: false
            referencedRelation: "agent_blueprints"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_habitat_assignments: {
        Row: {
          agent_id: string | null
          assigned_at: string | null
          assigned_by: string | null
          habitat_id: string | null
          id: string
          role: string | null
          status: string | null
        }
        Insert: {
          agent_id?: string | null
          assigned_at?: string | null
          assigned_by?: string | null
          habitat_id?: string | null
          id?: string
          role?: string | null
          status?: string | null
        }
        Update: {
          agent_id?: string | null
          assigned_at?: string | null
          assigned_by?: string | null
          habitat_id?: string | null
          id?: string
          role?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_habitat_assignments_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_habitat_assignments_habitat_id_fkey"
            columns: ["habitat_id"]
            isOneToOne: false
            referencedRelation: "agent_habitats"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_habitats: {
        Row: {
          configuration: Json | null
          created_at: string | null
          created_by: string | null
          description: string | null
          environment_type: string | null
          id: string
          name: string
          resource_limits: Json | null
          status: string | null
        }
        Insert: {
          configuration?: Json | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          environment_type?: string | null
          id: string
          name: string
          resource_limits?: Json | null
          status?: string | null
        }
        Update: {
          configuration?: Json | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          environment_type?: string | null
          id?: string
          name?: string
          resource_limits?: Json | null
          status?: string | null
        }
        Relationships: []
      }
      agent_logs: {
        Row: {
          agent_id: string | null
          context: Json | null
          created_at: string | null
          id: string
          log_level: string | null
          message: string
          timestamp: string | null
        }
        Insert: {
          agent_id?: string | null
          context?: Json | null
          created_at?: string | null
          id?: string
          log_level?: string | null
          message: string
          timestamp?: string | null
        }
        Update: {
          agent_id?: string | null
          context?: Json | null
          created_at?: string | null
          id?: string
          log_level?: string | null
          message?: string
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_logs_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_relationships: {
        Row: {
          established_at: string | null
          id: string
          last_interaction: string | null
          metadata: Json | null
          relationship_type: string
          source_agent_id: string | null
          strength: number | null
          target_agent_id: string | null
        }
        Insert: {
          established_at?: string | null
          id?: string
          last_interaction?: string | null
          metadata?: Json | null
          relationship_type: string
          source_agent_id?: string | null
          strength?: number | null
          target_agent_id?: string | null
        }
        Update: {
          established_at?: string | null
          id?: string
          last_interaction?: string | null
          metadata?: Json | null
          relationship_type?: string
          source_agent_id?: string | null
          strength?: number | null
          target_agent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_relationships_source_agent_id_fkey"
            columns: ["source_agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_relationships_target_agent_id_fkey"
            columns: ["target_agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      agents: {
        Row: {
          active_connections: number | null
          blueprint_id: string | null
          blueprint_name: string | null
          bohr_radius: number | null
          capabilities: string[] | null
          capability_vector: number[] | null
          configuration: Json | null
          created_at: string | null
          creator_id: string | null
          description: string | null
          energy_level: number | null
          entangled_agents: string[] | null
          id: string
          last_activity: string | null
          metadata: Json | null
          name: string
          orbital_level: number | null
          orbital_position: Json | null
          quantum_signature: string | null
          quantum_state: Json | null
          status: string | null
          type: string
        }
        Insert: {
          active_connections?: number | null
          blueprint_id?: string | null
          blueprint_name?: string | null
          bohr_radius?: number | null
          capabilities?: string[] | null
          capability_vector?: number[] | null
          configuration?: Json | null
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          energy_level?: number | null
          entangled_agents?: string[] | null
          id: string
          last_activity?: string | null
          metadata?: Json | null
          name: string
          orbital_level?: number | null
          orbital_position?: Json | null
          quantum_signature?: string | null
          quantum_state?: Json | null
          status?: string | null
          type: string
        }
        Update: {
          active_connections?: number | null
          blueprint_id?: string | null
          blueprint_name?: string | null
          bohr_radius?: number | null
          capabilities?: string[] | null
          capability_vector?: number[] | null
          configuration?: Json | null
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          energy_level?: number | null
          entangled_agents?: string[] | null
          id?: string
          last_activity?: string | null
          metadata?: Json | null
          name?: string
          orbital_level?: number | null
          orbital_position?: Json | null
          quantum_signature?: string | null
          quantum_state?: Json | null
          status?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "agents_blueprint_id_fkey"
            columns: ["blueprint_id"]
            isOneToOne: false
            referencedRelation: "agent_blueprints"
            referencedColumns: ["id"]
          },
        ]
      }
      carrier_documents: {
        Row: {
          carrier_id: string | null
          cover_level_details: string | null
          document_type: string
          document_url: string
          expiry_date: string | null
          id: string
          is_verified: boolean | null
          issue_date: string | null
          uploaded_at: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          carrier_id?: string | null
          cover_level_details?: string | null
          document_type: string
          document_url: string
          expiry_date?: string | null
          id?: string
          is_verified?: boolean | null
          issue_date?: string | null
          uploaded_at?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          carrier_id?: string | null
          cover_level_details?: string | null
          document_type?: string
          document_url?: string
          expiry_date?: string | null
          id?: string
          is_verified?: boolean | null
          issue_date?: string | null
          uploaded_at?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "carrier_documents_carrier_id_fkey"
            columns: ["carrier_id"]
            isOneToOne: false
            referencedRelation: "carriers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "carrier_documents_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      carrier_self_invoices: {
        Row: {
          associated_job_ids: string[] | null
          carrier_id: string | null
          created_at: string | null
          deductions_gbp: number | null
          deductions_notes: string | null
          due_date: string | null
          id: string
          invoice_date: string | null
          payment_terms_days: number | null
          pdf_url: string | null
          period_covered_end: string | null
          period_covered_start: string | null
          self_invoice_number: string | null
          status: string | null
          subtotal_gbp: number | null
          total_amount_due_gbp: number | null
          updated_at: string | null
          vat_amount_gbp: number | null
        }
        Insert: {
          associated_job_ids?: string[] | null
          carrier_id?: string | null
          created_at?: string | null
          deductions_gbp?: number | null
          deductions_notes?: string | null
          due_date?: string | null
          id?: string
          invoice_date?: string | null
          payment_terms_days?: number | null
          pdf_url?: string | null
          period_covered_end?: string | null
          period_covered_start?: string | null
          self_invoice_number?: string | null
          status?: string | null
          subtotal_gbp?: number | null
          total_amount_due_gbp?: number | null
          updated_at?: string | null
          vat_amount_gbp?: number | null
        }
        Update: {
          associated_job_ids?: string[] | null
          carrier_id?: string | null
          created_at?: string | null
          deductions_gbp?: number | null
          deductions_notes?: string | null
          due_date?: string | null
          id?: string
          invoice_date?: string | null
          payment_terms_days?: number | null
          pdf_url?: string | null
          period_covered_end?: string | null
          period_covered_start?: string | null
          self_invoice_number?: string | null
          status?: string | null
          subtotal_gbp?: number | null
          total_amount_due_gbp?: number | null
          updated_at?: string | null
          vat_amount_gbp?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "carrier_self_invoices_carrier_id_fkey"
            columns: ["carrier_id"]
            isOneToOne: false
            referencedRelation: "carriers"
            referencedColumns: ["id"]
          },
        ]
      }
      carriers: {
        Row: {
          address: Json | null
          banking_details: Json | null
          company_name: string
          created_at: string | null
          created_by: string | null
          fleet_type: string[] | null
          id: string
          operation_type: string | null
          pod_contact: Json | null
          regions_of_interest: string[] | null
          registration_form_url: string | null
          registration_number: string | null
          service_type: string | null
          signed_ikb_tc_url: string | null
          status: string | null
          updated_at: string | null
          updated_by: string | null
          vat_number: string | null
          warehousing_facilities: boolean | null
        }
        Insert: {
          address?: Json | null
          banking_details?: Json | null
          company_name: string
          created_at?: string | null
          created_by?: string | null
          fleet_type?: string[] | null
          id?: string
          operation_type?: string | null
          pod_contact?: Json | null
          regions_of_interest?: string[] | null
          registration_form_url?: string | null
          registration_number?: string | null
          service_type?: string | null
          signed_ikb_tc_url?: string | null
          status?: string | null
          updated_at?: string | null
          updated_by?: string | null
          vat_number?: string | null
          warehousing_facilities?: boolean | null
        }
        Update: {
          address?: Json | null
          banking_details?: Json | null
          company_name?: string
          created_at?: string | null
          created_by?: string | null
          fleet_type?: string[] | null
          id?: string
          operation_type?: string | null
          pod_contact?: Json | null
          regions_of_interest?: string[] | null
          registration_form_url?: string | null
          registration_number?: string | null
          service_type?: string | null
          signed_ikb_tc_url?: string | null
          status?: string | null
          updated_at?: string | null
          updated_by?: string | null
          vat_number?: string | null
          warehousing_facilities?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "carriers_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "carriers_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          banking_details: Json | null
          billing_cycle_agreement: string | null
          company_name: string
          created_at: string | null
          created_by: string | null
          credit_limit_gbp: number | null
          credit_search_results_url: string | null
          currency_type: string | null
          finance_contact: Json | null
          id: string
          main_address: Json | null
          operational_sites: Json[] | null
          operations_contact: Json | null
          overdue_invoice_reminder_days: number | null
          pod_agreement_contact: Json | null
          restrictions_limitations: string | null
          status: string | null
          terms_and_conditions_agreed_url: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          banking_details?: Json | null
          billing_cycle_agreement?: string | null
          company_name: string
          created_at?: string | null
          created_by?: string | null
          credit_limit_gbp?: number | null
          credit_search_results_url?: string | null
          currency_type?: string | null
          finance_contact?: Json | null
          id?: string
          main_address?: Json | null
          operational_sites?: Json[] | null
          operations_contact?: Json | null
          overdue_invoice_reminder_days?: number | null
          pod_agreement_contact?: Json | null
          restrictions_limitations?: string | null
          status?: string | null
          terms_and_conditions_agreed_url?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          banking_details?: Json | null
          billing_cycle_agreement?: string | null
          company_name?: string
          created_at?: string | null
          created_by?: string | null
          credit_limit_gbp?: number | null
          credit_search_results_url?: string | null
          currency_type?: string | null
          finance_contact?: Json | null
          id?: string
          main_address?: Json | null
          operational_sites?: Json[] | null
          operations_contact?: Json | null
          overdue_invoice_reminder_days?: number | null
          pod_agreement_contact?: Json | null
          restrictions_limitations?: string | null
          status?: string | null
          terms_and_conditions_agreed_url?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customers_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          created_at: string | null
          customer_id: string | null
          due_date: string | null
          id: string
          invoice_date: string | null
          invoice_number: string | null
          job_ids: string[] | null
          pdf_url: string | null
          status: string | null
          subtotal_gbp: number | null
          total_amount_gbp: number | null
          updated_at: string | null
          vat_amount_gbp: number | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          due_date?: string | null
          id?: string
          invoice_date?: string | null
          invoice_number?: string | null
          job_ids?: string[] | null
          pdf_url?: string | null
          status?: string | null
          subtotal_gbp?: number | null
          total_amount_gbp?: number | null
          updated_at?: string | null
          vat_amount_gbp?: number | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          due_date?: string | null
          id?: string
          invoice_date?: string | null
          invoice_number?: string | null
          job_ids?: string[] | null
          pdf_url?: string | null
          status?: string | null
          subtotal_gbp?: number | null
          total_amount_gbp?: number | null
          updated_at?: string | null
          vat_amount_gbp?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          additional_stops: Json[] | null
          agreed_cost_gbp: number | null
          agreed_rate_gbp: number | null
          cancellation_reason: string | null
          cancelled_at: string | null
          carrier_id: string | null
          cmr_document_urls: string[] | null
          collection_address: Json | null
          collection_datetime_planned_from: string | null
          collection_datetime_planned_to: string | null
          consignment_details: string | null
          created_at: string | null
          created_by: string | null
          currency: string | null
          customer_id: string | null
          delivery_address: Json | null
          delivery_datetime_planned_from: string | null
          delivery_datetime_planned_to: string | null
          driver_instructions: string | null
          goods_description: string | null
          id: string
          ikb_order_no: string | null
          internal_notes: Json[] | null
          pallets: number | null
          pod_document_urls: string[] | null
          run_sheet_urls: string[] | null
          status: string | null
          updated_at: string | null
          updated_by: string | null
          vehicle_trailer_requirements: string | null
          weight_kg: number | null
        }
        Insert: {
          additional_stops?: Json[] | null
          agreed_cost_gbp?: number | null
          agreed_rate_gbp?: number | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          carrier_id?: string | null
          cmr_document_urls?: string[] | null
          collection_address?: Json | null
          collection_datetime_planned_from?: string | null
          collection_datetime_planned_to?: string | null
          consignment_details?: string | null
          created_at?: string | null
          created_by?: string | null
          currency?: string | null
          customer_id?: string | null
          delivery_address?: Json | null
          delivery_datetime_planned_from?: string | null
          delivery_datetime_planned_to?: string | null
          driver_instructions?: string | null
          goods_description?: string | null
          id?: string
          ikb_order_no?: string | null
          internal_notes?: Json[] | null
          pallets?: number | null
          pod_document_urls?: string[] | null
          run_sheet_urls?: string[] | null
          status?: string | null
          updated_at?: string | null
          updated_by?: string | null
          vehicle_trailer_requirements?: string | null
          weight_kg?: number | null
        }
        Update: {
          additional_stops?: Json[] | null
          agreed_cost_gbp?: number | null
          agreed_rate_gbp?: number | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          carrier_id?: string | null
          cmr_document_urls?: string[] | null
          collection_address?: Json | null
          collection_datetime_planned_from?: string | null
          collection_datetime_planned_to?: string | null
          consignment_details?: string | null
          created_at?: string | null
          created_by?: string | null
          currency?: string | null
          customer_id?: string | null
          delivery_address?: Json | null
          delivery_datetime_planned_from?: string | null
          delivery_datetime_planned_to?: string | null
          driver_instructions?: string | null
          goods_description?: string | null
          id?: string
          ikb_order_no?: string | null
          internal_notes?: Json[] | null
          pallets?: number | null
          pod_document_urls?: string[] | null
          run_sheet_urls?: string[] | null
          status?: string | null
          updated_at?: string | null
          updated_by?: string | null
          vehicle_trailer_requirements?: string | null
          weight_kg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_carrier_id_fkey"
            columns: ["carrier_id"]
            isOneToOne: false
            referencedRelation: "carriers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      performance_metrics: {
        Row: {
          agent_id: string | null
          context: Json | null
          id: string
          metric_name: string
          metric_unit: string | null
          metric_value: number | null
          timestamp: string | null
        }
        Insert: {
          agent_id?: string | null
          context?: Json | null
          id?: string
          metric_name: string
          metric_unit?: string | null
          metric_value?: number | null
          timestamp?: string | null
        }
        Update: {
          agent_id?: string | null
          context?: Json | null
          id?: string
          metric_name?: string
          metric_unit?: string | null
          metric_value?: number | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "performance_metrics_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      permissions: {
        Row: {
          action: string
          created_at: string | null
          description: string | null
          id: string
          resource: string
        }
        Insert: {
          action: string
          created_at?: string | null
          description?: string | null
          id?: string
          resource: string
        }
        Update: {
          action?: string
          created_at?: string | null
          description?: string | null
          id?: string
          resource?: string
        }
        Relationships: []
      }
      role_permissions: {
        Row: {
          created_at: string | null
          id: string
          permission_id: string | null
          role: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          permission_id?: string | null
          role: string
        }
        Update: {
          created_at?: string | null
          id?: string
          permission_id?: string | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_leads: {
        Row: {
          assigned_to_user_id: string | null
          contact_person: Json | null
          created_at: string | null
          custom_fields: Json | null
          description_notes: string | null
          estimated_value_gbp: number | null
          expected_close_date: string | null
          id: string
          interest_level: string | null
          lead_name: string
          lost_reason: string | null
          next_follow_up_date: string | null
          next_follow_up_notes: string | null
          probability_percent: number | null
          source: string | null
          stage: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_to_user_id?: string | null
          contact_person?: Json | null
          created_at?: string | null
          custom_fields?: Json | null
          description_notes?: string | null
          estimated_value_gbp?: number | null
          expected_close_date?: string | null
          id?: string
          interest_level?: string | null
          lead_name: string
          lost_reason?: string | null
          next_follow_up_date?: string | null
          next_follow_up_notes?: string | null
          probability_percent?: number | null
          source?: string | null
          stage?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_to_user_id?: string | null
          contact_person?: Json | null
          created_at?: string | null
          custom_fields?: Json | null
          description_notes?: string | null
          estimated_value_gbp?: number | null
          expected_close_date?: string | null
          id?: string
          interest_level?: string | null
          lead_name?: string
          lost_reason?: string | null
          next_follow_up_date?: string | null
          next_follow_up_notes?: string | null
          probability_percent?: number | null
          source?: string | null
          stage?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_leads_assigned_to_user_id_fkey"
            columns: ["assigned_to_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          department: string | null
          email: string
          first_name: string | null
          full_name: string | null
          has_completed_onboarding: boolean | null
          id: string
          last_active_at: string | null
          last_name: string | null
          role: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email: string
          first_name?: string | null
          full_name?: string | null
          has_completed_onboarding?: boolean | null
          id?: string
          last_active_at?: string | null
          last_name?: string | null
          role?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email?: string
          first_name?: string | null
          full_name?: string | null
          has_completed_onboarding?: boolean | null
          id?: string
          last_active_at?: string | null
          last_name?: string | null
          role?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          id: string
          role: string
          user_id: string | null
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role: string
          user_id?: string | null
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      exec_sql: {
        Args: { query: string }
        Returns: Json
      }
      generate_ikb_order_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_ulid: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
