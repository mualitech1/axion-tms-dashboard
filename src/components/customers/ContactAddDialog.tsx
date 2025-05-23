import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Phone, Building } from 'lucide-react';
import { ContactPerson } from '@/types/customer';

interface ContactAddDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddContact: (contact: Omit<ContactPerson, 'id'>) => Promise<void>;
  customerId: string;
}

export default function ContactAddDialog({
  open,
  onOpenChange,
  onAddContact,
  customerId
}: ContactAddDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPrimary, setIsPrimary] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'General',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({ ...prev, role: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      await onAddContact({
        ...formData,
        isPrimary
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'General',
      });
      setIsPrimary(false);
      
      // Close dialog
      onOpenChange(false);
      
      toast({
        title: "Contact Added",
        description: "Contact has been added successfully",
      });
    } catch (error) {
      console.error("Error adding contact:", error);
      toast({
        title: "Error",
        description: "Failed to add contact. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add New Contact</DialogTitle>
          <DialogDescription>
            Add a new contact for this customer. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-medium">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <div className="flex">
              <div className="bg-muted p-2 flex items-center rounded-l-md">
                <User className="h-5 w-5 text-tms-blue" />
              </div>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="rounded-l-none"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="font-medium">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <div className="flex">
              <div className="bg-muted p-2 flex items-center rounded-l-md">
                <Mail className="h-5 w-5 text-tms-blue" />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="rounded-l-none"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="font-medium">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <div className="flex">
              <div className="bg-muted p-2 flex items-center rounded-l-md">
                <Phone className="h-5 w-5 text-tms-blue" />
              </div>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="rounded-l-none"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role" className="font-medium">Role</Label>
            <div className="flex">
              <div className="bg-muted p-2 flex items-center rounded-l-md">
                <Building className="h-5 w-5 text-tms-blue" />
              </div>
              <Select 
                value={formData.role} 
                onValueChange={handleRoleChange}
              >
                <SelectTrigger className="w-full rounded-l-none">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="Invoice">Invoice</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Management">Management</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 pt-2">
            <Switch 
              id="primary-contact" 
              checked={isPrimary}
              onCheckedChange={setIsPrimary}
            />
            <Label htmlFor="primary-contact">Set as primary contact</Label>
          </div>
          
          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding Contact..." : "Add Contact"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 