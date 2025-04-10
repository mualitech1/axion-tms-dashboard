
// Mock data for payment batches
export const mockPaymentBatches = [
  {
    id: "PAY-2025-0001",
    creationDate: "2025-04-05",
    paymentDate: "2025-04-20",
    totalAmount: 14850.75,
    invoiceCount: 6,
    status: "Pending Approval"
  },
  {
    id: "PAY-2025-0002",
    creationDate: "2025-04-03",
    paymentDate: "2025-04-15",
    totalAmount: 23425.50,
    invoiceCount: 9,
    status: "Approved"
  },
  {
    id: "PAY-2025-0003",
    creationDate: "2025-04-01",
    paymentDate: "2025-04-10",
    totalAmount: 18765.25,
    invoiceCount: 7,
    status: "Exported"
  },
  {
    id: "PAY-2025-0004",
    creationDate: "2025-03-25",
    paymentDate: "2025-04-05",
    totalAmount: 32450.00,
    invoiceCount: 12,
    status: "Paid"
  },
  {
    id: "PAY-2025-0005",
    creationDate: "2025-03-20",
    paymentDate: "2025-04-01",
    totalAmount: 8675.50,
    invoiceCount: 4,
    status: "Paid"
  }
];

// Mock data for available invoices to include in a new payment batch
export const availableInvoices = [
  {
    id: "IKB-SINV-2025-0012",
    carrierName: "Fast Logistics Ltd",
    dueDate: "2025-04-25",
    amount: 2350.00,
    vatAmount: 470.00,
    totalAmount: 2820.00,
    selected: false
  },
  {
    id: "IKB-SINV-2025-0014",
    carrierName: "Express Haulage Co",
    dueDate: "2025-04-28",
    amount: 3150.75,
    vatAmount: 630.15,
    totalAmount: 3780.90,
    selected: false
  },
  {
    id: "IKB-SINV-2025-0016",
    carrierName: "Reliable Freight Services",
    dueDate: "2025-04-30",
    amount: 1875.25,
    vatAmount: 375.05,
    totalAmount: 2250.30,
    selected: false
  },
  {
    id: "IKB-SINV-2025-0018",
    carrierName: "County Carriers Ltd",
    dueDate: "2025-05-02",
    amount: 4250.00,
    vatAmount: 850.00,
    totalAmount: 5100.00,
    selected: false
  },
  {
    id: "IKB-SINV-2025-0020",
    carrierName: "Swift Transport Solutions",
    dueDate: "2025-05-05",
    amount: 3680.50,
    vatAmount: 736.10,
    totalAmount: 4416.60,
    selected: false
  },
  {
    id: "IKB-SINV-2025-0022",
    carrierName: "Horizon Haulage",
    dueDate: "2025-05-07",
    amount: 2985.25,
    vatAmount: 597.05,
    totalAmount: 3582.30,
    selected: false
  },
  {
    id: "IKB-SINV-2025-0024",
    carrierName: "Northern Logistics Ltd",
    dueDate: "2025-05-10",
    amount: 3475.00,
    vatAmount: 695.00,
    totalAmount: 4170.00,
    selected: false
  }
];

// Mock data for invoices included in an existing batch
export const batchInvoices = [
  {
    id: "IKB-SINV-2025-0001",
    carrierName: "Fast Logistics Ltd",
    dueDate: "2025-04-15",
    amount: 2750.00,
    vatAmount: 550.00,
    totalAmount: 3300.00
  },
  {
    id: "IKB-SINV-2025-0003",
    carrierName: "Express Haulage Co",
    dueDate: "2025-04-16",
    amount: 3250.75,
    vatAmount: 650.15,
    totalAmount: 3900.90
  },
  {
    id: "IKB-SINV-2025-0005",
    carrierName: "Reliable Freight Services",
    dueDate: "2025-04-18",
    amount: 1950.25,
    vatAmount: 390.05,
    totalAmount: 2340.30
  },
  {
    id: "IKB-SINV-2025-0007",
    carrierName: "County Carriers Ltd",
    dueDate: "2025-04-20",
    amount: 4150.00,
    vatAmount: 830.00,
    totalAmount: 4980.00
  },
  {
    id: "IKB-SINV-2025-0009",
    carrierName: "Swift Transport Solutions",
    dueDate: "2025-04-22",
    amount: 3550.50,
    vatAmount: 710.10,
    totalAmount: 4260.60
  },
  {
    id: "IKB-SINV-2025-0011",
    carrierName: "Horizon Haulage",
    dueDate: "2025-04-23",
    amount: 2950.25,
    vatAmount: 590.05,
    totalAmount: 3540.30
  }
];
