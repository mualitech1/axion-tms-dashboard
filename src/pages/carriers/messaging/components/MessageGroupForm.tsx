
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { CarrierMessageGroup } from '../../data/types/carrierTypes';
import { 
  fleetTypeOptions, 
  statusOptions, 
  capabilityOptions, 
  complianceStatusOptions 
} from '../../data/constants/carrierFilterConstants';

interface MessageGroupFormProps {
  onSubmit: (group: CarrierMessageGroup) => void;
}

export default function MessageGroupForm({ onSubmit }: MessageGroupFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [fleetType, setFleetType] = useState('');
  const [complianceStatus, setComplianceStatus] = useState('');
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  // Mock regions data - in a real app, this would be fetched from the API
  const regions = [
    { id: "london", label: "London" },
    { id: "manchester", label: "Manchester" },
    { id: "birmingham", label: "Birmingham" },
    { id: "glasgow", label: "Glasgow" },
    { id: "liverpool", label: "Liverpool" },
    { id: "belfast", label: "Belfast" },
    { id: "cardiff", label: "Cardiff" },
    { id: "edinburgh", label: "Edinburgh" },
    { id: "newcastle", label: "Newcastle" },
    { id: "bristol", label: "Bristol" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      return;
    }
    
    const newGroup: CarrierMessageGroup = {
      id: `g${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      createdAt: new Date().toISOString(),
      filters: {
        status,
        fleetType,
        complianceStatus,
        capabilities: selectedCapabilities,
        regions: selectedRegions
      }
    };
    
    onSubmit(newGroup);
  };

  const toggleCapability = (capability: string) => {
    setSelectedCapabilities(prev => 
      prev.includes(capability)
        ? prev.filter(c => c !== capability)
        : [...prev, capability]
    );
  };

  const toggleRegion = (region: string) => {
    setSelectedRegions(prev => 
      prev.includes(region)
        ? prev.filter(r => r !== region)
        : [...prev, region]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Group Name <span className="text-red-500">*</span></Label>
        <Input 
          id="name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter group name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter group description (optional)"
          rows={3}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Filter Criteria</h3>
        <p className="text-xs text-muted-foreground">
          Select one or more criteria to define which carriers will be included in this group.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="status">Carrier Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Any status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any status</SelectItem>
                {statusOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fleet-type">Fleet Type</Label>
            <Select value={fleetType} onValueChange={setFleetType}>
              <SelectTrigger id="fleet-type">
                <SelectValue placeholder="Any fleet type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any fleet type</SelectItem>
                {fleetTypeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="compliance">Compliance Status</Label>
            <Select value={complianceStatus} onValueChange={setComplianceStatus}>
              <SelectTrigger id="compliance">
                <SelectValue placeholder="Any compliance status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any compliance status</SelectItem>
                {complianceStatusOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Capabilities</Label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            {capabilityOptions.map(capability => (
              <div key={capability.value} className="flex items-center space-x-2">
                <Checkbox 
                  id={`capability-${capability.value}`}
                  checked={selectedCapabilities.includes(capability.value)}
                  onCheckedChange={() => toggleCapability(capability.value)}
                />
                <label 
                  htmlFor={`capability-${capability.value}`}
                  className="text-sm"
                >
                  {capability.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Regions</Label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            {regions.map(region => (
              <div key={region.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={`region-${region.id}`}
                  checked={selectedRegions.includes(region.id)}
                  onCheckedChange={() => toggleRegion(region.id)}
                />
                <label 
                  htmlFor={`region-${region.id}`}
                  className="text-sm"
                >
                  {region.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit" disabled={!name.trim()}>
          Create Group
        </Button>
      </div>
    </form>
  );
}
