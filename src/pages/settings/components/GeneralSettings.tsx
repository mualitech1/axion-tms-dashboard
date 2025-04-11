
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Building, 
  Phone, 
  Mail, 
  Globe, 
  Moon, 
  Sun, 
  Languages, 
  UserCog 
} from 'lucide-react';

export default function GeneralSettings() {
  const [theme, setTheme] = useState("system");
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.15,
        duration: 0.5
      } 
    })
  };

  return (
    <div className="space-y-8 text-gray-300">
      <motion.div 
        custom={0}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="space-y-2"
      >
        <div className="flex items-center space-x-2">
          <Building className="h-5 w-5 text-[#1EAEDB]" />
          <h3 className="text-lg font-medium text-white">Organization</h3>
        </div>
        <p className="text-sm text-gray-400 mb-4">Update your organization details</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="company-name">Company Name</Label>
            <div className="relative">
              <Input 
                id="company-name" 
                defaultValue="Aximo Logistics" 
                className="bg-[#111827]/50 border-[#1EAEDB]/20 text-white placeholder:text-gray-500 focus:ring-[#1EAEDB]/50 focus:border-[#1EAEDB]/50"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company-phone">Phone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                id="company-phone" 
                defaultValue="+1 (555) 123-4567" 
                className="pl-10 bg-[#111827]/50 border-[#1EAEDB]/20 text-white placeholder:text-gray-500 focus:ring-[#1EAEDB]/50 focus:border-[#1EAEDB]/50"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company-email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                id="company-email" 
                defaultValue="contact@aximo.ai" 
                className="pl-10 bg-[#111827]/50 border-[#1EAEDB]/20 text-white placeholder:text-gray-500 focus:ring-[#1EAEDB]/50 focus:border-[#1EAEDB]/50"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company-website">Website</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                id="company-website" 
                defaultValue="https://aximo.ai" 
                className="pl-10 bg-[#111827]/50 border-[#1EAEDB]/20 text-white placeholder:text-gray-500 focus:ring-[#1EAEDB]/50 focus:border-[#1EAEDB]/50"
              />
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        custom={1}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="space-y-4 pt-4 border-t border-[#1EAEDB]/10"
      >
        <div className="flex items-center space-x-2">
          <UserCog className="h-5 w-5 text-[#1EAEDB]" />
          <h3 className="text-lg font-medium text-white">Preferences</h3>
        </div>
        <p className="text-sm text-gray-400 mb-4">Customize your application experience</p>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="theme" className="text-white">Theme</Label>
              <p className="text-xs text-gray-400">Select your preferred appearance</p>
            </div>
            <Select defaultValue={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-[180px] bg-[#111827]/50 border-[#1EAEDB]/20 text-white">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1F2C] border-[#1EAEDB]/20 text-white">
                <SelectItem value="light" className="focus:bg-[#1EAEDB]/20 focus:text-white">
                  <div className="flex items-center">
                    <Sun className="h-4 w-4 mr-2" />
                    Light
                  </div>
                </SelectItem>
                <SelectItem value="dark" className="focus:bg-[#1EAEDB]/20 focus:text-white">
                  <div className="flex items-center">
                    <Moon className="h-4 w-4 mr-2" />
                    Dark
                  </div>
                </SelectItem>
                <SelectItem value="system" className="focus:bg-[#1EAEDB]/20 focus:text-white">
                  <div className="flex items-center">
                    <div className="flex h-4 w-4 items-center justify-center mr-2">
                      <Sun className="h-3 w-3 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-3 w-3 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    </div>
                    System
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="language" className="text-white">Language</Label>
              <p className="text-xs text-gray-400">Choose your preferred language</p>
            </div>
            <Select defaultValue="en">
              <SelectTrigger className="w-[180px] bg-[#111827]/50 border-[#1EAEDB]/20 text-white">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1F2C] border-[#1EAEDB]/20 text-white">
                <SelectItem value="en" className="focus:bg-[#1EAEDB]/20 focus:text-white">English</SelectItem>
                <SelectItem value="fr" className="focus:bg-[#1EAEDB]/20 focus:text-white">French</SelectItem>
                <SelectItem value="de" className="focus:bg-[#1EAEDB]/20 focus:text-white">German</SelectItem>
                <SelectItem value="es" className="focus:bg-[#1EAEDB]/20 focus:text-white">Spanish</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-white">Animations</Label>
              <p className="text-xs text-gray-400">Enable UI animations and transitions</p>
            </div>
            <Switch defaultChecked className="data-[state=checked]:bg-[#1EAEDB]" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-white">Analytics</Label>
              <p className="text-xs text-gray-400">Allow collection of anonymous usage data</p>
            </div>
            <Switch defaultChecked className="data-[state=checked]:bg-[#1EAEDB]" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-white">AI Recommendations</Label>
              <p className="text-xs text-gray-400">Receive AI-powered suggestions based on usage</p>
            </div>
            <Switch defaultChecked className="data-[state=checked]:bg-[#1EAEDB]" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
