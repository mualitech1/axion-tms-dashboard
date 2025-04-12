
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import SettingsHeader from './components/SettingsHeader';
import SettingsContent from './components/SettingsContent';
import { useIsMobile } from '@/hooks/use-mobile';

export default function SettingsPage() {
  const isMobile = useIsMobile();
  
  return (
    <MainLayout title="Settings">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-3 md:px-4 pt-2"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A1F2C] to-[#111827] rounded-xl md:rounded-3xl opacity-50 blur-xl -z-10" />
          <div className="bg-gradient-to-br from-[#1A1F2C]/90 to-[#0F172A]/95 rounded-xl md:rounded-3xl shadow-xl border border-[#1EAEDB]/10 backdrop-blur-sm overflow-hidden">
            <SettingsHeader />
            <SettingsContent />
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
}
