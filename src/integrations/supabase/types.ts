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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: { role_to_check: Database["public"]["Enums"]["app_role"] }
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
    },
  },
} as const
