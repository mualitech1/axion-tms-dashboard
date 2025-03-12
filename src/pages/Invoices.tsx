
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Filter, PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock invoice data
const invoices = [
  { 
    id: "INV-2023-156", 
    customer: "Globex Industries", 
    date: "2023-11-30", 
    dueDate: "2023-12-15", 
    amount: 7850, 
    status: "pending" 
  },
  { 
    id: "INV-2023-148", 
    customer: "Acme Corporation", 
    date: "2023-11-25", 
    dueDate: "2023-12-10", 
    amount: 5400, 
    status: "pending" 
  },
  { 
    id: "INV-2023-142", 
    customer: "Wayne Enterprises", 
    date: "2023-11-20", 
    dueDate: "2023-12-05", 
    amount: 12300, 
    status: "pending" 
  },
  { 
    id: "INV-2023-136", 
    customer: "Stark Industries", 
    date: "2023-11-15", 
    dueDate: "2023-11-30", 
    amount: 9600, 
    status: "paid" 
  },
  { 
    id: "INV-2023-128", 
    customer: "Umbrella Corporation", 
    date: "2023-11-10", 
    dueDate: "2023-11-25", 
    amount: 8300, 
    status: "paid" 
  },
  { 
    id: "INV-2023-124", 
    customer: "Oscorp Industries", 
    date: "2023-11-05", 
    dueDate: "2023-11-20", 
    amount: 6750, 
    status: "paid" 
  },
];

export default function Invoices() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredInvoices = invoices.filter(invoice => 
    invoice.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
    invoice.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout title="Invoices">
      <DashboardHeader
        title="Invoices"
        subtitle="Manage and track your customer invoices"
      />

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-tms-blue" />
              <span className="text-2xl font-bold">156</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Last 12 months</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-amber-500" />
              <span className="text-2xl font-bold">24</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">$42,450 outstanding</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Paid Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-500" />
              <span className="text-2xl font-bold">132</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">$178,320 collected</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Invoice Management</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              placeholder="Search invoices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-[250px]"
              icon={Search}
            />
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button className="gap-1">
                <PlusCircle className="h-4 w-4" />
                New Invoice
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.customer}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      invoice.status === "paid" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {invoice.status === "paid" ? "Paid" : "Pending"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
