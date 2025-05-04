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
      api_usage: {
        Row: {
          endpoint: string
          error: string | null
          id: string
          integration_id: string
          method: string
          request_payload: Json | null
          response_payload: Json | null
          response_time: number
          status_code: number
          timestamp: string
        }
        Insert: {
          endpoint: string
          error?: string | null
          id?: string
          integration_id: string
          method: string
          request_payload?: Json | null
          response_payload?: Json | null
          response_time: number
          status_code: number
          timestamp?: string
        }
        Update: {
          endpoint?: string
          error?: string | null
          id?: string
          integration_id?: string
          method?: string
          request_payload?: Json | null
          response_payload?: Json | null
          response_time?: number
          status_code?: number
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_usage_integration_id_fkey"
            columns: ["integration_id"]
            isOneToOne: false
            referencedRelation: "integrations"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action_type: string
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: string | null
          metadata: Json | null
          new_state: Json | null
          previous_state: Json | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action_type: string
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          new_state?: Json | null
          previous_state?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          new_state?: Json | null
          previous_state?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      claude_tasks: {
        Row: {
          completed_at: string | null
          created_at: string
          description: string | null
          error_message: string | null
          id: string
          input_data: Json
          max_tokens: number | null
          metadata: Json | null
          model: string
          output_data: Json | null
          priority: string
          status: string
          temperature: number | null
          title: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          error_message?: string | null
          id?: string
          input_data?: Json
          max_tokens?: number | null
          metadata?: Json | null
          model: string
          output_data?: Json | null
          priority?: string
          status?: string
          temperature?: number | null
          title: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          error_message?: string | null
          id?: string
          input_data?: Json
          max_tokens?: number | null
          metadata?: Json | null
          model?: string
          output_data?: Json | null
          priority?: string
          status?: string
          temperature?: number | null
          title?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      companies: {
        Row: {
          address: Json | null
          contact_name: string | null
          created_at: string | null
          credit_limit: number | null
          email: string | null
          id: string
          metadata: Json | null
          name: string
          phone: string | null
          status: string
          type: string
          updated_at: string | null
        }
        Insert: {
          address?: Json | null
          contact_name?: string | null
          created_at?: string | null
          credit_limit?: number | null
          email?: string | null
          id?: string
          metadata?: Json | null
          name: string
          phone?: string | null
          status?: string
          type: string
          updated_at?: string | null
        }
        Update: {
          address?: Json | null
          contact_name?: string | null
          created_at?: string | null
          credit_limit?: number | null
          email?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          phone?: string | null
          status?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      compliance_acknowledgements: {
        Row: {
          acknowledged_at: string
          document_id: string
          id: string
          ip_address: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          acknowledged_at?: string
          document_id: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          acknowledged_at?: string
          document_id?: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "compliance_acknowledgements_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "compliance_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_documents: {
        Row: {
          approval_date: string | null
          approved_by: string | null
          created_at: string
          description: string | null
          document_type: string
          effective_date: string | null
          expiry_date: string | null
          file_path: string
          id: string
          metadata: Json | null
          owner_id: string | null
          status: string
          title: string
          updated_at: string
          version: string
        }
        Insert: {
          approval_date?: string | null
          approved_by?: string | null
          created_at?: string
          description?: string | null
          document_type: string
          effective_date?: string | null
          expiry_date?: string | null
          file_path: string
          id?: string
          metadata?: Json | null
          owner_id?: string | null
          status: string
          title: string
          updated_at?: string
          version: string
        }
        Update: {
          approval_date?: string | null
          approved_by?: string | null
          created_at?: string
          description?: string | null
          document_type?: string
          effective_date?: string | null
          expiry_date?: string | null
          file_path?: string
          id?: string
          metadata?: Json | null
          owner_id?: string | null
          status?: string
          title?: string
          updated_at?: string
          version?: string
        }
        Relationships: []
      }
      credit_notes: {
        Row: {
          amount: number
          created_at: string
          created_by: string | null
          credit_note_number: string
          customer_id: string
          id: string
          invoice_id: string | null
          issue_date: string
          reason: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          created_by?: string | null
          credit_note_number: string
          customer_id: string
          id?: string
          invoice_id?: string | null
          issue_date?: string
          reason?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          created_by?: string | null
          credit_note_number?: string
          customer_id?: string
          id?: string
          invoice_id?: string | null
          issue_date?: string
          reason?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "credit_notes_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credit_notes_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          company_id: string | null
          driver_id: string | null
          expiry_date: string | null
          file_path: string
          file_size: string | null
          id: string
          job_id: string | null
          name: string
          status: string | null
          type: string
          uploaded_at: string | null
          uploaded_by: string | null
          vehicle_id: string | null
        }
        Insert: {
          company_id?: string | null
          driver_id?: string | null
          expiry_date?: string | null
          file_path: string
          file_size?: string | null
          id?: string
          job_id?: string | null
          name: string
          status?: string | null
          type: string
          uploaded_at?: string | null
          uploaded_by?: string | null
          vehicle_id?: string | null
        }
        Update: {
          company_id?: string | null
          driver_id?: string | null
          expiry_date?: string | null
          file_path?: string
          file_size?: string | null
          id?: string
          job_id?: string | null
          name?: string
          status?: string | null
          type?: string
          uploaded_at?: string | null
          uploaded_by?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      drivers: {
        Row: {
          cpc_expiry_date: string | null
          cpc_number: string | null
          created_at: string | null
          id: string
          license_categories: string[] | null
          license_expiry_date: string
          license_number: string
          national_insurance: string | null
          profile_id: string
          status: string
          updated_at: string | null
        }
        Insert: {
          cpc_expiry_date?: string | null
          cpc_number?: string | null
          created_at?: string | null
          id?: string
          license_categories?: string[] | null
          license_expiry_date: string
          license_number: string
          national_insurance?: string | null
          profile_id: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          cpc_expiry_date?: string | null
          cpc_number?: string | null
          created_at?: string | null
          id?: string
          license_categories?: string[] | null
          license_expiry_date?: string
          license_number?: string
          national_insurance?: string | null
          profile_id?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "drivers_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_accounts: {
        Row: {
          account_type: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          account_type: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          account_type?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      financial_periods: {
        Row: {
          created_at: string
          end_date: string
          id: string
          period_name: string
          start_date: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: string
          period_name: string
          start_date: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: string
          period_name?: string
          start_date?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      general_ledger: {
        Row: {
          account_id: string
          created_at: string
          created_by: string | null
          credit_amount: number | null
          debit_amount: number | null
          description: string | null
          id: string
          reference_id: string | null
          reference_type: string | null
          transaction_date: string
        }
        Insert: {
          account_id: string
          created_at?: string
          created_by?: string | null
          credit_amount?: number | null
          debit_amount?: number | null
          description?: string | null
          id?: string
          reference_id?: string | null
          reference_type?: string | null
          transaction_date?: string
        }
        Update: {
          account_id?: string
          created_at?: string
          created_by?: string | null
          credit_amount?: number | null
          debit_amount?: number | null
          description?: string | null
          id?: string
          reference_id?: string | null
          reference_type?: string | null
          transaction_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "general_ledger_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "financial_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      integrations: {
        Row: {
          access_token: string | null
          api_key: string | null
          api_secret: string | null
          base_url: string | null
          created_at: string
          enabled: boolean
          expires_at: string | null
          id: string
          name: string
          provider: string
          refresh_token: string | null
          settings: Json | null
          type: string
          updated_at: string
          usage_quota: number | null
          webhook_url: string | null
        }
        Insert: {
          access_token?: string | null
          api_key?: string | null
          api_secret?: string | null
          base_url?: string | null
          created_at?: string
          enabled?: boolean
          expires_at?: string | null
          id?: string
          name: string
          provider: string
          refresh_token?: string | null
          settings?: Json | null
          type: string
          updated_at?: string
          usage_quota?: number | null
          webhook_url?: string | null
        }
        Update: {
          access_token?: string | null
          api_key?: string | null
          api_secret?: string | null
          base_url?: string | null
          created_at?: string
          enabled?: boolean
          expires_at?: string | null
          id?: string
          name?: string
          provider?: string
          refresh_token?: string | null
          settings?: Json | null
          type?: string
          updated_at?: string
          usage_quota?: number | null
          webhook_url?: string | null
        }
        Relationships: []
      }
      invoice_items: {
        Row: {
          amount: number
          created_at: string
          description: string
          id: string
          invoice_id: string
          quantity: number
          tax_rate: number | null
          unit_price: number
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          description: string
          id?: string
          invoice_id: string
          quantity?: number
          tax_rate?: number | null
          unit_price?: number
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string
          id?: string
          invoice_id?: string
          quantity?: number
          tax_rate?: number | null
          unit_price?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          created_at: string
          created_by: string | null
          customer_id: string
          due_date: string
          id: string
          invoice_number: string
          issue_date: string
          job_id: string | null
          notes: string | null
          status: Database["public"]["Enums"]["invoice_status"]
          tax_amount: number
          terms: string | null
          total_amount: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          customer_id: string
          due_date: string
          id?: string
          invoice_number: string
          issue_date?: string
          job_id?: string | null
          notes?: string | null
          status?: Database["public"]["Enums"]["invoice_status"]
          tax_amount?: number
          terms?: string | null
          total_amount?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          customer_id?: string
          due_date?: string
          id?: string
          invoice_number?: string
          issue_date?: string
          job_id?: string | null
          notes?: string | null
          status?: Database["public"]["Enums"]["invoice_status"]
          tax_amount?: number
          terms?: string | null
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          carrier_id: string | null
          created_at: string | null
          created_by: string | null
          customer_id: string | null
          delivery_location: Json
          driver_id: string | null
          estimated_duration: number | null
          id: string
          issue_details: string | null
          notes: string | null
          pickup_date: string
          pickup_location: Json
          pod_document_id: string | null
          pod_uploaded: boolean | null
          priority: string
          reference: string
          status: string
          title: string
          updated_at: string | null
          value: number | null
          vehicle_id: string | null
        }
        Insert: {
          carrier_id?: string | null
          created_at?: string | null
          created_by?: string | null
          customer_id?: string | null
          delivery_location: Json
          driver_id?: string | null
          estimated_duration?: number | null
          id?: string
          issue_details?: string | null
          notes?: string | null
          pickup_date: string
          pickup_location: Json
          pod_document_id?: string | null
          pod_uploaded?: boolean | null
          priority?: string
          reference: string
          status?: string
          title: string
          updated_at?: string | null
          value?: number | null
          vehicle_id?: string | null
        }
        Update: {
          carrier_id?: string | null
          created_at?: string | null
          created_by?: string | null
          customer_id?: string | null
          delivery_location?: Json
          driver_id?: string | null
          estimated_duration?: number | null
          id?: string
          issue_details?: string | null
          notes?: string | null
          pickup_date?: string
          pickup_location?: Json
          pod_document_id?: string | null
          pod_uploaded?: boolean | null
          priority?: string
          reference?: string
          status?: string
          title?: string
          updated_at?: string | null
          value?: number | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_carrier_id_fkey"
            columns: ["carrier_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_batch_items: {
        Row: {
          amount: number
          batch_id: string
          created_at: string
          id: string
          invoice_id: string
          status: string
          updated_at: string
        }
        Insert: {
          amount: number
          batch_id: string
          created_at?: string
          id?: string
          invoice_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          batch_id?: string
          created_at?: string
          id?: string
          invoice_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_batch_items_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "payment_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_batch_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_batches: {
        Row: {
          approved_by: string | null
          batch_number: string
          created_at: string
          created_by: string | null
          id: string
          notes: string | null
          payment_date: string | null
          status: string
          total_amount: number
          updated_at: string
        }
        Insert: {
          approved_by?: string | null
          batch_number: string
          created_at?: string
          created_by?: string | null
          id?: string
          notes?: string | null
          payment_date?: string | null
          status?: string
          total_amount?: number
          updated_at?: string
        }
        Update: {
          approved_by?: string | null
          batch_number?: string
          created_at?: string
          created_by?: string | null
          id?: string
          notes?: string | null
          payment_date?: string | null
          status?: string
          total_amount?: number
          updated_at?: string
        }
        Relationships: []
      }
      payment_methods: {
        Row: {
          company_id: string
          created_at: string
          details: Json
          expires_at: string | null
          id: string
          is_default: boolean
          name: string
          type: Database["public"]["Enums"]["payment_method_type"]
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          details?: Json
          expires_at?: string | null
          id?: string
          is_default?: boolean
          name: string
          type: Database["public"]["Enums"]["payment_method_type"]
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          details?: Json
          expires_at?: string | null
          id?: string
          is_default?: boolean
          name?: string
          type?: Database["public"]["Enums"]["payment_method_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_methods_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          created_by: string | null
          id: string
          invoice_id: string
          notes: string | null
          payment_date: string
          payment_method_id: string | null
          status: Database["public"]["Enums"]["transaction_status"]
          transaction_reference: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          created_by?: string | null
          id?: string
          invoice_id: string
          notes?: string | null
          payment_date: string
          payment_method_id?: string | null
          status?: Database["public"]["Enums"]["transaction_status"]
          transaction_reference?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          created_by?: string | null
          id?: string
          invoice_id?: string
          notes?: string | null
          payment_date?: string
          payment_method_id?: string | null
          status?: Database["public"]["Enums"]["transaction_status"]
          transaction_reference?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
        ]
      }
      permissions: {
        Row: {
          action: string
          created_at: string
          description: string | null
          id: string
          name: string
          resource: string
          updated_at: string
        }
        Insert: {
          action: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          resource: string
          updated_at?: string
        }
        Update: {
          action?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          resource?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      role_permissions: {
        Row: {
          created_at: string
          id: string
          permission_id: string
          role: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          created_at?: string
          id?: string
          permission_id: string
          role: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          created_at?: string
          id?: string
          permission_id?: string
          role?: Database["public"]["Enums"]["app_role"]
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
      subscriptions: {
        Row: {
          amount: number
          auto_renew: boolean
          company_id: string
          created_at: string
          end_date: string | null
          id: string
          interval: Database["public"]["Enums"]["subscription_interval"]
          next_billing_date: string | null
          payment_method_id: string | null
          plan_name: string
          start_date: string
          status: Database["public"]["Enums"]["subscription_status"]
          updated_at: string
        }
        Insert: {
          amount: number
          auto_renew?: boolean
          company_id: string
          created_at?: string
          end_date?: string | null
          id?: string
          interval?: Database["public"]["Enums"]["subscription_interval"]
          next_billing_date?: string | null
          payment_method_id?: string | null
          plan_name: string
          start_date?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
        }
        Update: {
          amount?: number
          auto_renew?: boolean
          company_id?: string
          created_at?: string
          end_date?: string | null
          id?: string
          interval?: Database["public"]["Enums"]["subscription_interval"]
          next_billing_date?: string | null
          payment_method_id?: string | null
          plan_name?: string
          start_date?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
        ]
      }
      user_permissions: {
        Row: {
          created_at: string
          expires_at: string | null
          granted_by: string | null
          id: string
          permission_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          granted_by?: string | null
          id?: string
          permission_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          granted_by?: string | null
          id?: string
          permission_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          acquisition_date: string | null
          assigned_driver_id: string | null
          created_at: string | null
          current_mileage: number | null
          id: string
          insurance_expiry_date: string | null
          last_service_date: string | null
          make: string
          model: string
          mot_expiry_date: string | null
          next_service_date: string | null
          registration: string
          status: string
          tax_expiry_date: string | null
          type: string
          updated_at: string | null
          year: number | null
        }
        Insert: {
          acquisition_date?: string | null
          assigned_driver_id?: string | null
          created_at?: string | null
          current_mileage?: number | null
          id?: string
          insurance_expiry_date?: string | null
          last_service_date?: string | null
          make: string
          model: string
          mot_expiry_date?: string | null
          next_service_date?: string | null
          registration: string
          status?: string
          tax_expiry_date?: string | null
          type: string
          updated_at?: string | null
          year?: number | null
        }
        Update: {
          acquisition_date?: string | null
          assigned_driver_id?: string | null
          created_at?: string | null
          current_mileage?: number | null
          id?: string
          insurance_expiry_date?: string | null
          last_service_date?: string | null
          make?: string
          model?: string
          mot_expiry_date?: string | null
          next_service_date?: string | null
          registration?: string
          status?: string
          tax_expiry_date?: string | null
          type?: string
          updated_at?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_assigned_driver_id_fkey"
            columns: ["assigned_driver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      webhook_events: {
        Row: {
          created_at: string
          event_type: string
          id: string
          integration_id: string
          payload: Json
          processed: boolean
          processed_at: string | null
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          integration_id: string
          payload: Json
          processed?: boolean
          processed_at?: string | null
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          integration_id?: string
          payload?: Json
          processed?: boolean
          processed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "webhook_events_integration_id_fkey"
            columns: ["integration_id"]
            isOneToOne: false
            referencedRelation: "integrations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_permission: {
        Args: { permission_name: string }
        Returns: boolean
      }
      has_role: {
        Args:
          | { role_to_check: Database["public"]["Enums"]["app_role"] }
          | {
              user_id: string
              role_to_check: Database["public"]["Enums"]["app_role"]
            }
        Returns: boolean
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "admin"
        | "operations"
        | "accounts"
        | "sales"
        | "driver"
        | "customer"
      invoice_status:
        | "draft"
        | "sent"
        | "paid"
        | "overdue"
        | "cancelled"
        | "partially_paid"
      payment_method_type:
        | "credit_card"
        | "bank_transfer"
        | "cash"
        | "check"
        | "paypal"
        | "other"
      subscription_interval: "monthly" | "quarterly" | "biannual" | "annual"
      subscription_status:
        | "active"
        | "trialing"
        | "past_due"
        | "cancelled"
        | "expired"
      transaction_status:
        | "pending"
        | "completed"
        | "failed"
        | "refunded"
        | "disputed"
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
    Enums: {
      app_role: [
        "admin",
        "operations",
        "accounts",
        "sales",
        "driver",
        "customer",
      ],
      invoice_status: [
        "draft",
        "sent",
        "paid",
        "overdue",
        "cancelled",
        "partially_paid",
      ],
      payment_method_type: [
        "credit_card",
        "bank_transfer",
        "cash",
        "check",
        "paypal",
        "other",
      ],
      subscription_interval: ["monthly", "quarterly", "biannual", "annual"],
      subscription_status: [
        "active",
        "trialing",
        "past_due",
        "cancelled",
        "expired",
      ],
      transaction_status: [
        "pending",
        "completed",
        "failed",
        "refunded",
        "disputed",
      ],
    },
  },
} as const
