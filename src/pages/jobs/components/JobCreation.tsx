
import JobCreationForm from "./job-creation/JobCreationForm";

interface JobCreationProps {
  onComplete: () => void;
}

export default function JobCreation({ onComplete }: JobCreationProps) {
  return <JobCreationForm onComplete={onComplete} />;
}
