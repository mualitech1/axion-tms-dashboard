
import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { 
  integrationService, 
  IntegrationConfig, 
  IntegrationType,
  ApiUsageRecord,
  WebhookEvent
} from '@/services/integration-service';

export interface UseIntegrationsOptions {
  type?: IntegrationType;
  enabled?: boolean;
  loadOnMount?: boolean;
}

export function useIntegrations(options: UseIntegrationsOptions = {}) {
  const [integrations, setIntegrations] = useState<IntegrationConfig[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  
  const loadIntegrations = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      let data: IntegrationConfig[];
      
      // Get integrations by type if specified
      if (options.type) {
        data = await integrationService.getIntegrationsByType(options.type);
      } else {
        data = await integrationService.getIntegrations();
      }
      
      // Filter by enabled status if specified
      if (options.enabled !== undefined) {
        data = data.filter(integration => integration.enabled === options.enabled);
      }
      
      setIntegrations(data);
    } catch (err) {
      console.error('Failed to load integrations:', err);
      setError(err as Error);
      
      toast({
        title: 'Error',
        description: 'Failed to load integrations. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [options.type, options.enabled]);
  
  useEffect(() => {
    if (options.loadOnMount !== false) {
      loadIntegrations();
    }
  }, [loadIntegrations, options.loadOnMount]);
  
  const createIntegration = async (integration: Omit<IntegrationConfig, 'id'>) => {
    try {
      const newIntegration = await integrationService.createIntegration(integration);
      setIntegrations(prev => [...prev, newIntegration]);
      
      toast({
        title: 'Success',
        description: 'Integration created successfully',
      });
      
      return newIntegration;
    } catch (err) {
      console.error('Failed to create integration:', err);
      
      toast({
        title: 'Error',
        description: 'Failed to create integration. Please try again.',
        variant: 'destructive',
      });
      
      throw err;
    }
  };
  
  const updateIntegration = async (id: string, updates: Partial<IntegrationConfig>) => {
    try {
      const updatedIntegration = await integrationService.updateIntegration(id, updates);
      setIntegrations(prev => 
        prev.map(integration => 
          integration.id === id ? updatedIntegration : integration
        )
      );
      
      toast({
        title: 'Success',
        description: 'Integration updated successfully',
      });
      
      return updatedIntegration;
    } catch (err) {
      console.error('Failed to update integration:', err);
      
      toast({
        title: 'Error',
        description: 'Failed to update integration. Please try again.',
        variant: 'destructive',
      });
      
      throw err;
    }
  };
  
  const deleteIntegration = async (id: string) => {
    try {
      await integrationService.deleteIntegration(id);
      setIntegrations(prev => prev.filter(integration => integration.id !== id));
      
      toast({
        title: 'Success',
        description: 'Integration deleted successfully',
      });
    } catch (err) {
      console.error('Failed to delete integration:', err);
      
      toast({
        title: 'Error',
        description: 'Failed to delete integration. Please try again.',
        variant: 'destructive',
      });
      
      throw err;
    }
  };
  
  const fetchApiUsage = async (integrationId: string, dateRange?: { start: string, end: string }) => {
    try {
      return await integrationService.getApiUsage(integrationId, dateRange);
    } catch (err) {
      console.error('Failed to fetch API usage:', err);
      
      toast({
        title: 'Error',
        description: 'Failed to fetch API usage data. Please try again.',
        variant: 'destructive',
      });
      
      throw err;
    }
  };
  
  const fetchWebhookEvents = async (integrationId: string, onlyUnprocessed: boolean = false) => {
    try {
      return await integrationService.getWebhookEvents(integrationId, onlyUnprocessed);
    } catch (err) {
      console.error('Failed to fetch webhook events:', err);
      
      toast({
        title: 'Error',
        description: 'Failed to fetch webhook events. Please try again.',
        variant: 'destructive',
      });
      
      throw err;
    }
  };
  
  const markWebhookAsProcessed = async (eventId: string) => {
    try {
      await integrationService.markWebhookAsProcessed(eventId);
    } catch (err) {
      console.error('Failed to mark webhook as processed:', err);
      
      toast({
        title: 'Error',
        description: 'Failed to update webhook status. Please try again.',
        variant: 'destructive',
      });
      
      throw err;
    }
  };
  
  // Wrapped API call with tracking
  const trackedFetch = async (integrationId: string, url: string, options: RequestInit = {}) => {
    try {
      return await integrationService.trackedFetch(integrationId, url, options);
    } catch (err) {
      // Error is already logged in the service, just propagate it
      throw err;
    }
  };
  
  return {
    integrations,
    loading,
    error,
    loadIntegrations,
    createIntegration,
    updateIntegration,
    deleteIntegration,
    fetchApiUsage,
    fetchWebhookEvents,
    markWebhookAsProcessed,
    trackedFetch,
  };
}
