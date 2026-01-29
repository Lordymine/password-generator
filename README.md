# Password Generator

A modern, clean password generator built with Next.js 16.1.1 and Tailwind CSS v4.

## Features

- 🔐 Generate secure passwords with customizable options
- 📊 Real-time strength indicator with entropy calculation
- 📋 One-click copy to clipboard
- ⚙️ Configurable password options:
  - Length (4-128 characters)
  - Uppercase letters
  - Lowercase letters
  - Numbers
  - Symbols
  - Exclude similar/ambiguous characters
- 🎯 Clean, modern UI with proper separation of concerns
- 📱 Responsive design

## Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Architecture**: Clean Architecture (domains, features, shared)
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── domains/               # Business logic
│   └── password/
│       └── password-generator.ts
├── features/              # Feature modules
│   └── password-generator/
│       ├── index.tsx      # Main component
│       └── ui/            # Feature-specific UI
├── shared/                # Shared code
│   ├── ui/
│   │   ├── components/    # Reusable UI components
│   │   └── lib/utils.ts   # UI utilities
│   └── hooks/             # Custom hooks
```

## License

MIT
