import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Network, Atom, Zap, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function FinanceNavigationCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <Link to="/invoices">
        <Card className="hover:border-aximo-primary transition-colors cursor-pointer bg-aximo-darker border-aximo-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium flex items-center text-aximo-text">
              <Network className="h-5 w-5 mr-2 text-aximo-primary" />
              Quantum Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-aximo-text-secondary">
              Manage and generate quantum energy exchanges
            </p>
          </CardContent>
        </Card>
      </Link>

      <Link to="/finance/carrier-self-invoices">
        <Card className="hover:border-aximo-primary transition-colors cursor-pointer bg-aximo-darker border-aximo-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium flex items-center text-aximo-text">
              <Atom className="h-5 w-5 mr-2 text-aximo-primary" />
              Executor Self-Statements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-aximo-text-secondary">
              Manage executor quantum entanglement records
            </p>
          </CardContent>
        </Card>
      </Link>

      <Link to="/finance/disputes">
        <Card className="hover:border-aximo-primary transition-colors cursor-pointer bg-aximo-darker border-aximo-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium flex items-center text-aximo-text">
              <Sparkles className="h-5 w-5 mr-2 text-aximo-primary" />
              Energy Discrepancies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-aximo-text-secondary">
              Manage and resolve quantum flux anomalies
            </p>
          </CardContent>
        </Card>
      </Link>

      <Link to="/finance/payment-runs">
        <Card className="hover:border-aximo-primary transition-colors cursor-pointer bg-aximo-darker border-aximo-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium flex items-center text-aximo-text">
              <Zap className="h-5 w-5 mr-2 text-aximo-primary" />
              Entanglement Batches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-aximo-text-secondary">
              Prepare and track quantum batch entanglements
            </p>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
