import React, { useEffect, useState, useRef } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
  ReferenceLine,
} from 'recharts';
import { cn } from '@/lib/utils';
import { useResponsive } from '@/hooks/use-responsive';
import { Maximize2, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EnhancedChartProps {
  title?: string;
  data: any[];
  type: 'line' | 'bar' | 'area';
  className?: string;
  height?: number;
  colors?: {
    primary: string;
    secondary?: string;
    grid?: string;
    refLine?: string;
  };
  showLegend?: boolean;
  dataKeys?: string[];
  dataLabels?: string[];
  onRefresh?: () => void;
  refLines?: { value: number; label: string; color: string }[];
  allowDownload?: boolean;
  allowFullscreen?: boolean;
}

export function EnhancedChart({
  title,
  data,
  type,
  className,
  height = 300,
  colors = {
    primary: '#0090FF',
    secondary: '#FF4842',
    grid: 'rgba(255, 255, 255, 0.1)',
    refLine: 'rgba(255, 220, 100, 0.6)',
  },
  showLegend = false,
  dataKeys = ['value'],
  dataLabels,
  onRefresh,
  refLines,
  allowDownload = false,
  allowFullscreen = false,
}: EnhancedChartProps) {
  const { isMobile, isDesktopAndAbove } = useResponsive();
  const [chartData, setChartData] = useState<any[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  
  // Animate chart data
  useEffect(() => {
    setChartData([]);
    const timer = setTimeout(() => {
      setChartData(data);
    }, 200);
    return () => clearTimeout(timer);
  }, [data]);

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (!chartRef.current) return;
    
    if (!isFullscreen) {
      if (chartRef.current.requestFullscreen) {
        chartRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Export chart as image
  const downloadChart = () => {
    if (!chartRef.current) return;
    
    // Create a canvas from the chart
    const svgElement = chartRef.current.querySelector('svg');
    if (!svgElement) return;
    
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    // Set canvas dimensions
    canvas.width = svgElement.clientWidth;
    canvas.height = svgElement.clientHeight;
    
    img.onload = () => {
      if (!ctx) return;
      // Fill with dark background
      ctx.fillStyle = '#131924';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      
      // Add title if available
      if (title) {
        ctx.fillStyle = 'white';
        ctx.font = '14px Arial';
        ctx.fillText(title, 10, 20);
      }
      
      // Create download link
      const a = document.createElement('a');
      a.download = `${title || 'chart'}-${new Date().toISOString().split('T')[0]}.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    };
    
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  const renderLegend = () => {
    if (!showLegend) return null;
    
    const labels = dataLabels || dataKeys;
    
    return (
      <div className="flex justify-center mt-4 space-x-6">
        {dataKeys[0] && (
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: colors.primary }} />
            <span className={cn(
              "text-aximo-text transition-all duration-300",
              isMobile ? "text-xs" : "text-sm"
            )}>
              {labels[0]}
            </span>
          </div>
        )}
        {dataKeys[1] && colors.secondary && (
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: colors.secondary }} />
            <span className={cn(
              "text-aximo-text transition-all duration-300",
              isMobile ? "text-xs" : "text-sm"
            )}>
              {labels[1]}
            </span>
          </div>
        )}
      </div>
    );
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-aximo-darker/95 backdrop-blur-md border border-aximo-border p-3 rounded-md shadow-aximo text-sm">
          <p className="text-aximo-text-secondary mb-1 font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`tooltip-${index}`} className="flex items-center gap-2 py-0.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-aximo-text">
                {`${dataLabels?.[index] || entry.dataKey}: ${entry.value}`}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div 
      ref={chartRef} 
      className={cn(
        "w-full relative transition-all duration-300", 
        isFullscreen ? "bg-aximo-dark p-6" : "",
        className
      )}
      style={{ height: isFullscreen ? '100vh' : `${height}px` }}
      onMouseEnter={() => isDesktopAndAbove && setIsHovered(true)}
      onMouseLeave={() => isDesktopAndAbove && setIsHovered(false)}
    >
      {/* Chart controls */}
      {isDesktopAndAbove && (isHovered || isFullscreen) && (
        <div className="absolute top-2 right-2 z-10 flex gap-1">
          {onRefresh && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-full bg-aximo-dark/80 backdrop-blur-sm border border-aximo-border shadow-sm"
              onClick={onRefresh}
              title="Refresh data"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </Button>
          )}
          
          {allowDownload && (
            <Button
              variant="ghost" 
              size="icon"
              className="h-7 w-7 rounded-full bg-aximo-dark/80 backdrop-blur-sm border border-aximo-border shadow-sm"
              onClick={downloadChart}
              title="Download chart"
            >
              <Download className="h-3.5 w-3.5" />
            </Button>
          )}
          
          {allowFullscreen && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-full bg-aximo-dark/80 backdrop-blur-sm border border-aximo-border shadow-sm"
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      )}
      
      <ResponsiveContainer>
        {type === 'line' ? (
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="primaryGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.primary} stopOpacity={0.3} />
                <stop offset="95%" stopColor={colors.primary} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} vertical={false} />
            <XAxis
              dataKey="name"
              stroke="currentColor"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: colors.grid }}
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: isMobile ? 10 : 11 }}
            />
            <YAxis
              stroke="currentColor"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: colors.grid }}
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: isMobile ? 10 : 11 }}
              width={35}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey={dataKeys[0]}
              stroke={colors.primary}
              strokeWidth={isFullscreen ? 3 : 2}
              dot={{ fill: colors.primary, strokeWidth: 2, r: isFullscreen ? 5 : 4, strokeOpacity: 0.8 }}
              activeDot={{ r: isFullscreen ? 7 : 6, stroke: colors.primary }}
              name={dataLabels ? dataLabels[0] : dataKeys[0]}
              isAnimationActive={!isMobile}
              animationDuration={1500}
            />
            {dataKeys[1] && colors.secondary && (
              <Line
                type="monotone"
                dataKey={dataKeys[1]}
                stroke={colors.secondary}
                strokeWidth={isFullscreen ? 3 : 2}
                dot={{ fill: colors.secondary, strokeWidth: 2, r: isFullscreen ? 5 : 4, strokeOpacity: 0.8 }}
                activeDot={{ r: isFullscreen ? 7 : 6, stroke: colors.secondary }}
                name={dataLabels ? dataLabels[1] : dataKeys[1]}
                isAnimationActive={!isMobile}
                animationDuration={1500}
              />
            )}
            {refLines?.map((line, index) => (
              <ReferenceLine 
                key={`refline-${index}`} 
                y={line.value} 
                stroke={line.color || colors.refLine} 
                strokeDasharray="3 3"
                label={{ 
                  value: line.label, 
                  fill: 'rgba(255,255,255,0.7)', 
                  fontSize: 11 
                }} 
              />
            ))}
            {showLegend && <Legend content={() => null} />} {/* Hidden native legend */}
          </LineChart>
        ) : type === 'area' ? (
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="primaryGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.primary} stopOpacity={0.3} />
                <stop offset="95%" stopColor={colors.primary} stopOpacity={0} />
              </linearGradient>
              {colors.secondary && (
                <linearGradient id="secondaryGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.secondary} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={colors.secondary} stopOpacity={0} />
                </linearGradient>
              )}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} vertical={false} />
            <XAxis
              dataKey="name"
              stroke="currentColor"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: colors.grid }}
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: isMobile ? 10 : 11 }}
            />
            <YAxis
              stroke="currentColor"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: colors.grid }}
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: isMobile ? 10 : 11 }}
              width={35}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey={dataKeys[0]}
              stroke={colors.primary}
              fill="url(#primaryGradient)"
              name={dataLabels ? dataLabels[0] : dataKeys[0]}
              isAnimationActive={!isMobile}
              animationDuration={1500}
            />
            {dataKeys[1] && colors.secondary && (
              <Area
                type="monotone"
                dataKey={dataKeys[1]}
                stroke={colors.secondary}
                fill="url(#secondaryGradient)"
                name={dataLabels ? dataLabels[1] : dataKeys[1]}
                isAnimationActive={!isMobile}
                animationDuration={1500}
              />
            )}
            {refLines?.map((line, index) => (
              <ReferenceLine 
                key={`refline-${index}`} 
                y={line.value} 
                stroke={line.color || colors.refLine} 
                strokeDasharray="3 3"
                label={{ 
                  value: line.label, 
                  fill: 'rgba(255,255,255,0.7)', 
                  fontSize: 11 
                }} 
              />
            ))}
            {showLegend && <Legend content={() => null} />} {/* Hidden native legend */}
          </AreaChart>
        ) : (
          <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} vertical={false} />
            <XAxis
              dataKey="name"
              stroke="currentColor"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: colors.grid }}
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: isMobile ? 10 : 11 }}
            />
            <YAxis
              stroke="currentColor"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: colors.grid }}
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: isMobile ? 10 : 11 }}
              width={35}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey={dataKeys[0]}
              fill={colors.primary}
              radius={[4, 4, 0, 0]}
              name={dataLabels ? dataLabels[0] : dataKeys[0]}
              isAnimationActive={!isMobile}
              animationDuration={1000}
            />
            {dataKeys[1] && colors.secondary && (
              <Bar
                dataKey={dataKeys[1]}
                fill={colors.secondary}
                radius={[4, 4, 0, 0]}
                name={dataLabels ? dataLabels[1] : dataKeys[1]}
                isAnimationActive={!isMobile}
                animationDuration={1000}
              />
            )}
            {refLines?.map((line, index) => (
              <ReferenceLine 
                key={`refline-${index}`} 
                y={line.value} 
                stroke={line.color || colors.refLine} 
                strokeDasharray="3 3"
                label={{ 
                  value: line.label, 
                  fill: 'rgba(255,255,255,0.7)', 
                  fontSize: 11
                }} 
              />
            ))}
            {showLegend && <Legend content={() => null} />} {/* Hidden native legend */}
          </BarChart>
        )}
      </ResponsiveContainer>
      {showLegend && renderLegend()}
    </div>
  );
}
