
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface FilterButtonsProps {
  filter: "all" | "scheduled" | "in-progress" | "pending";
  setFilter: (filter: "all" | "scheduled" | "in-progress" | "pending") => void;
}

export function FilterButtons({ filter, setFilter }: FilterButtonsProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex space-x-2 pb-1 overflow-x-auto scrollbar-none">
      <Button 
        variant={filter === "all" ? "default" : "ghost"} 
        size={isMobile ? "sm" : "sm"}
        onClick={() => setFilter("all")}
        className="rounded-full whitespace-nowrap"
      >
        All
      </Button>
      <Button 
        variant={filter === "scheduled" ? "default" : "ghost"} 
        size={isMobile ? "sm" : "sm"}
        onClick={() => setFilter("scheduled")}
        className="rounded-full whitespace-nowrap"
      >
        Scheduled
      </Button>
      <Button 
        variant={filter === "in-progress" ? "default" : "ghost"} 
        size={isMobile ? "sm" : "sm"}
        onClick={() => setFilter("in-progress")}
        className="rounded-full whitespace-nowrap"
      >
        In Progress
      </Button>
      <Button 
        variant={filter === "pending" ? "default" : "ghost"} 
        size={isMobile ? "sm" : "sm"}
        onClick={() => setFilter("pending")}
        className="rounded-full whitespace-nowrap"
      >
        Pending
      </Button>
    </div>
  );
}
