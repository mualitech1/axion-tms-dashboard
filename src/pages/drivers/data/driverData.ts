
import { Driver } from '../types/driverTypes';

export const drivers: Driver[] = [
  {
    id: 1,
    name: "John Smith",
    nationalInsurance: "AB123456C",
    address: "123 Driver Lane, London, UK",
    phoneNumber: "07700 900123",
    email: "john.smith@example.com",
    status: "Active",
    license: {
      number: "SMITH91234",
      expiryDate: "2026-05-15",
      categories: ["C", "CE", "D1"]
    },
    cpc: {
      number: "CPC12345",
      expiryDate: "2025-09-10",
      completedHours: 35,
      requiredHours: 35
    },
    kpi: {
      onTimeDeliveries: 95,
      fuelEfficiency: 89,
      safetyScore: 92,
      customerSatisfaction: 90
    },
    joinDate: "2020-03-15"
  },
  {
    id: 2,
    name: "Emma Johnson",
    nationalInsurance: "CD654321A",
    address: "45 Haul Street, Manchester, UK",
    phoneNumber: "07700 900456",
    email: "emma.johnson@example.com",
    status: "Active",
    license: {
      number: "JOHNS98765",
      expiryDate: "2027-11-22",
      categories: ["C1", "C", "CE"]
    },
    cpc: {
      number: "CPC54321",
      expiryDate: "2026-04-30",
      completedHours: 28,
      requiredHours: 35
    },
    kpi: {
      onTimeDeliveries: 98,
      fuelEfficiency: 92,
      safetyScore: 95,
      customerSatisfaction: 97
    },
    joinDate: "2019-06-20",
    emergencyContact: "07700 900789"
  },
  {
    id: 3,
    name: "David Lee",
    nationalInsurance: "EF789012B",
    address: "78 Transport Road, Birmingham, UK",
    phoneNumber: "07700 900789",
    email: "david.lee@example.com",
    status: "On Leave",
    license: {
      number: "LEE876543",
      expiryDate: "2025-08-14",
      categories: ["C", "CE"]
    },
    cpc: {
      number: "CPC67890",
      expiryDate: "2024-12-15",
      completedHours: 20,
      requiredHours: 35
    },
    kpi: {
      onTimeDeliveries: 88,
      fuelEfficiency: 85,
      safetyScore: 90,
      customerSatisfaction: 85
    },
    joinDate: "2021-01-10"
  },
  {
    id: 4,
    name: "Sarah Wilson",
    nationalInsurance: "GH345678D",
    address: "23 Delivery Avenue, Leeds, UK",
    phoneNumber: "07700 901234",
    email: "sarah.wilson@example.com",
    status: "Inactive",
    license: {
      number: "WILSO45678",
      expiryDate: "2026-02-28",
      categories: ["C1", "C"]
    },
    cpc: {
      number: "CPC23456",
      expiryDate: "2025-07-20",
      completedHours: 35,
      requiredHours: 35
    },
    kpi: {
      onTimeDeliveries: 92,
      fuelEfficiency: 88,
      safetyScore: 94,
      customerSatisfaction: 91
    },
    joinDate: "2022-04-05"
  }
];
