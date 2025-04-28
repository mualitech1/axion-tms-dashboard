
import { Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface JobsFiltersProps {
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  viewMode: 'list' | 'grid';
  setViewMode: (mode: 'list' | 'grid') => void;
}

export function JobsFilters({
  filterStatus,
  setFilterStatus,
  viewMode,
  setViewMode,
}: JobsFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
      <div className="flex items-center gap-2 mb-3 sm:mb-0">
        <Select 
          defaultValue={filterStatus} 
          onValueChange={setFilterStatus}
        >
          <SelectTrigger className="w-[180px] bg-aximo-darker border-aximo-border hover:border-aximo-primary transition-colors duration-300">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-aximo-darker border-aximo-border">
            <SelectItem value="all">All Jobs</SelectItem>
            <SelectItem value="booked">Booked</SelectItem>
            <SelectItem value="allocated">Allocated</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="finished">Finished</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="issues">Issues</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Tabs 
          defaultValue="list" 
          className="w-full sm:w-auto"
          value={viewMode} 
          onValueChange={(val) => setViewMode(val as 'list' | 'grid')}
        >
          <TabsList className="bg-aximo-darker border border-aximo-border">
            <TabsTrigger 
              value="list" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-aximo-primary data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              List
            </TabsTrigger>
            <TabsTrigger 
              value="grid" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-aximo-primary data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              Grid
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
