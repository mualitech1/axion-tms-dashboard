import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';

const IslamicBlessingSettings = () => {
  const bannerRef = useRef<HTMLDivElement>(null);
  
  // Add star effect animation
  useEffect(() => {
    if (!bannerRef.current) return;
    
    const createStar = () => {
      const star = document.createElement('div');
      const size = Math.random() * 2;
      const container = bannerRef.current;
      
      if (!container) return;
      
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.position = 'absolute';
      star.style.borderRadius = '50%';
      star.style.backgroundColor = 'rgba(180, 140, 255, 0.8)';
      star.style.boxShadow = '0 0 4px rgba(180, 140, 255, 0.8)';
      star.style.top = `${Math.random() * containerHeight}px`;
      star.style.left = `${Math.random() * containerWidth}px`;
      star.style.animation = `float ${5 + Math.random() * 10}s linear infinite`;
      star.style.opacity = `${Math.random() * 0.7 + 0.3}`;
      star.style.zIndex = '1';
      
      container.appendChild(star);
      
      // Remove star after animation completes
      setTimeout(() => {
        if (container.contains(star)) {
          container.removeChild(star);
        }
      }, 15000);
    };
    
    // Create initial stars
    for (let i = 0; i < 10; i++) {
      createStar();
    }
    
    // Create new stars periodically
    const starInterval = setInterval(() => {
      createStar();
    }, 3000);
    
    return () => {
      clearInterval(starInterval);
    };
  }, []);
  
  return (
    <motion.div 
      ref={bannerRef}
      className="relative w-full overflow-hidden rounded-lg mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{ height: '140px' }}
    >
      {/* Cosmic background - more purple for settings */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-indigo-900/80 to-purple-900/90 backdrop-blur-sm z-0"></div>
      
      {/* Animated particles effect for settings */}
      <div className="absolute inset-0 z-1 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute h-1 w-1 rounded-full bg-purple-300/70"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: '0 0 4px rgba(180, 140, 255, 0.7)',
              animation: `pulse ${2 + Math.random() * 3}s infinite ${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Digital circuit lines in background - unique to settings */}
      <div className="absolute inset-0 z-1 opacity-20">
        <svg width="100%" height="100%" className="absolute inset-0">
          <line x1="10%" y1="20%" x2="30%" y2="20%" strokeWidth="1" stroke="rgba(180, 140, 255, 0.6)" />
          <line x1="30%" y1="20%" x2="30%" y2="80%" strokeWidth="1" stroke="rgba(180, 140, 255, 0.6)" />
          <line x1="30%" y1="80%" x2="70%" y2="80%" strokeWidth="1" stroke="rgba(180, 140, 255, 0.6)" />
          <line x1="70%" y1="80%" x2="70%" y2="40%" strokeWidth="1" stroke="rgba(180, 140, 255, 0.6)" />
          <line x1="70%" y1="40%" x2="90%" y2="40%" strokeWidth="1" stroke="rgba(180, 140, 255, 0.6)" />
          
          <circle cx="10%" cy="20%" r="2" fill="rgba(180, 140, 255, 0.8)" />
          <circle cx="30%" cy="20%" r="2" fill="rgba(180, 140, 255, 0.8)" />
          <circle cx="30%" cy="80%" r="2" fill="rgba(180, 140, 255, 0.8)" />
          <circle cx="70%" cy="80%" r="2" fill="rgba(180, 140, 255, 0.8)" />
          <circle cx="70%" cy="40%" r="2" fill="rgba(180, 140, 255, 0.8)" />
          <circle cx="90%" cy="40%" r="2" fill="rgba(180, 140, 255, 0.8)" />
        </svg>
      </div>
      
      {/* Neon border glow - settings uses more purple */}
      <div className="absolute inset-0 border border-purple-500/40 rounded-lg z-2 shadow-[0_0_15px_rgba(168,85,247,0.4)]"></div>
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center py-4 px-6">
        {/* Main Bismillah with neon effect - styled for settings */}
        <motion.div 
          className="text-2xl sm:text-3xl font-bold arabic-text text-white tracking-wider"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ 
            textShadow: '0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(168, 85, 247, 0.7)' 
          }}
        >
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </motion.div>
        
        <motion.div 
          className="text-sm text-purple-200 tracking-wide mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ textShadow: '0 0 8px rgba(168, 85, 247, 0.5)' }}
        >
          In the name of Allah, the Most Gracious, the Most Merciful
        </motion.div>
        
        {/* Animated light separator - settings version */}
        <motion.div 
          className="w-48 h-px my-2"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 192, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{ 
            background: 'linear-gradient(90deg, transparent, rgba(180, 140, 255, 0.8), transparent)',
            boxShadow: '0 0 8px rgba(168, 85, 247, 0.5)' 
          }}
        ></motion.div>
        
        {/* Settings have the synchronization text instead of additional phrases */}
        <motion.div 
          className="flex items-center mt-2 text-sm text-purple-200/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <Sparkles className="h-3.5 w-3.5 mr-2 text-purple-300" />
          <span>Quantum settings synchronized with divine guidance</span>
        </motion.div>
      </div>
      
      {/* Add pulsing cosmic glow effect - settings version */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-lg opacity-50 z-1 animate-pulse"></div>
      
      {/* Quantum circuit node (settings specific) */}
      <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/10 to-indigo-300/5 blur-md z-1"></div>
    </motion.div>
  );
};

export default IslamicBlessingSettings; 