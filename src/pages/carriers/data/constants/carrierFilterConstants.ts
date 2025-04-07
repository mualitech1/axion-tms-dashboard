
// Fleet type options
export const fleetTypeOptions = [
  { value: "small", label: "Small (1-5 trucks)" },
  { value: "medium", label: "Medium (6-25 trucks)" },
  { value: "large", label: "Large (26+ trucks)" },
  { value: "subcontractor", label: "Subcontractor" }
];

// Status options
export const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
  { value: "Issue", label: "Compliance Issue" }
];

// Compliance status options
export const complianceStatusOptions = [
  { value: "Compliant", label: "Fully Compliant" },
  { value: "Pending", label: "Documents Pending" },
  { value: "Expired", label: "Documents Expired" },
  { value: "NonCompliant", label: "Non-Compliant" }
];

// Capability options
export const capabilityOptions = [
  { value: 'curtain-side', label: 'Curtain-side' },
  { value: 'temperature-controlled', label: 'Temperature Controlled' },
  { value: 'adr-hazardous', label: 'ADR (Hazardous Goods)' },
  { value: 'container', label: 'Container Transport' },
  { value: 'traction-only', label: 'Traction Only' },
  { value: 'rigid', label: 'Rigid Vehicles' },
  { value: 'eu-transport', label: 'EU Transport' },
  { value: 'deep-sea', label: 'Deep-Sea Capabilities' }
];
