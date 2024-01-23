import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "PWADisplay",
        short_name: "PWADisplay",
        start_url: ".",
        display: "fullscreen",
        orientation: "landscape",
        background_color: "#000000",
        theme_color: "#000000",
        description:
          "PWA application for locally viewing video feeds from connected capture cards or cameras.",
        lang: "en",
        icons: [
          {
            src: "favicon_maskable.svg",
            sizes: "any",
            purpose: "maskable",
          },
          {
            src: "favicon.svg",
            sizes: "any",
          },
          {
            src: "favicon.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  base: "/pwadisplay/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ["**/*.png", "**/*.svg"],
})
