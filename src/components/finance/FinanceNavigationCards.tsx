import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Receipt, CreditCard, BarChart3, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export function FinanceNavigationCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <Link to="/finance/invoices">
        <Card className="hover:border-aximo-primary transition-colors cursor-pointer bg-aximo-darker border-aximo-border hover:shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium flex items-center text-aximo-text">
              <Receipt className="h-5 w-5 mr-2 text-aximo-primary" />
              Quantum Invoices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-aximo-text-secondary">
              Create and manage quantum energy exchange documents
            </p>
          </CardContent>
        </Card>
      </Link>

      <Link to="/finance/payments">
        <Card className="hover:border-aximo-primary transition-colors cursor-pointer bg-aximo-darker border-aximo-border hover:shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium flex items-center text-aximo-text">
              <CreditCard className="h-5 w-5 mr-2 text-green-500" />
              Payment Portal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-aximo-text-secondary">
              Track payments and financial entanglements
            </p>
          </CardContent>
        </Card>
      </Link>

      <Link to="/finance/analytics">
        <Card className="hover:border-aximo-primary transition-colors cursor-pointer bg-aximo-darker border-aximo-border hover:shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium flex items-center text-aximo-text">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
              Financial Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-aximo-text-secondary">
              Advanced insights and quantum financial patterns
            </p>
          </CardContent>
        </Card>
      </Link>

      <Link to="/finance/invoices/new">
        <Card className="hover:border-aximo-primary transition-colors cursor-pointer bg-aximo-darker border-aximo-border hover:shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium flex items-center text-aximo-text">
              <Zap className="h-5 w-5 mr-2 text-yellow-500" />
              Create Invoice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-aximo-text-secondary">
              Generate new quantum energy exchange documents
            </p>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
