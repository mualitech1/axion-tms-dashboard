import * as React from "react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { LucideIcon, LucideProps } from "lucide-react";
import { AlertCircle } from "lucide-react";

interface InputWithIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon | ReactNode;
  error?: string | string[] | undefined;
  success?: boolean;
}

export const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ className, type, icon, error, success, ...props }, ref) => {
    // Handle different error formats
    const renderError = () => {
      if (!error) return null;
      
      if (typeof error === 'string') {
        return (
          <div className="mt-1 flex items-center gap-1 text-xs text-red-500">
            <AlertCircle className="h-3 w-3" />
            {error}
          </div>
        );
      }
      
      if (Array.isArray(error) && error.length > 0) {
        return (
          <div className="mt-1 space-y-1">
            {error.map((err, index) => (
              <div key={index} className="flex items-center gap-1 text-xs text-red-500">
                <AlertCircle className="h-3 w-3" />
                {err}
              </div>
            ))}
          </div>
        );
      }
      
      return null;
    };

    const hasError = error && (typeof error === 'string' ? error.length > 0 : error.length > 0);

    return (
      <div className="w-full">
        <div className="relative">
          {icon && (
            <div className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 transition-colors",
              hasError ? "text-red-500" : success ? "text-green-500" : "text-gray-500"
            )}>
              {React.isValidElement(icon) ? (
                icon
              ) : (
                React.createElement(icon as React.ComponentType<LucideProps>, { 
                  size: 16,
                  className: "h-4 w-4" 
                })
              )}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
              icon ? "pl-10" : "",
              hasError 
                ? "border-red-500 focus-visible:ring-red-500 bg-red-50" 
                : success 
                  ? "border-green-500 focus-visible:ring-green-500 bg-green-50"
                  : "hover:border-gray-300 focus:border-blue-500",
              className
            )}
            ref={ref}
            {...props}
          />
          {success && !hasError && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>
        {renderError()}
      </div>
    );
  }
);

InputWithIcon.displayName = "InputWithIcon";
