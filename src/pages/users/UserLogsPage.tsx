
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { ArrowLeft, Lock, FileText, AlertTriangle, CheckCircle, User, Key, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserLog } from '../types';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { AuditLogEntry, auditService } from '@/services/audit-service';

export default function UserLogsPage() {
  const { id } = useParams();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [activeTab, setActiveTab] = useState('security');
  
  useEffect(() => {
    const fetchUserAndLogs = async () => {
      setLoading(true);
      try {
        // In a real app, we would fetch the user from the database
        // For demo, we're using mock data
        setUser({
          id: parseInt(id as string),
          name: 'John Smith',
          email: 'john.smith@example.com',
          role: 'Operations Manager',
          department: 'Operations'
        });
        
        // Fetch security logs from audit service
        if (id) {
          const logs = await auditService.getAuditLogs({
            userId: id,
            limit: 50
          });
          setAuditLogs(logs);
        }
      } catch (error) {
        console.error('Error fetching user logs:', error);
        toast({
          title: 'Error',
          description: 'Could not fetch user logs',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserAndLogs();
  }, [id, toast]);
  
  // Get icon based on the action type
  const getActionIcon = (actionType: string) => {
    if (actionType.includes('login') || actionType.includes('signin')) return <User className="h-4 w-4 text-blue-500" />;
    if (actionType.includes('permission')) return <Key className="h-4 w-4 text-purple-500" />;
    if (actionType.includes('compliance')) return <FileText className="h-4 w-4 text-green-500" />;
    if (actionType.includes('fail') || actionType.includes('error')) return <AlertTriangle className="h-4 w-4 text-red-500" />;
    if (actionType.includes('success')) return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (actionType.includes('security')) return <Lock className="h-4 w-4 text-amber-500" />;
    return <Shield className="h-4 w-4 text-gray-500" />;
  };
  
  return (
    <MainLayout title="User Logs">
      <div className="flex flex-col space-y-6 py-6">
        <div className="flex items-center mb-4">
          <Link to="/users" className="text-blue-600 hover:text-blue-800 mr-2">
            <ArrowLeft className="h-4 w-4 inline" /> Back to Users
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        ) : (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div>
                    User Logs for {user?.name}
                    <span className="text-sm font-normal text-gray-500 ml-2">
                      ({user?.email})
                    </span>
                  </div>
                  <Button size="sm" variant="outline">
                    <Shield className="h-4 w-4 mr-1" />
                    Export Logs
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="security" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="security">Security Logs</TabsTrigger>
                    <TabsTrigger value="activity">Activity Logs</TabsTrigger>
                    <TabsTrigger value="compliance">Compliance</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="security" className="space-y-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[180px]">Timestamp</TableHead>
                          <TableHead>Action</TableHead>
                          <TableHead>Entity Type</TableHead>
                          <TableHead>IP Address</TableHead>
                          <TableHead>Details</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {auditLogs.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                              No security logs found for this user
                            </TableCell>
                          </TableRow>
                        ) : (
                          auditLogs.map((log) => (
                            <TableRow key={log.id}>
                              <TableCell className="font-mono text-xs">
                                {log.createdAt ? format(new Date(log.createdAt), 'yyyy-MM-dd HH:mm:ss') : '-'}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {getActionIcon(log.actionType)}
                                  <span>{log.actionType.replace(/_/g, ' ')}</span>
                                </div>
                              </TableCell>
                              <TableCell>{log.entityType}</TableCell>
                              <TableCell className="font-mono text-xs">
                                {log.ipAddress || '-'}
                              </TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm">
                                  View Details
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TabsContent>
                  
                  <TabsContent value="activity">
                    <div className="text-center py-8 text-gray-500">
                      <Shield className="h-10 w-10 mx-auto mb-2 opacity-50" />
                      <p>Activity logging functionality is coming soon</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="compliance">
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="h-10 w-10 mx-auto mb-2 opacity-50" />
                      <p>Compliance logging functionality is coming soon</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </MainLayout>
  );
}
