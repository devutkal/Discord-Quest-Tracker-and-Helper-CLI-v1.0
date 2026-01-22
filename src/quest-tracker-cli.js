/**
 * Discord Quest Tracker - CLI Version with .env Support
 * Track your Discord quests securely using environment variables
 * 
 * Setup:
 * 1. Create a .env file in the same directory
 * 2. Add: DISCORD_TOKEN=your_token_here
 * 3. Run: node quest-tracker-cli-env.js
 * 
 * ⚠️ WARNING: Never commit .env file to Git!
 * Add .env to your .gitignore
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Simple .env file parser (no external dependencies)
function loadEnv(filePath = '.env') {
  try {
    const envPath = path.resolve(process.cwd(), filePath);
    
    if (!fs.existsSync(envPath)) {
      return null;
    }
    
    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');
    
    lines.forEach(line => {
      line = line.trim();
      
      // Skip empty lines and comments
      if (!line || line.startsWith('#')) return;
      
      // Parse KEY=VALUE
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        let value = match[2].trim();
        
        // Remove quotes if present
        value = value.replace(/^["']|["']$/g, '');
        
        process.env[key] = value;
      }
    });
    
    return true;
  } catch (error) {
    return null;
  }
}

// ANSI Color Codes
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

// Discord API configuration
const API_BASE = 'discord.com';
const API_VERSION = 'v9';

// Make Discord API request
function discordRequest(path, token) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: API_BASE,
      path: `/api/${API_VERSION}${path}`,
      method: 'GET',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
        'User-Agent': 'DiscordBot (QuestTracker, 1.0.0)'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error('Failed to parse response'));
          }
        } else {
          reject(new Error(`API Error: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

// Format time duration
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${secs}s`;
  return `${secs}s`;
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Get time remaining
function getTimeRemaining(expiresAt) {
  const now = Date.now();
  const expiry = new Date(expiresAt).getTime();
  const diff = expiry - now;

  if (diff <= 0) return 'Expired';

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 0) return `${days}d ${hours}h`;
  return `${hours}h`;
}

// Get progress bar
function getProgressBar(current, total, length = 20) {
  const percentage = Math.min((current / total) * 100, 100);
  const filled = Math.floor((percentage / 100) * length);
  const empty = length - filled;

  return `[${colors.green}${'█'.repeat(filled)}${colors.reset}${'░'.repeat(empty)}] ${percentage.toFixed(1)}%`;
}

// Get task icon
function getTaskIcon(taskType) {
  const icons = {
    'WATCH_VIDEO': '📺',
    'WATCH_VIDEO_ON_MOBILE': '📱',
    'PLAY_ON_DESKTOP': '🎮',
    'STREAM_ON_DESKTOP': '📡',
    'PLAY_ACTIVITY': '🎯'
  };
  return icons[taskType] || '📋';
}

// Get task name
function getTaskName(taskType) {
  const names = {
    'WATCH_VIDEO': 'Watch Video',
    'WATCH_VIDEO_ON_MOBILE': 'Watch on Mobile',
    'PLAY_ON_DESKTOP': 'Play Game',
    'STREAM_ON_DESKTOP': 'Stream Game',
    'PLAY_ACTIVITY': 'Play Activity'
  };
  return names[taskType] || taskType;
}

// Print header
function printHeader() {
  console.log('\n' + colors.bold + colors.cyan + '╔══════════════════════════════════════════════════════╗' + colors.reset);
  console.log(colors.bold + colors.cyan + '║       🎮 DISCORD QUEST TRACKER (CLI) 🎮              ║' + colors.reset);
  console.log(colors.bold + colors.cyan + '╚══════════════════════════════════════════════════════╝' + colors.reset + '\n');
}

// Print section header
function printSection(title, icon = '') {
  console.log('\n' + colors.bold + colors.yellow + icon + ' ' + title + colors.reset);
  console.log(colors.white + '━'.repeat(60) + colors.reset);
}

// Create example .env file
function createExampleEnv() {
  const exampleContent = `# Discord Quest Tracker Configuration
# 
# ⚠️ IMPORTANT: Never commit this file to Git!
# Add .env to your .gitignore file
#
# How to get your Discord token:
# 1. Open Discord in browser (discord.com)
# 2. Press F12 to open Developer Console
# 3. Go to "Network" tab
# 4. Refresh page (F5)
# 5. Click any request to "discord.com/api"
# 6. Find "Authorization" in Request Headers
# 7. Copy the token value and paste below

DISCORD_TOKEN=your_discord_token_here

# Example (don't use this, it's fake):
# DISCORD_TOKEN=MTIzNDU2Nzg5MDEyMzQ1Njc4.AbCdEf.GhIjKlMnOpQrStUvWxYz
`;

  try {
    fs.writeFileSync('.env.example', exampleContent);
    return true;
  } catch (error) {
    return false;
  }
}

// Show setup instructions
function showSetupInstructions() {
  console.log('\n' + colors.red + '✗ Error: .env file not found!' + colors.reset);
  console.log('\n' + colors.yellow + '📝 Setup Instructions:' + colors.reset);
  console.log('');
  console.log(colors.bold + 'Step 1: Create .env file' + colors.reset);
  console.log('  Create a file named ' + colors.cyan + '.env' + colors.reset + ' in the same directory as this script');
  console.log('');
  console.log(colors.bold + 'Step 2: Add your Discord token' + colors.reset);
  console.log('  Add this line to your .env file:');
  console.log('  ' + colors.green + 'DISCORD_TOKEN=your_token_here' + colors.reset);
  console.log('');
  console.log(colors.bold + 'Step 3: Get your Discord token' + colors.reset);
  console.log('  1. Open Discord in browser (discord.com)');
  console.log('  2. Press ' + colors.cyan + 'F12' + colors.reset + ' to open Developer Console');
  console.log('  3. Go to ' + colors.cyan + '"Network"' + colors.reset + ' tab');
  console.log('  4. Refresh page (' + colors.cyan + 'F5' + colors.reset + ')');
  console.log('  5. Click any request to ' + colors.cyan + '"discord.com/api"' + colors.reset);
  console.log('  6. Find ' + colors.cyan + '"Authorization"' + colors.reset + ' in Request Headers');
  console.log('  7. Copy the token value');
  console.log('');
  console.log(colors.bold + 'Step 4: Update .gitignore' + colors.reset);
  console.log('  Add this line to your .gitignore:');
  console.log('  ' + colors.green + '.env' + colors.reset);
  console.log('');
  
  // Create example file
  if (createExampleEnv()) {
    console.log(colors.green + '✓ Created .env.example file for reference' + colors.reset);
    console.log('  Copy it to .env and add your token');
    console.log('');
  }
  
  console.log(colors.red + '⚠️  WARNING: Never share your token! It gives full account access!' + colors.reset);
  console.log('');
}

// Main tracking function
async function trackQuests(token) {
  try {
    printHeader();
    
    console.log(colors.cyan + '📡 Fetching quest data...' + colors.reset);
    
    const user = await discordRequest('/users/@me', token);
    console.log(colors.green + `✓ Connected as: ${user.username}#${user.discriminator}` + colors.reset);
    
    const questsData = await discordRequest('/quests', token);
    
    if (!questsData || !questsData.quests) {
      console.log(colors.red + '\n✗ Could not fetch quests data' + colors.reset);
      return;
    }
    
    const allQuests = questsData.quests;
    
    // Categorize quests
    const activeQuests = allQuests.filter(q => 
      q.user_status?.enrolled_at && 
      !q.user_status?.completed_at && 
      new Date(q.config.expires_at).getTime() > Date.now()
    );
    
    const completedQuests = allQuests.filter(q => q.user_status?.completed_at);
    const availableQuests = allQuests.filter(q => !q.user_status?.enrolled_at);
    const expiredQuests = allQuests.filter(q => 
      q.user_status?.enrolled_at &&
      !q.user_status?.completed_at &&
      new Date(q.config.expires_at).getTime() <= Date.now()
    );
    
    // Print summary
    printSection('QUEST SUMMARY', '📊');
    console.log(`   ${colors.green}✓${colors.reset} Active Quests: ${colors.bold}${activeQuests.length}${colors.reset}`);
    console.log(`   ${colors.green}✓${colors.reset} Completed: ${colors.bold}${completedQuests.length}${colors.reset}`);
    console.log(`   ${colors.yellow}○${colors.reset} Available: ${colors.bold}${availableQuests.length}${colors.reset}`);
    console.log(`   ${colors.red}✗${colors.reset} Expired: ${colors.bold}${expiredQuests.length}${colors.reset}`);
    
    // Print active quests
    if (activeQuests.length > 0) {
      printSection('ACTIVE QUESTS (In Progress)', '🎯');
      
      activeQuests.forEach((quest, index) => {
        const config = quest.config.task_config || quest.config.task_config_v2;
        const taskTypes = Object.keys(config.tasks);
        const taskType = taskTypes[0];
        const task = config.tasks[taskType];
        
        const progress = quest.user_status?.progress?.[taskType]?.value || 0;
        const target = task.target;
        
        console.log(`\n${colors.bold}[${index + 1}] ${getTaskIcon(taskType)} ${quest.config.messages.quest_name}${colors.reset}`);
        console.log(`    App: ${colors.cyan}${quest.config.application.name}${colors.reset}`);
        console.log(`    Task: ${getTaskName(taskType)}`);
        console.log(`    Progress: ${getProgressBar(progress, target)} (${formatTime(progress)} / ${formatTime(target)})`);
        console.log(`    Expires: ${colors.yellow}${formatDate(quest.config.expires_at)}${colors.reset} (in ${getTimeRemaining(quest.config.expires_at)})`);
        
        if (progress < target) {
          const remaining = target - progress;
          console.log(`    Remaining: ${colors.magenta}${formatTime(remaining)}${colors.reset}`);
        } else {
          console.log(`    Status: ${colors.green}✓ Ready to claim!${colors.reset}`);
        }
      });
    } else {
      console.log(colors.yellow + '\n   No active quests in progress' + colors.reset);
    }
    
    // Print available quests
    if (availableQuests.length > 0) {
      printSection('AVAILABLE QUESTS (Not Started)', '🆕');
      
      availableQuests.forEach((quest, index) => {
        const config = quest.config.task_config || quest.config.task_config_v2;
        const taskTypes = Object.keys(config.tasks);
        const taskType = taskTypes[0];
        const task = config.tasks[taskType];
        
        console.log(`\n${colors.bold}[${index + 1}] ${getTaskIcon(taskType)} ${quest.config.messages.quest_name}${colors.reset}`);
        console.log(`    App: ${colors.cyan}${quest.config.application.name}${colors.reset}`);
        console.log(`    Task: ${getTaskName(taskType)}`);
        console.log(`    Time needed: ${colors.magenta}${formatTime(task.target)}${colors.reset}`);
        console.log(`    Expires: ${colors.yellow}${formatDate(quest.config.expires_at)}${colors.reset} (in ${getTimeRemaining(quest.config.expires_at)})`);
      });
    }
    
    // Print completed quests
    if (completedQuests.length > 0) {
      printSection('COMPLETED QUESTS', '✅');
      
      completedQuests.forEach((quest, index) => {
        console.log(`\n${colors.green}[${index + 1}] ✓ ${quest.config.messages.quest_name}${colors.reset}`);
        console.log(`    Completed: ${formatDate(quest.user_status.completed_at)}`);
      });
    }
    
    // Print tips
    printSection('TIPS', '💡');
    console.log(colors.white + '   • Video quests can be completed in browser' + colors.reset);
    console.log(colors.white + '   • Game/Stream quests require Discord Desktop App' + colors.reset);
    console.log(colors.white + '   • Stream quests need at least 1 person in voice chat' + colors.reset);
    console.log(colors.white + '   • Check back regularly before quests expire!' + colors.reset);
    
    // Footer
    console.log('\n' + colors.cyan + '━'.repeat(60) + colors.reset);
    console.log(colors.green + '✨ Quest tracking complete!' + colors.reset);
    console.log(colors.white + '🔄 Run this script again anytime to refresh' + colors.reset);
    console.log('');
    
  } catch (error) {
    console.log('\n' + colors.red + '✗ Error: ' + error.message + colors.reset);
    console.log(colors.yellow + '\nTroubleshooting:' + colors.reset);
    console.log('  • Check if your token in .env is correct');
    console.log('  • Make sure .env file is in the same directory');
    console.log('  • Verify your internet connection');
    console.log('  • Token might have expired - get a new one');
    console.log('');
  }
}

// Main execution
console.log(colors.cyan + '🔐 Loading configuration from .env file...' + colors.reset);

// Load .env file
const envLoaded = loadEnv();

if (!envLoaded) {
  showSetupInstructions();
  process.exit(1);
}

// Get token from environment
const token = process.env.DISCORD_TOKEN;

if (!token || token === 'your_discord_token_here') {
  console.log('\n' + colors.red + '✗ Error: DISCORD_TOKEN not configured in .env file!' + colors.reset);
  console.log('\n' + colors.yellow + 'Please edit your .env file and add your Discord token:' + colors.reset);
  console.log('  ' + colors.green + 'DISCORD_TOKEN=your_actual_token_here' + colors.reset);
  console.log('\nSee .env.example for reference.');
  console.log('');
  process.exit(1);
}

console.log(colors.green + '✓ Configuration loaded successfully' + colors.reset);

// Run the tracker
trackQuests(token);