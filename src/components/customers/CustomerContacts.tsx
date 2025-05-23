import React, { useState } from 'react';
import { Customer, ContactPerson } from '@/types/customer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Building, Users, Phone, Mail, Plus,
  User, Trash2, Star, StarOff
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import ContactAddDialog from './ContactAddDialog';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Database } from '@/integrations/supabase/types';

interface CustomerContactsProps {
  customer: Customer;
}

const CONTACT_TYPES = [
  { id: 'primary', label: 'Primary Contact', icon: Star },
  { id: 'invoice', label: 'Invoice Contact', icon: Mail },
  { id: 'operations', label: 'Operations Contact', icon: Building },
];

const CustomerContacts = ({ customer }: CustomerContactsProps) => {
  const supabase = useSupabaseClient<Database>();
  const { toast } = useToast();
  const [activeType, setActiveType] = useState('primary');
  const [contacts, setContacts] = useState(customer.contacts || []);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Filter contacts by type
  const contactsByType = contacts.filter(contact => {
    if (activeType === 'primary' && contact.isPrimary) return true;
    if (activeType === 'invoice' && contact.role === 'Invoice') return true;
    if (activeType === 'operations' && contact.role === 'Operations') return true;
    return false;
  });

  // Handle adding a new contact
  const handleAddContact = async (newContact: Omit<ContactPerson, 'id'>) => {
    setIsLoading(true);

    try {
      // If this is a primary contact, need to update any existing primary contact
      if (newContact.isPrimary) {
        // First update any existing primary contacts to non-primary
        const updatedContacts = contacts.map(c => ({
          ...c,
          isPrimary: false,
        }));
        setContacts(updatedContacts);
      }

      // Create a new ID for the contact (in production this would come from the backend)
      const newId = `contact_${Date.now()}`;
      
      // Add the new contact to the local state
      const contactWithId: ContactPerson = {
        id: newId,
        ...newContact,
      };
      
      setContacts([...contacts, contactWithId]);
      
      // In a real app, we would save this to the database
      // Here we'll simulate it with a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Here's how the Supabase call would look:
      /*
      const { data, error } = await supabase
        .from('contacts')
        .insert([
          {
            customer_id: customer.id,
            name: newContact.name,
            email: newContact.email,
            phone: newContact.phone,
            role: newContact.role,
            is_primary: newContact.isPrimary,
          }
        ])
        .select();
        
      if (error) throw error;
      */
      
      toast({
        title: "Contact Added",
        description: `${newContact.name} has been added as a contact.`,
      });
    } catch (error) {
      console.error("Error adding contact:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add contact. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle a contact's primary status
  const togglePrimaryStatus = (contactId: string) => {
    const updatedContacts = contacts.map(contact => {
      // If this is the contact we're toggling
      if (contact.id === contactId) {
        // If it's already primary, make it non-primary
        if (contact.isPrimary) {
          return { ...contact, isPrimary: false };
        }
        // Otherwise make it primary and make all others non-primary
        return { ...contact, isPrimary: true };
      }
      
      // If we're setting a new primary, make all others non-primary
      if (!contacts.find(c => c.id === contactId)?.isPrimary) {
        return { ...contact, isPrimary: false };
      }
      
      return contact;
    });
    
    setContacts(updatedContacts);
    
    // In a real app, update the database via API call
  };

  // Delete a contact
  const deleteContact = (contactId: string) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      setContacts(contacts.filter(c => c.id !== contactId));
      
      toast({
        title: "Contact Deleted",
        description: "The contact has been removed.",
      });
      
      // In a real app, delete from the database via API call
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {CONTACT_TYPES.map((type) => (
          <Button
            key={type.id}
            variant={activeType === type.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveType(type.id)}
            className="flex items-center gap-2"
          >
            <type.icon className="h-4 w-4" />
            {type.label}
          </Button>
        ))}
      </div>
      
      <div className="space-y-4">
        {contactsByType.length > 0 ? (
          contactsByType.map((contact) => (
            <Card key={contact.id} className={cn("transition-all", 
              contact.isPrimary ? "border-tms-blue border-2" : ""
            )}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="bg-tms-gray-100 rounded-full p-2">
                      <User className="h-5 w-5 text-tms-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium flex items-center gap-1">
                        {contact.name}
                        {contact.isPrimary && (
                          <Star className="h-4 w-4 text-tms-blue fill-tms-blue" />
                        )}
                      </h4>
                      <p className="text-sm text-muted-foreground">{contact.role}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mt-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          {contact.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          {contact.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => togglePrimaryStatus(contact.id)}
                      title={contact.isPrimary ? "Remove primary status" : "Make primary contact"}
                    >
                      {contact.isPrimary ? (
                        <StarOff className="h-4 w-4" />
                      ) : (
                        <Star className="h-4 w-4" />
                      )}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-red-500"
                      onClick={() => deleteContact(contact.id)}
                      title="Delete contact"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-6 border border-dashed border-gray-300 rounded-md">
            <User className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <h4 className="text-muted-foreground font-medium mb-1">No contacts found</h4>
            <p className="text-sm text-muted-foreground mb-3">
              There are no {activeType === 'primary' ? 'primary' : activeType} contacts for this customer.
            </p>
            <Button size="sm" onClick={() => setAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-1" />
              Add New Contact
            </Button>
          </div>
        )}
        
        {contactsByType.length > 0 && (
          <Button 
            className="w-full mt-2"
            onClick={() => setAddDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add New Contact
          </Button>
        )}
      </div>

      <ContactAddDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onAddContact={handleAddContact}
        customerId={customer.id}
      />
    </div>
  );
};

export default CustomerContacts;
