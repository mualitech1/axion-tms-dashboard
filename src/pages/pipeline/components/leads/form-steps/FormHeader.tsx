
import React from 'react';
import { StepIndicator } from '@/pages/jobs/components/job-creation/StepIndicator';

interface FormHeaderProps {
  currentStep: number;
  totalSteps: number;
}

export default function FormHeader({ currentStep, totalSteps }: FormHeaderProps) {
  return (
    <div className="mb-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl px-6 py-4 text-white">
        <h1 className="text-xl font-bold">Create New Lead</h1>
        <p className="text-blue-100 mt-1">Add a new lead to your sales pipeline</p>
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      </div>
    </div>
  );
}
