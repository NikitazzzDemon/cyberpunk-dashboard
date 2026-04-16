# Cyberpunk Dashboard

A futuristic, secure software download platform with liquid glass aesthetics and cyberpunk design.

## Features

- **Liquid Glass UI**: Modern glassmorphism design with blur effects and transparency
- **Cyberpunk Theme**: Deep black to bordeaux-red gradient with neon accents
- **Secure Downloads**: Simulated secure token generation and encrypted transfers
- **Authentication Flow**: Telegram OAuth integration with account binding
- **Progress Tracking**: Real-time download progress with security indicators
- **Responsive Design**: Optimized for all screen sizes

## Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom cyberpunk theme
- **Icons**: Lucide React
- **Deployment**: Cloudflare Pages (static export)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

The project is configured for static export and deployment on Cloudflare Pages.

## Deployment

### Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set output directory: `out`
4. Deploy!

### Manual Deployment

```bash
npm run build
# Upload the 'out' folder to your hosting provider
```

## Design System

### Colors

- **Primary**: Deep black (#0a0a0a) to bordeaux-red (#800020)
- **Neon Accents**: Cyber-blue (#00ffff), cyber-purple (#ff00ff), cyber-green (#00ff00)
- **Glass**: Semi-transparent overlays with blur effects

### Components

- **Glass Cards**: Liquid glass effect with backdrop blur
- **Neon Buttons**: Gradient fills with glow effects
- **Progress Bars**: Animated security indicators
- **Modal Windows**: Thick glass with strong backdrop blur

## Architecture

```
src/
  app/
    layout.tsx      # Root layout with global styles
    page.tsx        # Main dashboard page
    globals.css     # Global styles and glass effects
  components/
    Sidebar.tsx     # Navigation sidebar with social links
    SoftwareGrid.tsx # Software cards with download functionality
    AuthModal.tsx   # Authentication modal with Telegram flow
```

## Features Implemented

- [x] Liquid glass UI components
- [x] Cyberpunk color scheme and gradients
- [x] Sidebar navigation with social icons
- [x] Software grid with secure download simulation
- [x] Authentication modal with Telegram integration
- [x] Progress bars and security indicators
- [x] Cloudflare deployment configuration

## Security Features (Simulated)

- Token generation visualization
- Encrypted transfer indicators
- Multi-factor authentication display
- Blockchain verification badges

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT License - feel free to use this project for your own cyberpunk designs!
