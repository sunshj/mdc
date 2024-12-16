export default defineNuxtConfig({
  compatibilityDate: '2024-11-06',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4
  },
  modules: [
    '@nuxt/image',
    '@nuxt/icon',
    '../src/module',
    '@nuxtjs/mdc',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode'
  ],
  colorMode: {
    classSuffix: ''
  },

  vite: {
    optimizeDeps: {
      include: ['extend', 'debug']
    }
  },

  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  }
})
