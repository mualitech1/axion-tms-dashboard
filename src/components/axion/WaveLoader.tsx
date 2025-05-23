import { motion } from 'framer-motion';

export function WaveLoader() {
  const waveCount = 12;
  const animationDuration = 1.2;
  
  return (
    <div className="flex items-center justify-center space-x-1 h-6">
      {Array.from({ length: waveCount }).map((_, index) => (
        <motion.div
          key={index}
          className="w-[2px] bg-aximo-primary rounded-full"
          initial={{ height: 4 }}
          animate={{
            height: [4, 16, 4],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: animationDuration,
            delay: (index * animationDuration) / waveCount,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
} 