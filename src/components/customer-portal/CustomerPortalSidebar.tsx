
import { 
  LayoutDashboard, 
  UserCircle, 
  FileText, 
  Receipt, 
  TruckIcon,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface CustomerPortalSidebarProps {
  activeView: 'dashboard' | 'profile' | 'documents' | 'rates';
  setActiveView: React.Dispatch<React.SetStateAction<'dashboard' | 'profile' | 'documents' | 'rates'>>;
}

const CustomerPortalSidebar = ({ 
  activeView, 
  setActiveView 
}: CustomerPortalSidebarProps) => {
  const navigate = useNavigate();
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'My Profile', icon: UserCircle },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'rates', label: 'Rate Cards', icon: Receipt }
  ];
  
  const handleClick = (viewId: string) => {
    setActiveView(viewId as any);
    // Also update the URL to reflect the view
    navigate(`/customer-portal/${viewId}`);
  };
  
  return (
    <div className="bg-white dark:bg-indigo-950/20 rounded-lg shadow-sm p-4 sticky top-6">
      <nav className="space-y-2">
        {menuItems.map(item => (
          <Button
            key={item.id}
            variant={activeView === item.id ? "default" : "ghost"}
            size="sm"
            className="w-full justify-start text-left font-normal mb-1"
            onClick={() => handleClick(item.id)}
          >
            <item.icon className="h-4 w-4 mr-2" />
            {item.label}
          </Button>
        ))}
      </nav>

      <div className="border-t mt-4 pt-4">
        <Button variant="ghost" size="sm" className="w-full justify-start text-left font-normal mb-1">
          <TruckIcon className="h-4 w-4 mr-2" />
          Book Delivery
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start text-left font-normal mb-1">
          <HelpCircle className="h-4 w-4 mr-2" />
          Help & Support
        </Button>
      </div>

      <div className="border-t mt-4 pt-4">
        <Button variant="ghost" size="sm" className="w-full justify-start text-left font-normal text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default CustomerPortalSidebar;
