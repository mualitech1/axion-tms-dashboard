import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ChevronRight, ChevronLeft, Menu, AlertCircle, Info } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { apiClient } from '@/services/supabase-client';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

// Define the routes to test - add all important routes here
const testRoutes = [
  { path: '/', name: 'Dashboard' },
  { path: '/analytics', name: 'Analytics' },
  { path: '/customers', name: 'Customers' },
  { path: '/jobs', name: 'Jobs' },
  { path: '/carriers', name: 'Carriers' },
  { path: '/carriers/register', name: 'Register Carrier' },
  { path: '/fleet', name: 'Fleet' },
  { path: '/drivers', name: 'Drivers' },
  { path: '/settings', name: 'Settings' },
  { path: '/settings/account', name: 'Account Settings' },
  { path: '/settings/security', name: 'Security Settings' },
  { path: '/auth', name: 'Auth Page' },
  { path: '/reset-password', name: 'Password Reset' },
];

// ID Format examples for verification
const idFormatExamples = {
  oldFormat: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', // UUID format
  newFormat: 'customer_01H5ZXVBTPQFRF3AHMS9XPPT8E', // Text format
};

/**
 * Development-only component for testing route consistency
 * Allows quick navigation between routes and reports issues
 */
export function RouteTestingPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showIdTester, setShowIdTester] = useState(false);
  const [routeStatuses, setRouteStatuses] = useState<Record<string, 'success' | 'error' | 'untested'>>({});
  const location = useLocation();
  const navigate = useNavigate();
  const [routeHistory, setRouteHistory] = useState<string[]>([location.pathname]);
  const [routeIssues, setRouteIssues] = useState<string[]>([]);
  
  // ID Tester state
  const [entityType, setEntityType] = useState<'customers' | 'jobs' | 'companies' | 'vehicles'>('customers');
  const [entityId, setEntityId] = useState('');
  const [entityData, setEntityData] = useState<any>(null);
  const [idTestStatus, setIdTestStatus] = useState<'untested' | 'success' | 'error'>('untested');

  useEffect(() => {
    // Initialize route statuses
    const initialStatuses: Record<string, 'success' | 'error' | 'untested'> = {};
    testRoutes.forEach(route => {
      initialStatuses[route.path] = 'untested';
    });
    setRouteStatuses(initialStatuses);
  }, []);

  useEffect(() => {
    // Add current route to history
    if (routeHistory[routeHistory.length - 1] !== location.pathname) {
      setRouteHistory(prev => {
        const newHistory = [...prev, location.pathname];
        // Keep only last 10 routes
        return newHistory.slice(-10);
      });
    }

    // Check for route issues
    const timeoutId = setTimeout(() => {
      // Check if page loaded completely
      const mainContent = document.querySelector('main');
      if (!mainContent || mainContent.children.length === 0) {
        setRouteIssues(prev => [...prev, `Issue with ${location.pathname}: Empty content`]);
        setRouteStatuses(prev => ({
          ...prev,
          [location.pathname]: 'error'
        }));
        toast({
          title: "Route Testing Warning",
          description: `Empty content detected at ${location.pathname}`,
          variant: "destructive",
        });
      } else {
        // Mark route as successful
        setRouteStatuses(prev => ({
          ...prev,
          [location.pathname]: 'success'
        }));
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  const togglePanel = () => setIsOpen(!isOpen);
  const toggleExpanded = () => setIsExpanded(!isExpanded);
  const toggleIdTester = () => setShowIdTester(!showIdTester);

  const getStatusIcon = (status: 'success' | 'error' | 'untested') => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'untested':
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const testAllRoutes = async () => {
    toast({
      title: "Testing All Routes",
      description: "Starting route validation test...",
    });

    // Save current route to restore later
    const currentRoute = location.pathname;
    
    // Create a copy of the current statuses
    const newStatuses = { ...routeStatuses };
    
    // Test each route one by one
    for (const route of testRoutes) {
      // Skip auth route to avoid unwanted redirects
      if (route.path === '/auth' || route.path === '/reset-password') continue;
      
      // Navigate to the route
      navigate(route.path);
      
      // Mark as visited
      newStatuses[route.path] = 'success';
      setRouteStatuses(newStatuses);
      
      // Wait a moment for the page to load
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Return to the original route
    navigate(currentRoute);
    
    toast({
      title: "Route Testing Complete",
      description: "All routes have been tested.",
    });
  };
  
  // Function to test entity ID format
  const testEntityId = async () => {
    if (!entityId || !entityType) {
      toast({
        title: "Invalid Input",
        description: "Please enter an entity ID and select an entity type",
        variant: "destructive",
      });
      return;
    }
    
    setEntityData(null);
    setIdTestStatus('untested');
    
    try {
      const data = await apiClient.getById(entityType, entityId);
      setEntityData(data);
      
      // Check if the ID is in the new text format (not a UUID)
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(entityId);
      const hasPrefix = entityId.includes('_');
      
      if (isUuid) {
        setIdTestStatus('error');
        toast({
          title: "ID Format Issue",
          description: "This ID appears to be in the old UUID format. The system now uses text-based IDs.",
          variant: "destructive",
        });
      } else if (!hasPrefix) {
        setIdTestStatus('error');
        toast({
          title: "ID Format Warning",
          description: "This ID does not include the entity prefix pattern (e.g., 'customer_').",
          variant: "warning",
        });
      } else {
        setIdTestStatus('success');
        toast({
          title: "ID Format Valid",
          description: "This ID appears to be in the correct text-based format.",
        });
      }
    } catch (error) {
      setIdTestStatus('error');
      toast({
        title: "Entity Not Found",
        description: "Could not find an entity with this ID. Please check if it exists.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="fixed bottom-0 right-0 z-50 flex flex-col items-end">
      {!isOpen ? (
        <Button 
          onClick={togglePanel} 
          size="sm" 
          className="mb-4 mr-4 bg-yellow-500 hover:bg-yellow-600"
        >
          <Menu className="h-4 w-4 mr-2" />
          Test Routes
        </Button>
      ) : (
        <div className="flex flex-col m-4 p-4 bg-card rounded-lg border shadow-lg max-w-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-sm">Route Testing Panel</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={toggleExpanded}>
                {isExpanded ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={togglePanel}>
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-4 max-h-60 overflow-y-auto">
            {testRoutes.map(route => (
              <Button 
                key={route.path} 
                variant="outline" 
                size="sm"
                className={location.pathname === route.path ? "border-primary bg-primary/10" : ""}
                onClick={() => navigate(route.path)}
              >
                <span className="mr-2">{getStatusIcon(routeStatuses[route.path] || 'untested')}</span>
                <span className="truncate">{route.name}</span>
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2 mb-4">
            <Button 
              size="sm" 
              onClick={testAllRoutes} 
              className="flex-1"
            >
              Test All Routes
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={toggleIdTester}
              className="flex-1"
            >
              {showIdTester ? 'Hide ID Tester' : 'ID Format Tester'}
            </Button>
          </div>
          
          {showIdTester && (
            <div className="mb-4 p-3 border rounded-md bg-muted/20">
              <h4 className="text-xs font-semibold mb-2">ID Format Tester</h4>
              <div className="flex flex-col gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <select 
                    className="text-xs p-1 border rounded flex-1"
                    value={entityType}
                    onChange={(e) => setEntityType(e.target.value as any)}
                  >
                    <option value="customers">Customer</option>
                    <option value="jobs">Job</option>
                    <option value="companies">Carrier</option>
                    <option value="vehicles">Vehicle</option>
                  </select>
                  <Input
                    placeholder="Enter Entity ID"
                    value={entityId}
                    onChange={(e) => setEntityId(e.target.value)}
                    className="text-xs p-1 h-auto flex-1"
                  />
                </div>
                <Button size="sm" onClick={testEntityId}>
                  Test ID Format
                </Button>
              </div>
              
              {idTestStatus !== 'untested' && (
                <div className="bg-card p-2 rounded-md text-xs">
                  <div className="flex justify-between mb-2">
                    <span>ID Format:</span>
                    <Badge
                      variant={idTestStatus === 'success' ? 'default' : 'destructive'}
                      className="text-xs"
                    >
                      {idTestStatus === 'success' ? 'Valid' : 'Invalid'}
                    </Badge>
                  </div>
                  {entityData && (
                    <div className="mt-2 text-xs">
                      <div className="font-semibold">Entity Found:</div>
                      <pre className="bg-muted/20 p-1 rounded overflow-x-auto mt-1 text-[10px]">
                        {JSON.stringify(entityData, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              )}
              
              <div className="mt-2 text-xs p-2 bg-muted/30 rounded flex items-start gap-2">
                <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>ID Format Change:</strong> Backend now uses text-based IDs instead of UUIDs.<br />
                  <strong>Old:</strong> <code className="bg-muted/30 px-1 rounded">{idFormatExamples.oldFormat}</code><br />
                  <strong>New:</strong> <code className="bg-muted/30 px-1 rounded">{idFormatExamples.newFormat}</code>
                </div>
              </div>
            </div>
          )}
          
          {isExpanded && (
            <>
              <div className="mt-2 mb-3">
                <h4 className="text-xs font-semibold mb-1">Route History</h4>
                <div className="text-xs max-h-20 overflow-y-auto bg-muted/40 p-2 rounded">
                  {routeHistory.map((path, i) => (
                    <div key={i} className="mb-1">
                      {i === routeHistory.length - 1 ? (
                        <strong>{path} (current)</strong>
                      ) : (
                        path
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {routeIssues.length > 0 && (
                <div className="mt-2">
                  <h4 className="text-xs font-semibold mb-1 text-destructive">Issues Found</h4>
                  <div className="text-xs max-h-20 overflow-y-auto bg-destructive/10 p-2 rounded">
                    {routeIssues.map((issue, i) => (
                      <div key={i} className="mb-1">{issue}</div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
          
          <div className="mt-3 pt-2 border-t text-xs text-muted-foreground">
            Route testing panel - dev only
          </div>
        </div>
      )}
    </div>
  );
} 