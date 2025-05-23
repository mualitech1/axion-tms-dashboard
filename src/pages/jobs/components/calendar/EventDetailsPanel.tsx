import { format } from 'date-fns';
import { JobEvent } from '../../types/calendarTypes';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Clock, Calendar, MapPin, User, Truck, Building, 
  Check, X, Clipboard, ArrowUpRight, Flag
} from 'lucide-react';
import { deleteCalendarEvent, updateCalendarEvent } from '../../services/calendarService';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface EventDetailsPanelProps {
  event: JobEvent;
  onClose: () => void;
}

export function EventDetailsPanel({ event, onClose }: EventDetailsPanelProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'low':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'booked':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'allocated':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'in-progress':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'issues':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'completed':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const handleViewJob = () => {
    // In a real app, navigate to the job detail page
    window.location.href = `/jobs/${event.jobId}`;
  };

  const handleCancelJob = async () => {
    setIsLoading(true);
    try {
      const result = await deleteCalendarEvent(event.id);
      if (result.success) {
        toast({
          title: "Job Cancelled",
          description: "The operation has been removed from the calendar.",
        });
        onClose();
      } else {
        throw new Error(result.message || "Failed to cancel job");
      }
    } catch (error) {
      console.error("Error cancelling job:", error);
      toast({
        title: "Error",
        description: "Failed to cancel the job. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DialogHeader className={cn(
        "border-b border-aximo-border",
        isMobile ? "pb-1 mb-2" : "pb-2 mb-4"
      )}>
        <DialogTitle className={cn(
          "text-white flex justify-between items-start",
          isMobile ? "text-base mb-0.5 flex-col gap-1" : "mb-1"
        )}>
          <span className={isMobile ? "pr-2" : ""}>{event.title}</span>
          <Badge
            variant="outline"
            className={cn(
              getStatusColor(event.status),
              isMobile ? "text-xs self-start" : ""
            )}
          >
            {event.status}
          </Badge>
        </DialogTitle>
        <DialogDescription className={cn(
          "text-aximo-text-secondary mb-0",
          isMobile ? "text-xs" : ""
        )}>
          Job #{event.jobId} · 
          <Badge
            variant="outline"
            className={cn(
              `ml-2 ${getPriorityColor(event.priority)}`,
              isMobile ? "text-xs" : ""
            )}
          >
            {event.priority} priority
          </Badge>
        </DialogDescription>
      </DialogHeader>

      <div className={cn("space-y-4", isMobile ? "max-h-[60vh] overflow-y-auto pr-1" : "space-y-6")}>
        <div className={cn(
          "flex gap-4",
          isMobile ? "flex-col" : ""
        )}>
          <div className="flex-1 space-y-3">
            <h4 className={cn(
              "font-medium text-aximo-text-primary",
              isMobile ? "text-xs mb-1.5" : "text-sm mb-2"
            )}>
              Details
            </h4>
            
            <div className="flex items-center gap-2">
              <div className={cn(
                "rounded-full bg-aximo-primary/10 flex items-center justify-center",
                isMobile ? "h-6 w-6" : "h-8 w-8"
              )}>
                <Calendar className={cn(
                  "text-aximo-primary",
                  isMobile ? "h-3 w-3" : "h-4 w-4"
                )} />
              </div>
              <div>
                <p className={cn(
                  "text-aximo-text-secondary",
                  isMobile ? "text-[10px]" : "text-xs"
                )}>Date</p>
                <p className={cn(
                  "text-aximo-text-primary",
                  isMobile ? "text-xs" : "text-sm"
                )}>
                  {format(new Date(event.start), isMobile ? 'EEE, MMM d, yyyy' : 'EEEE, MMMM d, yyyy')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className={cn(
                "rounded-full bg-aximo-primary/10 flex items-center justify-center",
                isMobile ? "h-6 w-6" : "h-8 w-8"
              )}>
                <Clock className={cn(
                  "text-aximo-primary",
                  isMobile ? "h-3 w-3" : "h-4 w-4"
                )} />
              </div>
              <div>
                <p className={cn(
                  "text-aximo-text-secondary",
                  isMobile ? "text-[10px]" : "text-xs"
                )}>Time</p>
                <p className={cn(
                  "text-aximo-text-primary",
                  isMobile ? "text-xs" : "text-sm"
                )}>
                  {format(new Date(event.start), 'h:mm a')} - {format(new Date(event.end), 'h:mm a')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className={cn(
                "rounded-full bg-aximo-primary/10 flex items-center justify-center",
                isMobile ? "h-6 w-6" : "h-8 w-8"
              )}>
                <Building className={cn(
                  "text-aximo-primary",
                  isMobile ? "h-3 w-3" : "h-4 w-4"
                )} />
              </div>
              <div>
                <p className={cn(
                  "text-aximo-text-secondary",
                  isMobile ? "text-[10px]" : "text-xs"
                )}>Client</p>
                <p className={cn(
                  "text-aximo-text-primary",
                  isMobile ? "text-xs" : "text-sm"
                )}>{event.client}</p>
              </div>
            </div>
            
            {event.driverName && (
              <div className="flex items-center gap-2">
                <div className={cn(
                  "rounded-full bg-aximo-primary/10 flex items-center justify-center",
                  isMobile ? "h-6 w-6" : "h-8 w-8"
                )}>
                  <User className={cn(
                    "text-aximo-primary",
                    isMobile ? "h-3 w-3" : "h-4 w-4"
                  )} />
                </div>
                <div>
                  <p className={cn(
                    "text-aximo-text-secondary",
                    isMobile ? "text-[10px]" : "text-xs"
                  )}>Driver</p>
                  <div className="flex items-center gap-1.5">
                    <Avatar className={isMobile ? "h-4 w-4" : "h-5 w-5"}>
                      <AvatarFallback className={cn(
                        "bg-aximo-darker text-aximo-text-primary",
                        isMobile ? "text-[8px]" : "text-[10px]"
                      )}>
                        {event.driverName?.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <p className={cn(
                      "text-aximo-text-primary",
                      isMobile ? "text-xs" : "text-sm"
                    )}>{event.driverName}</p>
                  </div>
                </div>
              </div>
            )}
            
            {event.vehicleName && (
              <div className="flex items-center gap-2">
                <div className={cn(
                  "rounded-full bg-aximo-primary/10 flex items-center justify-center",
                  isMobile ? "h-6 w-6" : "h-8 w-8"
                )}>
                  <Truck className={cn(
                    "text-aximo-primary",
                    isMobile ? "h-3 w-3" : "h-4 w-4"
                  )} />
                </div>
                <div>
                  <p className={cn(
                    "text-aximo-text-secondary",
                    isMobile ? "text-[10px]" : "text-xs"
                  )}>Vehicle</p>
                  <p className={cn(
                    "text-aximo-text-primary",
                    isMobile ? "text-xs" : "text-sm"
                  )}>{event.vehicleName}</p>
                </div>
              </div>
            )}
          </div>

          {event.location && (
            <div className="flex-1 space-y-3">
              <h4 className={cn(
                "font-medium text-aximo-text-primary",
                isMobile ? "text-xs mb-1.5" : "text-sm mb-2"
              )}>
                Locations
              </h4>
              
              <div className={cn(
                "rounded-md border border-aximo-border bg-aximo-darker space-y-3",
                isMobile ? "p-2" : "p-3"
              )}>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <p className={cn(
                      "text-aximo-text-secondary",
                      isMobile ? "text-[10px]" : "text-xs"
                    )}>Pickup</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className={cn(
                      "text-aximo-text-secondary shrink-0",
                      isMobile ? "h-3 w-3" : "h-4 w-4"
                    )} />
                    <p className={cn(
                      "text-aximo-text-primary",
                      isMobile ? "text-xs" : "text-sm"
                    )}>{event.location.pickup}</p>
                  </div>
                </div>
                
                <div className="border-t border-aximo-border pt-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                    <p className={cn(
                      "text-aximo-text-secondary",
                      isMobile ? "text-[10px]" : "text-xs"
                    )}>Delivery</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className={cn(
                      "text-aximo-text-secondary shrink-0",
                      isMobile ? "h-3 w-3" : "h-4 w-4"
                    )} />
                    <p className={cn(
                      "text-aximo-text-primary",
                      isMobile ? "text-xs" : "text-sm"
                    )}>{event.location.delivery}</p>
                  </div>
                </div>
              </div>
              
              {!isMobile && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="relative h-24 w-full rounded-md bg-aximo-darker/70 overflow-hidden flex items-center justify-center border border-aximo-border"
                >
                  <p className="text-xs text-aximo-text-secondary">Map view will be available soon</p>
                  <div className="absolute inset-0 bg-gradient-to-r from-aximo-primary/5 to-aximo-accent/5 opacity-50"></div>
                </motion.div>
              )}
            </div>
          )}
        </div>
        
        <div className={cn(
          "border-t border-aximo-border flex justify-between",
          isMobile ? "pt-3 mt-2" : "pt-4"
        )}>
          <Button 
            variant="ghost" 
            size={isMobile ? "sm" : "sm"}
            className={cn(
              "hover:bg-red-950/30",
              isMobile ? "text-xs text-red-400 hover:text-red-300 px-2" : "text-red-400 hover:text-red-300"
            )}
            onClick={handleCancelJob}
            disabled={isLoading}
          >
            <X className={isMobile ? "h-3 w-3 mr-1" : "h-4 w-4 mr-2"} />
            {isMobile ? "Cancel" : "Cancel Job"}
          </Button>
          
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "bg-aximo-darker border-aximo-border text-aximo-text-primary hover:bg-aximo-border",
                isMobile ? "text-xs px-2" : ""
              )}
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              size="sm"
              className={cn(
                "bg-aximo-primary hover:bg-aximo-primary/90",
                isMobile ? "text-xs px-2" : ""
              )}
              onClick={handleViewJob}
            >
              <ArrowUpRight className={isMobile ? "h-3 w-3 mr-1" : "h-4 w-4 mr-2"} />
              {isMobile ? "View" : "View Job"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
} 