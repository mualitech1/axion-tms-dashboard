import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Key, AlertTriangle, Check, X, Eye, EyeOff, Zap, Lock, Fingerprint } from "lucide-react";
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
    if (passwordStrength >= 80) return "Quantum-Secure";
    if (passwordStrength >= 60) return "Entangled";
    if (passwordStrength >= 30) return "Semi-Quantum";
    return "Vulnerable";
  };
  
  const getStrengthColor = () => {
    if (passwordStrength >= 80) return "bg-gradient-to-r from-green-400 to-aximo-primary";
    if (passwordStrength >= 60) return "bg-yellow-500";
    if (passwordStrength >= 30) return "bg-orange-500";
    return "bg-red-500";
  };

  // Password requirements checks
  const requirements = [
    { text: "Minimum 8 quantum particles", met: newPassword.length >= 8 },
    { text: "At least one uppercase quantum charge", met: /[A-Z]/.test(newPassword) },
    { text: "At least one lowercase quantum charge", met: /[a-z]/.test(newPassword) },
    { text: "At least one numeric quantum particle", met: /[0-9]/.test(newPassword) },
    { text: "At least one special quantum entanglement", met: /[^A-Za-z0-9]/.test(newPassword) }
  ];

  // Handle password update
  const handleUpdatePassword = async () => {
    // Validation
    if (!currentPassword) {
      toast({ title: "Error", description: "Please enter your current quantum key", variant: "destructive" });
      return;
    }
    
    if (passwordStrength < 60) {
      toast({ title: "Quantum Vulnerability Detected", description: "Your encryption strength is below secure threshold", variant: "destructive" });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({ title: "Quantum Misalignment", description: "Your phase-locked keys are not synchronized", variant: "destructive" });
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
          title: "Authentication Failure",
          description: "Current quantum key signature incorrect",
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
        title: "Quantum Encryption Updated",
        description: "Your security parameters have been recalibrated",
        variant: "default"
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update encryption signature";
      toast({
        title: "Quantum Protocol Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-aximo-darker border-aximo-border overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10 transform -translate-x-1/2 -translate-y-1/2" />
      <CardHeader className="border-b border-aximo-border">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-purple-500/20 to-aximo-primary/20 p-2 rounded-lg">
            <Shield className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <CardTitle className="text-aximo-text">Quantum Security Matrix</CardTitle>
            <CardDescription className="text-aximo-text-secondary">Configure your multidimensional encryption protocols</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-4">
          {/* Password Change Section */}
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-aximo-primary/10 rounded-lg">
              <Lock className="h-5 w-5 text-aximo-primary" />
            </div>
            <div className="space-y-4 flex-1">
              <div>
                <h4 className="text-sm font-medium text-aximo-text">Quantum Key Recalibration</h4>
                <p className="text-sm text-aximo-text-secondary">Update your encryption signature to maintain quantum entanglement security</p>
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="current-password" className="text-aximo-text-secondary">Current Quantum Key</Label>
                  <div className="relative">
                    <Input 
                      id="current-password" 
                      type={showCurrentPassword ? "text" : "password"} 
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="bg-aximo-dark border-aximo-border text-aximo-text focus:border-aximo-primary focus:ring-aximo-primary/20"
                    />
                    <button 
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-aximo-text-secondary hover:text-aximo-text"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="new-password" className="text-aximo-text-secondary">New Quantum Key</Label>
                  <div className="relative">
                    <Input 
                      id="new-password" 
                      type={showNewPassword ? "text" : "password"} 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="bg-aximo-dark border-aximo-border text-aximo-text focus:border-aximo-primary focus:ring-aximo-primary/20"
                    />
                    <button 
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-aximo-text-secondary hover:text-aximo-text"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                
                {newPassword && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-aximo-text-secondary">Quantum integrity:</span>
                      <span className={`text-sm font-medium ${
                        passwordStrength >= 80 ? "text-green-500" : 
                        passwordStrength >= 60 ? "text-yellow-500" : 
                        passwordStrength >= 30 ? "text-orange-500" : "text-red-500"
                      }`}>
                        {getStrengthText()}
                      </span>
                    </div>
                    <Progress value={passwordStrength} className={`h-1.5 ${getStrengthColor()}`} />
                    
                    <div className="grid grid-cols-1 gap-2 mt-3">
                      {requirements.map((requirement, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          {requirement.met ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <X className="h-4 w-4 text-red-500" />
                          )}
                          <span className={requirement.met ? "text-green-500" : "text-aximo-text-secondary"}>
                            {requirement.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="space-y-1">
                  <Label htmlFor="confirm-password" className="text-aximo-text-secondary">Confirm Quantum Key</Label>
                  <div className="relative">
                    <Input 
                      id="confirm-password" 
                      type={showConfirmPassword ? "text" : "password"} 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-aximo-dark border-aximo-border text-aximo-text focus:border-aximo-primary focus:ring-aximo-primary/20"
                    />
                    <button 
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-aximo-text-secondary hover:text-aximo-text"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {newPassword && confirmPassword && newPassword !== confirmPassword && (
                    <p className="text-sm text-red-500 mt-1">Quantum keys are not synchronized</p>
                  )}
                </div>
              </div>
              <Button 
                onClick={handleUpdatePassword} 
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-500 to-aximo-primary hover:from-purple-600 hover:to-aximo-primary/90 text-white"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Recalibrating...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Zap className="h-4 w-4 mr-2" />
                    Recalibrate Quantum Key
                  </span>
                )}
              </Button>
            </div>
          </div>
          
          {/* Two Factor Authentication Section */}
          <div className="flex items-start space-x-4 pt-4 border-t border-aximo-border">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Fingerprint className="h-5 w-5 text-blue-400" />
            </div>
            <div className="space-y-2 flex-1">
              <h4 className="text-sm font-medium text-aximo-text">Quantum Biometric Verification</h4>
              <p className="text-sm text-aximo-text-secondary">Enable multidimensional identity confirmation for enhanced security</p>
              <div className="mt-2">
                <TwoFactorSetup />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
