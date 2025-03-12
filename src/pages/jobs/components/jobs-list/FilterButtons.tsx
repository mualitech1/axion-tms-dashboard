
import { Button } from "@/components/ui/button";

interface FilterButtonsProps {
  filter: "all" | "scheduled" | "in-progress" | "pending";
  setFilter: (filter: "all" | "scheduled" | "in-progress" | "pending") => void;
}

export function FilterButtons({ filter, setFilter }: FilterButtonsProps) {
  return (
    <div className="flex space-x-2 pb-1 overflow-x-auto scrollbar-none">
      <Button 
        variant={filter === "all" ? "default" : "ghost"} 
        size="sm" 
        onClick={() => setFilter("all")}
        className="rounded-full"
      >
        All
      </Button>
      <Button 
        variant={filter === "scheduled" ? "default" : "ghost"} 
        size="sm" 
        onClick={() => setFilter("scheduled")}
        className="rounded-full"
      >
        Scheduled
      </Button>
      <Button 
        variant={filter === "in-progress" ? "default" : "ghost"} 
        size="sm" 
        onClick={() => setFilter("in-progress")}
        className="rounded-full"
      >
        In Progress
      </Button>
      <Button 
        variant={filter === "pending" ? "default" : "ghost"} 
        size="sm" 
        onClick={() => setFilter("pending")}
        className="rounded-full"
      >
        Pending
      </Button>
    </div>
  );
}
