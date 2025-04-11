
// Mock data for dashboard components

export const mockJobsData = {
  inTransit: 34,
  requireAction: 12,
  readyForInvoicing: 8
};

export const mockFinancialData = {
  monthlyRevenue: 187450,
  upcomingPayments: 42680,
  invoiceDisputes: {
    count: 7,
    value: 15820
  },
  overdueInvoices: {
    count: 12,
    value: 24850
  }
};

export const mockDeliveryPerformance = [
  { name: "Mon", onTime: 28, delayed: 4 },
  { name: "Tue", onTime: 32, delayed: 2 },
  { name: "Wed", onTime: 25, delayed: 7 },
  { name: "Thu", onTime: 31, delayed: 3 },
  { name: "Fri", onTime: 29, delayed: 5 },
  { name: "Sat", onTime: 15, delayed: 1 },
  { name: "Sun", onTime: 12, delayed: 0 },
];

export const mockComplianceAlerts = {
  totalCarriersWithIssues: 8,
  insuranceExpiring: 5,
  licenseExpired: 2,
  missingDocuments: 1
};

export const mockFinancialAlerts = {
  overdueInvoices: {
    count: 12,
    value: 24850
  },
  highPriorityDisputes: {
    count: 3,
    value: 8290
  },
  creditLimitWarnings: 2
};
