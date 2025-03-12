
interface DashboardHeaderProps {
  title: string;
  subtitle: string;
}

export default function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold text-tms-gray-800">{title}</h1>
      <p className="text-tms-gray-600">{subtitle}</p>
    </div>
  );
}
