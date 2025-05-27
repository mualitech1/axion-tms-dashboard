import React from 'react';
import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  Home, 
  ArrowLeft, 
  RefreshCw, 
  FileX, 
  Shield,
  Server,
  Wifi
} from 'lucide-react';

export function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();
  
  // Handle different types of errors professionally
  const getErrorDetails = () => {
    if (isRouteErrorResponse(error)) {
      switch (error.status) {
        case 404:
          return {
            title: "Page Not Found",
            message: "The dimensional coordinates you're trying to access don't exist in this reality plane.",
            description: "The requested quantum state couldn't be located.",
            icon: FileX,
            color: "text-blue-500",
            bgColor: "bg-blue-500/10",
            suggestion: "Return to the quantum hub to navigate to a valid location."
          };
        case 401:
          return {
            title: "Access Denied",
            message: "Your quantum authentication clearance is insufficient.",
            description: "You aren't authorized to access this secured area.",
            icon: Shield,
            color: "text-orange-500",
            bgColor: "bg-orange-500/10",
            suggestion: "Please verify your credentials and try again."
          };
        case 403:
          return {
            title: "Forbidden Access",
            message: "This quantum zone is restricted to authorized personnel only.",
            description: "Your current access level doesn't permit entry to this area.",
            icon: Shield,
            color: "text-red-500",
            bgColor: "bg-red-500/10",
            suggestion: "Contact your administrator for access permission."
          };
        case 500:
          return {
            title: "Server Error",
            message: "A quantum disruption occurred in our data processing matrix.",
            description: "Our servers encountered an unexpected error.",
            icon: Server,
            color: "text-purple-500",
            bgColor: "bg-purple-500/10",
            suggestion: "Our technical team has been notified. Please try again shortly."
          };
        case 503:
          return {
            title: "Service Unavailable",
            message: "The quantum network is temporarily offline for maintenance.",
            description: "Our API services are currently unavailable.",
            icon: Wifi,
            color: "text-yellow-500",
            bgColor: "bg-yellow-500/10",
            suggestion: "Please check back in a few minutes."
          };
        default:
          return {
            title: `Error ${error.status}`,
            message: "An unexpected quantum anomaly has been detected.",
            description: error.statusText || "Unknown error occurred",
            icon: AlertTriangle,
            color: "text-red-500",
            bgColor: "bg-red-500/10",
            suggestion: "Please try refreshing the page or contact support."
          };
      }
    }
    
    // Handle JavaScript errors
    if (error instanceof Error) {
      return {
        title: "Application Error",
        message: "A quantum code disruption has been detected in the application matrix.",
        description: error.message,
        icon: AlertTriangle,
        color: "text-red-500",
        bgColor: "bg-red-500/10",
        suggestion: "Please refresh the page to restore quantum stability."
      };
    }
    
    // Fallback for unknown errors
    return {
      title: "Unknown Error",
      message: "An unidentified quantum disturbance has occurred.",
      description: "Something went wrong, but we're not sure what.",
      icon: AlertTriangle,
      color: "text-gray-500",
      bgColor: "bg-gray-500/10",
      suggestion: "Please try refreshing the page or contact support."
    };
  };

  const errorDetails = getErrorDetails();
  const IconComponent = errorDetails.icon;

  const handleGoHome = () => {
    navigate('/', { replace: true });
  };

  const handleGoBack = () => {
    window.history.length > 1 ? navigate(-1) : navigate('/', { replace: true });
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-aximo-background to-aximo-background/80 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="border-aximo-border bg-aximo-card shadow-2xl">
          <CardHeader className="text-center pb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className={`mx-auto p-4 rounded-full ${errorDetails.bgColor} mb-4`}
            >
              <IconComponent className={`h-12 w-12 ${errorDetails.color}`} />
            </motion.div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-aximo-primary to-blue-500 bg-clip-text text-transparent">
              {errorDetails.title}
            </CardTitle>
            <p className="text-aximo-text-secondary text-lg mt-2">
              {errorDetails.message}
            </p>
          </CardHeader>
          
          <CardContent className="text-center space-y-6">
            <div className="p-4 bg-slate-800/50 rounded-lg">
              <p className="text-aximo-text-secondary text-sm">
                {errorDetails.description}
              </p>
            </div>
            
            <p className="text-aximo-text-secondary">
              {errorDetails.suggestion}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={handleGoBack}
                variant="outline"
                className="flex items-center gap-2 hover:bg-aximo-primary/10"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
              
              <Button
                onClick={handleRefresh}
                variant="outline"
                className="flex items-center gap-2 hover:bg-blue-500/10"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh Page
              </Button>
              
              <Button
                onClick={handleGoHome}
                className="bg-aximo-primary hover:bg-aximo-primary-hover flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Return to Quantum Hub
              </Button>
            </div>
            
            {/* Developer info in development */}
            {import.meta.env.DEV && (
              <motion.details
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 text-left"
              >
                <summary className="cursor-pointer text-xs text-slate-400 hover:text-slate-300">
                  🛠️ Developer Debug Info
                </summary>
                <pre className="mt-2 p-3 bg-slate-900 rounded text-xs text-green-400 overflow-auto">
                  {JSON.stringify(error, null, 2)}
                </pre>
              </motion.details>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

// Specific error boundary for job-related routes
export function JobErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();
  
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-aximo-background to-aximo-background/80 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Card className="border-aximo-border bg-aximo-card p-8">
              <CardContent className="space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="mx-auto p-4 bg-blue-500/10 rounded-full w-fit"
                >
                  <FileX className="h-16 w-16 text-blue-500" />
                </motion.div>
                
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-aximo-primary to-blue-500 bg-clip-text text-transparent mb-2">
                    Job Not Found
                  </h2>
                  <p className="text-aximo-text-secondary text-lg">
                    The transportation job you're looking for doesn't exist in our quantum logistics matrix.
                  </p>
                </div>
                
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <p className="text-sm text-aximo-text-secondary">
                    This could happen if the job was deleted, the ID is incorrect, or you don't have permission to view it.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={() => navigate('/jobs')}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Jobs
                  </Button>
                  
                  <Button
                    onClick={() => navigate('/jobs/create')}
                    className="bg-aximo-primary hover:bg-aximo-primary-hover flex items-center gap-2"
                  >
                    <Home className="h-4 w-4" />
                    Create New Job
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }
  
  // Fall back to general error boundary for other errors
  return <ErrorBoundary />;
} 