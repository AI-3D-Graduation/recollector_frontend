import { ProgressBar, StepIndicator } from "../../shared";
import { calculateCurrentStep, calculateEstimatedTime } from "../../shared/lib/pollingUtils";
import { EmailForm } from "./emailForm";


interface LoadingProgressProps {
  taskId: string | undefined;
  progress: number;
}

const STEPS = [
  { id: 0, label: 'Image uploaded', icon: 'ri-check-line' },
  { id: 1, label: 'Analyzing structure', icon: 'ri-search-eye-line' },
  { id: 2, label: 'Generating 3D mesh', icon: 'ri-3d-view' },
  { id: 3, label: 'Finalizing model', icon: 'ri-check-double-line' }
];

export const LoadingProgress = ({ taskId, progress }: LoadingProgressProps) => {
  const currentStep = calculateCurrentStep(progress);
  const estimatedTime = calculateEstimatedTime(progress);

  return (
    <div className="text-center max-w-2xl mx-auto">
      {/* Header */}
      <div className="space-y-4 mb-12 animate-fade-in">
        <h1 className="text-4xl font-bold">
          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Converting photo into 3D model...
          </span>
        </h1>

        <p className="text-gray-200 text-lg">
          Our AI is analyzing your image and generating a detailed 3D model
        </p>

        {taskId && (
          <p className="text-gray-500 text-xs">Task ID: {taskId}</p>
        )}
      </div>

      {/* Progress Bar */}
      <ProgressBar progress={progress} className="mb-8 animate-fade-in animation-delay-200" />

      {/* Email Form */}
      <EmailForm taskId={taskId} />

      {/* Step Indicator */}
      <StepIndicator
        steps={STEPS}
        currentStep={currentStep}
        className="animate-fade-in animation-delay-600"
      />

      {/* Estimated Time */}
      <div className="mt-8 animate-fade-in animation-delay-800">
        <p className="text-gray-400 text-sm">
          Estimated time remaining: {estimatedTime} seconds
        </p>
      </div>
    </div>
  );
};