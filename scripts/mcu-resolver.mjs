/**
 * Node ESM resolution hook.
 *
 * `material_color_utils` (npm alias of @material/material-color-utilities) is
 * compiled from TypeScript with `type: "module"` but its emitted relative
 * imports are extensionless (`./scheme/scheme_content`). That is valid for
 * bundlers (Vite/Rolldown resolve it fine) but not for Node's strict ESM
 * resolver. This hook appends `.js` to failing relative specifiers so the
 * package can be used directly from a plain `node` script.
 *
 * Usage: node --import ./scripts/mcu-resolver.mjs scripts/generate-theme.mjs
 */
import { registerHooks } from 'node:module'

registerHooks({
  resolve(specifier, context, nextResolve) {
    try {
      return nextResolve(specifier, context)
    } catch (error) {
      const isRelative = specifier.startsWith('./') || specifier.startsWith('../')
      if (error?.code === 'ERR_MODULE_NOT_FOUND' && isRelative) {
        return nextResolve(`${specifier}.js`, context)
      }
      throw error
    }
  },
})
