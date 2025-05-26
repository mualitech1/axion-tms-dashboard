import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth'; // Assuming useAuth will provide resendEmail
import { AxionLogo } from '@/components/axion-logo/AxionLogo';

export function EmailConfirmationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { resendConfirmationEmail } = useAuth(); // We will add this function to useAuth
  
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendError, setResendError] = useState('');
  
  const email = searchParams.get('email');
  const type = searchParams.get('type'); // 'signup' or 'email-not-confirmed'

  const handleResendEmail = async () => {
    if (!email) {
      setResendError('Email address not found in URL.');
      return;
    }
    
    setIsResending(true);
    setResendError('');
    setResendSuccess(false);
    
    try {
      // This function will be added to useAuth hook
      const { success, error } = await resendConfirmationEmail(email); 
      if (success) {
        setResendSuccess(true);
      } else {
        setResendError(error || 'Failed to resend email. Please try again.');
      }
    } catch (error) {
      console.error("Resend email error:", error);
      setResendError('An unexpected error occurred. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  useEffect(() => {
    if (!email) {
      console.warn("EmailConfirmationPage: Email parameter is missing from URL.");
      // Optionally redirect to login if email is crucial and missing
      // navigate('/auth'); 
    }
  }, [email, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <AxionLogo size="lg" variant="quantum" />
      </div>
      <Card className="w-full max-w-md bg-slate-800/70 border-slate-700 shadow-2xl shadow-blue-500/30 backdrop-blur-md">
        <CardHeader className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-500/20 mb-4">
            <Mail className="h-6 w-6 text-blue-400" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            {type === 'signup' ? 'Almost there! Check your email' : 'Verify Your Email Address'}
          </CardTitle>
          <CardDescription className="mt-2 text-slate-400">
            {type === 'signup' 
              ? `We've sent a confirmation link to ${email || 'your email address'}.`
              : `Please verify ${email || 'your email address'} to continue.`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-md bg-blue-500/10 p-4 border border-blue-500/30">
            <div className="flex">
              <div className="flex-shrink-0 pt-0.5">
                <AlertCircle className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-300">
                  Action Required
                </h3>
                <div className="mt-1 text-sm text-slate-400">
                  <p>Click the verification link in the email we sent to activate your Axion TMS account. If you don't see it, please check your spam folder.</p>
                </div>
              </div>
            </div>
          </div>

          {resendSuccess && (
            <div className="rounded-md bg-green-500/10 p-4 border border-green-500/30">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <p className="ml-3 text-sm text-green-300">
                  New confirmation email sent successfully! Check your inbox.
                </p>
              </div>
            </div>
          )}

          {resendError && (
            <div className="rounded-md bg-red-500/10 p-4 border border-red-500/30">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <p className="ml-3 text-sm text-red-300">{resendError}</p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            onClick={handleResendEmail}
            disabled={isResending || !email}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
          >
            {isResending ? (
              <>
                <RefreshCw className="animate-spin h-4 w-4 mr-2" />
                Resending Email...
              </>
            ) : (
              <>
                <Mail className="h-4 w-4 mr-2" />
                Resend Confirmation Email
              </>
            )}
          </Button>

          <Button
            onClick={() => navigate('/auth')}
            variant="outline"
            className="w-full border-slate-600 hover:bg-slate-700/50 hover:border-slate-500"
          >
            Back to Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 