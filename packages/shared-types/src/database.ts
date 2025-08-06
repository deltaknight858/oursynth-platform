// Common Supabase JSON type
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Base database structure that can be extended by specific apps
export interface DatabaseBase {
  public: {
    Tables: Record<string, {
      Row: Record<string, any>
      Insert: Record<string, any>
      Update: Record<string, any>
      Relationships?: Array<{
        foreignKeyName: string
        columns: string[]
        referencedRelation: string
        referencedColumns: string[]
      }>
    }>
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes?: Record<string, never>
  }
}

// Common table types that appear across apps
export interface UserComponentsTable {
  Row: {
    id: string
    user_id: string
    title: string
    prompt: string
    generated_code: string
    preview_image_url?: string
    created_at: string
    updated_at: string
  }
  Insert: {
    id?: string
    user_id: string
    title: string
    prompt: string
    generated_code: string
    preview_image_url?: string
    created_at?: string
    updated_at?: string
  }
  Update: {
    id?: string
    user_id?: string
    title?: string
    prompt?: string
    generated_code?: string
    preview_image_url?: string
    created_at?: string
    updated_at?: string
  }
}

export interface DomainsTable {
  Row: {
    id: string
    user_id: string
    name: string
    purchased_at: string
    expires_at: string
    status: string
    auto_renew: boolean
    created_at: string
  }
  Insert: {
    id?: string
    user_id: string
    name: string
    purchased_at?: string
    expires_at: string
    status?: string
    auto_renew?: boolean
    created_at?: string
  }
  Update: {
    id?: string
    user_id?: string
    name?: string
    purchased_at?: string
    expires_at?: string
    status?: string
    auto_renew?: boolean
    created_at?: string
  }
}