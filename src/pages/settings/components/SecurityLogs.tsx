
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle, Check, UserRoundX } from "lucide-react";
import { getSecurityLogs } from '@/services/security-audit';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/use-auth';

interface SecurityLog {
  timestamp: string;
  event_type: string;
  ip_address?: string;
  device_info?: string;
  details?: Record<string, any>;
}

export default function SecurityLogs() {
  const [logs, setLogs] = useState<SecurityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchLogs() {
      if (user) {
        setLoading(true);
        const securityLogs = await getSecurityLogs();
        setLogs(securityLogs);
        setLoading(false);
      }
    }
    
    fetchLogs();
  }, [user]);

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'login_success':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'login_failed':
        return <UserRoundX className="h-4 w-4 text-red-500" />;
      case 'unusual_activity':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      default:
        return <Shield className="h-4 w-4 text-blue-500" />;
    }
  };

  const getEventDescription = (log: SecurityLog) => {
    switch (log.event_type) {
      case 'login_success':
        return 'Successful login';
      case 'login_failed':
        return `Failed login attempt${log.details?.reason ? `: ${log.details.reason}` : ''}`;
      case 'password_changed':
        return 'Password was changed';
      case 'password_reset':
        return 'Password reset requested';
      case 'totp_enabled':
        return 'Two-factor authentication enabled';
      case 'totp_disabled':
        return 'Two-factor authentication disabled';
      case 'account_locked':
        return 'Account was temporarily locked';
      case 'unusual_activity':
        return `Unusual activity detected${log.details?.reason ? `: ${log.details.reason}` : ''}`;
      default:
        return `Security event: ${log.event_type}`;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" /> Security Logs
        </CardTitle>
        <CardDescription>Review recent security events for your account</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Shield className="h-10 w-10 mx-auto mb-2 opacity-50" />
            <p>No security logs available</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      IP Address
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Device
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {logs.map((log, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 mr-2">
                            {getEventIcon(log.event_type)}
                          </div>
                          <div className="text-sm text-gray-900">
                            {getEventDescription(log)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(new Date(log.timestamp), 'MMM d, yyyy HH:mm:ss')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.ip_address || 'Unknown'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                        <div className="max-w-xs truncate">
                          {log.device_info || 'Unknown'}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="text-center text-xs text-gray-500 pt-2">
              Showing the {logs.length} most recent security events
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
