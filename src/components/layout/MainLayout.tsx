
import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function MainLayout({ children, title }: MainLayoutProps) {
  const isMobile = useIsMobile();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setIsSidebarCollapsed(true);
    }
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-tms-gray-100 flex">
      <Sidebar />
      
      <div className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        isMobile ? "ml-0" : (isSidebarCollapsed ? "ml-16" : "ml-64")
      )}>
        <Header title={title} />
        <main className="p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
