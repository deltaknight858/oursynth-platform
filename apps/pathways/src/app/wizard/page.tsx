'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container
} from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SpeedIcon from '@mui/icons-material/Speed';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TuneIcon from '@mui/icons-material/Tune';

interface WizardOptionProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  href: string;
  icon: React.ReactNode;
  color: string;
  recommended?: boolean;
  timeEstimate: string;
  bestFor: string[];
}

const WizardOption = ({ 
  title, 
  subtitle, 
  description, 
  features, 
  href, 
  icon, 
  color,
  recommended,
  timeEstimate,
  bestFor
}: WizardOptionProps) => (
  <Card
    sx={{
      height: '100%',
      background: 'rgba(255,255,255,0.05)',
      backdropFilter: 'blur(10px)',
      border: `2px solid ${recommended ? color : 'rgba(255,255,255,0.1)'}`,
      borderRadius: 3,
      transition: 'all 0.3s ease',
      position: 'relative',
      '&:hover': {
        transform: 'translateY(-4px)',
        border: `2px solid ${color}`,
        boxShadow: `0 8px 32px ${color}40`,
      }
    }}
  >
    {recommended && (
      <Box
        sx={{
          position: 'absolute',
          top: -10,
          right: 20,
          background: `linear-gradient(45deg, ${color} 30%, #ffffff 90%)`,
          color: 'black',
          px: 2,
          py: 0.5,
          borderRadius: 2,
          fontSize: '0.75rem',
          fontWeight: 'bold',
        }}
      >
        RECOMMENDED
      </Box>
    )}
    
    <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box 
          sx={{ 
            p: 1.5, 
            borderRadius: 2, 
            backgroundColor: `${color}20`,
            color: color,
            mr: 2
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white' }}>
            {title}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: color, fontWeight: 500 }}>
            {subtitle}
          </Typography>
        </Box>
      </Box>

      {/* Description */}
      <Typography 
        variant="body1" 
        sx={{ color: 'rgba(255,255,255,0.8)', mb: 3, lineHeight: 1.6 }}
      >
        {description}
      </Typography>

      {/* Time Estimate */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <SpeedIcon sx={{ color: color, mr: 1, fontSize: '1.2rem' }} />
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
          <strong>Time:</strong> {timeEstimate}
        </Typography>
      </Box>

      {/* Best For */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1, fontWeight: 500 }}>
          Best for:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {bestFor.map((item, index) => (
            <Chip
              key={index}
              label={item}
              size="small"
              sx={{
                backgroundColor: `${color}20`,
                color: color,
                border: `1px solid ${color}40`,
                fontSize: '0.75rem'
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Features */}
      <Box sx={{ flexGrow: 1, mb: 3 }}>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1, fontWeight: 500 }}>
          What you get:
        </Typography>
        <List dense sx={{ py: 0 }}>
          {features.map((feature, index) => (
            <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 28 }}>
                <CheckCircleIcon sx={{ color: color, fontSize: '1rem' }} />
              </ListItemIcon>
              <ListItemText 
                primary={feature}
                primaryTypographyProps={{
                  variant: 'body2',
                  sx: { color: 'rgba(255,255,255,0.8)' }
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Action Button */}
      <Link href={href} style={{ textDecoration: 'none' }}>
        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{
            background: `linear-gradient(45deg, ${color} 30%, ${color}dd 90%)`,
            color: 'white',
            fontWeight: 'bold',
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1.1rem',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: `linear-gradient(45deg, ${color}dd 30%, ${color}aa 90%)`,
              transform: 'translateY(-2px)',
              boxShadow: `0 6px 20px ${color}60`,
            }
          }}
        >
          Start with {title}
        </Button>
      </Link>
    </CardContent>
  </Card>
);

export default function WizardSelectionPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)',
        py: 8
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <AutoAwesomeIcon sx={{ fontSize: '4rem', color: '#22d3ee', mb: 2 }} />
          <Typography 
            variant="h2" 
            component="h1"
            sx={{
              background: 'linear-gradient(45deg, #22d3ee 30%, #ec4899 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
              mb: 2
            }}
          >
            Choose Your Path
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
            Two powerful ways to create your Next.js application. Pick the approach that fits your style.
          </Typography>
        </Box>

        {/* Wizard Options */}
        <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
            mb: 6
          }}
        >
          {/* Quick Start Option */}
          <WizardOption
            title="Quick Start"
            subtitle="AI-Powered Generation"
            description="Describe your app idea in natural language and let AI handle the technical configuration. Perfect for rapid prototyping and getting started fast."
            features={[
              "Single prompt input",
              "AI interprets your vision",
              "Instant project generation",
              "Smart default choices",
              "Great for beginners"
            ]}
            href="/wizard/prompt"
            icon={<RocketLaunchIcon sx={{ fontSize: '2rem' }} />}
            color="#10b981"
            recommended={true}
            timeEstimate="2-3 minutes"
            bestFor={["Beginners", "Prototypes", "Quick ideas", "Learning"]}
          />
          
          {/* Advanced Option */}
          <WizardOption
            title="Advanced Setup"
            subtitle="Step-by-Step Control"
            description="Configure every aspect of your application through guided steps. Full control over dependencies, styling, features, and deployment."
            features={[
              "7 guided configuration steps",
              "Precise control over setup",
              "Custom color themes",
              "Flexible page templates",
              "Professional features"
            ]}
            href="/wizard/structured"
            icon={<SettingsIcon sx={{ fontSize: '2rem' }} />}
            color="#3b82f6"
            timeEstimate="8-12 minutes"
            bestFor={["Professionals", "Complex apps", "Teams", "Production"]}
          />
        </Box>

        {/* Comparison Table */}
        <Card
          sx={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 3,
            p: 4
          }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'white', 
              mb: 3, 
              textAlign: 'center',
              fontWeight: 600
            }}
          >
            Not sure which to choose? Here&apos;s a quick comparison:
          </Typography>
          
          <Box 
            sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
              gap: 3,
              textAlign: 'center'
            }}
          >
            <Box>
              <Typography variant="subtitle1" sx={{ color: '#10b981', fontWeight: 600, mb: 1 }}>
                <RocketLaunchIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Quick Start
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                &quot;I want to build a task management app for freelancers&quot;
                <br />
                <em>→ AI handles everything</em>
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="subtitle1" sx={{ color: '#6b7280', fontWeight: 600, mb: 1 }}>
                <TuneIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                vs.
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                Choose your approach based on your needs and experience level
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="subtitle1" sx={{ color: '#3b82f6', fontWeight: 600, mb: 1 }}>
                <PrecisionManufacturingIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Advanced Setup
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Step by step: Name → Dependencies → Theme → Pages → Backend → AI → Review
                <br />
                <em>→ You control every detail</em>
              </Typography>
            </Box>
          </Box>
        </Card>

        {/* Help Text */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(255,255,255,0.6)',
              fontStyle: 'italic'
            }}
          >
            💡 You can always switch between approaches or start over if you change your mind
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
