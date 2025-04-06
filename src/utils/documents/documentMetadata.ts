
import { Document } from '@/types/customer';

/**
 * Check if the document type requires an expiry date
 */
export const typeRequiresExpiry = (type: Document['type']): boolean => {
  return ['contract', 'terms'].includes(type);
};

/**
 * Get display name for document type
 */
export const getDocumentTypeDisplayName = (type: Document['type']): string => {
  const typeMap: Record<Document['type'], string> = {
    'contract': 'Contract',
    'terms': 'Terms & Conditions',
    'rate_card': 'Rate Card',
    'invoice': 'Invoice',
    'pod': 'Proof of Delivery',
    'other': 'Other'
  };
  
  return typeMap[type] || 'Document';
};

/**
 * Generate mock document filePath based on name and type
 */
export const generateDocumentFilePath = (name: string, type: Document['type']): string => {
  let extension = 'pdf';
  
  switch (type) {
    case 'contract':
    case 'terms':
      extension = 'pdf';
      break;
    case 'rate_card':
      extension = 'xlsx';
      break;
    case 'invoice':
      extension = 'pdf';
      break;
    case 'pod':
      extension = 'jpg';
      break;
    default:
      extension = 'pdf';
  }
  
  return `/documents/${name.toLowerCase().replace(/\s+/g, '-')}.${extension}`;
};
