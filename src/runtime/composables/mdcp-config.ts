import { useAppConfig } from '#imports'

export function useMdcpConfig() {
  const { codeIconMap } = useAppConfig().mdcp
  const icons = new Map<string, string>(Object.entries(codeIconMap))
  return {
    icons
  }
}
