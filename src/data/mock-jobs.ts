import { Job, JobStatus } from '@/pages/jobs/types/jobTypes';

// Mock job data to use if database retrieval fails
export const mockJobs: Job[] = [
  {
    id: 'job_1',
    reference: 'AXM-001-QM',
    title: 'Quantum Transport Operation Alpha',
    status: 'booked' as JobStatus,
    priority: 'high',
    pickup_date: new Date().toISOString(),
    created_at: new Date().toISOString(),
    customer_id: 'customer_1',
    carrier_id: null,
    vehicle_id: null,
    driver_id: null,
    customer: {
      id: 'customer_1',
      name: 'Quantum Industries Ltd',
      email: 'operations@quantum-industries.example'
    },
    carrier: null,
    pickup_location: JSON.stringify({
      address: '123 Quantum Way',
      city: 'Cambridge',
      postcode: 'CB1 2QT',
      country: 'United Kingdom',
      notes: 'Entrance via the north gate'
    }),
    delivery_location: JSON.stringify({
      address: '456 Particle Drive',
      city: 'Oxford',
      postcode: 'OX1 3DP',
      country: 'United Kingdom',
      notes: 'Delivery to Loading Bay 3'
    }),
    value: 1250.00,
    notes: 'Handle with care - sensitive quantum equipment',
    estimated_duration: 180, // minutes
    pod_uploaded: false,
    pod_document_id: null,
    issue_details: null,
    created_by: 'system',
    updated_at: new Date().toISOString()
  },
  {
    id: 'job_2',
    reference: 'AXM-002-QM',
    title: 'Entangled Particle Shipment',
    status: 'in-progress' as JobStatus,
    priority: 'medium',
    pickup_date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    created_at: new Date(Date.now() - 172800000).toISOString(),
    updated_at: new Date(Date.now() - 43200000).toISOString(),
    customer_id: 'customer_1',
    carrier_id: 'carrier_1',
    vehicle_id: 'vehicle_1',
    driver_id: 'driver_1',
    customer: {
      id: 'customer_1',
      name: 'Quantum Industries Ltd',
      email: 'operations@quantum-industries.example'
    },
    carrier: {
      id: 'carrier_1',
      name: 'Waveform Logistics',
      email: 'dispatch@waveform-logistics.example'
    },
    pickup_location: JSON.stringify({
      address: '789 Hadron Lane',
      city: 'Manchester',
      postcode: 'M1 7QP',
      country: 'United Kingdom',
      notes: 'Security clearance required'
    }),
    delivery_location: JSON.stringify({
      address: '321 Boson Street',
      city: 'Birmingham',
      postcode: 'B1 1EP',
      country: 'United Kingdom',
      notes: 'Temperature-controlled receiving area'
    }),
    value: 2750.00,
    notes: 'Temperature must be maintained at -20°C',
    estimated_duration: 240, // minutes
    pod_uploaded: false,
    pod_document_id: null,
    issue_details: null,
    created_by: 'system'
  },
  {
    id: 'job_3',
    reference: 'AXM-003-QM',
    title: 'Quantum Computing Equipment Transfer',
    status: 'completed' as JobStatus,
    priority: 'high',
    pickup_date: new Date(Date.now() - 604800000).toISOString(), // Last week
    created_at: new Date(Date.now() - 1209600000).toISOString(),
    updated_at: new Date(Date.now() - 518400000).toISOString(),
    customer_id: 'customer_2',
    carrier_id: 'carrier_1',
    vehicle_id: 'vehicle_2',
    driver_id: 'driver_2',
    customer: {
      id: 'customer_2',
      name: 'Neural Networks Inc',
      email: 'logistics@neural-networks.example'
    },
    carrier: {
      id: 'carrier_1',
      name: 'Waveform Logistics',
      email: 'dispatch@waveform-logistics.example'
    },
    pickup_location: JSON.stringify({
      address: '42 Superposition Road',
      city: 'Edinburgh',
      postcode: 'EH1 1QC',
      country: 'United Kingdom',
      notes: 'Loading dock at rear of building'
    }),
    delivery_location: JSON.stringify({
      address: '7 Quantum Loop',
      city: 'London',
      postcode: 'EC3A 8BF',
      country: 'United Kingdom',
      notes: 'Deliver to 15th floor, requires booking'
    }),
    value: 8500.00,
    notes: 'Fragile quantum computing components',
    estimated_duration: 360, // minutes
    pod_uploaded: true,
    pod_document_id: 'doc_qc456',
    issue_details: null,
    created_by: 'admin'
  }
]; 