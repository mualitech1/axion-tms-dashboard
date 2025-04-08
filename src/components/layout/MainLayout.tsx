
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import PipelineSidebar from './PipelineSidebar';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function MainLayout({ children, title }: MainLayoutProps) {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const isPipelinePath = location.pathname.startsWith('/sales-pipeline');

  useEffect(() => {
    if (isMobile) {
      setIsSidebarCollapsed(true);
    }
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar />
      
      <div className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        isMobile ? "ml-0" : (isSidebarCollapsed ? "ml-16" : "ml-64")
      )}>
        <Header title={title} />
        
        <div className="flex">
          {isPipelinePath && !isMobile && <PipelineSidebar />}
          
          <main className={cn(
            "p-4 md:p-6 lg:p-8 flex-1",
            isPipelinePath && !isMobile && "border-l"
          )}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
