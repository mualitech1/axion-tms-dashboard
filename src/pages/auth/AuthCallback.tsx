import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { AxionLogo } from '@/components/axion-logo/AxionLogo';

/**
 * OAuth Callback Handler
 * Processes authentication callbacks from OAuth providers like Google
 */
export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('Processing authentication...');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Handle the OAuth callback
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          setStatus('error');
          setMessage(error.message || 'Authentication failed');
          
          toast({
            title: "Authentication Failed",
            description: error.message || 'Failed to complete authentication',
            variant: "destructive",
          });
          
          // Redirect to auth page after a delay
          setTimeout(() => {
            navigate('/auth');
          }, 3000);
          return;
        }

        if (data.session) {
          setStatus('success');
          setMessage('Authentication successful! Redirecting...');
          
          toast({
            title: "Welcome!",
            description: "Authentication successful. Welcome to Axion TMS!",
            variant: "default",
          });
          
          // Redirect to dashboard
          setTimeout(() => {
            navigate('/dashboard');
          }, 1500);
        } else {
          setStatus('error');
          setMessage('No session found. Please try again.');
          
          setTimeout(() => {
            navigate('/auth');
          }, 3000);
        }
      } catch (err) {
        console.error('Auth callback exception:', err);
        setStatus('error');
        setMessage('An unexpected error occurred');
        
        setTimeout(() => {
          navigate('/auth');
        }, 3000);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  const getStatusIcon = () => {
    switch (status) {
      case 'processing':
        return <Loader2 className="h-8 w-8 animate-spin text-blue-400" />;
      case 'success':
        return <CheckCircle className="h-8 w-8 text-green-400" />;
      case 'error':
        return <AlertCircle className="h-8 w-8 text-red-400" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'processing':
        return 'text-blue-400';
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-950 via-blue-950/30 to-purple-950/30">
      <div className="w-full max-w-md">
        {/* Logo */}
        <motion.div 
          className="flex flex-col items-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AxionLogo size="xl" variant="divine" animated={true} showParticles={true} />
          <h1 className="text-2xl font-bold text-white mt-6 text-center">
            Authentication
          </h1>
        </motion.div>

        {/* Status Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-8"
        >
          <div className="flex flex-col items-center space-y-4">
            <motion.div
              animate={status === 'processing' ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 2, repeat: status === 'processing' ? Infinity : 0 }}
            >
              {getStatusIcon()}
            </motion.div>
            
            <h2 className={`text-lg font-semibold ${getStatusColor()}`}>
              {status === 'processing' && 'Processing...'}
              {status === 'success' && 'Success!'}
              {status === 'error' && 'Error'}
            </h2>
            
            <p className="text-slate-300 text-center">
              {message}
            </p>
            
            {status === 'processing' && (
              <div className="w-full bg-slate-700 rounded-full h-2 mt-4">
                <motion.div
                  className="bg-blue-500 h-2 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                />
              </div>
            )}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6"
        >
          <p className="text-slate-400 text-sm">
            Axion TMS - Quantum Transport Management
          </p>
        </motion.div>
      </div>
    </div>
  );
} 