import { AreaChart, Clock, DollarSign, UsersRound, Briefcase } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import QuantumCurrency from '@/components/ui/QuantumCurrency';

interface CustomerMetricsProps {
  totalCalls: number;
  totalEmails: number;
  newCustomers: number;
  scheduledMeetings: number;
  activityTimestamp: string;
}

const CustomerMetrics = ({
  totalCalls,
  totalEmails,
  newCustomers,
  scheduledMeetings,
  activityTimestamp
}: CustomerMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* New Customers Card */}
      <Card className="bg-white/95 dark:bg-indigo-950/20 shadow-sm border border-indigo-100/50 dark:border-indigo-800/30 overflow-hidden h-full">
        <CardContent className="p-0 flex flex-col h-full">
          <div className="grid grid-cols-[1fr,80px] flex-grow">
            <div className="p-4">
              <div className="flex items-center text-sm text-indigo-500 dark:text-indigo-400 mb-1 font-medium">
                <UsersRound className="h-4 w-4 mr-1" />
                New Customers
              </div>
              <div className="text-2xl font-bold text-indigo-900 dark:text-indigo-200">{newCustomers}</div>
              <div className="text-xs text-indigo-500/70 dark:text-indigo-400/70 mt-1">
                Last updated: {activityTimestamp}
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30 px-3 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center">
                <UsersRound className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
              </div>
            </div>
          </div>
          <div className="bg-indigo-500/10 dark:bg-indigo-800/30 px-4 py-2 text-xs flex justify-between items-center mt-auto">
            <span className="text-indigo-700 dark:text-indigo-300 font-medium">32% growth</span>
            <span className="text-green-600 dark:text-green-400 font-medium">↑ 12%</span>
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Meetings Card */}
      <Card className="bg-white/95 dark:bg-indigo-950/20 shadow-sm border border-indigo-100/50 dark:border-indigo-800/30 overflow-hidden h-full">
        <CardContent className="p-0 flex flex-col h-full">
          <div className="grid grid-cols-[1fr,80px] flex-grow">
            <div className="p-4">
              <div className="flex items-center text-sm text-amber-500 dark:text-amber-400 mb-1 font-medium">
                <Clock className="h-4 w-4 mr-1" />
                Scheduled Meetings
              </div>
              <div className="text-2xl font-bold text-indigo-900 dark:text-indigo-200">{scheduledMeetings}</div>
              <div className="text-xs text-indigo-500/70 dark:text-indigo-400/70 mt-1">
                Next: Tomorrow, 10:00 AM
              </div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 px-3 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-500 dark:text-amber-400" />
              </div>
            </div>
          </div>
          <div className="bg-amber-500/10 dark:bg-amber-800/30 px-4 py-2 text-xs flex justify-between items-center mt-auto">
            <span className="text-amber-700 dark:text-amber-300 font-medium">75% completion rate</span>
            <span className="text-green-600 dark:text-green-400 font-medium">↑ 5%</span>
          </div>
        </CardContent>
      </Card>

      {/* Total Calls Card */}
      <Card className="bg-white/95 dark:bg-indigo-950/20 shadow-sm border border-indigo-100/50 dark:border-indigo-800/30 overflow-hidden h-full">
        <CardContent className="p-0 flex flex-col h-full">
          <div className="grid grid-cols-[1fr,80px] flex-grow">
            <div className="p-4">
              <div className="flex items-center text-sm text-blue-500 dark:text-blue-400 mb-1 font-medium">
                <Briefcase className="h-4 w-4 mr-1" />
                Total Calls
              </div>
              <div className="text-2xl font-bold text-indigo-900 dark:text-indigo-200">{totalCalls}</div>
              <div className="text-xs text-indigo-500/70 dark:text-indigo-400/70 mt-1">
                This week
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 px-3 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              </div>
            </div>
          </div>
          <div className="bg-blue-500/10 dark:bg-blue-800/30 px-4 py-2 text-xs flex justify-between items-center mt-auto">
            <span className="text-blue-700 dark:text-blue-300 font-medium">Conversion: 42%</span>
            <span className="text-green-600 dark:text-green-400 font-medium">↑ 8%</span>
          </div>
        </CardContent>
      </Card>

      {/* Average Deal Card - With Quantum Currency */}
      <Card className="bg-white/95 dark:bg-indigo-950/20 shadow-sm border border-indigo-100/50 dark:border-indigo-800/30 overflow-hidden h-full">
        <CardContent className="p-0 flex flex-col h-full">
          <div className="grid grid-cols-[1fr,80px] flex-grow">
            <div className="p-4">
              <div className="flex items-center text-sm text-green-500 dark:text-green-400 mb-1 font-medium">
                <QuantumCurrency symbol="£" size="sm" className="mr-1" />
                Average Deal
              </div>
              <div className="text-2xl font-bold text-indigo-900 dark:text-indigo-200">£15,240</div>
              <div className="text-xs text-indigo-500/70 dark:text-indigo-400/70 mt-1">
                This quarter
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 px-3 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-green-500/10 dark:bg-green-500/20 flex items-center justify-center">
                <QuantumCurrency symbol="£" size="sm" colorScheme="green" />
              </div>
            </div>
          </div>
          <div className="bg-green-500/10 dark:bg-green-800/30 px-4 py-2 text-xs flex justify-between items-center mt-auto">
            <span className="text-green-700 dark:text-green-300 font-medium">Revenue: £982K</span>
            <span className="text-green-600 dark:text-green-400 font-medium">↑ 18%</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerMetrics;
