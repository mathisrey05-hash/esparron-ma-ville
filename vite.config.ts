// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// Never set ssr.external or resolve.external: the Worker has no runtime module resolution, so
// the build fails. Never add compression (compressPublicAssets, vite-plugin-compression):
// hosting already compresses at the edge.
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// `npm run build:apache` sets STATIC_EXPORT=1: every page is rendered to its own index.html
// so a plain Apache server can serve the site without Node.js.
const staticExport = process.env.STATIC_EXPORT === "1";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(staticExport
      ? {
          prerender: { enabled: true, crawlLinks: true, failOnError: true },
          pages: [{ path: "/404", prerender: { enabled: true, outputPath: "/404.html" } }],
        }
      : {}),
  },
  vite: {
    // Pre-bundle UI deps at startup so the dev server never re-optimizes mid-session
    // (a late re-optimization mixes React copies and crashes with "resolveDispatcher() is null").
    optimizeDeps: {
      include: [
        "@radix-ui/react-dialog",
        "@radix-ui/react-dropdown-menu",
        "@radix-ui/react-label",
        "@radix-ui/react-slot",
        "class-variance-authority",
        "clsx",
        "lucide-react",
        "sonner",
        "tailwind-merge",
        "zod",
      ],
    },
  },
});
