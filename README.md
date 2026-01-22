# 🖥️ Discord Quest Tracker CLI

<div align="center">

![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Track Discord Quests from Your Terminal**

*A lightweight CLI tool to monitor your Discord quests with beautiful colored output*

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Demo](#-demo) • [Security](#-security)

</div>

---

## ⚠️ IMPORTANT NOTICE

**This tool uses your Discord token for authentication.**

- 🔒 Your token gives **full access** to your account
- ⚠️ Using tokens for automation may violate Discord's ToS
- ✅ This script only **reads** data (no automation)
- 🛡️ Use on **test/throwaway accounts** when possible
- 🔐 **Never share your token** with anyone

**For educational purposes only. Use at your own risk.**

---

## 🎯 About

A command-line tool that fetches and displays your Discord quest progress directly in your terminal. No browser needed - just run the script with your Discord token and get instant quest updates!

### **What Makes This Different?**

| Feature | Browser Console Version | **CLI Version** |
|---------|------------------------|-----------------|
| **Platform** | Browser only | ✅ Terminal/VS Code |
| **Token Needed** | No | Yes (passed as argument) |
| **Convenience** | Need browser open | ✅ Run from anywhere |
| **Speed** | Medium | ✅ Instant |
| **Automation Potential** | Limited | ✅ Can be scheduled |

---

## ✨ Features

### 🎨 **Beautiful Terminal Output**
- Color-coded quest information
- Progress bars with percentages
- Clean, organized layout
- Emoji icons for quick scanning

### 📊 **Complete Quest Overview**
- Active quests with progress
- Available quests to start
- Completed quest history
- Quest expiration tracking

### ⚡ **Fast & Lightweight**
- No external dependencies
- Uses only Node.js built-in modules
- Runs in seconds
- Minimal resource usage

### 🔧 **Simple to Use**
- Single command execution
- Clear error messages
- Helpful troubleshooting tips
- No configuration needed

---

## 🚀 Installation

### **Prerequisites:**

- **Node.js** (v14 or higher)
  - Download: [nodejs.org](https://nodejs.org/)
  - Check version: `node --version`

- **Discord Token**
  - See [How to Get Your Token](#-how-to-get-your-discord-token)

### **Setup:**

1. **Download the Script:**
   ```bash
   # Clone the repository
   git clone https://github.com/YOUR_USERNAME/Discord-Quest-Tracker-CLI.git
   cd Discord-Quest-Tracker-CLI
   ```

2. **Or Download Directly:**
   - Download `quest-tracker-cli.js`
   - Save to your preferred location

**That's it!** No `npm install` needed! ✅

---

## 💻 Usage

### **Basic Usage:**

```bash
node quest-tracker-cli.js YOUR_DISCORD_TOKEN
```

### **Example:**

```bash
node quest-tracker-cli.js MTIzNDU2Nzg5MDEyMzQ1Njc4.AbCdEf.GhIjKlMnOpQrStUvWxYz
```

### **From VS Code:**

1. Open terminal in VS Code (`` Ctrl + ` ``)
2. Navigate to script location
3. Run the command above

---

## 🔑 How to Get Your Discord Token

### **Method 1: Network Tab (Recommended)**

1. Open Discord in browser: [discord.com](https://discord.com)
2. Press `F12` to open Developer Tools
3. Go to **Network** tab
4. Press `F5` to refresh the page
5. Click any request to `discord.com/api`
6. Find **Authorization** in Request Headers
7. Copy the token value

### **Method 2: Application Tab**

1. Open Discord in browser
2. Press `F12` to open Developer Tools
3. Go to **Application** → **Local Storage**
4. Click `https://discord.com`
5. Find `token` in the key list
6. Copy the value (remove quotes)

### **Method 3: Console (Quick)**

1. Open Discord in browser
2. Press `F12` → **Console** tab
3. Paste and run:
   ```javascript
   (webpackChunkdiscord_app.push([[''],{},e=>{m=[];for(let c in e.c)m.push(e.c[c])}]),m).find(m=>m?.exports?.default?.getToken!==void 0).exports.default.getToken()
   ```
4. Copy the token that appears

---

## 📸 Demo

### **Terminal Output:**

```
╔══════════════════════════════════════════════════════╗
║       🎮 DISCORD QUEST TRACKER (CLI) 🎮              ║
╚══════════════════════════════════════════════════════╝

📡 Fetching quest data...
✓ Connected as: YourUsername#1234

📊 QUEST SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ✓ Active Quests: 2
   ✓ Completed: 5
   ○ Available: 3
   ✗ Expired: 0

🎯 ACTIVE QUESTS (In Progress)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[1] 📺 Watch 15 Minutes of Netflix
    App: Netflix
    Task: Watch Video
    Progress: [████████████░░░░░░░░] 60.0% (9m / 15m)
    Expires: Jan 20, 11:59 PM (in 4d 8h)
    Remaining: 6m

[2] 🎮 Play Valorant for 30 Minutes
    App: Valorant
    Task: Play Game
    Progress: [██████░░░░░░░░░░░░░░] 30.0% (9m / 30m)
    Expires: Jan 25, 11:59 PM (in 9d 12h)
    Remaining: 21m

🆕 AVAILABLE QUESTS (Not Started)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[1] 📺 Watch YouTube Content
    App: YouTube
    Task: Watch Video
    Time needed: 10m
    Expires: Jan 22, 11:59 PM (in 6d 15h)

💡 TIPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   • Video quests can be completed in browser
   • Game/Stream quests require Discord Desktop App
   • Stream quests need at least 1 person in voice chat
   • Check back regularly before quests expire!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ Quest tracking complete!
🔄 Run this script again anytime to refresh your quest status
```

---

## 🔒 Security & Safety

### **Token Security:**

⚠️ **CRITICAL: Protect Your Token!**

Your Discord token is like your password. Anyone with your token can:
- Read your messages
- Send messages as you
- Access your account fully
- Join/leave servers

### **Best Practices:**

✅ **DO:**
- Use on test/throwaway accounts when possible
- Keep your token private
- Never commit tokens to Git
- Regenerate token if compromised

❌ **DON'T:**
- Share your token with anyone
- Post token in public (Discord, GitHub, etc.)
- Commit token to repositories
- Use tokens from untrusted sources

### **Is This Script Safe?**

**What This Script Does:**
- ✅ Only **reads** quest data
- ✅ Uses HTTPS for all requests
- ✅ Doesn't store your token
- ✅ Doesn't modify any data
- ✅ No external dependencies

**What This Script Doesn't Do:**
- ❌ Doesn't automate quest completion
- ❌ Doesn't send data to third parties
- ❌ Doesn't store credentials
- ❌ Doesn't violate data intentionally

**Risk Assessment:**
- ⚠️ Using tokens may violate Discord ToS
- ⚠️ Potential account action if detected
- ✅ Read-only operations are lower risk
- 🛡️ Use on test accounts to be safe

---

## 🔧 Troubleshooting

### **"git: command not found" or Node.js not installed**

**Solution:**
- Download Node.js from [nodejs.org](https://nodejs.org/)
- Install and restart terminal
- Verify: `node --version`

### **"Error: API Error: 401 - Unauthorized"**

**Solution:**
- Your token is invalid or expired
- Get a new token using methods above
- Make sure you copied the full token
- Check for extra spaces or quotes

### **"Error: Discord token required!"**

**Solution:**
- You didn't provide a token as argument
- Usage: `node quest-tracker-cli.js YOUR_TOKEN`
- Token should be the first argument

### **"Cannot find module 'https'"**

**Solution:**
- Update Node.js to latest version
- Built-in modules should work out of the box

### **Colors not showing in terminal**

**Solution:**
- Use a modern terminal (Windows Terminal, iTerm2, etc.)
- Some terminals don't support ANSI colors
- Information is still readable without colors

### **"ECONNREFUSED" or connection errors**

**Solution:**
- Check your internet connection
- Verify Discord API is accessible
- Try again in a few moments
- Check firewall settings

---

## 💡 Tips & Tricks

### **Create a Shortcut (Windows):**

Create `check-quests.bat`:
```batch
@echo off
node quest-tracker-cli.js YOUR_TOKEN_HERE
pause
```

Double-click to run instantly!

### **Create an Alias (Mac/Linux):**

Add to `~/.bashrc` or `~/.zshrc`:
```bash
alias check-quests='node /path/to/quest-tracker-cli.js YOUR_TOKEN'
```

Then just type: `check-quests`

### **Schedule Regular Checks:**

**Windows (Task Scheduler):**
- Create task to run `check-quests.bat` daily

**Mac/Linux (Cron):**
```bash
# Check quests every 6 hours
0 */6 * * * node /path/to/quest-tracker-cli.js YOUR_TOKEN >> quest.log
```

### **Integrate with VS Code:**

Add to VS Code tasks (`.vscode/tasks.json`):
```json
{
  "label": "Check Discord Quests",
  "type": "shell",
  "command": "node quest-tracker-cli.js YOUR_TOKEN"
}
```

---

## 🎓 Educational Value

### **What You'll Learn:**

**Node.js Development:**
- Built-in modules (`https`, `fs`, `path`)
- Asynchronous programming
- Promise handling
- Error handling
- CLI application structure

**Discord API:**
- Authentication with tokens
- REST API requests
- Quest data structure
- Response parsing
- API error handling

**Terminal Applications:**
- ANSI color codes
- Console formatting
- User-friendly CLI design
- Progress visualization
- Error reporting

---

## 📁 Repository Structure

```
Discord-Quest-Tracker-CLI/
│
├── 📄 README.md              # This file
├── 📄 LICENSE                # MIT License
├── 📄 .gitignore             # Git ignore rules
│
└── 📄 quest-tracker-cli.js   # Main CLI script
```

---

## 🤝 Contributing

Contributions welcome! Help improve this tool!

### **How to Contribute:**

1. Fork the repository
2. Create feature branch: `git checkout -b feature/improvement`
3. Make your changes
4. Commit: `git commit -m 'Add: Feature description'`
5. Push: `git push origin feature/improvement`
6. Open a Pull Request

### **Contribution Ideas:**

- 🎨 Improve terminal colors and formatting
- 📊 Add more quest statistics
- 🔧 Better error handling
- 📝 Improve documentation
- ✨ Add new display features
- 🐛 Fix bugs
- 🌐 Add configuration file support
- 💾 Add export to JSON/CSV

---

## 🗺️ Roadmap

### **Planned Features:**

- [ ] `.env` file support for safer token storage
- [ ] Export quest data to JSON/CSV
- [ ] Watch mode (auto-refresh)
- [ ] Quest notifications
- [ ] Configuration file
- [ ] Multiple account support
- [ ] Quest history tracking
- [ ] Custom themes

**Vote for features** by opening an issue!

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## ⚠️ Disclaimer

**Educational Purpose:**
- This tool is for educational purposes
- Learn about Node.js, APIs, and CLI development
- Understand Discord's quest system

**Use Responsibly:**
- Using tokens may violate Discord ToS
- Potential account penalties
- Use on test accounts when possible
- Author not responsible for any consequences

**No Warranty:**
- Provided "AS IS" without warranty
- Use at your own risk
- No guarantee of functionality

---

## 📞 Support

- 🐛 **Issues:** [GitHub Issues](https://github.com/YOUR_USERNAME/Discord-Quest-Tracker-CLI/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/YOUR_USERNAME/Discord-Quest-Tracker-CLI/discussions)
- 📧 **Questions:** Open an issue

---

## 🌟 Related Projects

- 📊 [Discord Quest Tracker (Browser)](https://github.com/YOUR_USERNAME/Discord-Quest-Tracker) - Safe browser console version (100% ToS compliant)
- 🤖 [Discord Quest Automation](https://github.com/YOUR_USERNAME/Discord-Quest-Automation) - Automation script (Educational, ⚠️ violates ToS)

---

## 🏆 Acknowledgments

- **Discord** - For their platform and quest system
- **Node.js Community** - For excellent documentation
- **Open Source Community** - For inspiration and support

---

<div align="center">

### 🖥️ Terminal-Based Quest Tracking 🖥️

**Fast • Lightweight • Colorful • Simple**

---

**Made with 💻 for the Discord community**

**© 2026 | MIT License**

---

[![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/Discord-Quest-Tracker-CLI?style=social)](https://github.com/YOUR_USERNAME/Discord-Quest-Tracker-CLI/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/YOUR_USERNAME/Discord-Quest-Tracker-CLI?style=social)](https://github.com/YOUR_USERNAME/Discord-Quest-Tracker-CLI/network/members)

**⭐ Star this repo if you find it useful! ⭐**

</div>
