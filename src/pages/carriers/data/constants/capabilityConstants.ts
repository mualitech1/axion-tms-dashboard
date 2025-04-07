
import { Truck, Thermometer, AlertTriangle, Package, Boxes, Globe } from 'lucide-react';
import React from 'react';

export const capabilityIcons: Record<string, React.ReactNode> = {
  'curtain-side': <Truck size={16} />,
  'temperature-controlled': <Thermometer size={16} />,
  'adr': <AlertTriangle size={16} />,
  'container': <Package size={16} />,
  'traction-only': <Truck size={16} />,
  'rigid': <Boxes size={16} />,
  'eu-transport': <Globe size={16} />,
  'deep-sea': <Globe size={16} />
};

export const capabilityLabels: Record<string, string> = {
  'curtain-side': 'Curtain-side',
  'temperature-controlled': 'Temperature Controlled',
  'adr': 'ADR (Hazardous Goods)',
  'container': 'Container Transport',
  'traction-only': 'Traction Only',
  'rigid': 'Rigid Vehicles',
  'eu-transport': 'EU Transport',
  'deep-sea': 'Deep-Sea Capabilities'
};
