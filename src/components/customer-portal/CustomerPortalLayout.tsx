
import { ReactNode } from 'react';
import { Card } from "@/components/ui/card";

interface CustomerPortalLayoutProps {
  children: ReactNode;
}

const CustomerPortalLayout = ({ children }: CustomerPortalLayoutProps) => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold">Customer Portal</h1>
      <Card className="p-6">
        {children}
      </Card>
    </div>
  );
};

export default CustomerPortalLayout;
