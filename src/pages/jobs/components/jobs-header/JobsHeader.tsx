
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCcw, Calendar, MapPin, List } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface JobsHeaderProps {
  onCreateJob: () => void;
  onRefresh: () => void;
  viewMode: 'list' | 'calendar' | 'map';
  onViewModeChange: (mode: 'list' | 'calendar' | 'map') => void;
}

export function JobsHeader({ onCreateJob, onRefresh, viewMode, onViewModeChange }: JobsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-aximo-text">Jobs</h1>
        <p className="text-aximo-text-secondary">Manage and track all your transportation jobs</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && onViewModeChange(value as 'list' | 'calendar' | 'map')}>
          <ToggleGroupItem value="list" aria-label="List View">
            <List className="h-4 w-4 mr-1" />
            List
          </ToggleGroupItem>
          <ToggleGroupItem value="calendar" aria-label="Calendar View">
            <Calendar className="h-4 w-4 mr-1" />
            Calendar
          </ToggleGroupItem>
          <ToggleGroupItem value="map" aria-label="Map View">
            <MapPin className="h-4 w-4 mr-1" />
            Map
          </ToggleGroupItem>
        </ToggleGroup>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="text-aximo-text"
          >
            <RefreshCcw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
          
          <Button
            variant="default"
            size="sm"
            onClick={onCreateJob}
            className="bg-aximo-primary text-white hover:bg-aximo-primary/90"
          >
            <Plus className="h-4 w-4 mr-1" />
            New Job
          </Button>
        </div>
      </div>
    </div>
  );
}
