import { defineConfig } from 'vitepress'

// https://vitepress.dev/guide/i18n
//
// The site root serves English (the default locale); Simplified Chinese lives
// under `/zh/` and is reached through the language switcher.

/**
 * Tokenise for MiniSearch: Han runs become overlapping bigrams, everything
 * else stays a whole word.  Chinese has no spaces, so without the bigrams a
 * whole sentence indexes as one unmatchable token.
 *
 * A segment can mix scripts, and Han and Latin letters are both `\p{L}`, so
 * `WebDAV同步` arrives here as one segment.  Splitting it into script runs
 * first keeps `webdav` searchable; bigramming the segment as a whole would
 * shred it into `w`, `we`, `eb` and match nothing useful.
 */
function tokenize(text: string): string[] {
  const tokens: string[] = []
  for (const segment of text.split(/[^\p{L}\p{N}_]+/u)) {
    if (!segment) continue
    for (const run of segment.match(/\p{Script=Han}+|\P{Script=Han}+/gu) ?? []) {
      if (!/\p{Script=Han}/u.test(run)) {
        tokens.push(run.toLowerCase())
        continue
      }
      const chars = [...run]
      for (let i = 0; i < chars.length; i++) {
        tokens.push(chars[i]!)
        if (i + 1 < chars.length) tokens.push(chars[i]! + chars[i + 1]!)
      }
    }
  }
  return tokens
}

/**
 * Prefix-match the term being typed, and only that one.  MiniSearch defaults
 * to prefix-matching every term, which under bigram tokenisation lets the
 * trailing Han unigram of a finished query (the `步` of `同步`) match every
 * `步*` bigram in the index and drag unrelated pages up the ranking.
 */
const prefixLastTermOnly = (_term: string, index: number, terms: string[]) =>
  index === terms.length - 1

