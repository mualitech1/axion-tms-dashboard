import { 
  ToggleGroup, 
  ToggleGroupItem 
} from "@/components/ui/toggle-group";
import { 
  Truck, 
  Thermometer, 
  AlertTriangle, 
  Package, 
  Globe, 
  Boxes
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export type CarrierCapability = 
  | "curtain-side"
  | "temperature-controlled"
  | "adr"
  | "container"
  | "traction-only"
  | "rigid"
  | "eu-transport"
  | "deep-sea";

interface CapabilityFilterProps {
  selectedCapabilities: CarrierCapability[];
  onChange: (capabilities: CarrierCapability[]) => void;
}

// Map capabilities to their display names and icons
const capabilityOptions: Array<{
  value: CarrierCapability;
  label: string;
  icon: React.ReactNode;
}> = [
  { 
    value: "curtain-side", 
    label: "Curtain-side", 
    icon: <Truck className="h-4 w-4" /> 
  },
  { 
    value: "temperature-controlled", 
    label: "Temperature Controlled", 
    icon: <Thermometer className="h-4 w-4" /> 
  },
  { 
    value: "adr", 
    label: "ADR", 
    icon: <AlertTriangle className="h-4 w-4" /> 
  },
  { 
    value: "container", 
    label: "Container", 
    icon: <Package className="h-4 w-4" /> 
  },
  { 
    value: "traction-only", 
    label: "Traction Only", 
    icon: <Truck className="h-4 w-4" /> 
  },
  { 
    value: "rigid", 
    label: "Rigid", 
    icon: <Boxes className="h-4 w-4" /> 
  },
  { 
    value: "eu-transport", 
    label: "EU Transport", 
    icon: <Globe className="h-4 w-4" /> 
  },
  { 
    value: "deep-sea", 
    label: "Deep-Sea", 
    icon: <Globe className="h-4 w-4" /> 
  }
];

export function CapabilityFilter({ selectedCapabilities, onChange }: CapabilityFilterProps) {
  const [expanded, setExpanded] = useState(false);
  
  const toggleCapability = (value: string) => {
    const capability = value as CarrierCapability;
    if (selectedCapabilities.includes(capability)) {
      onChange(selectedCapabilities.filter(cap => cap !== capability));
    } else {
      onChange([...selectedCapabilities, capability]);
    }
  };

  const clearAll = () => {
    onChange([]);
  };

  // Show only first 3 options when not expanded
  const visibleOptions = expanded 
    ? capabilityOptions 
    : capabilityOptions.slice(0, 3);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Capabilities</h3>
        {selectedCapabilities.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 px-2 text-xs"
            onClick={clearAll}
          >
            Clear all
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {visibleOptions.map((option) => (
          <Button
            key={option.value}
            variant={selectedCapabilities.includes(option.value) ? "default" : "outline"}
            size="sm"
            className="h-8 gap-1"
            onClick={() => toggleCapability(option.value)}
          >
            {option.icon}
            <span className="hidden sm:inline">{option.label}</span>
          </Button>
        ))}
        
        {!expanded && capabilityOptions.length > 3 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8"
            onClick={() => setExpanded(true)}
          >
            +{capabilityOptions.length - 3} more
          </Button>
        )}
        
        {expanded && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8"
            onClick={() => setExpanded(false)}
          >
            Show less
          </Button>
        )}
      </div>
    </div>
  );
}
