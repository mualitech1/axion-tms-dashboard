
import { Document } from '@/types/customer';

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
