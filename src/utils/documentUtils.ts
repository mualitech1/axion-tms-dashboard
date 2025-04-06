
import { Document } from '@/types/customer';

/**
 * Checks if a document is expiring soon (within the specified number of days)
 */
export const isDocumentExpiringSoon = (
  doc: Document, 
  daysThreshold: number = 30
): boolean => {
  if (!doc.expiryDate) return false;
  
  const expiry = new Date(doc.expiryDate);
  const today = new Date();
  const thresholdDate = new Date();
  thresholdDate.setDate(today.getDate() + daysThreshold);
  
  return expiry <= thresholdDate && expiry >= today;
};

/**
 * Checks if a document is expired
 */
export const isDocumentExpired = (doc: Document): boolean => {
  if (!doc.expiryDate) return false;
  return new Date(doc.expiryDate) < new Date();
};

/**
 * Returns a formatted display size for a file
 */
export const formatFileSize = (size: string | number): string => {
  if (typeof size === 'string') {
    // Try to parse the string as a number if it looks numeric
    const parsed = parseFloat(size);
    if (!isNaN(parsed)) {
      size = parsed;
    } else {
      return size;
    }
  }
  
  const bytes = Number(size);
  if (isNaN(bytes)) return '0 Bytes';
  
  const units = ['Bytes', 'KB', 'MB', 'GB'];
  let i = 0;
  let formattedSize = bytes;
  
  while (formattedSize >= 1024 && i < units.length - 1) {
    formattedSize /= 1024;
    i++;
  }
  
  return `${formattedSize.toFixed(1)} ${units[i]}`;
};

/**
 * Gets file type from file path
 */
export const getFileTypeFromPath = (path: string): string => {
  const extension = path.split('.').pop()?.toLowerCase() || '';
  
  switch (extension) {
    case 'pdf':
      return 'PDF Document';
    case 'doc':
    case 'docx':
      return 'Word Document';
    case 'xls':
    case 'xlsx':
      return 'Excel Spreadsheet';
    case 'jpg':
    case 'jpeg':
    case 'png':
      return 'Image';
    default:
      return 'Document';
  }
};

/**
 * Get status of a document
 */
export const getDocumentStatus = (doc: Document): {
  label: string;
  variant: 'destructive' | 'warning' | 'outline' | 'default';
} => {
  if (isDocumentExpired(doc)) {
    return { label: 'Expired', variant: 'destructive' };
  }
  if (isDocumentExpiringSoon(doc)) {
    return { label: 'Expiring Soon', variant: 'warning' };
  }
  return { label: 'Valid', variant: 'outline' };
};

/**
 * Format date to localized string
 */
export const formatDocumentDate = (dateString: string | null | undefined): string => {
  if (!dateString) return 'No date';
  
  return new Date(dateString).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Get document icon based on file type
 */
export const getDocumentIcon = (doc: Document): string => {
  const extension = doc.filePath.split('.').pop()?.toLowerCase() || '';
  
  switch (extension) {
    case 'pdf':
      return 'file-text';
    case 'doc':
    case 'docx':
      return 'file-text';
    case 'xls':
    case 'xlsx':
      return 'file-spreadsheet';
    case 'jpg':
    case 'jpeg':
    case 'png':
      return 'image';
    default:
      return 'file';
  }
};

/**
 * Count documents by status
 */
export const countDocumentsByStatus = (documents: Document[]): {
  valid: number;
  expiringSoon: number;
  expired: number;
} => {
  return documents.reduce(
    (counts, doc) => {
      if (isDocumentExpired(doc)) {
        counts.expired += 1;
      } else if (isDocumentExpiringSoon(doc)) {
        counts.expiringSoon += 1;
      } else {
        counts.valid += 1;
      }
      return counts;
    },
    { valid: 0, expiringSoon: 0, expired: 0 }
  );
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

/**
 * Get file extension from mime type
 */
export const getExtensionFromMimeType = (mimeType: string): string => {
  switch (mimeType) {
    case 'application/pdf':
      return '.pdf';
    case 'application/msword':
      return '.doc';
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return '.docx';
    case 'application/vnd.ms-excel':
      return '.xls';
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      return '.xlsx';
    case 'image/jpeg':
      return '.jpg';
    case 'image/png':
      return '.png';
    default:
      return '.pdf';
  }
};

/**
 * Check if the document type requires an expiry date
 */
export const typeRequiresExpiry = (type: Document['type']): boolean => {
  return ['contract', 'terms'].includes(type);
};

/**
 * Get allowed file types for document upload
 */
export const getAllowedFileTypes = (): string => {
  return '.pdf,.doc,.docx,.jpg,.jpeg,.png,.txt,.xls,.xlsx';
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
