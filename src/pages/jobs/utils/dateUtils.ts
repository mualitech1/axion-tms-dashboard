
/**
 * Helper functions for date manipulation and formatting
 */

// Helper function to get today's date in ISO format for demo jobs
export const getTodayISOString = () => {
  const today = new Date();
  today.setHours(9, 0, 0, 0); // Set to 9:00 AM
  return today.toISOString();
};

// Helper function to get today's date plus X hours in ISO format
export const getTimeToday = (hours: number) => {
  const today = new Date();
  today.setHours(hours, 0, 0, 0);
  return today.toISOString();
};

// Format the time from the date property
export const getTimeFromDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
};
