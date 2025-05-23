import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock, AlertTriangle, CheckCircle, Truck } from "lucide-react";
import { Carrier } from "../data/types/carrierTypes";
import { useNavigate } from "react-router-dom";

interface UpcomingExpirationsProps {
  carriers: Carrier[];
}

export default function UpcomingExpirations({ carriers }: UpcomingExpirationsProps) {
  const navigate = useNavigate();
  
  // Get today's date for comparison
  const today = new Date();
  
  // Find carriers with expirations in the next 60 days
  const upcomingExpirations = carriers
    .map(carrier => {
      const insuranceDate = new Date(carrier.insuranceExpiry);
      const licenseDate = new Date(carrier.licenseExpiry);
      
      const insuranceDaysLeft = Math.round((insuranceDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      const licenseDaysLeft = Math.round((licenseDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      return {
        id: carrier.id,
        name: carrier.name,
        expirations: [
          {
            type: 'Insurance',
            date: carrier.insuranceExpiry,
            daysLeft: insuranceDaysLeft
          },
          {
            type: 'License',
            date: carrier.licenseExpiry,
            daysLeft: licenseDaysLeft
          }
        ]
      };
    })
    .filter(carrier => 
      carrier.expirations.some(exp => exp.daysLeft >= 0 && exp.daysLeft <= 60)
    );
  
  // Sort expirations by days left (ascending)
  const sortedExpirations = upcomingExpirations
    .flatMap(carrier => 
      carrier.expirations
        .filter(exp => exp.daysLeft >= 0 && exp.daysLeft <= 60)
        .map(exp => ({
          id: carrier.id,
          name: carrier.name,
          type: exp.type,
          date: exp.date,
          daysLeft: exp.daysLeft
        }))
    )
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, 5); // Only show top 5 closest expirations
  
  // Function to determine the severity class based on days left
  const getSeverityClass = (daysLeft: number) => {
    if (daysLeft <= 7) return "text-red-500";
    if (daysLeft <= 30) return "text-amber-500";
    return "text-blue-500";
  };
  
  // Function to get the icon based on days left
  const getStatusIcon = (daysLeft: number) => {
    if (daysLeft <= 7) {
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    } else if (daysLeft <= 30) {
      return <AlertTriangle className="h-4 w-4 text-amber-500" />;
    } else {
      return <CheckCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <Card className="border-aximo-border bg-aximo-card shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <CalendarClock className="h-5 w-5 mr-2 text-aximo-primary" />
          Upcoming Expirations
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sortedExpirations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6">
            <CheckCircle className="h-12 w-12 text-green-500 opacity-50 mb-2" />
            <p className="text-center text-aximo-text-secondary">No upcoming expirations in the next 60 days</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedExpirations.map((exp, index) => (
              <div 
                key={`${exp.id}-${exp.type}-${index}`}
                className="flex items-center justify-between p-3 bg-aximo-darker rounded-lg cursor-pointer hover:bg-aximo-darker/80 transition-colors"
                onClick={() => navigate(`/carriers/details/${exp.id}`)}
              >
                <div className="flex items-center">
                  <div className="bg-aximo-primary/20 p-1.5 rounded-full mr-3">
                    <Truck className="h-4 w-4 text-aximo-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-aximo-text">{exp.name}</p>
                    <p className="text-xs text-aximo-text-secondary">{exp.type} expires on {new Date(exp.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {getStatusIcon(exp.daysLeft)}
                  <span className={`text-sm font-medium ml-1.5 ${getSeverityClass(exp.daysLeft)}`}>
                    {exp.daysLeft} {exp.daysLeft === 1 ? 'day' : 'days'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
