import { addComponentsDir, createResolver, defineNuxtModule, installModule } from '@nuxt/kit'
import { defu } from 'defu'
import { name, version } from '../package.json'
import { defaultMdcpConfig, internalUsedIcons, type MdcpConfig } from './runtime/config'

export type ModuleOptions = MdcpConfig

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    configKey: 'mdcp',
    version
  },
  defaults: defaultMdcpConfig,
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = resolve('./runtime')

    // add to appConfig
    nuxt.options.appConfig.mdcp = defu(nuxt.options.appConfig.mdcp || {}, options)

    // default @nuxtjs/mdc config
    nuxt.options.mdc = defu(nuxt.options.mdc, {
      highlight: {
        theme: {
          default: 'light-plus',
          dark: 'dark-plus'
        }
      },
      keepComments: true
    })

    // default @nuxt/icon config
    nuxt.options.icon = defu(nuxt.options.icon, {
      clientBundle: {
        scan: {
          globInclude: ['**/*.{vue,jsx,tsx,md,mdc,mdx}', '**/app.config.ts']
        },
        icons: internalUsedIcons
      }
    })

    // css
    nuxt.options.css.unshift(resolve(runtimeDir, 'theme.css'))

    // components
    addComponentsDir({
      path: resolve(runtimeDir, 'components'),
      global: true,
      pathPrefix: false
    })

    // install modules
    await installModule('@vueuse/nuxt')
    await installModule('@nuxtjs/mdc')
    await installModule('@nuxt/image')
    await installModule('@nuxt/icon')
  }
})
