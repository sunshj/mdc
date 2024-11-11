export default defineNuxtConfig({
  compatibilityDate: '2024-11-06',
  devtools: { enabled: true },
  modules: ['@sunshj/mdc', '@nuxtjs/color-mode'],
  colorMode: {
    classSuffix: ''
  },

  mdcp: {
    fileIconMap: {
      '.prettierrc': 'vscode-icons:file-type-light-prettier',
      '.prettierignore': 'vscode-icons:file-type-light-prettier'
    }
  },

  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  }
})
