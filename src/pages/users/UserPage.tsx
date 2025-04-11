
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import UserPageHeader from './components/UserPageHeader';
import UserContentSection from './components/UserContentSection';
import { userData } from './data/userData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import TwoFactorSetup from './components/TwoFactorSetup';
import { useToast } from '@/hooks/use-toast';

export default function UserPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [twoFactorDialogOpen, setTwoFactorDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleCreateUserClick = () => {
    setCreateDialogOpen(true);
  };
  
  const handleManage2FA = (userId: string) => {
    setSelectedUser(userId);
    setTwoFactorDialogOpen(true);
  };
  
  const handle2FAComplete = (enabled: boolean) => {
    if (selectedUser) {
      toast({
        title: enabled ? "2FA Enabled" : "2FA Disabled",
        description: `Two-factor authentication has been ${enabled ? 'enabled' : 'disabled'} for this user.`,
      });
    }
    setTwoFactorDialogOpen(false);
  };
  
  return (
    <MainLayout title="User Management">
      <div className="animate-fade-in">
        <UserPageHeader onCreateUserClick={handleCreateUserClick} />
        <UserContentSection 
          userData={userData} 
          onManage2FA={handleManage2FA}
        />
        
        <Dialog open={twoFactorDialogOpen} onOpenChange={setTwoFactorDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Manage Two-Factor Authentication</DialogTitle>
              <DialogDescription>
                Enable or disable two-factor authentication for this user account.
              </DialogDescription>
            </DialogHeader>
            <TwoFactorSetup 
              onComplete={handle2FAComplete}
              initialState={selectedUser ? Math.random() > 0.5 : false} // Mock data - in real app, check if user has 2FA enabled
            />
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
