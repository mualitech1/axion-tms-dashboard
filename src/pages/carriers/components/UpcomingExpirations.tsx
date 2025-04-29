
import { AlertTriangle, Calendar, Shield, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export default function UpcomingExpirations() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border border-aximo-border bg-aximo-card shadow-aximo">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-aximo-text flex items-center">
            <Clock className="mr-2 h-5 w-5 text-indigo-500" />
            Upcoming Expirations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-aximo-darker rounded-lg border border-aximo-border/50">
            <div>
              <p className="font-medium text-aximo-text">City Distribution Ltd</p>
              <p className="text-xs text-aximo-text-secondary">Insurance #INS-2025-0124</p>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-red-500" />
              <span className="text-sm text-red-500">Expired 2 days ago</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-aximo-darker rounded-lg border border-aximo-border/50">
            <div>
              <p className="font-medium text-aximo-text">Global Freight Services</p>
              <p className="text-xs text-aximo-text-secondary">Insurance #INS-2025-0187</p>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-amber-500" />
              <span className="text-sm text-amber-500">7 days left</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-aximo-darker rounded-lg border border-aximo-border/50">
            <div>
              <p className="font-medium text-aximo-text">Swift Transport</p>
              <p className="text-xs text-aximo-text-secondary">License #LIC-2025-2043</p>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-amber-500" />
              <span className="text-sm text-amber-500">24 days left</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-aximo-darker rounded-lg border border-aximo-border/50">
            <div>
              <p className="font-medium text-aximo-text">Express Logistics</p>
              <p className="text-xs text-aximo-text-secondary">License #LIC-2025-2061</p>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-amber-500" />
              <span className="text-sm text-amber-500">28 days left</span>
            </div>
          </div>
          
          <div className="mt-3 flex justify-center">
            <Badge className="bg-indigo-600 text-white hover:bg-indigo-700">View All Expirations</Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
