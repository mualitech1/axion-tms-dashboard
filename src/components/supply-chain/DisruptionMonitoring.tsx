
import React from 'react';
import { AlertTriangle, Map, Calendar, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { mockDisruptionData } from '@/data/supplyChainData';

export function DisruptionMonitoring() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500 hover:bg-red-600';
      case 'medium': return 'bg-amber-500 hover:bg-amber-600';
      case 'low': return 'bg-blue-500 hover:bg-blue-600';
      default: return 'bg-slate-500 hover:bg-slate-600';
    }
  };

  return (
    <Card className="bg-aximo-card">
      <CardHeader className="pb-2">
        <CardTitle>Supply Chain Disruption Monitoring</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockDisruptionData.filter(d => d.severity === 'high').slice(0, 1).map(disruption => (
              <Card key={disruption.id} className="bg-red-950 border-red-800">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge className={getSeverityColor(disruption.severity)}>
                      High Severity
                    </Badge>
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  </div>
                  <CardTitle className="text-lg mt-2">{disruption.type} Disruption</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Map className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{disruption.location}</span>
                      </div>
                      <Badge variant="outline" className="border-red-500 text-red-500">
                        {disruption.status}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{disruption.startDate}</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>{disruption.expectedEndDate}</span>
                    </div>
                    <p className="text-sm mt-2">{disruption.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="col-span-1 md:col-span-2">
              <Card className="bg-aximo-darker h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Current Disruptions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead>Type</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockDisruptionData.map(disruption => (
                        <TableRow key={disruption.id} className="hover:bg-aximo-card">
                          <TableCell className="font-medium">{disruption.type}</TableCell>
                          <TableCell>{disruption.location}</TableCell>
                          <TableCell>
                            <Badge className={getSeverityColor(disruption.severity)}>
                              {disruption.severity}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              disruption.status === 'active' 
                                ? 'border-red-500 text-red-500' 
                                : 'border-amber-500 text-amber-500'
                            }>
                              {disruption.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
