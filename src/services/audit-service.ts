
import { supabase } from '@/integrations/supabase/client';
import { getErrorMessage } from '@/utils/error-handler';

export interface AuditLogEntry {
  id?: string;
  userId: string | null;
  actionType: string;
  entityType: string;
  entityId?: string;
  previousState?: Record<string, any>;
  newState?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt?: string;
  metadata?: Record<string, any>;
}

// Helper function to get client IP (in real-world this would often be server-side)
function getClientIP(): string {
  return sessionStorage.getItem('client_ip') || 'unknown';
}

// Helper function to get device info
function getDeviceInfo(): string {
  return navigator.userAgent;
}

// Helper to safely convert JSON to Record type
function safeJsonToRecord(json: any): Record<string, any> {
  if (typeof json === 'object' && json !== null) {
    return json;
  }
  if (typeof json === 'string') {
    try {
      const parsed = JSON.parse(json);
      return typeof parsed === 'object' && parsed !== null ? parsed : {};
    } catch (e) {
      return {};
    }
  }
  return {};
}

// Main audit service for recording security events and user actions
class AuditService {
  // Record an audit log entry
  async logAction(
    actionType: string,
    entityType: string,
    entityId?: string,
    previousState?: Record<string, any>,
    newState?: Record<string, any>,
    metadata?: Record<string, any>
  ): Promise<void> {
    try {
      // Get current user
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id || null;
      
      if (!userId) {
        console.warn('Attempting to log audit action without authenticated user');
      }
      
      const logEntry = {
        user_id: userId,
        action_type: actionType,
        entity_type: entityType,
        entity_id: entityId,
        previous_state: previousState,
        new_state: newState,
        ip_address: getClientIP(),
        user_agent: getDeviceInfo(),
        metadata: metadata || {},
      };
      
      // Record in the audit_logs table
      const { error } = await supabase
        .from('audit_logs')
        .insert(logEntry);
      
      if (error) {
        console.error('Failed to record audit log:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error in audit logging:', error);
      // Don't throw - audit logging should never break app functionality
    }
  }

  // Get audit logs with filtering
  async getAuditLogs(filters: {
    userId?: string;
    actionType?: string;
    entityType?: string;
    entityId?: string;
    fromDate?: string;
    toDate?: string;
    limit?: number;
    offset?: number;
  }): Promise<AuditLogEntry[]> {
    try {
      let query = supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false });
      
      // Apply filters
      if (filters.userId) {
        query = query.eq('user_id', filters.userId);
      }
      
      if (filters.actionType) {
        query = query.eq('action_type', filters.actionType);
      }
      
      if (filters.entityType) {
        query = query.eq('entity_type', filters.entityType);
      }
      
      if (filters.entityId) {
        query = query.eq('entity_id', filters.entityId);
      }
      
      if (filters.fromDate) {
        query = query.gte('created_at', filters.fromDate);
      }
      
      if (filters.toDate) {
        query = query.lte('created_at', filters.toDate);
      }
      
      // Apply pagination
      if (filters.limit) {
        query = query.limit(filters.limit);
      }
      
      if (filters.offset) {
        query = query.range(filters.offset, (filters.offset + (filters.limit || 10) - 1));
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Convert from snake_case to camelCase format with safe type conversions
      return data.map(log => ({
        id: log.id,
        userId: log.user_id,
        actionType: log.action_type,
        entityType: log.entity_type,
        entityId: log.entity_id,
        previousState: safeJsonToRecord(log.previous_state),
        newState: safeJsonToRecord(log.new_state),
        ipAddress: log.ip_address,
        userAgent: log.user_agent,
        createdAt: log.created_at,
        metadata: safeJsonToRecord(log.metadata)
      }));
    } catch (error) {
      console.error('Failed to fetch audit logs:', error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Get audit log statistics
  async getAuditStats(timeframe: 'day' | 'week' | 'month' = 'day'): Promise<Record<string, number>> {
    try {
      let fromDate: string;
      const now = new Date();
      
      // Calculate date range based on timeframe
      switch (timeframe) {
        case 'week':
          fromDate = new Date(now.setDate(now.getDate() - 7)).toISOString();
          break;
        case 'month':
          fromDate = new Date(now.setMonth(now.getMonth() - 1)).toISOString();
          break;
        default: // day
          fromDate = new Date(now.setDate(now.getDate() - 1)).toISOString();
      }
      
      // Get logs in the timeframe
      const { data, error } = await supabase
        .from('audit_logs')
        .select('action_type')
        .gte('created_at', fromDate);
      
      if (error) throw error;
      
      // Count actions by type
      const stats: Record<string, number> = {};
      data.forEach(log => {
        stats[log.action_type] = (stats[log.action_type] || 0) + 1;
      });
      
      return stats;
    } catch (error) {
      console.error('Failed to get audit statistics:', error);
      throw new Error(getErrorMessage(error));
    }
  }
}

export const auditService = new AuditService();
