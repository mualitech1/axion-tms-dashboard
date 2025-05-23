import { useState } from 'react';
import UserPageHeader from './components/UserPageHeader';
import UserContentSection from './components/UserContentSection';
import { userData } from './data/userData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import TwoFactorSetup from './components/TwoFactorSetup';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Shield, Settings } from 'lucide-react';

export default function UserPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [twoFactorDialogOpen, setTwoFactorDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
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
    <div className="animate-fade-in">
      <div className="flex flex-col space-y-6 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">User Management</h1>
            <p className="text-gray-600 mt-1">Manage system users and permissions</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="bg-white border-gray-300 text-gray-700">
              <Settings className="h-4 w-4 mr-2" />
              User Settings
            </Button>
            <Button variant="outline" className="bg-white border-gray-300 text-gray-700">
              <Shield className="h-4 w-4 mr-2" />
              Permissions
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleCreateUserClick}>
              Add User
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-gray-100">
            <TabsTrigger 
              value="all"
              className="data-[state=active]:bg-white data-[state=active]:shadow-none"
              onClick={() => setActiveTab('all')}
            >
              All Users
            </TabsTrigger>
            <TabsTrigger 
              value="active" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-none"
              onClick={() => setActiveTab('active')}
            >
              Active
            </TabsTrigger>
            <TabsTrigger 
              value="inactive" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-none"
              onClick={() => setActiveTab('inactive')}
            >
              Inactive
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <UserContentSection 
          userData={userData.filter(user => 
            activeTab === 'all' ? true : 
            activeTab === 'active' ? user.status === 'Active' : 
            user.status === 'Inactive'
          )} 
          onManage2FA={handleManage2FA}
        />
      </div>
      
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
  );
}
