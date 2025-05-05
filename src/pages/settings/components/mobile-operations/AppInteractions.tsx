
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock, Activity, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { AppInteraction } from "@/pages/users/types";

interface AppInteractionsProps {
  interactions: AppInteraction[];
}

export function AppInteractions({ interactions }: AppInteractionsProps) {
  return (
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
        {interactions.map((interaction) => (
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
  );
}
