import { Document } from '@/types/customer';
import { format, isAfter, isBefore, addDays } from 'date-fns';

// Export all document utility functions from the new modularized files
export * from './documents/documentStatus';
export * from './documents/documentFormat';
export * from './documents/documentType';
export * from './documents/documentMetadata';
export * from './documents/documentVerification';
export * from './documents/documentIntegration';

// Check if a document is expired
export function isDocumentExpired(document: Document): boolean {
  if (!document.expiryDate) return false;
  
  const today = new Date();
  const expiryDate = new Date(document.expiryDate);
  
  return isBefore(expiryDate, today);
}

// Check if a document is expiring soon (within 30 days)
export function isDocumentExpiringSoon(document: Document): boolean {
  if (!document.expiryDate) return false;
  
  const today = new Date();
  const expiryDate = new Date(document.expiryDate);
  const thirtyDaysFromNow = addDays(today, 30);
  
  return isBefore(expiryDate, thirtyDaysFromNow) && isAfter(expiryDate, today);
}

// Format file size to human-readable format
export function formatFileSize(size: string | number): string {
  const numSize = typeof size === 'string' ? parseInt(size) : size;
  
  if (numSize < 1024) {
    return `${numSize} B`;
  } else if (numSize < 1024 * 1024) {
    return `${(numSize / 1024).toFixed(1)} KB`;
  } else {
    return `${(numSize / (1024 * 1024)).toFixed(1)} MB`;
  }
}

// Format document dates
export function formatDocumentDate(dateStr?: string): string {
  if (!dateStr) return 'N/A';
  
  try {
    const date = new Date(dateStr);
    return format(date, 'dd MMM yyyy');
  } catch (e) {
    return 'Invalid date';
  }
}

// Get document status based on its properties
export function getDocumentStatus(document: Document): { label: string; variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'success' | 'warning' } {
  if (document.verificationStatus === 'rejected') {
    return { label: 'Rejected', variant: 'destructive' };
  }
  
  if (isDocumentExpired(document)) {
    return { label: 'Expired', variant: 'destructive' };
  }
  
  if (isDocumentExpiringSoon(document)) {
    return { label: 'Expiring Soon', variant: 'warning' };
  }
  
  if (document.verificationStatus === 'verified') {
    return { label: 'Verified', variant: 'success' };
  }
  
  if (document.verificationStatus === 'pending') {
    return { label: 'Pending Verification', variant: 'secondary' };
  }
  
  return { label: 'Active', variant: 'default' };
}

// Get file type from file path
export function getFileTypeFromPath(path: string): string {
  const extension = path.split('.').pop()?.toLowerCase() || '';
  
  switch (extension) {
    case 'pdf':
      return 'PDF';
    case 'doc':
    case 'docx':
      return 'Word';
    case 'xls':
    case 'xlsx':
      return 'Excel';
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return 'Image';
    default:
      return 'Unknown';
  }
}

