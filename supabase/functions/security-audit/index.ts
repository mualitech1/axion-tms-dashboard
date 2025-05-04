
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Create Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseKey);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get('action');
    
    if (req.method === 'GET' && action === 'stats') {
      // Get security audit log statistics
      return await getAuditStats(req);
    } else if (req.method === 'POST' && action === 'validate') {
      // Validate security configuration
      return await validateSecurity(req);
    } else if (req.method === 'GET') {
      // Default: Get security audit logs with filtering
      return await getAuditLogs(req);
    } else if (req.method === 'POST') {
      // Log a security event
      return await logSecurityEvent(req);
    } else {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error processing request:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Handler to get security audit logs with filtering
async function getAuditLogs(req: Request) {
  const url = new URL(req.url);
  
  // Parse query parameters for filtering
  const userId = url.searchParams.get('user_id');
  const actionType = url.searchParams.get('action_type');
  const entityType = url.searchParams.get('entity_type');
  const fromDate = url.searchParams.get('from_date');
  const toDate = url.searchParams.get('to_date');
  const limit = parseInt(url.searchParams.get('limit') || '50');
  const offset = parseInt(url.searchParams.get('offset') || '0');
  
  // Build the query
  let query = supabase
    .from('audit_logs')
    .select('*')
    .order('created_at', { ascending: false });
  
  // Apply filters
  if (userId) query = query.eq('user_id', userId);
  if (actionType) query = query.eq('action_type', actionType);
  if (entityType) query = query.eq('entity_type', entityType);
  if (fromDate) query = query.gte('created_at', fromDate);
  if (toDate) query = query.lte('created_at', toDate);
  
  // Apply pagination
  query = query.range(offset, offset + limit - 1);
  
  const { data, error, count } = await query;
  
  if (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
  
  return new Response(
    JSON.stringify({ 
      logs: data,
      total: count, 
      limit, 
      offset 
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

// Handler to log security events
async function logSecurityEvent(req: Request) {
  // Parse the request body
  const body = await req.json();
  
  const {
    userId,
    actionType,
    entityType,
    entityId,
    previousState,
    newState,
    ipAddress,
    userAgent,
    metadata
  } = body;
  
  // Validate required fields
  if (!actionType || !entityType) {
    return new Response(
      JSON.stringify({ error: 'Missing required fields: actionType and entityType are required' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
  
  // Insert into audit_logs table
  const { data, error } = await supabase
    .from('audit_logs')
    .insert([{
      user_id: userId,
      action_type: actionType,
      entity_type: entityType,
      entity_id: entityId,
      previous_state: previousState,
      new_state: newState,
      ip_address: ipAddress,
      user_agent: userAgent,
      metadata: metadata || {}
    }])
    .select();
  
  if (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
  
  return new Response(
    JSON.stringify({ success: true, log: data[0] }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

// Handler to get security audit statistics
async function getAuditStats(req: Request) {
  const url = new URL(req.url);
  const timeframe = url.searchParams.get('timeframe') || 'day';
  
  // Calculate the date range
  const now = new Date();
  let fromDate = new Date();
  
  switch (timeframe) {
    case 'week':
      fromDate.setDate(now.getDate() - 7);
      break;
    case 'month':
      fromDate.setMonth(now.getMonth() - 1);
      break;
    case 'year':
      fromDate.setFullYear(now.getFullYear() - 1);
      break;
    default: // day
      fromDate.setDate(now.getDate() - 1);
  }
  
  // Query for logs in the selected timeframe
  const { data, error } = await supabase
    .from('audit_logs')
    .select('action_type, created_at')
    .gte('created_at', fromDate.toISOString());
  
  if (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
  
  // Process data to get statistics
  const stats: Record<string, number> = {};
  data.forEach(log => {
    stats[log.action_type] = (stats[log.action_type] || 0) + 1;
  });
  
  // Get stats by time period
  const timeStats: Record<string, number> = {};
  let format: string;
  
  // Format based on timeframe
  if (timeframe === 'day') {
    format = 'hour';
    for (let i = 0; i < 24; i++) {
      timeStats[i.toString()] = 0;
    }
  } else if (timeframe === 'week') {
    format = 'day';
    for (let i = 0; i < 7; i++) {
      timeStats[i.toString()] = 0;
    }
  } else if (timeframe === 'month') {
    format = 'day';
    for (let i = 1; i <= 31; i++) {
      timeStats[i.toString()] = 0;
    }
  } else { // year
    format = 'month';
    for (let i = 0; i < 12; i++) {
      timeStats[i.toString()] = 0;
    }
  }
  
  // Populate time stats
  data.forEach(log => {
    const date = new Date(log.created_at);
    let key: string;
    
    if (format === 'hour') {
      key = date.getHours().toString();
    } else if (format === 'day' && timeframe === 'week') {
      key = date.getDay().toString();
    } else if (format === 'day') {
      key = date.getDate().toString();
    } else { // month
      key = date.getMonth().toString();
    }
    
    timeStats[key] = (timeStats[key] || 0) + 1;
  });
  
  // Get most common actions
  const topActions = Object.entries(stats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([action, count]) => ({ action, count }));
  
  return new Response(
    JSON.stringify({
      total: data.length,
      byAction: stats,
      byTime: timeStats,
      topActions,
      timeframe
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

// Handler to validate security configuration
async function validateSecurity(req: Request) {
  const body = await req.json();
  const { checkType } = body;
  
  let results: Record<string, any> = {
    status: 'ok',
    issues: []
  };
  
  // Perform different checks based on the check type
  switch (checkType) {
    case 'permissions':
      // Check for users with excessive permissions
      {
        const { data, error } = await supabase.rpc('check_excessive_permissions');
        if (error) {
          results.status = 'error';
          results.issues.push({
            severity: 'error',
            message: 'Failed to check permissions',
            details: error.message
          });
        } else if (data && data.length > 0) {
          results.status = 'warning';
          results.issues.push({
            severity: 'warning',
            message: `${data.length} users have excessive permissions`,
            details: `Users with admin and other role combinations: ${data.map((u: any) => u.email).join(', ')}`
          });
        }
      }
      break;
    
    case 'compliance':
      // Check for expired compliance documents
      {
        const { data, error } = await supabase
          .from('compliance_documents')
          .select('id, title')
          .lte('expiry_date', new Date().toISOString())
          .eq('status', 'approved');
        
        if (error) {
          results.status = 'error';
          results.issues.push({
            severity: 'error',
            message: 'Failed to check compliance documents',
            details: error.message
          });
        } else if (data && data.length > 0) {
          results.status = 'warning';
          results.issues.push({
            severity: 'warning',
            message: `${data.length} compliance documents have expired`,
            details: `Expired documents: ${data.map((d: any) => d.title).join(', ')}`
          });
        }
      }
      break;
    
    case 'security_logs':
      // Check for recent failed login attempts
      {
        const hourAgo = new Date();
        hourAgo.setHours(hourAgo.getHours() - 1);
        
        const { data, error } = await supabase
          .from('audit_logs')
          .select('user_id, ip_address')
          .eq('action_type', 'login_failed')
          .gte('created_at', hourAgo.toISOString());
        
        if (error) {
          results.status = 'error';
          results.issues.push({
            severity: 'error',
            message: 'Failed to check security logs',
            details: error.message
          });
        } else if (data && data.length > 3) {
          // Group by IP to detect potential brute force
          const ipCounts: Record<string, number> = {};
          data.forEach((log: any) => {
            if (log.ip_address) {
              ipCounts[log.ip_address] = (ipCounts[log.ip_address] || 0) + 1;
            }
          });
          
          const suspiciousIPs = Object.entries(ipCounts)
            .filter(([_, count]) => count >= 3)
            .map(([ip, _]) => ip);
          
          if (suspiciousIPs.length > 0) {
            results.status = 'alert';
            results.issues.push({
              severity: 'high',
              message: 'Potential brute force attack detected',
              details: `Multiple failed login attempts from IP(s): ${suspiciousIPs.join(', ')}`
            });
          }
        }
      }
      break;
    
    default:
      // Run all checks if no specific type is specified
      // (This would be a more complex implementation in a real app)
      results.issues.push({
        severity: 'info',
        message: 'No specific check type specified',
        details: 'Please specify a check type: permissions, compliance, or security_logs'
      });
  }
  
  return new Response(
    JSON.stringify(results),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}
