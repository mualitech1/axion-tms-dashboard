
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, Phone, PlusCircle, Send, User, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CustomerActions = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="bg-white dark:bg-indigo-950/20 shadow-sm border border-indigo-100/50 dark:border-indigo-800/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-indigo-900 dark:text-indigo-200">
          Quick Actions
        </CardTitle>
        <CardDescription className="text-indigo-500 dark:text-indigo-400">
          Common customer management tasks
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-2">
        <Button 
          variant="outline" 
          className="h-auto py-4 px-3 flex flex-col items-center justify-center gap-2 border-indigo-100 hover:border-indigo-300 dark:border-indigo-800/50 dark:hover:border-indigo-700"
          onClick={() => navigate('/customers/new')}
        >
          <PlusCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
          <span className="text-xs font-medium">Add Customer</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto py-4 px-3 flex flex-col items-center justify-center gap-2 border-indigo-100 hover:border-indigo-300 dark:border-indigo-800/50 dark:hover:border-indigo-700"
        >
          <Phone className="h-5 w-5 text-blue-500 dark:text-blue-400" />
          <span className="text-xs font-medium">Log Call</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto py-4 px-3 flex flex-col items-center justify-center gap-2 border-indigo-100 hover:border-indigo-300 dark:border-indigo-800/50 dark:hover:border-indigo-700"
        >
          <Calendar className="h-5 w-5 text-amber-500 dark:text-amber-400" />
          <span className="text-xs font-medium">Schedule Meeting</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto py-4 px-3 flex flex-col items-center justify-center gap-2 border-indigo-100 hover:border-indigo-300 dark:border-indigo-800/50 dark:hover:border-indigo-700"
        >
          <Send className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
          <span className="text-xs font-medium">Send Email</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto py-4 px-3 flex flex-col items-center justify-center gap-2 border-indigo-100 hover:border-indigo-300 dark:border-indigo-800/50 dark:hover:border-indigo-700"
        >
          <FileText className="h-5 w-5 text-pink-500 dark:text-pink-400" />
          <span className="text-xs font-medium">Create Invoice</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto py-4 px-3 flex flex-col items-center justify-center gap-2 border-indigo-100 hover:border-indigo-300 dark:border-indigo-800/50 dark:hover:border-indigo-700"
          onClick={() => navigate('/customer-portal')}
        >
          <User className="h-5 w-5 text-purple-500 dark:text-purple-400" />
          <span className="text-xs font-medium">Portal Access</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default CustomerActions;
