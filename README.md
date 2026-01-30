# Aryan Kargwal - Research Portfolio

A neo-brutalist research portfolio built with Astro 5.0 and Tailwind CSS. Features a "controlled chaos" aesthetic with hard edges, grain textures, and neon accents.

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your GitHub token and Goodreads User ID

# Start dev server
npm run dev

# Build for production
npm run build
```

## Features

- **Neo-Brutalist Design**: Hard shadows, 2-4px borders, zero border-radius
- **Grainy Paper Texture**: Subtle animated grain overlay
- **Gawx Color Palette**: Cyber Cyan, Error Red, Acid Lime accents
- **Bento Grid Layout**: Asymmetric project showcase
- **Type-Safe Content**: Astro Content Collections with strict schemas
- **Status Badges**: "Taped on" stickers for project status
- **GitHub Integration**: Live contribution graph via GitHub API
- **Goodreads Integration**: Currently reading books from RSS feed
- **Responsive**: Mobile-first, works on all devices

## Tech Stack

- Astro 5.0
- Tailwind CSS v3
- TypeScript (strict mode)
- Google Fonts (Space Grotesk + JetBrains Mono)

## Project Structure

```
/
├── .dev-docs/          # Local documentation (gitignored)
├── src/
│   ├── content/        # Markdown content
│   ├── layouts/        # Page layouts
│   ├── components/     # Reusable components
│   └── pages/          # Routes
├── public/             # Static assets
└── dist/               # Build output
```

## Documentation

- **[🚀 Deployment Checklist](.dev-docs/DEPLOYMENT_CHECKLIST.md)** - Deploy to GitHub Pages
- **[GitHub Pages Setup](.dev-docs/GITHUB_PAGES_DEPLOY.md)** - Detailed deployment guide
- **[API Setup Guide](.dev-docs/API_SETUP.md)** - Set up GitHub & Goodreads integrations
- [Quick Start Guide](.dev-docs/QUICK_START.md)
- [Project Plan](.dev-docs/PROJECT_PLAN.md)
- [Implementation Summary](.dev-docs/IMPLEMENTATION_SUMMARY.md)

## Color Palette

```css
--graphite: #121212
--cyber-cyan: #00f3ff
--error-red: #ff0055
--acid-lime: #ccff00
```

## Deploy to GitHub Pages

This portfolio uses **GitHub Actions** to securely deploy to GitHub Pages while keeping your GitHub API token secret.

**Quick Deploy:**
1. Create GitHub Personal Access Token ([guide](.dev-docs/GITHUB_PAGES_DEPLOY.md))
2. Add as repository secret: `GH_CONTRIB_TOKEN`
3. Push to `main` branch
4. GitHub Actions builds and deploys automatically!

See [Deployment Checklist](.dev-docs/DEPLOYMENT_CHECKLIST.md) for step-by-step instructions.

## License

MIT
