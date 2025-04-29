
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Users, Star, Clock } from 'lucide-react';

interface CustomerFiltersProps {
  activeFilter: string;
  totalCustomers: number;
  activeCount: number;
  inactiveCount: number;
  onHoldCount: number;
  onFilterChange: (filter: string) => void;
}

const CustomerFilters = ({
  activeFilter,
  totalCustomers,
  activeCount,
  inactiveCount,
  onHoldCount,
  onFilterChange
}: CustomerFiltersProps) => {
  const filters = [
    { id: 'all', name: 'All Customers', count: totalCustomers, icon: Users },
    { id: 'key', name: 'Key Accounts', count: activeCount, icon: Star },
    { id: 'active', name: 'Active', count: activeCount, icon: Users },
    { id: 'onhold', name: 'On Hold', count: onHoldCount, icon: Clock },
    { id: 'inactive', name: 'Inactive', count: inactiveCount, icon: Users },
  ];

  return (
    <div className="bg-gradient-to-r from-indigo-900 to-indigo-700 p-5 rounded-xl mb-6 shadow-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Customer List</h2>
          <p className="text-indigo-200 text-sm">View and manage your customer accounts</p>
        </div>
        
        <div className="flex-1 flex flex-wrap gap-2 justify-end">
          {filters.map((filter) => (
            <motion.div 
              key={filter.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant={activeFilter === filter.id ? "default" : "outline"} 
                size="sm"
                onClick={() => onFilterChange(filter.id)}
                className={activeFilter === filter.id 
                  ? "bg-white text-indigo-700 hover:bg-indigo-50 border-0" 
                  : "bg-indigo-800/40 text-white border-indigo-500/50 hover:bg-indigo-800/60"
                }
              >
                <filter.icon className="h-4 w-4 mr-2" />
                {filter.name}
                <Badge 
                  className={`ml-2 ${activeFilter === filter.id 
                    ? "bg-indigo-100 text-indigo-800" 
                    : "bg-indigo-700 text-indigo-100"
                  }`}
                >
                  {filter.count}
                </Badge>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerFilters;
