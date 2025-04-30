
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Users, Star, Clock, AlertCircle, CheckCircle } from 'lucide-react';

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
  // Calculate key accounts (assuming 20% of active customers are key accounts for this example)
  const keyAccountsCount = Math.round(activeCount * 0.2);
  
  const filters = [
    { id: 'all', name: 'All Customers', count: totalCustomers, icon: Users, color: 'indigo' },
    { id: 'key', name: 'Key Accounts', count: keyAccountsCount, icon: Star, color: 'blue' },
    { id: 'active', name: 'Active', count: activeCount, icon: CheckCircle, color: 'green' },
    { id: 'onhold', name: 'On Hold', count: onHoldCount, icon: Clock, color: 'amber' },
    { id: 'inactive', name: 'Inactive', count: inactiveCount, icon: AlertCircle, color: 'gray' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4 justify-center sm:justify-start">
      {filters.map((filter) => (
        <motion.div 
          key={filter.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            variant={activeFilter === filter.id ? "default" : "outline"} 
            size="sm"
            onClick={() => onFilterChange(filter.id)}
            className={`h-9 gap-1 ${activeFilter === filter.id 
              ? `bg-${filter.color}-600 hover:bg-${filter.color}-700` 
              : `border-${filter.color}-200 text-${filter.color}-800 hover:bg-${filter.color}-50`
            } transition-all duration-200`}
          >
            <filter.icon className={`h-4 w-4 ${activeFilter === filter.id ? 'text-white' : `text-${filter.color}-600`}`} />
            {filter.name}
            <Badge 
              className={`ml-1 ${activeFilter === filter.id 
                ? `bg-${filter.color}-700 text-white` 
                : `bg-${filter.color}-100 text-${filter.color}-800`
              } rounded-full px-2 py-0 text-xs`}
            >
              {filter.count}
            </Badge>
          </Button>
        </motion.div>
      ))}
    </div>
  );
};

export default CustomerFilters;
