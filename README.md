<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: MDC Prose Components
- Package name: @sunshj/mdc
- Description: Prose components for Nuxt MDC.
-->

# MDC Prose Components

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Prose components for Nuxt MDC.

- [✨ Release Notes](/CHANGELOG.md)
- [🏀 Online playground](https://stackblitz.com/~/github.com/sunshj/mdc?file=playground/app.vue)
- [🌈 Preview](https://sunshj.top/articles/mdc-support)

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add @sunshj/mdc
```

That's it! You can now use `MDC Prose Components` in your Nuxt app ✨

## Styles

Headings and paragraphs follow a compact type scale inspired by [Tailwind Typography](https://github.com/tailwindlabs/tailwindcss-typography), driven by CSS variables so a theme can retune it without touching component styles:

| Variable                    | Default   | Description                      |
| --------------------------- | --------- | -------------------------------- |
| `--mdc-prose-line-height`   | `1.75`    | Paragraph line height            |
| `--mdc-prose-spacing`       | `1.25em`  | Paragraph vertical rhythm        |
| `--mdc-heading-spacing`     | `1`       | Multiplier for heading margins   |
| `--mdc-heading-weight`      | `600`     | Weight for `h3`–`h6`             |
| `--mdc-h1-size`             | `2.25em`  | `h1` font size                   |
| `--mdc-h1-weight`           | `800`     | `h1` font weight                 |
| `--mdc-h2-size`             | `1.5em`   | `h2` font size                   |
| `--mdc-h2-weight`           | `700`     | `h2` font weight                 |
| `--mdc-h3-size`             | `1.25em`  | `h3` font size                   |
| `--mdc-h4-size`             | `1.125em` | `h4` font size                   |
| `--mdc-h5-size`             | `1em`     | `h5` font size                   |
| `--mdc-h6-size`             | `0.875em` | `h6` font size                   |

The bundled `theme.css` only declares the variables the components consume and is mounted by default. Disable it to provide your own stylesheet:

```ts
export default defineNuxtConfig({
  mdcp: {
    css: false
  }
})
```

Every `var()` keeps the default as a fallback, so components stay readable without the stylesheet.

## Comark

The components also render under [Comark](https://comark.dev), including its streaming mode. Comark resolves `Prose*` components by name, so no component mapping is needed.

Disable the bundled `@nuxtjs/mdc` module when the app renders with Comark, otherwise both modules register the same prose components:

```ts
export default defineNuxtConfig({
  modules: ['@sunshj/mdc'],
  mdcp: {
    mdc: false
  }
})
```

```vue
<template>
  <Suspense>
    <Markdown :value="content" streaming caret />
  </Suspense>
</template>

<script setup lang="ts">
import { Markdown } from '@comark/vue'
</script>
```

Syntax highlighting comes from Comark's `shiki()` plugin. Copy buttons, code folding and code group tabs follow the streamed content.

## Contribution

<details>
  <summary>Local development</summary>

```bash
  # Install dependencies
  npm install

  # Generate type stubs
  npm run dev:prepare

  # Develop with the playground
  npm run dev

  # Develop the Comark demo (shiki 4, no MDC)
  npm run dev:comark

  # Build the playground
  npm run dev:build

  # Run ESLint
  npm run lint

  # Run Vitest
  npm run test
  npm run test:watch

  # Release new version
  npm run release
```

</details>

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@sunshj/mdc/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/@sunshj/mdc
[npm-downloads-src]: https://img.shields.io/npm/dm/@sunshj/mdc.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/@sunshj/mdc
[license-src]: https://img.shields.io/npm/l/@sunshj/mdc.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/@sunshj/mdc
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
