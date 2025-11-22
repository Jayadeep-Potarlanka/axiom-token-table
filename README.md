# Axiom Trade Pulse – Token Discovery Table

A pixel-focused replica of Axiom Trade’s Pulse token discovery table, built with Next.js 14 App Router, TypeScript, Tailwind CSS, Redux Toolkit, React Query, and Radix/shadcn-style components.

[Live URL](https://axiom-token-table.onrender.com)

## Features

- Token discovery table with three categories: **New Pairs**, **Final Stretch**, **Migrated**
- Sortable columns (price, volume 24h, market cap, liquidity, holders, created time)
- Interaction variety:
  - Row hover states and clickable token names
  - Tooltip for quick hints
  - Popover for lightweight token details
  - Modal dialog for full token details
- Real-time price updates via WebSocket-style mock with smooth color transitions on change
- Loading and error states:
  - Skeleton + shimmer loading
  - Progressive row rendering
  - Error fallback with retry
- Responsive layout down to 320 px width


## Tech Stack

- **Framework:** Next.js 14 (App Router) with TypeScript (strict)
- **Styling:** Tailwind CSS
- **State management:** Redux Toolkit + React Redux
- **Data fetching & caching:** @tanstack/react-query
- **UI primitives:** Radix UI / shadcn-style headless components (dialog, popover, tooltip)
- **Animations:** Framer Motion + Tailwind transitions


## Architecture

The project follows an atomic, reusable component structure:

- `src/app`
  - `layout.tsx` – global shell (theme, fonts, providers)
  - `page.tsx` – main Pulse table page, wiring Redux + React Query + WebSocket mock
  - `StoreProvider.tsx` – Redux store provider for the App Router
- `src/components/atoms`
  - `Button.tsx`, `Badge.tsx`, `Skeleton.tsx`
- `src/components/molecules`
  - `PriceCell.tsx`, `SortableHeader.tsx`, `TokenPopover.tsx`
- `src/components/organisms`
  - `TokenTable.tsx`, `TokenDetailsDialog.tsx`
- `src/components/ui`
  - `dialog.tsx`, `popover.tsx`, `tooltip.tsx` (Radix/shadcn-style wrappers)
- `src/hooks`
  - `useTokensQuery.ts` – React Query hook with mock token data
  - `useWebSocket.ts` – WebSocket-style live updates
  - `useSortableTable.ts` – generic sortable-table logic
- `src/lib`
  - `formatters.ts` – number/date formatting helpers
  - `mockData.ts` – token mock data generator
  - `utils.ts` – `cn` and shared utilities
- `src/store`
  - `store.ts` – Redux store
  - `slices/tokenSlice.ts` – token-related state
  - `slices/uiSlice.ts` – UI state (filters, modal, etc.)
  - `api/tokenApi.ts` – token API abstraction
  - `hooks.ts` – typed Redux hooks
- `src/types`
  - `token.ts` – `Token` and `TokenCategory` types

## Getting Started (Local)

### Prerequisites

- Node.js 18+
- npm (or pnpm / yarn / bun)

### Install & run

```
git clone https://github.com/Jayadeep-Potarlanka/axiom-token-table.git
cd axiom-token-table

npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

### Type checking & linting

```
npm run type-check
npm run lint
```


## Deployments

### Render

This project is deployed on Render:

- **Live URL:** https://axiom-token-table.onrender.com

Render build configuration:

- Build command: `npm install && npm run build`
- Start command: `npm run start`
- Environment: Node, Free instance

(You can also deploy to Vercel or other platforms using the same scripts.)


## Notes

- The current implementation uses mock data and a WebSocket-style mock for real-time updates.  
- The architecture and components are designed to be reusable across a larger application (e.g., sharing table components, hooks, and formatting utilities).

