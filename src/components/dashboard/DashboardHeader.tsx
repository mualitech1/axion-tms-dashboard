
interface DashboardHeaderProps {
  title: string;
  subtitle: string;
}

export default function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  return (
    <div className="mb-6 relative">
      <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-aximo-primary via-aximo-light to-aximo-primary bg-clip-text text-transparent animate-text">
        {title}
      </h1>
      <p className="text-aximo-text-secondary mt-1 md:text-lg">{subtitle}</p>
      <div className="absolute -inset-1 bg-gradient-to-r from-aximo-primary/20 to-transparent blur-lg opacity-50 -z-10" />
    </div>
  );
}
