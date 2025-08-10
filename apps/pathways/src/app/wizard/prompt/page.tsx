'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper,
  LinearProgress,
  Chip,
  Divider,
  Card,
  CardContent
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ChatIcon from '@mui/icons-material/Chat';
import BuildIcon from '@mui/icons-material/Build';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

interface GeneratedConfig {
  projectName: string;
  description: string;
  dependencies: string[];
  theme: string;
  pages: string[];
  backendFeatures: string[];
  aiProvider: string;
  estimatedComplexity: 'Simple' | 'Medium' | 'Complex';
}

const examplePrompts = [
  "A task management app for freelancers with time tracking and invoicing",
  "An e-commerce store for handmade jewelry with custom sizing options",
  "A recipe sharing platform with meal planning and shopping lists",
  "A fitness tracking app with social challenges and progress sharing",
  "A portfolio website for photographers with client booking system",
  "A meditation app with guided sessions and progress tracking",
  "A learning management system for online courses with quizzes",
  "A real estate listing platform with virtual tours",
  "A social media dashboard for content creators",
  "A project collaboration tool for remote teams"
];

export default function PromptWizardPage() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedConfig, setGeneratedConfig] = useState<GeneratedConfig | null>(null);
  const [currentExample, setCurrentExample] = useState(0);

  // Rotate through examples
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExample((prev) => (prev + 1) % examplePrompts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handlePromptChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  }, []);

  const useExample = useCallback(() => {
    setPrompt(examplePrompts[currentExample]);
  }, [currentExample]);

  const generateConfig = useCallback(async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock AI-generated configuration
    const mockConfig: GeneratedConfig = {
      projectName: extractProjectName(prompt),
      description: prompt,
      dependencies: generateDependencies(prompt),
      theme: generateTheme(prompt),
      pages: generatePages(prompt),
      backendFeatures: generateBackendFeatures(prompt),
      aiProvider: 'OpenAI GPT',
      estimatedComplexity: determineComplexity(prompt)
    };
    
    setGeneratedConfig(mockConfig);
    setIsGenerating(false);
  }, [prompt]);

  const editConfiguration = useCallback(() => {
    // Redirect to structured wizard with pre-filled data
    const configData = encodeURIComponent(JSON.stringify(generatedConfig));
    window.location.href = `/wizard/structured?data=${configData}`;
  }, [generatedConfig]);

  const generateProject = useCallback(() => {
    console.log('Generating project with config:', generatedConfig);
    // TODO: Implement actual project generation
  }, [generatedConfig]);

  const startOver = useCallback(() => {
    setPrompt('');
    setGeneratedConfig(null);
    setIsGenerating(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <AutoAwesomeIcon sx={{ fontSize: '4rem', color: '#10b981', mb: 2 }} />
          <Typography 
            variant="h2" 
            component="h1"
            sx={{
              background: 'linear-gradient(45deg, #10b981 30%, #22d3ee 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
              mb: 2
            }}
          >
            Quick Start Wizard
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'rgba(255,255,255,0.8)', 
              maxWidth: '600px', 
              mx: 'auto',
              lineHeight: 1.4
            }}
          >
            Describe your app idea and let AI handle the technical configuration
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
            <Link href="/wizard" style={{ textDecoration: 'none' }}>
              <Button
                variant="outlined"
                sx={{
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'rgba(255,255,255,0.5)',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }
                }}
              >
                Switch to Advanced Setup
              </Button>
            </Link>
          </Box>
        </Box>

        {!isGenerating && !generatedConfig && (
          <Paper 
            elevation={3}
            sx={{
              p: 6,
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 3
            }}
          >
            {/* Chat Interface */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 4 }}>
              <ChatIcon sx={{ color: '#10b981', mt: 1, fontSize: '2rem' }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography 
                  variant="h6" 
                  sx={{ color: 'white', mb: 2, fontWeight: 600 }}
                >
                  Hi! I&apos;m your AI assistant. What would you like to build today?
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ color: 'rgba(255,255,255,0.8)', mb: 3 }}
                >
                  Just describe your app idea in one or two sentences. Don&apos;t worry about technical details—I&apos;ll figure those out for you.
                </Typography>
              </Box>
            </Box>

            {/* Example Prompt */}
            <Card 
              sx={{ 
                mb: 4, 
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(16, 185, 129, 0.15)',
                  transform: 'translateY(-2px)',
                }
              }}
              onClick={useExample}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.6)', 
                    mb: 1,
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: 1
                  }}
                >
                  💡 Example idea (click to use):
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#10b981', 
                    fontStyle: 'italic',
                    fontSize: '1.1rem',
                    lineHeight: 1.4
                  }}
                  key={currentExample}
                                >
                  &quot;{examplePrompts[currentExample]}&quot;
                </Typography>
              </CardContent>
            </Card>

            {/* Input Field */}
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Example: I want to build a task management app for freelancers with time tracking, project organization, and client invoicing features..."
              value={prompt}
              onChange={handlePromptChange}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  '& fieldset': {
                    borderColor: 'rgba(255,255,255,0.2)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255,255,255,0.3)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#10b981',
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                  fontSize: '1.1rem',
                  lineHeight: 1.5,
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'rgba(255,255,255,0.5)',
                  opacity: 1,
                },
              }}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography 
                variant="body2" 
                sx={{ color: 'rgba(255,255,255,0.6)' }}
              >
                💡 {prompt.length}/500 characters
              </Typography>
              
              <Button
                variant="contained"
                size="large"
                onClick={generateConfig}
                disabled={!prompt.trim() || prompt.length < 20}
                startIcon={<BuildIcon />}
                sx={{
                  background: 'linear-gradient(45deg, #10b981 30%, #22d3ee 90%)',
                  color: 'white',
                  fontWeight: 'bold',
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  minWidth: 180,
                  '&:hover': {
                    background: 'linear-gradient(45deg, #059669 30%, #0891b2 90%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
                  },
                  '&:disabled': {
                    background: 'rgba(0,0,0,0.12)',
                    color: 'rgba(0,0,0,0.26)',
                  }
                }}
              >
                Generate App
              </Button>
            </Box>
          </Paper>
        )}

        {/* Loading State */}
        {isGenerating && (
          <Paper 
            elevation={3}
            sx={{
              p: 6,
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 3,
              textAlign: 'center'
            }}
          >
            <AutoAwesomeIcon 
              sx={{ 
                fontSize: '4rem', 
                color: '#10b981', 
                mb: 3,
                animation: 'pulse 2s infinite'
              }} 
            />
            <Typography variant="h5" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
              AI is analyzing your idea...
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 4 }}>
              Determining the best technologies, features, and structure for your app
            </Typography>
            <LinearProgress 
              sx={{ 
                mb: 2,
                backgroundColor: 'rgba(255,255,255,0.1)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#10b981',
                }
              }} 
            />
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
              This usually takes 2-3 seconds...
            </Typography>
          </Paper>
        )}

        {/* Generated Configuration */}
        {generatedConfig && (
          <Paper 
            elevation={3}
            sx={{
              p: 6,
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 3
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <AutoAwesomeIcon sx={{ fontSize: '3rem', color: '#10b981', mb: 2 }} />
              <Typography variant="h4" sx={{ color: 'white', mb: 1, fontWeight: 600 }}>
                Configuration Generated!
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                Here&apos;s what I&apos;ve configured for your &quot;{generatedConfig.projectName}&quot; app:
              </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
              <ConfigSection 
                title="Technologies" 
                items={generatedConfig.dependencies}
                color="#3b82f6"
              />
              <ConfigSection 
                title="Pages" 
                items={generatedConfig.pages}
                color="#8b5cf6"
              />
              <ConfigSection 
                title="Backend Features" 
                items={generatedConfig.backendFeatures}
                color="#ef4444"
              />
              <Box>
                <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
                  Project Details
                </Typography>
                <Box sx={{ space: 'y-2' }}>
                  <DetailRow label="Theme" value={generatedConfig.theme} />
                  <DetailRow label="AI Provider" value={generatedConfig.aiProvider} />
                  <DetailRow label="Complexity" value={generatedConfig.estimatedComplexity} />
                </Box>
              </Box>
            </Box>

            <Divider sx={{ mb: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={generateProject}
                startIcon={<RocketLaunchIcon />}
                sx={{
                  background: 'linear-gradient(45deg, #10b981 30%, #22d3ee 90%)',
                  color: 'white',
                  fontWeight: 'bold',
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  minWidth: 180,
                  '&:hover': {
                    background: 'linear-gradient(45deg, #059669 30%, #0891b2 90%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
                  }
                }}
              >
                Generate Project
              </Button>
              
              <Button
                variant="outlined"
                size="large"
                onClick={editConfiguration}
                sx={{
                  borderColor: '#3b82f6',
                  color: '#3b82f6',
                  fontWeight: 'bold',
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  minWidth: 180,
                  '&:hover': {
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    color: '#2563eb',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                Customize Settings
              </Button>
              
              <Button
                variant="text"
                size="large"
                onClick={startOver}
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  fontWeight: 'bold',
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                  }
                }}
              >
                Start Over
              </Button>
            </Box>
          </Paper>
        )}
      </div>
    </div>
  );
}

// Helper Components
const ConfigSection = ({ title, items, color }: { title: string; items: string[]; color: string }) => (
  <Box>
    <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
      {title}
    </Typography>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {items.map((item, index) => (
        <Chip
          key={index}
          label={item}
          size="small"
          sx={{
            backgroundColor: `${color}20`,
            color: color,
            border: `1px solid ${color}40`,
          }}
        />
      ))}
    </Box>
  </Box>
);

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <Box sx={{ mb: 1 }}>
    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
      <strong>{label}:</strong> {value}
    </Typography>
  </Box>
);

// Mock AI Functions
function extractProjectName(prompt: string): string {
  const keywords = prompt.toLowerCase().match(/\b(\w+)\s+(app|platform|website|system|tool|service)\b/);
  if (keywords) {
    return keywords[1].charAt(0).toUpperCase() + keywords[1].slice(1) + ' ' + 
           keywords[2].charAt(0).toUpperCase() + keywords[2].slice(1);
  }
  return 'My App';
}

function generateDependencies(prompt: string): string[] {
  const base = ['Next.js', 'React', 'TypeScript'];
  const lower = prompt.toLowerCase();
  
  if (lower.includes('database') || lower.includes('data') || lower.includes('user')) base.push('Supabase');
  if (lower.includes('style') || lower.includes('design') || lower.includes('ui')) base.push('Tailwind CSS', 'Material-UI');
  if (lower.includes('auth') || lower.includes('login') || lower.includes('user')) base.push('NextAuth.js');
  if (lower.includes('payment') || lower.includes('shop') || lower.includes('buy')) base.push('Stripe');
  if (lower.includes('email') || lower.includes('notification')) base.push('Resend');
  
  return base;
}

function generateTheme(prompt: string): string {
  const lower = prompt.toLowerCase();
  if (lower.includes('professional') || lower.includes('business')) return 'Professional';
  if (lower.includes('modern') || lower.includes('tech')) return 'Modern';
  if (lower.includes('creative') || lower.includes('art')) return 'Creative';
  if (lower.includes('minimal') || lower.includes('clean')) return 'Minimal';
  return 'Modern';
}

function generatePages(prompt: string): string[] {
  const base = ['Home', 'About'];
  const lower = prompt.toLowerCase();
  
  if (lower.includes('dashboard') || lower.includes('manage')) base.push('Dashboard');
  if (lower.includes('user') || lower.includes('profile')) base.push('Profile');
  if (lower.includes('contact') || lower.includes('support')) base.push('Contact');
  if (lower.includes('shop') || lower.includes('product')) base.push('Products');
  if (lower.includes('blog') || lower.includes('article')) base.push('Blog');
  if (lower.includes('login') || lower.includes('auth')) base.push('Login');
  if (lower.includes('setting') || lower.includes('config')) base.push('Settings');
  
  return base;
}

function generateBackendFeatures(prompt: string): string[] {
  const features: string[] = [];
  const lower = prompt.toLowerCase();
  
  if (lower.includes('user') || lower.includes('login') || lower.includes('auth')) features.push('Authentication');
  if (lower.includes('database') || lower.includes('data') || lower.includes('store')) features.push('Database');
  if (lower.includes('api') || lower.includes('endpoint')) features.push('API Routes');
  if (lower.includes('upload') || lower.includes('file') || lower.includes('image')) features.push('File Upload');
  if (lower.includes('email') || lower.includes('notification')) features.push('Email Service');
  if (lower.includes('real-time') || lower.includes('live') || lower.includes('chat')) features.push('Real-time Features');
  
  return features.length > 0 ? features : ['Database', 'API Routes'];
}

function determineComplexity(prompt: string): 'Simple' | 'Medium' | 'Complex' {
  const featureCount = generateBackendFeatures(prompt).length + generatePages(prompt).length;
  if (featureCount <= 4) return 'Simple';
  if (featureCount <= 8) return 'Medium';
  return 'Complex';
}
