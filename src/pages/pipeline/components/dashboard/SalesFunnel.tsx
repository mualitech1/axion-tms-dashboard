
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { pipelineStages, initialLeadsData } from '../../data/pipelineData';

export default function SalesFunnel() {
  // Count leads per stage
  const stageData = pipelineStages.map(stage => {
    const count = initialLeadsData.filter(lead => lead.stage === stage.id).length;
    return {
      name: stage.name,
      count
    };
  });
  
  // Filter out the "Lost" stage for the funnel visualization
  const activeStageData = stageData.filter(stage => stage.name !== "Lost");

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        layout="vertical"
        data={activeStageData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="name"
          axisLine={false}
          tickLine={false}
          width={150}
        />
        <Tooltip 
          formatter={(value) => [`${value} Leads`, 'Count']}
          cursor={{ fill: 'transparent' }}
        />
        <Bar
          dataKey="count"
          fill="#3b82f6"
          radius={[0, 4, 4, 0]}
          barSize={30}
        >
          <LabelList dataKey="count" position="right" fill="#000" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
