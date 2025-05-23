import { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface ErrorBoundaryProps {
  children: ReactNode;
  FallbackComponent?: React.ComponentType<{ error: Error; resetErrorBoundary: () => void }>;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Default fallback component with quantum styling
 */
export function DefaultErrorFallback({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-r from-red-900/30 to-red-800/20 border-l-4 border-red-500 p-6 rounded-lg backdrop-blur-sm my-4"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-6 w-6 text-red-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-medium text-red-300">Quantum Field Disruption</h3>
          <div className="mt-2 text-sm text-red-200">
            <p>An anomaly was detected in the quantum probability field:</p>
            <pre className="mt-2 bg-red-950/50 p-3 rounded text-red-300 overflow-auto">
              {error.message}
            </pre>
          </div>
          <div className="mt-4">
            <button
              type="button"
              onClick={resetErrorBoundary}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-red-400/30 text-sm font-medium text-red-300 hover:bg-red-950/50 hover:text-red-200 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Recalibrate Quantum Matrix
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Error boundary component that catches rendering errors and displays a fallback UI
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  }

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.FallbackComponent || DefaultErrorFallback;
      
      return (
        <FallbackComponent 
          error={this.state.error} 
          resetErrorBoundary={this.resetErrorBoundary} 
        />
      );
    }

    return this.props.children;
  }
} 