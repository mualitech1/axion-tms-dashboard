
import { Filter } from "lucide-react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const recentTransactions = [
  { id: 1, date: "2023-11-30", description: "Customer Payment - Acme Corp", amount: 12450, type: "income" },
  { id: 2, date: "2023-11-28", description: "Fuel Expense", amount: 3200, type: "expense" },
  { id: 3, date: "2023-11-25", description: "Customer Payment - Wayne Enterprises", amount: 8750, type: "income" },
  { id: 4, date: "2023-11-22", description: "Vehicle Maintenance", amount: 1580, type: "expense" },
  { id: 5, date: "2023-11-20", description: "Customer Payment - Stark Industries", amount: 9600, type: "income" },
];

export function RecentTransactionsTable() {
  return (
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
  );
}
