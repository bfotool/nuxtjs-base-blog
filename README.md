# Bfotool Blog — Nuxt 3

A professional, full-featured blog application built with **Nuxt 3**, **Vue 3**, **TypeScript**, and **Tailwind CSS**. Includes a complete fake API layer using Axios interceptors for development without a backend.

![nuxtjs-base-blog](public/images/nuxtjs-base-blog.png)

![Nuxt](https://img.shields.io/badge/Nuxt-3.15-00DC82?logo=nuxt.js)
![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?logo=tailwindcss)
![Pinia](https://img.shields.io/badge/Pinia-2.3-ffd859)

---

## Description

**Bfotool Blog** is a full-featured blog application built with **Nuxt 3**, **Vue 3**, **TypeScript**, and **Tailwind CSS**. The source code provides:

- **Complete blog frontend**: Home, post detail, categories, search, about, and contact pages with a responsive UI and dark/light theme.
- **Fake API layer**: Axios interceptors simulate a REST API (posts, categories, authors, contact) with realistic delays, pagination, filtering, and sorting — no backend required for development.
- **Nuxt 3 architecture**: Auto-imported components, composables, and stores; Pinia (toast); composables `useApi()` and `useDebounce()`; SEO with `useSeoMeta`; page transitions.
- **Easy switch to real API**: Set `NUXT_PUBLIC_USE_MOCK_API=false` and configure `NUXT_PUBLIC_API_BASE_URL`; API logic is abstracted through `useApi()`.

Suitable as a base for personal or company blogs, or as a learning template for Nuxt 3 + Vue 3 + TypeScript.

---

## Features

### Pages
- **Home** (`/`) — Featured hero post, category filters, paginated post grid
- **Blog Post** (`/blog/:slug`) — Full article with table of contents, related posts, share button
- **Category** (`/blog/category/:slug`) — Filtered posts by category
- **Search** (`/search`) — Real-time debounced search
- **About** (`/about`) — Team story and values
- **Contact** (`/contact`) — Validated contact form with toast feedback
- **Error** — Custom error page with recovery

### Core Functionality
- **Fake API Layer** — Axios interceptors simulate a REST API with realistic delays, pagination, filtering, sorting. No backend required.
- **Dark / Light Theme** — Powered by `@nuxtjs/color-mode`, system-aware with manual toggle
- **Auto-Imports** — Components, composables, stores, and utils are all auto-imported by Nuxt
- **Pinia Store** — Toast notification system managed via Pinia
- **Responsive Design** — Mobile-first, works on all screen sizes
- **Pagination** — Smart pagination with ellipsis
- **Search** — Debounced full-text search across titles, excerpts, and tags
- **Category Filtering** — Browse posts by category
- **Table of Contents** — Auto-generated from markdown headings
- **Related Posts** — Suggested articles from the same category
- **Reading Time** — Estimated per post
- **Toast Notifications** — Success/error/info/warning
- **Loading Skeletons** — Smooth loading states
- **Page Transitions** — Animated route transitions
- **SEO** — `useSeoMeta` for Open Graph and meta tags on every page
- **Icons** — 200,000+ icons via `@nuxt/icon` (Iconify)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Nuxt 3.15 |
| UI Library | Vue 3.5 (Composition API + `<script setup>`) |
| Language | TypeScript 5.7 (strict) |
| Styling | Tailwind CSS 3.4 |
| State | Pinia 2.3 |
| HTTP Client | Axios 1.7 |
| Icons | @nuxt/icon (Iconify) |
| Theme | @nuxtjs/color-mode |
| Linting | @nuxt/eslint |
| Formatting | Prettier + Tailwind plugin |

---

## Project Structure

```
├── app.vue                     # Entry point
├── error.vue                   # Error page
├── nuxt.config.ts              # Nuxt configuration
├── tailwind.config.ts          # Tailwind configuration
│
├── assets/css/main.css         # Global styles + Tailwind
│
├── layouts/
│   └── default.vue             # Default layout (header + footer + toast)
│
├── pages/
│   ├── index.vue               # Home page
│   ├── about.vue               # About page
│   ├── contact.vue             # Contact form page
│   ├── search.vue              # Search page
│   └── blog/
│       ├── [slug].vue          # Post detail page
│       └── category/
│           └── [slug].vue      # Category page
│
├── components/
│   ├── layout/                 # Header, Footer
│   ├── common/                 # Pagination, Skeleton, Toast, EmptyState
│   └── blog/                   # PostCard, FeaturedPost, CategoryFilter,
│                               # TableOfContents, MarkdownRenderer
│
├── composables/
│   ├── useApi.ts               # Typed API service layer
│   └── useDebounce.ts          # Debounce composable
│
├── plugins/
│   └── api.ts                  # Axios instance + mock setup
│
├── stores/
│   └── toast.ts                # Pinia toast store
│
├── mocks/                      # Fake API layer
│   ├── handlers.ts             # Axios interceptor handlers
│   ├── posts.ts                # 12 sample blog posts
│   ├── authors.ts              # 4 sample authors
│   └── categories.ts           # 5 categories
│
├── types/
│   └── index.ts                # Shared TypeScript interfaces
│
└── utils/
    ├── index.ts                # Helper functions
    └── constants.ts            # App-wide constants
```

---

## Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/nuxtjs-blog.git
cd nuxtjs-blog

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server (HMR) |
| `npm run build` | Build for production |
| `npm run generate` | Generate static site |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Run TypeScript type check |

---

## Fake API Layer

The project uses a custom **Axios interceptor pattern** to simulate a REST API:

### How It Works

1. **Axios instance** is created in `plugins/api.ts` and provided as `$api`
2. When `useMockApi` is `true` in runtime config, mock interceptors are installed
3. Requests are intercepted **before** hitting the network
4. Mock handlers match URL patterns and return fake data with realistic delays (200-600ms)
5. The `useApi()` composable provides a typed interface for all API calls

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/posts` | Paginated posts (`?page`, `?pageSize`, `?category`, `?tag`, `?query`, `?sortBy`, `?sortOrder`) |
| GET | `/posts/featured` | Featured posts only |
| GET | `/posts/:slug` | Single post by slug |
| GET | `/categories` | All categories |
| GET | `/authors` | All authors |
| POST | `/contact` | Submit contact form |

### Switching to a Real API

1. Set `NUXT_PUBLIC_USE_MOCK_API=false` in your `.env`
2. Set `NUXT_PUBLIC_API_BASE_URL` to your API server
3. Ensure your API returns data matching the types in `types/index.ts`

No other code changes needed — the service layer is fully abstracted through the `useApi()` composable.

---

## Key Nuxt 3 Patterns Used

### Auto-Imports
Components, composables, stores, and utility functions are all auto-imported. No manual import statements needed for `ref`, `computed`, `watch`, `useRoute`, store functions, etc.

### Composables
- `useApi()` — All API calls with full TypeScript types
- `useDebounce()` — Debounce reactive values
- Built-in: `useRoute()`, `useRuntimeConfig()`, `useSeoMeta()`, `useColorMode()`

### Pinia Stores
- `useToastStore()` — Toast notification management with auto-dismiss

### Color Mode
Dark/light theme is handled by `@nuxtjs/color-mode` with system preference detection and manual toggle.

### Page Transitions
Smooth fade + slide transitions between routes configured in `nuxt.config.ts`.

---

## Customization

### Theming
- Edit Tailwind config in `tailwind.config.ts`
- Edit global styles in `assets/css/main.css`
- Font loaded via Google Fonts in `nuxt.config.ts` (DM Sans + JetBrains Mono)

### Content
- Add/edit posts in `mocks/posts.ts`
- Add/edit categories in `mocks/categories.ts`
- Add/edit authors in `mocks/authors.ts`

### Configuration
- App name, navigation, social links in `utils/constants.ts`
- Runtime config in `nuxt.config.ts`

---

## License

MIT
