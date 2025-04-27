
import MainLayout from "@/components/layout/MainLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { FinanceMetrics } from "@/components/finance/FinanceMetrics";
import { FinanceNavigationCards } from "@/components/finance/FinanceNavigationCards";
import { FinanceTabContent } from "@/components/finance/FinanceTabContent";
import { BillingSection } from "@/components/finance/BillingSection";

export default function Finance() {
  return (
    <MainLayout title="Finance">
      <DashboardHeader
        title="Finance Dashboard"
        subtitle="Manage your financial transactions and reports"
      />

      <FinanceMetrics />
      <FinanceNavigationCards />
      <BillingSection />
      <FinanceTabContent />
    </MainLayout>
  );
}
