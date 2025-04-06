
import { Document } from '@/types/customer';

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
 * Get allowed file types for document upload
 */
export const getAllowedFileTypes = (): string => {
  return '.pdf,.doc,.docx,.jpg,.jpeg,.png,.txt,.xls,.xlsx';
};
