import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Building2, 
  Truck, 
  Crown, 
  Shield, 
  Zap, 
  Sparkles, 
  Atom, 
  Cpu, 
  Orbit, 
  Brain,
  Rocket,
  Stars,
  ChevronRight,
  ArrowRight,
  Layers,
  Network,
  Globe
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { AppRole } from '@/types/permissions';
import { AxionLogo } from '@/components/axion-logo/AxionLogo';
import { toast } from '@/hooks/use-toast';

const ROLE_DEFINITIONS = {
  customer: {
    title: 'Quantum Customer',
    subtitle: 'Dimensional Cargo Orchestrator',
    description: 'Command your logistics empire across infinite dimensions. Track shipments, manage orders, and orchestrate supply chains with quantum precision.',
    icon: User,
    color: 'blue',
    gradient: 'from-blue-500 via-cyan-500 to-blue-600',
    glowColor: 'blue-500',
    features: [
      'Quantum shipment tracking',
      'Dimensional order management', 
      'Multiversal supply chain control',
      'Temporal delivery optimization'
    ],
    permissions: ['view_shipments', 'create_orders', 'manage_inventory'],
    energyLevel: 'Cosmic',
    appRole: AppRole.Customer
  },
  operations: {
    title: 'Operations Manager',
    subtitle: 'Logistics Command Center',
    description: 'Oversee daily operations, manage jobs, coordinate with carriers, and ensure seamless delivery execution across all transport networks.',
    icon: Network,
    color: 'green',
    gradient: 'from-green-500 via-emerald-500 to-green-600',
    glowColor: 'green-500',
    features: [
      'Job management & allocation',
      'Carrier coordination',
      'Real-time tracking oversight',
      'Operations dashboard access'
    ],
    permissions: ['manage_jobs', 'view_carriers', 'operations_dashboard'],
    energyLevel: 'Stellar',
    appRole: AppRole.Operations
  },
  accounts: {
    title: 'Accounts Manager',
    subtitle: 'Financial Control Matrix',
    description: 'Manage invoicing, financial reporting, credit control, and ensure healthy cash flow across all customer and carrier relationships.',
    icon: Layers,
    color: 'teal',
    gradient: 'from-teal-500 via-cyan-500 to-teal-600',
    glowColor: 'teal-500',
    features: [
      'Invoice management',
      'Financial reporting',
      'Credit control',
      'Payment processing'
    ],
    permissions: ['manage_finance', 'view_reports', 'accounts_dashboard'],
    energyLevel: 'Cosmic',
    appRole: AppRole.Accounts
  },
  sales: {
    title: 'Sales Manager',
    subtitle: 'Revenue Generation Engine',
    description: 'Drive business growth, manage customer relationships, handle sales pipeline, and convert prospects into profitable partnerships.',
    icon: Globe,
    color: 'orange',
    gradient: 'from-orange-500 via-amber-500 to-orange-600',
    glowColor: 'orange-500',
    features: [
      'Customer acquisition',
      'Sales pipeline management',
      'Revenue tracking',
      'CRM access'
    ],
    permissions: ['manage_customers', 'sales_pipeline', 'crm_access'],
    energyLevel: 'Divine',
    appRole: AppRole.Sales
  },
  carrier: {
    title: 'Quantum Carrier',
    subtitle: 'Interdimensional Transport Master',
    description: 'Navigate the quantum highways of commerce. Manage fleets, optimize routes, and deliver across space-time with unparalleled efficiency.',
    icon: Truck,
    color: 'purple',
    gradient: 'from-purple-500 via-violet-500 to-purple-600',
    glowColor: 'purple-500',
    features: [
      'Quantum fleet management',
      'Dimensional route optimization',
      'Temporal delivery windows',
      'Multiversal cargo tracking'
    ],
    permissions: ['manage_fleet', 'view_routes', 'update_deliveries'],
    energyLevel: 'Stellar',
    appRole: AppRole.Driver
  },
  admin: {
    title: 'Quantum Administrator',
    subtitle: 'Omniversal System Architect',
    description: 'Wield absolute control over the quantum matrix. Manage users, configure systems, and maintain the fabric of digital reality itself.',
    icon: Crown,
    color: 'gold',
    gradient: 'from-yellow-500 via-orange-500 to-red-500',
    glowColor: 'yellow-500',
    features: [
      'Omniversal user management',
      'Quantum system configuration',
      'Dimensional access control',
      'Reality matrix maintenance'
    ],
    permissions: ['manage_users', 'system_config', 'full_access'],
    energyLevel: 'Divine',
    appRole: AppRole.Admin
  }
};

