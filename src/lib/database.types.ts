export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          first_name: string | null
          last_name: string | null
          role: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          first_name?: string | null
          last_name?: string | null
          role?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          first_name?: string | null
          last_name?: string | null
          role?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      menu_items: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          category: string
          image_url: string | null
          is_available: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          category: string
          image_url?: string | null
          is_available?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          category?: string
          image_url?: string | null
          is_available?: boolean
          created_at?: string
        }
      }
      reservations: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          date: string
          time: string
          guests: number
          special_requests: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          date: string
          time: string
          guests: number
          special_requests?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          date?: string
          time?: string
          guests?: number
          special_requests?: string | null
          status?: string
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          status: string
          total: number
          items: Json
          delivery_address: string | null
          contact_phone: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          status?: string
          total: number
          items: Json
          delivery_address?: string | null
          contact_phone: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          status?: string
          total?: number
          items?: Json
          delivery_address?: string | null
          contact_phone?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
  }
}