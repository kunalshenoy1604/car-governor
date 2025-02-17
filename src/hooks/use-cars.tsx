
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/database.types';
import { useToast } from '@/hooks/use-toast';

type Car = Database['public']['Tables']['cars']['Row'];
type InsertCar = Database['public']['Tables']['cars']['Insert'];
type UpdateCar = Database['public']['Tables']['cars']['Update'];

export function useCars() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: cars, isLoading } = useQuery({
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
      queryClient.invalidateQueries({ queryKey: ['cars'] });
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
      queryClient.invalidateQueries({ queryKey: ['cars'] });
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
      queryClient.invalidateQueries({ queryKey: ['cars'] });
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
