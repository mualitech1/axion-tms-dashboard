
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Map, Smartphone } from "lucide-react";
import { format } from "date-fns";
import { MobileCheckRecord } from "@/pages/users/types";

interface CheckInRecordsProps {
  records: MobileCheckRecord[];
}

export function CheckInRecords({ records }: CheckInRecordsProps) {
  return (
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
        {records.map((record) => (
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
  );
}
