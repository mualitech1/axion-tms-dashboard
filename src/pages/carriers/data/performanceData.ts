
import { carrierData } from "./carrierData";
import { CarrierPerformanceMetrics, ComplianceReportItem, ComplianceStatusData } from "./types/performanceTypes";

// Generate performance metrics for sample carriers
export const generatePerformanceData = (): CarrierPerformanceMetrics[] => {
  const periods = ["Last 30 Days", "Last 90 Days", "Q1 2025", "Q2 2025"];
  
  return carrierData.slice(0, 10).map(carrier => ({
    carrierId: carrier.id,
    carrierName: carrier.name,
    onTimeDeliveryRate: Math.round(75 + Math.random() * 25),
    complianceScore: Math.round(80 + Math.random() * 20),
    responseTime: parseFloat((2 + Math.random() * 10).toFixed(1)),
    documentationAccuracy: Math.round(85 + Math.random() * 15),
    incidentRate: parseFloat((0.5 + Math.random() * 3).toFixed(1)),
    customerSatisfactionScore: parseFloat((3 + Math.random() * 2).toFixed(1)),
    period: periods[Math.floor(Math.random() * periods.length)]
  }));
};

// Generate compliance report data
export const generateComplianceData = (): ComplianceReportItem[] => {
  const statuses = ['Compliant', 'Non-Compliant', 'Action Required'];
  const documentStatuses = ['Valid', 'Expired', 'Missing'];
  
  return carrierData.slice(0, 15).map(carrier => {
    const statusIndex = carrier.complianceStatus === 'Compliant' ? 0 : 
                       carrier.complianceStatus === 'Non-Compliant' ? 1 : 2;
    
    // Create a random date in the past 3 months
    const lastAuditDate = new Date();
    lastAuditDate.setDate(lastAuditDate.getDate() - Math.floor(Math.random() * 90));
    
    // Create a random date in the next 6 months
    const nextAuditDate = new Date();
    nextAuditDate.setDate(nextAuditDate.getDate() + Math.floor(Math.random() * 180));
    
    return {
      id: carrier.id,
      carrierName: carrier.name,
      status: statuses[statusIndex] as 'Compliant' | 'Non-Compliant' | 'Action Required',
      documentStatus: {
        insurance: documentStatuses[Math.floor(Math.random() * 3)] as 'Valid' | 'Expired' | 'Missing',
        license: documentStatuses[Math.floor(Math.random() * 3)] as 'Valid' | 'Expired' | 'Missing',
        certification: documentStatuses[Math.floor(Math.random() * 3)] as 'Valid' | 'Expired' | 'Missing',
      },
      lastAuditDate: lastAuditDate.toISOString().split('T')[0],
      nextAuditDate: nextAuditDate.toISOString().split('T')[0],
      notes: Math.random() > 0.5 ? "Follow-up required on documentation" : undefined
    };
  });
};

// Generate compliance status summary data for charts
export const generateComplianceStatusData = (): ComplianceStatusData[] => {
  const compliantCount = Math.floor(70 + Math.random() * 20);
  const nonCompliantCount = Math.floor(5 + Math.random() * 10);
  const actionRequiredCount = Math.floor(10 + Math.random() * 20);
  
  return [
    { status: 'Compliant', count: compliantCount, color: '#10b981' },
    { status: 'Non-Compliant', count: nonCompliantCount, color: '#ef4444' },
    { status: 'Action Required', count: actionRequiredCount, color: '#f59e0b' },
  ];
};

// Performance metrics over time (monthly data for the current year)
export const performanceOverTimeData = [
  { name: 'Jan', onTime: 87, compliance: 91, incidents: 3 },
  { name: 'Feb', onTime: 85, compliance: 90, incidents: 4 },
  { name: 'Mar', onTime: 89, compliance: 92, incidents: 2 },
  { name: 'Apr', onTime: 91, compliance: 94, incidents: 2 },
  { name: 'May', onTime: 88, compliance: 91, incidents: 3 },
  { name: 'Jun', onTime: 90, compliance: 93, incidents: 2 },
];

// Carrier scores comparison data
export const carrierScoresData = carrierData.slice(0, 5).map(carrier => ({
  name: carrier.name.split(' ')[0], // Just use the first word of the name to keep it short
  performanceScore: Math.round(70 + Math.random() * 30)
}));

// Export instantiated data
export const performanceData = generatePerformanceData();
export const complianceReportData = generateComplianceData();
export const complianceStatusData = generateComplianceStatusData();
