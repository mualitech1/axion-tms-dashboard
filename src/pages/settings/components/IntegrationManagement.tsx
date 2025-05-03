
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import {
  IntegrationConfig,
  IntegrationType,
  integrationService,
} from '@/services/integration-service';
import { ArrowUpRight, Copy, Plus, RefreshCw, Trash2, ExternalLink } from 'lucide-react';

export default function IntegrationManagement() {
  const [integrations, setIntegrations] = useState<IntegrationConfig[]>([]);
  const [selectedIntegration, setSelectedIntegration] = useState<IntegrationConfig | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [apiUsageStats, setApiUsageStats] = useState<{ [key: string]: { count: number, averageResponseTime: number } }>({});

  // Form state
  const [formData, setFormData] = useState<Partial<IntegrationConfig>>({
    name: '',
    provider: '',
    type: 'payment',
    enabled: true,
    apiKey: '',
    baseUrl: '',
    webhookUrl: '',
    settings: {},
  });

  // Load integrations
  useEffect(() => {
    loadIntegrations();
  }, []);

  const loadIntegrations = async () => {
    setIsLoading(true);
    try {
      const data = await integrationService.getIntegrations();
      setIntegrations(data);
      
      // Get API usage stats for each integration
      const stats: { [key: string]: { count: number, averageResponseTime: number } } = {};
      for (const integration of data) {
        if (integration.id) {
          const usageStats = await integrationService.getApiUsageStats(integration.id);
          stats[integration.id] = usageStats;
        }
      }
      setApiUsageStats(stats);
    } catch (error) {
      console.error('Failed to load integrations:', error);
      toast({
        title: 'Error',
        description: 'Failed to load integrations. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDialog = (integration?: IntegrationConfig) => {
    if (integration) {
      setSelectedIntegration(integration);
      setFormData({
        name: integration.name,
        provider: integration.provider,
        type: integration.type,
        enabled: integration.enabled,
        apiKey: integration.apiKey || '',
        apiSecret: integration.apiSecret || '',
        baseUrl: integration.baseUrl || '',
        webhookUrl: integration.webhookUrl || '',
        settings: integration.settings || {},
      });
    } else {
      setSelectedIntegration(null);
      setFormData({
        name: '',
        provider: '',
        type: 'payment',
        enabled: true,
        apiKey: '',
        baseUrl: '',
        webhookUrl: '',
        settings: {},
      });
    }
    setIsDialogOpen(true);
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (selectedIntegration) {
        // Update existing integration
        await integrationService.updateIntegration(selectedIntegration.id!, formData);
        toast({
          title: 'Success',
          description: 'Integration updated successfully',
        });
      } else {
        // Create new integration
        await integrationService.createIntegration(formData as Omit<IntegrationConfig, 'id'>);
        toast({
          title: 'Success',
          description: 'Integration created successfully',
        });
      }
      setIsDialogOpen(false);
      loadIntegrations();
    } catch (error) {
      console.error('Failed to save integration:', error);
      toast({
        title: 'Error',
        description: 'Failed to save integration. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedIntegration) return;
    
    setIsLoading(true);
    try {
      await integrationService.deleteIntegration(selectedIntegration.id!);
      toast({
        title: 'Success',
        description: 'Integration deleted successfully',
      });
      setIsDeleteDialogOpen(false);
      loadIntegrations();
    } catch (error) {
      console.error('Failed to delete integration:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete integration. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getWebhookUrl = (integrationId: string) => {
    const baseUrl = window.location.origin.includes('localhost') 
      ? 'http://localhost:54321' 
      : 'https://ngriinwwvpvhuhsdwcfm.functions.supabase.co';
    
    return `${baseUrl}/handle-webhook?integration_id=${integrationId}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied',
      description: 'Webhook URL copied to clipboard',
    });
  };

  const getTypeIcon = (type: IntegrationType) => {
    switch (type) {
      case 'payment':
        return '💳';
      case 'tracking':
        return '🔍';
      case 'email':
        return '📧';
      case 'calendar':
        return '📅';
      case 'weather':
        return '☁️';
      case 'maps':
        return '🗺️';
      case 'webhook':
        return '🔗';
      default:
        return '🔌';
    }
  };

  const renderIntegrationCards = () => {
    if (integrations.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No integrations configured yet.</p>
          <Button onClick={() => handleOpenDialog()} className="mt-4">
            <Plus className="mr-2 h-4 w-4" />
            Add Integration
          </Button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((integration) => (
          <Card key={integration.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{getTypeIcon(integration.type)}</span>
                    <CardTitle className="text-base font-medium">{integration.name}</CardTitle>
                    {integration.enabled ? (
                      <Badge variant="default" className="ml-2 bg-green-500">Active</Badge>
                    ) : (
                      <Badge variant="outline" className="ml-2">Inactive</Badge>
                    )}
                  </div>
                  <CardDescription>{integration.provider}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-medium">{integration.type}</span>
                </div>
                {integration.id && apiUsageStats[integration.id] && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">API Calls:</span>
                    <span className="font-medium">
                      {apiUsageStats[integration.id].count} 
                      {apiUsageStats[integration.id].count > 0 && (
                        <span className="text-xs text-muted-foreground ml-1">
                          (avg: {apiUsageStats[integration.id].averageResponseTime.toFixed(0)}ms)
                        </span>
                      )}
                    </span>
                  </div>
                )}
                {integration.webhookUrl && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Webhook:</span>
                    <span className="font-medium">Configured</span>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline" size="sm" onClick={() => handleOpenDialog(integration)}>
                Configure
              </Button>
              {integration.id && (
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-blue-500 border-blue-500" 
                    onClick={() => {
                      copyToClipboard(getWebhookUrl(integration.id!));
                    }}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Webhook
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-500 border-red-500"
                    onClick={() => {
                      setSelectedIntegration(integration);
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Integration Management</h3>
          <p className="text-sm text-muted-foreground">
            Configure and monitor third-party API integrations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadIntegrations}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="h-4 w-4 mr-2" />
            Add Integration
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Integrations</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="tracking">Tracking</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="webhook">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          {renderIntegrationCards()}
        </TabsContent>

        <TabsContent value="payment" className="mt-0">
          {renderIntegrationCards()}
        </TabsContent>

        <TabsContent value="tracking" className="mt-0">
          {renderIntegrationCards()}
        </TabsContent>

        <TabsContent value="email" className="mt-0">
          {renderIntegrationCards()}
        </TabsContent>

        <TabsContent value="webhook" className="mt-0">
          {renderIntegrationCards()}
        </TabsContent>
      </Tabs>

      {/* Create/Edit Integration Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedIntegration ? 'Edit Integration' : 'Add Integration'}
            </DialogTitle>
            <DialogDescription>
              {selectedIntegration
                ? 'Update the configuration for this integration.'
                : 'Configure a new third-party integration.'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="provider">Provider</Label>
                <Input
                  id="provider"
                  value={formData.provider || ''}
                  onChange={(e) => handleChange('provider', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Type</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => handleChange('type', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="payment">Payment</SelectItem>
                    <SelectItem value="tracking">Tracking</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="calendar">Calendar</SelectItem>
                    <SelectItem value="weather">Weather</SelectItem>
                    <SelectItem value="maps">Maps</SelectItem>
                    <SelectItem value="webhook">Webhook</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <Switch
                  id="enabled"
                  checked={formData.enabled}
                  onCheckedChange={(checked) => handleChange('enabled', checked)}
                />
                <Label htmlFor="enabled">Enabled</Label>
              </div>
            </div>

            <Separator />

            <div>
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                value={formData.apiKey || ''}
                onChange={(e) => handleChange('apiKey', e.target.value)}
                type="password"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="apiSecret">API Secret (optional)</Label>
              <Input
                id="apiSecret"
                value={formData.apiSecret || ''}
                onChange={(e) => handleChange('apiSecret', e.target.value)}
                type="password"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="baseUrl">Base URL</Label>
              <Input
                id="baseUrl"
                value={formData.baseUrl || ''}
                onChange={(e) => handleChange('baseUrl', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="webhookUrl">External Webhook URL (optional)</Label>
              <Input
                id="webhookUrl"
                value={formData.webhookUrl || ''}
                onChange={(e) => handleChange('webhookUrl', e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                URL where this integration sends webhook events to your system
              </p>
            </div>

            {selectedIntegration?.id && (
              <div>
                <Label htmlFor="incomingWebhook">Incoming Webhook URL</Label>
                <div className="flex mt-1">
                  <Input
                    id="incomingWebhook"
                    value={getWebhookUrl(selectedIntegration.id)}
                    readOnly
                    className="rounded-r-none"
                  />
                  <Button 
                    type="button" 
                    variant="secondary" 
                    className="rounded-l-none"
                    onClick={() => copyToClipboard(getWebhookUrl(selectedIntegration.id))}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  URL for external services to send webhook events to our system
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? 'Saving...' : selectedIntegration ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Integration</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this integration? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm} disabled={isLoading}>
              {isLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
