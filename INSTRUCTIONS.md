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
- [x] **Step 6**: Dashboard/Main App
  - [x] **Sidebar**: Created responsive sidebar with mobile support using `Sheet`.
  - [x] **Dashboard Layout**: Implemented `(app)` route group with dedicated layout.
  - [x] **Dashboard Page**: Created premium dashboard view with financial stats.
  - [x] **Profile Page**: Created user settings page with profile inputs.
- [x] **Step 6.1**: Add Expense Feature
  - Created `Dialog` UI component.
  - Implemented `AddExpenseDialog` with Zod validation.
  - Connected to `POST /user/add-expense` endpoint.
 - [x] **Step 6.2**: Expense Management (Fetch & Delete)
  - Integrated `GET /user/my-expenses` to display real data.
  - Added delete functionality with `DELETE /user/delete-expense/:id` and confirmation.
  - Refactored API logic to `src/lib/api/expenses.ts` for cleaner architecture.
  - Implemented automatic data refresh after add/delete actions.

- [x] **Step 6.3**: Premium Dashboard Layout & Design Update
  - Replaced legacy sidebar with a clean, universal Top Navigation (`AppHeader`).
  - Redesigned the Dashboard (`page.tsx`) to match a high-fidelity, clean minimal UI.
  - [x] Integrate Premium Top Navigation System.
- [x] Create Advanced Dashboard with High-Fidelity dummy data for empty states.
- [x] Create Floating Action Buttons for quick interactions.
- [x] **New:** Built the "Set Budget / Top Up" tracking dialog adjacent to Add Expense.

### Step 6.4: Settings & Investments Pages
  - Built a 2-column layout for the settings page mimicking premium platform architecture.
  - Added specialized sidebar navigation components with active indicators.
  - Implemented segmented UI Cards (Profile, Subscription, Preferences) with detailed layouts.

### Step 6.5: Premium Upgrades
  - [x] Integrate Premium membership fetching `/premium/memberships` into `PremiumFeatureDialog`.
  - [x] Configure detailed feature comparison matrices inside the modal natively handling async data.
  - [x] Trigger `/premium/verify-order` upon plan selection, updating UX with loading states and comprehensive success/error logging.
  - [x] Integrate **Razorpay Payment Gateway** logic. Hit backend `/premium/verify-order` returning `razorpay_order_data`. Webhook signature verification established at `/premium/webhook`.

### Step 6.6: Analytics Enhancements
  - [x] Integrate **Top Spenders Leaderboard** in `/analytics`, showcasing rank, mock user data, amount, and an isolated rank for the current authenticated user at the bottom.

### Step 6.7: Premium Membership Page
  - [x] Moved `PremiumFeatureDialog` logic to a dedicated page `/premium-membership`.
  - [x] Replaced dialog with a full-page design using simple DOM elements (`div`), preserving high-fidelity aesthetic quality.
  - [x] Updated App Header to link to the new route `/premium-membership` instead of triggering a modal.

### Step 6.8: Global User State & Identity Management
  - [x] Overhauled `user-store.ts` using Zustand to capture extended user models alongside a full nested `membership` state representation.
  - [x] Created `UserDataFetcher` pure component injected at `(app)/layout.tsx` specifically responsible for hydrating identity state without polluting component markup.
  - [x] App header dropdown created using custom robust Ref-handling tying seamlessly into native Logout hooks and dynamic profile avatars.
  - [x] Connected `/settings` inputs directly to the verified Zustand context to replace mocked John Doe variables.

### Phase 3: Polish & Optimization
- [ ] **Step 7**: SEO Optimization
  - Meta tags
  - Sitemap
- [ ] **Step 8**: Performance Tuning
  - Image optimization
  - Code splitting

## Current Status
- **Current Step**: Phase 2, Step 6.3 (Completed)
- **Next Action**: Proceed to further polishing or backend refinement.
