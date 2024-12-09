import { addComponentsDir, createResolver, defineNuxtModule, installModule } from '@nuxt/kit'
import { defu } from 'defu'
import { name, version } from '../package.json'
import { defaultMdcpConfig, getClientBundleIcons } from './runtime/config'

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    configKey: 'mdcp',
    version
  },
  defaults: {},
  async setup(_, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = resolve('./runtime')

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

    // add to app config
    nuxt.options.appConfig.mdcp = defu(defaultMdcpConfig, nuxt.options.appConfig.mdcp || {})

    // default @nuxt/icon config
    // @ts-ignore
    nuxt.options.icon = defu(nuxt.options.icon, {
      clientBundle: {
        scan: true,
        icons: getClientBundleIcons(nuxt.options.appConfig.mdcp.codeIconMap)
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

    // modules
    await installModule('@nuxtjs/mdc')
    await installModule('@nuxt/image')
    await installModule('@nuxt/icon')
  }
})
