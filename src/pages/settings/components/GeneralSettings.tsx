import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Atom, Sparkles, AtSign, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function GeneralSettings() {
  return (
    <Card className="bg-aximo-darker border-aximo-border overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-0 right-0 w-96 h-96 bg-aximo-primary/5 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"
      />
      <CardHeader className="border-b border-aximo-border">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-aximo-primary/20 to-purple-500/20 p-2 rounded-lg">
            <User className="h-5 w-5 text-aximo-primary" />
          </div>
          <div>
            <CardTitle className="text-aximo-text">Quantum Identity Configuration</CardTitle>
            <CardDescription className="text-aximo-text-secondary">Calibrate your multidimensional presence parameters</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-aximo-text-secondary flex items-center gap-2">
                <Atom className="h-3.5 w-3.5 text-aximo-primary" />
                Primary Designator
              </Label>
              <Input 
                id="firstName" 
                defaultValue="John" 
                className="bg-aximo-dark border-aximo-border text-aximo-text focus:border-aximo-primary focus:ring-aximo-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-aximo-text-secondary flex items-center gap-2">
                <Atom className="h-3.5 w-3.5 text-blue-400" />
                Secondary Designator
              </Label>
              <Input 
                id="lastName" 
                defaultValue="Doe" 
                className="bg-aximo-dark border-aximo-border text-aximo-text focus:border-aximo-primary focus:ring-aximo-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-aximo-text-secondary flex items-center gap-2">
                <AtSign className="h-3.5 w-3.5 text-purple-400" />
                Quantum Communication Nexus
              </Label>
              <Input 
                id="email" 
                type="email" 
                defaultValue="john.doe@example.com" 
                className="bg-aximo-dark border-aximo-border text-aximo-text focus:border-aximo-primary focus:ring-aximo-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-aximo-text-secondary flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-green-400" />
                Temporal Contact Frequency
              </Label>
              <Input 
                id="phone" 
                type="tel" 
                defaultValue="+1 (555) 123-4567" 
                className="bg-aximo-dark border-aximo-border text-aximo-text focus:border-aximo-primary focus:ring-aximo-primary/20"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dimension" className="text-aximo-text-secondary flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-pink-400" />
              Dimensional Origin
            </Label>
            <Select defaultValue="alpha">
              <SelectTrigger className="bg-aximo-dark border-aximo-border text-aximo-text w-full">
                <SelectValue placeholder="Select your dimensional origin" />
              </SelectTrigger>
              <SelectContent className="bg-aximo-darker border-aximo-border">
                <SelectItem value="alpha" className="text-aximo-text">Alpha Dimension (Primary)</SelectItem>
                <SelectItem value="beta" className="text-aximo-text">Beta Dimension (Secondary)</SelectItem>
                <SelectItem value="gamma" className="text-aximo-text">Gamma Dimension (Tertiary)</SelectItem>
                <SelectItem value="delta" className="text-aximo-text">Delta Dimension (Quaternary)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end">
            <Button className="bg-gradient-to-r from-aximo-primary to-purple-500 hover:from-aximo-primary/90 hover:to-purple-600 text-white">
              <Sparkles className="h-4 w-4 mr-2" />
              Synchronize Parameters
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
