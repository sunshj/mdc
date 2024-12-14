export default defineNuxtConfig({
  compatibilityDate: '2024-11-06',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4
  },
  modules: [
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@sunshj/mdc',
    '@nuxtjs/mdc',
    '@nuxt/image',
    '@nuxt/icon'
  ],
  colorMode: {
    classSuffix: ''
  },

  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  }
})
