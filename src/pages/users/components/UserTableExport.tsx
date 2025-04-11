
import { useState } from 'react';
import { User } from '../types';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Download } from 'lucide-react';
import { usersToCSV, usersToExcel, downloadFile } from '../utils/exportUtils';

interface UserTableExportProps {
  users: User[];
}

export default function UserTableExport({ users }: UserTableExportProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: 'csv' | 'excel') => {
    try {
      setIsExporting(true);
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      
      if (format === 'csv') {
        const csv = usersToCSV(users);
        downloadFile(csv, `users-export-${timestamp}.csv`);
      } else {
        const excelBlob = usersToExcel(users);
        downloadFile(excelBlob, `users-export-${timestamp}.xlsx`);
      }
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          disabled={isExporting || users.length === 0} 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1"
        >
          <Download className="w-4 h-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport('csv')}>
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('excel')}>
          Export as Excel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
