import { useState, useEffect } from 'react';

// Mock customer data with text-based IDs (ideally these would be fetched from API)
// NOTE: These were formerly UUIDs but now use Text format as per backend schema change
const CUSTOMER_MAPPINGS = {
  'acme': 'customer_01H5ZXVBTPQFRF3AHMS9XPPT8E',
  'globex': 'customer_01H5ZXVBTPQFRF3AHMS9XPPT8F',
  'stark': 'customer_01H5ZXVBTPQFRF3AHMS9XPPT8G',
  'wayne': 'customer_01H5ZXVBTPQFRF3AHMS9XPPT8H',
  'oscorp': 'customer_01H5ZXVBTPQFRF3AHMS9XPPT8I'
};

// Mock vehicle data with text-based IDs
// NOTE: These were formerly UUIDs but now use Text format as per backend schema change
const VEHICLE_MAPPINGS = {
  'van': 'vehicle_01H5ZXVBTPQFRF3AHMS9XPPT8J',
  'sprinter': 'vehicle_01H5ZXVBTPQFRF3AHMS9XPPT8K',
  'luton': 'vehicle_01H5ZXVBTPQFRF3AHMS9XPPT8L',
  '7.5t': 'vehicle_01H5ZXVBTPQFRF3AHMS9XPPT8M',
  '18t': 'vehicle_01H5ZXVBTPQFRF3AHMS9XPPT8N',
  'artic': 'vehicle_01H5ZXVBTPQFRF3AHMS9XPPT8O'
};

/**
 * Hook to map form string values to database text-based IDs
 * This serves as a bridge between frontend form values and backend ID expectations
 * 
 * IMPORTANT UPDATE: Backend now uses Text format for IDs instead of UUIDs
 */
export function useIdMapper() {
  // Convert customer name to ID
  const getCustomerId = (customerName: string): string | null => {
    return CUSTOMER_MAPPINGS[customerName] || null;
  };

  // Convert vehicle type to ID
  const getVehicleId = (vehicleType: string): string | null => {
    return VEHICLE_MAPPINGS[vehicleType] || null;
  };

  // Debug method to log all mappings
  const logMappings = () => {
    console.log("Available customer mappings:", CUSTOMER_MAPPINGS);
    console.log("Available vehicle mappings:", VEHICLE_MAPPINGS);
  };

  return {
    getCustomerId,
    getVehicleId,
    logMappings
  };
} 