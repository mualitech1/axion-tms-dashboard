
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, Calendar, Download, Eye } from "lucide-react";

interface InvoiceTableProps {
  invoices: any[];
}

export function InvoiceTable({ invoices }: InvoiceTableProps) {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="font-semibold text-gray-700">Invoice #</TableHead>
            <TableHead className="font-semibold text-gray-700">Customer</TableHead>
            <TableHead className="font-semibold text-gray-700 hidden md:table-cell">
              <div className="flex items-center">
                Issue Date
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="font-semibold text-gray-700 hidden lg:table-cell">
              <div className="flex items-center">
                Due Date
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="font-semibold text-gray-700">
              <div className="flex items-center">
                Amount
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="font-semibold text-gray-700">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.length > 0 ? (
            invoices.map((invoice) => (
              <TableRow key={invoice.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell className="max-w-[150px] truncate">{invoice.customer}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-3.5 w-3.5 text-gray-500" />
                    {invoice.date}
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-3.5 w-3.5 text-gray-500" />
                    {invoice.dueDate}
                  </div>
                </TableCell>
                <TableCell className="font-semibold">${invoice.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge className={`${
                    invoice.status === "paid" 
                      ? "bg-green-100 text-green-800 hover:bg-green-200" 
                      : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                  }`}>
                    {invoice.status === "paid" ? "Paid" : "Pending"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center text-gray-500">
                No invoices found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
