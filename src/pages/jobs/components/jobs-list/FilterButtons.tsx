
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface FilterButtonsProps {
  filter: "all" | "booked" | "in-progress" | "issues";
  setFilter: (filter: "all" | "booked" | "in-progress" | "issues") => void;
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
        variant={filter === "booked" ? "default" : "ghost"} 
        size={isMobile ? "sm" : "sm"}
        onClick={() => setFilter("booked")}
        className="rounded-full whitespace-nowrap"
      >
        Booked
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
        variant={filter === "issues" ? "default" : "ghost"} 
        size={isMobile ? "sm" : "sm"}
        onClick={() => setFilter("issues")}
        className="rounded-full whitespace-nowrap"
      >
        Issues
      </Button>
    </div>
  );
}
