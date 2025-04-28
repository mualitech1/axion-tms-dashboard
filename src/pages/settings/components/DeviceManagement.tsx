
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DeviceInfo, getDevices, removeDevice } from "@/services/device-management";
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Laptop, Smartphone, Server, AlertTriangle, CheckCircle, Trash2, Loader2 } from "lucide-react";

export default function DeviceManagement() {
  const [devices, setDevices] = useState<DeviceInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    async function fetchDevices() {
      if (user) {
        try {
          setLoading(true);
          const deviceList = await getDevices();
          setDevices(deviceList);
        } catch (error) {
          console.error("Error fetching devices:", error);
          toast({
            title: "Error",
            description: "Failed to load devices",
            variant: "destructive"
          });
        } finally {
          setLoading(false);
        }
      }
    }
    
    fetchDevices();
  }, [user, toast]);

  const handleRemoveDevice = async (deviceId: string) => {
    if (!user) return;
    
    try {
      setRemovingId(deviceId);
      const success = await removeDevice(deviceId, user.id);
      
      if (success) {
        setDevices(devices.filter(device => device.id !== deviceId));
        toast({
          title: "Device removed",
          description: "The device has been removed from your account",
        });
      } else {
        throw new Error("Failed to remove device");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to remove device",
        variant: "destructive"
      });
    } finally {
      setRemovingId(null);
    }
  };

  const getDeviceIcon = (device: DeviceInfo) => {
    const os = device.os?.toLowerCase() || '';
    
    if (os.includes('ios') || os.includes('android')) {
      return <Smartphone className="h-5 w-5 text-blue-500" />;
    } else if (os.includes('windows') || os.includes('mac') || os.includes('linux')) {
      return <Laptop className="h-5 w-5 text-purple-500" />;
    } else {
      return <Server className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatLastActive = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 30) return `${diffDays} days ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Laptop className="h-5 w-5" /> Device Management
        </CardTitle>
        <CardDescription>
          Manage devices that are currently logged into your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        ) : devices.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Laptop className="h-10 w-10 mx-auto mb-2 opacity-50" />
            <p>No devices found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {devices.map((device) => (
              <div 
                key={device.id} 
                className={`p-4 border rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  device.is_current ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  {getDeviceIcon(device)}
                  <div>
                    <div className="font-medium">{device.name}</div>
                    <div className="text-sm text-gray-500">
                      {device.browser} • {device.is_current ? (
                        <span className="text-blue-600 font-medium flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" /> Current device
                        </span>
                      ) : (
                        `Last active: ${formatLastActive(device.last_active)}`
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      IP: {device.ip_address}
                    </div>
                  </div>
                </div>
                
                <div>
                  {!device.is_current && (
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => handleRemoveDevice(device.id)}
                      disabled={!!removingId}
                      className="whitespace-nowrap"
                    >
                      {removingId === device.id ? (
                        <>
                          <Loader2 className="mr-2 h-3 w-3 animate-spin" /> Removing...
                        </>
                      ) : (
                        <>
                          <Trash2 className="mr-2 h-3 w-3" /> Remove device
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            ))}
            
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
              <div className="flex gap-2 items-center mb-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span className="font-medium text-amber-800">Security notice</span>
              </div>
              <p className="text-amber-800">
                If you don't recognize a device, remove it immediately and change your password.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
