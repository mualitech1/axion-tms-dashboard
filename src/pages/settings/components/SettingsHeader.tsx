
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SettingsHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-tms-gray-800">System Settings</h1>
        <p className="text-tms-gray-600">Configure application settings and preferences</p>
      </div>
      
      <Button className="bg-tms-blue hover:bg-tms-blue/90">
        <Save className="h-4 w-4 mr-2" />
        Save Changes
      </Button>
    </div>
  );
}
