
import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Filter, Calendar, Download, Search, Info, ExternalLink } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { userData } from './data/userData';
import { userLogsData } from './data/userLogsData';
import { User, UserLog } from './types';
import UserLogVisualization from './components/UserLogVisualization';

export default function UserLogsPage() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [logs, setLogs] = useState<UserLog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeframe, setTimeframe] = useState('all');
  const [selectedLog, setSelectedLog] = useState<UserLog | null>(null);
  
  useEffect(() => {
    if (id) {
      const foundUser = userData.find(u => u.id === parseInt(id));
      if (foundUser) {
        setUser(foundUser);
        const userLogs = userLogsData[parseInt(id)] || [];
        setLogs(userLogs);
      }
    }
  }, [id]);
  
  const filteredLogs = useMemo(() => {
    let filtered = [...logs];
    
    // Apply timeframe filter
    if (timeframe !== 'all') {
      const now = new Date();
      const timeFilterMap: Record<string, number> = {
        'today': 1,
        'week': 7,
        'month': 30
      };
      
      const daysToFilter = timeFilterMap[timeframe] || 0;
      const cutoffDate = new Date(now);
      cutoffDate.setDate(cutoffDate.getDate() - daysToFilter);
      
      filtered = filtered.filter(log => 
        new Date(log.timestamp) >= cutoffDate
      );
    }
    
    // Apply search filter if there's a search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(log => 
        log.action.toLowerCase().includes(searchLower) ||
        log.details.toLowerCase().includes(searchLower) ||
        log.ipAddress.includes(searchTerm) ||
        log.userAgent.toLowerCase().includes(searchLower)
      );
    }
    
    return filtered;
  }, [logs, searchTerm, timeframe]);
  
  const actionColorMap: Record<string, string> = {
    'Login': 'bg-tms-green-light text-tms-green',
    'Logout': 'bg-tms-gray-200 text-tms-gray-700',
    'Password Change': 'bg-tms-blue-light text-tms-blue',
    'Profile Update': 'bg-tms-blue-light text-tms-blue',
    'Permission Change': 'bg-tms-purple-light text-tms-purple',
    'Failed Login Attempt': 'bg-tms-red-light text-tms-red',
    'Export Data': 'bg-tms-gray-200 text-tms-gray-700',
    'Created Job': 'bg-tms-green-light text-tms-green',
    'Updated Carrier': 'bg-tms-blue-light text-tms-blue',
    'Viewed Customer Details': 'bg-tms-gray-200 text-tms-gray-700',
    'Generated Report': 'bg-tms-blue-light text-tms-blue',
    'Modified Settings': 'bg-tms-yellow-light text-tms-yellow'
  };
  
  if (!user) {
    return (
      <MainLayout title="User Logs">
        <div className="flex items-center justify-center h-64">
          <p className="text-tms-gray-500">User not found</p>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout title={`${user.name} - Activity Logs`}>
      <div className="animate-fade-in">
        <div className="flex items-center gap-4 mb-6">
          <Button asChild variant="outline" size="icon">
            <Link to={`/users/details/${user.id}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-tms-gray-800">User Activity Logs</h1>
            <p className="text-tms-gray-600">{user.name} - {user.email}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
          <Card className="xl:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>Activity Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <UserLogVisualization logs={logs} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-tms-gray-100 p-4 rounded-md">
                  <p className="text-sm text-tms-gray-500">Total Activities</p>
                  <p className="text-2xl font-semibold text-tms-gray-800">{logs.length}</p>
                </div>
                <div className="bg-tms-gray-100 p-4 rounded-md">
                  <p className="text-sm text-tms-gray-500">Last 24 Hours</p>
                  <p className="text-2xl font-semibold text-tms-gray-800">
                    {logs.filter(log => 
                      new Date(log.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000)
                    ).length}
                  </p>
                </div>
                <div className="bg-tms-gray-100 p-4 rounded-md">
                  <p className="text-sm text-tms-gray-500">Login Count</p>
                  <p className="text-2xl font-semibold text-tms-gray-800">
                    {logs.filter(log => log.action === 'Login').length}
                  </p>
                </div>
                <div className="bg-tms-gray-100 p-4 rounded-md">
                  <p className="text-sm text-tms-gray-500">Last Activity</p>
                  <p className="text-md font-semibold text-tms-gray-800">
                    {logs.length > 0 && new Date(logs[0].timestamp).toLocaleDateString('en-GB')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="pb-0 pt-4 px-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2">
                <CardTitle>Activity Log</CardTitle>
                <Badge className="ml-2">{filteredLogs.length} records</Badge>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Tabs 
                  value={timeframe} 
                  onValueChange={setTimeframe}
                  className="w-full sm:w-auto"
                >
                  <TabsList className="grid grid-cols-4 h-9">
                    <TabsTrigger value="all" className="text-xs px-2">All Time</TabsTrigger>
                    <TabsTrigger value="today" className="text-xs px-2">Today</TabsTrigger>
                    <TabsTrigger value="week" className="text-xs px-2">Week</TabsTrigger>
                    <TabsTrigger value="month" className="text-xs px-2">Month</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="h-9 hidden sm:flex">
                    <Calendar className="h-4 w-4 mr-2" />
                    Custom Range
                  </Button>
                  <Button variant="outline" size="sm" className="h-9">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="mb-4 relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tms-gray-500" />
              <Input
                placeholder="Search logs..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="rounded-md border overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">Timestamp</TableHead>
                      <TableHead className="w-[140px]">Action</TableHead>
                      <TableHead className="hidden md:table-cell">Details</TableHead>
                      <TableHead className="hidden lg:table-cell w-[140px]">IP Address</TableHead>
                      <TableHead className="hidden lg:table-cell">User Agent</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.length > 0 ? (
                      filteredLogs.map((log) => (
                        <TableRow 
                          key={log.id} 
                          className="hover:bg-tms-gray-100"
                          onClick={() => setSelectedLog(log)}
                        >
                          <TableCell className="font-mono text-xs">
                            {new Date(log.timestamp).toLocaleString('en-GB', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit'
                            })}
                          </TableCell>
                          <TableCell>
                            <Badge className={actionColorMap[log.action] || 'bg-tms-gray-200 text-tms-gray-700'}>
                              {log.action}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {log.details}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell font-mono text-xs">
                            {log.ipAddress}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell text-xs">
                            {log.userAgent}
                          </TableCell>
                          <TableCell>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Info className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-md">
                                  <div className="space-y-1 p-1">
                                    <div className="font-medium">Log Details</div>
                                    <div className="text-xs">
                                      <div>ID: {log.id}</div>
                                      <div>Action: {log.action}</div>
                                      <div>Details: {log.details}</div>
                                      <div>IP: {log.ipAddress}</div>
                                      <div>User Agent: {log.userAgent}</div>
                                      <div>
                                        Time: {new Date(log.timestamp).toLocaleString()}
                                      </div>
                                    </div>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-tms-gray-500">
                          No logs found matching your criteria.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            {filteredLogs.length > 0 && (
              <div className="flex justify-between items-center mt-4 text-sm text-tms-gray-500">
                <div>Showing {filteredLogs.length} of {logs.length} log entries</div>
                <div className="flex items-center gap-1">
                  <ExternalLink className="h-3 w-3" />
                  <span>View All Logs</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
