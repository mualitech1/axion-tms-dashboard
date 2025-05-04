
import { supabase } from '@/integrations/supabase/client';
import { getErrorMessage } from '@/utils/error-handler';
import { auditService } from './audit-service';

export interface ComplianceDocument {
  id?: string;
  title: string;
  description?: string;
  documentType: string;
  filePath: string;
  version: string;
  status: 'draft' | 'pending_approval' | 'approved' | 'expired' | 'revoked';
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

// Helper function to get client IP
function getClientIP(): string {
  return sessionStorage.getItem('client_ip') || 'unknown';
}

// Helper function to get device info
function getDeviceInfo(): string {
  return navigator.userAgent;
}

// Service for handling compliance documents and acknowledgements
class ComplianceService {
  // Get all compliance documents with filtering
  async getComplianceDocuments(filters?: {
    documentType?: string;
    status?: string;
    ownerId?: string;
    effectiveAfter?: string;
    effectiveBefore?: string;
    expiredAfter?: string;
    expiredBefore?: string;
  }): Promise<ComplianceDocument[]> {
    try {
      let query = supabase
        .from('compliance_documents')
        .select('*')
        .order('created_at', { ascending: false });
      
      // Apply filters if provided
      if (filters) {
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
        
        if (filters.expiredAfter) {
          query = query.gte('expiry_date', filters.expiredAfter);
        }
        
        if (filters.expiredBefore) {
          query = query.lte('expiry_date', filters.expiredBefore);
        }
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Map database fields to camelCase for frontend use
      return data.map(doc => ({
        id: doc.id,
        title: doc.title,
        description: doc.description,
        documentType: doc.document_type,
        filePath: doc.file_path,
        version: doc.version,
        status: doc.status,
        effectiveDate: doc.effective_date,
        expiryDate: doc.expiry_date,
        ownerId: doc.owner_id,
        approvedBy: doc.approved_by,
        approvalDate: doc.approval_date,
        createdAt: doc.created_at,
        updatedAt: doc.updated_at,
        metadata: doc.metadata
      }));
    } catch (error) {
      console.error('Failed to fetch compliance documents:', error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Get a single compliance document by ID
  async getComplianceDocumentById(id: string): Promise<ComplianceDocument> {
    try {
      const { data, error } = await supabase
        .from('compliance_documents')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      return {
        id: data.id,
        title: data.title,
        description: data.description,
        documentType: data.document_type,
        filePath: data.file_path,
        version: data.version,
        status: data.status,
        effectiveDate: data.effective_date,
        expiryDate: data.expiry_date,
        ownerId: data.owner_id,
        approvedBy: data.approved_by,
        approvalDate: data.approval_date,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        metadata: data.metadata
      };
    } catch (error) {
      console.error(`Failed to fetch compliance document with ID ${id}:`, error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Create a new compliance document
  async createComplianceDocument(document: Omit<ComplianceDocument, 'id' | 'createdAt' | 'updatedAt'>): Promise<ComplianceDocument> {
    try {
      // Get current user for ownership
      const { data: userData } = await supabase.auth.getUser();
      const ownerId = document.ownerId || userData?.user?.id;
      
      const dbDocument = {
        title: document.title,
        description: document.description,
        document_type: document.documentType,
        file_path: document.filePath,
        version: document.version,
        status: document.status,
        effective_date: document.effectiveDate,
        expiry_date: document.expiryDate,
        owner_id: ownerId,
        approved_by: document.approvedBy,
        approval_date: document.approvalDate,
        metadata: document.metadata || {}
      };
      
      const { data, error } = await supabase
        .from('compliance_documents')
        .insert([dbDocument])
        .select();
      
      if (error) throw error;
      
      const createdDoc = {
        id: data[0].id,
        title: data[0].title,
        description: data[0].description,
        documentType: data[0].document_type,
        filePath: data[0].file_path,
        version: data[0].version,
        status: data[0].status,
        effectiveDate: data[0].effective_date,
        expiryDate: data[0].expiry_date,
        ownerId: data[0].owner_id,
        approvedBy: data[0].approved_by,
        approvalDate: data[0].approval_date,
        createdAt: data[0].created_at,
        updatedAt: data[0].updated_at,
        metadata: data[0].metadata
      };
      
      // Log document creation
      await auditService.logAction(
        'compliance_document_created',
        'compliance_documents',
        createdDoc.id,
        null,
        createdDoc
      );
      
      return createdDoc;
    } catch (error) {
      console.error('Failed to create compliance document:', error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Update an existing compliance document
  async updateComplianceDocument(id: string, updates: Partial<ComplianceDocument>): Promise<ComplianceDocument> {
    try {
      // Get current document for audit
      const { data: oldDoc } = await supabase
        .from('compliance_documents')
        .select('*')
        .eq('id', id)
        .single();
      
      // Prepare updates in snake_case for the DB
      const dbUpdates: Record<string, any> = {};
      
      if (updates.title !== undefined) dbUpdates.title = updates.title;
      if (updates.description !== undefined) dbUpdates.description = updates.description;
      if (updates.documentType !== undefined) dbUpdates.document_type = updates.documentType;
      if (updates.filePath !== undefined) dbUpdates.file_path = updates.filePath;
      if (updates.version !== undefined) dbUpdates.version = updates.version;
      if (updates.status !== undefined) dbUpdates.status = updates.status;
      if (updates.effectiveDate !== undefined) dbUpdates.effective_date = updates.effectiveDate;
      if (updates.expiryDate !== undefined) dbUpdates.expiry_date = updates.expiryDate;
      if (updates.approvedBy !== undefined) dbUpdates.approved_by = updates.approvedBy;
      if (updates.approvalDate !== undefined) dbUpdates.approval_date = updates.approvalDate;
      if (updates.metadata !== undefined) dbUpdates.metadata = updates.metadata;
      
      // Update the document
      const { data, error } = await supabase
        .from('compliance_documents')
        .update(dbUpdates)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      
      const updatedDoc = {
        id: data[0].id,
        title: data[0].title,
        description: data[0].description,
        documentType: data[0].document_type,
        filePath: data[0].file_path,
        version: data[0].version,
        status: data[0].status,
        effectiveDate: data[0].effective_date,
        expiryDate: data[0].expiry_date,
        ownerId: data[0].owner_id,
        approvedBy: data[0].approved_by,
        approvalDate: data[0].approval_date,
        createdAt: data[0].created_at,
        updatedAt: data[0].updated_at,
        metadata: data[0].metadata
      };
      
      // Log document update
      await auditService.logAction(
        'compliance_document_updated',
        'compliance_documents',
        id,
        oldDoc,
        updatedDoc
      );
      
      return updatedDoc;
    } catch (error) {
      console.error(`Failed to update compliance document with ID ${id}:`, error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Approve a compliance document
  async approveDocument(documentId: string): Promise<ComplianceDocument> {
    try {
      // Get current user
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) throw new Error('User not authenticated');
      
      // Update document status
      const updates = {
        status: 'approved' as const,
        approved_by: userData.user.id,
        approval_date: new Date().toISOString()
      };
      
      const { data, error } = await supabase
        .from('compliance_documents')
        .update(updates)
        .eq('id', documentId)
        .select();
      
      if (error) throw error;
      
      // Log approval
      await auditService.logAction(
        'compliance_document_approved',
        'compliance_documents',
        documentId,
        { status: 'pending_approval' },
        { status: 'approved', approved_by: userData.user.id }
      );
      
      return {
        id: data[0].id,
        title: data[0].title,
        description: data[0].description,
        documentType: data[0].document_type,
        filePath: data[0].file_path,
        version: data[0].version,
        status: data[0].status,
        effectiveDate: data[0].effective_date,
        expiryDate: data[0].expiry_date,
        ownerId: data[0].owner_id,
        approvedBy: data[0].approved_by,
        approvalDate: data[0].approval_date,
        createdAt: data[0].created_at,
        updatedAt: data[0].updated_at,
        metadata: data[0].metadata
      };
    } catch (error) {
      console.error(`Failed to approve document with ID ${documentId}:`, error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Acknowledge a document as read/understood
  async acknowledgeDocument(documentId: string): Promise<void> {
    try {
      // Get current user
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) throw new Error('User not authenticated');
      
      const acknowledgement = {
        document_id: documentId,
        user_id: userData.user.id,
        ip_address: getClientIP(),
        user_agent: getDeviceInfo()
      };
      
      const { error } = await supabase
        .from('compliance_acknowledgements')
        .insert([acknowledgement]);
      
      if (error) throw error;
      
      // Log acknowledgement
      await auditService.logAction(
        'compliance_document_acknowledged',
        'compliance_acknowledgements',
        undefined,
        null,
        { document_id: documentId, user_id: userData.user.id }
      );
    } catch (error) {
      console.error(`Failed to acknowledge document with ID ${documentId}:`, error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Check if a user has acknowledged a document
  async hasUserAcknowledged(documentId: string, userId?: string): Promise<boolean> {
    try {
      // Use provided userId or get current user
      let userToCheck: string;
      
      if (userId) {
        userToCheck = userId;
      } else {
        const { data: userData } = await supabase.auth.getUser();
        if (!userData?.user) throw new Error('User not authenticated');
        userToCheck = userData.user.id;
      }
      
      const { data, error } = await supabase
        .from('compliance_acknowledgements')
        .select('id')
        .eq('document_id', documentId)
        .eq('user_id', userToCheck)
        .maybeSingle();
      
      if (error) throw error;
      return !!data;
    } catch (error) {
      console.error(`Failed to check acknowledgement for document ${documentId}:`, error);
      return false;
    }
  }

  // Get all users who have acknowledged a document
  async getDocumentAcknowledgements(documentId: string): Promise<ComplianceAcknowledgement[]> {
    try {
      const { data, error } = await supabase
        .from('compliance_acknowledgements')
        .select('*')
        .eq('document_id', documentId)
        .order('acknowledged_at', { ascending: false });
      
      if (error) throw error;
      
      return data.map(ack => ({
        id: ack.id,
        documentId: ack.document_id,
        userId: ack.user_id,
        acknowledgedAt: ack.acknowledged_at,
        ipAddress: ack.ip_address,
        userAgent: ack.user_agent
      }));
    } catch (error) {
      console.error(`Failed to get acknowledgements for document ${documentId}:`, error);
      throw new Error(getErrorMessage(error));
    }
  }
}

export const complianceService = new ComplianceService();
