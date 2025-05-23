import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { errorTracker } from '@/utils/error-tracking';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary component to catch and handle JavaScript errors anywhere in the child component tree
 * Displays a fallback UI instead of crashing the entire application
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    };
  }

  componentDidMount() {
    // Add global unhandled promise rejection handler
    window.addEventListener('unhandledrejection', this.handlePromiseRejection);
  }

  componentWillUnmount() {
    // Remove global event listener
    window.removeEventListener('unhandledrejection', this.handlePromiseRejection);
  }

  handlePromiseRejection = (event: PromiseRejectionEvent) => {
    const error = event.reason instanceof Error 
      ? event.reason 
      : new Error(String(event.reason) || 'Unhandled Promise Rejection');
    
    // Log error details
    console.error('Unhandled Promise Rejection:', error);
    
    // Track the error
    errorTracker.captureError(error, {
      context: { type: 'unhandled_promise_rejection' },
      silent: true 
    });
    
    // Update state to show error UI
    this.setState({
      hasError: true,
      error
    });
    
    // Prevent default browser handling to avoid console errors
    event.preventDefault();
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Track the error with our utility
    errorTracker.captureError(error, {
      context: { componentStack: errorInfo.componentStack },
      silent: true // Silent because we're showing our own UI
    });
    
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  resetErrorBoundary = (): void => {
    const { onReset } = this.props;
    
    // Call the optional reset handler
    if (onReset) {
      onReset();
    }
    
    this.setState({
      hasError: false,
      error: null
    });
  };

  render(): ReactNode {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (!hasError) {
      return children;
    }
    
    // If a custom fallback is provided, use it
    if (fallback) {
      return fallback;
    }

    // Default error UI with quantum styling
    return (
      <div className="flex items-center justify-center p-6">
        <Card className="relative shadow-lg w-full max-w-lg bg-black/40 backdrop-blur-md border border-red-500/30 overflow-hidden rounded-lg">
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-red-500 to-purple-500"></div>
          <div className="absolute -inset-0.5 opacity-20 rounded-lg blur-md bg-gradient-to-br from-red-400 via-purple-400 to-red-400 animate-pulse"></div>
          
          <CardHeader className="border-b border-red-500/20">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-red-500/10 border border-red-500/30">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <CardTitle className="text-xl text-red-300">Quantum Anomaly Detected</CardTitle>
            </div>
            <CardDescription className="text-red-200/70">
              A dimensional instability has occurred in the quantum matrix.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <Alert variant="destructive" className="bg-red-900/20 border-red-800/50 mb-4">
              <AlertTitle className="text-lg font-semibold text-white">Error Details</AlertTitle>
              <AlertDescription className="text-red-200 font-mono text-sm">
                {error?.message || 'Unknown quantum disturbance'}
              </AlertDescription>
            </Alert>
            
            <div className="bg-black/50 border border-red-500/10 rounded-md p-4 mb-4">
              <p className="text-red-200/70 text-sm">
                The system has quarantined this error to prevent cascading dimensional collapse. 
                Our quantum engineers have been notified of this anomaly.
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="border-t border-red-500/20 flex justify-between">
            <p className="text-xs text-red-200/50">
              Quantum Error Reference: {Math.random().toString(36).substring(2, 8).toUpperCase()}
            </p>
            <Button 
              onClick={this.resetErrorBoundary}
              className="bg-gradient-to-r from-red-500 to-purple-500 hover:from-red-600 hover:to-purple-600 text-white"
              size="sm"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Recalibrate Quantum Matrix
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
} 