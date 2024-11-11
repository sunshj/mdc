import { useAppConfig } from '#imports'

export function useMdcpConfig() {
  const { mdcp } = useAppConfig()
  const icons = new Map<string, string>(Object.entries(mdcp.codeIconMap))
  return {
    ...mdcp,
    icons
  }
}
