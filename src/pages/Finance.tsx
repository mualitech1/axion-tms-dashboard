
import MainLayout from "@/components/layout/MainLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, DollarSign, Filter, PlusCircle, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const recentTransactions = [
  { id: 1, date: "2023-11-30", description: "Customer Payment - Acme Corp", amount: 12450, type: "income" },
  { id: 2, date: "2023-11-28", description: "Fuel Expense", amount: 3200, type: "expense" },
  { id: 3, date: "2023-11-25", description: "Customer Payment - Wayne Enterprises", amount: 8750, type: "income" },
  { id: 4, date: "2023-11-22", description: "Vehicle Maintenance", amount: 1580, type: "expense" },
  { id: 5, date: "2023-11-20", description: "Customer Payment - Stark Industries", amount: 9600, type: "income" },
];

const pendingPayments = [
  { id: 1, dueDate: "2023-12-15", customer: "Globex Industries", amount: 7850, invoice: "INV-2023-156" },
  { id: 2, dueDate: "2023-12-10", customer: "Acme Corporation", amount: 5400, invoice: "INV-2023-148" },
  { id: 3, dueDate: "2023-12-05", customer: "Wayne Enterprises", amount: 12300, invoice: "INV-2023-142" },
];

export default function Finance() {
  return (
    <MainLayout title="Finance">
      <DashboardHeader
        title="Finance Dashboard"
        subtitle="Manage your financial transactions and reports"
      />

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

      {/* Finance navigation cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Link to="/invoices">
          <Card className="hover:border-primary transition-colors cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium flex items-center">
                <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                Customer Invoices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Manage and generate customer invoices
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/finance/carrier-self-invoices">
          <Card className="hover:border-primary transition-colors cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium flex items-center">
                <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                Carrier Self-Invoices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Manage carrier self-billing statements
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/finance/disputes">
          <Card className="hover:border-primary transition-colors cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium flex items-center">
                <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                Invoice Disputes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Manage and resolve invoice disputes
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Tabs defaultValue="transactions" className="mb-6">
        <TabsList>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
          <TabsTrigger value="pending">Pending Payments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="transactions" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <div className="flex items-center gap-2">
                <Input 
                  className="w-[250px]" 
                  placeholder="Search transactions..." 
                />
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell className="font-medium">
                        ${transaction.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {transaction.type === "income" ? (
                            <ArrowUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <ArrowDown className="h-4 w-4 text-red-500" />
                          )}
                          <span className={
                            transaction.type === "income" 
                              ? "text-green-500" 
                              : "text-red-500"
                          }>
                            {transaction.type === "income" ? "Income" : "Expense"}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Pending Payments</CardTitle>
              <Button className="gap-1">
                <PlusCircle className="h-4 w-4" />
                Create Invoice
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.dueDate}</TableCell>
                      <TableCell>{payment.customer}</TableCell>
                      <TableCell className="font-medium">
                        ${payment.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>{payment.invoice}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
