import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Customer } from '@/types/customer';
import { useToast } from '@/hooks/use-toast';
import { getErrorMessage } from '@/utils/error-handler';

// Hook for fetching all customers with optional filters
export function useCustomers(filters?: Record<string, string | number | boolean>) {
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
          .from('customers')
          .select('*');
        
        // Apply filters if any
        if (filters) {
          if (filters.status) {
            query = query.eq('status', filters.status);
          }
          // Add more filters as needed
        }
        
        const { data, error } = await query.order('company_name');
        if (error) throw error;
        
        // Transform database records to Customer type
        const customers: Customer[] = data.map(customer => ({
          id: customer.id,
          name: customer.company_name,
          email: customer.operations_contact?.email || customer.finance_contact?.email || '',
          phone: customer.operations_contact?.phone || customer.finance_contact?.phone || '',
          contact: customer.operations_contact?.name || customer.finance_contact?.name || '',
          status: customer.status,
          creditLimit: customer.credit_limit_gbp || 0,
          address: customer.main_address ? {
            street: customer.main_address.street || '',
            city: customer.main_address.city || '',
            state: customer.main_address.state || '',
            postalCode: customer.main_address.postcode || '',
            country: customer.main_address.country || '',
          } : {
            street: '',
            city: '',
            state: '',
            postalCode: '',
            country: '',
          },
          createdAt: customer.created_at || new Date().toISOString(),
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
        // Transform to database format matching the actual schema
        const supabaseCustomer = {
          company_name: customerData.name,
          status: customerData.status,
          credit_limit_gbp: customerData.creditLimit,
          currency_type: 'GBP',
          main_address: customerData.address ? {
            street: customerData.address.street,
            city: customerData.address.city,
            state: customerData.address.state,
            postcode: customerData.address.postalCode,
            country: customerData.address.country,
          } : null,
          operations_contact: {
            name: customerData.contact,
            email: customerData.email,
            phone: customerData.phone,
          },
          finance_contact: {
            name: customerData.contact,
            email: customerData.email,
            phone: customerData.phone,
          },
        };
        
        const { data, error } = await supabase
          .from('customers')
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
        const supabaseUpdates: Record<string, unknown> = {};
        
        if (updates.name) supabaseUpdates.company_name = updates.name;
        if (updates.status) supabaseUpdates.status = updates.status;
        if (updates.creditLimit) supabaseUpdates.credit_limit_gbp = updates.creditLimit;
        
        if (updates.address) {
          supabaseUpdates.main_address = {
            street: updates.address.street,
            city: updates.address.city,
            state: updates.address.state,
            postcode: updates.address.postalCode,
            country: updates.address.country,
          };
        }
        
        if (updates.contact || updates.email || updates.phone) {
          // Update operations contact
          supabaseUpdates.operations_contact = {
            name: updates.contact,
            email: updates.email,
            phone: updates.phone,
          };
        }
        
        const { data, error } = await supabase
          .from('customers')
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
          .from('customers')
          .delete()
          .eq('id', id);

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
          .from('customers')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        
        // Transform to Customer type
        if (data) {
          const customer: Customer = {
            id: data.id,
            name: data.company_name,
            email: data.operations_contact?.email || data.finance_contact?.email || '',
            phone: data.operations_contact?.phone || data.finance_contact?.phone || '',
            contact: data.operations_contact?.name || data.finance_contact?.name || '',
            status: data.status,
            creditLimit: data.credit_limit_gbp || 0,
            address: data.main_address ? {
              street: data.main_address.street || '',
              city: data.main_address.city || '',
              state: data.main_address.state || '',
              postalCode: data.main_address.postcode || '',
              country: data.main_address.country || '',
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