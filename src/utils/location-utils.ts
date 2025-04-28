
import { JobLocation } from '@/types/database';

export const locationToJson = (location: JobLocation | Record<string, any>) => {
  return location;
};

export const jsonToLocation = (json: any): JobLocation => {
  if (!json) return { address: '', city: '', postcode: '', country: '' };
  return json as JobLocation;
};
