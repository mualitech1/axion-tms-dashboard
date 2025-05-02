
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { 
  Cloud, Clock, TrendingUp, AlertTriangle 
} from "lucide-react";

interface FactorsProps {
  factors: {
    traffic: boolean;
    weather: boolean;
    historical: boolean;
    priority: boolean;
  };
  onChange: (factors: {
    traffic: boolean;
    weather: boolean;
    historical: boolean;
    priority: boolean;
  }) => void;
}

export function OptimizationFactors({ factors, onChange }: FactorsProps) {
  const handleChange = (factor: keyof typeof factors) => {
    onChange({
      ...factors,
      [factor]: !factors[factor]
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 p-3 bg-background/50 rounded-md">
      <div className="flex items-center justify-between space-x-2">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-4 w-4 text-blue-600" />
          <label htmlFor="traffic-conditions" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Live Traffic Conditions
          </label>
        </div>
        <Switch
          id="traffic-conditions"
          checked={factors.traffic}
          onCheckedChange={() => handleChange('traffic')}
        />
      </div>
      
      <div className="flex items-center justify-between space-x-2">
        <div className="flex items-center space-x-2">
          <Cloud className="h-4 w-4 text-blue-600" />
          <label htmlFor="weather-conditions" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Weather Conditions
          </label>
        </div>
        <Switch
          id="weather-conditions" 
          checked={factors.weather}
          onCheckedChange={() => handleChange('weather')}
        />
      </div>
      
      <div className="flex items-center justify-between space-x-2">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-blue-600" />
          <label htmlFor="historical-data" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Historical Performance
          </label>
        </div>
        <Switch
          id="historical-data" 
          checked={factors.historical}
          onCheckedChange={() => handleChange('historical')}
        />
      </div>
      
      <div className="flex items-center justify-between space-x-2">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-4 w-4 text-blue-600" />
          <label htmlFor="job-priority" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Job Priority
          </label>
        </div>
        <Switch
          id="job-priority" 
          checked={factors.priority}
          onCheckedChange={() => handleChange('priority')}
        />
      </div>
    </div>
  );
}
