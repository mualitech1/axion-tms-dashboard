
import { supabase } from '@/integrations/supabase/client';
import { apiClient } from './supabase-client';
import { getErrorMessage } from '@/utils/error-handler';

export type IntegrationType = 'payment' | 'tracking' | 'email' | 'calendar' | 'weather' | 'maps' | 'webhook';

export interface IntegrationConfig {
  id?: string;
  name: string;
  type: IntegrationType;
  provider: string;
  apiKey?: string;
  apiSecret?: string;
  baseUrl?: string;
  enabled: boolean;
  webhookUrl?: string;
  refreshToken?: string;
  accessToken?: string;
  expiresAt?: string;
  settings?: Record<string, any>;
  usageQuota?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiUsageRecord {
  id?: string;
  integrationId: string;
  endpoint: string;
  method: string;
  statusCode: number;
  responseTime: number;
  timestamp: string;
  requestPayload?: Record<string, any>;
  responsePayload?: Record<string, any>;
  error?: string;
}

export interface WebhookEvent {
  id?: string;
  integrationId: string;
  eventType: string;
  payload: Record<string, any>;
  processed: boolean;
  processedAt?: string;
  createdAt: string;
}

// Integration service for managing third-party integrations
class IntegrationService {
  // Get all integrations
  async getIntegrations(): Promise<IntegrationConfig[]> {
    try {
      const { data, error } = await supabase
        .from('integrations')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as IntegrationConfig[];
    } catch (error) {
      console.error('Failed to fetch integrations:', error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Get integration by ID
  async getIntegrationById(id: string): Promise<IntegrationConfig> {
    try {
      const { data, error } = await supabase
        .from('integrations')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as IntegrationConfig;
    } catch (error) {
      console.error(`Failed to fetch integration with ID ${id}:`, error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Get integrations by type
  async getIntegrationsByType(type: IntegrationType): Promise<IntegrationConfig[]> {
    try {
      const { data, error } = await supabase
        .from('integrations')
        .select('*')
        .eq('type', type);
      
      if (error) throw error;
      return data as IntegrationConfig[];
    } catch (error) {
      console.error(`Failed to fetch integrations of type ${type}:`, error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Create new integration
  async createIntegration(integration: Omit<IntegrationConfig, 'id'>): Promise<IntegrationConfig> {
    try {
      const { data, error } = await supabase
        .from('integrations')
        .insert([integration])
        .select()
        .single();
      
      if (error) throw error;
      return data as IntegrationConfig;
    } catch (error) {
      console.error('Failed to create integration:', error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Update integration
  async updateIntegration(id: string, updates: Partial<IntegrationConfig>): Promise<IntegrationConfig> {
    try {
      const { data, error } = await supabase
        .from('integrations')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as IntegrationConfig;
    } catch (error) {
      console.error(`Failed to update integration with ID ${id}:`, error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Delete integration
  async deleteIntegration(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('integrations')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    } catch (error) {
      console.error(`Failed to delete integration with ID ${id}:`, error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Log API usage
  async logApiUsage(usage: Omit<ApiUsageRecord, 'id'>): Promise<void> {
    try {
      const { error } = await supabase
        .from('api_usage')
        .insert([usage]);
      
      if (error) throw error;
    } catch (error) {
      console.error('Failed to log API usage:', error);
      // Don't throw here to prevent interrupting the main flow
      console.error(getErrorMessage(error));
    }
  }

  // Track API usage with wrapped fetch
  async trackedFetch(
    integrationId: string, 
    url: string, 
    options: RequestInit = {}
  ): Promise<Response> {
    const method = options.method || 'GET';
    const startTime = performance.now();
    let statusCode = 0;
    let responseData = {};
    let errorMessage = '';
    
    try {
      const response = await fetch(url, options);
      statusCode = response.status;
      
      // Clone the response to read the body
      const clonedResponse = response.clone();
      try {
        responseData = await clonedResponse.json();
      } catch {
        // If not JSON, store as text
        responseData = { text: await clonedResponse.text() };
      }
      
      // Log the API usage
      const endTime = performance.now();
      await this.logApiUsage({
        integrationId,
        endpoint: url,
        method,
        statusCode,
        responseTime: endTime - startTime,
        timestamp: new Date().toISOString(),
        requestPayload: options.body ? JSON.parse(options.body.toString()) : {},
        responsePayload: responseData
      });
      
      return response;
    } catch (error) {
      statusCode = 0; // Error before getting a status code
      errorMessage = getErrorMessage(error);
      
      // Log the failed API call
      const endTime = performance.now();
      await this.logApiUsage({
        integrationId,
        endpoint: url,
        method,
        statusCode,
        responseTime: endTime - startTime,
        timestamp: new Date().toISOString(),
        requestPayload: options.body ? JSON.parse(options.body.toString()) : {},
        error: errorMessage
      });
      
      throw error;
    }
  }

  // Get API usage for a specific integration
  async getApiUsage(integrationId: string, dateRange?: { start: string, end: string }): Promise<ApiUsageRecord[]> {
    try {
      let query = supabase
        .from('api_usage')
        .select('*')
        .eq('integration_id', integrationId)
        .order('timestamp', { ascending: false });
      
      if (dateRange) {
        query = query
          .gte('timestamp', dateRange.start)
          .lte('timestamp', dateRange.end);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as ApiUsageRecord[];
    } catch (error) {
      console.error(`Failed to fetch API usage for integration ${integrationId}:`, error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Get API usage statistics
  async getApiUsageStats(integrationId: string): Promise<{ count: number, averageResponseTime: number }> {
    try {
      const { data, error } = await supabase
        .from('api_usage')
        .select('response_time')
        .eq('integration_id', integrationId);
      
      if (error) throw error;
      
      const count = data.length;
      const totalResponseTime = data.reduce((sum, record) => sum + (record.response_time || 0), 0);
      const averageResponseTime = count > 0 ? totalResponseTime / count : 0;
      
      return { count, averageResponseTime };
    } catch (error) {
      console.error(`Failed to fetch API usage stats for integration ${integrationId}:`, error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Process webhook events
  async processWebhookEvent(event: Omit<WebhookEvent, 'id' | 'processedAt'>): Promise<void> {
    try {
      const { error } = await supabase
        .from('webhook_events')
        .insert([event]);
      
      if (error) throw error;
      
      // You can add additional processing logic here
      // For example, triggering specific actions based on event type
    } catch (error) {
      console.error('Failed to process webhook event:', error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Get webhook events by integration ID
  async getWebhookEvents(integrationId: string, onlyUnprocessed = false): Promise<WebhookEvent[]> {
    try {
      let query = supabase
        .from('webhook_events')
        .select('*')
        .eq('integration_id', integrationId)
        .order('created_at', { ascending: false });
      
      if (onlyUnprocessed) {
        query = query.eq('processed', false);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as WebhookEvent[];
    } catch (error) {
      console.error(`Failed to fetch webhook events for integration ${integrationId}:`, error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Mark webhook event as processed
  async markWebhookAsProcessed(eventId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('webhook_events')
        .update({ 
          processed: true,
          processed_at: new Date().toISOString()
        })
        .eq('id', eventId);
      
      if (error) throw error;
    } catch (error) {
      console.error(`Failed to mark webhook event ${eventId} as processed:`, error);
      throw new Error(getErrorMessage(error));
    }
  }
}

export const integrationService = new IntegrationService();
