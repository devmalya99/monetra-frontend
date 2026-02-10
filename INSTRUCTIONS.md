# Monetra Frontend Instructions

## Project Overview
This document outlines the step-by-step workflow and planning for the Monetra frontend development.

## Tech Stack
- **Core**: Next.js (App Router), React
- **Language**: TypeScript
- **Styling**: Tailwind CSS, PostCSS
- **Icons**: Lucide React
- **Validation**: Zod
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **Utilities**: clsx, tailwind-merge
- **Authentication**: JWT (Planned integration with backend)

## implementation Workflow

### Phase 1: Setup & Foundation
- [x] **Step 1**: Initialize Next.js Project
  - Created `frontend` directory
  - Initialized Next.js app with TypeScript, ESLint, and App Router
  - Configured for Vanilla CSS (No Tailwind)
  - Integrated Tailwind CSS v4 (CSS-first configuration)
  - Configured VS Code settings for v4 syntax
  - Updated `globals.css` with `@theme` directives
- [x] **Step 3**: System Modernization & Upgrades
  - Upgraded dependencies to latest stable versions (React 19, Next.js 16)
  - Migrated project configuration to ESM (`type: "module"`)
  - Updated `eslint` and resolved peer usage conflicts
  - Cleaned up linting and build warnings
- [x] **Step 4**: Component Architecture & Landing Page
  - Implemented Shadcn-style reusable components (`Button`, `Card`)
  - Configured Enterprise Design System (Slate/Gray Palette, Dotted Bg)
  - Built responsive Landing Page with Header, Hero, Features, CTA
  - Added Dark Mode support via `next-themes`

### Phase 2: Core Features
- [x] **Step 5**: Authentication Routes
  - Built `signin` and `signup` pages
  - Reused `AuthLayout` for shared UI (social buttons, logo)
  - Styled with Shadcn components (`Label`, `Input`, `Button`)
  - Enabled switching between Sign In / Sign Up states
  - [x] **Step 5.1**: Signup Integration
    - Integrated `zod` schema validation for email/password
    - Implemented `react-hook-form` for form state management
    - Connected to Backend API (`/user/signup`) with `axios`
    - Added error handling and success redirection
  - [x] **Step 5.2**: Signin Integration
    - Applied same validation & form patterns as Signup
    - Connected to Backend API (`/user/signin`)
    - Added `withCredentials: true` for secure cookie handling
    - Configured redirect to home/dashboard
  - [x] **Step 5.3**: Auth Persistence & Logout
    - Implemented `Zustand` store for client-side user state
    - Created `AuthProvider` to hydrate state from `/user/me`
    - Added `middleware.ts` for server-side route protection
    - Implemented `Header` component with conditional rendering
    - Added Logout functionality calling backend `/user/logout` endpoint
    - Removed forced authentication redirects to allow public access
- [ ] **Step 6**: Dashboard/Main App
  - Protected Routes
  - User Profile

### Phase 3: Polish & Optimization
- [ ] **Step 7**: SEO Optimization
  - Meta tags
  - Sitemap
- [ ] **Step 8**: Performance Tuning
  - Image optimization
  - Code splitting

## Current Status
- **Current Step**: Phase 1, Step 1 (Completed)
- **Next Action**: proceed to Global Styles setup or as directed by user.
