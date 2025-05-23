import { useState, useEffect, useCallback } from 'react';
import { useToast } from './use-toast';
import { ComplianceDocument, ComplianceStatus } from '@/services/compliance-service';
import { supabase } from '@/integrations/supabase/client';
import { withRetry } from '@/lib/utils';

// Define alert severity levels
export type AlertSeverity = 'low' | 'medium' | 'high';

// Define document expiry alert structure
export interface DocumentExpiryAlert {
  id: string;
  documentId: string;
  documentTitle: string;
  documentType: string;
  expiryDate: string;
  daysUntilExpiry: number;
  severity: AlertSeverity;
}

// Single cache for all instances of the hook to avoid duplicate requests
const alertCache = {
  data: [] as DocumentExpiryAlert[],
  timestamp: 0,
  isStale: function() {
    // Consider cache stale after 10 minutes
    return Date.now() - this.timestamp > 10 * 60 * 1000;
  },
  update: function(alerts: DocumentExpiryAlert[]) {
    this.data = alerts;
    this.timestamp = Date.now();
  }
};

// Hook for handling compliance alerts
export function useComplianceAlerts() {
  const [loading, setLoading] = useState<boolean>(false);
  const [expiryAlerts, setExpiryAlerts] = useState<DocumentExpiryAlert[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const { toast } = useToast();

  // Get documents that are expiring soon
  const getExpiringDocuments = useCallback(async (daysThreshold: number = 30): Promise<ComplianceDocument[]> => {
    try {
      setLoading(true);
      setFetchError(null);
      
      // Calculate the date threshold
      const today = new Date();
      const thresholdDate = new Date();
      thresholdDate.setDate(today.getDate() + daysThreshold);
      
      // Use withRetry for automatic exponential backoff retry
      return await withRetry(async () => {
        // Get documents that expire between today and the threshold date
        const { data, error } = await supabase
          .from('compliance_documents')
          .select('*')
          .gte('expiry_date', today.toISOString().split('T')[0])
          .lte('expiry_date', thresholdDate.toISOString().split('T')[0])
          .order('expiry_date', { ascending: true });
        
        if (error) {
          console.error('Error fetching expiring documents:', error);
          
          // Handle rate limiting specifically - this will trigger a retry with exponential backoff
          if (error.message.includes('ERR_INSUFFICIENT_RESOURCES')) {
            throw new Error('Rate limited: ' + error.message);
          }
          
          throw error;
        }
        
        // Convert to camelCase
        return data.map(doc => ({
          id: doc.id,
          title: doc.title,
          description: doc.description,
          documentType: doc.document_type,
          filePath: doc.file_path,
          version: doc.version,
          status: doc.status as ComplianceStatus,
          effectiveDate: doc.effective_date,
          expiryDate: doc.expiry_date,
          ownerId: doc.owner_id,
          approvedBy: doc.approved_by,
          approvalDate: doc.approval_date,
          createdAt: doc.created_at,
          updatedAt: doc.updated_at,
          metadata: doc.metadata
        }));
      }, 3, 2000); // 3 retries with 2s base delay
    } catch (error) {
      console.error('Failed to fetch expiring documents after retries:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setFetchError(errorMessage);
      
      // Only show toast for non-rate-limit errors to reduce noise
      if (!errorMessage.includes('Rate limited')) {
        toast({
          title: "Error",
          description: "Failed to fetch expiring documents. Will retry later.",
          variant: "destructive"
        });
      }
      return [];
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Get carrier documents that are expiring soon
  const getCarrierExpiringDocuments = async (carrierId: string, daysThreshold: number = 30) => {
    try {
      setLoading(true);
      
      // Calculate the date threshold
      const today = new Date();
      const thresholdDate = new Date();
      thresholdDate.setDate(today.getDate() + daysThreshold);
      
      // Get carrier documents that expire between today and the threshold date
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('company_id', carrierId)
        .gte('expiry_date', today.toISOString().split('T')[0])
        .lte('expiry_date', thresholdDate.toISOString().split('T')[0])
        .order('expiry_date', { ascending: true });
      
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error(`Failed to fetch expiring documents for carrier ${carrierId}:`, error);
      toast({
        title: "Error",
        description: `Failed to fetch expiring documents for carrier`,
        variant: "destructive"
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Generate alerts for expiring documents with cache
  const generateDocumentExpiryAlerts = useCallback(async (thresholds: number[] = [7, 30, 60]) => {
    // Check cache first
    if (!alertCache.isStale() && alertCache.data.length > 0) {
      setExpiryAlerts(alertCache.data);
      return alertCache.data;
    }
    
    try {
      setLoading(true);
      setFetchError(null);
      
      // Stop here if already enough retries
      if (fetchError && fetchError.includes('Rate limited')) {
        console.log('Skipping fetch due to recent rate limiting');
        return expiryAlerts;
      }
      
      const alerts: DocumentExpiryAlert[] = [];
      
      // Stagger requests to avoid hitting rate limits
      for (const days of thresholds) {
        // Add slight delay between requests
        if (days !== thresholds[0]) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        const expiringDocs = await getExpiringDocuments(days);
        
        const now = new Date();
        
        // Create alerts for each expiring document
        for (const doc of expiringDocs) {
          if (!doc.expiryDate) continue;
          
          const expiryDate = new Date(doc.expiryDate);
          const daysUntilExpiry = Math.round((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
          
          // Determine severity
          let severity: AlertSeverity = 'low';
          if (daysUntilExpiry <= 7) {
            severity = 'high';
          } else if (daysUntilExpiry <= 30) {
            severity = 'medium';
          }
          
          alerts.push({
            id: `${doc.id}-${daysUntilExpiry}`,
            documentId: doc.id || '',
            documentTitle: doc.title,
            documentType: doc.documentType,
            expiryDate: doc.expiryDate,
            daysUntilExpiry,
            severity
          });
        }
      }
      
      // Deduplicate alerts by document ID taking most severe
      const deduplicatedAlerts = Object.values(
        alerts.reduce((acc, alert) => {
          // If alert already exists and has higher severity, keep the more severe one
          if (!acc[alert.documentId] || 
              (acc[alert.documentId].severity === 'low' && ['medium', 'high'].includes(alert.severity)) ||
              (acc[alert.documentId].severity === 'medium' && alert.severity === 'high')) {
            acc[alert.documentId] = alert;
          }
          return acc;
        }, {} as Record<string, DocumentExpiryAlert>)
      );
      
      // Update state and cache with generated alerts
      setExpiryAlerts(deduplicatedAlerts);
      alertCache.update(deduplicatedAlerts);
      
      // Display toast for urgent alerts (high severity)
      const urgentAlerts = deduplicatedAlerts.filter(alert => alert.severity === 'high');
      if (urgentAlerts.length > 0) {
        toast({
          title: "Urgent Document Expiry",
          description: `${urgentAlerts.length} documents expiring in less than 7 days`,
          variant: "destructive"
        });
      }
      
      return deduplicatedAlerts;
    } catch (error) {
      console.error('Failed to generate document expiry alerts:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setFetchError(errorMessage);
      
      // Use cached data if available
      if (alertCache.data.length > 0) {
        setExpiryAlerts(alertCache.data);
        return alertCache.data;
      }
      
      toast({
        title: "Error",
        description: "Failed to get compliance alerts. Using cached data if available.",
        variant: "destructive"
      });
      return [];
    } finally {
      setLoading(false);
    }
  }, [expiryAlerts, fetchError, getExpiringDocuments, toast]);

  // Check carrier compliance status
  const checkCarrierCompliance = async (carrierId: string) => {
    try {
      setLoading(true);
      
      // Get carrier documents
      const { data: documents, error } = await supabase
        .from('documents')
        .select('*')
        .eq('company_id', carrierId);
      
      if (error) throw error;
      
      // Define required document types for carriers
      const requiredDocTypes = [
        'insurance_git', // Goods in Transit Insurance
        'insurance_fleet', // Fleet Insurance
        'license', // Operator's License
        'terms' // Terms & Conditions Agreement
      ];
      
      // Check for missing documents
      const existingDocTypes = documents.map(doc => doc.type);
      const missingDocuments = requiredDocTypes.filter(type => 
        !existingDocTypes.includes(type)
      );
      
      // Check for expired documents
      const today = new Date().toISOString().split('T')[0];
      const expiredDocuments = documents.filter(doc => 
        doc.expiry_date && doc.expiry_date < today
      );
      
      // Check for documents expiring soon (within 30 days)
      const thirtyDaysLater = new Date();
      thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);
      const thirtyDaysDate = thirtyDaysLater.toISOString().split('T')[0];
      
      const expiringDocuments = documents.filter(doc => 
        doc.expiry_date && 
        doc.expiry_date >= today && 
        doc.expiry_date <= thirtyDaysDate
      );
      
      // A carrier is compliant if they have all required documents and none are expired
      const isCompliant = missingDocuments.length === 0 && expiredDocuments.length === 0;
      
      // Show toast for non-compliant carriers
      if (!isCompliant) {
        toast({
          title: "Carrier Compliance Issue",
          description: `Carrier has ${missingDocuments.length} missing and ${expiredDocuments.length} expired documents`,
          variant: "destructive"
        });
      }
      
      return {
        isCompliant,
        missingDocuments,
        expiringDocuments,
        expiredDocuments
      };
    } catch (error) {
      console.error(`Failed to check compliance for carrier ${carrierId}:`, error);
      toast({
        title: "Error",
        description: "Failed to check carrier compliance",
        variant: "destructive"
      });
      
      return {
        isCompliant: false,
        missingDocuments: [],
        expiringDocuments: [],
        expiredDocuments: []
      };
    } finally {
      setLoading(false);
    }
  };

  // Return hook functions and state
  return {
    loading,
    expiryAlerts,
    getExpiringDocuments,
    getCarrierExpiringDocuments,
    generateDocumentExpiryAlerts,
    checkCarrierCompliance,
    fetchError
  };
} 