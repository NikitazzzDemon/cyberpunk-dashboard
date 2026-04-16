# Deployment Guide: GitHub + Cloudflare

## Step-by-Step Deployment Instructions

### Phase 1: GitHub Setup

#### 1. Install Git (if not installed)
```bash
# Download Git from https://git-scm.com/download/win
# Or use Windows Package Manager
winget install Git.Git
```

#### 2. Initialize Git Repository
```bash
# Open PowerShell/CMD in project folder
cd c:\Users\nikit\Desktop\website
git init
```

#### 3. Create .gitignore File
Create file `.gitignore` with this content:
```
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Next.js
.next/
out/
build/
dist/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# Temporary folders
tmp/
temp/
```

#### 4. Configure Git User
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

#### 5. Add All Files to Git
```bash
git add .
git status  # Check what files will be uploaded
```

#### 6. Create First Commit
```bash
git commit -m "Initial commit: Cyberpunk dashboard with liquid glass UI"
```

#### 7. Create GitHub Repository
1. Go to [github.com](https://github.com)
2. Click "New repository"
3. Repository name: `cyberpunk-dashboard`
4. Description: `Futuristic secure software download platform`
5. Make it **Public** (free for Cloudflare Pages)
6. **DO NOT** initialize with README, .gitignore, or license
7. Click "Create repository"

#### 8. Connect Local Git to GitHub
```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/cyberpunk-dashboard.git
git branch -M main
git push -u origin main
```

### Phase 2: Cloudflare Deployment

#### 1. Sign Up for Cloudflare
1. Go to [cloudflare.com](https://cloudflare.com)
2. Click "Sign Up"
3. Use your email or GitHub account
4. Choose "Free" plan

#### 2. Connect GitHub to Cloudflare Pages
1. In Cloudflare dashboard, go to "Pages" in left menu
2. Click "Create a project"
3. Click "Connect to Git"
4. Choose GitHub and authorize access
5. Find your `cyberpunk-dashboard` repository
6. Click "Begin setup"

#### 3. Configure Build Settings
```
Build command: npm run build
Build output directory: out
Root directory: (leave empty)
```

#### 4. Environment Variables (Optional)
Add these if you have them:
```
NODE_VERSION: 18
```

#### 5. Deploy
1. Click "Save and Deploy"
2. Wait for build to complete (2-3 minutes)
3. Your site will be available at: `your-project-name.pages.dev`

### Phase 3: Custom Domain (Optional)

#### 1. Get Free Domain
1. Go to [freenom.com](https://www.freenom.com) for free domains
2. Or use [eu.org](https://eu.org) for free domains
3. Register a domain name

#### 2. Add Domain to Cloudflare
1. In Cloudflare dashboard, go to "Sites"
2. Click "Add a site"
3. Enter your domain name
4. Choose "Free" plan

#### 3. Configure DNS
1. Add CNAME record:
   ```
   Type: CNAME
   Name: @
   Target: your-project-name.pages.dev
   TTL: Auto
   ```

#### 4. Update Cloudflare Pages
1. Go to Pages project
2. Click "Custom domains"
3. Add your domain name
4. Wait for SSL certificate (5-10 minutes)

### Files to Upload to GitHub

**REQUIRED FILES:**
```
package.json          # Dependencies
next.config.js        # Next.js config
tailwind.config.js    # Tailwind config
tsconfig.json         # TypeScript config
postcss.config.js     # PostCSS config
wrangler.toml         # Cloudflare config
README.md             # Project documentation
DEPLOYMENT.md         # This guide
.gitignore            # Git ignore rules

src/
  app/
    layout.tsx        # Root layout
    page.tsx          # Main page
    globals.css       # Global styles
  components/
    Sidebar.tsx       # Navigation
    SoftwareGrid.tsx  # Software cards
    AuthModal.tsx     # Authentication
```

**DO NOT UPLOAD:**
```
node_modules/         # Dependencies (too large)
.next/               # Next.js build files
out/                 # Build output
.env files           # Environment variables
```

### Quick Commands Summary

```bash
# Git setup
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/cyberpunk-dashboard.git
git push -u origin main

# Local development (after npm install)
npm run dev

# Build test
npm run build
```

### Troubleshooting

#### Build Errors on Cloudflare
1. Check `package.json` has correct scripts
2. Ensure `output: 'export'` in `next.config.js`
3. Verify all imports are correct

#### Git Push Issues
1. Check GitHub token permissions
2. Verify repository URL is correct
3. Use `git pull` before `git push` if there are conflicts

#### Domain Issues
1. Wait 24-48 hours for DNS propagation
2. Check Cloudflare SSL certificate status
3. Verify CNAME record points correctly

### Final Result

After deployment, your cyberpunk dashboard will be live at:
- Default: `your-project-name.pages.dev`
- Custom: `your-domain.com`

The site will feature:
- Liquid glass UI with cyberpunk aesthetics
- Secure download simulation
- Telegram authentication flow
- Responsive design for all devices
- Global CDN distribution via Cloudflare
