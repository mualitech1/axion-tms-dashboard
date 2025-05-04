
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { UserLog } from './types';
import { format } from 'date-fns';
import { Filter, Search, ArrowLeft, RefreshCw } from 'lucide-react';

export default function UserLogsPage() {
  const { id } = useParams<{ id: string }>();
  const [logs, setLogs] = useState<UserLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Mock logs data
  useEffect(() => {
    // In a real app, this would fetch from an API
    setLoading(true);
    setTimeout(() => {
      const mockLogs: UserLog[] = [
        {
          id: '1',
          timestamp: new Date().toISOString(),
          action: 'login_success',
          details: 'Successful login via password',
          ipAddress: '192.168.1.1',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/96.0.4664.110'
        },
        {
          id: '2',
          timestamp: new Date(Date.now() - 1000*60*60).toISOString(), // 1 hour ago
          action: 'profile_update',
          details: 'Updated profile information',
          ipAddress: '192.168.1.1',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/96.0.4664.110'
        },
        {
          id: '3',
          timestamp: new Date(Date.now() - 1000*60*60*24).toISOString(), // 1 day ago
          action: 'permission_granted',
          details: 'Granted "view_finance" permission',
          ipAddress: '192.168.1.1',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/96.0.4664.110'
        }
      ];
      setLogs(mockLogs);
      setLoading(false);
    }, 1000);
  }, [id]);

  // Filter logs based on type and search term
  const filteredLogs = logs.filter(log => {
    const matchesFilter = filterType === 'all' || log.action.includes(filterType);
    const matchesSearch = 
      searchTerm === '' || 
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.details && log.details.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <MainLayout title="User Activity Logs">
      <div className="container py-6">
        <Button variant="outline" size="sm" className="mb-4" onClick={() => window.history.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to User
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle>User Activity Logs</CardTitle>
            <CardDescription>
              View security events and activity history for user ID: {id}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input 
                    type="search"
                    placeholder="Search logs..." 
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full md:w-64">
                <Select
                  value={filterType}
                  onValueChange={setFilterType}
                >
                  <SelectTrigger className="w-full">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Activities</SelectItem>
                    <SelectItem value="login">Login Events</SelectItem>
                    <SelectItem value="permission">Permission Changes</SelectItem>
                    <SelectItem value="profile">Profile Updates</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" onClick={() => window.location.reload()}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">Timestamp</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>IP Address</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                          No log entries found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredLogs.map(log => (
                        <TableRow key={log.id}>
                          <TableCell className="font-mono text-xs">
                            {format(new Date(log.timestamp), 'MMM d, yyyy HH:mm:ss')}
                          </TableCell>
                          <TableCell>
                            {log.action.replace(/_/g, ' ')}
                          </TableCell>
                          <TableCell>{log.details || '-'}</TableCell>
                          <TableCell>{log.ipAddress || '-'}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
