# OurSynth Pathways Wizard

A modern, animated 4-step wizard built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Framer Motion.

## ✨ Features

- **4-Step Wizard Flow**: Template Selection → Configuration → Review → Confirmation
- **Glass Morphism Design**: Modern UI with backdrop blur effects
- **Smooth Animations**: Powered by Framer Motion
- **Mobile Responsive**: Optimized for all screen sizes
- **TypeScript**: Full type safety
- **Accessibility**: ARIA compliant with keyboard navigation

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.2 with App Router
- **React**: 19.1.0 with TypeScript
- **Styling**: Tailwind CSS 4.x
- **Animations**: Framer Motion 12.23.12
- **State Management**: React Context + useReducer
- **Notifications**: react-hot-toast

## 🚀 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run tsc:noEmit
```

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main wizard page
│   └── globals.css         # Global styles
├── components/
│   ├── StepIndicator.tsx   # Progress indicator
│   ├── TemplateSelector.tsx # Step 1: Template selection
│   ├── ConfigForm.tsx      # Step 2: Configuration
│   ├── ReviewSummary.tsx   # Step 3: Review
│   └── ConfirmationScreen.tsx # Step 4: Confirmation
├── contexts/
│   └── WizardContext.tsx   # Wizard state management
└── styles/
    ├── wizard.css          # Wizard-specific styles
    └── glass.css           # Glass morphism effects
```

## 🎯 Wizard Steps

### Step 1: Template Selection
- Choose from 6 professional templates
- Category filtering
- Visual previews with hover effects

### Step 2: Configuration
- Project details form
- Deployment platform selection
- Feature toggles
- Real-time validation

### Step 3: Review
- Comprehensive summary
- Organized information display
- Edit capabilities

### Step 4: Confirmation
- Animated project creation simulation
- Success celebration with confetti
- Next steps guidance

## 🎨 Design System

- **Colors**: Lime (#84cc16) and Purple (#a855f7) gradients
- **Background**: Dark gradient (slate-900 → purple-900 → slate-900)
- **Effects**: Glass morphism with backdrop blur
- **Typography**: Gradient text effects
- **Animations**: Smooth transitions and hover effects

## 🌐 Running

The wizard runs on http://localhost:3008 when using the development server.

## 📝 Notes

- Standalone application (no external dependencies for MUI/Auth)
- Optimized for modern browsers
- SEO-friendly with proper metadata
- Error-free TypeScript compilation
