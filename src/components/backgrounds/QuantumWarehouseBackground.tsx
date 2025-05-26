import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, Package, Building2, Zap, Sparkles, Orbit, Cpu, Brain, Network, Globe, Layers, Shield, Star, Atom, Crown } from 'lucide-react';

interface QuantumWarehouseBackgroundProps {
  intensity?: 'low' | 'medium' | 'high' | 'ultra';
  showTrucks?: boolean;
  showHolographics?: boolean;
  theme?: 'warehouse' | 'universe' | 'hybrid';
}

export function QuantumWarehouseBackground({ 
  intensity = 'high',
  showTrucks = true,
  showHolographics = true,
  theme = 'hybrid'
}: QuantumWarehouseBackgroundProps) {
  const [quantumPhase, setQuantumPhase] = useState(0);
  const [truckPositions, setTruckPositions] = useState([]);
  const [hologramPhase, setHologramPhase] = useState(0);
  const [energyPulse, setEnergyPulse] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize quantum animation cycles
  useEffect(() => {
    const phaseInterval = setInterval(() => {
      setQuantumPhase(prev => (prev + 1) % 360);
    }, 100);

    const hologramInterval = setInterval(() => {
      setHologramPhase(prev => (prev + 1) % 8);
    }, 2000);

    const energyInterval = setInterval(() => {
      setEnergyPulse(prev => (prev + 1) % 12);
    }, 1500);

    return () => {
      clearInterval(phaseInterval);
      clearInterval(hologramInterval);
      clearInterval(energyInterval);
    };
  }, []);

  // Initialize truck positions
  useEffect(() => {
    const trucks = Array.from({ length: intensity === 'ultra' ? 8 : intensity === 'high' ? 6 : 4 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      speed: Math.random() * 0.5 + 0.2,
      size: Math.random() * 0.3 + 0.7,
      color: ['#3B82F6', '#8B5CF6', '#06B6D4', '#F59E0B', '#EF4444'][Math.floor(Math.random() * 5)]
    }));
    setTruckPositions(trucks);
  }, [intensity]);

  // Animate trucks
  useEffect(() => {
    const animateInterval = setInterval(() => {
      setTruckPositions(prev => prev.map(truck => ({
        ...truck,
        x: (truck.x + truck.speed) % 120, // Let trucks move off screen and reappear
        rotation: truck.rotation + truck.speed * 10
      })));
    }, 50);

    return () => clearInterval(animateInterval);
  }, []);

  // 3D Warehouse Grid Component
  const WarehouseGrid = () => (
    <div className="absolute inset-0 overflow-hidden">
      {/* Perspective Floor Grid */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          transform: 'perspective(1000px) rotateX(60deg) translateZ(-500px)',
          transformOrigin: 'center bottom'
        }}
        animate={{
          backgroundPosition: [`0px 0px`, `100px 100px`],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Warehouse Structures */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`structure-${i}`}
          className="absolute"
          style={{
            left: `${15 + (i % 4) * 20}%`,
            top: `${20 + Math.floor(i / 4) * 25}%`,
            width: '120px',
            height: '80px',
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0.3, 0.7, 0.3],
            scale: [0.8, 1, 0.8],
            y: [0, -10, 0]
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3
          }}
        >
          {/* Warehouse Building */}
          <div className="relative">
            <motion.div
              className="bg-gradient-to-t from-slate-800/30 to-slate-600/20 border border-blue-400/20 rounded-lg backdrop-blur-sm"
              style={{ 
                width: '100%', 
                height: '60px',
                transform: 'perspective(200px) rotateX(10deg)'
              }}
              animate={{
                borderColor: [
                  'rgba(59, 130, 246, 0.2)',
                  'rgba(139, 92, 246, 0.4)',
                  'rgba(6, 182, 212, 0.2)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2
              }}
            >
              {/* Building Windows */}
              <div className="grid grid-cols-3 gap-1 p-2 h-full">
                {[...Array(6)].map((_, w) => (
                  <motion.div
                    key={w}
                    className="bg-blue-400/30 rounded-sm"
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      backgroundColor: [
                        'rgba(59, 130, 246, 0.3)',
                        'rgba(139, 92, 246, 0.6)',
                        'rgba(6, 182, 212, 0.3)',
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: w * 0.3 + i * 0.1
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Holographic Label */}
            <motion.div
              className="absolute -top-6 left-1/2 transform -translate-x-1/2"
              animate={{
                y: [0, -5, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2
              }}
            >
              <div className="bg-blue-500/20 border border-blue-400/40 rounded px-2 py-1 text-xs text-blue-300 font-mono backdrop-blur-sm">
                WAR-{String(i + 1).padStart(3, '0')}
              </div>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  // Quantum Scania Trucks Component
  const QuantumTrucks = () => (
    <div className="absolute inset-0 overflow-hidden">
      {showTrucks && truckPositions.map((truck) => (
        <motion.div
          key={truck.id}
          className="absolute"
          style={{
            left: `${truck.x}%`,
            top: `${truck.y}%`,
            transform: `scale(${truck.size}) rotate(${truck.rotation}deg)`,
          }}
          animate={{
            filter: [
              'drop-shadow(0 0 10px rgba(59, 130, 246, 0.6))',
              'drop-shadow(0 0 20px rgba(139, 92, 246, 0.8))',
              'drop-shadow(0 0 10px rgba(6, 182, 212, 0.6))',
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Futuristic Scania Truck */}
          <div className="relative w-20 h-12">
            {/* Truck Cab */}
            <motion.div
              className="absolute left-0 top-2 w-8 h-8 rounded-lg"
              style={{ 
                background: `linear-gradient(135deg, ${truck.color}, ${truck.color}80)`,
                boxShadow: `0 0 20px ${truck.color}60`
              }}
              animate={{
                boxShadow: [
                  `0 0 10px ${truck.color}60`,
                  `0 0 30px ${truck.color}90`,
                  `0 0 10px ${truck.color}60`,
                ]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Cab Windows */}
              <div className="absolute inset-1 bg-cyan-400/60 rounded-md"></div>
              {/* Quantum Engine Glow */}
              <motion.div
                className="absolute -left-1 top-1/2 w-2 h-2 rounded-full bg-blue-400"
                animate={{
                  scale: [0.8, 1.5, 0.8],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Truck Trailer */}
            <motion.div
              className="absolute left-6 top-1 w-12 h-10 rounded-lg border-2"
              style={{ 
                background: `linear-gradient(135deg, ${truck.color}40, ${truck.color}20)`,
                borderColor: `${truck.color}80`
              }}
              animate={{
                borderColor: [
                  `${truck.color}60`,
                  `${truck.color}FF`,
                  `${truck.color}60`,
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* AXION Branding */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="text-white font-bold text-xs"
                  animate={{
                    opacity: [0.7, 1, 0.7],
                    scale: [0.9, 1.1, 0.9]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  AXION
                </motion.div>
              </div>

              {/* Quantum Cargo Indicator */}
              <motion.div
                className="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-400"
                animate={{
                  scale: [0.5, 1.2, 0.5],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Truck Wheels */}
            {[0, 14].map((offset, i) => (
              <motion.div
                key={i}
                className="absolute bottom-0 w-3 h-3 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 border-2 border-blue-400"
                style={{ left: `${2 + offset}px` }}
                animate={{
                  rotate: [0, 360],
                  borderColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(6, 182, 212, 0.8)',
                  ]
                }}
                transition={{
                  rotate: { duration: 0.5, repeat: Infinity, ease: "linear" },
                  borderColor: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              />
            ))}

            {/* Energy Trail */}
            <motion.div
              className="absolute left-0 top-1/2 w-6 h-1 rounded-full"
              style={{
                background: `linear-gradient(90deg, transparent, ${truck.color}80, transparent)`,
                transform: 'translateX(-100%)'
              }}
              animate={{
                opacity: [0, 1, 0],
                scaleX: [0, 1, 0]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );

  // Holographic UI Elements
  const HolographicUI = () => (
    <div className="absolute inset-0 pointer-events-none">
      {showHolographics && (
        <>
          {/* Floating Data Panels */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`panel-${i}`}
              className="absolute"
              style={{
                left: `${10 + i * 15}%`,
                top: `${15 + (i % 2) * 30}%`,
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0.5, 1, 0.5],
                y: [0, -20, 0],
                rotateY: [0, 10, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut"
              }}
            >
              <div className="bg-blue-500/10 border border-blue-400/40 rounded-lg p-3 backdrop-blur-sm min-w-[120px]">
                <div className="flex items-center space-x-2 mb-2">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    {i % 3 === 0 && <Package className="h-4 w-4 text-blue-400" />}
                    {i % 3 === 1 && <Truck className="h-4 w-4 text-purple-400" />}
                    {i % 3 === 2 && <Building2 className="h-4 w-4 text-cyan-400" />}
                  </motion.div>
                  <span className="text-xs text-blue-300 font-mono">
                    {i % 3 === 0 && 'CARGO'}
                    {i % 3 === 1 && 'FLEET'}
                    {i % 3 === 2 && 'DEPOT'}
                  </span>
                </div>
                <div className="space-y-1">
                  <motion.div
                    className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded"
                    animate={{ width: ['0%', '100%', '0%'] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                  />
                  <div className="text-xs text-blue-200 font-mono">
                    {Math.floor(Math.random() * 100)}% Active
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Quantum Navigation Beacons */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`beacon-${i}`}
              className="absolute"
              style={{
                left: `${Math.random() * 90 + 5}%`,
                top: `${Math.random() * 80 + 10}%`,
              }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
                rotate: [0, 360]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut"
              }}
            >
              <div className="w-8 h-8 rounded-full border-2 border-cyan-400 flex items-center justify-center">
                <motion.div
                  className="w-2 h-2 rounded-full bg-cyan-400"
                  animate={{
                    scale: [0.5, 1.5, 0.5],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          ))}
        </>
      )}
    </div>
  );

  // Universe Elements (for hybrid/universe theme)
  const UniverseElements = () => (
    <div className="absolute inset-0 overflow-hidden">
      {theme !== 'warehouse' && (
        <>
          {/* Cosmic Dust and Stars */}
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5]
              }}
              transition={{
                duration: Math.random() * 4 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Nebula Clouds */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`nebula-${i}`}
              className="absolute rounded-full opacity-20"
              style={{
                width: Math.random() * 300 + 200 + 'px',
                height: Math.random() * 300 + 200 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                background: `radial-gradient(circle, 
                  ${i % 3 === 0 ? '#3B82F6' : i % 3 === 1 ? '#8B5CF6' : '#06B6D4'}40 0%, 
                  transparent 70%
                )`,
              }}
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 360]
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}

          {/* Galaxy Spiral */}
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              background: `conic-gradient(from ${quantumPhase}deg, 
                transparent 0deg,
                rgba(59, 130, 246, 0.3) 90deg,
                rgba(139, 92, 246, 0.3) 180deg,
                rgba(6, 182, 212, 0.3) 270deg,
                transparent 360deg
              )`,
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </>
      )}
    </div>
  );

  // Energy Pulse Network
  const EnergyNetwork = () => (
    <div className="absolute inset-0 overflow-hidden">
      {/* Energy Connection Lines */}
      <svg className="absolute inset-0 w-full h-full">
        {[...Array(15)].map((_, i) => (
          <motion.line
            key={`line-${i}`}
            x1={`${Math.random() * 100}%`}
            y1={`${Math.random() * 100}%`}
            x2={`${Math.random() * 100}%`}
            y2={`${Math.random() * 100}%`}
            stroke="url(#gradient)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.8)" />
            <stop offset="100%" stopColor="rgba(6, 182, 212, 0.8)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Pulsing Energy Nodes */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`node-${i}`}
          className="absolute w-4 h-4 rounded-full"
          style={{
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 80 + 10}%`,
            background: `radial-gradient(circle, 
              rgba(59, 130, 246, 0.8) 0%, 
              rgba(139, 92, 246, 0.6) 50%, 
              transparent 100%
            )`
          }}
          animate={{
            scale: [0.5, 2, 0.5],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Universe Elements (background layer) */}
      <UniverseElements />
      
      {/* Energy Network */}
      <EnergyNetwork />
      
      {/* 3D Warehouse Grid */}
      <WarehouseGrid />
      
      {/* Quantum Trucks */}
      <QuantumTrucks />
      
      {/* Holographic UI */}
      <HolographicUI />
      
      {/* Final Energy Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-purple-900/5 to-cyan-900/5"
        animate={{
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
} 