// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  devServer: {
    port: Number(process.env.PORT) || 3000,
  },

  // ── Modules ──────────────────────────────────────
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "@nuxt/icon",
    "@nuxt/eslint",
  ],

  // ── Runtime Config ───────────────────────────────
  runtimeConfig: {
    public: {
      appName: "Bfotool Blog",
      appUrl: "http://localhost:3000",
      useMockApi: true,
      apiBaseUrl: "https://api.example.com",
    },
  },

  // ── App Meta ─────────────────────────────────────
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Bfotool Blog",
      meta: [
        {
          name: "description",
          content:
            "Insights, tutorials, and stories for modern developers. Explore the latest in web development, design, and technology.",
        },
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&family=JetBrains+Mono:wght@400;500&display=swap",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },

  // ── Color Mode ───────────────────────────────────
  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
    storageKey: "nuxt-color-mode",
  },

  // ── Tailwind ─────────────────────────────────────
  tailwindcss: {
    cssPath: "~/assets/css/main.css",
    configPath: "tailwind.config.ts",
  },

  // ── TypeScript ───────────────────────────────────
  typescript: {
    strict: true,
    typeCheck: false,
  },

  // ── Auto Import ──────────────────────────────────
  imports: {
    dirs: ["stores", "types", "mocks", "utils"],
  },

  // ── Components ───────────────────────────────────
  components: [
    { path: "~/components/common", prefix: "" },
    { path: "~/components/layout", prefix: "Layout" },
    { path: "~/components/blog", prefix: "Blog" },
  ],

  compatibilityDate: "2026-01-01",
});
