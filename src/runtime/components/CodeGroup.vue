<script lang="ts">
import { objectEntries } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { cloneVNode, defineComponent, h, ref, resolveComponent, type VNode } from 'vue'
import { vnodeText } from '../utils/node'
import CodeCopy from './CodeCopy.vue'

type SlotVNodeProps = {
  code?: string
  filename?: string
  language?: string
  icon?: string
  label?: string
} & Record<string, any>

// Hand-written render function: no block tree is built, so updates fall back to a full
// keyed diff. Panels are vnodes owned by the markdown renderer and are reused between
// renders, which the block optimizer cannot patch safely.
export default defineComponent({
  name: 'CodeGroup',
  setup(_, { slots }) {
    const activeTabIndex = ref(0)

    const { mdcp } = useAppConfig()
    const icons = new Map<string, string>(objectEntries(mdcp.codeIconMap))

    // Slots are re-read on every render: streamed chunks replace the children in place.
    function tabs() {
      return slots.default?.() ?? []
    }

    function propsOf(tab?: VNode) {
      return (tab?.props ?? {}) as SlotVNodeProps
    }

    function label(props: SlotVNodeProps) {
      return props.label || props.filename || ''
    }

    function icon(props: SlotVNodeProps) {
      return (
        props.icon ||
        icons.get(props.filename?.toLowerCase() ?? '') ||
        icons.get(props.language ?? '')
      )
    }

    function slotCode(tab?: VNode) {
      return propsOf(tab).code ?? vnodeText(tab)
    }

    function onTabClick(evt: MouseEvent, index: number) {
      activeTabIndex.value = index
      const el = evt.target as HTMLDivElement
      el?.scrollIntoView?.({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }

    return () => {
      const items = tabs()
      if (!items.length) return null

      const active = activeTabIndex.value
      const activeCode = slotCode(items[active])
      const Icon = resolveComponent('Icon')

      return h('div', { class: 'code-group-card' }, [
        h('div', { class: 'code-group' }, [
          h('div', { class: 'code-group-tabs' }, [
            h(
              'div',
              { name: 'files' },
              items.map((tab, i) => {
                const props = propsOf(tab)
                const tabIcon = icon(props)
                return h(
                  'div',
                  {
                    key: `${i}-${label(props)}`,
                    value: label(props),
                    class: { 'code-group-tab': true, active: active === i },
                    onClick: (evt: MouseEvent) => onTabClick(evt, i)
                  },
                  [tabIcon ? h(Icon, { name: tabIcon }) : null, label(props)]
                )
              })
            ),
            activeCode ? h(CodeCopy, { code: activeCode, name: 'copy-btn' }) : null
          ])
        ]),
        ...items.map((tab, i) =>
          h(
            'div',
            {
              key: `${i}${label(propsOf(tab))}`,
              value: label(propsOf(tab)),
              class: 'code-group-panel',
              style: { display: active === i ? null : 'none' }
            },
            [cloneVNode(tab, { 'show-header': false })]
          )
        )
      ])
    }
  }
})
</script>

<style scoped>
.code-group-card {
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
  border: 1px solid var(--mdc-border);
  background-color: var(--mdc-background);
  margin: 1em 0;
  font-size: 14px;
}

.code-group {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.code-group-tabs {
  display: flex;
  flex-direction: row;
  gap: 4px;
  background-color: var(--mdc-background);
  border-bottom: 1px solid var(--mdc-border);
  padding: 5px;
  position: relative;
}

.code-group-tabs [name='files'] {
  display: flex;
  flex: 1;
  overflow-x: auto;
}

.code-group-tab {
  padding: 5px 10px;
  cursor: pointer;
  min-width: fit-content;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: background-color 0.2s ease-in-out;
}

.code-group-tab.active {
  background-color: var(--mdc-secondary);
  border-radius: 6px;
}
</style>
