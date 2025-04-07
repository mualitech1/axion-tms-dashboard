
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
 * Get status of a document
 */
export const getDocumentStatus = (doc: Document): {
  label: string;
  variant: 'destructive' | 'secondary' | 'outline' | 'default';
} => {
  if (isDocumentExpired(doc)) {
    return { label: 'Expired', variant: 'destructive' };
  }
  if (isDocumentExpiringSoon(doc)) {
    return { label: 'Expiring Soon', variant: 'secondary' };
  }
  return { label: 'Valid', variant: 'outline' };
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
