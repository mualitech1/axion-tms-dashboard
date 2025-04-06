
import React, { useState } from 'react';
import { Customer } from '@/types/customer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Building, Users, Phone, Mail, Plus,
  User, Trash2, Star, StarOff
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomerContactsProps {
  customer: Customer;
}

const CONTACT_TYPES = [
  { id: 'primary', label: 'Primary Contact', icon: Star },
  { id: 'invoice', label: 'Invoice Contact', icon: Mail },
  { id: 'operations', label: 'Operations Contact', icon: Building },
];

const CustomerContacts = ({ customer }: CustomerContactsProps) => {
  const [activeType, setActiveType] = useState('primary');
  const [contacts, setContacts] = useState(customer.contacts || []);

  // Filter contacts by type
  const contactsByType = contacts.filter(contact => {
    if (activeType === 'primary' && contact.isPrimary) return true;
    if (activeType === 'invoice' && contact.role === 'Invoice') return true;
    if (activeType === 'operations' && contact.role === 'Operations') return true;
    return false;
  });

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
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      {contact.isPrimary ? (
                        <StarOff className="h-4 w-4" />
                      ) : (
                        <Star className="h-4 w-4" />
                      )}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
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
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add New Contact
            </Button>
          </div>
        )}
        
        {contactsByType.length > 0 && (
          <Button className="w-full mt-2">
            <Plus className="h-4 w-4 mr-1" />
            Add New Contact
          </Button>
        )}
      </div>
    </div>
  );
};

export default CustomerContacts;
