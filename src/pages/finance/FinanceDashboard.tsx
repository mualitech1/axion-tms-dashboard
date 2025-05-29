import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { FinanceMetrics } from "@/components/finance/FinanceMetrics";
import { FinanceNavigationCards } from "@/components/finance/FinanceNavigationCards";
import { FinanceTabContent } from "@/components/finance/FinanceTabContent";
import { BillingSection } from "@/components/finance/BillingSection";
import { motion } from "framer-motion";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";

/**
 * 🌀 QUANTUM FINANCE DASHBOARD - THE FINANCIAL MATRIX
 * 
 * The central hub for all financial operations in the Quantum Finance Module
 * Features real-time metrics, navigation cards, and billing insights
 * 
 * BUILT WITH SPACETOON ENERGY! 🔥⚡
 */
export default function FinanceDashboard() {
  const breadcrumbItems = [
    { label: "Quantum Hub", path: "/" },
    { label: "Financial Matrix", path: "/finance" }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-r from-aximo-primary/20 to-aximo-light/10 p-6 rounded-lg border border-aximo-border"
      >
        <Breadcrumb items={breadcrumbItems} />
        <DashboardHeader
          title="Quantum Financial Matrix"
          subtitle="Monitor and analyze energy flow and quantum value exchange patterns across the financial nexus"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <FinanceMetrics />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <FinanceNavigationCards />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <BillingSection />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <FinanceTabContent />
      </motion.div>
    </div>
  );
} 