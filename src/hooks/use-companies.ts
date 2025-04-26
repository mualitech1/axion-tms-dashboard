
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Company } from '@/types/database';
import { useToast } from '@/hooks/use-toast';
import { queryClient, getErrorMessage } from '@/services/api-service';
import { validateData, companySchema } from '@/services/validation-service';

export function useCompanies() {
  const { toast } = useToast();

  // Fetch all companies
  const { data: companies, isLoading, error, refetch } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('companies')
          .select('*')
          .order('name');

        if (error) throw error;
        return data as Company[];
      } catch (error) {
        console.error("Error fetching companies:", error);
        throw new Error(getErrorMessage(error));
      }
    },
    staleTime: 1000 * 60 * 5, // Data considered fresh for 5 minutes
  });

  // Fetch companies by type (customer or carrier)
  const getCompaniesByType = (type: 'customer' | 'carrier') => {
    return companies?.filter(company => company.type === type) || [];
  };

  // Create company with validation
  const createCompany = useMutation({
    mutationFn: async (newCompany: Omit<Company, 'id' | 'created_at' | 'updated_at'>) => {
      try {
        // Validate company data
        const validation = validateData(newCompany, companySchema);
        if (!validation.isValid) {
          const errorMessages = Object.values(validation.errors || {}).join(', ');
          throw new Error(`Validation error: ${errorMessages}`);
        }

        const { data, error } = await supabase
          .from('companies')
          .insert(newCompany)
          .select()
          .single();

        if (error) throw error;
        return data as Company;
      } catch (error) {
        console.error("Error creating company:", error);
        throw new Error(getErrorMessage(error));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      toast({
        title: "Company Created",
        description: "The company has been successfully created.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error Creating Company",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Update company with validation
  const updateCompany = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Company> & { id: string }) => {
      try {
        // Get current company to merge with updates for validation
        const currentCompany = companies?.find(company => company.id === id);
        if (!currentCompany) {
          throw new Error("Company not found");
        }
        
        // Merge and validate
        const companyToValidate = {
          ...currentCompany,
          ...updates,
        };
        
        const validation = validateData(companyToValidate, companySchema);
        if (!validation.isValid) {
          const errorMessages = Object.values(validation.errors || {}).join(', ');
          throw new Error(`Validation error: ${errorMessages}`);
        }

        const { data, error } = await supabase
          .from('companies')
          .update(updates)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        return data as Company;
      } catch (error) {
        console.error("Error updating company:", error);
        throw new Error(getErrorMessage(error));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      toast({
        title: "Company Updated",
        description: "The company has been successfully updated.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error Updating Company",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Delete company with error handling and constraints check
  const deleteCompany = useMutation({
    mutationFn: async (id: string) => {
      try {
        // First check if company is linked to any jobs
        const { data: relatedJobs, error: jobsError } = await supabase
          .from('jobs')
          .select('id')
          .or(`customer_id.eq.${id},carrier_id.eq.${id}`)
          .limit(1);

        if (jobsError) throw jobsError;

        if (relatedJobs && relatedJobs.length > 0) {
          throw new Error("Cannot delete company: it has related jobs. Please remove the relationships first.");
        }

        const { error } = await supabase
          .from('companies')
          .delete()
          .eq('id', id);

        if (error) throw error;
      } catch (error) {
        console.error("Error deleting company:", error);
        throw new Error(getErrorMessage(error));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      toast({
        title: "Company Deleted",
        description: "The company has been successfully deleted.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error Deleting Company",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  return {
    companies,
    customers: companies?.filter(company => company.type === 'customer') || [],
    carriers: companies?.filter(company => company.type === 'carrier') || [],
    isLoading,
    error,
    refetch,
    getCompaniesByType,
    createCompany,
    updateCompany,
    deleteCompany
  };
}
