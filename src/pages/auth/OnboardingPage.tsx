import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/hooks/use-onboarding';
import { AxionLogo } from '@/components/axion-logo/AxionLogo';

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { resetOnboarding } = useOnboarding();

  const handleContinue = () => {
    // Mark onboarding as complete (disable first visit)
    resetOnboarding();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white p-6">
      <div className="mb-8">
        <AxionLogo size="lg" variant="quantum" />
      </div>
      <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-yellow-300 bg-clip-text text-transparent">Welcome to Axion TMS</h1>
      <p className="text-lg mb-6 max-w-xl text-center text-aximo-text-secondary">
        You are about to experience the next generation of transport management. Axion is powered by quantum intelligence, designed for speed, security, and a touch of magic. As a manager, you have full access to all features. Let's get you started!
      </p>
      <Button size="lg" className="bg-aximo-primary hover:bg-aximo-primary-hover text-white px-8 py-3 rounded-full shadow-lg" onClick={handleContinue}>
        Continue to Dashboard
      </Button>
    </div>
  );
};

export default OnboardingPage; 