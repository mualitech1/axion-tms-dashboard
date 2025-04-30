
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fleetService } from '@/services/fleet-service';
import { Vehicle, VehicleFilters, MaintenanceRecord } from '@/types/vehicle';
import { useToast } from '@/hooks/use-toast';

export function useVehicles(filters?: VehicleFilters) {
  const { toast } = useToast();
  
  const {
    data: vehicles,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['vehicles', filters],
    queryFn: () => fleetService.getVehicles(filters),
    meta: {
      onError: (error: Error) => {
        toast({
          title: 'Error',
          description: `Failed to load vehicles: ${error.message}`,
          variant: 'destructive',
        });
      }
    }
  });
  
  return {
    vehicles: vehicles || [],
    isLoading,
    error,
    refetch
  };
}

export function useVehicleById(id?: string) {
  const { toast } = useToast();
  const enabled = !!id;
  
  const {
    data: vehicle,
    isLoading,
    error
  } = useQuery({
    queryKey: ['vehicle', id],
    queryFn: () => id ? fleetService.getVehicleById(id) : null,
    enabled,
    meta: {
      onError: (error: Error) => {
        toast({
          title: 'Error',
          description: `Failed to load vehicle details: ${error.message}`,
          variant: 'destructive',
        });
      }
    }
  });
  
  return {
    vehicle,
    isLoading,
    error
  };
}

export function useMaintenanceRecords(vehicleId?: string) {
  const { toast } = useToast();
  const enabled = !!vehicleId;
  
  const {
    data: maintenanceRecords,
    isLoading,
    error
  } = useQuery({
    queryKey: ['maintenance', vehicleId],
    queryFn: () => vehicleId ? fleetService.getMaintenanceRecords(vehicleId) : [],
    enabled,
    meta: {
      onError: (error: Error) => {
        toast({
          title: 'Error',
          description: `Failed to load maintenance records: ${error.message}`,
          variant: 'destructive',
        });
      }
    }
  });
  
  return {
    maintenanceRecords: maintenanceRecords || [],
    isLoading,
    error
  };
}

export function useFleetMutations() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const createVehicle = useMutation({
    mutationFn: (vehicleData: Omit<Vehicle, 'id'>) => fleetService.createVehicle(vehicleData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      toast({
        title: 'Success',
        description: 'Vehicle created successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: `Failed to create vehicle: ${error.message}`,
        variant: 'destructive',
      });
    }
  });
  
  const updateVehicle = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Vehicle> }) => fleetService.updateVehicle(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      queryClient.invalidateQueries({ queryKey: ['vehicle', data.id] });
      toast({
        title: 'Success',
        description: 'Vehicle updated successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: `Failed to update vehicle: ${error.message}`,
        variant: 'destructive',
      });
    }
  });
  
  const deleteVehicle = useMutation({
    mutationFn: (id: string) => fleetService.deleteVehicle(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      queryClient.removeQueries({ queryKey: ['vehicle', id] });
      toast({
        title: 'Success',
        description: 'Vehicle deleted successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: `Failed to delete vehicle: ${error.message}`,
        variant: 'destructive',
      });
    }
  });
  
  return {
    createVehicle,
    updateVehicle,
    deleteVehicle
  };
}
