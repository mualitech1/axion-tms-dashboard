export interface Carrier {
  id: number;
  name: string;
  region: string;
  fleet: string;
  status: 'Active' | 'Inactive' | 'Issue';
  favorite: boolean;
}

// Update the carrier data to include status and favorite
export const carrierData: Carrier[] = [
  { id: 1, name: 'City Distribution Ltd', region: 'London', fleet: 'LGV', status: 'Issue', favorite: true },
  { id: 2, name: 'Long Haul Transport', region: 'Manchester', fleet: 'HGV', status: 'Active', favorite: false },
  { id: 3, name: 'Swift Freight Services', region: 'Birmingham', fleet: 'Mixed Fleet', status: 'Active', favorite: true },
  { id: 4, name: 'Global Logistics Co.', region: 'Glasgow', fleet: 'HGV', status: 'Active', favorite: false },
  { id: 5, name: 'Regional Express', region: 'Liverpool', fleet: 'LGV', status: 'Active', favorite: false },
  { id: 6, name: 'Island Carriers', region: 'Belfast', fleet: 'Multimodal', status: 'Issue', favorite: false },
  { id: 7, name: 'Northern Transport', region: 'Newcastle', fleet: 'HGV', status: 'Inactive', favorite: false },
  { id: 8, name: 'Southern Freight Ltd', region: 'Southampton', fleet: 'LGV', status: 'Active', favorite: true },
  { id: 9, name: 'Midland Logistics', region: 'Leeds', fleet: 'Mixed Fleet', status: 'Active', favorite: false },
  { id: 10, name: 'Eastern Carriers', region: 'Norwich', fleet: 'Multimodal', status: 'Active', favorite: false },
  { id: 11, name: 'Western Transport', region: 'Bristol', fleet: 'HGV', status: 'Active', favorite: false },
  { id: 12, name: 'Coastal Shipping', region: 'Cardiff', fleet: 'Multimodal', status: 'Active', favorite: false },
  { id: 13, name: 'Highland Haulers', region: 'Inverness', fleet: 'Mixed Fleet', status: 'Issue', favorite: false },
  { id: 14, name: 'Valley Distribution', region: 'Sheffield', fleet: 'LGV', status: 'Active', favorite: false },
  { id: 15, name: 'Peak Transport', region: 'Derby', fleet: 'HGV', status: 'Active', favorite: true }
];
