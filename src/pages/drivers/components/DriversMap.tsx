import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Globe, Layers, ChevronDown, Orbit, Zap } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Driver } from '../types/driverTypes';
import { motion } from 'framer-motion';

interface DriversMapProps {
  drivers: Driver[];
}

export default function DriversMap({ drivers }: DriversMapProps) {
  const [mapType, setMapType] = useState<'satellite' | 'street'>('street');
  const [visualizationType, setVisualizationType] = useState<'location' | 'heatmap'>('location');
  
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  // Generate random coordinates for each driver
  // In a real implementation, this would use the driver's actual address or location
  const driverLocations = drivers.map((driver) => ({
    id: driver.id,
    name: driver.name,
    status: driver.status,
    // Generate random coordinates for visualization purposes
    location: {
      lat: 51.5 + (Math.random() - 0.5) * 0.1,
      lng: -0.12 + (Math.random() - 0.5) * 0.1
    }
  }));
  
  // Simulate map rendering when component mounts or dependencies change
  useEffect(() => {
    if (!mapContainerRef.current) return;
    
    console.log(`Rendering map for ${drivers.length} drivers`);
    console.log('Map type:', mapType);
    console.log('Visualization type:', visualizationType);
    
    // In a real implementation, this is where we would initialize the map library
    // and plot the driver locations
  }, [drivers, mapType, visualizationType]);
  
  // Get a CSS class for the driver pin based on status
  const getDriverPinClass = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-green-500';
      case 'On Leave': return 'bg-amber-500';
      case 'Inactive': return 'bg-red-500';
      default: return 'bg-aximo-primary';
    }
  };
  
  // Get animation variants for the map markers
  const getDriverMarkerVariants = (index: number) => ({
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        delay: index * 0.05, 
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  });
  
  // Calculate energy connections between nearby drivers
  const connections = [];
  for (let i = 0; i < driverLocations.length; i++) {
    for (let j = i + 1; j < driverLocations.length; j++) {
      const distance = Math.sqrt(
        Math.pow(driverLocations[i].location.lat - driverLocations[j].location.lat, 2) +
        Math.pow(driverLocations[i].location.lng - driverLocations[j].location.lng, 2)
      );
      
      // Only connect drivers that are close to each other
      if (distance < 0.03) {
        connections.push({
          id: `${i}-${j}`,
          source: driverLocations[i],
          target: driverLocations[j],
          strength: 1 - distance / 0.03 // Strength inversely proportional to distance
        });
      }
    }
  }
  
  return (
    <Card className="bg-aximo-card border-aximo-border shadow-aximo hover:shadow-aximo-strong transition-all duration-300">
      <CardHeader className="pb-3 border-b border-aximo-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2 text-aximo-text">
            <Globe className="h-5 w-5 text-aximo-primary" />
            Quantum Operator Field
          </CardTitle>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1 bg-aximo-darker border-aximo-border text-aximo-text hover:bg-aximo-darker/70">
                  <Layers className="h-4 w-4 mr-1" />
                  {mapType === 'satellite' ? 'Quantum View' : 'Spatial Grid'} <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-aximo-darker border-aximo-border">
                <DropdownMenuItem onClick={() => setMapType('street')} className="text-aximo-text hover:bg-aximo-primary/20">
                  Spatial Grid
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setMapType('satellite')} className="text-aximo-text hover:bg-aximo-primary/20">
                  Quantum View
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1 bg-aximo-darker border-aximo-border text-aximo-text hover:bg-aximo-darker/70">
                  <Zap className="h-4 w-4 mr-1" />
                  Visualization <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-aximo-darker border-aximo-border">
                <DropdownMenuItem 
                  onClick={() => setVisualizationType('location')} 
                  className="text-aximo-text hover:bg-aximo-primary/20"
                >
                  Position Data
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setVisualizationType('heatmap')} 
                  className="text-aximo-text hover:bg-aximo-primary/20"
                >
                  Energy Density
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="relative">
          {/* Map Container */}
          <div 
            ref={mapContainerRef} 
            className={`h-[400px] w-full relative overflow-hidden ${
              mapType === 'satellite' ? 'bg-slate-900' : 'bg-aximo-darker'
            }`}
          >
            {/* Grid lines for the map background */}
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={`col-${i}`} className="h-full border-r border-aximo-primary/10"></div>
              ))}
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={`row-${i}`} className="w-full border-b border-aximo-primary/10"></div>
              ))}
            </div>
            
            {/* Quantum field visualization (subtle radial gradient) */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-aximo-primary/5 via-transparent to-transparent opacity-50"></div>
            
            {drivers.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center bg-aximo-darker/80 backdrop-blur-sm p-6 rounded-xl border border-aximo-border/50 max-w-sm">
                  <Orbit className="h-12 w-12 text-aximo-primary mx-auto mb-4 opacity-75" />
                  <h3 className="text-lg font-semibold text-aximo-text mb-2">No Operators Detected</h3>
                  <p className="text-aximo-text-secondary mb-4">
                    The quantum field is empty. Add operators to visualize their positions in the network.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Connection lines between nearby drivers */}
                {visualizationType === 'location' && connections.map((connection) => (
                  <motion.div
                    key={connection.id}
                    className="absolute"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: connection.strength * 0.8 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <svg 
                      className="absolute" 
                      style={{
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0,
                        overflow: 'visible',
                        position: 'absolute'
                      }}
                    >
                      <motion.line
                        x1={`${(connection.source.location.lng + 0.18) * 1000}%`}
                        y1={`${(connection.source.location.lat - 51.45) * 1000}%`}
                        x2={`${(connection.target.location.lng + 0.18) * 1000}%`}
                        y2={`${(connection.target.location.lat - 51.45) * 1000}%`}
                        stroke="rgba(99, 102, 241, 0.4)"
                        strokeWidth="1"
                        strokeDasharray="4 2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                      />
                    </svg>
                  </motion.div>
                ))}
                
                {/* Driver location markers */}
                {visualizationType === 'location' && driverLocations.map((driver, index) => (
                  <motion.div
                    key={driver.id}
                    className="absolute cursor-pointer group"
                    style={{ 
                      top: `${(driver.location.lat - 51.45) * 1000}%`, 
                      left: `${(driver.location.lng + 0.18) * 1000}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    variants={getDriverMarkerVariants(index)}
                    initial="initial"
                    animate="animate"
                    whileHover={{ scale: 1.2 }}
                  >
                    {/* Pulse effect */}
                    <div className={`absolute -inset-4 ${getDriverPinClass(driver.status)} rounded-full opacity-10 group-hover:animate-ping`}></div>
                    
                    {/* Main marker */}
                    <div className="relative">
                      <div className={`h-4 w-4 ${getDriverPinClass(driver.status)} rounded-full shadow-lg shadow-aximo-primary/20 z-10`}></div>
                      
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="bg-aximo-darker/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-aximo-border shadow-lg text-xs text-aximo-text whitespace-nowrap">
                          <div className="font-semibold">{driver.name}</div>
                          <div className="text-aximo-text-secondary">{driver.status}</div>
                        </div>
                        <div className={`w-2 h-2 ${getDriverPinClass(driver.status)} rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2`}></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Heat map visualization */}
                {visualizationType === 'heatmap' && (
                  <div className="absolute inset-0">
                    {driverLocations.map((driver, index) => (
                      <motion.div
                        key={driver.id}
                        className="absolute rounded-full bg-gradient-to-r from-aximo-primary/30 to-transparent blur-xl"
                        style={{ 
                          top: `${(driver.location.lat - 51.45) * 1000}%`, 
                          left: `${(driver.location.lng + 0.18) * 1000}%`,
                          width: '120px',
                          height: '120px',
                          transform: 'translate(-50%, -50%)'
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: driver.status === 'Active' ? 0.8 : driver.status === 'On Leave' ? 0.5 : 0.2,
                          scale: 1
                        }}
                        transition={{ 
                          duration: 1,
                          delay: index * 0.1
                        }}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-aximo-darker/80 backdrop-blur-sm rounded-lg border border-aximo-border/50 p-3 shadow-md">
            <div className="text-xs font-medium text-aximo-text mb-2">Operator States</div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                <span className="text-xs text-aximo-text">Entangled</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-amber-500 rounded-full"></div>
                <span className="text-xs text-aximo-text">Recalibrating</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                <span className="text-xs text-aximo-text">Dormant</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quantum field analytics footer */}
        <div className="p-3 border-t border-aximo-border bg-aximo-darker/50">
          <div className="flex flex-wrap justify-between items-center gap-2 text-xs text-aximo-text-secondary">
            <div>
              <span className="font-medium text-aximo-primary">{drivers.length}</span> quantum operators detected in field
            </div>
            <div className="flex items-center gap-4">
              <div>
                <span className="font-medium text-green-500">{drivers.filter(d => d.status === 'Active').length}</span> entangled
              </div>
              <div>
                <span className="font-medium text-amber-500">{drivers.filter(d => d.status === 'On Leave').length}</span> recalibrating
              </div>
              <div>
                <span className="font-medium text-red-500">{drivers.filter(d => d.status === 'Inactive').length}</span> dormant
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 