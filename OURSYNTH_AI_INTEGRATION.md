# 🤖 OurSynth AI - Rasa Integration Plan

## Overview
Integrate your existing Rasa bot with Calm as the conversational AI backbone for OurSynth AI, the central assistant across all platform apps.

## Rasa Bot Setup

### 1. Environment Configuration
Create `.env.local` in project root:

```env
# Rasa Configuration
RASA_LICENSE_KEY=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXV...
RASA_API_URL=http://localhost:5005
RASA_TOKEN=your-rasa-token

# OurSynth AI Integration
OURSYNTH_AI_ENABLED=true
OURSYNTH_AI_DEBUG=false
```

### 2. Project Structure
```
apps/
├── oursynth-ai/           # New Rasa bot app
│   ├── domain.yml         # Rasa domain configuration
│   ├── config.yml         # NLU/Core configuration
│   ├── data/
│   │   ├── nlu.yml       # Training data
│   │   └── stories.yml    # Conversation flows
│   ├── actions/
│   │   └── actions.py     # Custom actions
│   └── endpoints.yml      # Webhook endpoints
```

## Integration Points

### 1. Studio App Integration
```typescript
// Studio chat interface
interface OurSynthAIChat {
  // Natural language project creation
  "Create a dashboard with user analytics"
  
  // Component suggestions
  "What components work well for e-commerce?"
  
  // Design assistance
  "Make this more modern with our brand colors"
  
  // Template recommendations
  "Show me similar projects from my templates"
}
```

### 2. Pathways App Integration
```yaml
# Enhanced NLU for component generation
intents:
  - generate_component
  - suggest_improvements
  - explain_code
  - create_page_layout
  - apply_branding

entities:
  - component_type
  - ui_framework
  - design_style
  - functionality
```

### 3. Deploy App Integration
```python
# Custom Rasa actions for deployment
class ActionDeployProject(Action):
    def name(self) -> Text:
        return "action_deploy_project"
    
    def run(self, dispatcher, tracker, domain):
        # Trigger Azure deployment
        # Monitor deployment status
        # Provide real-time updates
```

### 4. Domains App Integration
```yaml
# Domain management conversations
stories:
  - story: domain_search
    steps:
      - intent: search_domain
        entities:
          - domain_name: "myapp"
          - tld: ".com"
      - action: action_search_domains
      - intent: register_domain
      - action: action_register_domain
```

## Conversation Flows

### 1. Project Creation Flow
```
User: "I want to build an e-commerce site with product catalog and checkout"
OurSynth AI: "I'll help you create that! Based on your requirements, I suggest:
              1. Product catalog with search/filters
              2. Shopping cart functionality  
              3. Checkout with payment integration
              4. Admin dashboard for inventory
              
              Would you like me to generate the initial components?"
```

### 2. Code Generation Flow
```
User: "Create a product card component with Material UI"
OurSynth AI: "I'll generate a Material UI product card with your purple branding.
              Should it include:
              - Product image with hover effects?
              - Price and discount display?
              - Add to cart button?
              - Rating display?"
```

### 3. Deployment Flow
```
User: "Deploy my dashboard to Azure"
OurSynth AI: "I'll deploy your dashboard to Azure. Let me:
              1. Check your Azure configuration ✓
              2. Build the production bundle...
              3. Deploy to Azure Static Web Apps...
              4. Configure custom domain...
              
              Your app will be live at: https://your-app.azurestaticapps.net"
```

## Technical Implementation

### 1. Rasa Action Server
```python
# apps/oursynth-ai/actions/oursynth_actions.py
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import openai
import subprocess

class ActionGenerateComponent(Action):
    def name(self) -> str:
        return "action_generate_component"
    
    def run(self, dispatcher, tracker, domain):
        component_description = tracker.latest_message['text']
        
        # Call Pathways API for component generation
        # Return formatted response with code preview
        # Offer to save to project
```

### 2. Frontend Integration
```typescript
// Shared OurSynth AI client
export class OurSynthAI {
  async sendMessage(message: string, context: AppContext) {
    const response = await fetch('/api/oursynth-ai', {
      method: 'POST',
      body: JSON.stringify({ message, context })
    });
    return response.json();
  }
  
  async generateComponent(description: string) {
    return this.sendMessage(`Generate component: ${description}`, {
      app: 'pathways',
      action: 'generate'
    });
  }
}
```

### 3. Multi-App Context
```python
# Context sharing between apps
class OurSynthAIContext:
    def __init__(self):
        self.current_app = None
        self.active_project = None
        self.user_preferences = {}
        self.template_library = []
    
    def get_context_for_app(self, app_name):
        return {
            'app': app_name,
            'project': self.active_project,
            'templates': self.get_relevant_templates(app_name),
            'preferences': self.user_preferences
        }
```

## Deployment Strategy

### 1. Development Setup
```bash
# Install Rasa
pip install rasa[spacy]
python -m spacy download en_core_web_md

# Train the model
cd apps/oursynth-ai
rasa train

# Start action server
rasa run actions --port 5055

# Start Rasa server
rasa run --enable-api --cors "*" --port 5005
```

### 2. Azure Integration
```yaml
# Add to azure.yaml
services:
  oursynth-ai:
    project: apps/oursynth-ai
    host: containerapp
    language: python
```

### 3. Environment Variables
```env
# Add to main.parameters.json
"rasaLicenseKey": {
  "value": "${RASA_LICENSE_KEY}"
},
"rasaApiUrl": {
  "value": "${RASA_API_URL}"
}
```

## Testing Strategy

### 1. Conversation Testing
```yaml
# tests/test_stories.yml
stories:
  - story: test_component_generation
    steps:
      - user: |
          I want to create a login form with Material UI
      - action: action_generate_component
      - slot_was_set:
        - component_type: "form"
        - ui_framework: "material-ui"
      - bot: |
          I've generated a Material UI login form with your brand styling. 
          Would you like me to add validation or integrate with your auth system?
```

### 2. Integration Testing
```python
# Test OurSynth AI responses
def test_component_generation():
    response = oursynth_ai.generate_component("Material UI button with purple theme")
    assert "Material UI" in response
    assert "purple" in response
    assert response.includes_code_preview
```

## Next Steps

1. **Set up Rasa environment** with your license key
2. **Create basic conversation flows** for each app
3. **Implement custom actions** for code generation
4. **Test integration** with existing Pathways AI
5. **Deploy to Azure** as containerized service

This will give you a sophisticated conversational AI that can handle complex multi-turn conversations about your development projects! 🚀
