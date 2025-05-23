import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Zap, RotateCw, Database } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-aximo-darker p-6 overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-1/4 w-96 h-96 bg-aximo-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 text-center max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative mb-8 flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-aximo-primary to-purple-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="relative bg-aximo-dark border border-aximo-border p-5 rounded-full">
              <Database className="h-16 w-16 text-aximo-primary" />
              <motion.div 
                className="absolute -right-1 -bottom-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <RotateCw className="h-8 w-8 text-purple-500" />
              </motion.div>
            </div>
          </div>
          
          <h1 className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-aximo-primary to-purple-400 mb-4">404</h1>
          <p className="text-2xl font-semibold text-aximo-text mb-6">Quantum Disruption Detected</p>
          <p className="text-aximo-text-secondary mb-8">
            The dimensional coordinates you're trying to access don't exist in this reality plane. The requested quantum state "{location.pathname}" couldn't be located.
          </p>
          
          <div className="space-y-4">
            <Button 
              className="w-full bg-gradient-to-r from-aximo-primary to-purple-500 hover:from-aximo-primary/90 hover:to-purple-600 text-white shadow-glow"
              asChild
            >
              <a href="/">
                <Home className="mr-2 h-4 w-4" />
                Return to Quantum Hub
              </a>
            </Button>
            
            <Button 
              className="w-full bg-aximo-dark border border-aximo-border hover:bg-aximo-darker text-aximo-text"
              asChild
              variant="outline"
            >
              <a href="/auth">
                <Zap className="mr-2 h-4 w-4 text-aximo-primary" />
                Quantum Authentication Portal
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
