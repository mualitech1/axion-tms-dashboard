import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Quantum flux disruption detected:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-6 bg-gradient-to-br from-red-900/20 to-red-800/10 border border-red-700/30 rounded-lg shadow-lg text-center"
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-lg animate-pulse"></div>
              <div className="relative bg-red-900/50 p-3 rounded-full">
                <AlertTriangle className="h-10 w-10 text-red-300" />
              </div>
            </div>
            
            <h3 className="text-xl font-medium text-red-200">Quantum Entanglement Disruption</h3>
            
            <p className="text-red-300/90 max-w-md">
              A dimensional anomaly has been detected in the neural matrix. The system is unable to render this component due to a quantum flux disruption.
            </p>
            
            <div className="bg-red-900/30 p-3 rounded border border-red-700/30 text-left mt-2 overflow-auto max-w-full">
              <pre className="text-xs text-red-300/80 whitespace-pre-wrap break-all">
                {this.state.error?.message || "Unknown dimensional disruption"}
              </pre>
            </div>
            
            <Button 
              onClick={this.handleReset}
              className="bg-gradient-to-r from-red-800 to-red-700 hover:from-red-700 hover:to-red-600 text-white mt-4"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Recalibrate Quantum Matrix
            </Button>
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 