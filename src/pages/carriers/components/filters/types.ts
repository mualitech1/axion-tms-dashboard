
import { CarrierCapability } from "./CapabilityFilter";

export interface CarrierFilterOptions {
  status: string | null;
  region: string | null;
  fleetType: string | null;
  complianceStatus: string | null;
  favorites: boolean;
  capabilities: CarrierCapability[];
  regions?: string[];
}

export interface RegionOption {
  id: string;
  label: string;
  description?: string;
}
