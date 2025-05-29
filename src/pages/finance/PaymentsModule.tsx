import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  Banknote, 
  CircleCheckBig, 
  Clock, 
  AlertTriangle, 
  TrendingUp,
  Filter,
  Search,
  Download
} from "lucide-react";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";

/**
 * 💳 QUANTUM PAYMENT PORTAL - PAYMENT TRACKING SYSTEM
 * 
 * Track payments, manage cash flow, and monitor financial entanglements
 * Real-time payment status updates with quantum precision
 * 
 * SPACETOON PRODUCTION QUALITY! 💰⚡
 */
export default function PaymentsModule() {
  const [activeFilter, setActiveFilter] = useState("all");

  // Mock payment data - will be replaced with real Supabase data
  const payments = [
    {
      id: 1,
      invoiceId: "INV-001",
      customer: "Quantum Corp Ltd",
      amount: 2500.00,
      status: "completed",
      method: "bank_transfer",
      date: "2024-01-15",
      reference: "QNT-PAY-001"
    },
    {
      id: 2,
      invoiceId: "INV-002", 
      customer: "Stellar Systems",
      amount: 1800.50,
      status: "pending",
      method: "card",
      date: "2024-01-14",
      reference: "QNT-PAY-002"
    },
    {
      id: 3,
      invoiceId: "INV-003",
      customer: "Nexus Technologies",
      amount: 3200.75,
      status: "failed",
      method: "direct_debit",
      date: "2024-01-13",
      reference: "QNT-PAY-003"
    }
  ];

  const breadcrumbItems = [
    { label: "Quantum Hub", path: "/" },
    { label: "Financial Matrix", path: "/finance" },
    { label: "Payment Portal", path: "/finance/payments" }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CircleCheckBig className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { label: "Entangled", variant: "default" as const, className: "bg-green-500/20 text-green-400 border-green-500/30" },
      pending: { label: "Pending Entanglement", variant: "secondary" as const, className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
      failed: { label: "Entanglement Failed", variant: "destructive" as const, className: "bg-red-500/20 text-red-400 border-red-500/30" }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "card":
        return <CreditCard className="h-4 w-4" />;
      case "bank_transfer":
        return <Banknote className="h-4 w-4" />;
      case "direct_debit":
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const totalCompleted = payments
    .filter(p => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPending = payments
    .filter(p => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalFailed = payments
    .filter(p => p.status === "failed")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-r from-aximo-primary/20 to-purple-600/10 p-6 rounded-lg border border-aximo-border"
      >
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex items-center justify-between">
          <DashboardHeader
            title="Quantum Payment Portal"
            subtitle="Track payments and monitor financial entanglements in real-time"
          />
          <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg">
            <Download className="mr-2 h-4 w-4" />
            Export Payments
          </Button>
        </div>
      </motion.div>

      {/* Payment Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="bg-aximo-card border-aximo-border shadow-aximo p-6">
          <div className="flex items-center space-x-2">
            <CircleCheckBig className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-sm font-medium text-aximo-text-secondary">Completed Payments</p>
              <p className="text-2xl font-bold text-aximo-text">£{totalCompleted.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-aximo-card border-aximo-border shadow-aximo p-6">
          <div className="flex items-center space-x-2">
            <Clock className="h-8 w-8 text-yellow-500" />
            <div>
              <p className="text-sm font-medium text-aximo-text-secondary">Pending Payments</p>
              <p className="text-2xl font-bold text-aximo-text">£{totalPending.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-aximo-card border-aximo-border shadow-aximo p-6">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <div>
              <p className="text-sm font-medium text-aximo-text-secondary">Failed Payments</p>
              <p className="text-2xl font-bold text-aximo-text">£{totalFailed.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Payment Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="bg-aximo-card border-aximo-border shadow-aximo p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant={activeFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("all")}
                className={activeFilter === "all" ? "bg-aximo-primary" : "border-aximo-border"}
              >
                All Payments
              </Button>
              <Button
                variant={activeFilter === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("completed")}
                className={activeFilter === "completed" ? "bg-green-600" : "border-aximo-border"}
              >
                Completed
              </Button>
              <Button
                variant={activeFilter === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("pending")}
                className={activeFilter === "pending" ? "bg-yellow-600" : "border-aximo-border"}
              >
                Pending
              </Button>
              <Button
                variant={activeFilter === "failed" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("failed")}
                className={activeFilter === "failed" ? "bg-red-600" : "border-aximo-border"}
              >
                Failed
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-aximo-border">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
              <Button variant="outline" size="sm" className="border-aximo-border">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Payment Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card className="bg-aximo-card border-aximo-border shadow-aximo">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-aximo-text mb-4">Quantum Payment Matrix</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-aximo-border">
                    <th className="text-left p-3 text-sm font-medium text-aximo-text-secondary">Reference</th>
                    <th className="text-left p-3 text-sm font-medium text-aximo-text-secondary">Customer</th>
                    <th className="text-left p-3 text-sm font-medium text-aximo-text-secondary">Invoice</th>
                    <th className="text-left p-3 text-sm font-medium text-aximo-text-secondary">Amount</th>
                    <th className="text-left p-3 text-sm font-medium text-aximo-text-secondary">Method</th>
                    <th className="text-left p-3 text-sm font-medium text-aximo-text-secondary">Status</th>
                    <th className="text-left p-3 text-sm font-medium text-aximo-text-secondary">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-b border-aximo-border/50 hover:bg-aximo-primary/5 transition-colors">
                      <td className="p-3 text-sm text-aximo-text font-mono">{payment.reference}</td>
                      <td className="p-3 text-sm text-aximo-text">{payment.customer}</td>
                      <td className="p-3 text-sm text-aximo-text font-mono">{payment.invoiceId}</td>
                      <td className="p-3 text-sm text-aximo-text font-semibold">£{payment.amount.toLocaleString()}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2 text-sm text-aximo-text">
                          {getMethodIcon(payment.method)}
                          <span className="capitalize">{payment.method.replace('_', ' ')}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(payment.status)}
                          {getStatusBadge(payment.status)}
                        </div>
                      </td>
                      <td className="p-3 text-sm text-aximo-text-secondary">{payment.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
} 