
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Sliders, Cpu, MessageSquare, BarChart3, Lock, RefreshCw } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

export default function AISettings() {
  const [aiEnabled, setAiEnabled] = useState(true);
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [temperature, setTemperature] = useState(70);
  const [maxTokens, setMaxTokens] = useState(50);
  const [personalityPrompt, setPersonalityPrompt] = useState(
    "You are AXIMO AI, a logistics intelligence assistant. Be professional, concise, and helpful. Provide data-driven insights when available."
  );
  
  return (
    <div className="space-y-8 text-gray-300">
      {/* Header */}
      <div>
        <h3 className="text-lg font-medium text-white mb-1">
          <span className="text-[#1EAEDB]">AXIMO</span> AI Configuration
        </h3>
        <p className="text-sm text-gray-400 mb-6">
          Customize how the AI logistics assistant interacts with your systems
        </p>
      </div>
      
      {/* Main toggle */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between p-5 rounded-lg border border-[#1EAEDB]/20 bg-[#111827]/50"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-[#1EAEDB]/10">
            <Brain className="h-5 w-5 text-[#1EAEDB]" />
          </div>
          <div>
            <h4 className="text-white font-medium">Enable AXIMO AI</h4>
            <p className="text-sm text-gray-400">The AI assistant will provide logistics insights and automate tasks</p>
          </div>
        </div>
        <Switch 
          checked={aiEnabled} 
          onCheckedChange={setAiEnabled}
          className="data-[state=checked]:bg-[#1EAEDB]" 
        />
      </motion.div>
      
      {aiEnabled && (
        <>
          {/* AI Model Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="p-6 rounded-lg border border-[#1EAEDB]/20 bg-[#111827]/50 space-y-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-md bg-[#1EAEDB]/10">
                <Cpu className="h-5 w-5 text-[#1EAEDB]" />
              </div>
              <h4 className="text-white font-medium">AI Model Configuration</h4>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="aiModel" className="text-gray-300">AI Model</Label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger id="aiModel" className="bg-[#1A1F2C] border-[#1EAEDB]/20 text-gray-200">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1F2C] border border-[#1EAEDB]/20 text-gray-200">
                    <SelectItem value="gpt-4">GPT-4 (High Precision)</SelectItem>
                    <SelectItem value="gpt-3.5">GPT-3.5 (Balanced)</SelectItem>
                    <SelectItem value="logistics-specialized">AXIMO Logistics (Specialized)</SelectItem>
                    <SelectItem value="efficiency">Efficiency (Fast Response)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">Select the AI model that powers your logistics assistant</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <Label htmlFor="temperature" className="text-gray-300">Temperature: {temperature}%</Label>
                  </div>
                  <Slider 
                    id="temperature"
                    min={1} 
                    max={100} 
                    step={1} 
                    value={[temperature]}
                    onValueChange={(values) => setTemperature(values[0])}
                    className="[&>span]:bg-[#1EAEDB] [&>span]:h-2"
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">Focused</span>
                    <span className="text-xs text-gray-500">Creative</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <Label htmlFor="maxTokens" className="text-gray-300">Response Length: {maxTokens}%</Label>
                  </div>
                  <Slider 
                    id="maxTokens"
                    min={10} 
                    max={100} 
                    step={1}
                    value={[maxTokens]} 
                    onValueChange={(values) => setMaxTokens(values[0])}
                    className="[&>span]:bg-[#1EAEDB] [&>span]:h-2"
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">Concise</span>
                    <span className="text-xs text-gray-500">Detailed</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Personality Configuration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="p-6 rounded-lg border border-[#1EAEDB]/20 bg-[#111827]/50"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-md bg-[#1EAEDB]/10">
                <MessageSquare className="h-5 w-5 text-[#1EAEDB]" />
              </div>
              <h4 className="text-white font-medium">AI Personality</h4>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="personality" className="text-gray-300">System Prompt</Label>
              <Textarea 
                id="personality"
                value={personalityPrompt}
                onChange={(e) => setPersonalityPrompt(e.target.value)}
                className="min-h-32 bg-[#1A1F2C] border-[#1EAEDB]/20 text-gray-200"
              />
              <p className="text-xs text-gray-500">
                Configure how the AI assistant should behave when interacting with users.
                This prompt sets the tone, expertise level, and behavior guidelines.
              </p>
              
              <div className="flex justify-end mt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-xs border-[#1EAEDB]/30 hover:border-[#1EAEDB]/80 text-gray-300"
                  onClick={() => setPersonalityPrompt("You are AXIMO AI, a logistics intelligence assistant. Be professional, concise, and helpful. Provide data-driven insights when available.")}
                >
                  <RefreshCw className="h-3 w-3 mr-1" /> Reset to Default
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* Access Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="p-6 rounded-lg border border-[#1EAEDB]/20 bg-[#111827]/50"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-md bg-[#1EAEDB]/10">
                <Lock className="h-5 w-5 text-[#1EAEDB]" />
              </div>
              <h4 className="text-white font-medium">AI Access Controls</h4>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300">Allow AI to access customer data</p>
                  <p className="text-xs text-gray-500">The AI will use customer information to provide personalized suggestions</p>
                </div>
                <Switch className="data-[state=checked]:bg-[#1EAEDB]" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300">Allow AI to suggest optimizations</p>
                  <p className="text-xs text-gray-500">The AI will suggest improvements to routes and schedules</p>
                </div>
                <Switch className="data-[state=checked]:bg-[#1EAEDB]" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300">Allow AI to execute actions</p>
                  <p className="text-xs text-gray-500">The AI can perform actions like sending notifications or updating records</p>
                </div>
                <Switch className="data-[state=checked]:bg-[#1EAEDB]" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300">Allow customer-facing AI</p>
                  <p className="text-xs text-gray-500">Enable AI assistance in the customer portal</p>
                </div>
                <Switch className="data-[state=checked]:bg-[#1EAEDB]" defaultChecked />
              </div>
            </div>
          </motion.div>
          
          {/* Usage Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="p-6 rounded-lg border border-[#1EAEDB]/20 bg-[#111827]/50"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-md bg-[#1EAEDB]/10">
                <BarChart3 className="h-5 w-5 text-[#1EAEDB]" />
              </div>
              <h4 className="text-white font-medium">AI Usage Statistics</h4>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Usage this month</span>
                  <span className="text-white">15.3K / 50K tokens</span>
                </div>
                <Progress value={30} className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-[#1EAEDB] [&>div]:to-[#8B5CF6]" />
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-[#1A1F2C]/60 rounded-md">
                  <p className="text-xs text-gray-500">Total AI Interactions</p>
                  <p className="text-xl font-semibold text-white mt-1">1,432</p>
                </div>
                <div className="p-4 bg-[#1A1F2C]/60 rounded-md">
                  <p className="text-xs text-gray-500">Optimization Suggestions</p>
                  <p className="text-xl font-semibold text-white mt-1">347</p>
                </div>
                <div className="p-4 bg-[#1A1F2C]/60 rounded-md">
                  <p className="text-xs text-gray-500">Actions Performed</p>
                  <p className="text-xl font-semibold text-white mt-1">89</p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button size="sm" variant="outline" className="text-xs border-[#1EAEDB]/30 hover:border-[#1EAEDB]/80 text-gray-300">
                  View Detailed Analytics
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* API Integration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="p-6 rounded-lg border border-[#1EAEDB]/20 bg-[#111827]/50"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-md bg-[#1EAEDB]/10">
                <Sliders className="h-5 w-5 text-[#1EAEDB]" />
              </div>
              <div>
                <h4 className="text-white font-medium">API Configuration</h4>
                <p className="text-xs text-gray-500">Configure external AI service credentials</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="apiKey" className="text-gray-300 mb-1.5 block">API Key</Label>
                <Input 
                  id="apiKey" 
                  type="password" 
                  placeholder="••••••••••••••••••••••" 
                  className="font-mono bg-[#1A1F2C] border-[#1EAEDB]/20 text-gray-200"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300">Use AXIMO's AI service</p>
                  <p className="text-xs text-gray-500">Use AXIMO's managed AI service instead of your own API key</p>
                </div>
                <Switch className="data-[state=checked]:bg-[#1EAEDB]" defaultChecked />
              </div>
            </div>
          </motion.div>
          
          {/* Automation Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="p-6 rounded-lg border border-[#1EAEDB]/20 bg-[#111827]/50"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-md bg-[#1EAEDB]/10">
                <Zap className="h-5 w-5 text-[#1EAEDB]" />
              </div>
              <h4 className="text-white font-medium">AI Automations</h4>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300">Automated route optimization</p>
                  <p className="text-xs text-gray-500">AI will suggest efficient routes based on delivery locations</p>
                </div>
                <Switch className="data-[state=checked]:bg-[#1EAEDB]" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300">Smart cargo matching</p>
                  <p className="text-xs text-gray-500">AI will match available carriers with appropriate cargo</p>
                </div>
                <Switch className="data-[state=checked]:bg-[#1EAEDB]" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300">Predictive maintenance alerts</p>
                  <p className="text-xs text-gray-500">AI will predict when vehicles need maintenance based on usage patterns</p>
                </div>
                <Switch className="data-[state=checked]:bg-[#1EAEDB]" />
              </div>
              
              <div className="flex justify-end mt-2">
                <Button className="bg-gradient-to-r from-[#1EAEDB] to-[#8B5CF6] text-white">
                  Configure Advanced Automations
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
