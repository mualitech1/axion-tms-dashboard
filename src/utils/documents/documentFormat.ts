
/**
 * Format document date to a human-readable format
 */
export const formatDocumentDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

/**
 * Format file size to a human-readable format
 */
export const formatFileSize = (bytes: number | string): string => {
  // Convert string to number if it's a string
  const size = typeof bytes === 'string' ? parseFloat(bytes) : bytes;
  
  if (size < 1024) {
    return size + ' B';
  } else if (size < 1048576) {
    return (size / 1024).toFixed(1) + ' KB';
  } else {
    return (size / 1048576).toFixed(1) + ' MB';
  }
};
