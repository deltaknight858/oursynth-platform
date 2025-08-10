import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StreamingProvider, useStreaming } from '../contexts/StreamingContext';
import GenerationProgress from './GenerationProgress';
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface CodeGeneratorState {
  // Step 1: Define
  projectType: 'component' | 'page' | 'feature' | 'fullapp';
  description: string;
  framework: 'react' | 'vue' | 'angular' | 'nextjs';
  
  // Step 2: Structure  
  structure: {
    layout: 'cards' | 'list' | 'tabs' | 'grid' | 'sidebar';
    organization: 'atomic' | 'feature' | 'domain';
    files: string[];
    dependencies: string[];
  };
  
  // Step 3: Configure
  features: {
    auth: boolean;
    charts: boolean;
    stateManagement: 'redux' | 'zustand' | 'context' | 'none';
    database: boolean;
    api: boolean;
    testing: boolean;
  };
  styling: 'tailwind' | 'styled' | 'css' | 'scss';
  typescript: boolean;
  
  // Step 4: Generate
  generatedCode: { [key: string]: string };
  isGenerating: boolean;
  generationProgress: number;
  
  // Step 5: Export
  exportFormat: 'zip' | 'github' | 'codesandbox' | 'copy';
}

const steps = [
  { id: 1, title: 'Define', description: 'What do you want to build?' },
  { id: 2, title: 'Structure', description: 'How should it be organized?' },
  { id: 3, title: 'Configure', description: 'Choose features & styling' },
  { id: 4, title: 'Generate', description: 'Watch the magic happen' },
  { id: 5, title: 'Export', description: 'Get your code' }
];

