import { addComponentsDir, createResolver, defineNuxtModule, installModule } from '@nuxt/kit'
import { defu } from 'defu'
import { name, version } from '../package.json'

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

    // default mdc config
    nuxt.options.mdc = defu(nuxt.options.mdc, {
      highlight: {
        theme: {
          default: 'github-light-default',
          dark: 'github-dark-default'
        }
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
