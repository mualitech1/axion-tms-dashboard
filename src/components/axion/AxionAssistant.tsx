import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mic, MicOff, Maximize2, Minimize2, MessageSquare, X, Send, Phone } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { WaveLoader } from './WaveLoader';
import { useIsMobile } from '@/hooks/use-mobile';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'axion';
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: '1',
    content: 'Assalamu Alaikum. I am Axion, your quantum logistics assistant. How may I assist you today?',
    sender: 'axion',
    timestamp: new Date(),
  },
];

const responseLibrary = [
  "I've analyzed your shipment patterns using quantum algorithms and found an opportunity to optimize your routes by 12.3%.",
  "Based on current traffic conditions and satellite data, I recommend rerouting drivers through the northeastern corridor.",
  "Your fleet utilization is currently at 83%. With my quantum optimization matrix, I can help you reach 95% with our dynamic allocation system.",
  "I've detected potential delays due to weather patterns in the midwest through our atmospheric analysis network. Would you like me to propose alternative routes?",
  "Your customer satisfaction metrics have improved by 7% since implementing our last recommendation. I predict another 5% gain next quarter.",
  "I notice you have 3 vehicles with maintenance schedules approaching. Shall I optimize the service timing to minimize downtime?",
  "Based on quantum data analysis, I predict a 15% increase in shipping volume next Tuesday. We should prepare additional resources.",
  "I've identified a potential compliance issue with driver hour logs in your eastern division through pattern matching. Would you like details?",
  "Your fuel efficiency has decreased 2.8% in the last month. I recommend calibrating tire pressure across the fleet based on my atmospheric pressure models.",
  "I've negotiated better rates with your fuel providers based on your consumption patterns. This will save approximately $4,300 monthly.",
  "The AetherForge Quantum Nexus has calculated optimal loading patterns for your warehouse. Implementing these would reduce loading time by 18%.",
  "Your carbon footprint could be reduced by 23% if we implement the Hazim Alrad protocols for your logistics chain.",
  "I've synchronized the dimensional logistics matrices for your next quarter. Expect significant improvements in cross-continental deliveries.",
];

