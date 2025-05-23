import { useState, useEffect } from 'react';
import * as z from 'zod';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Eye, EyeOff, Mail, User, Loader2, Zap, Atom, Key, Sparkles, ArrowLeft, Cpu, Orbit } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InputWithIcon } from '@/components/ui/input-with-icon';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormValidation } from '@/hooks/use-form-validation';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '@/store/authStore';
import { AxionLogo } from '@/components/axion-logo/AxionLogo';
import '@/../asi-wonderland🛡️/axion-branding.css';

// Schema definitions
const loginSchema = z.object({
  email: z.string().email('Please enter a valid quantum nexus address'),
  password: z.string().min(6, 'Quantum key must be at least 6 particles long'),
});

const registerSchema = z.object({
  firstName: z.string().min(1, 'Primary designator is required'),
  lastName: z.string().min(1, 'Secondary designator is required'),
  email: z.string().email('Please enter a valid quantum nexus address'),
  password: z.string().min(6, 'Quantum key must be at least 6 particles long'),
});

const resetSchema = z.object({
  email: z.string().email('Please enter a valid quantum nexus address')
});

export default function AuthPage() {
  const navigate = useNavigate();
  const { setUser, initialize } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [searchParams] = useSearchParams();
  const [showResetForm, setShowResetForm] = useState(false);
  
  // Initialize form validation hooks with schemas
  const loginForm = useFormValidation(loginSchema);
  const registerForm = useFormValidation(registerSchema);
  const resetForm = useFormValidation(resetSchema);
  
  // Check if redirected from password reset
  useEffect(() => {
    if (searchParams.get('reset') === 'true') {
      setAuthError("Please check your quantum nexus for a key reset link");
    }
  }, [searchParams]);

  // Display helpful message if we detect URL configuration issues
  useEffect(() => {
    const currentUrl = window.location.origin;
    console.log('Current app URL:', currentUrl);
    
    // Check if we're on localhost without port 8082 (which is configured in Supabase)
    if (currentUrl.includes('localhost') && !currentUrl.includes(':8082')) {
      toast({
        title: "Dimensional Misalignment Detected",
        description: `You're accessing the quantum matrix from ${currentUrl}, but Supabase is calibrated for localhost:8082. This may cause quantum entanglement disruptions.`,
        variant: "destructive"
      });
    }
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      if (!loginForm.validateForm(loginForm.formData)) {
        setIsLoading(false);
        return;
      }
      
      const { email, password } = loginForm.formData as z.infer<typeof loginSchema>;
      console.log('Login form submitted with:', email);
      
      // Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      // User is logged in
      setUser(data.user);
      
      // Initialize auth store 
      await initialize();
      
      // Navigate to role select or dashboard
      navigate('/role-select');
      
      loginForm.resetForm();
    } catch (error: unknown) {
      setAuthError(error instanceof Error ? error.message : String(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      if (!registerForm.validateForm(registerForm.formData)) {
        setIsLoading(false);
        return;
      }
      
      const { email, password, firstName, lastName } = registerForm.formData as z.infer<typeof registerSchema>;
      console.log('Register form submitted with:', email);
      
      // Sign up with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName
          }
        }
      });
      
      if (error) throw error;
      
      registerForm.resetForm();
      setActiveTab('login');
      toast({
        title: "Quantum identity initialized",
        description: "Please check your quantum nexus to confirm your multidimensional access.",
      });
    } catch (error: unknown) {
      setAuthError(error instanceof Error ? error.message : String(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      if (!resetForm.validateForm(resetForm.formData)) {
        setIsLoading(false);
        return;
      }
      
      const { email } = resetForm.formData as z.infer<typeof resetSchema>;
      console.log('Password reset requested for:', email);
      
      // Reset password with Supabase
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      
      if (error) throw error;
      
      resetForm.resetForm();
      setShowResetForm(false);
      toast({
        title: "Quantum Key Reset Initiated",
        description: "If this quantum nexus exists in our system, you'll receive recalibration instructions via interdimensional transmission."
      });
    } catch (error: unknown) {
      setAuthError(error instanceof Error ? error.message : String(error));
    } finally {
      setIsLoading(false);
    }
  };

  const setTab = (tab: string) => {
    setActiveTab(tab);
    setAuthError(null);
  };

  // Quantum Particle Effect Component
  const QuantumParticles = ({ count = 15 }) => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-axion-blue-primary/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
            scale: [0, 1, 1, 0],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A101F] via-[#001F3F] to-[#060C17] px-4 overflow-hidden relative">
      {/* Enhanced Quantum Glow Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-1/4 w-96 h-96 bg-axion-blue-primary/10 rounded-full blur-3xl axion-quantum-glow"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-axion-gold-primary/10 rounded-full blur-2xl axion-quantum-glow"></div>
        <motion.div 
          className="absolute top-1/3 right-1/3 w-64 h-64 bg-purple-500/5 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="relative z-10 w-full max-w-md">
        {/* Axion Logo */}
        <div className="flex flex-col items-center mb-8">
          <AxionLogo size="lg" variant="divine" animated={true} />
          <h1 className="axion-title text-2xl md:text-3xl mt-4 text-center">Quantum Authentication Matrix</h1>
          <p className="axion-subtitle text-center mt-1">Initialize your dimensional access portal</p>
        </div>
        
        <div className="axion-auth-container shadow-2xl relative">
          <QuantumParticles />
          
          <AnimatePresence mode="wait">
            {!showResetForm ? (
              <motion.div
                key="auth-tabs"
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Tabs value={activeTab} onValueChange={setTab} className="w-full">
                  <TabsList className="grid grid-cols-2 mb-6 bg-axion-darker-bg">
                    <TabsTrigger value="login" className="axion-button-primary">Access</TabsTrigger>
                    <TabsTrigger value="register" className="axion-button-gold">Register</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login">
                    <div>
                      <Label className="text-aximo-text" htmlFor="login-email">Quantum Nexus Address</Label>
                      <InputWithIcon 
                        id="login-email"
                        icon={Mail}
                        placeholder="Enter your quantum nexus" 
                        name="email"
                        value={loginForm.formData.email || ''}
                        onChange={loginForm.handleChange}
                        className="bg-aximo-darker border-aximo-border text-aximo-text"
                        error={loginForm.errors.email}
                      />
                    </div>
                    <div>
                      <Label className="text-aximo-text" htmlFor="login-password">Quantum Encryption Key</Label>
                      <div className="relative">
                        <InputWithIcon 
                          id="login-password"
                          icon={Key}
                          type={showPassword ? 'text' : 'password'} 
                          placeholder="Enter your quantum key" 
                          name="password"
                          value={loginForm.formData.password || ''}
                          onChange={loginForm.handleChange}
                          className="bg-aximo-darker border-aximo-border text-aximo-text pr-10"
                          error={loginForm.errors.password}
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-aximo-text-secondary hover:text-aximo-text p-1"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-3">
                      <Button 
                        type="button" 
                        onClick={handleLogin}
                        className="w-full bg-gradient-to-r from-aximo-primary to-purple-500 hover:from-aximo-primary/90 hover:to-purple-600 text-white"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Initiating quantum link...
                          </>
                        ) : (
                          <>
                            <Zap className="mr-2 h-4 w-4" />
                            Access Quantum Matrix
                          </>
                        )}
                      </Button>
                      <Button 
                        variant="ghost" 
                        type="button" 
                        onClick={() => setShowResetForm(true)}
                        className="text-aximo-text-secondary hover:text-aximo-text hover:bg-aximo-darker/50"
                      >
                        <Atom className="mr-2 h-4 w-4" />
                        Forgot quantum key?
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="register">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-aximo-text" htmlFor="register-firstName">Primary Designator</Label>
                        <InputWithIcon 
                          id="register-firstName"
                          icon={User}
                          placeholder="Primary" 
                          name="firstName"
                          value={registerForm.formData.firstName || ''}
                          onChange={registerForm.handleChange}
                          className="bg-aximo-darker border-aximo-border text-aximo-text"
                          error={registerForm.errors.firstName}
                        />
                      </div>
                      <div>
                        <Label className="text-aximo-text" htmlFor="register-lastName">Secondary Designator</Label>
                        <Input 
                          id="register-lastName"
                          placeholder="Secondary" 
                          name="lastName"
                          value={registerForm.formData.lastName || ''}
                          onChange={registerForm.handleChange}
                          className="bg-aximo-darker border-aximo-border text-aximo-text" 
                        />
                        {registerForm.errors.lastName && (
                          <p className="text-red-500 text-sm mt-1">
                            {registerForm.errors.lastName[0]}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label className="text-aximo-text" htmlFor="register-email">Quantum Nexus Address</Label>
                      <InputWithIcon 
                        id="register-email"
                        icon={Mail}
                        placeholder="Enter your quantum nexus" 
                        name="email"
                        value={registerForm.formData.email || ''}
                        onChange={registerForm.handleChange}
                        className="bg-aximo-darker border-aximo-border text-aximo-text"
                        error={registerForm.errors.email}
                      />
                    </div>
                    <div>
                      <Label className="text-aximo-text" htmlFor="register-password">Quantum Encryption Key</Label>
                      <div className="relative">
                        <InputWithIcon 
                          id="register-password"
                          icon={Key}
                          type={showPassword ? 'text' : 'password'} 
                          placeholder="Create quantum key" 
                          name="password"
                          value={registerForm.formData.password || ''}
                          onChange={registerForm.handleChange}
                          className="bg-aximo-darker border-aximo-border text-aximo-text pr-10"
                          error={registerForm.errors.password}
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-aximo-text-secondary hover:text-aximo-text p-1"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                    <Button 
                      type="button" 
                      onClick={handleRegister}
                      className="w-full bg-gradient-to-r from-aximo-primary to-purple-500 hover:from-aximo-primary/90 hover:to-purple-600 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating quantum identity...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Initialize Quantum Identity
                        </>
                      )}
                    </Button>
                  </TabsContent>
                </Tabs>
              </motion.div>
            ) : (
              <motion.div
                key="reset-form"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative"
              >
                {/* ASI-Level Reset Form Design */}
                <div className="relative overflow-hidden rounded-lg border border-aximo-border/30 bg-gradient-to-br from-aximo-dark/80 to-aximo-darker/90 backdrop-blur-sm">
                  {/* Animated Border Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: 'linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.3), transparent, rgba(147, 51, 234, 0.3), transparent)',
                      backgroundSize: '400% 400%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Content Container */}
                  <div className="relative bg-aximo-dark/95 m-0.5 rounded-lg p-6">
                    {/* Header with Animated Icons */}
                    <div className="text-center mb-6">
                      <motion.div 
                        className="flex justify-center items-center space-x-3 mb-4"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <motion.div
                          animate={{ 
                            rotate: [0, 360],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                          }}
                          className="text-axion-blue-primary"
                        >
                          <Cpu className="h-8 w-8" />
                        </motion.div>
                        <motion.div
                          animate={{ 
                            rotate: [0, -360],
                            y: [0, -5, 0]
                          }}
                          transition={{ 
                            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                            y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                          }}
                          className="text-axion-gold-primary"
                        >
                          <Orbit className="h-6 w-6" />
                        </motion.div>
                        <motion.div
                          animate={{ 
                            scale: [1, 1.3, 1],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="text-purple-400"
                        >
                          <Atom className="h-7 w-7" />
                        </motion.div>
                      </motion.div>
                      
                      <motion.h2 
                        className="text-2xl font-bold bg-gradient-to-r from-axion-blue-primary via-purple-400 to-axion-gold-primary bg-clip-text text-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        Quantum Key Recovery
                      </motion.h2>
                      <motion.p 
                        className="text-aximo-text-secondary mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        Initiate dimensional access restoration protocol
                      </motion.p>
                    </div>

                    {/* Error Display */}
                    {authError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4"
                      >
                        <Alert variant="destructive" className="bg-red-900/20 border-red-800">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{authError}</AlertDescription>
                        </Alert>
                      </motion.div>
                    )}

                    {/* Reset Form */}
                    <motion.div 
                      className="space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div>
                        <Label className="text-aximo-text flex items-center space-x-2 mb-2">
                          <Mail className="h-4 w-4 text-axion-blue-primary" />
                          <span>Quantum Nexus Address</span>
                        </Label>
                        <InputWithIcon 
                          icon={Mail}
                          placeholder="Enter your registered quantum nexus" 
                          name="email"
                          value={resetForm.formData.email || ''}
                          onChange={resetForm.handleChange}
                          className="bg-aximo-darker/80 border-aximo-border/50 text-aximo-text focus:border-axion-blue-primary/50 focus:ring-axion-blue-primary/20"
                          error={resetForm.errors.email}
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col space-y-3 pt-2">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button 
                            type="button" 
                            onClick={handlePasswordReset}
                            className="w-full bg-gradient-to-r from-axion-blue-primary via-purple-500 to-axion-gold-primary hover:from-axion-blue-primary/90 hover:via-purple-600 hover:to-axion-gold-primary/90 text-white shadow-lg"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <>
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                  className="mr-2"
                                >
                                  <Cpu className="h-4 w-4" />
                                </motion.div>
                                Activating quantum recovery...
                              </>
                            ) : (
                              <>
                                <Zap className="mr-2 h-4 w-4" />
                                Initiate Recovery Protocol
                              </>
                            )}
                          </Button>
                        </motion.div>
                        
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button 
                            variant="ghost" 
                            type="button" 
                            onClick={() => setShowResetForm(false)}
                            className="w-full text-aximo-text-secondary hover:text-aximo-text hover:bg-aximo-darker/50 border border-aximo-border/30 hover:border-aximo-border/50"
                          >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Return to Authentication Matrix
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-2 -right-2">
                      <motion.div
                        animate={{
                          rotate: [0, 90, 180, 270, 360],
                          scale: [1, 1.1, 1, 1.1, 1],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="text-axion-blue-primary/30"
                      >
                        <Sparkles className="h-6 w-6" />
                      </motion.div>
                    </div>
                    
                    <div className="absolute -bottom-2 -left-2">
                      <motion.div
                        animate={{
                          rotate: [360, 270, 180, 90, 0],
                          scale: [1, 1.2, 1, 1.2, 1],
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="text-axion-gold-primary/30"
                      >
                        <Atom className="h-5 w-5" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
