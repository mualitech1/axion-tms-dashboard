
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { useEmailIntegration } from '@/hooks/use-email-integration';
import { Lead } from '../data/pipelineTypes';

interface EmailProvider {
  name: string;
  type: 'gmail' | 'outlook' | 'smtp';
  icon: string;
}

const providers: EmailProvider[] = [
  {
    name: 'Gmail',
    type: 'gmail',
    icon: 'google'
  },
  {
    name: 'Outlook',
    type: 'outlook',
    icon: 'microsoft'
  },
  {
    name: 'Custom SMTP',
    type: 'smtp',
    icon: 'mail'
  }
];

interface UseEnhancedEmailIntegrationProps {
  onEmailSent?: (emailData: any) => void;
}

export const useEnhancedEmailIntegration = (props?: UseEnhancedEmailIntegrationProps) => {
  const baseEmailIntegration = useEmailIntegration();
  const [activeProvider, setActiveProvider] = useState<EmailProvider | null>(null);
  const [emailHistory, setEmailHistory] = useState<any[]>([]);
  const [emailTemplates, setEmailTemplates] = useState<any[]>(baseEmailIntegration.templates);
  
  // Connect to an email provider
  const connectProvider = async (providerType: 'gmail' | 'outlook' | 'smtp', config?: any) => {
    try {
      // Show connecting state
      toast({
        title: "Connecting to email provider",
        description: `Establishing connection to ${providerType}...`,
      });
      
      let success = false;
      
      if (providerType === 'gmail' || providerType === 'outlook') {
        // Simulating OAuth flow for Gmail/Outlook
        window.open(`https://example.com/auth/${providerType}`, '_blank');
        
        // This would normally happen after OAuth redirect
        success = await new Promise(resolve => {
          setTimeout(() => resolve(true), 2000);
        });
      } else if (providerType === 'smtp') {
        // Configure SMTP server
        success = await baseEmailIntegration.configureEmailProvider('smtp', config || {
          host: 'smtp.example.com',
          port: '587',
          username: 'user@example.com'
        });
      }
      
      if (success) {
        const provider = providers.find(p => p.type === providerType) || providers[2];
        setActiveProvider(provider);
        
        toast({
          title: "Email provider connected",
          description: `Successfully connected to ${provider.name}`,
        });
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error connecting to email provider:', error);
      toast({
        title: "Connection failed",
        description: `Failed to connect to ${providerType}`,
        variant: "destructive"
      });
      return false;
    }
  };
  
  // Send an email with enhanced tracking and history
  const sendEmail = async (emailData: any): Promise<boolean> => {
    if (!baseEmailIntegration.isConfigured) {
      toast({
        title: "Email provider not configured",
        description: "Please connect an email provider first",
        variant: "destructive"
      });
      return false;
    }
    
    try {
      const result = await baseEmailIntegration.sendEmail(emailData);
      
      if (result) {
        // Add to email history
        const historyEntry = {
          id: `email-${Date.now()}`,
          subject: emailData.subject,
          to: emailData.to,
          sentAt: new Date().toISOString(),
          status: 'sent',
        };
        
        setEmailHistory(prev => [historyEntry, ...prev]);
        
        if (props?.onEmailSent) {
          props.onEmailSent(emailData);
        }
      }
      
      return result;
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Failed to send email",
        description: "An error occurred while sending the email",
        variant: "destructive"
      });
      return false;
    }
  };
  
  // Send a templated email for common scenarios
  const sendTemplatedEmail = async (
    templateId: string,
    lead: Lead,
    customData?: Record<string, string>
  ): Promise<boolean> => {
    const template = emailTemplates.find(t => t.id === templateId);
    
    if (!template) {
      toast({
        title: "Template not found",
        description: "The requested email template could not be found",
        variant: "destructive"
      });
      return false;
    }
    
    // Replace template variables with lead data
    let subject = template.subject;
    let body = template.body;
    
    // Replace standard variables
    const replacements: Record<string, string> = {
      name: lead.contact,
      company: lead.company,
      title: lead.title || '',
      ...customData
    };
    
    Object.entries(replacements).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      subject = subject.replace(regex, value);
      body = body.replace(regex, value);
    });
    
    return sendEmail({
      subject,
      body,
      to: [{ email: lead.email, name: lead.contact }],
      templateId
    });
  };
  
  // Create a new email template
  const createTemplate = (template: any) => {
    const newTemplate = {
      ...template,
      id: `template-${Date.now()}`
    };
    
    setEmailTemplates(prev => [...prev, newTemplate]);
    return newTemplate;
  };
  
  // Load emails related to a specific lead
  const loadLeadEmails = async (leadId: string): Promise<any[]> => {
    console.log(`Loading emails for lead ${leadId}`);
    
    // In a real app, this would fetch emails from the connected provider
    return new Promise(resolve => {
      setTimeout(() => {
        const mockLeadEmails = emailHistory.filter(email => 
          email.leadId === leadId || Math.random() > 0.7 // Just for demo purposes
        );
        resolve(mockLeadEmails);
      }, 800);
    });
  };
  
  return {
    ...baseEmailIntegration,
    providers,
    activeProvider,
    emailHistory,
    emailTemplates,
    connectProvider,
    sendEmail,
    sendTemplatedEmail,
    createTemplate,
    loadLeadEmails
  };
};
