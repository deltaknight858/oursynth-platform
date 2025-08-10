'use client';

import React, { useState, useCallback } from 'react';
import Step1ProjectInfo from '../../../components/Step1ProjectInfo';
import Step2CoreDependencies from '../../../components/Step2CoreDependencies';
import Step3StylingTheme from '../../../components/Step3StylingTheme';
import Step4PageTemplates from '../../../components/Step4PageTemplates';
import Step5BackendFeatures from '../../../components/Step5BackendFeatures';
import Step6AIIntegration from '../../../components/Step6AIIntegration';
import Step7ReviewGenerate from '../../../components/Step7ReviewGenerate';

interface WizardData {
  projectName: string;
  description: string;
  dependencies: string[];
  theme: string;
  customNotes: string;
  primaryColor: string;
  secondaryColor: string;
  pages: string[];
  backendFeatures: string[];
  aiProvider: string;
  notes: string;
}

const StepsBreadcrumb = ({ currentStep, labels, onEdit }: {
  currentStep: number;
  labels: string[];
  onEdit: (stepIndex: number) => void;
}) => (
  <div className="flex flex-wrap gap-2 mb-6">
    {labels.map((label, index) => (
      <button
        key={index}
        onClick={() => onEdit(index)}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
          index === currentStep
            ? 'bg-cyan-500/20 text-cyan-300 neon-border-light'
            : index < currentStep
            ? 'bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30'
            : 'bg-gray-500/20 text-gray-400 border border-gray-500/30 hover:bg-gray-500/30'
        }`}
      >
        {index + 1}. {label}
      </button>
    ))}
  </div>
);

const LivePreview = ({ isOpen, onClose, data }: {
  isOpen: boolean;
  onClose: () => void;
  data: WizardData;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Live Preview</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="text-cyan-300 font-semibold mb-2">Project Info</h3>
            <p className="text-gray-300">Name: {data.projectName || 'Not set'}</p>
            <p className="text-gray-300">Description: {data.description || 'Not set'}</p>
          </div>
          <div>
            <h3 className="text-cyan-300 font-semibold mb-2">Dependencies</h3>
            <p className="text-gray-300">{data.dependencies?.join(', ') || 'None selected'}</p>
          </div>
          <div>
            <h3 className="text-cyan-300 font-semibold mb-2">Theme</h3>
            <p className="text-gray-300">Theme: {data.theme || 'Not selected'}</p>
            {data.primaryColor && <p className="text-gray-300">Primary: {data.primaryColor}</p>}
            {data.secondaryColor && <p className="text-gray-300">Secondary: {data.secondaryColor}</p>}
          </div>
          <div>
            <h3 className="text-cyan-300 font-semibold mb-2">Pages</h3>
            <p className="text-gray-300">{data.pages?.join(', ') || 'None selected'}</p>
          </div>
          <div>
            <h3 className="text-cyan-300 font-semibold mb-2">Backend Features</h3>
            <p className="text-gray-300">{data.backendFeatures?.join(', ') || 'None selected'}</p>
          </div>
          <div>
            <h3 className="text-cyan-300 font-semibold mb-2">AI Integration</h3>
            <p className="text-gray-300">Provider: {data.aiProvider || 'Not selected'}</p>
            {data.notes && <p className="text-gray-300">Notes: {data.notes}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function StructuredWizardPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [data, setData] = useState<WizardData>({
    projectName: '',
    description: '',
    dependencies: [],
    theme: '',
    customNotes: '',
    primaryColor: '',
    secondaryColor: '',
    pages: [],
    backendFeatures: [],
    aiProvider: '',
    notes: ''
  });

  const steps = [
    Step1ProjectInfo,
    Step2CoreDependencies,
    Step3StylingTheme,
    Step4PageTemplates,
    Step5BackendFeatures,
    Step6AIIntegration,
    Step7ReviewGenerate
  ];

  const labels = [
    'Project Info',
    'Dependencies',
    'Styling & Theme',
    'Page Templates',
    'Backend Features',
    'AI Integration',
    'Review & Generate'
  ];

  const updateData = useCallback((partialData: Partial<WizardData>) => {
    setData(prev => ({ ...prev, ...partialData }));
  }, []);

  const onNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, steps.length]);

  const onBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const onEdit = useCallback((stepIndex: number) => {
    setCurrentStep(stepIndex);
  }, []);

  const openPreview = useCallback(() => {
    setPreviewOpen(true);
  }, []);

  const closePreview = useCallback(() => {
    setPreviewOpen(false);
  }, []);

  const onGenerate = useCallback(() => {
    console.log('Generating code with data:', data);
    // TODO: Implement code generation
  }, [data]);

  const onExport = useCallback(() => {
    console.log('Exporting config:', data);
    // TODO: Implement config export
  }, [data]);

  const CurrentStepComponent = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="glass max-w-3xl w-full rounded-2xl p-8 neon-accent">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Advanced Setup Wizard</h1>
          <div className="flex gap-2">
            <button
              onClick={openPreview}
              className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/30 transition-all focus-ring"
            >
              Preview
            </button>
            <a
              href="/wizard"
              className="px-4 py-2 bg-gray-500/20 text-gray-300 rounded-lg border border-gray-500/30 hover:bg-gray-500/30 transition-all focus-ring text-decoration-none"
            >
              Switch Mode
            </a>
          </div>
        </div>

        <StepsBreadcrumb 
          currentStep={currentStep} 
          labels={labels} 
          onEdit={onEdit} 
        />

        <div className="mb-6">
          <CurrentStepComponent
            data={data}
            onChange={updateData}
            onNext={onNext}
            onBack={onBack}
            onEdit={onEdit}
            onGenerate={currentStep === 6 ? onGenerate : undefined}
            onExport={currentStep === 6 ? onExport : undefined}
          />
        </div>

        {currentStep < 6 && (
          <div className="flex justify-between">
            <button
              onClick={onBack}
              disabled={currentStep === 0}
              className="px-6 py-2 bg-gray-500/20 text-gray-300 rounded-lg border border-gray-500/30 hover:bg-gray-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus-ring"
            >
              Back
            </button>
            <button
              onClick={onNext}
              className="px-6 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/30 transition-all focus-ring neon-border-light"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <LivePreview 
        isOpen={previewOpen} 
        onClose={closePreview} 
        data={data} 
      />
    </div>
  );
}
