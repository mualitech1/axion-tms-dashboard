import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCcw, Calendar, MapPin, List, Zap, Atom, Beaker } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { motion } from 'framer-motion';
import { AxionLogo } from '@/components/axion-logo/AxionLogo';
import { useNavigate } from 'react-router-dom';

interface JobsHeaderProps {
  onCreateJob: () => void;
  onRefresh: () => void;
  viewMode: 'list' | 'calendar' | 'map';
  onViewModeChange: (mode: 'list' | 'calendar' | 'map') => void;
}

export function JobsHeader({ onCreateJob, onRefresh, viewMode, onViewModeChange }: JobsHeaderProps) {
  const navigate = useNavigate();
  const isDevelopment = !import.meta.env.PROD;

  const goToTestPage = () => {
    navigate('/jobs/test');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
    >
      <div className="flex items-center gap-3">
        <div className="mr-1">
          <AxionLogo size="sm" variant="quantum" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-aximo-text bg-gradient-to-r from-aximo-primary via-aximo-light to-aximo-primary bg-clip-text text-transparent">Spatio-Temporal Operations</h1>
          <p className="text-aximo-text-secondary">Manage quantum-entangled transport operations across spacetime</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && onViewModeChange(value as 'list' | 'calendar' | 'map')}>
          <ToggleGroupItem value="list" aria-label="List View" className="data-[state=on]:bg-aximo-primary data-[state=on]:text-white">
            <List className="h-4 w-4 mr-1" />
            Matrix
          </ToggleGroupItem>
          <ToggleGroupItem value="calendar" aria-label="Calendar View" className="data-[state=on]:bg-aximo-primary data-[state=on]:text-white">
            <Calendar className="h-4 w-4 mr-1" />
            Temporal
          </ToggleGroupItem>
          <ToggleGroupItem value="map" aria-label="Map View" className="data-[state=on]:bg-aximo-primary data-[state=on]:text-white">
            <MapPin className="h-4 w-4 mr-1" />
            Spatial
          </ToggleGroupItem>
        </ToggleGroup>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="text-aximo-text border-aximo-border hover:bg-aximo-darker/40 hover:text-aximo-text transition-colors"
          >
            <RefreshCcw className="h-4 w-4 mr-1" />
            Resynchronize
          </Button>
          
          {isDevelopment && (
            <Button
              variant="outline"
              size="sm"
              onClick={goToTestPage}
              className="text-amber-400 border-amber-600/40 hover:bg-amber-900/20 hover:text-amber-300 transition-colors"
            >
              <Beaker className="h-4 w-4 mr-1" />
              Nuclear Test
            </Button>
          )}
          
          <Button
            variant="default"
            size="sm"
            onClick={onCreateJob}
            className="bg-gradient-to-r from-aximo-primary to-aximo-accent text-white hover:opacity-90 transition-opacity relative overflow-hidden group"
          >
            <motion.span 
              className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100"
              animate={{ 
                opacity: [0, 0.1, 0], 
                scale: [0.9, 1.1, 0.9] 
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2 
              }}
            />
            <Atom className="h-4 w-4 mr-1 group-hover:animate-pulse" />
            New Operation
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
