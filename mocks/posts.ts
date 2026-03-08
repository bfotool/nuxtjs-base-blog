import type { Post } from "~/types";
import { mockAuthors } from "./authors";
import { mockCategories } from "./categories";

export const mockPosts: Post[] = [
  {
    id: "post-1",
    slug: "building-scalable-vue-apps-2026",
    title: "Building Scalable Vue Applications in 2026",
    excerpt:
      "A comprehensive guide to structuring large-scale Vue projects with modern tools, patterns, and best practices that stand the test of time.",
    content: `## Introduction

Building a Vue application is easy. Building one that scales to hundreds of components, dozens of developers, and millions of users — that's the real challenge.

In this guide, we'll walk through the architecture decisions, tooling choices, and coding patterns that separate hobby projects from production-grade applications.

## Project Structure

The key to a scalable project is a clear, predictable folder structure. We recommend the **feature-based** approach:

\`\`\`
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── composables/
│   │   ├── stores/
│   │   └── index.ts
│   ├── dashboard/
│   └── settings/
├── shared/
│   ├── components/
│   ├── composables/
│   └── utils/
└── app/
\`\`\`

Each feature is self-contained with its own components, composables, and stores. This makes it easy to onboard new developers and reason about the codebase.

## State Management with Pinia

Pinia is the official state management solution for Vue 3. It's type-safe, supports devtools, and has a simple API:

\`\`\`typescript
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubled = computed(() => count.value * 2)
  function increment() { count.value++ }
  return { count, doubled, increment }
})
\`\`\`

## Composables for Reusable Logic

Composables are the Vue equivalent of React hooks. They let you extract and reuse stateful logic across components without mixins.

## Performance Optimization

Vue 3 is fast out of the box, but there are patterns to follow for large apps. Use lazy loading for routes. Leverage Suspense for async components. Use shallowRef for large objects that don't need deep reactivity. Profile with Vue DevTools.

## Conclusion

Scalability is not about choosing the right framework — it's about making consistent, thoughtful decisions at every level of your application.`,
    coverImage: "https://picsum.photos/seed/vue-scale/1200/630",
    category: mockCategories[0],
    tags: ["Vue", "Architecture", "TypeScript", "Performance"],
    author: mockAuthors[0],
    publishedAt: "2026-01-15T09:00:00Z",
    readingTime: 8,
    featured: true,
  },
  {
    id: "post-2",
    slug: "mastering-css-grid-layouts",
    title: "Mastering CSS Grid: From Basics to Advanced Layouts",
    excerpt:
      "Stop fighting CSS. Learn how CSS Grid can transform your layout workflow with practical examples and real-world patterns.",
    content: `## Why CSS Grid?

Flexbox is great for one-dimensional layouts. But when you need to control both rows and columns simultaneously, CSS Grid is the answer.

## The Fundamentals

Every grid starts with a container:

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 1.5rem;
}
\`\`\`

The \`fr\` unit is the magic of CSS Grid — it represents a fraction of the available space.

## Named Grid Areas

One of the most powerful features of CSS Grid is named template areas:

\`\`\`css
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 250px 1fr 200px;
  min-height: 100vh;
}
\`\`\`

## Responsive Without Media Queries

CSS Grid can create responsive layouts without a single media query:

\`\`\`css
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
\`\`\`

## Conclusion

CSS Grid isn't just another layout tool — it's a paradigm shift in how we think about web layouts. Master it, and you'll wonder how you ever lived without it.`,
    coverImage: "https://picsum.photos/seed/css-grid/1200/630",
    category: mockCategories[0],
    tags: ["CSS", "Grid", "Layout", "Frontend"],
    author: mockAuthors[2],
    publishedAt: "2026-01-10T14:30:00Z",
    readingTime: 6,
    featured: false,
  },
  {
    id: "post-3",
    slug: "design-systems-from-scratch",
    title: "Building a Design System from Scratch: A Practical Guide",
    excerpt:
      "Design systems are more than component libraries. Learn how to build one that actually gets adopted by your team.",
    content: `## What Is a Design System?

A design system is a collection of reusable components, guided by clear standards, that can be assembled to build any number of applications.

## Start with Tokens

Design tokens are the atomic building blocks. They capture design decisions as data — colors, spacing, typography, shadows.

\`\`\`json
{
  "color": {
    "primary": { "50": "#eff6ff", "500": "#3b82f6", "900": "#1e3a5f" },
    "neutral": { "50": "#fafafa", "500": "#737373", "900": "#171717" }
  },
  "spacing": {
    "xs": "0.25rem",
    "sm": "0.5rem",
    "md": "1rem",
    "lg": "1.5rem"
  }
}
\`\`\`

## Component API Design

The most important aspect of a component library is its API. A good API is consistent, composable, accessible, and fully typed.

## Documentation Is Not Optional

The best design system in the world is worthless if nobody knows how to use it. Invest in interactive documentation with live examples and clear guidelines.

## Measuring Adoption

Track adoption metrics: component usage across projects, design token coverage, and the number of one-off styles. A design system succeeds when it becomes the path of least resistance.

## Conclusion

Building a design system is a marathon, not a sprint. Start small, iterate based on feedback, and remember: the goal is not perfection, but consistency.`,
    coverImage: "https://picsum.photos/seed/design-sys/1200/630",
    category: mockCategories[1],
    tags: ["Design Systems", "UI", "Components", "Tokens"],
    author: mockAuthors[2],
    publishedAt: "2026-01-05T11:00:00Z",
    readingTime: 7,
    featured: true,
  },
  {
    id: "post-4",
    slug: "docker-kubernetes-production",
    title: "Docker to Kubernetes: A Production-Ready Journey",
    excerpt:
      "Take your containerized application from a single Docker container to a fully orchestrated Kubernetes deployment.",
    content: `## The Container Revolution

Containers changed how we ship software. But running a single container on your laptop is very different from running hundreds in production.

## Docker Basics Revisited

A well-crafted Dockerfile is the foundation:

\`\`\`dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.output ./
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
\`\`\`

## Why Kubernetes?

When you have multiple services, you need orchestration. Kubernetes provides service discovery, load balancing, automated rollouts and rollbacks, self-healing, and horizontal scaling.

## Monitoring and Observability

In production, you need the three pillars: Metrics with Prometheus and Grafana. Logs with the ELK stack or Loki. Traces with Jaeger or Tempo.

## Conclusion

The journey from Docker to Kubernetes is not trivial, but it's well worth it. Start with a solid Docker foundation, learn Kubernetes incrementally, and always prioritize observability.`,
    coverImage: "https://picsum.photos/seed/docker-k8s/1200/630",
    category: mockCategories[2],
    tags: ["Docker", "Kubernetes", "DevOps", "Cloud"],
    author: mockAuthors[1],
    publishedAt: "2024-12-28T08:00:00Z",
    readingTime: 10,
    featured: false,
  },
  {
    id: "post-5",
    slug: "typescript-advanced-patterns",
    title: "Advanced TypeScript Patterns Every Developer Should Know",
    excerpt:
      "Go beyond basic types. Learn discriminated unions, template literals, conditional types, and patterns that make your code bulletproof.",
    content: `## Beyond Basic Types

TypeScript is much more than adding \`: string\` to your variables. The type system is Turing-complete, and mastering it eliminates entire categories of bugs.

## Discriminated Unions

The most useful pattern for modeling domain logic:

\`\`\`typescript
type ApiState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };
\`\`\`

## Template Literal Types

Create precise string types:

\`\`\`typescript
type EventName = \\\`on\\\${Capitalize<"click" | "hover" | "focus">}\\\`;
// "onClick" | "onHover" | "onFocus"
\`\`\`

## The satisfies Operator

Validate that a value conforms to a type without widening:

\`\`\`typescript
const config = {
  port: 3000,
  host: "localhost",
} satisfies Record<string, string | number>;
\`\`\`

## Conclusion

Advanced TypeScript patterns aren't about showing off — they're about encoding your domain knowledge into the type system. When the compiler understands your business logic, bugs have nowhere to hide.`,
    coverImage: "https://picsum.photos/seed/typescript/1200/630",
    category: mockCategories[0],
    tags: ["TypeScript", "Patterns", "Advanced", "Types"],
    author: mockAuthors[0],
    publishedAt: "2024-12-20T10:00:00Z",
    readingTime: 9,
    featured: false,
  },
  {
    id: "post-6",
    slug: "ai-powered-web-apps",
    title: "Integrating AI Into Your Web Applications",
    excerpt:
      "From chatbots to intelligent search, learn practical ways to add AI capabilities to your web projects without a PhD.",
    content: `## AI Is Not Just for Data Scientists

The barrier to entry for using AI in web applications has never been lower. With APIs from OpenAI, Anthropic, and open-source models, any developer can add intelligent features.

## Practical AI Features

Here are features you can add today:

**Intelligent Search**: Use embeddings to understand intent and return semantically relevant results.

**Content Generation**: Auto-generate meta descriptions, summarize articles, or create personalized drafts.

**Smart Forms**: Auto-complete fields, suggest corrections, and validate data using NLU.

**Chatbots**: Build conversational interfaces for support and guidance.

## Architecture Patterns

Keep AI calls server-side to protect API keys. Implement streaming for long-running generations. Cache aggressively. Always have fallback behavior.

## Cost Management

AI API calls can get expensive. Cache common queries, use smaller models for simple tasks, implement rate limiting, and batch requests.

## Conclusion

AI is a tool, not a magic wand. The best AI-powered features solve real user problems and degrade gracefully.`,
    coverImage: "https://picsum.photos/seed/ai-web/1200/630",
    category: mockCategories[3],
    tags: ["AI", "Web Development", "APIs", "Machine Learning"],
    author: mockAuthors[3],
    publishedAt: "2024-12-15T16:00:00Z",
    readingTime: 7,
    featured: true,
  },
  {
    id: "post-7",
    slug: "remote-work-developer-guide",
    title: "The Developer's Guide to Thriving in Remote Work",
    excerpt:
      "Remote work is here to stay. Learn the habits, tools, and mindset shifts that separate productive remote developers from struggling ones.",
    content: `## The New Normal

Remote work went from a perk to the default. But working from home effectively requires a different set of skills.

## Setting Up Your Environment

Invest in a good chair and desk. Get a quality microphone for calls. Use a second monitor. Have clear boundaries between work and living space.

## Communication Is Everything

Over-communicate asynchronously. Write things down. Use threaded conversations. Record meetings. Default to written updates over synchronous standups.

## Deep Work Blocks

Block 2-3 hours of uninterrupted time daily. Turn off notifications. Use Pomodoro technique. Communicate your focus schedule.

## Avoiding Burnout

Set hard start and stop times. Take real breaks. Exercise regularly. Have hobbies unrelated to tech.

## Conclusion

Remote work is a skill, not a setting. Master it, and you'll have more freedom, focus, and flexibility than any office could provide.`,
    coverImage: "https://picsum.photos/seed/remote-work/1200/630",
    category: mockCategories[4],
    tags: ["Remote Work", "Productivity", "Career", "Wellbeing"],
    author: mockAuthors[1],
    publishedAt: "2024-12-10T12:00:00Z",
    readingTime: 6,
    featured: false,
  },
  {
    id: "post-8",
    slug: "accessibility-web-guide",
    title: "Web Accessibility: Building for Everyone",
    excerpt:
      "Accessibility isn't a feature — it's a fundamental requirement. Learn how to build inclusive web experiences from day one.",
    content: `## Why Accessibility Matters

Over 1 billion people worldwide have some form of disability. When we build inaccessible websites, we exclude a significant portion of users.

## The POUR Principles

WCAG is built on four principles: Perceivable, Operable, Understandable, and Robust.

## Quick Wins

Use semantic HTML. Add alt text to images. Ensure sufficient color contrast (4.5:1). Make interactive elements keyboard-accessible. Use proper heading hierarchy.

## ARIA: Use Sparingly

First rule of ARIA: don't use ARIA if you can use native HTML instead. When you do need ARIA, use established patterns and test with screen readers.

## Testing

Use axe DevTools for scanning. Do keyboard-only testing. Test with screen readers. Conduct user testing with people who have disabilities.

## Conclusion

Accessibility is not a checkbox — it's a mindset. Build with it from the start, and the result is better for everyone.`,
    coverImage: "https://picsum.photos/seed/a11y/1200/630",
    category: mockCategories[1],
    tags: ["Accessibility", "WCAG", "Inclusive Design", "HTML"],
    author: mockAuthors[2],
    publishedAt: "2024-12-05T09:30:00Z",
    readingTime: 8,
    featured: false,
  },
  {
    id: "post-9",
    slug: "nuxt3-deep-dive",
    title: "Nuxt 3 Deep Dive: Server Components, Auto-Imports & Nitro",
    excerpt:
      "Nuxt 3 is a complete rewrite. Understand auto-imports, the Nitro server engine, and the new mental model for building Vue applications.",
    content: `## A New Foundation

Nuxt 3 is built on Vue 3, Vite, and Nitro — a complete rewrite that brings massive improvements in performance, developer experience, and flexibility.

## Auto-Imports

Nuxt 3 automatically imports components, composables, and utilities. No more import statements for refs, computed, or store functions.

## File-Based Routing

The pages directory defines your routes. Dynamic routes use bracket syntax. Nested routes use folder structure. Middleware runs before navigation.

## Nitro Server Engine

Nitro is the server engine powering Nuxt 3. It supports multiple deployment targets — Node.js, serverless, edge workers, and static. Server routes in the server/api directory give you a built-in API layer.

## Composables

Custom composables in the composables directory are auto-imported. They're the primary way to share stateful logic across components.

## Conclusion

Nuxt 3 is the most productive Vue framework available. Embrace auto-imports, leverage Nitro, and build faster than ever.`,
    coverImage: "https://picsum.photos/seed/nuxt3/1200/630",
    category: mockCategories[0],
    tags: ["Nuxt", "Vue", "Nitro", "Server Components"],
    author: mockAuthors[0],
    publishedAt: "2024-11-28T15:00:00Z",
    readingTime: 9,
    featured: false,
  },
  {
    id: "post-10",
    slug: "cicd-pipelines-best-practices",
    title: "CI/CD Pipelines: Best Practices for Modern Teams",
    excerpt:
      "Automate your way to confident deployments. Learn how to build CI/CD pipelines that catch bugs early and ship code reliably.",
    content: `## The Goal: Confidence

The purpose of CI/CD is simple — give your team confidence that every change is safe to deploy.

## Continuous Integration

A solid CI pipeline includes linting, type checking, unit and integration tests, build verification, and security scanning.

## Continuous Deployment

Automate everything. Use blue-green or canary deployments. Implement feature flags. Have automated rollback mechanisms.

## Pipeline Design

Structure your pipeline in stages: Validation (fast checks under 2 minutes), Build (2-5 minutes), Testing (5-15 minutes), and Deployment (2-10 minutes).

## Conclusion

A great CI/CD pipeline is invisible when things go well and invaluable when things go wrong. Invest the time to build it right.`,
    coverImage: "https://picsum.photos/seed/cicd/1200/630",
    category: mockCategories[2],
    tags: ["CI/CD", "DevOps", "Automation", "Testing"],
    author: mockAuthors[1],
    publishedAt: "2024-11-20T08:00:00Z",
    readingTime: 7,
    featured: false,
  },
  {
    id: "post-11",
    slug: "landing-your-first-tech-job",
    title: "Landing Your First Tech Job: An Honest Guide",
    excerpt:
      "No fluff, no false promises. Here's what actually works when breaking into the tech industry as a junior developer.",
    content: `## The Uncomfortable Truth

Breaking into tech is hard. Not impossible — but harder than the bootcamp ads suggest.

## Build Real Projects

Tutorials don't count as portfolio pieces. Build something that solves a real problem. A finished to-do app with auth, error handling, and tests is more impressive than an incomplete social media clone.

## Open Source Contributions

Contributing to open source is one of the best ways to stand out. Start with documentation fixes and small bug fixes.

## The Resume That Gets Interviews

Keep it to one page. Lead with projects, not education. Include live demos and GitHub links. Quantify your impact.

## Technical Interviews

Practice DSA but don't obsess. Focus on clean code, communicating your thinking, asking clarifying questions, and handling edge cases.

## Conclusion

There's no shortcut, but there is a path. Build, contribute, network, and apply consistently.`,
    coverImage: "https://picsum.photos/seed/first-job/1200/630",
    category: mockCategories[4],
    tags: ["Career", "Junior Developer", "Job Search", "Portfolio"],
    author: mockAuthors[3],
    publishedAt: "2024-11-15T10:00:00Z",
    readingTime: 6,
    featured: false,
  },
  {
    id: "post-12",
    slug: "prompt-engineering-developers",
    title: "Prompt Engineering for Developers: Beyond the Basics",
    excerpt:
      "LLMs are powerful tools, but only if you know how to talk to them. Learn advanced prompting techniques for development tasks.",
    content: `## The Developer's Secret Weapon

Your ability to communicate with LLMs can multiply your productivity. But most developers leave performance on the table with poorly structured prompts.

## Structured Prompting

Start with context. Specify the output format. Provide examples. Set constraints and boundaries.

## Chain of Thought

For complex tasks, ask the model to think step by step. This dramatically improves accuracy for debugging, architecture decisions, and code review.

## Few-Shot Patterns

Show the model exactly what you want by providing examples. This works well for code generation, data transformation, and format conversion.

## System Prompts for Development

Craft system prompts for common tasks: code review that enforces your style guide, documentation matching your conventions, test generation following your patterns.

## Conclusion

Prompt engineering is a skill that compounds. Invest time in learning it — the ROI is enormous.`,
    coverImage: "https://picsum.photos/seed/prompt-eng/1200/630",
    category: mockCategories[3],
    tags: ["AI", "Prompt Engineering", "Productivity", "LLMs"],
    author: mockAuthors[3],
    publishedAt: "2024-11-10T14:00:00Z",
    readingTime: 7,
    featured: false,
  },
];
