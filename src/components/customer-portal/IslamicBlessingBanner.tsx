import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const IslamicBlessingBanner = () => {
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
      star.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
      star.style.boxShadow = '0 0 4px rgba(255, 255, 255, 0.8)';
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
    for (let i = 0; i < 15; i++) {
      createStar();
    }
    
    // Create new stars periodically
    const starInterval = setInterval(() => {
      createStar();
    }, 2000);
    
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
      style={{ height: '180px' }}
    >
      {/* Cosmic background */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 via-purple-900/80 to-indigo-900/90 backdrop-blur-sm z-0"></div>
      
      {/* Animated stars effect */}
      <div className="absolute inset-0 z-1">
        {[...Array(25)].map((_, i) => (
          <div 
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/70"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: '0 0 4px rgba(255, 255, 255, 0.7)',
              animation: `pulse ${2 + Math.random() * 3}s infinite ${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Cosmic nebula effect */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-1">
        <div className="absolute top-10 -left-20 w-80 h-80 rounded-full bg-purple-500/5 blur-2xl"></div>
        <div className="absolute bottom-0 right-10 w-60 h-60 rounded-full bg-blue-500/5 blur-2xl"></div>
      </div>
      
      {/* Neon border glow */}
      <div className="absolute inset-0 border border-indigo-500/40 rounded-lg z-2 shadow-[0_0_15px_rgba(129,140,248,0.4)]"></div>
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center py-4 px-6">
        {/* Main Bismillah with neon effect */}
        <motion.div 
          className="text-2xl sm:text-3xl md:text-4xl font-bold arabic-text text-white tracking-wider"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ 
            textShadow: '0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(129, 140, 248, 0.7)' 
          }}
        >
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </motion.div>
        
        <motion.div 
          className="text-sm sm:text-base text-indigo-200 tracking-wide mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ textShadow: '0 0 8px rgba(129, 140, 248, 0.5)' }}
        >
          In the name of Allah, the Most Gracious, the Most Merciful
        </motion.div>
        
        {/* Animated light separator */}
        <motion.div 
          className="w-48 h-px my-2"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 192, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{ 
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)' 
          }}
        ></motion.div>
        
        {/* Additional phrases with staggered animation */}
        <motion.div 
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <span className="flex items-center">
            <span className="text-indigo-300 arabic-text" style={{ textShadow: '0 0 5px rgba(129, 140, 248, 0.5)' }}>مَا شَاءَ اللّٰهُ</span>
            <span className="mx-1 opacity-50">•</span>
            <span className="text-indigo-100/80">Mashallah</span>
          </span>
          
          <span className="flex items-center">
            <span className="text-indigo-300 arabic-text" style={{ textShadow: '0 0 5px rgba(129, 140, 248, 0.5)' }}>اَللّٰهُ أَكْبَرُ</span>
            <span className="mx-1 opacity-50">•</span>
            <span className="text-indigo-100/80">Allahu Akbar</span>
          </span>
          
          <span className="flex items-center">
            <span className="text-indigo-300 arabic-text" style={{ textShadow: '0 0 5px rgba(129, 140, 248, 0.5)' }}>صَلِّ عَلَى مُحَمَّدٍ</span>
            <span className="mx-1 opacity-50">•</span>
            <span className="text-indigo-100/80">Peace be upon Muhammad ﷺ</span>
          </span>
        </motion.div>
      </div>
      
      {/* Add pulsing cosmic glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg opacity-50 z-1 animate-pulse"></div>
      
      {/* Celestial body (moon) */}
      <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-gradient-to-br from-gray-200/10 to-gray-300/5 blur-md z-1"></div>
    </motion.div>
  );
};

export default IslamicBlessingBanner; 