export function AxionAssistant() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      speechSynthesisRef.current = window.speechSynthesis;
    }
  }, []);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const toggleOpen = () => {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      setIsExpanded(false);
    }
  };
  
  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI thinking/typing
    setTimeout(() => {
      const randomResponse = responseLibrary[Math.floor(Math.random() * responseLibrary.length)];
      
      const axionMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: 'axion',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, axionMessage]);
      setIsTyping(false);
      
      // If speaking is active, read the response
      if (isSpeaking && speechSynthesisRef.current) {
        const utterance = new SpeechSynthesisUtterance(randomResponse);
        utterance.rate = 0.9;
        utterance.pitch = 0.9;
        speechSynthesisRef.current.speak(utterance);
      }
    }, 1500);
  };
  
  const toggleSpeaking = () => {
    setIsSpeaking(prev => !prev);
    
    if (!isSpeaking && speechSynthesisRef.current) {
      // When turning on, speak the welcome message
      const utterance = new SpeechSynthesisUtterance("Voice interface activated. Axion quantum logistics assistant online.");
      utterance.rate = 0.9;
      utterance.pitch = 0.9;
      speechSynthesisRef.current.speak(utterance);
    } else if (speechSynthesisRef.current) {
      // When turning off, cancel all speech
      speechSynthesisRef.current.cancel();
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const handleIncomingCall = () => {
    // Simulate a call from a customer
    const incomingMessage: Message = {
      id: Date.now().toString(),
      content: "Incoming call from International Shipping Co. Voice pattern analysis shows urgent priority. Accept?",
      sender: 'axion',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, incomingMessage]);
    setIsOpen(true);
  };
  
  return (
    <>
      {/* Floating button when closed */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={cn(
            "fixed z-50",
            isMobile ? "bottom-4 right-4" : "bottom-6 right-6"
          )}
        >
          <Button
            onClick={toggleOpen}
            className={cn(
              "rounded-full shadow-aximo hover:shadow-aximo-strong transition-all duration-300 ease-in-out",
              isMobile ? "h-12 w-12" : "h-14 w-14",
              "bg-gradient-to-r from-aximo-primary/90 to-aximo-accent/90 hover:from-aximo-primary hover:to-aximo-accent"
            )}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-aximo-primary to-aximo-accent opacity-60 blur-sm"></div>
            <div className="relative z-10 flex items-center justify-center">
              <MessageSquare className={cn(isMobile ? "h-5 w-5" : "h-6 w-6", "text-white")} />
            </div>
          </Button>
        </motion.div>
      )}
      
      {/* Assistant panel when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className={cn(
              "fixed z-50 bg-aximo-dark border border-aximo-border rounded-xl shadow-2xl overflow-hidden",
              isExpanded 
                ? "left-[5%] top-[5%] right-[5%] bottom-[5%]" 
                : isMobile
                  ? "left-2 right-2 bottom-2 h-[70vh] max-h-[500px]"
                  : "right-6 bottom-6 w-[380px] h-[520px]"
            )}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-aximo-border bg-aximo-darker flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 bg-aximo-primary/20 border border-aximo-primary/30">
                  <div className="h-full w-full rounded-full bg-gradient-to-r from-aximo-primary to-aximo-accent opacity-60"></div>
                </Avatar>
                <div>
                  <h3 className="text-sm font-medium text-white">Axion Interface</h3>
                  <p className="text-xs text-aximo-text-secondary">Quantum Logistics Assistant</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 rounded-full hover:bg-aximo-border"
                  onClick={toggleSpeaking}
                >
                  {isSpeaking ? (
                    <Mic className="h-4 w-4 text-aximo-primary" />
                  ) : (
                    <MicOff className="h-4 w-4 text-aximo-text-secondary" />
                  )}
                </Button>
                
                {!isMobile && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 rounded-full hover:bg-aximo-border"
                    onClick={toggleExpand}
                  >
                    {isExpanded ? (
                      <Minimize2 className="h-4 w-4 text-aximo-text-secondary" />
                    ) : (
                      <Maximize2 className="h-4 w-4 text-aximo-text-secondary" />
                    )}
                  </Button>
                )}
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 rounded-full hover:bg-aximo-border hover:bg-red-950/20 hover:text-red-400"
                  onClick={toggleOpen}
                >
                  <X className="h-4 w-4 text-aximo-text-secondary" />
                </Button>
              </div>
            </div>
            
            {/* Messages area */}
            <div className={cn(
              "overflow-y-auto relative",
              isMobile ? "p-3 h-[calc(100%-110px)]" : "p-4 h-[calc(100%-120px)]"
            )}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "mb-4 max-w-[85%] rounded-xl p-3",
                    message.sender === 'user'
                      ? "ml-auto bg-aximo-primary/20 text-aximo-text-primary border border-aximo-primary/30"
                      : "mr-auto bg-aximo-dark text-aximo-text-primary border border-aximo-border",
                    isMobile && "text-sm p-2.5"
                  )}
                >
                  {message.content}
                </div>
              ))}
              
              {isTyping && (
                <div className="mr-auto mb-4 bg-aximo-dark max-w-[85%] rounded-xl p-3 border border-aximo-border">
                  <WaveLoader />
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input area */}
            <div className={cn(
              "border-t border-aximo-border bg-aximo-darker p-3 flex items-center gap-2",
              isMobile ? "p-2" : "p-3"
            )}>
              <Input
                type="text"
                placeholder="Ask Axion something..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className={cn(
                  "bg-aximo-dark border-aximo-border focus-visible:ring-aximo-primary",
                  isMobile && "text-sm h-9"
                )}
              />
              <Button
                onClick={handleSendMessage}
                className={cn(
                  "bg-aximo-primary hover:bg-aximo-primary/90 h-10 w-10 p-0 rounded-full",
                  isMobile && "h-9 w-9"
                )}
                disabled={!inputValue.trim()}
              >
                <Send className={cn("h-4 w-4", isMobile && "h-3.5 w-3.5")} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 