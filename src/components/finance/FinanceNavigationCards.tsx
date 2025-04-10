
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

export function FinanceNavigationCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
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

      <Link to="/finance/payment-runs">
        <Card className="hover:border-primary transition-colors cursor-pointer">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-muted-foreground" />
              Payment Runs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Prepare and track batch payments
            </p>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
