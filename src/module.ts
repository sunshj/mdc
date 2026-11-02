import { addComponentsDir, createResolver, defineNuxtModule, installModule } from '@nuxt/kit'
import { defu } from 'defu'
import { name, version } from '../package.json'
import { defaultMdcpConfig, internalUsedIcons, type MdcpConfig } from './runtime/config'

export type ModuleOptions = MdcpConfig & {
  /**
   * @default true
   */
  mdc?: boolean
  /**
   * @default true
   */
  css?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    configKey: 'mdcp',
    version
  },
  defaults: { ...defaultMdcpConfig, mdc: true, css: true },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = resolve('./runtime')
    const { mdc = true, css = true, ...config } = options

    // add to appConfig
    nuxt.options.appConfig.mdcp = defu(nuxt.options.appConfig.mdcp || {}, config)

    if (mdc) {
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
    }

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
    if (css) {
      nuxt.options.css.unshift(resolve(runtimeDir, 'theme.css'))
    }

    // components
    addComponentsDir({
      path: resolve(runtimeDir, 'components'),
      global: true,
      pathPrefix: false
    })

    // install modules
    await installModule('@vueuse/nuxt')
    if (mdc) await installModule('@nuxtjs/mdc')
    await installModule('@nuxt/image')
    await installModule('@nuxt/icon')
  }
})
