
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, CheckCircle2, Copy, QrCode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator
} from '@/components/ui/input-otp';
import { prepareTOTPSetup, verifyAndEnableTOTP, disableTOTP, isTOTPEnabled } from '@/utils/auth-security';
import { useAuth } from '@/hooks/use-auth';

interface TwoFactorSetupProps {
  onComplete?: (enabled: boolean) => void;
  initialState?: boolean;
}

export default function TwoFactorSetup({ onComplete, initialState = false }: TwoFactorSetupProps) {
  const [step, setStep] = useState<'initial' | 'setup' | 'verify' | 'complete'>('initial');
  const [secretKey, setSecretKey] = useState<string>('');
  const [otpAuthUrl, setOtpAuthUrl] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isEnabled, setIsEnabled] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    // Check if 2FA is already enabled on component mount
    async function checkTOTPStatus() {
      if (user) {
        const enabled = await isTOTPEnabled();
        setIsEnabled(enabled);
        setStep(enabled ? 'complete' : 'initial');
      }
    }
    
    checkTOTPStatus();
  }, [user]);

  const handleSetup = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You need to be logged in to set up two-factor authentication.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { secret, otpAuthUrl } = await prepareTOTPSetup(user.id);
      setSecretKey(secret);
      setOtpAuthUrl(otpAuthUrl);
      setStep('setup');
    } catch (error: any) {
      toast({
        title: "Setup Failed",
        description: error.message || "Failed to start two-factor authentication setup.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(secretKey);
    toast({
      title: "Secret key copied",
      description: "The secret key has been copied to your clipboard.",
    });
  };

  const handleVerify = async () => {
    if (verificationCode.length !== 6) {
      toast({
        title: "Verification Failed",
        description: "Please enter a valid 6-digit verification code.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await verifyAndEnableTOTP(verificationCode);
      
      setStep('complete');
      setIsEnabled(true);
      if (onComplete) onComplete(true);
      
      toast({
        title: "2FA Enabled",
        description: "Two-factor authentication has been successfully enabled for your account.",
      });
    } catch (error: any) {
      toast({
        title: "Verification Failed",
        description: error.message || "Failed to verify the code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisable = async () => {
    setIsLoading(true);
    
    try {
      await disableTOTP();
      
      setStep('initial');
      setIsEnabled(false);
      setVerificationCode('');
      if (onComplete) onComplete(false);
      
      toast({
        title: "2FA Disabled",
        description: "Two-factor authentication has been disabled for your account.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to disable two-factor authentication.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {step === 'initial' && (
        <div className="bg-white p-6 rounded-lg border border-tms-gray-200 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="bg-tms-blue-light p-2 rounded-full">
              <Shield className="h-5 w-5 text-tms-blue" />
            </div>
            <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
          </div>
          
          <p className="text-sm text-tms-gray-600">
            Add an additional layer of security to your account by enabling two-factor authentication.
            Each time you sign in, you'll need to provide a one-time code from your authenticator app.
          </p>
          
          <Button onClick={handleSetup} className="mt-2" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Setting Up...
              </span>
            ) : (
              <>
                <Shield className="mr-2 h-4 w-4" /> Setup 2FA
              </>
            )}
          </Button>
        </div>
      )}

      {step === 'setup' && (
        <div className="bg-white p-6 rounded-lg border border-tms-gray-200 space-y-5">
          <div className="flex items-center space-x-3">
            <div className="bg-tms-blue-light p-2 rounded-full">
              <Shield className="h-5 w-5 text-tms-blue" />
            </div>
            <h3 className="text-lg font-medium">Configure Two-Factor Authentication</h3>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-tms-gray-600">
              1. Install an authenticator app like Google Authenticator, Authy or Microsoft Authenticator.
            </p>
            
            <div>
              <p className="text-sm text-tms-gray-600 mb-2">
                2. Scan the QR code or enter the key manually in your authenticator app:
              </p>
              <div className="flex items-center space-x-3 p-3 bg-tms-gray-100 rounded-md">
                <div className="bg-white p-2 border border-tms-gray-200 rounded-md">
                  {/* In a real app, generate a QR code using a library */}
                  <div className="h-32 w-32 bg-gray-200 flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-gray-500" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <p className="text-xs text-tms-gray-500 mb-1">Secret Key:</p>
                  <div className="flex items-center">
                    <code className="bg-tms-gray-200 p-2 rounded text-sm font-mono mr-2">
                      {secretKey}
                    </code>
                    <Button size="sm" variant="outline" onClick={handleCopyKey}>
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-tms-gray-600 mb-2">
                3. Enter the verification code from your authenticator app:
              </p>
              <div className="space-y-3">
                <InputOTP 
                  maxLength={6} 
                  value={verificationCode}
                  onChange={(value) => setVerificationCode(value)}
                  className="flex justify-start"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                
                <div className="flex space-x-3">
                  <Button variant="outline" onClick={() => setStep('initial')} disabled={isLoading}>
                    Cancel
                  </Button>
                  <Button onClick={handleVerify} disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Verifying...
                      </span>
                    ) : (
                      "Verify and Activate"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 'complete' && (
        <div className="bg-white p-6 rounded-lg border border-tms-gray-200 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="bg-tms-green-light p-2 rounded-full">
              <CheckCircle2 className="h-5 w-5 text-tms-green" />
            </div>
            <h3 className="text-lg font-medium">Two-Factor Authentication Enabled</h3>
          </div>
          
          <p className="text-sm text-tms-gray-600">
            Your account is now protected with two-factor authentication. When signing in, you'll 
            need to provide a verification code from your authenticator app.
          </p>
          
          <div className="flex items-center space-x-2 p-3 bg-tms-blue-light/20 rounded-md">
            <Shield className="h-5 w-5 text-tms-blue" />
            <p className="text-sm text-tms-blue">
              Remember to keep your backup codes in a safe place. You'll need them if you lose access to your authenticator app.
            </p>
          </div>
          
          <Button 
            variant="outline" 
            onClick={handleDisable} 
            className="text-tms-red border-tms-red hover:bg-tms-red-light/20"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Disabling...
              </span>
            ) : (
              "Disable 2FA"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
