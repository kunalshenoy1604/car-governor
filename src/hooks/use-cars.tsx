
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/database.types';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

type Car = Database['public']['Tables']['cars']['Row'];
type InsertCar = Database['public']['Tables']['cars']['Insert'];
type UpdateCar = Database['public']['Tables']['cars']['Update'];

export function useCars() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: cars = [], isLoading } = useQuery({
    queryKey: ['cars'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  // Set up realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'cars'
        },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ['cars'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const addCar = useMutation({
    mutationFn: async (newCar: InsertCar) => {
      const { data, error } = await supabase
        .from('cars')
        .insert(newCar)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Car added successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to add car: ' + error.message,
        variant: 'destructive',
      });
    },
  });

  const updateCar = useMutation({
    mutationFn: async ({ id, ...updates }: UpdateCar & { id: string }) => {
      const { data, error } = await supabase
        .from('cars')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Car updated successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to update car: ' + error.message,
        variant: 'destructive',
      });
    },
  });

  const deleteCar = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('cars').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Car deleted successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to delete car: ' + error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    cars,
    isLoading,
    addCar,
    updateCar,
    deleteCar,
  };
}
