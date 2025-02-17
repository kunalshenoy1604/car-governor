
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
      cars: {
        Row: {
          id: string
          brand: string
          model: string
          year: number
          price: number
          image: string
          features: string[]
          fuel_type: string
          seating_capacity: number
          transmission: string
          images: string[]
          specs: Json
          description: string
          available: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          brand: string
          model: string
          year: number
          price: number
          image: string
          features?: string[]
          fuel_type: string
          seating_capacity: number
          transmission: string
          images?: string[]
          specs?: Json
          description?: string
          available?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          brand?: string
          model?: string
          year?: number
          price?: number
          image?: string
          features?: string[]
          fuel_type?: string
          seating_capacity?: number
          transmission?: string
          images?: string[]
          specs?: Json
          description?: string
          available?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          car_id: string
          user_id: string
          start_date: string
          duration: number
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          total_price: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          car_id: string
          user_id: string
          start_date: string
          duration: number
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          total_price: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          car_id?: string
          user_id?: string
          start_date?: string
          duration?: number
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          total_price?: number
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          name: string
          phone: string
          avatar_url: string | null
          role: 'admin' | 'user'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          phone?: string
          avatar_url?: string | null
          role?: 'admin' | 'user'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          phone?: string
          avatar_url?: string | null
          role?: 'admin' | 'user'
          created_at?: string
          updated_at?: string
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
