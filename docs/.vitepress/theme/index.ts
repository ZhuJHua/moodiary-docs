// https://vitepress.dev/guide/custom-theme
//
// The default theme, re-skinned with Moodiary's monochrome palette.
// `generated/monochrome.css` overrides the default theme CSS variables and is
// regenerated from Material Color Utilities by `npm run theme:gen`.
import type { Theme } from 'vitepress'
import { inBrowser, useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h, watchEffect } from 'vue'
import './generated/monochrome.css'
import './style.css'

export default {
  extends: DefaultTheme,
  // Remember the locale being read for this tab only, so a reload keeps a
  // manual switch while new tabs start from the browser languages again.
  // Same pattern as https://vitepress.dev/guide/i18n, with sessionStorage in
  // place of a cookie.  The inline script in config.mts reads it back.
  Layout: {
    setup() {
      const { lang } = useData()
      watchEffect(() => {
        if (!inBrowser) return
        try {
          sessionStorage.setItem('moodiary-locale', lang.value.startsWith('zh') ? 'zh' : 'en')
        } catch {}
      })
      return () => h(DefaultTheme.Layout)
    },
  },
} satisfies Theme
