
import { supabase } from '@/integrations/supabase/client';
import { Vehicle, MaintenanceRecord } from '@/types/vehicle';
import { getErrorMessage } from '@/utils/error-handler';

/**
 * Fleet service for managing vehicle data
 */
export const fleetService = {
  /**
   * Get all vehicles with optional filtering
   */
  async getVehicles(filters?: Record<string, any>): Promise<Vehicle[]> {
    try {
      let query = supabase.from('vehicles').select('*');
      
      // Apply filters if provided
      if (filters) {
        if (filters.status) {
          query = query.eq('status', filters.status);
        }
        
        if (filters.type) {
          query = query.eq('type', filters.type);
        }
        
        if (filters.make) {
          query = query.eq('make', filters.make);
        }
      }
      
      const { data, error } = await query.order('registration');
      
      if (error) throw error;
      return data as Vehicle[];
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      throw new Error(getErrorMessage(error));
    }
  },
  
  /**
   * Get a vehicle by ID
   */
  async getVehicleById(id: string): Promise<Vehicle> {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Vehicle;
    } catch (error) {
      console.error(`Error fetching vehicle with ID ${id}:`, error);
      throw new Error(getErrorMessage(error));
    }
  },
  
  /**
   * Create a new vehicle
   */
  async createVehicle(vehicleData: Omit<Vehicle, 'id'>): Promise<Vehicle> {
    try {
      // Convert year to number if it's a string
      const processedData = {
        ...vehicleData,
        year: vehicleData.year ? Number(vehicleData.year) : null
      };
      
      const { data, error } = await supabase
        .from('vehicles')
        .insert([processedData])
        .select()
        .single();
      
      if (error) throw error;
      return data as Vehicle;
    } catch (error) {
      console.error('Error creating vehicle:', error);
      throw new Error(getErrorMessage(error));
    }
  },
  
  /**
   * Update an existing vehicle
   */
  async updateVehicle(id: string, vehicleData: Partial<Vehicle>): Promise<Vehicle> {
    try {
      // Convert year to number if it's present and a string
      const processedData = {
        ...vehicleData,
        year: vehicleData.year !== undefined ? Number(vehicleData.year) : undefined
      };
      
      const { data, error } = await supabase
        .from('vehicles')
        .update(processedData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Vehicle;
    } catch (error) {
      console.error(`Error updating vehicle with ID ${id}:`, error);
      throw new Error(getErrorMessage(error));
    }
  },
  
  /**
   * Delete a vehicle
   */
  async deleteVehicle(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    } catch (error) {
      console.error(`Error deleting vehicle with ID ${id}:`, error);
      throw new Error(getErrorMessage(error));
    }
  },
  
  /**
   * Get maintenance records for a vehicle
   */
  async getMaintenanceRecords(vehicleId: string): Promise<MaintenanceRecord[]> {
    try {
      // This is a placeholder - in a real application, you would have a maintenance_records table
      console.log(`Would fetch maintenance records for vehicle ${vehicleId}`);
      
      // Mock data for now
      return [
        {
          id: '1',
          vehicle_id: vehicleId,
          service_type: 'Full Service',
          date: new Date().toISOString(),
          mileage: 45000,
          description: 'Oil and filter change, brake inspection',
          technician: 'Mike Johnson'
        },
        {
          id: '2',
          vehicle_id: vehicleId,
          service_type: 'Annual Maintenance',
          date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
          mileage: 40000,
          description: 'Annual maintenance and safety check',
          technician: 'Sarah Williams'
        }
      ] as MaintenanceRecord[];
    } catch (error) {
      console.error(`Error fetching maintenance records for vehicle ${vehicleId}:`, error);
      throw new Error(getErrorMessage(error));
    }
  },
  
  /**
   * Get vehicles requiring maintenance within a specific timeframe (in days)
   */
  async getVehiclesRequiringMaintenance(days: number = 30): Promise<Vehicle[]> {
    try {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + days);
      const futureDateStr = futureDate.toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .lte('next_service_date', futureDateStr);
      
      if (error) throw error;
      return data as Vehicle[];
    } catch (error) {
      console.error('Error fetching vehicles requiring maintenance:', error);
      throw new Error(getErrorMessage(error));
    }
  },
  
  /**
   * Get vehicles with expiring MOTs within a specific timeframe (in days)
   */
  async getVehiclesWithExpiringMOT(days: number = 30): Promise<Vehicle[]> {
    try {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + days);
      const futureDateStr = futureDate.toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .lte('mot_expiry_date', futureDateStr);
      
      if (error) throw error;
      return data as Vehicle[];
    } catch (error) {
      console.error('Error fetching vehicles with expiring MOT:', error);
      throw new Error(getErrorMessage(error));
    }
  }
};