function UnifiedCodeGeneratorInternal() {
  const [currentStep, setCurrentStep] = useState(1);
  const [state, setState] = useState<CodeGeneratorState>({
    projectType: 'component',
    description: '',
    framework: 'react',
    structure: {
      layout: 'cards',
      organization: 'atomic',
      files: [],
      dependencies: []
    },
    features: {
      auth: false,
      charts: false,
      stateManagement: 'none',
      database: false,
      api: false,
      testing: false
    },
    styling: 'tailwind',
    typescript: true,
    generatedCode: {},
    isGenerating: false,
    generationProgress: 0,
    exportFormat: 'copy'
  });

  const supabase = null; // createClientComponentClient();
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to current step
  useEffect(() => {
    if (containerRef.current) {
      const stepElement = containerRef.current.querySelector(`[data-step="${currentStep}"]`);
      if (stepElement) {
        stepElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentStep]);

  // Save state to Supabase when it changes (temporarily disabled)
  useEffect(() => {
    const saveState = async () => {
      try {
        // Supabase integration will be added here
        console.log('State updated:', state);
      } catch (error) {
        console.log('Could not save to Supabase:', error);
      }
    };
    
    const timeoutId = setTimeout(saveState, 1000); // Debounce saves
    return () => clearTimeout(timeoutId);
  }, [state]);

  const updateState = (updates: Partial<CodeGeneratorState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="glass border-b-0 rounded-none">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold neon-text flex items-center">
            <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
            OurSynth AI Code Generator
          </h1>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="glass-strong border-b-0 rounded-none">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <motion.button
                    onClick={() => goToStep(step.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      flex items-center px-4 py-2 rounded-lg transition-all duration-300 neon-border
                      ${currentStep === step.id
                        ? 'neon-text glow'
                        : currentStep > step.id
                        ? 'text-green-400'
                        : 'text-white/60 hover:text-white/80'
                      }
                    `}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-2 ${
                      currentStep === step.id
                        ? 'glass'
                        : currentStep > step.id
                        ? 'bg-green-400 text-black'
                        : 'glass'
                    }`}>
                      {currentStep > step.id ? (
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        step.id
                      )}
                    </span>
                    <div className="text-left">
                      <div className="font-semibold text-sm">{step.title}</div>
                      <div className="text-xs opacity-70">{step.description}</div>
                    </div>
                  </motion.button>
                  {index < steps.length - 1 && (
                    <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </React.Fragment>
              ))}
            </div>
            
            {/* Progress Indicator */}
            <div className="flex items-center space-x-3">
              <div className="text-white/70 text-sm">
                {Math.round((currentStep / steps.length) * 100)}% Complete
              </div>
              <div className="w-32 h-2 glass rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-pink-500 glow"
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep / steps.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 py-8" ref={containerRef}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                data-step={currentStep}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                {currentStep === 1 && (
                  <DefineStep 
                    state={state} 
                    updateState={updateState} 
                    onNext={nextStep}
                  />
                )}
                {currentStep === 2 && (
                  <StructureStep 
                    state={state} 
                    updateState={updateState} 
                    onNext={nextStep}
                    onPrev={prevStep}
                  />
                )}
                {currentStep === 3 && (
                  <ConfigureStep 
                    state={state} 
                    updateState={updateState} 
                    onNext={nextStep}
                    onPrev={prevStep}
                  />
                )}
                {currentStep === 4 && (
                  <GenerateStep 
                    state={state} 
                    updateState={updateState} 
                    onNext={nextStep}
                    onPrev={prevStep}
                  />
                )}
                {currentStep === 5 && (
                  <ExportStep 
                    state={state} 
                    updateState={updateState} 
                    onPrev={prevStep}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Live Preview Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <LivePreview state={state} currentStep={currentStep} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Individual Step Components
function DefineStep({ state, updateState, onNext }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="glass p-8"
    >
      <h2 className="text-3xl font-bold neon-text mb-6 floaty">What do you want to build?</h2>
      
      {/* Project Type Selection */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {[
          { id: 'component', title: 'React Component', desc: 'Single reusable component', icon: '🧩' },
          { id: 'page', title: 'Full Page', desc: 'Complete page with layout', icon: '📄' },
          { id: 'feature', title: 'Feature Module', desc: 'Complete feature with multiple components', icon: '⚡' },
          { id: 'fullapp', title: 'Full Application', desc: 'Complete app with routing & state', icon: '🚀' }
        ].map(type => (
          <motion.div
            key={type.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => updateState({ projectType: type.id as any })}
            className={`
              p-6 rounded-xl cursor-pointer transition-all glass-strong neon-border
              ${state.projectType === type.id ? 'glow' : 'hover:glow'}
            `}
          >
            <div className="text-4xl mb-3 floaty">{type.icon}</div>
            <h3 className={`font-bold mb-2 ${state.projectType === type.id ? 'neon-text' : 'text-white'}`}>{type.title}</h3>
            <p className="text-white/70 text-sm">{type.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Description Input */}
      <div className="mb-8">
        <label className="block text-white font-semibold mb-3 neon-accent">
          Describe what you want to build:
        </label>
        <textarea
          value={state.description}
          onChange={(e) => updateState({ description: e.target.value })}
          placeholder="E.g., A modern dashboard with charts, user authentication, and real-time data..."
          className="w-full h-32 p-4 glass text-white placeholder-white/50 focus:focus-ring transition-all resize-none"
        />
      </div>

      {/* Framework Selection */}
      <div className="mb-8">
        <label className="block text-white font-semibold mb-3 neon-accent">Choose Framework:</label>
        <div className="grid grid-cols-4 gap-3">
          {['react', 'nextjs', 'vue', 'angular'].map(framework => (
            <motion.button
              key={framework}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => updateState({ framework: framework as any })}
              className={`
                p-3 rounded-lg capitalize font-medium transition-all glass neon-border
                ${state.framework === framework ? 'neon-text glow' : 'text-white/70 hover:text-white hover:glow'}
              `}
            >
              {framework}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <motion.button
        onClick={onNext}
        disabled={!state.description.trim()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full py-4 glass-strong neon-border glow neon-text font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all flicker"
      >
        Continue to Structure →
      </motion.button>
    </motion.div>
  );
}

// Placeholder components for other steps
function StructureStep({ state, updateState, onNext, onPrev }: any) {
  const layouts = [
    { id: 'cards', title: 'Card Layout', desc: 'Grid of cards with content blocks', icon: '🗃️', preview: 'grid grid-cols-3 gap-4' },
    { id: 'list', title: 'List Layout', desc: 'Vertical list with items', icon: '📋', preview: 'space-y-3' },
    { id: 'tabs', title: 'Tabbed Layout', desc: 'Content organized in tabs', icon: '📑', preview: 'border-b' },
    { id: 'grid', title: 'Data Grid', desc: 'Table-like data presentation', icon: '🗂️', preview: 'grid grid-cols-4' },
    { id: 'sidebar', title: 'Sidebar Layout', desc: 'Main content with sidebar', icon: '📐', preview: 'grid grid-cols-[250px_1fr]' }
  ];

  const organizations = [
    { id: 'atomic', title: 'Atomic Design', desc: 'Components, molecules, organisms', icon: '⚛️' },
    { id: 'feature', title: 'Feature-based', desc: 'Organized by features/pages', icon: '🎯' },
    { id: 'domain', title: 'Domain-driven', desc: 'Business logic separation', icon: '🏗️' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="glass p-8"
    >
      <h2 className="text-3xl font-bold neon-text mb-6 floaty">Project Structure</h2>
      <p className="text-white/70 mb-8">Choose how your {state.projectType} should be laid out and organized.</p>
      
      {/* Layout Selection */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold neon-accent mb-4">Layout Style</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {layouts.map(layout => (
            <motion.div
              key={layout.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => updateState({ 
                structure: { 
                  ...state.structure, 
                  layout: layout.id as any 
                } 
              })}
              className={`
                p-4 rounded-xl cursor-pointer transition-all glass-strong neon-border
                ${state.structure.layout === layout.id ? 'glow' : 'hover:glow'}
              `}
            >
              <div className="text-3xl mb-2 floaty">{layout.icon}</div>
              <h4 className={`font-bold mb-1 ${state.structure.layout === layout.id ? 'neon-text' : 'text-white'}`}>
                {layout.title}
              </h4>
              <p className="text-white/70 text-sm mb-3">{layout.desc}</p>
              <div className={`h-12 bg-white/10 rounded ${layout.preview} p-2`}>
                <div className="bg-white/20 rounded h-full"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Organization Selection */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold neon-accent mb-4">Code Organization</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {organizations.map(org => (
            <motion.div
              key={org.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => updateState({ 
                structure: { 
                  ...state.structure, 
                  organization: org.id as any 
                } 
              })}
              className={`
                p-4 rounded-xl cursor-pointer transition-all glass-strong neon-border
                ${state.structure.organization === org.id ? 'glow' : 'hover:glow'}
              `}
            >
              <div className="text-2xl mb-2 floaty">{org.icon}</div>
              <h4 className={`font-bold mb-1 ${state.structure.organization === org.id ? 'neon-text' : 'text-white'}`}>
                {org.title}
              </h4>
              <p className="text-white/70 text-sm">{org.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="flex space-x-4">
        <button onClick={onPrev} className="px-6 py-3 glass neon-border text-white hover:glow transition-all">← Back</button>
        <button onClick={onNext} className="flex-1 py-3 glass-strong neon-border glow neon-text flicker">Continue →</button>
      </div>
    </motion.div>
  );
}

function ConfigureStep({ state, updateState, onNext, onPrev }: any) {
  const ToggleSwitch = ({ label, checked, onChange, description }: any) => (
    <div className="flex items-center justify-between p-4 glass-strong rounded-lg neon-border hover:glow transition-all">
      <div>
        <h4 className="font-semibold text-white">{label}</h4>
        <p className="text-white/60 text-sm">{description}</p>
      </div>
      <motion.button
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          checked ? 'bg-gradient-to-r from-cyan-500 to-pink-500' : 'bg-white/20'
        }`}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className={`absolute w-5 h-5 bg-white rounded-full top-0.5 shadow-lg ${
            checked ? 'glow' : ''
          }`}
          animate={{ x: checked ? 26 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </motion.button>
    </div>
  );

  const Dropdown = ({ label, value, options, onChange, description }: any) => (
    <div className="p-4 glass-strong rounded-lg neon-border">
      <h4 className="font-semibold text-white mb-1">{label}</h4>
      <p className="text-white/60 text-sm mb-3">{description}</p>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 glass rounded-lg text-white focus:focus-ring transition-all bg-transparent border-0"
      >
        {options.map((option: any) => (
          <option key={option.value} value={option.value} className="bg-gray-900">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="glass p-8"
    >
      <h2 className="text-3xl font-bold neon-text mb-6 floaty">Configure Features</h2>
      <p className="text-white/70 mb-8">Choose the features and tools for your {state.projectType}.</p>
      
      {/* Feature Toggles */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold neon-accent mb-4">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ToggleSwitch
            label="Authentication"
            description="User login and registration"
            checked={state.features.auth}
            onChange={(checked: boolean) => updateState({ 
              features: { ...state.features, auth: checked } 
            })}
          />
          <ToggleSwitch
            label="Charts & Analytics"
            description="Data visualization components"
            checked={state.features.charts}
            onChange={(checked: boolean) => updateState({ 
              features: { ...state.features, charts: checked } 
            })}
          />
          <ToggleSwitch
            label="Database Integration"
            description="Backend data persistence"
            checked={state.features.database}
            onChange={(checked: boolean) => updateState({ 
              features: { ...state.features, database: checked } 
            })}
          />
          <ToggleSwitch
            label="API Routes"
            description="Backend API endpoints"
            checked={state.features.api}
            onChange={(checked: boolean) => updateState({ 
              features: { ...state.features, api: checked } 
            })}
          />
          <ToggleSwitch
            label="Testing Suite"
            description="Unit and integration tests"
            checked={state.features.testing}
            onChange={(checked: boolean) => updateState({ 
              features: { ...state.features, testing: checked } 
            })}
          />
        </div>
      </div>

      {/* Configuration Dropdowns */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold neon-accent mb-4">Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Dropdown
            label="State Management"
            description="How to manage application state"
            value={state.features.stateManagement}
            options={[
              { value: 'none', label: 'React State Only' },
              { value: 'context', label: 'React Context' },
              { value: 'zustand', label: 'Zustand' },
              { value: 'redux', label: 'Redux Toolkit' }
            ]}
            onChange={(value: string) => updateState({ 
              features: { ...state.features, stateManagement: value as any } 
            })}
          />
          <Dropdown
            label="Styling Solution"
            description="CSS framework and styling approach"
            value={state.styling}
            options={[
              { value: 'tailwind', label: 'Tailwind CSS' },
              { value: 'styled', label: 'Styled Components' },
              { value: 'css', label: 'CSS Modules' },
              { value: 'scss', label: 'SCSS/SASS' }
            ]}
            onChange={(value: string) => updateState({ styling: value as any })}
          />
        </div>
      </div>

      {/* TypeScript Toggle */}
      <div className="mb-8">
        <ToggleSwitch
          label="TypeScript"
          description="Use TypeScript for type safety"
          checked={state.typescript}
          onChange={(checked: boolean) => updateState({ typescript: checked })}
        />
      </div>
      
      <div className="flex space-x-4">
        <button onClick={onPrev} className="px-6 py-3 glass neon-border text-white hover:glow transition-all">← Back</button>
        <button onClick={onNext} className="flex-1 py-3 glass-strong neon-border glow neon-text flicker">Generate Code →</button>
      </div>
    </motion.div>
  );
}

function GenerateStep({ state, updateState, onNext, onPrev }: any) {
  const { startGeneration, isGenerating, files, error, reset } = useStreaming();
  const [hasStarted, setHasStarted] = useState(false);

  const generateCode = useCallback(async () => {
    setHasStarted(true);
    
    // Convert state to ProjectConfig format
    const projectConfig = {
      projectName: state.description.split(' ').slice(0, 3).join('-').toLowerCase() || 'my-project',
      description: state.description,
      deployment: 'vercel',
      environment: 'development',
      features: [
        ...(state.features.auth ? ['authentication'] : []),
        ...(state.features.database ? ['database'] : []),
        ...(state.features.api ? ['api'] : []),
        ...(state.features.charts ? ['charts'] : []),
        ...(state.features.testing ? ['testing'] : []),
        state.styling,
        state.framework
      ],
      template: {
        id: state.projectType,
        name: state.projectType.charAt(0).toUpperCase() + state.projectType.slice(1),
        description: state.description
      }
    };

    try {
      await startGeneration(projectConfig);
      // Auto advance after generation is complete
      setTimeout(() => {
        if (!isGenerating && files.length > 0) {
          onNext();
        }
      }, 2000);
    } catch (err) {
      console.error('Generation failed:', err);
    }
  }, [state, startGeneration, isGenerating, files.length, onNext]);

  useEffect(() => {
    if (!hasStarted && !isGenerating && files.length === 0 && !error) {
      generateCode();
    }
  }, [hasStarted, isGenerating, files.length, error, generateCode]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="glass p-8"
    >
      <h2 className="text-3xl font-bold neon-text mb-6 floaty flicker">Generating Your Code</h2>
      <p className="text-white/70 mb-8">AI is creating your {state.projectType} with the selected features...</p>
      
      {/* Generation Progress Component */}
      <GenerationProgress className="mb-8" />
      
      {/* Reset/Retry Options */}
      {error && (
        <div className="flex justify-center space-x-4">
          <motion.button
            onClick={() => {
              reset();
              setHasStarted(false);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 glass neon-border text-white hover:glow transition-all"
          >
            Try Again
          </motion.button>
          <motion.button
            onClick={onPrev}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 glass neon-border text-white hover:glow transition-all"
          >
            ← Back to Configure
          </motion.button>
        </div>
      )}

      {/* Continue to Export when generation is complete */}
      {!isGenerating && files.length > 0 && !error && (
        <div className="flex justify-between">
          <motion.button
            onClick={onPrev}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 glass neon-border text-white hover:glow transition-all"
          >
            ← Back to Configure
          </motion.button>
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 glass-strong neon-border glow neon-text font-semibold transition-all flicker"
          >
            Continue to Export →
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}

function ExportStep({ state, updateState, onPrev }: any) {
  const { files } = useStreaming();

  // Deduplicate files and filter out empty directories  
  const uniqueFiles = useMemo(() => {
    const seen = new Set<string>();
    return files.filter((file) => {
      if (seen.has(file.path)) return false;
      seen.add(file.path);
      return file.type === 'file' && file.content.length > 0;
    });
  }, [files]);

  const downloadAsZip = useCallback(async () => {
    if (uniqueFiles.length === 0) {
      alert('No files to download. Please generate the code first.');
      return;
    }

    try {
      // Create a simple zip-like structure by combining all files
      const fileContents = uniqueFiles.map(file => 
        `// File: ${file.path}\n${file.content}\n\n${'='.repeat(80)}\n\n`
      ).join('');

      const blob = new Blob([fileContents], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${state.projectName || 'generated-project'}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download files. Please try again.');
    }
  }, [uniqueFiles, state.projectName]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="glass p-8"
    >
      <h2 className="text-3xl font-bold neon-text mb-6 floaty">Export Your Code</h2>
      <p className="text-white/70 mb-8">
        {uniqueFiles.length > 0 
          ? `Ready to download ${uniqueFiles.length} generated files`
          : 'Generate code first to enable download'
        }
      </p>
      
      {uniqueFiles.length > 0 && (
        <div className="mb-6 glass-strong p-4 rounded-lg">
          <h3 className="text-lg font-semibold neon-text mb-3">Generated Files:</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {uniqueFiles.map((file, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <span className="text-green-400">📄</span>
                <span className="text-white/80">{file.path}</span>
                <span className="text-white/50 ml-auto">
                  {(file.content.length / 1024).toFixed(1)}kb
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex space-x-4">
        <button onClick={onPrev} className="px-6 py-3 glass neon-border text-white">← Back</button>
        <button 
          onClick={downloadAsZip}
          disabled={uniqueFiles.length === 0}
          className={`flex-1 py-3 glass-strong neon-border glow ${
            uniqueFiles.length > 0 
              ? 'text-green-400 hover:bg-green-400/10' 
              : 'text-gray-500 cursor-not-allowed opacity-50'
          }`}
        >
          {uniqueFiles.length > 0 ? '⬇️ Download Code' : 'No Files to Download'}
        </button>
      </div>
    </motion.div>
  );
}

function LivePreview({ state, currentStep }: { state: any; currentStep: number }) {
  const getPreviewContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl mb-2 floaty">
                {state.projectType === 'component' && '🧩'}
                {state.projectType === 'page' && '📄'}
                {state.projectType === 'feature' && '⚡'}
                {state.projectType === 'fullapp' && '🚀'}
              </div>
              <h4 className="neon-text font-bold capitalize">{state.projectType}</h4>
              <p className="text-white/60 text-sm mt-1">{state.framework}</p>
            </div>
            {state.description && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-strong p-3 rounded-lg"
              >
                <p className="text-white/80 text-sm">{state.description}</p>
              </motion.div>
            )}
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h4 className="neon-accent font-bold">Structure Preview</h4>
            </div>
            <div className="glass-strong p-4 rounded-lg">
              <div className="text-sm space-y-2">
                <div className="flex items-center text-white">
                  <span className="text-blue-400 mr-2">📁</span>
                  <span>src/</span>
                </div>
                <div className="ml-4 space-y-1">
                  <div className="flex items-center text-white/80">
                    <span className="text-green-400 mr-2">📁</span>
                    <span>{state.structure.organization}/</span>
                  </div>
                  <div className="flex items-center text-white/60">
                    <span className="text-yellow-400 mr-2">📄</span>
                    <span>layout.{state.structure.layout}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={`h-20 glass rounded-lg ${
              state.structure.layout === 'cards' ? 'grid grid-cols-3 gap-2 p-2' :
              state.structure.layout === 'list' ? 'space-y-2 p-2' :
              state.structure.layout === 'tabs' ? 'border-b-2 border-cyan-500 p-2' :
              state.structure.layout === 'grid' ? 'grid grid-cols-4 gap-1 p-2' :
              'grid grid-cols-[1fr_3fr] gap-2 p-2'
            }`}>
              {Array.from({ length: state.structure.layout === 'sidebar' ? 2 : 
                state.structure.layout === 'grid' ? 8 : 3 }).map((_, i) => (
                <div key={i} className="bg-white/20 rounded"></div>
              ))}
            </div>
          </div>
        );
      
      case 3:
        const enabledFeatures = Object.entries(state.features).filter(([, enabled]) => enabled);
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h4 className="neon-accent font-bold">Features Preview</h4>
            </div>
            <div className="space-y-2">
              {enabledFeatures.map(([feature]) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center glass-strong p-2 rounded"
                >
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-white/80 capitalize text-sm">
                    {feature === 'stateManagement' ? `State: ${state.features.stateManagement}` : feature}
                  </span>
                </motion.div>
              ))}
              <div className="flex items-center glass-strong p-2 rounded">
                <span className="text-cyan-400 mr-2">🎨</span>
                <span className="text-white/80 text-sm capitalize">{state.styling}</span>
              </div>
              {state.typescript && (
                <div className="flex items-center glass-strong p-2 rounded">
                  <span className="text-blue-400 mr-2">TS</span>
                  <span className="text-white/80 text-sm">TypeScript</span>
                </div>
              )}
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h4 className="neon-accent font-bold flicker">Generating...</h4>
            </div>
            <div className="glass-strong p-4 rounded-lg">
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="text-4xl mb-2"
                >
                  ⚡
                </motion.div>
                <p className="text-white/60 text-sm">{state.generationProgress || 0}% Complete</p>
              </div>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h4 className="neon-text font-bold">Ready to Export!</h4>
            </div>
            <div className="glass-strong p-4 rounded-lg">
              <div className="text-center">
                <div className="text-4xl mb-2 floaty">🎉</div>
                <p className="text-white/80 text-sm">Your code is ready</p>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center text-white/50">
            Preview will appear here...
          </div>
        );
    }
  };

  return (
    <div className="glass p-6 sticky top-8">
      <h3 className="text-xl font-bold neon-accent mb-4 floaty">Live Preview</h3>
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-[400px]"
      >
        {getPreviewContent()}
      </motion.div>
    </div>
  );
}

// Main wrapper component with StreamingProvider
export default function UnifiedCodeGenerator() {
  return (
    <StreamingProvider>
      <UnifiedCodeGeneratorInternal />
    </StreamingProvider>
  );
}
