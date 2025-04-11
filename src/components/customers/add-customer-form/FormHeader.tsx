
import { FormProgressBar } from './FormProgressBar';

interface FormHeaderProps {
  formCompletion: number;
}

export const FormHeader = ({ formCompletion }: FormHeaderProps) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Add New Customer</h2>
        <p className="text-muted-foreground">
          Fill in the details to create a new customer record
        </p>
      </div>
      <FormProgressBar formCompletion={formCompletion} />
    </div>
  );
};
