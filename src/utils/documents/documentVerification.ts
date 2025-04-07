
import { Document } from '@/types/customer';

/**
 * Document verification statuses
 */
export enum VerificationStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected'
}

/**
 * Check if all required documents are verified
 */
export const areAllDocumentsVerified = (documents: Document[]): boolean => {
  const requiredDocumentTypes = ['contract', 'terms', 'insurance', 'license'];
  
  // Check if all required document types exist and are verified
  return requiredDocumentTypes.every(type => 
    documents.some(doc => 
      doc.type === type && 
      doc.verificationStatus === VerificationStatus.VERIFIED
    )
  );
};

/**
 * Get required document types for carrier registration
 */
export const getRequiredDocumentTypes = (): Array<{
  type: Document['type'];
  label: string;
  description: string;
}> => {
  return [
    {
      type: 'insurance',
      label: 'Goods In Transit (GIT) Policy',
      description: 'Valid insurance policy covering transportation of goods'
    },
    {
      type: 'license',
      label: 'Operator\'s Licence',
      description: 'Valid operator license issued by relevant authority'
    },
    {
      type: 'insurance',
      label: 'Motor or Fleet Insurance',
      description: 'Insurance policy covering all vehicles in operation'
    },
    {
      type: 'terms',
      label: 'Terms & Conditions',
      description: 'Signed terms and conditions document'
    }
  ];
};

/**
 * Check document verification status
 */
export const getDocumentVerificationLabel = (status: VerificationStatus | undefined): {
  label: string;
  variant: 'default' | 'outline' | 'destructive' | 'secondary';
} => {
  switch (status) {
    case VerificationStatus.VERIFIED:
      return { label: 'Verified', variant: 'default' };
    case VerificationStatus.REJECTED:
      return { label: 'Rejected', variant: 'destructive' };
    case VerificationStatus.PENDING:
    default:
      return { label: 'Pending Verification', variant: 'secondary' };
  }
};
