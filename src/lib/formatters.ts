/**
 * Formats a number or string as currency
 * @param value Number or string to format as currency
 * @param currency Currency code (default: USD)
 * @param locale Locale string (default: en-US)
 * @returns Formatted currency string
 */
export const formatCurrency = (
  value: number | string,
  currency = 'USD',
  locale = 'en-US'
): string => {
  // Convert string to number if needed
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  // Format the number as currency
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numValue);
};

/**
 * Formats a date string or Date object into a readable format
 * @param date Date string or Date object
 * @param format Format style (default: 'medium')
 * @param locale Locale string (default: en-US)
 * @returns Formatted date string
 */
export const formatDate = (
  date: string | Date | null | undefined, 
  format: 'short' | 'medium' | 'long' = 'medium',
  locale = 'en-US'
): string => {
  if (!date) return 'N/A';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Check if date is valid
  if (isNaN(dateObj.getTime())) return 'Invalid date';
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: format === 'short' ? 'short' : format === 'medium' ? 'short' : 'long',
    day: 'numeric',
    hour: format !== 'short' ? 'numeric' : undefined,
    minute: format !== 'short' ? 'numeric' : undefined,
  };
  
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
};

/**
 * Formats a phone number into a readable format
 * @param phone Phone number string
 * @returns Formatted phone number string
 */
export const formatPhoneNumber = (phone: string): string => {
  // Strip all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format based on length
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 11)}`;
  }
  
  // Return original if cannot format
  return phone;
}; 