
export interface CarrierPerformanceMetrics {
  carrierId: number;
  carrierName: string;
  onTimeDeliveryRate: number;
  complianceScore: number;
  responseTime: number; // in hours
  documentationAccuracy: number; // 0-100%
  incidentRate: number; // per 100 deliveries
  customerSatisfactionScore: number; // 0-5 stars
  period: string; // e.g. "Q1 2025", "Last 30 Days"
}

export interface ComplianceReportItem {
  id: number;
  carrierName: string;
  status: 'Compliant' | 'Non-Compliant' | 'Action Required';
  documentStatus: {
    insurance: 'Valid' | 'Expired' | 'Missing';
    license: 'Valid' | 'Expired' | 'Missing';
    certification: 'Valid' | 'Expired' | 'Missing';
  };
  lastAuditDate: string;
  nextAuditDate: string;
  notes?: string;
}

export interface PerformanceChartData {
  name: string;
  value: number;
  [key: string]: any;
}

export interface ComplianceStatusData {
  status: string;
  count: number;
  color: string;
}

export interface CarrierPerformanceFilters {
  timeframe: 'last30' | 'last90' | 'last180' | 'lastYear';
  complianceStatus?: 'Compliant' | 'Non-Compliant' | 'Action Required' | 'All';
  minPerformanceScore?: number;
  carrierIds?: number[];
  regions?: string[];
}
