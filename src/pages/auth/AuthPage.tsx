import { useState, useEffect, useCallback } from 'react';
import * as z from 'zod';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Eye, EyeOff, Mail, Loader2, Zap, Sparkles, ArrowLeft, Key, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { AxionLogo } from '@/components/axion-logo/AxionLogo';

// Schema definitions
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const resetSchema = z.object({
  email: z.string().email('Please enter a valid email address')
});

export default function AuthPage() {
  const navigate = useNavigate();
  const { signIn, signUp, user, loading, resetPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [searchParams] = useSearchParams();
  const [showResetForm, setShowResetForm] = useState(false);
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');
  
  // Form states
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  
  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  
  const [resetForm, setResetForm] = useState({
    email: ''
  });
  
  // Redirect if already authenticated
  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  // Check for reset parameter
  useEffect(() => {
    if (searchParams.get('reset') === 'true') {
      setAuthError("Please check your email for a password reset link");
    }
  }, [searchParams]);

  // Form handlers
  const handleLoginChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
  }, []);
  
  const handleRegisterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({ ...prev, [name]: value }));
  }, []);
  
  const handleResetChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResetForm(prev => ({ ...prev, [name]: value }));
  }, []);
  
  // Authentication handlers
  const handleLogin = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const result = await signIn(values.email, values.password);
      if (result.success) {
        toast({
          title: "Login Successful",
          description: "Welcome back! Redirecting to your dashboard...",
          variant: "default",
        });
      } else {
        if (result.emailNotConfirmed && result.email) {
          toast({
            title: "Email Not Verified",
            description: "Please check your email to verify your account before logging in.",
            variant: "destructive",
          });
          navigate(`/auth/confirm-email?email=${encodeURIComponent(result.email)}&type=email-not-confirmed`);
        } else {
          setAuthError(result.error || "Invalid login credentials. Please try again.");
          toast({
            title: "Login Failed",
            description: result.error || "Invalid login credentials. Please try again.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Login submission error:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred during login.";
      setAuthError(errorMessage);
      toast({
        title: "Login Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (values: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const fullName = `${values.firstName} ${values.lastName}`;
      const result = await signUp(values.email, values.password, fullName);
      
      if (result.success) {
        if (result.requiresConfirmation && result.email) {
          toast({
            title: "Registration Successful!",
            description: "Please check your email to confirm your account.",
            variant: "default",
          });
          navigate(`/auth/confirm-email?email=${encodeURIComponent(result.email)}&type=signup`);
        } else {
          toast({
            title: "Registration Successful!",
            description: "Welcome! Your account has been created.",
            variant: "default",
          });
        }
      } else {
        setAuthError(result.error || "Registration failed. Please try again.");
        toast({
          title: "Registration Failed",
          description: result.error || "An error occurred during registration.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Registration submission error:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred during registration.";
      setAuthError(errorMessage);
      toast({
        title: "Registration Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = useCallback(async () => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      const validation = resetSchema.safeParse(resetForm);
      if (!validation.success) {
        throw new Error(validation.error.errors[0].message);
      }
      
      await resetPassword(resetForm.email);
      
      setResetForm({ email: '' });
      setShowResetForm(false);
      
      toast({
        title: "Password reset sent!",
        description: "Check your email for password reset instructions.",
      });
      
    } catch (error: unknown) {
      setAuthError(error instanceof Error ? error.message : 'Password reset failed');
    } finally {
      setIsLoading(false);
    }
  }, [resetForm, resetPassword]);

  const setTab = useCallback((tab: string) => {
    setActiveTab(tab);
    setAuthError(null);
    setShowEmailConfirmation(false);
  }, []);

  // Email Confirmation Component
  const EmailConfirmationMessage = () => (
          <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-6 text-center space-y-4"
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-lg font-semibold text-green-400">Check Your Email!</h3>
        <p className="text-gray-300">
          We've sent a confirmation link to <span className="font-medium text-white">{pendingEmail}</span>
        </p>
        <p className="text-sm text-gray-400">
          Click the link in your email to complete your registration and access your dashboard.
        </p>
        <div className="space-y-2 pt-2">
          <Button 
            onClick={() => {
              setShowEmailConfirmation(false);
              setActiveTab('login');
            }}
            variant="outline"
            className="w-full"
          >
            Back to Sign In
          </Button>
          <p className="text-xs text-gray-500">
            Didn't receive an email? Check your spam folder or contact support.
          </p>
        </div>
        </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-950 via-blue-950/30 to-purple-950/30">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <motion.div 
          className="flex flex-col items-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AxionLogo size="xl" variant="divine" animated={true} showParticles={true} />
          <h1 className="text-3xl font-bold text-white mt-6 text-center">
            Welcome to Axion TMS
          </h1>
          <p className="text-slate-400 text-center mt-2">
            Sign in to access your dashboard
          </p>
        </motion.div>
        
        <Card className="bg-slate-900/95 border-slate-700 backdrop-blur-xl">
          <CardContent className="p-6">
          <AnimatePresence mode="wait">
              {showEmailConfirmation ? (
                <motion.div
                  key="email-confirmation"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <EmailConfirmationMessage />
                </motion.div>
              ) : !showResetForm ? (
              <motion.div
                key="auth-tabs"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
              >
                <Tabs value={activeTab} onValueChange={setTab} className="w-full">
                    <TabsList className="grid grid-cols-2 mb-6 bg-slate-800 border border-slate-600">
                      <TabsTrigger value="login" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                      <Zap className="mr-2 h-4 w-4" />
                        Sign In
                    </TabsTrigger>
                      <TabsTrigger value="register" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                      <Sparkles className="mr-2 h-4 w-4" />
                        Sign Up
                    </TabsTrigger>
                  </TabsList>
                  
                  {/* Error Display */}
                  {authError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                        className="mb-4"
                    >
                        <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{authError}</AlertDescription>
                      </Alert>
                    </motion.div>
                  )}
                  
                    <TabsContent value="login" className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-200">
                          Email Address
                      </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                            id="email"
                        type="email"
                            placeholder="Enter your email"
                        name="email"
                        value={loginForm.email}
                        onChange={handleLoginChange}
                            className="pl-10 bg-slate-800 border-slate-600 text-white"
                      />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-slate-200">
                          Password
                      </Label>
                      <div className="relative">
                          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            id="password"
                          type={showPassword ? 'text' : 'password'} 
                            placeholder="Enter your password"
                          name="password"
                          value={loginForm.password}
                          onChange={handleLoginChange}
                            className="pl-10 pr-10 bg-slate-800 border-slate-600 text-white"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                        </div>
                      </div>
                      
                      <div className="space-y-4 pt-2">
                        <Button 
                          onClick={() => handleLogin(loginForm)}
                        disabled={isLoading}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        {isLoading ? (
                          <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Signing in...
                          </>
                        ) : (
                          <>
                              <Zap className="mr-2 h-4 w-4" />
                              Sign In
                          </>
                        )}
                        </Button>
                      
                        <Button 
                          onClick={() => setShowResetForm(true)}
                          variant="ghost"
                          className="w-full text-slate-400 hover:text-slate-300"
                        >
                          Forgot your password?
                        </Button>
                    </div>
                  </TabsContent>
                  
                    <TabsContent value="register" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-slate-200">
                            First Name
                        </Label>
                        <Input
                            id="firstName"
                            placeholder="First name"
                          name="firstName"
                          value={registerForm.firstName}
                          onChange={handleRegisterChange}
                            className="bg-slate-800 border-slate-600 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-slate-200">
                            Last Name
                        </Label>
                        <Input 
                            id="lastName"
                            placeholder="Last name"
                          name="lastName"
                          value={registerForm.lastName}
                          onChange={handleRegisterChange}
                            className="bg-slate-800 border-slate-600 text-white"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="registerEmail" className="text-slate-200">
                          Email Address
                      </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                            id="registerEmail"
                        type="email"
                            placeholder="Enter your email"
                        name="email"
                        value={registerForm.email}
                        onChange={handleRegisterChange}
                            className="pl-10 bg-slate-800 border-slate-600 text-white"
                      />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="registerPassword" className="text-slate-200">
                          Password
                      </Label>
                        <div className="relative">
                          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                            id="registerPassword"
                        type={showPassword ? 'text' : 'password'} 
                            placeholder="Create a password"
                        name="password"
                        value={registerForm.password}
                        onChange={handleRegisterChange}
                            className="pl-10 pr-10 bg-slate-800 border-slate-600 text-white"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <Button 
                          onClick={() => handleRegister(registerForm)}
                        disabled={isLoading}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        {isLoading ? (
                          <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Creating account...
                          </>
                        ) : (
                          <>
                              <Sparkles className="mr-2 h-4 w-4" />
                              Create Account
                          </>
                        )}
                        </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            ) : (
              <motion.div
                key="reset-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <Button
                    onClick={() => setShowResetForm(false)}
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-slate-300"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h3 className="text-lg font-semibold text-white">Reset Password</h3>
                </div>
                
                {authError && (
                    <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{authError}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                    <Label htmlFor="resetEmail" className="text-slate-200">
                      Email Address
                  </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                        id="resetEmail"
                    type="email"
                        placeholder="Enter your email"
                    name="email"
                    value={resetForm.email}
                    onChange={handleResetChange}
                        className="pl-10 bg-slate-800 border-slate-600 text-white"
                  />
                    </div>
                </div>
                
                  <div className="space-y-3 pt-2">
                    <Button 
                    onClick={handlePasswordReset}
                    disabled={isLoading}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isLoading ? (
                      <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending reset link...
                      </>
                    ) : (
                        'Send Reset Link'
                    )}
                    </Button>
                  
                    <Button 
                    onClick={() => setShowResetForm(false)}
                    variant="ghost"
                      className="w-full text-slate-400 hover:text-slate-300"
                  >
                      Back to Sign In
                    </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
