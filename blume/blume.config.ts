import { defineConfig } from "blume";
import { z } from "zod";

export default defineConfig({
  title: "dsk8.dev",
  description: "Software engineer building focused tools.",
  logo: {
    text: "dsk8.dev",
    href: "/",
  },
  content: {
    root: "content",
  },
  frontmatter: {
    extend: {
      featured: z.boolean().optional(),
      order: z.number().int().optional(),
      status: z.string().optional(),
      role: z.string().optional(),
      github: z.string().url().optional(),
      demo: z.string().url().optional(),
      stack: z.array(z.string()).optional(),
    },
  },
  theme: {
    accent: "oklch(56% 0.17 35)",
    background: {
      light: "oklch(97.5% 0.012 75)",
      dark: "oklch(16% 0.012 45)",
    },
    radius: "sm",
    mode: "light",
    fonts: {
      display: "space-grotesk",
      body: "inter",
      mono: "jetbrains-mono",
    },
  },
  deployment: {
    output: "static",
    site: "https://daisuke8000.github.io",
  },
  seo: {
    og: { enabled: true },
    sitemap: true,
    robots: true,
    structuredData: true,
  },
});
