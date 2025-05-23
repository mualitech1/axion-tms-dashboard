import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AppRole } from '@/types/permissions';
import { getRoleDisplayInfo } from '@/services/rbac-service';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Briefcase, 
  TruckIcon, 
  LineChart, 
  UserCircle, 
  ReceiptText, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface RoleSelectorProps {
  availableRoles: AppRole[];
  onRoleSelect: (role: AppRole) => void;
  isLoading: boolean;
}

export function RoleSelector({ 
  availableRoles, 
  onRoleSelect,
  isLoading
}: RoleSelectorProps) {
  const [selectedRole, setSelectedRole] = useState<AppRole | null>(null);
  
  // Role icon mapping
  const getRoleIcon = (role: AppRole) => {
    const iconMap = {
      [AppRole.Admin]: Shield,
      [AppRole.Operations]: TruckIcon,
      [AppRole.Accounts]: ReceiptText,
      [AppRole.Sales]: LineChart,
      [AppRole.Driver]: TruckIcon,
      [AppRole.Customer]: UserCircle
    };
    
    const IconComponent = iconMap[role] || Briefcase;
    return <IconComponent className="h-6 w-6" />;
  };
  
  // Role color mapping
  const getRoleColor = (role: AppRole) => {
    const colorMap = {
      [AppRole.Admin]: 'from-purple-500 to-indigo-700',
      [AppRole.Operations]: 'from-blue-500 to-blue-700',
      [AppRole.Accounts]: 'from-emerald-500 to-teal-700',
      [AppRole.Sales]: 'from-amber-500 to-orange-700',
      [AppRole.Driver]: 'from-sky-500 to-cyan-700',
      [AppRole.Customer]: 'from-violet-500 to-purple-700'
    };
    
    return colorMap[role] || 'from-gray-500 to-gray-700';
  };
  
  // Animation variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-aximo-darker px-4 overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-1/4 w-96 h-96 bg-aximo-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="border-aximo-border bg-aximo-dark overflow-hidden">
          <CardHeader className="text-center space-y-2 border-b border-aximo-border">
            <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-aximo-primary to-purple-400">
              Quantum Role Selection
            </CardTitle>
            <CardDescription className="text-aximo-text-secondary">
              Select your dimensional access portal
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-3"
            >
              {availableRoles.map((role) => {
                const { title, description } = getRoleDisplayInfo(role);
                const isSelected = selectedRole === role;
                
                return (
                  <motion.div key={role} variants={itemVariants}>
                    <Button
                      variant="outline"
                      className={`w-full flex items-center justify-between p-4 h-auto border transition-all duration-300 ${
                        isSelected 
                          ? 'border-aximo-primary bg-aximo-primary/10 text-aximo-primary' 
                          : 'border-aximo-border bg-aximo-dark/60 hover:bg-aximo-dark/90 text-aximo-text-secondary hover:text-aximo-text'
                      }`}
                      onClick={() => setSelectedRole(role)}
                    >
                      <div className="flex items-center">
                        <div className={`p-2 rounded-full mr-3 bg-gradient-to-br ${getRoleColor(role)} text-white`}>
                          {getRoleIcon(role)}
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{title}</div>
                          <div className="text-xs opacity-75">{description}</div>
                        </div>
                      </div>
                    </Button>
                  </motion.div>
                );
              })}
            </motion.div>
            
            <div className="mt-6">
              <Button 
                className="w-full bg-gradient-to-r from-aximo-primary to-purple-500 text-white hover:from-aximo-primary/90 hover:to-purple-600"
                disabled={!selectedRole || isLoading}
                onClick={() => selectedRole && onRoleSelect(selectedRole)}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <Sparkles className="animate-pulse mr-2 h-4 w-4" />
                    Initializing Quantum Access...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Access Quantum Matrix
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
} 