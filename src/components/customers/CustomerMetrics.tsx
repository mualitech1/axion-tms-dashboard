
import { Phone, Mail, Calendar, User, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface CustomerMetricsProps {
  totalCalls: number;
  totalEmails: number;
  newCustomers: number;
  scheduledMeetings: number;
  activityTimestamp?: string;
}

const CustomerMetrics = ({
  totalCalls = 68,
  totalEmails = 173,
  newCustomers = 24,
  scheduledMeetings = 12,
  activityTimestamp = 'Today, 10:30 AM'
}: CustomerMetricsProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div 
        variants={item}
        className="bg-white rounded-lg shadow-sm border border-indigo-100 p-4 hover:shadow-md transition-shadow duration-200"
      >
        <div className="flex items-center mb-2">
          <div className="bg-indigo-100 h-8 w-8 rounded-full flex items-center justify-center mr-2">
            <Phone className="h-4 w-4 text-indigo-600" />
          </div>
          <h3 className="text-sm font-medium text-indigo-800">Calls This Week</h3>
        </div>
        <div className="mt-2">
          <p className="text-2xl font-bold text-indigo-900">{totalCalls}</p>
          <p className="text-xs text-indigo-500 mt-1">
            <Clock className="h-3 w-3 inline mr-1" />
            Last activity: {activityTimestamp}
          </p>
        </div>
      </motion.div>

      <motion.div 
        variants={item}
        className="bg-white rounded-lg shadow-sm border border-indigo-100 p-4 hover:shadow-md transition-shadow duration-200"
      >
        <div className="flex items-center mb-2">
          <div className="bg-pink-100 h-8 w-8 rounded-full flex items-center justify-center mr-2">
            <Mail className="h-4 w-4 text-pink-600" />
          </div>
          <h3 className="text-sm font-medium text-pink-800">Emails This Week</h3>
        </div>
        <div className="mt-2">
          <p className="text-2xl font-bold text-pink-900">{totalEmails}</p>
          <div className="flex items-center mt-1">
            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-pink-500 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <span className="text-xs text-pink-600 ml-2">+12%</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        variants={item}
        className="bg-white rounded-lg shadow-sm border border-indigo-100 p-4 hover:shadow-md transition-shadow duration-200"
      >
        <div className="flex items-center mb-2">
          <div className="bg-green-100 h-8 w-8 rounded-full flex items-center justify-center mr-2">
            <User className="h-4 w-4 text-green-600" />
          </div>
          <h3 className="text-sm font-medium text-green-800">New Customers</h3>
        </div>
        <div className="mt-2">
          <p className="text-2xl font-bold text-green-900">{newCustomers}</p>
          <p className="text-xs text-green-600 mt-1">Last 30 days</p>
        </div>
      </motion.div>

      <motion.div 
        variants={item}
        className="bg-white rounded-lg shadow-sm border border-indigo-100 p-4 hover:shadow-md transition-shadow duration-200"
      >
        <div className="flex items-center mb-2">
          <div className="bg-amber-100 h-8 w-8 rounded-full flex items-center justify-center mr-2">
            <Calendar className="h-4 w-4 text-amber-600" />
          </div>
          <h3 className="text-sm font-medium text-amber-800">Meetings</h3>
        </div>
        <div className="mt-2">
          <p className="text-2xl font-bold text-amber-900">{scheduledMeetings}</p>
          <p className="text-xs text-amber-600 mt-1">Scheduled this week</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CustomerMetrics;
