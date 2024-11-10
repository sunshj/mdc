import { defu } from 'defu'
import { useRuntimeConfig } from '#imports'
import { defaultFileIconMap } from '../config'

export function useFileIcons() {
  const { mdcp } = useRuntimeConfig().public

  return new Map<string, string>(Object.entries(defu({}, defaultFileIconMap, mdcp.fileIconMap)))
}