export default defineConfig({
  title: 'Moodiary',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    // Safari ignores SVG favicons; this transparent PNG is its fallback.
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-32.png', sizes: '32x32' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Moodiary' }],
    ['meta', { property: 'og:site_name', content: 'Moodiary' }],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'Open source diary app built with Flutter and Rust. Offline-first, no ads, no tracking.',
      },
    ],
    ['meta', { property: 'og:url', content: 'https://docs.moodiary.net/' }],
    [
      'script',
      {
        defer: '',
        src: 'https://stats.yooss.cn/meow.js',
        'data-website-id': '9950ba6e-c3e3-481b-b44a-12f5d91b23e8',
      },
    ],
  ],

  lastUpdated: true,

  sitemap: {
    hostname: 'https://docs.moodiary.net',
  },

  markdown: {
    image: { lazyLoading: true },
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      description:
        'Moodiary is an open source diary app built with Flutter and Rust. Offline-first, no ads, no data collection.',

      themeConfig: {
        nav: [
          { text: 'Guide', link: '/guide/', activeMatch: '/guide/' },
          { text: 'Services', link: '/services/', activeMatch: '/services/' },
          { text: 'Developers', link: '/dev/', activeMatch: '/dev/' },
          { text: 'About', link: '/about' },
        ],

        sidebar: {
          '/guide/': [
            {
              text: 'Getting Started',
              items: [
                { text: 'Welcome to Moodiary', link: '/guide/' },
                { text: 'Installation & Updates', link: '/guide/install' },
                { text: 'Quick Start', link: '/guide/quick-start' },
              ],
            },
            {
              text: 'Writing',
              items: [
                { text: 'Editing Entries', link: '/guide/writing' },
                { text: 'Organizing & Search', link: '/guide/organize' },
                { text: 'Weather, Places & Footprints', link: '/guide/weather-and-places' },
                { text: 'AI Assistant', link: '/guide/assistant' },
              ],
            },
            {
              text: 'Your Data',
              items: [
                { text: 'Export, Import & Sharing', link: '/guide/export-import' },
                { text: 'Backup & Sync', link: '/guide/sync' },
              ],
            },
            {
              text: 'Personalization',
              items: [
                { text: 'Themes & Fonts', link: '/guide/customization' },
                { text: 'Security & Privacy', link: '/guide/privacy' },
              ],
            },
          ],
          '/services/': [
            {
              text: 'Services',
              items: [
                { text: 'Overview', link: '/services/' },
                { text: 'QWeather', link: '/services/weather' },
                { text: 'Tianditu Maps', link: '/services/map' },
                { text: 'WebDAV', link: '/services/webdav' },
                { text: 'S3 / MinIO', link: '/services/s3' },
                { text: 'LAN Sync', link: '/services/lan' },
                { text: 'AI Models', link: '/services/ai' },
              ],
            },
          ],
          '/dev/': [
            {
              text: 'Contributing',
              items: [
                { text: 'Contributing', link: '/dev/' },
                { text: 'Pull Requests', link: '/dev/pull-requests' },
                { text: 'AI Policy', link: '/dev/ai-policy' },
              ],
            },
            {
              text: 'Development',
              items: [
                { text: 'Development Setup', link: '/dev/setup' },
                { text: 'Architecture', link: '/dev/architecture' },
                { text: 'Testing', link: '/dev/testing' },
              ],
            },
          ],
        },

        outline: { level: [2, 3], label: 'On this page' },

        editLink: {
          pattern:
            'https://github.com/ZhuJHua/moodiary-docs/edit/main/docs/:path',
          text: 'Edit this page on GitHub',
        },

        footer: {
          message: 'Released under the AGPL-3.0 License',
          copyright: 'Copyright © 2022-present ZhuJHua and Moodiary contributors',
        },

        lastUpdated: {
          text: 'Last updated',
          formatOptions: { dateStyle: 'medium', timeStyle: 'short' },
        },

        docFooter: { prev: 'Previous', next: 'Next' },

        notFound: {
          title: 'Page not found',
          quote: "There's nothing here. The link may be broken or the page moved.",
          linkLabel: 'Back to home',
          linkText: 'Back to home',
        },
      },
    },

    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      description:
        'Moodiary 是一款跨平台、完全开源的日记应用，基于 Flutter 与 Rust 构建，离线优先、无广告、不收集数据。',

      themeConfig: {
        nav: [
          { text: '使用指南', link: '/zh/guide/', activeMatch: '/zh/guide/' },
          { text: '服务配置', link: '/zh/services/', activeMatch: '/zh/services/' },
          { text: '开发者', link: '/zh/dev/', activeMatch: '/zh/dev/' },
          { text: '关于', link: '/zh/about' },
        ],

        sidebar: {
          '/zh/guide/': [
            {
              text: '开始',
              items: [
                { text: '认识 Moodiary', link: '/zh/guide/' },
                { text: '安装与更新', link: '/zh/guide/install' },
                { text: '快速上手', link: '/zh/guide/quick-start' },
              ],
            },
            {
              text: '记录',
              items: [
                { text: '编辑日记', link: '/zh/guide/writing' },
                { text: '分类、检索与日历', link: '/zh/guide/organize' },
                { text: '天气、地点与足迹', link: '/zh/guide/weather-and-places' },
                { text: 'AI 助手', link: '/zh/guide/assistant' },
              ],
            },
            {
              text: '数据',
              items: [
                { text: '导出、导入与分享', link: '/zh/guide/export-import' },
                { text: '备份与同步', link: '/zh/guide/sync' },
              ],
            },
            {
              text: '个性化',
              items: [
                { text: '主题与字体', link: '/zh/guide/customization' },
                { text: '安全与隐私', link: '/zh/guide/privacy' },
              ],
            },
          ],
          '/zh/services/': [
            {
              text: '服务配置',
              items: [
                { text: '总览', link: '/zh/services/' },
                { text: '和风天气', link: '/zh/services/weather' },
                { text: '天地图', link: '/zh/services/map' },
                { text: 'WebDAV', link: '/zh/services/webdav' },
                { text: 'S3 / MinIO', link: '/zh/services/s3' },
                { text: '局域网同步', link: '/zh/services/lan' },
                { text: 'AI 大模型', link: '/zh/services/ai' },
              ],
            },
          ],
          '/zh/dev/': [
            {
              text: '参与贡献',
              items: [
                { text: '参与贡献', link: '/zh/dev/' },
                { text: 'Pull Request', link: '/zh/dev/pull-requests' },
                { text: 'AI 政策', link: '/zh/dev/ai-policy' },
              ],
            },
            {
              text: '开发',
              items: [
                { text: '开发环境', link: '/zh/dev/setup' },
                { text: '架构', link: '/zh/dev/architecture' },
                { text: '测试', link: '/zh/dev/testing' },
              ],
            },
          ],
        },

        outline: { level: [2, 3], label: '本页目录' },

        editLink: {
          pattern:
            'https://github.com/ZhuJHua/moodiary-docs/edit/main/docs/:path',
          text: '在 GitHub 上编辑此页',
        },

        footer: {
          message: '基于 AGPL-3.0 许可发布',
          copyright: 'Copyright © 2022-present ZhuJHua 与 Moodiary 贡献者',
        },

        lastUpdated: {
          text: '最后更新于',
          formatOptions: { dateStyle: 'medium', timeStyle: 'short' },
        },

        docFooter: { prev: '上一篇', next: '下一篇' },

        darkModeSwitchLabel: '外观',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '返回顶部',
        skipToContentLabel: '跳转到正文',

        notFound: {
          title: '页面不存在',
          quote: '这里空空如也，也许链接已经失效了。',
          linkLabel: '返回首页',
          linkText: '返回首页',
        },
      },
    },
  },

  themeConfig: {
    // Locale-independent bits shared by every language.
    logo: { light: '/logo-light.svg', dark: '/logo-dark.svg' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/ZhuJHua/moodiary' }],
    externalLinkIcon: true,

    // Search must live here, at the site level.  The build plugin reads
    // `site.themeConfig.search.provider` to decide whether to emit an index,
    // and the client compiles the search box in behind a `__VP_LOCAL_SEARCH__`
    // define derived from the same place.  Neither looks at
    // `locales.*.themeConfig`, so a copy nested there silently disables search
    // altogether.  Per-locale strings belong in `options.locales` instead,
    // which the search components do resolve against the active locale.
    search: {
      provider: 'local',
      options: {
        // One index is built per locale, all of them with these options, so
        // the tokenizer has to handle English and Chinese at once.
        miniSearch: {
          options: { tokenize },
          searchOptions: { tokenize, prefix: prefixLastTermOnly },
        },
      },
    },
  },
})
