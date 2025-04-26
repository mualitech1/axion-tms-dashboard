
import { Menu, X } from 'lucide-react';

interface MobileMenuProps {
  isMobileOpen: boolean;
  toggleSidebar: () => void;
}

export const MobileMenu = ({ isMobileOpen, toggleSidebar }: MobileMenuProps) => {
  return (
    <>
      <button 
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-full shadow-md text-tms-gray-600 hover:text-tms-blue transition-colors duration-200"
      >
        <Menu className="h-5 w-5" />
      </button>

      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-xs z-40"
          onClick={() => toggleSidebar()}
        />
      )}
    </>
  );
};
