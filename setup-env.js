#!/usr/bin/env node

/**
 * Environment Setup Script for OurSynth Platform
 * This script helps you configure all environment variables across apps
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const colors = {
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = '') {
  console.log(`${color}${message}${colors.reset}`);
}

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  log('🚀 OurSynth Platform Environment Setup', colors.bold + colors.blue);
  log('=====================================\n');
  
  log('This script will help you configure environment variables for all apps.\n');
  
  // Get Supabase credentials
  log('📊 SUPABASE CONFIGURATION', colors.bold + colors.green);
  log('Get these from: https://app.supabase.com/project/YOUR_PROJECT/settings/api\n');
  
  const supabaseUrl = await question('Enter your Supabase Project URL: ');
  const supabaseKey = await question('Enter your Supabase Anon Key: ');
  
  if (!supabaseUrl || !supabaseKey) {
    log('❌ Supabase credentials are required!', colors.red);
    process.exit(1);
  }
  
  // Optional: Get AI provider
  log('\n🤖 AI PROVIDER CONFIGURATION (Optional)', colors.bold + colors.green);
  log('For Pathways App AI component generation:\n');
  
  const wantAI = await question('Do you want to configure an AI provider? (y/N): ');
  let openaiKey = '';
  
  if (wantAI.toLowerCase() === 'y' || wantAI.toLowerCase() === 'yes') {
    openaiKey = await question('Enter your OpenAI API Key (or press Enter to skip): ');
  }
  
  // Update all environment files
  const apps = ['studio', 'pathways', 'domains', 'deploy', 'dashboard'];
  
  log('\n🔧 Updating environment files...', colors.bold + colors.yellow);
  
  for (const app of apps) {
    const envPath = path.join(__dirname, 'apps', app, '.env.local');
    
    if (fs.existsSync(envPath)) {
      let content = fs.readFileSync(envPath, 'utf8');
      
      // Replace Supabase credentials
      content = content.replace(
        'NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co',
        `NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}`
      );
      content = content.replace(
        'NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here',
        `NEXT_PUBLIC_SUPABASE_ANON_KEY=${supabaseKey}`
      );
      
      // Replace OpenAI key for Pathways app
      if (app === 'pathways' && openaiKey) {
        content = content.replace(
          'OPENAI_API_KEY=your-openai-api-key-here',
          `OPENAI_API_KEY=${openaiKey}`
        );
      }
      
      fs.writeFileSync(envPath, content);
      log(`✅ Updated ${app} app environment`, colors.green);
    }
  }
  
  log('\n🎉 Environment setup complete!', colors.bold + colors.green);
  log('\nNext steps:', colors.bold);
  log('1. Install dependencies: npm install');
  log('2. Build shared packages: npm run build:packages');
  log('3. Start development servers: npm run dev');
  log('\nYour apps will be available at:');
  log('• Studio: http://localhost:3000');
  log('• Pathways: http://localhost:3001');
  log('• Domains: http://localhost:3002');
  log('• Deploy: http://localhost:3003');
  log('• Dashboard: http://localhost:3004\n');
  
  rl.close();
}

main().catch(console.error);
