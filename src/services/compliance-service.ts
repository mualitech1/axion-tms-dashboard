import { supabase, withSupabaseRetry } from '@/integrations/supabase/client';
import { getErrorMessage } from '@/utils/error-handler';
import { auditService } from './audit-service';
import { Tables } from '@/integrations/supabase/types';
import { toast } from '@/hooks/use-toast';

export type ComplianceStatus = 'draft' | 'pending_approval' | 'approved' | 'revoked' | 'expired';

export interface ComplianceDocument {
  id?: string;
  title: string;
  description?: string;
  documentType: string;
  filePath: string;
  version: string;
  status: ComplianceStatus;
  effectiveDate?: string;
  expiryDate?: string;
  ownerId?: string;
  approvedBy?: string;
  approvalDate?: string;
  createdAt?: string;
  updatedAt?: string;
  metadata?: Record<string, any>;
}

export interface ComplianceAcknowledgement {
  id?: string;
  documentId: string;
  userId: string;
  acknowledgedAt: string;
  ipAddress?: string;
  userAgent?: string;
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

class ComplianceService {
  // Get all compliance documents
  async getDocuments(filters: {
    documentType?: string;
    status?: ComplianceStatus;
    ownerId?: string;
    effectiveAfter?: string;
    effectiveBefore?: string;
    expiryAfter?: string;
    expiryBefore?: string;
  } = {}): Promise<ComplianceDocument[]> {
    try {
      let query = supabase
        .from('compliance_documents')
        .select('*')
        .order('created_at', { ascending: false });
      
      // Apply filters
      if (filters.documentType) {
        query = query.eq('document_type', filters.documentType);
      }
      
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      
      if (filters.ownerId) {
        query = query.eq('owner_id', filters.ownerId);
      }
      
      if (filters.effectiveAfter) {
        query = query.gte('effective_date', filters.effectiveAfter);
      }
      
      if (filters.effectiveBefore) {
        query = query.lte('effective_date', filters.effectiveBefore);
      }
      
      if (filters.expiryAfter) {
        query = query.gte('expiry_date', filters.expiryAfter);
      }
      
      if (filters.expiryBefore) {
        query = query.lte('expiry_date', filters.expiryBefore);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Convert from snake_case to camelCase and ensure type safety
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
        metadata: safeJsonToRecord(doc.metadata)
      }));
    } catch (error) {
      console.error('Failed to fetch compliance documents:', error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Get a single compliance document by ID
  async getDocument(id: string): Promise<ComplianceDocument> {
    try {
      const { data, error } = await supabase
        .from('compliance_documents')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      // Convert to camelCase
      return {
        id: data.id,
        title: data.title,
        description: data.description,
        documentType: data.document_type,
        filePath: data.file_path,
        version: data.version,
        status: data.status as ComplianceStatus,
        effectiveDate: data.effective_date,
        expiryDate: data.expiry_date,
        ownerId: data.owner_id,
        approvedBy: data.approved_by,
        approvalDate: data.approval_date,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        metadata: safeJsonToRecord(data.metadata)
      };
    } catch (error) {
      console.error(`Failed to fetch compliance document with ID ${id}:`, error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Create a new compliance document
  async createDocument(document: Omit<ComplianceDocument, 'id' | 'createdAt' | 'updatedAt'>): Promise<ComplianceDocument> {
    try {
      // Get current user for audit
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;
      
      const { data, error } = await supabase
        .from('compliance_documents')
        .insert([{
          title: document.title,
          description: document.description,
          document_type: document.documentType,
          file_path: document.filePath,
          version: document.version,
          status: document.status,
          effective_date: document.effectiveDate,
          expiry_date: document.expiryDate,
          owner_id: document.ownerId || userId,
          approved_by: document.approvedBy,
          approval_date: document.approvalDate,
          metadata: document.metadata || {}
        }])
        .select()
        .single();
      
      if (error) throw error;
      
      // Convert response to camelCase
      const createdDocument: ComplianceDocument = {
        id: data.id,
        title: data.title,
        description: data.description,
        documentType: data.document_type,
        filePath: data.file_path,
        version: data.version,
        status: data.status as ComplianceStatus,
        effectiveDate: data.effective_date,
        expiryDate: data.expiry_date,
        ownerId: data.owner_id,
        approvedBy: data.approved_by,
        approvalDate: data.approval_date,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        metadata: safeJsonToRecord(data.metadata)
      };
      
      // Log document creation in audit trail
      await auditService.logAction(
        'document_created',
        'compliance_documents',
        createdDocument.id,
        null,
        createdDocument
      );
      
      return createdDocument;
    } catch (error) {
      console.error('Failed to create compliance document:', error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Update a compliance document
  async updateDocument(id: string, updates: Partial<ComplianceDocument>): Promise<ComplianceDocument> {
    try {
      // First get the current document state for audit
      const original = await this.getDocument(id);
      
      // Prepare update object with snake_case
      const updateData: Record<string, any> = {};
      
      if ('title' in updates) updateData.title = updates.title;
      if ('description' in updates) updateData.description = updates.description;
      if ('documentType' in updates) updateData.document_type = updates.documentType;
      if ('filePath' in updates) updateData.file_path = updates.filePath;
      if ('version' in updates) updateData.version = updates.version;
      if ('status' in updates) updateData.status = updates.status;
      if ('effectiveDate' in updates) updateData.effective_date = updates.effectiveDate;
      if ('expiryDate' in updates) updateData.expiry_date = updates.expiryDate;
      if ('ownerId' in updates) updateData.owner_id = updates.ownerId;
      if ('approvedBy' in updates) updateData.approved_by = updates.approvedBy;
      if ('approvalDate' in updates) updateData.approval_date = updates.approvalDate;
      if ('metadata' in updates && updates.metadata) updateData.metadata = updates.metadata;
      
      const { data, error } = await supabase
        .from('compliance_documents')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      // Convert response to camelCase
      const updatedDocument: ComplianceDocument = {
        id: data.id,
        title: data.title,
        description: data.description,
        documentType: data.document_type,
        filePath: data.file_path,
        version: data.version,
        status: data.status as ComplianceStatus,
        effectiveDate: data.effective_date,
        expiryDate: data.expiry_date,
        ownerId: data.owner_id,
        approvedBy: data.approved_by,
        approvalDate: data.approval_date,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        metadata: safeJsonToRecord(data.metadata)
      };
      
      // Log document update in audit trail
      await auditService.logAction(
        'document_updated',
        'compliance_documents',
        updatedDocument.id,
        original,
        updatedDocument
      );
      
      return updatedDocument;
    } catch (error) {
      console.error(`Failed to update compliance document with ID ${id}:`, error);
      throw new Error(getErrorMessage(error));
    }
  }
  
  // Record a user acknowledgement of a document
  async recordAcknowledgement(documentId: string): Promise<void> {
    try {
      // Get current user
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;
      
      if (!userId) {
        throw new Error('User must be authenticated to acknowledge documents');
      }
      
      // Get IP address and user agent 
      const ipAddress = sessionStorage.getItem('client_ip') || 'unknown';
      const userAgent = navigator.userAgent;
      
      const { error } = await supabase
        .from('compliance_acknowledgements')
        .insert([{
          document_id: documentId,
          user_id: userId,
          ip_address: ipAddress,
          user_agent: userAgent
        }]);
      
      if (error) {
        // Handle unique constraint violation - user already acknowledged
        if (error.code === '23505') {
          console.log('User has already acknowledged this document');
          return;
        }
        throw error;
      }
      
      // Log acknowledgement in audit trail
      await auditService.logAction(
        'document_acknowledged',
        'compliance_acknowledgements',
        documentId,
        null,
        { documentId, userId, timestamp: new Date().toISOString() }
      );
    } catch (error) {
      console.error('Failed to record document acknowledgement:', error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Check if a user has acknowledged a document
  async hasAcknowledged(documentId: string, userId?: string): Promise<boolean> {
    try {
      // If userId not provided, use current user
      let userIdToCheck: string | undefined = userId;
      
      if (!userIdToCheck) {
        const { data: userData } = await supabase.auth.getUser();
        userIdToCheck = userData?.user?.id;
        
        if (!userIdToCheck) {
          throw new Error('User ID required to check acknowledgement');
        }
      }
      
      const { data, error } = await supabase
        .from('compliance_acknowledgements')
        .select('id')
        .eq('document_id', documentId)
        .eq('user_id', userIdToCheck)
        .maybeSingle();
      
      if (error) throw error;
      
      return !!data;
    } catch (error) {
      console.error('Failed to check document acknowledgement status:', error);
      throw new Error(getErrorMessage(error));
    }
  }

  /**
   * Get documents that are expiring soon
   * @param daysThreshold Number of days to consider as "expiring soon"
   * @param entityType Type of entity to filter documents for ('carrier', 'driver', or 'all')
   * @returns Array of documents expiring within the specified threshold
   */
  async getExpiringDocuments(
    daysThreshold: number = 30, 
    entityType: 'carrier' | 'driver' | 'all' = 'all'
  ): Promise<ComplianceDocument[]> {
    try {
      // Calculate the date threshold
      const today = new Date();
      const thresholdDate = new Date();
      thresholdDate.setDate(today.getDate() + daysThreshold);
      
      // Format dates for Supabase query
      const todayFormatted = today.toISOString().split('T')[0];
      const thresholdFormatted = thresholdDate.toISOString().split('T')[0];
      
      // Use withSupabaseRetry for automatic retry with exponential backoff
      return await withSupabaseRetry(async () => {
        let query = supabase
          .from('compliance_documents')
          .select('*')
          .gte('expiry_date', todayFormatted)
          .lte('expiry_date', thresholdFormatted)
          .order('expiry_date', { ascending: true });
        
        // Filter by entity type if specified
        if (entityType !== 'all') {
          query = query.eq('document_type', entityType === 'carrier' ? 'carrier_document' : 'driver_document');
        }
        
        const { data, error } = await query;
        
        if (error) {
          throw error;
        }
        
        // Transform the data to match our interface
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
          metadata: doc.metadata ? JSON.parse(JSON.stringify(doc.metadata)) : null
        }));
      }, 3, 2000); // 3 retries with 2s base delay
    } catch (error) {
      console.error('Failed to fetch expiring documents:', error);
      return [];
    }
  }

  /**
   * Find documents that have already expired
   * @returns Array of expired documents
   */
  async getExpiredDocuments(): Promise<ComplianceDocument[]> {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('compliance_documents')
        .select('*')
        .lt('expiry_date', today)
        .order('expiry_date', { ascending: false });
      
      if (error) throw error;
      
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
        metadata: safeJsonToRecord(doc.metadata)
      }));
    } catch (error) {
      console.error('Failed to fetch expired documents:', error);
      throw new Error(getErrorMessage(error));
    }
  }

  /**
   * Get carrier documents that are expiring soon
   * @param carrierId ID of the carrier to check documents for
   * @param daysThreshold Number of days to consider as "expiring soon"
   * @returns Array of carrier documents expiring within the specified threshold
   */
  async getCarrierExpiringDocuments(carrierId: string, daysThreshold: number = 30): Promise<any[]> {
    try {
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
      throw new Error(getErrorMessage(error));
    }
  }

  /**
   * Create alerts for expiring documents and send notifications
   * @param threshold Number of days to consider as alert thresholds
   * @returns Array of created alerts
   */
  async createComplianceAlerts(thresholds: number[] = [7, 30, 60]): Promise<ComplianceDocument[]> {
    try {
      const allExpiringDocs: ComplianceDocument[] = [];
      
      // Process each threshold
      for (const days of thresholds) {
        const expiringDocs = await this.getExpiringDocuments(days);
        allExpiringDocs.push(...expiringDocs);
        
        // Group documents by expiry date for better notification management
        const documentsByExpiry: Record<string, ComplianceDocument[]> = {};
        
        expiringDocs.forEach(doc => {
          const expiryDate = doc.expiryDate || '';
          if (!documentsByExpiry[expiryDate]) {
            documentsByExpiry[expiryDate] = [];
          }
          documentsByExpiry[expiryDate].push(doc);
        });
        
        // Log alerts for each expiry date group
        for (const [expiryDate, documents] of Object.entries(documentsByExpiry)) {
          // In a real implementation, this would call a notification service
          console.log(`COMPLIANCE ALERT: ${documents.length} documents expiring on ${expiryDate}`);
          console.log(`Severity: ${days <= 7 ? 'high' : days <= 30 ? 'medium' : 'low'}`);
          console.log(`Documents: ${documents.map(d => d.id).join(', ')}`);
          
          // In a future implementation, this would also create records in a 'compliance_alerts' table
          // and potentially send notifications through a notification service
        }
      }
      
      // Return all expiring documents
      return allExpiringDocs;
    } catch (error) {
      console.error('Failed to create compliance alerts:', error);
      throw new Error(getErrorMessage(error));
    }
  }

  /**
   * Check if a carrier has all required compliance documents valid
   * @param carrierId ID of the carrier to check
   * @returns Result object with compliance status
   */
  async checkCarrierCompliance(carrierId: string): Promise<{
    isCompliant: boolean;
    missingDocuments: string[];
    expiringDocuments: any[];
    expiredDocuments: any[];
  }> {
    try {
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
      
      return {
        isCompliant,
        missingDocuments,
        expiringDocuments,
        expiredDocuments
      };
    } catch (error) {
      console.error(`Failed to check compliance for carrier ${carrierId}:`, error);
      throw new Error(getErrorMessage(error));
    }
  }
}

export const complianceService = new ComplianceService();
