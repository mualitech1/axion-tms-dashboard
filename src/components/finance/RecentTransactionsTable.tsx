import { Filter, Search } from "lucide-react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const recentTransactions = [
  { id: 1, date: "2023-11-30", description: "Entity Payment - Acme Quantum", amount: 12450, type: "income" },
  { id: 2, date: "2023-11-28", description: "Energy Core Supply", amount: 3200, type: "expense" },
  { id: 3, date: "2023-11-25", description: "Entity Payment - Wayne Quanta", amount: 8750, type: "income" },
  { id: 4, date: "2023-11-22", description: "Transport Core Maintenance", amount: 1580, type: "expense" },
  { id: 5, date: "2023-11-20", description: "Entity Payment - Stark Flux", amount: 9600, type: "income" },
];

export function RecentTransactionsTable() {
  return (
    <Card className="bg-aximo-card border-aximo-border shadow-aximo">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-aximo-text">Recent Quantum Exchanges</CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-aximo-text-secondary" />
            <Input 
              className="w-[250px] pl-10 bg-aximo-darker border-aximo-border text-aximo-text" 
              placeholder="Search quantum exchanges..." 
            />
          </div>
          <Button variant="outline" size="icon" className="border-aximo-border bg-aximo-darker hover:bg-aximo-primary/10">
            <Filter className="h-4 w-4 text-aximo-text" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="bg-aximo-darker">
            <TableRow className="hover:bg-transparent border-aximo-border">
              <TableHead className="font-semibold text-aximo-text">Temporal Point</TableHead>
              <TableHead className="font-semibold text-aximo-text">Description</TableHead>
              <TableHead className="font-semibold text-aximo-text">Energy Units</TableHead>
              <TableHead className="font-semibold text-aximo-text">Flow Direction</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentTransactions.map((transaction) => (
              <TableRow key={transaction.id} className="hover:bg-aximo-darker/50 border-aximo-border">
                <TableCell className="text-aximo-text">{transaction.date}</TableCell>
                <TableCell className="text-aximo-text">{transaction.description}</TableCell>
                <TableCell className="font-medium text-aximo-text">
                  £{transaction.amount.toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {transaction.type === "income" ? (
                      <ArrowUp className="h-4 w-4 text-green-400" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-red-400" />
                    )}
                    <span className={
                      transaction.type === "income" 
                        ? "text-green-400" 
                        : "text-red-400"
                    }>
                      {transaction.type === "income" ? "Inward Flux" : "Outward Flux"}
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
