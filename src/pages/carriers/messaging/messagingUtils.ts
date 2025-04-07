
import { Message, MessageGroup, Carrier } from '../data/types/carrierTypes';

export function formatMessageDate(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

export function filterMessagesByCarrier(messages: Message[], carrierId: number): Message[] {
  return messages.filter(message => message.recipientIds.includes(carrierId));
}

export function getCarriersInGroup(carriers: Carrier[], group: MessageGroup): Carrier[] {
  return carriers.filter(carrier => group.carrierIds.includes(carrier.id));
}

export function searchCarriers(carriers: Carrier[], searchTerm: string): Carrier[] {
  const term = searchTerm.toLowerCase().trim();
  return carriers.filter(carrier => 
    carrier.name.toLowerCase().includes(term) || 
    carrier.region.toLowerCase().includes(term)
  );
}

export function createMessageId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}
