import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Customer } from '@/types/customer';
import { useToast } from '@/hooks/use-toast';
import { getErrorMessage } from '@/utils/error-handler';

// Hook for fetching all customers with optional filters
export function useCustomers(filters?: Record<string, any>) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const {
    data: customers,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['customers', filters],
    queryFn: async () => {
      try {
        let query = supabase
          .from('companies')
          .select('*')
          .eq('type', 'customer');
        
        // Apply filters if any
        if (filters) {
          if (filters.status) {
            query = query.eq('status', filters.status);
          }
          // Add more filters as needed
        }
        
        const { data, error } = await query.order('name');
        if (error) throw error;
        
        // Transform database records to Customer type
        const customers: Customer[] = data.map(company => ({
          id: company.id,
          name: company.name,
          email: company.email || '',
          phone: company.phone || '',
          contact: company.contact_name || '',
          status: company.status,
          creditLimit: company.credit_limit || 0,
          address: company.address ? {
            street: company.address.street || '',
            city: company.address.city || '',
            state: company.address.state || '',
            postalCode: company.address.postalCode || '',
            country: company.address.country || '',
          } : {
            street: '',
            city: '',
            state: '',
            postalCode: '',
            country: '',
          },
          createdAt: company.created_at || new Date().toISOString(),
        }));
        
        return customers;
      } catch (error) {
        console.error("Error fetching customers:", error);
        throw new Error(getErrorMessage(error));
      }
    },
    meta: {
      onError: (error: Error) => {
        toast({
          title: 'Error',
          description: `Failed to load customers: ${error.message}`,
          variant: 'destructive',
        });
      }
    }
  });

  // Mutation for creating a new customer
  const createCustomer = useMutation({
    mutationFn: async (customerData: Omit<Customer, 'id' | 'createdAt'>) => {
      try {
        // Transform to database format
        const supabaseCustomer = {
          name: customerData.name,
          email: customerData.email,
          phone: customerData.phone,
          contact_name: customerData.contact,
          status: customerData.status,
          credit_limit: customerData.creditLimit,
          address: customerData.address,
          type: 'customer', // Important to identify as customer in companies table
        };
        
        const { data, error } = await supabase
          .from('companies')
          .insert(supabaseCustomer)
          .select()
          .single();

        if (error) throw error;
        return data;
      } catch (error) {
        console.error("Error creating customer:", error);
        throw new Error(getErrorMessage(error));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast({
        title: 'Success',
        description: 'Customer created successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: `Failed to create customer: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  // Mutation for updating a customer
  const updateCustomer = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Customer> & { id: string }) => {
      try {
        // Transform to database format
        const supabaseUpdates = {
          ...(updates.name && { name: updates.name }),
          ...(updates.email && { email: updates.email }),
          ...(updates.phone && { phone: updates.phone }),
          ...(updates.contact && { contact_name: updates.contact }),
          ...(updates.status && { status: updates.status }),
          ...(updates.creditLimit && { credit_limit: updates.creditLimit }),
          ...(updates.address && { address: updates.address }),
        };
        
        const { data, error } = await supabase
          .from('companies')
          .update(supabaseUpdates)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } catch (error) {
        console.error("Error updating customer:", error);
        throw new Error(getErrorMessage(error));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast({
        title: 'Success',
        description: 'Customer updated successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: `Failed to update customer: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  // Mutation for deleting a customer
  const deleteCustomer = useMutation({
    mutationFn: async (id: string) => {
      try {
        const { error } = await supabase
          .from('companies')
          .delete()
          .eq('id', id)
          .eq('type', 'customer'); // Safety check

        if (error) throw error;
      } catch (error) {
        console.error("Error deleting customer:", error);
        throw new Error(getErrorMessage(error));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast({
        title: 'Success',
        description: 'Customer deleted successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: `Failed to delete customer: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  return {
    customers,
    isLoading,
    error,
    refetch,
    createCustomer,
    updateCustomer,
    deleteCustomer
  };
}

// Hook for fetching a specific customer by ID
export function useCustomer(id?: string) {
  const { toast } = useToast();
  const enabled = id !== undefined;
  
  const {
    data: customer,
    isLoading,
    error
  } = useQuery({
    queryKey: ['customer', id],
    queryFn: async () => {
      if (!id) return null;
      
      try {
        const { data, error } = await supabase
          .from('companies')
          .select('*')
          .eq('id', id)
          .eq('type', 'customer')
          .single();

        if (error) throw error;
        
        // Transform to Customer type
        if (data) {
          const customer: Customer = {
            id: data.id,
            name: data.name,
            email: data.email || '',
            phone: data.phone || '',
            contact: data.contact_name || '',
            status: data.status,
            creditLimit: data.credit_limit || 0,
            address: data.address ? {
              street: data.address.street || '',
              city: data.address.city || '',
              state: data.address.state || '',
              postalCode: data.address.postalCode || '',
              country: data.address.country || '',
            } : {
              street: '',
              city: '',
              state: '',
              postalCode: '',
              country: '',
            },
            createdAt: data.created_at || new Date().toISOString(),
          };
          return customer;
        }
        
        return null;
      } catch (error) {
        console.error(`Error fetching customer with ID ${id}:`, error);
        throw new Error(getErrorMessage(error));
      }
    },
    enabled,
    meta: {
      onError: (error: Error) => {
        toast({
          title: 'Error',
          description: `Failed to load customer details: ${error.message}`,
          variant: 'destructive',
        });
      }
    }
  });

  return {
    customer,
    isLoading,
    error
  };
} 