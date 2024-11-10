import {
  addComponentsDir,
  addImports,
  createResolver,
  defineNuxtModule,
  installModule
} from '@nuxt/kit'
import { defu } from 'defu'
import { name, version } from '../package.json'
import { defaultFileIconMap } from './runtime/config'

export interface ModuleOptions {
  fileIconMap?: Record<string, string>
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    configKey: 'mdcp',
    version
  },
  defaults: {
    fileIconMap: defaultFileIconMap
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = resolve('./runtime')

    // default mdc config
    nuxt.options.mdc = defu(nuxt.options.mdc, {
      highlight: {
        theme: {
          default: 'light-plus',
          dark: 'dark-plus'
        }
      },
      keepComments: true
    })

    // add to runtime config
    nuxt.options.runtimeConfig.public.mdcp = defu(nuxt.options.runtimeConfig.public.mdcp!, options)

    // css
    nuxt.options.css.unshift(resolve(runtimeDir, 'theme.css'))

    // composables
    addImports([
      {
        name: 'useFileIcons',
        from: resolve(runtimeDir, 'composables', 'file-icons')
      }
    ])

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
