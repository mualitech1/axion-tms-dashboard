import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ArrowRight, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface JobCommandProps {
  onExecute: (command: string) => void;
  suggestions?: string[];
  isLoading?: boolean;
}

export function JobCommand({ onExecute, suggestions = [], isLoading = false }: JobCommandProps) {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Auto-focus the input when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleCommandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (command.trim() === '') return;
    
    // Update history
    setHistory(prev => [...prev, command]);
    setHistoryIndex(-1);
    
    // Execute command
    onExecute(command);
    
    // Reset command
    setCommand('');
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle history navigation with up/down arrows
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCommand(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommand('');
      }
    } else if (e.key === 'Tab' && showSuggestions && suggestions.length > 0) {
      e.preventDefault();
      // Find a suggestion that starts with the current command
      const matchingSuggestion = suggestions.find(s => 
        s.toLowerCase().startsWith(command.toLowerCase())
      );
      if (matchingSuggestion) {
        setCommand(matchingSuggestion);
      }
    }
  };

  const filteredSuggestions = suggestions.filter(s => 
    s.toLowerCase().includes(command.toLowerCase())
  );

  return (
    <div className="bg-aximo-darker border border-aximo-border rounded-lg shadow-md overflow-hidden">
      <div className="bg-aximo-card/40 px-3 py-2 border-b border-aximo-border flex items-center">
        <Terminal className="h-4 w-4 text-aximo-primary mr-2" />
        <span className="text-sm font-medium text-aximo-text">Quantum Operation Console</span>
      </div>
      
      <div className="p-4 font-mono text-sm">
        {/* Command history */}
        {history.slice(-3).map((cmd, index) => (
          <div key={index} className="mb-2 text-aximo-text-muted">
            <span className="text-aximo-accent">λ</span> {cmd}
          </div>
        ))}
        
        {/* Command input */}
        <form onSubmit={handleCommandSubmit} className="relative">
          <div className="flex items-center">
            <span className="text-aximo-primary mr-2">λ</span>
            <input
              ref={inputRef}
              type="text"
              value={command}
              onChange={handleCommandChange}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-aximo-text"
              placeholder="Enter quantum operation command..."
              disabled={isLoading}
            />
          </div>
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="mt-2 flex items-center text-aximo-text-muted">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Circle className="h-4 w-4 text-aximo-primary mr-2" />
              </motion.div>
              <span>Processing quantum operation...</span>
            </div>
          )}
          
          {/* Command suggestions */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-0 right-0 mt-1 bg-aximo-darker border border-aximo-border rounded-md shadow-lg z-10"
            >
              {filteredSuggestions.slice(0, 5).map((suggestion, index) => (
                <div 
                  key={index}
                  className="px-3 py-1.5 hover:bg-aximo-primary/10 cursor-pointer text-aximo-text-muted hover:text-aximo-text flex items-center"
                  onClick={() => {
                    setCommand(suggestion);
                    setShowSuggestions(false);
                    if (inputRef.current) {
                      inputRef.current.focus();
                    }
                  }}
                >
                  <ArrowRight className="h-3 w-3 mr-2 text-aximo-accent" />
                  {suggestion}
                </div>
              ))}
            </motion.div>
          )}
        </form>
      </div>
      
      <div className="bg-aximo-card/40 px-3 py-2 border-t border-aximo-border flex justify-end">
        <Button 
          type="button" 
          size="sm" 
          variant="outline" 
          className="text-xs bg-aximo-darker border-aximo-border hover:bg-aximo-primary/10 hover:text-aximo-primary"
          onClick={() => setHistory([])}
        >
          Clear History
        </Button>
        <Button 
          type="button" 
          size="sm" 
          variant="default" 
          className="text-xs ml-2 bg-aximo-primary hover:bg-aximo-accent"
          onClick={handleCommandSubmit}
          disabled={isLoading || command.trim() === ''}
        >
          Execute Command
        </Button>
      </div>
    </div>
  );
} 