// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Quicksand",
        },
      ],
      title: "eChat- App",
    },
  },
  devtools: { enabled: false },
  modules: ["@pinia/nuxt", "@vueuse/nuxt", "@vite-pwa/nuxt"],
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "eChat Beta",
      short_name: "eChat",
      description: "message app",
      theme_color: "#ffffff",
      icons: [
        {
          src: "icons/icon64x64.png",
          sizes: "64x64",
          type: "image/png",
        },
        {
          src: "icons/icon144x144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "icons/icon192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "icons/icon512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      screenshots: [
        {
          src: "icons/mobile-screenshot.png",
          sizes: "720x1600",
          type: "image/png",
          form_factor: "narrow",
          label: "Application",
        },
        {
          src: "icons/desktop-screenshot.png",
          sizes: "1600x900",
          type: "image/png",
          form_factor: "wide",
          label: "Application",
        },
      ],
    },
    // workbox: {
    //   navigateFallback: "/",
    // },
    workbox: {
      navigateFallback: "/",
      globDirectory: ".nuxt/dist/client",
      globPatterns: ["**/*.{js,json}", "**/node_modules/**/*"],
      globIgnores: ["**/node_modules/**/*"],
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      // enabled: true,
      type: "module",
    },
  },
});
