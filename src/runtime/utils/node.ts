// Comark renders fenced code as a `<pre><code>` subtree and passes no `code` prop, so the
// source text is recovered from the rendered children. Nuxt registers components as async
// wrappers, which prevents Comark from injecting its `__node` prop on the client.
export function vnodeText(node: unknown): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(vnodeText).join('')
  if (!node || typeof node !== 'object') return ''

  const { children } = node as { children?: unknown }
  if (children && typeof children === 'object' && 'default' in children) {
    const slot = (children as { default?: unknown }).default
    return typeof slot === 'function' ? vnodeText((slot as () => unknown)()) : ''
  }
  return vnodeText(children)
}
