# Monetra Frontend

This is the frontend application for the Monetra project, built with Next.js.

## Tech Stack
- **Framework**: [Next.js v16](https://nextjs.org) (App Router + Turbopack)
- **Library**: React v19
- **Language**: TypeScript v5+
- **Styling**: Tailwind CSS v4 (CSS-first configuration)
- **Icons**: Lucide React
- **Forms & Validation**: React Hook Form, Zod
- **HTTP Client**: Axios
- **Linting**: ESLint v9
- **Modules**: ESM (`type: "module"`)

- **Modules**: ESM (`type: "module"`)

## 🏆 Project Accomplishments
See [ACCOMPLISHMENTS.md](./ACCOMPLISHMENTS.md) for a detailed breakdown of the engineering decisions, architecture, and code quality practices implemented in this project. This file serves as a technical showcase.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory:
   ```bash
   NEXT_PUBLIC_BACKEND_URL=http://localhost:9100
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure
- `src/app`: Application routes and pages
- `src/components`: Reusable UI components
- `src/styles`: Global styles and CSS modules
- `public`: Static assets

## Learn More
To learn more about Next.js, take a look at the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Development Notes

### VS Code Configuration
This project uses **Tailwind CSS v4**, which introduces new CSS syntax (e.g., `@theme`, `@import "tailwindcss"`).
If you see warnings like `Unknown at rule @theme`, this is due to VS Code's CSS validation.
We have included a `.vscode/settings.json` file to suppress these warnings:
```json
{
  "css.lint.unknownAtRules": "ignore"
}
```
