
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export function FinanceMetrics() {
  return (
    <div className="grid gap-6 md:grid-cols-3 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-tms-blue" />
            <span className="text-2xl font-bold">$146,350</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">+12.5% from previous month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Outstanding Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-amber-500" />
            <span className="text-2xl font-bold">$25,550</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">3 pending invoices</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-red-500" />
            <span className="text-2xl font-bold">$42,800</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">-8.3% from previous month</p>
        </CardContent>
      </Card>
    </div>
  );
}
