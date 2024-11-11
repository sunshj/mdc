export default defineNuxtConfig({
  compatibilityDate: '2024-11-06',
  devtools: { enabled: true },
  modules: ['@sunshj/mdc', '@nuxtjs/color-mode'],
  colorMode: {
    classSuffix: ''
  },

  mdcp: {
    fileIconMap: {
      'tailwind.config.cjs': 'vscode-icons:file-type-tailwind'
    }
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
