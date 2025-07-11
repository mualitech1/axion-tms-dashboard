
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  TooltipProps,
} from "recharts";
import { LineChart as LineChartIcon, PieChart as PieChartIcon, BarChart as BarChartIcon } from "lucide-react";
import { ComplianceStatusData } from "../../data/types/performanceTypes";

interface PerformanceOverTimeChartProps {
  data: { name: string; onTime: number; compliance: number; incidents: number }[];
}

export function PerformanceOverTimeChart({ data }: PerformanceOverTimeChartProps) {
  return (
    <Card className="border-aximo-border bg-aximo-card shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <LineChartIcon className="h-5 w-5 mr-2 text-indigo-400" />
          Performance Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#394150' }} />
              <Legend />
              <Line
                type="monotone"
                dataKey="onTime"
                name="On-Time Delivery (%)"
                stroke="#818CF8"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="compliance"
                name="Compliance Score (%)"
                stroke="#10b981"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="incidents"
                name="Incidents (per 100)"
                stroke="#f59e0b"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

interface CarrierScoresChartProps {
  data: { name: string; performanceScore: number }[];
}

export function CarrierScoresChart({ data }: CarrierScoresChartProps) {
  return (
    <Card className="border-aximo-border bg-aximo-card shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <BarChartIcon className="h-5 w-5 mr-2 text-indigo-400" />
          Top Carrier Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#394150' }} />
              <Bar dataKey="performanceScore" name="Performance Score" fill="#818CF8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

interface ComplianceStatusChartProps {
  data: ComplianceStatusData[];
}

export function ComplianceStatusChart({ data }: ComplianceStatusChartProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card className="border-aximo-border bg-aximo-card shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <PieChartIcon className="h-5 w-5 mr-2 text-indigo-400" />
          Compliance Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#394150' }}
                formatter={(value, name, props) => [`${value} carriers (${((value as number)/total*100).toFixed(1)}%)`, props.payload.status]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
