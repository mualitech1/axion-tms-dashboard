
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  Key, 
  Lock, 
  Search, 
  Shield, 
  User, 
  X, 
  RefreshCw 
} from "lucide-react";
import { AuditLogEntry, auditService } from "@/services/audit-service";
import { format } from 'date-fns';

export default function SecurityAuditLogs() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionTypeFilter, setActionTypeFilter] = useState<string>('');
  const [entityTypeFilter, setEntityTypeFilter] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  
  const fetchLogs = async () => {
    setLoading(true);
    try {
      const filters: any = { limit: 100 };
      
      if (actionTypeFilter) filters.actionType = actionTypeFilter;
      if (entityTypeFilter) filters.entityType = entityTypeFilter;
      if (startDate) filters.fromDate = startDate.toISOString();
      if (endDate) filters.toDate = endDate.toISOString();
      
      const auditLogs = await auditService.getAuditLogs(filters);
      setLogs(auditLogs);
    } catch (error) {
      console.error("Failed to fetch audit logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const getActionIcon = (actionType: string) => {
    if (actionType.includes('login') || actionType.includes('signin')) return <User className="h-4 w-4 text-blue-500" />;
    if (actionType.includes('permission')) return <Key className="h-4 w-4 text-purple-500" />;
    if (actionType.includes('compliance')) return <FileText className="h-4 w-4 text-green-500" />;
    if (actionType.includes('fail') || actionType.includes('error')) return <AlertTriangle className="h-4 w-4 text-red-500" />;
    if (actionType.includes('success')) return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (actionType.includes('security')) return <Lock className="h-4 w-4 text-amber-500" />;
    return <Shield className="h-4 w-4 text-gray-500" />;
  };

  const actionTypes = [
    'login_success',
    'login_failed',
    'permission_granted_to_user',
    'permission_revoked_from_user',
    'permission_assigned_to_role',
    'compliance_document_created',
    'compliance_document_updated',
    'compliance_document_approved',
    'compliance_document_acknowledged',
    'security_setting_changed'
  ];

  const entityTypes = [
    'user',
    'permissions',
    'role_permissions',
    'user_permissions',
    'compliance_documents',
    'compliance_acknowledgements'
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" /> Enhanced Security Audit Logs
        </CardTitle>
        <CardDescription>
          Comprehensive logs of all security-related actions and system events
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Select
                value={actionTypeFilter}
                onValueChange={setActionTypeFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Actions</SelectItem>
                  {actionTypes.map(type => (
                    <SelectItem key={type} value={type}>{type.replace(/_/g, ' ')}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select
                value={entityTypeFilter}
                onValueChange={setEntityTypeFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by entity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Entities</SelectItem>
                  {entityTypes.map(type => (
                    <SelectItem key={type} value={type}>{type.replace(/_/g, ' ')}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <DatePicker
                selected={startDate}
                onSelect={setStartDate}
                placeholderText="Start date"
              />
            </div>
            
            <div>
              <DatePicker
                selected={endDate}
                onSelect={setEndDate}
                placeholderText="End date"
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Displaying {logs.length} event logs
            </div>
            <Button variant="outline" onClick={fetchLogs} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Shield className="h-10 w-10 mx-auto mb-2 opacity-50" />
              <p>No security logs available with current filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Time</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Entity</TableHead>
                    <TableHead>User ID</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="whitespace-nowrap">
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
                        {log.userId ? log.userId.substring(0, 8) + '...' : 'System'}
                      </TableCell>
                      <TableCell>
                        {log.entityId ? `ID: ${log.entityId.substring(0, 8)}...` : '-'}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {log.ipAddress || 'Unknown'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
