
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { 
  Map, 
  Phone, 
  Calendar, 
  Clock, 
  Search, 
  Download, 
  FilterX, 
  Info, 
  RotateCcw,
  Smartphone,
  Activity
} from 'lucide-react';

// Mock data for demonstration purposes
const mockCheckRecords = [
  {
    id: "1",
    userId: 1,
    type: 'check-in',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    location: {
      latitude: 51.5074,
      longitude: -0.1278,
      address: "123 Fleet St, London"
    },
    deviceInfo: {
      deviceId: "device-001",
      model: "iPhone 13",
      platform: "iOS",
      osVersion: "16.5",
      appVersion: "1.2.3"
    }
  },
  {
    id: "2",
    userId: 1,
    type: 'check-out',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    location: {
      latitude: 51.5173,
      longitude: -0.1223,
      address: "456 Oxford St, London"
    },
    deviceInfo: {
      deviceId: "device-001",
      model: "iPhone 13",
      platform: "iOS",
      osVersion: "16.5",
      appVersion: "1.2.3"
    }
  }
];

const mockGpsHistory = [
  {
    latitude: 51.5074,
    longitude: -0.1278,
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    accuracy: 5,
    speed: 0,
    altitude: 35,
    heading: 0,
    deviceId: "device-001",
    userId: 1
  },
  {
    latitude: 51.5077,
    longitude: -0.1268,
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
    accuracy: 8,
    speed: 15,
    altitude: 36,
    heading: 45,
    deviceId: "device-001",
    userId: 1
  },
  {
    latitude: 51.5173,
    longitude: -0.1223,
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    accuracy: 4,
    speed: 0,
    altitude: 40,
    heading: 0,
    deviceId: "device-001",
    userId: 1
  }
];

const mockAppInteractions = [
  {
    id: "1",
    userId: 1,
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
    eventType: "screenView",
    screenName: "JobDetails",
    actionTaken: "view",
    duration: 120,
    result: "success",
    deviceInfo: {
      deviceId: "device-001",
      networkType: "4G",
      batteryLevel: 85
    }
  },
  {
    id: "2",
    userId: 1,
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    eventType: "action",
    screenName: "JobDetails",
    actionTaken: "markAsCompleted",
    duration: 3,
    result: "success",
    deviceInfo: {
      deviceId: "device-001",
      networkType: "4G",
      batteryLevel: 80
    }
  },
  {
    id: "3",
    userId: 1,
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
    eventType: "screenView",
    screenName: "Dashboard",
    actionTaken: "view",
    duration: 45,
    result: "success",
    deviceInfo: {
      deviceId: "device-001",
      networkType: "WiFi",
      batteryLevel: 75
    }
  }
];

export default function MobileOperations() {
  const [activeTab, setActiveTab] = useState("check-records");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  const handleRefresh = () => {
    toast({
      title: "Data Refreshed",
      description: "Latest mobile operations data has been loaded.",
    });
  };
  
  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your data export is being prepared and will download shortly.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5" /> Mobile Operations
        </CardTitle>
        <CardDescription>
          Track mobile operations activities, check-ins, location history, and app interactions
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="check-records" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="check-records">Check In/Out</TabsTrigger>
              <TabsTrigger value="gps-history">GPS History</TabsTrigger>
              <TabsTrigger value="app-interactions">App Interactions</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                <RotateCcw className="h-4 w-4 mr-1" /> Refresh
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-1" /> Export
              </Button>
            </div>
          </div>
          
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search records..." 
                className="pl-8" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select defaultValue="7days">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="sm">
              <FilterX className="h-4 w-4 mr-1" /> Clear
            </Button>
          </div>

          <TabsContent value="check-records" className="mt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>App Version</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCheckRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={`${
                          record.type === 'check-in' 
                            ? 'bg-green-100 text-green-800 border-green-200' 
                            : 'bg-blue-100 text-blue-800 border-blue-200'
                        }`}
                      >
                        {record.type === 'check-in' ? 'Check-in' : 'Check-out'}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1.5 text-muted-foreground" />
                        {format(new Date(record.timestamp), 'MMM d, yyyy')}
                      </div>
                      <div className="flex items-center text-muted-foreground text-xs mt-1">
                        <Clock className="h-3 w-3 mr-1.5" />
                        {format(new Date(record.timestamp), 'h:mm a')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Map className="h-4 w-4 mr-1.5 text-muted-foreground" />
                        {record.location?.address || 'Unknown location'}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {record.location 
                          ? `${record.location.latitude.toFixed(4)}, ${record.location.longitude.toFixed(4)}` 
                          : 'No coordinates'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Smartphone className="h-4 w-4 mr-1.5 text-muted-foreground" />
                        {record.deviceInfo?.model || 'Unknown device'}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {record.deviceInfo 
                          ? `${record.deviceInfo.platform} ${record.deviceInfo.osVersion}` 
                          : ''}
                      </div>
                    </TableCell>
                    <TableCell>{record.deviceInfo?.appVersion || 'Unknown'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="gps-history" className="mt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Coordinates</TableHead>
                  <TableHead>Speed</TableHead>
                  <TableHead>Altitude</TableHead>
                  <TableHead>Accuracy</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockGpsHistory.map((location, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1.5 text-muted-foreground" />
                        {format(new Date(location.timestamp), 'MMM d, yyyy')}
                      </div>
                      <div className="flex items-center text-muted-foreground text-xs mt-1">
                        <Clock className="h-3 w-3 mr-1.5" />
                        {format(new Date(location.timestamp), 'h:mm:ss a')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Map className="h-4 w-4 mr-1.5 text-muted-foreground" />
                        {`${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`}
                      </div>
                    </TableCell>
                    <TableCell>
                      {location.speed !== undefined ? `${location.speed} km/h` : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {location.altitude !== undefined ? `${location.altitude}m` : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {location.accuracy !== undefined ? `±${location.accuracy}m` : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="app-interactions" className="mt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Screen / Event</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Device Info</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAppInteractions.map((interaction) => (
                  <TableRow key={interaction.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1.5 text-muted-foreground" />
                        {format(new Date(interaction.timestamp), 'MMM d, yyyy')}
                      </div>
                      <div className="flex items-center text-muted-foreground text-xs mt-1">
                        <Clock className="h-3 w-3 mr-1.5" />
                        {format(new Date(interaction.timestamp), 'h:mm:ss a')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="mb-1">
                        {interaction.eventType}
                      </Badge>
                      <div className="text-sm">{interaction.screenName}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Activity className="h-4 w-4 mr-1.5 text-muted-foreground" />
                        {interaction.actionTaken}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Result: <span className={interaction.result === 'success' ? 'text-green-500' : 'text-red-500'}>
                          {interaction.result}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {interaction.duration ? `${interaction.duration}s` : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Smartphone className="h-4 w-4 mr-1.5 text-muted-foreground" />
                        Network: {interaction.deviceInfo?.networkType || 'Unknown'}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Battery: {interaction.deviceInfo?.batteryLevel !== undefined ? `${interaction.deviceInfo.batteryLevel}%` : 'N/A'}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
