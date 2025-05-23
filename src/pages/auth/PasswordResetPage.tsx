import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Key, Zap, AlertCircle, Atom, Sparkles } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { InputWithIcon } from '@/components/ui/input-with-icon';
import { AxionLogo } from '@/components/axion-logo/AxionLogo';
import '@/../asi-wonderland🛡️/axion-branding.css';

const resetSchema = z.object({
  password: z.string().min(8, 'Quantum key must be at least 8 particles long'),
  confirmPassword: z.string().min(8, 'Quantum key must be at least 8 particles long'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Quantum keys are not synchronized",
  path: ["confirmPassword"],
});

export default function PasswordResetPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const token = searchParams.get('token');
  
  useEffect(() => {
    if (!token) {
      toast({
        title: "Invalid Quantum Link",
        description: "This dimensional portal is invalid or has expired.",
        variant: "destructive"
      });
      navigate('/auth');
    }
  }, [token, navigate]);
  
  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });
  
  const onSubmit = async (values: z.infer<typeof resetSchema>) => {
    if (!token) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Use updateUser to set the new password with the token
      const { error } = await supabase.auth.updateUser({ 
        password: values.password 
      });
      
      if (error) throw error;
      
      toast({
        title: "Quantum Key Recalibrated",
        description: "Your dimensional access has been restored.",
      });
      
      navigate('/auth');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to reset quantum key";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Calculate password strength
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

  const password = form.watch('password');
  const passwordStrength = calculateStrength(password);
  
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
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A101F] via-[#001F3F] to-[#060C17] px-4 overflow-hidden relative">
      {/* Quantum Glow Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-1/4 w-96 h-96 bg-axion-blue-primary/10 rounded-full blur-3xl axion-quantum-glow"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-axion-gold-primary/10 rounded-full blur-2xl axion-quantum-glow"></div>
      </div>
      <div className="relative z-10 w-full max-w-md">
        {/* Axion Logo */}
        <div className="flex flex-col items-center mb-8">
          <AxionLogo size="lg" variant="divine" animated={true} />
          <h1 className="axion-title text-2xl md:text-3xl mt-4 text-center">Reset Quantum Key</h1>
          <p className="axion-subtitle text-center mt-1">Recalibrate your dimensional access</p>
        </div>
        <div className="axion-auth-container shadow-2xl">
          <Card className="border-aximo-border bg-aximo-dark overflow-hidden">
            <CardHeader className="text-center space-y-2 border-b border-aximo-border">
              <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-aximo-primary to-purple-400">
                Quantum Key Recalibration
              </CardTitle>
              <CardDescription className="text-aximo-text-secondary">
                Establish new dimensional access credentials
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {error && (
                <Alert variant="destructive" className="mb-4 bg-red-900/20 border-red-800">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-aximo-text">New Quantum Key</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <InputWithIcon 
                              icon={Key} 
                              type={showPassword ? "text" : "password"} 
                              placeholder="Enter your new quantum key" 
                              {...field} 
                              className="bg-aximo-darker border-aximo-border text-aximo-text pr-10"
                            />
                            <button 
                              type="button"
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-aximo-text-secondary hover:text-aximo-text"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {password && (
                    <div className="space-y-2 p-3 bg-aximo-darker rounded-md border border-aximo-border">
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
                      <div className="h-1.5 w-full bg-aximo-dark rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getStrengthColor()}`} 
                          style={{ width: `${passwordStrength}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-aximo-text">Confirm Quantum Key</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <InputWithIcon 
                              icon={Key} 
                              type={showConfirmPassword ? "text" : "password"} 
                              placeholder="Confirm your quantum key" 
                              {...field} 
                              className="bg-aximo-darker border-aximo-border text-aximo-text pr-10"
                            />
                            <button 
                              type="button"
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-aximo-text-secondary hover:text-aximo-text"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex flex-col space-y-4 pt-2">
                    <Button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-aximo-primary to-purple-500 hover:from-aximo-primary/90 hover:to-purple-600 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="mr-2"
                        >
                          <Zap className="h-4 w-4" />
                        </motion.div>
                      ) : (
                        <Zap className="mr-2 h-4 w-4" />
                      )}
                      {isLoading ? "Recalibrating Quantum Key..." : "Recalibrate Quantum Key"}
                    </Button>
                    
                    <Button 
                      type="button"
                      variant="ghost"
                      className="text-aximo-text-secondary hover:text-aximo-text"
                      onClick={() => navigate('/auth')}
                    >
                      Return to Quantum Authentication Portal
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="border-t border-aximo-border pt-4 text-center flex justify-center">
              <p className="text-xs text-aximo-text-secondary">
                Secured by Axion Quantum Entanglement Protocol™
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
} 