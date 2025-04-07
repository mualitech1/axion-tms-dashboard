
export interface Carrier {
  id: number;
  name: string;
  region: string;
  fleet: string;
  status: 'Active' | 'Inactive' | 'Issue';
  favorite: boolean;
  complianceStatus: string;
  insuranceExpiry: string;
  licenseExpiry: string;
  capabilities: string[];
  operatingRegions?: string[];
  lastMessage?: string;
  lastMessageDate?: string;
  unreadMessages?: number;
}

export interface Message {
  id: string;
  senderId: number;
  senderName: string;
  recipientIds: number[];
  recipientNames: string[];
  subject: string;
  content: string;
  timestamp: string;
  read: boolean;
  isGroupMessage: boolean;
}

export interface MessageGroup {
  id: string;
  name: string;
  carrierIds: number[];
  description?: string;
  createdAt: string;
}

export interface CarrierMessageGroup {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  filters: {
    status?: string;
    fleetType?: string;
    complianceStatus?: string;
    capabilities: string[];
    regions: string[];
  };
}

export interface BroadcastMessage {
  id: string;
  subject: string;
  content: string;
  sentAt: string;
  recipientGroupId: string;
  recipientGroupName: string;
  recipientCount: number;
  readCount: number;
}
