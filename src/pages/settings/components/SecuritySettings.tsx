
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Key, AlertTriangle, Check, X, Eye, EyeOff } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import TwoFactorSetup from '@/pages/users/components/TwoFactorSetup';
import { Progress } from '@/components/ui/progress';

export default function SecuritySettings() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password strength calculation
  const calculateStrength = (password: string): number => {
    if (!password) return 0;
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 20;
    if (password.length >= 12) strength += 10;
    
    // Character variety
    if (/[A-Z]/.test(password)) strength += 20; // uppercase
    if (/[a-z]/.test(password)) strength += 15; // lowercase
    if (/[0-9]/.test(password)) strength += 15; // numbers
    if (/[^A-Za-z0-9]/.test(password)) strength += 20; // special chars
    
    return Math.min(strength, 100);
  };

  const passwordStrength = calculateStrength(newPassword);
  
  const getStrengthText = () => {
    if (passwordStrength >= 80) return "Strong";
    if (passwordStrength >= 60) return "Good";
    if (passwordStrength >= 30) return "Weak";
    return "Very Weak";
  };
  
  const getStrengthColor = () => {
    if (passwordStrength >= 80) return "bg-green-500";
    if (passwordStrength >= 60) return "bg-yellow-500";
    if (passwordStrength >= 30) return "bg-orange-500";
    return "bg-red-500";
  };

  // Password requirements checks
  const requirements = [
    { text: "At least 8 characters", met: newPassword.length >= 8 },
    { text: "At least one uppercase letter", met: /[A-Z]/.test(newPassword) },
    { text: "At least one lowercase letter", met: /[a-z]/.test(newPassword) },
    { text: "At least one number", met: /[0-9]/.test(newPassword) },
    { text: "At least one special character", met: /[^A-Za-z0-9]/.test(newPassword) }
  ];

  // Handle password update
  const handleUpdatePassword = async () => {
    // Validation
    if (!currentPassword) {
      toast({ title: "Error", description: "Please enter your current password", variant: "destructive" });
      return;
    }
    
    if (passwordStrength < 60) {
      toast({ title: "Weak Password", description: "Please choose a stronger password", variant: "destructive" });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({ title: "Error", description: "New passwords don't match", variant: "destructive" });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // First, verify the current password by trying to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email || '',
        password: currentPassword
      });
      
      if (signInError) {
        toast({
          title: "Error",
          description: "Current password is incorrect",
          variant: "destructive"
        });
        return;
      }
      
      // Update the password
      const { error } = await supabase.auth.updateUser({ 
        password: newPassword 
      });
      
      if (error) throw error;
      
      // Clear form and show success message
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      toast({
        title: "Success",
        description: "Your password has been updated",
        variant: "default"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update password",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

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
          {/* Password Change Section */}
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
                  <div className="relative">
                    <Input 
                      id="current-password" 
                      type={showCurrentPassword ? "text" : "password"} 
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <button 
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="new-password">New Password</Label>
                  <div className="relative">
                    <Input 
                      id="new-password" 
                      type={showNewPassword ? "text" : "password"} 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button 
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                
                {newPassword && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Password strength:</span>
                      <span className={`text-sm font-medium ${
                        passwordStrength >= 80 ? "text-green-600" : 
                        passwordStrength >= 60 ? "text-yellow-600" : 
                        passwordStrength >= 30 ? "text-orange-600" : "text-red-600"
                      }`}>
                        {getStrengthText()}
                      </span>
                    </div>
                    <Progress value={passwordStrength} className={`h-1.5 ${getStrengthColor()}`} />
                    
                    <div className="grid grid-cols-1 gap-2 mt-3">
                      {requirements.map((requirement, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          {requirement.met ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <X className="h-4 w-4 text-red-600" />
                          )}
                          <span className={requirement.met ? "text-green-600" : "text-gray-600"}>
                            {requirement.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="space-y-1">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <div className="relative">
                    <Input 
                      id="confirm-password" 
                      type={showConfirmPassword ? "text" : "password"} 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button 
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {newPassword && confirmPassword && newPassword !== confirmPassword && (
                    <p className="text-sm text-red-600 mt-1">Passwords don't match</p>
                  )}
                </div>
              </div>
              <Button onClick={handleUpdatePassword} disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </span>
                ) : (
                  "Update Password"
                )}
              </Button>
            </div>
          </div>
          
          {/* Two-Factor Authentication */}
          <div className="pt-6 border-t border-gray-200">
            <TwoFactorSetup />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
