
import { User } from '../types';
import * as XLSX from 'xlsx';

/**
 * Converts user data to CSV format
 * @param users Array of user objects
 * @returns CSV string
 */
export const usersToCSV = (users: User[]): string => {
  // CSV header
  let csv = 'Name,Email,Role,Last Login,Status\n';
  
  // Add each user as a row
  users.forEach(user => {
    const lastLoginDate = user.lastLogin || user.lastActive || '';
    const row = [
      user.name,
      user.email,
      user.role,
      lastLoginDate,
      user.status
    ].map(field => {
      // Escape quotes and wrap in quotes if contains comma
      if (field && (field.includes(',') || field.includes('"'))) {
        return `"${field.replace(/"/g, '""')}"`;
      }
      return field;
    }).join(',');
    
    csv += row + '\n';
  });
  
  return csv;
};

/**
 * Exports user data to Excel format
 * @param users Array of user objects
 * @returns Blob containing Excel file
 */
export const usersToExcel = (users: User[]): Blob => {
  // Prepare data for Excel
  const data = users.map(user => ({
    Name: user.name,
    Email: user.email,
    Role: user.role,
    'Last Login': user.lastLogin || user.lastActive || '',
    Status: user.status
  }));
  
  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);
  
  // Create workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
  
  // Generate Excel file
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
  return new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
};

/**
 * Triggers file download
 * @param data File content
 * @param filename Filename for the downloaded file
 * @param mimeType MIME type of the file
 */
export const downloadFile = (data: string | Blob, filename: string, mimeType?: string) => {
  const blob = typeof data === 'string' ? new Blob([data], { type: mimeType || 'text/csv;charset=utf-8;' }) : data;
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
