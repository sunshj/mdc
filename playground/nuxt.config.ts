export default defineNuxtConfig({
  compatibilityDate: '2024-11-06',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4
  },
  modules: ['@sunshj/mdc', '@nuxtjs/color-mode'],
  colorMode: {
    classSuffix: ''
  },

  icon: {
    clientBundle: {
      scan: true
    }
  },

  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  }
})
