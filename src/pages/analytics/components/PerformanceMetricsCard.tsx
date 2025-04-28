
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BadgeDelta } from '@/components/ui/badge-delta';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface MetricProps {
  title: string;
  value: string | number;
  target?: number;
  progress?: number;
  change?: {
    value: number;
    trend: 'up' | 'down' | 'neutral';
  };
  icon?: React.ReactNode;
  miniChart?: boolean;
  suffix?: string;
  color?: 'default' | 'success' | 'warning' | 'danger';
}

export function PerformanceMetricsCard({
  title,
  value,
  target,
  progress,
  change,
  icon,
  miniChart = false,
  suffix = "",
  color = 'default'
}: MetricProps) {
  const getColorClass = () => {
    switch (color) {
      case 'success':
        return 'text-emerald-600';
      case 'warning':
        return 'text-amber-600';
      case 'danger':
        return 'text-rose-600';
      default:
        return 'text-blue-600';
    }
  };
  
  const getProgressColor = () => {
    switch (color) {
      case 'success':
        return 'bg-emerald-600';
      case 'warning':
        return 'bg-amber-600';
      case 'danger':
        return 'bg-rose-600';
      default:
        return 'bg-blue-600';
    }
  };

  const getTrendIcon = () => {
    if (!change) return null;
    
    switch (change.trend) {
      case 'up':
        return <ArrowUpRight className="h-4 w-4 text-emerald-600" />;
      case 'down':
        return <ArrowDownRight className="h-4 w-4 text-rose-600" />;
      default:
        return <Minus className="h-4 w-4 text-slate-400" />;
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <div className={`text-2xl font-bold ${getColorClass()}`}>
                {value}
                {suffix && <span className="text-sm ml-1">{suffix}</span>}
              </div>
              {change && (
                <div className="flex items-center gap-1">
                  {getTrendIcon()}
                  <BadgeDelta value={change.value} />
                </div>
              )}
            </div>
          </div>
          {icon && (
            <div className="rounded-full p-2 bg-muted/30">
              {icon}
            </div>
          )}
        </div>
        
        {(target || progress !== undefined) && (
          <div className="mt-4 space-y-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              {target && <span>{progress || 0}% of {target}</span>}
            </div>
            <Progress 
              value={progress} 
              className="h-1.5" 
              indicatorClassName={getProgressColor()}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
