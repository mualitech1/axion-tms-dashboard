import { Zap } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const pendingPayments = [
  { id: 1, dueDate: "2023-12-15", customer: "Globex Quantum", amount: 7850, invoice: "QTX-2023-156" },
  { id: 2, dueDate: "2023-12-10", customer: "Acme Flux", amount: 5400, invoice: "QTX-2023-148" },
  { id: 3, dueDate: "2023-12-05", customer: "Wayne Quanta", amount: 12300, invoice: "QTX-2023-142" },
];

export function PendingPaymentsTable() {
  return (
    <Card className="bg-aximo-card border-aximo-border shadow-aximo">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-aximo-text">Pending Entanglements</CardTitle>
        <Button className="gap-1 bg-gradient-to-r from-aximo-primary to-purple-600 hover:from-aximo-primary/90 hover:to-purple-700">
          <Zap className="h-4 w-4" />
          Initialize Transaction
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="bg-aximo-darker">
            <TableRow className="hover:bg-transparent border-aximo-border">
              <TableHead className="font-semibold text-aximo-text">Temporal Deadline</TableHead>
              <TableHead className="font-semibold text-aximo-text">Entity</TableHead>
              <TableHead className="font-semibold text-aximo-text">Energy Units</TableHead>
              <TableHead className="font-semibold text-aximo-text">Transaction ID</TableHead>
              <TableHead className="font-semibold text-aximo-text">Controls</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingPayments.map((payment) => (
              <TableRow key={payment.id} className="hover:bg-aximo-darker/50 border-aximo-border">
                <TableCell className="text-aximo-text">{payment.dueDate}</TableCell>
                <TableCell className="text-aximo-text">{payment.customer}</TableCell>
                <TableCell className="font-medium text-aximo-text">
                  £{payment.amount.toLocaleString()}
                </TableCell>
                <TableCell className="text-aximo-text">{payment.invoice}</TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-aximo-border bg-aximo-darker hover:bg-aximo-primary/10 text-aximo-text"
                  >
                    View Parameters
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
