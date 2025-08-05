# OurSynth

A modern Next.js TypeScript application built with performance and developer experience in mind.

## Features

- ⚡ **Next.js 14** with App Router
- 🔥 **TypeScript** for type safety
- 🚀 **Turbopack** for lightning-fast development
- 📁 **src/ directory** structure for better organization
- 🎯 **ESLint** for code quality
- 🔧 **Import alias** `@/*` configured for clean imports
- 🔐 **Supabase** authentication and database
- 🎨 **clsx** for conditional CSS classes

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
# Copy the example environment file
copy .env.local.example .env.local

# Edit .env.local and add your Supabase credentials
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                 # App Router pages and layouts
│   ├── auth/
│   │   └── callback/   # Supabase auth callback
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── page.module.css # Page-specific styles
├── components/         # Reusable components
│   └── auth/          # Authentication components
├── contexts/          # React contexts
│   └── AuthContext.tsx # Authentication context
└── lib/               # Utility libraries
    └── supabase.ts    # Supabase client
public/                # Static assets
├── next.svg          # Next.js logo
└── vercel.svg        # Vercel logo
```

## Import Alias

Use the configured `@/*` alias to import from the src directory:

```typescript
// Instead of relative imports
import Component from '../../../components/Component'

// Use the alias
import Component from '@/components/Component'
```

## Development

This project uses:
- **App Router**: Modern Next.js routing system
- **TypeScript**: Static type checking
- **Turbopack**: Fast bundler for development
- **ESLint**: Code linting and formatting
- **Supabase**: Backend-as-a-Service for auth and database
- **clsx**: Utility for constructing className strings
- **styled-components**: CSS-in-JS theming and styling
- **Glass-morphism**: Modern UI design with backdrop-filter effects

### Theme System

The project includes a comprehensive theming system with:

#### 🎨 Color Palette
- **Primary Gradient**: `linear-gradient(90deg, #00FFCC, #A020F0, #0080FF)`
- **Accent Color**: `#00FFCC` (Electric cyan)
- **Glass-morphism**: Translucent backgrounds with backdrop blur

#### 🖼️ Glass-morphism Components
```typescript
import { ThemeProvider } from '@/components/ThemeProvider'
import { GlassContainer, GradientText, AccentButton } from '@/components/styled/StyledComponents'

<ThemeProvider>
  <GlassContainer>
    <GradientText>Your Title</GradientText>
    <AccentButton>Call to Action</AccentButton>
  </GlassContainer>
</ThemeProvider>
```

#### 🎛️ CSS Custom Properties
Use CSS variables in your stylesheets:
```css
.my-component {
  background: var(--glass-background);
  backdrop-filter: var(--glass-backdrop-filter);
  color: var(--accent-color);
}
```

### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key from the API settings
3. Add them to your `.env.local` file:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Using Authentication

The project includes a complete authentication setup:

```typescript
import { AuthProvider } from '@/contexts/AuthContext'
import { AuthComponent } from '@/components/auth/AuthComponent'

// Wrap your app with AuthProvider
<AuthProvider>
  <AuthComponent />
</AuthProvider>
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Turbopack Documentation](https://turbo.build/pack/docs)
