
import { PlusCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const pendingPayments = [
  { id: 1, dueDate: "2023-12-15", customer: "Globex Industries", amount: 7850, invoice: "INV-2023-156" },
  { id: 2, dueDate: "2023-12-10", customer: "Acme Corporation", amount: 5400, invoice: "INV-2023-148" },
  { id: 3, dueDate: "2023-12-05", customer: "Wayne Enterprises", amount: 12300, invoice: "INV-2023-142" },
];

export function PendingPaymentsTable() {
  return (
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
  );
}
