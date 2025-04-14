
import { Vehicle, ServiceRecord } from '../types/fleetTypes';

// Sample service records
const sampleServices: ServiceRecord[] = [
  {
    id: 1,
    date: "2023-11-15",
    mileage: 85000,
    type: "Regular",
    description: "Oil change, filter replacement",
    cost: 220,
    provider: "TruckServe Ltd."
  },
  {
    id: 2,
    date: "2023-07-22",
    mileage: 75000,
    type: "MOT",
    description: "Annual MOT inspection",
    cost: 350,
    provider: "National Testing Center"
  },
  {
    id: 3,
    date: "2023-04-10",
    mileage: 68000,
    type: "Repair",
    description: "Brake pad replacement",
    cost: 520,
    provider: "TruckServe Ltd."
  },
  {
    id: 4,
    date: "2022-12-05",
    mileage: 60000,
    type: "Regular",
    description: "Standard 60k service",
    cost: 850,
    provider: "Commercial Vehicle Services"
  }
];

// Sample vehicles
export const vehicles: Vehicle[] = [
  {
    id: 1,
    registration: "AB12 CDE",
    make: "Volvo",
    model: "FH16",
    year: 2021,
    type: "Truck",
    status: "Active",
    motExpiryDate: "2024-07-22",
    taxExpiryDate: "2024-05-15",
    insuranceExpiryDate: "2024-06-30",
    lastServiceDate: "2023-11-15",
    nextServiceDate: "2024-05-15",
    currentMileage: 95000,
    acquisitionDate: "2021-03-10",
    serviceHistory: sampleServices,
    assignedDriverId: 1
  },
  {
    id: 2,
    registration: "CD34 EFG",
    make: "DAF",
    model: "XF",
    year: 2020,
    type: "Truck",
    status: "Active",
    motExpiryDate: "2024-08-15",
    taxExpiryDate: "2024-09-22",
    insuranceExpiryDate: "2024-10-05",
    lastServiceDate: "2023-10-20",
    nextServiceDate: "2024-04-20",
    currentMileage: 110000,
    acquisitionDate: "2020-05-17",
    serviceHistory: [
      ...sampleServices.map(s => ({...s, id: s.id + 10, date: "2023-10-20", mileage: 110000 - Math.floor(Math.random() * 10000)}))
    ],
    assignedDriverId: 2
  },
  {
    id: 3,
    registration: "EF56 GHI",
    make: "Mercedes-Benz",
    model: "Actros",
    year: 2022,
    type: "Truck",
    status: "Maintenance",
    motExpiryDate: "2025-01-10",
    taxExpiryDate: "2024-12-15",
    insuranceExpiryDate: "2024-11-30",
    lastServiceDate: "2023-12-10",
    nextServiceDate: "2024-06-10",
    currentMileage: 65000,
    acquisitionDate: "2022-02-05",
    serviceHistory: [
      ...sampleServices.map(s => ({...s, id: s.id + 20, date: "2023-12-10", mileage: 65000 - Math.floor(Math.random() * 8000)}))
    ]
  },
  {
    id: 4,
    registration: "GH78 IJK",
    make: "Ford",
    model: "Transit",
    year: 2021,
    type: "Van",
    status: "Out of Service",
    motExpiryDate: "2024-05-20",
    taxExpiryDate: "2024-05-01",
    insuranceExpiryDate: "2024-06-15",
    lastServiceDate: "2023-08-05",
    nextServiceDate: "2024-02-05",
    currentMileage: 85000,
    acquisitionDate: "2021-07-22",
    serviceHistory: [
      ...sampleServices.map(s => ({...s, id: s.id + 30, date: "2023-08-05", mileage: 85000 - Math.floor(Math.random() * 10000)}))
    ]
  }
];
