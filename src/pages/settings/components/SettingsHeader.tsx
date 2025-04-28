
import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function SettingsHeader() {
  return (
    <div className="flex flex-col space-y-2">
      <h2 className="text-2xl font-bold">Settings</h2>
      <div className="flex items-center text-sm text-muted-foreground">
        <span>Home</span>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span>Settings</span>
      </div>
      <p className="text-muted-foreground mt-2">
        Manage your account settings and preferences.
      </p>
    </div>
  );
}
