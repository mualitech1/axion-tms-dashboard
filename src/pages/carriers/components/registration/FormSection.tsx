
import { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  description?: string;
  icon?: ReactNode; // Added icon prop
  children: ReactNode;
}

export function FormSection({ title, description, icon, children }: FormSectionProps) {
  return (
    <div className="mb-6">
      <div className="mb-4 flex items-center">
        {icon && <div className="mr-2">{icon}</div>}
        <div>
          <h3 className="text-base font-medium">{title}</h3>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}
