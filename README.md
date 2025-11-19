# Clutch Studio Portfolio Website

A modern, full-stack portfolio website built with Next.js 15, React 19, and TypeScript.

## Tech Stack

- **Framework:** Next.js 15.4.6
- **React:** 19.1.0
- **TypeScript:** 5.x
- **Database:** MySQL with Prisma ORM
- **Styling:** Tailwind CSS 4.x
- **Animations:** GSAP
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm, yarn, pnpm, or bun
- MySQL database (or compatible)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd my-project
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Generate Prisma client:

```bash
npx prisma generate
```

5. Run database migrations:

```bash
npx prisma migrate dev
```

6. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking
- `npm run check` - Run all checks (lint + format + type-check)

## Code Quality & Contribution Guidelines

### Pre-commit Checks

Before committing your code, ensure all checks pass:

```bash
npm run check
```

This command runs:

1. **ESLint** - Code linting and style checks
2. **Prettier** - Code formatting verification
3. **TypeScript** - Type checking

### Code Formatting

We use **Prettier** for consistent code formatting. Always format your code before committing:

```bash
# Format all files
npm run format

# Or check formatting without changing files
npm run format:check
```

### Linting

We use **ESLint** with Next.js configuration. Fix linting issues:

```bash
# Check for linting errors
npm run lint

# Auto-fix linting errors
npm run lint:fix
```

### Type Checking

TypeScript type checking is enforced. Run type checks:

```bash
npm run type-check
```

### GitHub Actions CI/CD

All pull requests and pushes to `main` and `develop` branches automatically run:

- ✅ **Lint Check** - ESLint validation
- ✅ **Type Check** - TypeScript type validation
- ✅ **Format Check** - Prettier formatting validation

**All checks must pass before merging PRs.**

### Contribution Workflow

1. **Create a feature branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and ensure code quality:

   ```bash
   npm run check
   ```

3. **Format your code:**

   ```bash
   npm run format
   ```

4. **Fix any linting issues:**

   ```bash
   npm run lint:fix
   ```

5. **Commit your changes:**

   ```bash
   git commit -m "feat: your feature description"
   ```

6. **Push and create a Pull Request:**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Wait for CI checks to pass** - All GitHub Actions must succeed

8. **Address any review feedback** and ensure checks still pass

### Code Style Guidelines

- Use TypeScript for all new files
- Follow ESLint rules (Next.js recommended config)
- Format code with Prettier (config in `.prettierrc`)
- Write meaningful commit messages
- Keep functions small and focused
- Add comments for complex logic
- Use meaningful variable and function names

### Commit Message Format

Use conventional commit messages:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Example: `feat: add user authentication system`

## Project Structure

```
my-project/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   ├── lib/              # Utility functions
│   ├── constants/        # App constants and data
│   └── types/            # TypeScript type definitions
├── prisma/               # Database schema and migrations
├── public/               # Static assets
└── .github/              # GitHub Actions workflows
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

## Deploy on Vercel

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new).

The project is configured for automatic deployments on push to `main` branch.
