
interface DashboardHeaderProps {
  title: string;
  subtitle: string;
}

export default function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-aximo-text bg-gradient-to-r from-aximo-primary to-aximo-light bg-clip-text text-transparent">
        {title}
      </h1>
      <p className="text-aximo-text-secondary mt-1">{subtitle}</p>
    </div>
  );
}
