
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
  if (typeof size === 'string') return size;
  
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
