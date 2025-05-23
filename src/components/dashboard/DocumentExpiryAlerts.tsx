import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, AlertCircle, CheckCircle, CalendarClock, FileText, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';
import { useComplianceAlerts, DocumentExpiryAlert } from '@/hooks/use-compliance-alerts';

interface DocumentExpiryAlertsProps {
  limit?: number;
  onViewAll?: () => void;
}

export function DocumentExpiryAlerts({ limit = 5, onViewAll }: DocumentExpiryAlertsProps) {
  const { loading, expiryAlerts, generateDocumentExpiryAlerts, fetchError } = useComplianceAlerts();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasInitialized, setHasInitialized] = useState<boolean>(false);
  const loadingRef = useRef<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Prevent duplicate loading during initial mount
    if (loadingRef.current) return;
    
    const loadAlerts = async () => {
      if (loadingRef.current) return;
      
      try {
        loadingRef.current = true;
        setIsLoading(true);
        await generateDocumentExpiryAlerts();
        setHasInitialized(true);
      } catch (error) {
        console.error("Error loading alerts:", error);
      } finally {
        setIsLoading(false);
        loadingRef.current = false;
      }
    };
    
    loadAlerts();
    
    // Refresh alerts every hour
    const interval = setInterval(() => {
      if (!loadingRef.current) {
        loadAlerts();
      }
    }, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [generateDocumentExpiryAlerts]);

  // Sort alerts by days until expiry (ascending) and limit to specified number
  const sortedAlerts = [...expiryAlerts]
    .sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry)
    .slice(0, limit);

  // Function to determine the severity class based on days left
  const getSeverityClass = (alert: DocumentExpiryAlert) => {
    if (alert.severity === 'high') return "text-red-500";
    if (alert.severity === 'medium') return "text-amber-500";
    return "text-blue-500";
  };
  
  // Function to get the status icon based on severity
  const getStatusIcon = (alert: DocumentExpiryAlert) => {
    if (alert.severity === 'high') {
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    } else if (alert.severity === 'medium') {
      return <AlertTriangle className="h-4 w-4 text-amber-500" />;
    } else {
      return <AlertCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  const handleDocumentClick = (documentId: string) => {
    // Navigate to document details page
    navigate(`/compliance/documents/${documentId}`);
  };

  const handleManualRefresh = async () => {
    if (loadingRef.current) return;
    
    try {
      loadingRef.current = true;
      setIsLoading(true);
      await generateDocumentExpiryAlerts();
    } catch (error) {
      console.error("Error refreshing alerts:", error);
    } finally {
      setIsLoading(false);
      loadingRef.current = false;
    }
  };

  return (
    <Card className="border-aximo-border bg-aximo-card shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <CalendarClock className="h-5 w-5 mr-2 text-aximo-primary" />
            Quantum Compliance Timeline
          </CardTitle>
          <Button 
            size="icon" 
            variant="ghost" 
            className={`h-8 w-8 p-0 ${isLoading ? 'animate-spin' : ''}`}
            onClick={handleManualRefresh}
            disabled={isLoading}
          >
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Refresh</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && !hasInitialized ? (
          <div className="flex justify-center py-6">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 w-8 bg-aximo-primary/20 rounded-full mb-2"></div>
              <div className="h-4 w-32 bg-aximo-primary/20 rounded mb-2"></div>
              <div className="h-3 w-24 bg-aximo-primary/10 rounded"></div>
            </div>
          </div>
        ) : fetchError && !expiryAlerts.length ? (
          <div className="flex flex-col items-center justify-center py-6">
            <AlertCircle className="h-12 w-12 text-amber-500 opacity-50 mb-2" />
            <p className="text-center text-aximo-text-secondary mb-2">Unable to fetch compliance data</p>
            <Button size="sm" variant="outline" onClick={handleManualRefresh} className="mt-2">
              <RefreshCw className="h-3 w-3 mr-2" />
              Retry
            </Button>
          </div>
        ) : sortedAlerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6">
            <CheckCircle className="h-12 w-12 text-green-500 opacity-50 mb-2" />
            <p className="text-center text-aximo-text-secondary">All documents are in compliance</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedAlerts.map((alert) => (
              <div 
                key={alert.id}
                className="flex items-center justify-between p-3 bg-aximo-darker rounded-lg cursor-pointer hover:bg-aximo-darker/80 transition-colors"
                onClick={() => handleDocumentClick(alert.documentId)}
              >
                <div className="flex items-center">
                  <div className="bg-aximo-primary/20 p-1.5 rounded-full mr-3">
                    <FileText className="h-4 w-4 text-aximo-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-aximo-text truncate max-w-[200px]">{alert.documentTitle}</p>
                    <p className="text-xs text-aximo-text-secondary">Expires on {new Date(alert.expiryDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {getStatusIcon(alert)}
                  <span className={`text-sm font-medium ml-1.5 ${getSeverityClass(alert)}`}>
                    {alert.daysUntilExpiry} {alert.daysUntilExpiry === 1 ? 'day' : 'days'}
                  </span>
                </div>
              </div>
            ))}
            
            {expiryAlerts.length > limit && onViewAll && (
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-2" 
                onClick={onViewAll}
              >
                View All ({expiryAlerts.length})
              </Button>
            )}
          </div>
        )}
        
        {expiryAlerts.some(alert => alert.severity === 'high') && (
          <Alert className="mt-4 bg-red-950/20 border-red-800">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <AlertTitle>Critical Compliance Alert</AlertTitle>
            <AlertDescription>
              Documents requiring immediate attention. Expired documents may impact operational capabilities.
            </AlertDescription>
          </Alert>
        )}
        
        {isLoading && hasInitialized && (
          <div className="flex justify-center mt-4">
            <div className="animate-pulse flex items-center text-xs text-aximo-text-secondary">
              <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
              Updating compliance data...
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 