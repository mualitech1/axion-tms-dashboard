
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Key, AlertTriangle } from "lucide-react";

export default function SecuritySettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" /> Security Settings
        </CardTitle>
        <CardDescription>Manage your account security preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <Key className="h-5 w-5 mt-1 text-muted-foreground" />
            <div className="space-y-4 flex-1">
              <div>
                <h4 className="text-sm font-medium">Change Password</h4>
                <p className="text-sm text-muted-foreground">Update your password regularly to keep your account secure</p>
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
              <Button>Update Password</Button>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 pt-4">
            <AlertTriangle className="h-5 w-5 mt-1 text-muted-foreground" />
            <div className="space-y-2 flex-1">
              <div>
                <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
              <Button variant="outline">Enable Two-Factor Authentication</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
