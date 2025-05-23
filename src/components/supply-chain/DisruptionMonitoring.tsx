import React from 'react';
import { AlertTriangle, Network, Calendar, ArrowRight, Zap, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { mockDisruptionData } from '@/data/supplyChainData';

export function DisruptionMonitoring() {
  // Mapping for status and severity labels with quantum terminology
  const statusLabels = {
    'active': 'fluctuating',
    'monitoring': 'stabilizing'
  };

  const severityLabels = {
    'high': 'critical',
    'medium': 'significant',
    'low': 'minor'
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-950/30 text-red-400 border-red-500/20';
      case 'medium': return 'bg-amber-950/30 text-amber-400 border-amber-500/20';
      case 'low': return 'bg-blue-950/30 text-blue-400 border-blue-500/20';
      default: return 'bg-slate-950/30 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <Card className="bg-aximo-card border-aximo-border shadow-aximo">
      <CardHeader className="pb-2">
        <CardTitle className="text-aximo-text">Quantum Field Anomaly Monitor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockDisruptionData.filter(d => d.severity === 'high').slice(0, 1).map(disruption => (
              <Card key={disruption.id} className="bg-aximo-darker border-red-950/20">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge className={getSeverityColor(disruption.severity)}>
                      Critical Anomaly
                    </Badge>
                    <Sparkles className="h-5 w-5 text-red-400" />
                  </div>
                  <CardTitle className="text-lg mt-2 text-aximo-text">{disruption.type} Field Distortion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Network className="h-4 w-4 mr-2 text-aximo-text-secondary" />
                        <span className="text-aximo-text">{disruption.location}</span>
                      </div>
                      <Badge variant="outline" className="border-red-500/20 text-red-400 bg-red-950/30">
                        {statusLabels[disruption.status] || disruption.status}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-aximo-text-secondary">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{disruption.startDate}</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>{disruption.expectedEndDate}</span>
                    </div>
                    <p className="text-sm mt-2 text-aximo-text">{disruption.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="col-span-1 md:col-span-2">
              <Card className="bg-aximo-darker h-full border-aximo-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-aximo-text">Current Field Anomalies</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent border-aximo-border">
                        <TableHead className="font-semibold text-aximo-text">Anomaly Type</TableHead>
                        <TableHead className="font-semibold text-aximo-text">Spatial Region</TableHead>
                        <TableHead className="font-semibold text-aximo-text">Intensity</TableHead>
                        <TableHead className="font-semibold text-aximo-text">Flux State</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockDisruptionData.map(disruption => (
                        <TableRow key={disruption.id} className="hover:bg-aximo-card/50 border-aximo-border">
                          <TableCell className="font-medium text-aximo-text">{disruption.type}</TableCell>
                          <TableCell className="text-aximo-text">{disruption.location}</TableCell>
                          <TableCell>
                            <Badge className={getSeverityColor(disruption.severity)}>
                              {severityLabels[disruption.severity] || disruption.severity}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              disruption.status === 'active' 
                                ? 'border-red-500/20 text-red-400 bg-red-950/30' 
                                : 'border-amber-500/20 text-amber-400 bg-amber-950/30'
                            }>
                              {statusLabels[disruption.status] || disruption.status}
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
