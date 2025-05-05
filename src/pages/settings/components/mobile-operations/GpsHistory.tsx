
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock, Map } from "lucide-react";
import { format } from "date-fns";
import { GpsLocation } from "@/pages/users/types";

interface GpsHistoryProps {
  locations: GpsLocation[];
}

export function GpsHistory({ locations }: GpsHistoryProps) {
  return (
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
        {locations.map((location, index) => (
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
  );
}
