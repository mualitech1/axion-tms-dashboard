import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Star, Truck, Clock, CheckCircle, AlertCircle, Filter, Zap } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Mock data for carriers - will be replaced with actual data from API
const mockCarriers = [
  {
    id: "c001",
    name: "FastTrack Logistics",
    rating: 4.8,
    equipmentTypes: ["Traction Only", "Curtainside", "Box Van"],
    availability: "Immediate",
    completionRate: 98,
    averageResponseTime: "15 min",
    rate: "£85/hour",
    quantum: true,
  },
  {
    id: "c002",
    name: "Global Route Express",
    rating: 4.5,
    equipmentTypes: ["Container 20ft", "Container 40ft", "Traction Only"],
    availability: "Next Day",
    completionRate: 95,
    averageResponseTime: "22 min",
    rate: "£78/hour",
    quantum: false,
  },
  {
    id: "c003",
    name: "Elite Transport Solutions",
    rating: 4.9,
    equipmentTypes: ["Flatbed", "HIAB", "Curtainside"],
    availability: "Same Day",
    completionRate: 99,
    averageResponseTime: "10 min",
    rate: "£92/hour",
    quantum: true,
  },
  {
    id: "c004",
    name: "Rapid Freight Services",
    rating: 4.2,
    equipmentTypes: ["Box Van", "Dropside", "Luton"],
    availability: "48 Hours",
    completionRate: 91,
    averageResponseTime: "35 min",
    rate: "£68/hour",
    quantum: false,
  },
  {
    id: "c005",
    name: "Premier Logistics Group",
    rating: 4.7,
    equipmentTypes: ["Container 40ft", "Traction Only", "Skeletal"],
    availability: "Immediate",
    completionRate: 97,
    averageResponseTime: "18 min",
    rate: "£82/hour",
    quantum: true,
  },
];

// Equipment filter options
const equipmentOptions = [
  "All",
  "Traction Only",
  "Container 20ft",
  "Container 40ft",
  "Curtainside",
  "Box Van",
  "Flatbed",
  "HIAB",
  "Dropside",
  "Luton",
  "Skeletal",
];

interface CarrierAllocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (carrierId: string) => void;
  jobTitle?: string;
  requiredEquipment?: string;
}

