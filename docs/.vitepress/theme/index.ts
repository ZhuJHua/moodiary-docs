// https://vitepress.dev/guide/custom-theme
//
// The default theme, re-skinned with Moodiary's monochrome palette.
// `generated/monochrome.css` overrides the default theme CSS variables and is
// regenerated from Material Color Utilities by `npm run theme:gen`.
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './generated/monochrome.css'
import './style.css'

/**
 * Remember manual locale switches.
 *
 * The inline script in config.mts only redirects *first-time* visitors (while
 * `vitepress-locale-preferred` is unset).  VitePress' built-in locale
 * switcher is plain links, so we watch every click and persist the visitor's
 * choice whenever they navigate across a locale boundary — otherwise the
 * auto-detect would drag them back to their system language.
 */
function watchLocaleSwitches() {
  document.addEventListener(
    'click',
    (event) => {
      const anchor = (event.target as Element | null)?.closest?.('a')
      const href = anchor?.getAttribute('href')
      if (!href) return
      try {
        const url = new URL(href, location.origin)
        const toZh = url.pathname === '/zh' || url.pathname.startsWith('/zh/')
        const fromZh =
          location.pathname === '/zh' || location.pathname.startsWith('/zh/')
        if (toZh !== fromZh) {
          localStorage.setItem('vitepress-locale-preferred', toZh ? 'zh' : 'en')
        }
      } catch {
        // Ignore malformed URLs.
      }
    },
    true,
  )
}

export default {
  extends: DefaultTheme,
  enhanceApp() {
    if (typeof window !== 'undefined') watchLocaleSwitches()
  },
} satisfies Theme
