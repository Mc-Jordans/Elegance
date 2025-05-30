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
          created_at: string
          updated_at: string
          first_name: string | null
          last_name: string | null
          avatar_url: string | null
          phone: string | null
          role: 'user' | 'admin'
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          role?: 'user' | 'admin'
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          role?: 'user' | 'admin'
          user_id?: string
        }
      }
      orders: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          status: 'pending' | 'processing' | 'completed' | 'cancelled'
          total: number
          payment_intent: string | null
          delivery_address: Json | null
          items: Json[]
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          status?: 'pending' | 'processing' | 'completed' | 'cancelled'
          total: number
          payment_intent?: string | null
          delivery_address?: Json | null
          items: Json[]
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          status?: 'pending' | 'processing' | 'completed' | 'cancelled'
          total?: number
          payment_intent?: string | null
          delivery_address?: Json | null
          items?: Json[]
        }
      }
      menu_items: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          description: string
          price: number
          category: string
          image_url: string
          is_available: boolean
          dietary_info: string[]
          featured: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          description: string
          price: number
          category: string
          image_url: string
          is_available?: boolean
          dietary_info?: string[]
          featured?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          description?: string
          price?: number
          category?: string
          image_url?: string
          is_available?: boolean
          dietary_info?: string[]
          featured?: boolean
        }
      }
      reviews: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          rating: number
          comment: string
          location: string
          is_published: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          rating: number
          comment: string
          location: string
          is_published?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          rating?: number
          comment?: string
          location?: string
          is_published?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}