export default function RoleSelectPage() {
  const navigate = useNavigate();
  const { user, activateRole } = useAuthStore();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);

  // OPTIMIZED: Memoized stable animation values
  const animationValues = useMemo(() => ({
    gradientShift: ['0% 50%', '100% 50%', '0% 50%'],
    pulseScale: [1, 1.1, 1],
    rotateFullCircle: [0, 360]
  }), []);

  const handleRoleSelect = useCallback(async (role: string) => {
    setIsLoading(true);
    setSelectedRole(role);
    
    try {
      // Set the role in the auth store
      await activateRole(ROLE_DEFINITIONS[role].appRole);
      
      // Show success message
      toast({
        title: `Quantum Identity Confirmed! ⚡`,
        description: `Welcome to the ${ROLE_DEFINITIONS[role].title} dimension. Your quantum matrix is now calibrated.`,
      });
      
      // Navigate to dashboard after a brief delay for effect
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
      
    } catch (error) {
      console.error('Role selection error:', error);
      toast({
        title: "Quantum Entanglement Failed",
        description: "Unable to establish dimensional link. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
      setSelectedRole(null);
    }
  }, [activateRole, navigate]);

  // OPTIMIZED: Simplified Background Component - Fewer particles, static elements
  const OptimizedQuantumBackground = useMemo(() => {
    return () => (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Static Universe Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/30 to-purple-950/30" />
        
        {/* Reduced Star Field - Only 15 stars instead of 100 */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute rounded-full bg-white opacity-60"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
        
        {/* Static Energy Grid - No Animation */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>
    );
  }, []);

  // OPTIMIZED: Stable Container Component - Minimal animations
  const StableContainer = useMemo(() => {
    return ({ children }: { children: React.ReactNode }) => (
      <div className="relative overflow-hidden rounded-2xl backdrop-blur-xl">
        {/* Static Border - No complex animations */}
        <div
          className="absolute inset-0 rounded-2xl p-[2px]"
          style={{
            background: `linear-gradient(135deg, 
              rgba(59, 130, 246, 0.6) 0%,
              rgba(139, 92, 246, 0.6) 50%,
              rgba(6, 182, 212, 0.6) 100%
            )`,
          }}
        >
          <div className="h-full w-full rounded-2xl bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 p-8">
          {children}
        </div>
        
        {/* Static Corner Icons */}
        <div className="absolute top-4 right-4 text-blue-400/40">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="absolute bottom-4 left-4 text-purple-400/40">
          <Atom className="h-4 w-4" />
        </div>
      </div>
    );
  }, []);

  // OPTIMIZED: Enhanced Role Card Component - Reduced animation complexity
  const OptimizedRoleCard = useCallback(({ roleKey, role, isSelected, isHovered, onSelect, onHover, onLeave }) => {
    const IconComponent = role.icon;
    
    return (
      <motion.div
        className="relative group cursor-pointer"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 0.6, 
          ease: "easeOut",
          delay: Object.keys(ROLE_DEFINITIONS).indexOf(roleKey) * 0.1
        }}
        whileHover={{ 
          scale: 1.02,
          y: -5,
          transition: { type: "spring", stiffness: 300, damping: 25 }
        }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => onHover(roleKey)}
        onHoverEnd={() => onLeave()}
        onClick={() => onSelect(roleKey)}
      >
        <div className="relative overflow-hidden rounded-2xl backdrop-blur-xl min-h-[400px]">
          {/* Simplified Border Animation - Only on hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl p-[2px]"
            style={{
              background: isHovered || isSelected 
                ? `linear-gradient(135deg, 
                    rgba(59, 130, 246, 0.8) 0%,
                    rgba(139, 92, 246, 0.8) 50%,
                    rgba(6, 182, 212, 0.8) 100%
                  )`
                : `linear-gradient(135deg, 
                    rgba(59, 130, 246, 0.3), 
                    rgba(139, 92, 246, 0.3), 
                    rgba(6, 182, 212, 0.3)
                  )`,
            }}
            animate={{
              opacity: isHovered ? [0.7, 1, 0.7] : 1
            }}
            transition={{
              duration: isHovered ? 2 : 0,
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut"
            }}
          >
            <div className="h-full w-full rounded-2xl bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl" />
          </motion.div>
          
          {/* Card Content */}
          <div className="relative z-10 p-8">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
              <motion.div
                className={`p-4 rounded-2xl bg-gradient-to-br ${role.gradient} shadow-2xl`}
                whileHover={{
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 400, damping: 15 }
                }}
              >
                <IconComponent className="h-8 w-8 text-white" />
              </motion.div>
              
              <Badge 
                variant="outline" 
                className={`bg-gradient-to-r ${role.gradient} text-white border-none font-bold px-3 py-1`}
              >
                {role.energyLevel}
              </Badge>
            </div>
            
            {/* Title Section - Simplified animation */}
            <div className="mb-6">
              <motion.h3 
                className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300 mb-2"
                animate={isHovered ? {
                  backgroundPosition: animationValues.gradientShift,
                } : {}}
                style={{ backgroundSize: '200% 200%' }}
                transition={{ 
                  duration: 3, 
                  repeat: isHovered ? Infinity : 0, 
                  ease: "easeInOut" 
                }}
              >
                {role.title}
              </motion.h3>
              <p className="text-blue-200/80 font-semibold text-lg">
                {role.subtitle}
              </p>
            </div>
            
            {/* Description */}
            <p className="text-blue-100/90 mb-6 leading-relaxed">
              {role.description}
            </p>
            
            {/* Features List - Static icons, only animate on hover */}
            <div className="space-y-3 mb-8">
              {role.features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: 0.1 * index,
                    duration: 0.5
                  }}
                >
                  <motion.div
                    whileHover={{
                      scale: 1.2,
                      transition: { type: "spring", stiffness: 400, damping: 15 }
                    }}
                  >
                    <Zap className="h-4 w-4 text-blue-400" />
                  </motion.div>
                  <span className="text-blue-100/80 text-sm font-medium">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
            
            {/* Action Button - Simplified animation */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Button 
                className={`w-full relative overflow-hidden font-bold tracking-wide transition-all duration-300 group bg-gradient-to-r ${role.gradient} hover:shadow-2xl hover:shadow-${role.glowColor}/25 text-white`}
                disabled={isLoading}
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isLoading && selectedRole === roleKey ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="mr-2"
                      >
                        <Cpu className="h-4 w-4" />
                      </motion.div>
                      Initializing quantum matrix...
                    </>
                  ) : (
                    <>
                      <Rocket className="mr-2 h-4 w-4" />
                      Enter {role.title} Dimension
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </Button>
            </motion.div>
          </div>
          
          {/* Static Decorative Elements - No animations */}
          <div className="absolute top-6 right-6 text-blue-400/20">
            <Orbit className="h-6 w-6" />
          </div>
          
          <div className="absolute bottom-6 left-6 text-purple-400/20">
            <Atom className="h-5 w-5" />
          </div>
        </div>
      </motion.div>
    );
  }, [animationValues, isLoading, selectedRole]);

  return (
    <div className="min-h-screen px-4 py-8 overflow-hidden relative">
      {/* Optimized Static Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/asi-wonderland🛡️/Image_fx (55).jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/35 backdrop-blur-[0.5px]" />
      </div>
      
      <OptimizedQuantumBackground />
      
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section - Simplified animations */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <AxionLogo size="lg" variant="divine" animated={false} showParticles={false} />
          
          <motion.h1 
            className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300 mt-8 mb-4 tracking-wider"
            animate={{
              backgroundPosition: animationValues.gradientShift,
            }}
            style={{ backgroundSize: '200% 200%' }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            Choose Your Quantum Destiny
          </motion.h1>
          
          <motion.p 
            className="text-xl text-blue-200/80 max-w-3xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Select your dimensional role and unlock the infinite possibilities of the Axion quantum matrix. 
            Each path offers unique powers and responsibilities across the multiverse.
          </motion.p>
          
          {user?.email && (
            <motion.div
              className="mt-6 inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-slate-800/50 backdrop-blur-sm border border-blue-500/30"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Globe className="h-5 w-5 text-blue-400" />
              <span className="text-blue-100 font-medium">
                Quantum Identity: {user.email}
              </span>
            </motion.div>
          )}
        </motion.div>
        
        {/* Role Selection Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Object.entries(ROLE_DEFINITIONS).map(([roleKey, role]) => (
            <OptimizedRoleCard
              key={roleKey}
              roleKey={roleKey}
              role={role}
              isSelected={selectedRole === roleKey}
              isHovered={hoveredRole === roleKey}
              onSelect={handleRoleSelect}
              onHover={setHoveredRole}
              onLeave={() => setHoveredRole(null)}
            />
          ))}
        </div>
        
        {/* Footer Information - Simplified */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <StableContainer>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-blue-400" />
                <span className="text-blue-100 font-medium">Quantum-Secured Authentication</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Brain className="h-6 w-6 text-purple-400" />
                <span className="text-blue-100 font-medium">AI-Enhanced Experience</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Layers className="h-6 w-6 text-cyan-400" />
                <span className="text-blue-100 font-medium">Multidimensional Access</span>
              </div>
            </div>
          </StableContainer>
        </motion.div>
      </div>
    </div>
  );
} 