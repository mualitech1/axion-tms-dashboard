
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { InvoiceData } from "./create-invoice-dialog/CreateInvoiceDialog";

interface InvoiceAnalyticsProps {
  invoices: InvoiceData[];
}

export function InvoiceAnalytics({ invoices }: InvoiceAnalyticsProps) {
  // Calculate monthly totals for the last 6 months
  const getMonthlyData = () => {
    const today = new Date();
    const months = [];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    for (let i = 5; i >= 0; i--) {
      const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
      months.push({
        name: monthNames[month.getMonth()],
        month: month.getMonth(),
        year: month.getFullYear()
      });
    }
    
    const monthlyData = months.map(monthInfo => {
      const monthInvoices = invoices.filter(invoice => {
        const invoiceDate = new Date(invoice.date);
        return invoiceDate.getMonth() === monthInfo.month && 
               invoiceDate.getFullYear() === monthInfo.year;
      });
      
      const total = monthInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
      const paid = monthInvoices
        .filter(invoice => invoice.status === "paid")
        .reduce((sum, invoice) => sum + invoice.amount, 0);
      
      return {
        name: monthInfo.name,
        total,
        paid
      };
    });
    
    return monthlyData;
  };
  
  // Status distribution for pie chart
  const getStatusData = () => {
    const paid = invoices.filter(inv => inv.status === "paid").length;
    const pending = invoices.filter(inv => inv.status === "pending").length;
    
    return [
      { name: "Paid", value: paid },
      { name: "Pending", value: pending }
    ];
  };
  
  const monthlyData = getMonthlyData();
  const statusData = getStatusData();
  const COLORS = ["#4ade80", "#fbbf24"];
  
  // Find the month with the highest revenue
  const bestMonth = [...monthlyData].sort((a, b) => b.total - a.total)[0];
  
  // Calculate total and average amounts
  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const avgAmount = invoices.length > 0 ? totalAmount / invoices.length : 0;
  
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-white hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Best Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {bestMonth?.name || "-"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              ${bestMonth?.total.toLocaleString() || 0} total revenue
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Invoice</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${avgAmount.toLocaleString(undefined, {maximumFractionDigits: 2})}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Based on {invoices.length} invoices
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Collection Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {invoices.length > 0 
                ? Math.round((invoices.filter(inv => inv.status === "paid").length / invoices.length) * 100)
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Of total invoices paid
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                <Bar dataKey="total" fill="#818cf8" name="Total" />
                <Bar dataKey="paid" fill="#4ade80" name="Paid" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Invoice Status</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip formatter={(value) => [value, 'Invoices']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
