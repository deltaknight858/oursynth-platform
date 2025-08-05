'use client';

import { Container, Typography, Box } from '@mui/material';
import ComponentGenerator from '@/components/generator/ComponentGenerator';

export default function GeneratorPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #000000, #a020f0)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
          }}
        >
          AI Component Generator
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: 'text.secondary',
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          Describe the React component you want to create, and our AI will generate
          beautiful, functional code for you.
        </Typography>
      </Box>
      
      <ComponentGenerator />
    </Container>
  );
}
