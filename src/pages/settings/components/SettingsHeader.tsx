
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

export default function SettingsHeader() {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const isMobile = useIsMobile();
  
  const handleSave = async () => {
    setSaving(true);
    
    // Simulate saving delay
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Settings Saved",
        description: "Your changes have been successfully applied.",
        variant: "default",
      });
    }, 800);
  };
  
  return (
    <div className="relative">
      {/* Glow effect behind header */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1EAEDB]/0 via-[#1EAEDB] to-[#1EAEDB]/0" />
      
      <div className={`flex ${isMobile ? 'flex-col' : 'justify-between'} items-start md:items-center px-4 md:px-8 py-4 md:py-6 gap-4`}>
        <div>
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-light text-white flex items-center gap-2"
          >
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#1EAEDB] to-[#8B5CF6]">
              AXIMO
            </span>{" "}
            Settings
          </motion.h1>
          <motion.p 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-sm md:text-base text-gray-400 mt-1"
          >
            Configure your AI logistics assistant and personalize your experience
          </motion.p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <Button 
            variant="outline"
            className="border-[#1EAEDB]/30 hover:border-[#1EAEDB]/80 text-gray-300 hover:text-white hover:bg-[#1A1F2C] flex-1 md:flex-none"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          
          <Button 
            onClick={handleSave}
            disabled={saving}
            className="bg-gradient-to-r from-[#1EAEDB] to-[#8B5CF6] hover:from-[#1EAEDB]/90 hover:to-[#8B5CF6]/90 text-white shadow-lg shadow-[#1EAEDB]/20 hover:shadow-[#1EAEDB]/30 transition-all flex-1 md:flex-none"
          >
            {saving ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </div>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
