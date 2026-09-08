/**
 * Generate the Moodiary monochrome (grayscale) palette for VitePress.
 *
 * The palette is derived from the exact same Material Color Utilities scheme
 * the app uses for its default look — see
 * `packages/foundation/mui/lib/src/themes/color_scheme.dart`:
 *
 *   MuiAccent.neutral() -> seed = null ->
 *     SchemeMonochrome(sourceColorHct: Hct.fromInt(0xFF000000),
 *                      isDark: ..., contrastLevel: 0)
 *
 * Every value below is computed from that scheme (no hand-picked hex codes),
 * written to `docs/.vitepress/theme/generated/monochrome.css` as VitePress
 * CSS-variable overrides.
 *
 * Usage: npm run theme:gen
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  Hct,
  MaterialDynamicColors as MDC,
  SchemeMonochrome,
  hexFromArgb,
} from 'material_color_utils'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outFile = resolve(
  root,
  'docs/.vitepress/theme/generated/monochrome.css',
)

/** Source colour of the app's neutral accent: pure black. */
const SOURCE_COLOR = Hct.fromInt(0xff000000)
const CONTRAST_LEVEL = 0

const rgba = (argb, alpha) => {
  const hex = hexFromArgb(argb).slice(1)
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const buildScheme = (isDark) => {
  const scheme = new SchemeMonochrome(
    SOURCE_COLOR,
    isDark,
    CONTRAST_LEVEL,
  )
  // A monochrome scheme keeps every tonal palette at chroma 0, so its
  // primary palette *is* the neutral grayscale ramp used below.
  const ramp = scheme.primaryPalette
  const tone = (t) => hexFromArgb(ramp.tone(t))
  const role = (dynamicColor) => hexFromArgb(dynamicColor.getArgb(scheme))

  return {
    isDark,

    // Text ------------------------------------------------------------------
    // `onSurface` keeps body copy near-black; the muted levels sit on the
    // neutral ramp (matching the lightness of VitePress' own text-2/-3) so
    // the accent can stay clearly darker than them.
    text1: role(MDC.onSurface),
    text2: tone(isDark ? 65 : 45),
    text3: tone(isDark ? 48 : 62),

    // Surfaces --------------------------------------------------------------
    // VitePress semantics differ slightly from Material's, so the roles are
    // mapped onto the matching tones of the same neutral ramp.
    bg: role(MDC.surface), // tone 98 (light) / 6 (dark)
    bgAlt: isDark ? tone(4) : role(MDC.surfaceContainerLow),
    bgElv: isDark ? role(MDC.surfaceContainer) : role(MDC.surfaceContainerLowest),
    bgSoft: role(MDC.surfaceContainer),

    border: role(MDC.outlineVariant),
    divider: role(MDC.surfaceContainerHighest),
    gutter: role(MDC.surfaceContainerHighest),

    // Brand accent — three steps of the neutral ramp, ordered the way
    // VitePress expects: `-1` is the most solid (links, active nav items,
    // hero name) and `-3` the lightest.  Kept deep so the accent never
    // reads as "greyed out" next to body copy.
    // Light: 12 < 22 < 32 · Dark: 85 > 70 > 55 (mirrored, as in VitePress).
    brand1: tone(isDark ? 85 : 12),
    brand2: tone(isDark ? 70 : 22),
    brand3: tone(isDark ? 55 : 32),
    brandSoft: rgba(
      isDark ? 0xffffffff : 0xff000000,
      isDark ? 0.1 : 0.07,
    ),

    // Call-to-action buttons ------------------------------------------------
    // VitePress feeds its buttons from `--vp-c-brand-3`, i.e. the *lightest*
    // brand step — fine for a saturated hue, but a mid-grey block on a
    // black & white site.  The CTA therefore gets its own ramp: near-black
    // on light, near-white on dark, with hover/active stepping further away
    // from the surface so the interaction stays legible.
    btnBg: tone(isDark ? 90 : 6),
    btnText: tone(isDark ? 6 : 100),
    btnHoverBg: tone(isDark ? 100 : 16),
    btnActiveBg: tone(isDark ? 82 : 26),

    // `default` drives buttons/inputs and the info & note containers.
    default1: isDark ? tone(35) : tone(84),
    default2: isDark ? tone(29) : tone(89),
    default3: isDark ? tone(23) : tone(93),
    defaultSoft: rgba(ramp.tone(55), isDark ? 0.16 : 0.14),
  }
}

const render = (name, value) => `  --vp-c-${name}: ${value};`

/** Button variables live outside the `--vp-c-` namespace in VitePress. */
const buttons = (s) =>
  [
    ['--vp-button-brand-border', 'transparent'],
    ['--vp-button-brand-text', s.btnText],
    ['--vp-button-brand-bg', s.btnBg],
    ['--vp-button-brand-hover-border', 'transparent'],
    ['--vp-button-brand-hover-text', s.btnText],
    ['--vp-button-brand-hover-bg', s.btnHoverBg],
    ['--vp-button-brand-active-border', 'transparent'],
    ['--vp-button-brand-active-text', s.btnText],
    ['--vp-button-brand-active-bg', s.btnActiveBg],
  ]
    .map(([name, value]) => `  ${name}: ${value};`)
    .join('\n')

const css = (light, dark) => `/**
 * Moodiary monochrome theme — generated by \`scripts/generate-theme.mjs\`.
 *
 * Derived from \`SchemeMonochrome(Hct.fromInt(0xFF000000), contrastLevel: 0)\`,
 * the exact scheme \`mui\` uses for Moodiary's default "neutral" accent, so
 * the docs share the app's default black & white palette.
 *
 * Do not edit by hand — run \`npm run theme:gen\` instead.
 *
 * Semantic alert colours (success / warning / danger / caution) are left on
 * VitePress defaults on purpose: greying them out would hide the severity
 * signal readers rely on.
 */

:root {
${[
  render('default-1', light.default1),
  render('default-2', light.default2),
  render('default-3', light.default3),
  render('default-soft', light.defaultSoft),

  render('brand-1', light.brand1),
  render('brand-2', light.brand2),
  render('brand-3', light.brand3),
  render('brand-soft', light.brandSoft),

  render('tip-1', 'var(--vp-c-brand-1)'),
  render('tip-2', 'var(--vp-c-brand-2)'),
  render('tip-3', 'var(--vp-c-brand-3)'),
  render('tip-soft', 'var(--vp-c-brand-soft)'),

  render('note-1', 'var(--vp-c-brand-1)'),
  render('note-2', 'var(--vp-c-brand-2)'),
  render('note-3', 'var(--vp-c-brand-3)'),
  render('note-soft', 'var(--vp-c-brand-soft)'),

  render('important-1', 'var(--vp-c-brand-1)'),
  render('important-2', 'var(--vp-c-brand-2)'),
  render('important-3', 'var(--vp-c-brand-3)'),
  render('important-soft', 'var(--vp-c-brand-soft)'),

  render('bg', light.bg),
  render('bg-alt', light.bgAlt),
  render('bg-elv', light.bgElv),
  render('bg-soft', light.bgSoft),

  render('border', light.border),
  render('divider', light.divider),
  render('gutter', light.gutter),

  render('text-1', light.text1),
  render('text-2', light.text2),
  render('text-3', light.text3),
].join('\n')}

${buttons(light)}
}

.dark {
${[
  render('default-1', dark.default1),
  render('default-2', dark.default2),
  render('default-3', dark.default3),
  render('default-soft', dark.defaultSoft),

  render('brand-1', dark.brand1),
  render('brand-2', dark.brand2),
  render('brand-3', dark.brand3),
  render('brand-soft', dark.brandSoft),

  render('bg', dark.bg),
  render('bg-alt', dark.bgAlt),
  render('bg-elv', dark.bgElv),
  render('bg-soft', dark.bgSoft),

  render('border', dark.border),
  render('divider', dark.divider),
  render('gutter', dark.gutter),

  render('text-1', dark.text1),
  render('text-2', dark.text2),
  render('text-3', dark.text3),
].join('\n')}

${buttons(dark)}
}
`

const light = buildScheme(false)
const dark = buildScheme(true)

mkdirSync(dirname(outFile), { recursive: true })
writeFileSync(outFile, css(light, dark))

console.log(`✔ wrote ${outFile}`)
console.log(`  light: brand ${light.brand1}/${light.brand2}/${light.brand3} · bg ${light.bg}`)
console.log(`  dark : brand ${dark.brand1}/${dark.brand2}/${dark.brand3} · bg ${dark.bg}`)
