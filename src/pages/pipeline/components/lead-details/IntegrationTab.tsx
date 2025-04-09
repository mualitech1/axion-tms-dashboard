import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Calendar, Mail, Truck } from 'lucide-react';

interface IntegrationItemProps {
  label: string;
  description: string;
  connected: boolean;
  icon: React.ElementType;
}

const IntegrationItem: React.FC<IntegrationItemProps> = ({ label, description, connected, icon: Icon }) => {
  return (
    <div className="flex items-center justify-between py-2 border-b last:border-0">
      <div className="flex items-center space-x-3">
        <div className="rounded-full bg-gray-100 p-2">
          <Icon className="h-5 w-5 text-gray-600" />
        </div>
        <div>
          <p className="font-medium">{label}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {connected ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <span className="text-gray-500">Not Connected</span>
      )}
    </div>
  );
};

interface IntegrationTabProps {
  leadId?: string;
}

export default function IntegrationTab({ leadId }: IntegrationTabProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Integrations</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <IntegrationItem
            label="Calendar Integration"
            description="Sync your calendar to schedule meetings and track events."
            connected={false}
            icon={Calendar}
          />
          <IntegrationItem
            label="Email Integration"
            description="Connect your email to send and receive messages directly."
            connected={false}
            icon={Mail}
          />
          <IntegrationItem
            label="TMS Integration"
            description="Integrate with your Transportation Management System for logistics."
            connected={false}
            icon={Truck}
          />
        </div>
      </CardContent>
    </Card>
  );
}
