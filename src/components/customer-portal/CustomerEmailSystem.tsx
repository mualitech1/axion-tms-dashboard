
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Send } from 'lucide-react';
import { Customer } from '@/types/customer';
import { toast } from "@/hooks/use-toast";
import AutomatedStatusUpdates from './AutomatedStatusUpdates';

interface CustomerEmailSystemProps {
  customer: Customer;
}

export default function CustomerEmailSystem({ customer }: CustomerEmailSystemProps) {
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailTemplateType, setEmailTemplateType] = useState<string>("custom");
  const [activeTab, setActiveTab] = useState<string>("manual");

  const emailTemplates = {
    custom: { subject: "", message: "" },
    update: { 
      subject: "Important Account Update - Action Required", 
      message: `Dear ${customer.name},\n\nWe are writing to inform you about important updates to your account. Please review and take necessary actions.\n\nRegards,\nAccount Management Team`
    },
    invoice: { 
      subject: "New Invoice Available", 
      message: `Dear ${customer.name},\n\nA new invoice has been generated for your account. Please review it at your earliest convenience.\n\nRegards,\nBilling Team` 
    },
    expiry: { 
      subject: "Document Expiry Notice", 
      message: `Dear ${customer.name},\n\nOne or more of your critical documents are approaching their expiry date. Please update them as soon as possible to avoid service interruption.\n\nRegards,\nCompliance Team` 
    }
  };

  const handleTemplateChange = (type: string) => {
    setEmailTemplateType(type);
    setSubject(emailTemplates[type as keyof typeof emailTemplates].subject);
    setMessage(emailTemplates[type as keyof typeof emailTemplates].message);
  };

  const handleSendEmail = async () => {
    if (!subject.trim()) {
      toast({
        title: "Missing subject",
        description: "Please enter an email subject.",
        variant: "destructive",
      });
      return;
    }

    if (!message.trim()) {
      toast({
        title: "Missing message",
        description: "Please enter an email message.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Email sent",
        description: `Email successfully sent to ${customer.email}`,
      });
      
      // Clear form after sending
      if (emailTemplateType === 'custom') {
        setSubject("");
        setMessage("");
      }
    }, 1500);
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid grid-cols-2 w-full">
        <TabsTrigger value="manual">Manual Email</TabsTrigger>
        <TabsTrigger value="automated">Automated Updates</TabsTrigger>
      </TabsList>
      
      <TabsContent value="manual">
        <Card>
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-50 rounded-full">
                <Mail className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold">Email Communication</CardTitle>
                <CardDescription>Send email communications to {customer.name}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <div className="text-sm font-medium">Email Templates</div>
              <div className="flex gap-2 flex-wrap">
                {Object.keys(emailTemplates).map((type) => (
                  <Button 
                    key={type} 
                    variant={type === emailTemplateType ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => handleTemplateChange(type)}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="recipient" className="text-sm font-medium">Recipient</label>
              <Input 
                id="recipient" 
                value={customer.email} 
                readOnly 
                disabled
                className="bg-gray-50"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">Subject</label>
              <Input 
                id="subject" 
                value={subject} 
                onChange={(e) => setSubject(e.target.value)} 
                placeholder="Enter email subject"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <Textarea 
                id="message" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="Enter your message"
                rows={6}
              />
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button onClick={handleSendEmail} disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Email"}
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="automated">
        <AutomatedStatusUpdates customer={customer} />
      </TabsContent>
    </Tabs>
  );
}