export function CarrierAllocationModal({
  isOpen,
  onClose,
  onConfirm,
  jobTitle = "Transport Operation",
  requiredEquipment = "All",
}: CarrierAllocationModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCarrierId, setSelectedCarrierId] = useState<string | null>(null);
  const [equipmentFilter, setEquipmentFilter] = useState("All");
  const [isAllocating, setIsAllocating] = useState(false);
  const { toast } = useToast();

  // Filter carriers based on search term and equipment filter
  const filteredCarriers = mockCarriers.filter(
    (carrier) =>
      carrier.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (equipmentFilter === "All" || carrier.equipmentTypes.includes(equipmentFilter))
  );

  const handleConfirm = () => {
    if (selectedCarrierId) {
      setIsAllocating(true);
      
      // Simulate API call with timeout
      setTimeout(() => {
        onConfirm(selectedCarrierId);
        toast({
          title: "Carrier Allocated",
          description: "Job has been successfully assigned to the carrier",
          variant: "default",
        });
        setIsAllocating(false);
        onClose();
      }, 1500);
    } else {
      toast({
        title: "No Carrier Selected",
        description: "Please select a carrier before confirming",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isAllocating && !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] bg-gradient-to-br from-[#0f1629] to-[#0c101f] border-[#1a3246] text-[#e1eefb]">
        <DialogHeader>
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-[#0a9bdb] to-[#0adeee] p-1.5 rounded-md mr-3 shadow-glow">
              <Truck className="h-5 w-5 text-[#030619]" />
            </div>
            <DialogTitle className="text-xl bg-gradient-to-r from-[#0adeee] to-[#0a9bdb] bg-clip-text text-transparent">
              Quantum Carrier Allocation
            </DialogTitle>
          </div>
          <p className="text-[#6b82a6] text-sm">
            Assign a carrier to <span className="text-[#0adeee] font-medium">{jobTitle}</span>
          </p>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5a7194]" />
              <Input
                placeholder="Search carriers..."
                className="pl-10 bg-[#162233] border-[#1a3246] text-[#e1eefb] h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="relative inline-block">
                <select
                  value={equipmentFilter}
                  onChange={(e) => setEquipmentFilter(e.target.value)}
                  className="appearance-none h-9 pl-3 pr-10 bg-[#162233] border-[#1a3246] rounded-md text-[#e1eefb] text-sm"
                  aria-label="Filter by equipment type"
                >
                  {equipmentOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5a7194] pointer-events-none" />
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-9 border-[#1a3246] bg-[#162233] text-[#6b82a6] hover:bg-[#1a3246] hover:text-[#e1eefb]"
              >
                <Filter className="h-3.5 w-3.5 mr-1" />
                More
              </Button>
            </div>
          </div>

          <ScrollArea className="h-[320px] rounded-md border border-[#1a3246] bg-[#0f1629]/50 p-1">
            <AnimatePresence>
              {filteredCarriers.length > 0 ? (
                <div className="space-y-2 p-1">
                  {filteredCarriers.map((carrier) => (
                    <motion.div
                      key={carrier.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "relative p-3 rounded-md transition-all",
                        selectedCarrierId === carrier.id
                          ? "bg-[#1a3246] border-[#0adeee] border"
                          : "bg-[#162233] border-[#1a3246] border hover:bg-[#1a3246]/70 cursor-pointer"
                      )}
                      onClick={() => setSelectedCarrierId(carrier.id)}
                    >
                      {carrier.quantum && (
                        <Badge className="absolute right-3 top-3 bg-[#0a9bdb] text-[#030619] font-medium">
                          <Zap className="h-3 w-3 mr-1" /> Quantum Partner
                        </Badge>
                      )}
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-[#e1eefb]">{carrier.name}</h3>
                          <div className="flex items-center mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    "h-3.5 w-3.5",
                                    i < Math.floor(carrier.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-500"
                                  )}
                                />
                              ))}
                            </div>
                            <span className="text-[#6b82a6] text-xs ml-1">{carrier.rating.toFixed(1)}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-[#0adeee] font-semibold">{carrier.rate}</p>
                          <div className="flex items-center mt-1 justify-end">
                            <Badge 
                              variant="outline" 
                              className={cn(
                                "text-xs",
                                carrier.availability === "Immediate" ? "text-green-400 border-green-500/30" : 
                                carrier.availability === "Same Day" ? "text-blue-400 border-blue-500/30" : 
                                "text-yellow-400 border-yellow-500/30"
                              )}
                            >
                              {carrier.availability}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {carrier.equipmentTypes.map((type) => (
                          <Badge
                            key={type}
                            variant="secondary"
                            className="bg-[#1a3246] hover:bg-[#1a3246] text-[#6b82a6] text-xs border border-[#223a4e]"
                          >
                            {type}
                          </Badge>
                        ))}
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs">
                        <div className="flex items-center">
                          <CheckCircle className="h-3.5 w-3.5 mr-1 text-green-400" />
                          <span className="text-[#6b82a6]">
                            {carrier.completionRate}% completion rate
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1 text-blue-400" />
                          <span className="text-[#6b82a6]">
                            {carrier.averageResponseTime} avg. response
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <AlertCircle className="h-10 w-10 text-[#5a7194] mb-2" />
                  <h3 className="text-[#e1eefb] font-medium">No carriers found</h3>
                  <p className="text-[#6b82a6] text-sm mt-1">
                    Try adjusting your filters or search term
                  </p>
                </div>
              )}
            </AnimatePresence>
          </ScrollArea>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={isAllocating}
            className="flex-1 sm:flex-none border-[#1a3246] text-[#6b82a6] hover:bg-[#1a3246] hover:text-[#e1eefb]"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={!selectedCarrierId || isAllocating}
            className="flex-1 sm:flex-none bg-gradient-to-r from-[#0a9bdb] to-[#0adeee] text-[#030619] font-medium hover:from-[#0adeee] hover:to-[#0a9bdb]"
          >
            {isAllocating ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="mr-2 h-4 w-4"
                >
                  <Zap className="h-4 w-4" />
                </motion.div>
                Allocating...
              </>
            ) : (
              "Confirm Allocation"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 