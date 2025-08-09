# OurSynth Platform Navigation Guide

## Dashboard Overview
The OurSynth Platform Dashboard is your central hub for monitoring and launching all platform services. Access it at `http://localhost:3005`.

## Quick Launch Navigation
The Dashboard now features an improved navigation system with:

### Quick Launch Bar
Direct access buttons for the most frequently used apps:
- 🎨 **Studio** (Port 3004) - Visual web app builder with drag-and-drop interface
- 🧙‍♂️ **Pathways** (Port 3008) - AI-powered workflow automation and decision trees  
- 🚀 **Deploy** (Port 3006) - Deployment management and infrastructure automation
- 🌐 **Domains** (Port 3007) - Domain management and DNS configuration

### Service Categories
Services are now organized by category for better navigation:

#### 🎨 Creative
- **Studio**: Visual web app builder with components, templates, and AI assistance

#### 🏗️ Infrastructure  
- **Deploy**: Azure deployment automation and infrastructure management
- **Domains**: Domain registration, DNS management, and SSL configuration

#### 🤖 AI/Automation
- **Pathways**: Wizard-based workflow automation with AI decision trees
- **Sentient Developer**: AI-powered code generation and development assistance

#### 📚 Core Libraries
- **Orchestrator**: Platform orchestration and service coordination engine
- **Analyzer**: Data analysis and platform insights generation

## Service Features
Each service card displays:
- 📱 Service icon and description
- 🔗 Direct launch button
- 📊 Real-time status indicator
- 📋 Service logs (when available)
- ⚡ Service controls (Start/Stop/Restart)

## Port Configuration
- **Dashboard**: http://localhost:3005
- **Studio**: http://localhost:3004  
- **Deploy**: http://localhost:3006
- **Domains**: http://localhost:3007
- **Pathways**: http://localhost:3008
- **Sentient Developer**: http://localhost:4001

## Animated Theme Features
- ✨ Lime green (#84FF63) and purple (#AA63FF) color scheme
- 🌊 Glass morphism effects with webkit compatibility
- 🎭 Interactive animations (hover effects, sparkles, gradients)
- 🎨 Custom animations: typewriter, sparkle-button, wizard-spell, data-flow
- 📱 Responsive design with category-based grid layout

## Navigation Improvements
1. **Categorized Services**: Organized by function for easier discovery
2. **Quick Launch**: One-click access to primary apps
3. **Enhanced Visual Design**: Icons, descriptions, and status indicators
4. **Real-time Status**: Live service monitoring and health checks
5. **Improved Accessibility**: Clear labeling and keyboard navigation

## Development Notes
- All Next.js apps configured with `transpilePackages` for shared libraries
- Cross-browser compatibility with webkit prefixes
- Responsive grid layout adapts to screen size
- Service orchestration API ready for advanced controls
