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
 * Remember explicit locale switches.
 *
 * The inline script in config.mts detects the browser language on every hard
 * page load but stores nothing — so auto-detection can never trap visitors in
 * the wrong locale.  VitePress' built-in locale switcher is plain links, so we
 * watch every click and persist the visitor's choice whenever they
 * deliberately navigate across a locale boundary; from then on their explicit
 * choice (`vitepress-locale-choice`) wins over detection.
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
          localStorage.setItem('vitepress-locale-choice', toZh ? 'zh' : 'en')
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
