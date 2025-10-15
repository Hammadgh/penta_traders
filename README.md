# NewPenta - Lightning Fast Next.js Setup

A modern Next.js 15 project with Tailwind CSS v4, TypeScript, and Turbopack for lightning-fast development.

## 🚀 Features

- **Next.js 15** - Latest version with App Router
- **Tailwind CSS v4** - Latest version with improved performance
- **TypeScript** - Full type safety and IntelliSense
- **Turbopack** - Lightning-fast bundling and hot reloading
- **ESLint** - Code linting and formatting
- **Optimized Images** - WebP and AVIF support
- **Dark Mode** - Built-in dark/light theme support

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd newpenta
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run type-check` - Run TypeScript type checking
- `npm run clean` - Clean build artifacts

## 🎨 Styling

This project uses Tailwind CSS v4 with a custom design system. The CSS variables are defined in `src/app/globals.css` and support both light and dark themes.

### Color Palette

- **Primary**: Blue (#3b82f6)
- **Secondary**: Light gray (#f1f5f9)
- **Muted**: Very light gray (#f8fafc)
- **Accent**: Light gray (#f1f5f9)
- **Destructive**: Red (#ef4444)

### Usage

```tsx
<div className="bg-primary text-primary-foreground p-4 rounded-lg">
  Primary button
</div>
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles and Tailwind imports
│   ├── layout.tsx       # Root layout component
│   └── page.tsx         # Home page
├── components/          # Reusable components (create as needed)
└── lib/                 # Utility functions (create as needed)
```

## ⚡ Performance Optimizations

- **Turbopack** - Up to 10x faster than Webpack
- **Image Optimization** - Automatic WebP/AVIF conversion
- **Bundle Optimization** - SWC minification
- **Compression** - Gzip compression enabled
- **Tree Shaking** - Unused code elimination

## 🌙 Dark Mode

The project includes built-in dark mode support that automatically switches based on system preferences. You can also implement manual theme switching using the CSS variables defined in `globals.css`.

## 📱 Responsive Design

The project is fully responsive and includes:
- Mobile-first design approach
- Flexible grid layouts
- Responsive typography
- Touch-friendly interactions

## 🔧 Customization

### Adding New Colors

Edit the CSS variables in `src/app/globals.css`:

```css
:root {
  --your-color: #your-hex-value;
}

@theme inline {
  --color-your-color: var(--your-color);
}
```

### Adding New Components

Create new components in the `src/components/` directory:

```tsx
// src/components/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, variant = 'primary' }: ButtonProps) {
  return (
    <button className={`px-4 py-2 rounded-lg ${
      variant === 'primary' 
        ? 'bg-primary text-primary-foreground' 
        : 'bg-secondary text-secondary-foreground'
    }`}>
      {children}
    </button>
  );
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

Build the project for production:

```bash
npm run build
```

The build artifacts will be in the `.next/` directory.

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Turbopack Documentation](https://turbo.build/pack)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.