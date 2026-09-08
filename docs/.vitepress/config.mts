import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config

/** 中文分词：CJK 按二元组切分，其余按词切分，让本地搜索能命中中文。 */
function tokenize(text: string): string[] {
  const tokens: string[] = []
  for (const segment of text.split(/[^\p{L}\p{N}_]+/u)) {
    if (!segment) continue
    if (/[\u3400-\u9fff]/.test(segment)) {
      const chars = [...segment]
      for (let i = 0; i < chars.length; i++) {
        tokens.push(chars[i]!)
        if (i + 1 < chars.length) tokens.push(chars[i]! + chars[i + 1]!)
      }
    } else {
      tokens.push(segment.toLowerCase())
    }
  }
  return tokens
}

export default defineConfig({
  lang: 'zh-CN',
  title: 'Moodiary',
  description:
    'Moodiary 是一款跨平台、完全开源的日记应用，基于 Flutter 与 Rust 构建，离线优先、无广告、不收集数据。',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'icon', href: '/favicon.ico', sizes: 'any' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Moodiary' }],
    [
      'meta',
      {
        property: 'og:description',
        content: '跨平台、完全开源的日记应用，基于 Flutter 与 Rust 构建。',
      },
    ],
    ['meta', { property: 'og:url', content: 'https://docs.moodiary.net/' }],
    ['meta', { property: 'og:site_name', content: 'Moodiary' }],
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

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: { light: '/logo-light.svg', dark: '/logo-dark.svg' },

    nav: [
      { text: '使用指南', link: '/guide/', activeMatch: '/guide/' },
      { text: '服务配置', link: '/services/', activeMatch: '/services/' },
      { text: '开发者', link: '/dev/', activeMatch: '/dev/' },
      { text: '关于', link: '/about' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '开始',
          items: [
            { text: '认识 Moodiary', link: '/guide/' },
            { text: '安装与更新', link: '/guide/install' },
            { text: '快速上手', link: '/guide/quick-start' },
          ],
        },
        {
          text: '记录',
          items: [
            { text: '编辑日记', link: '/guide/writing' },
            { text: '分类、检索与日历', link: '/guide/organize' },
            { text: '天气、地点与足迹', link: '/guide/weather-and-places' },
            { text: 'AI 助手', link: '/guide/assistant' },
          ],
        },
        {
          text: '数据',
          items: [
            { text: '导出、导入与分享', link: '/guide/export-import' },
            { text: '备份与同步', link: '/guide/sync' },
          ],
        },
        {
          text: '个性化',
          items: [
            { text: '主题与字体', link: '/guide/customization' },
            { text: '安全与隐私', link: '/guide/privacy' },
          ],
        },
      ],
      '/services/': [
        {
          text: '服务配置',
          items: [
            { text: '总览', link: '/services/' },
            { text: '和风天气', link: '/services/weather' },
            { text: '天地图', link: '/services/map' },
            { text: 'WebDAV', link: '/services/webdav' },
            { text: 'S3 / MinIO', link: '/services/s3' },
            { text: '局域网同步', link: '/services/lan' },
            { text: 'AI 大模型', link: '/services/ai' },
          ],
        },
      ],
      '/dev/': [
        {
          text: '入门',
          items: [
            { text: '参与贡献', link: '/dev/' },
            { text: '开发环境', link: '/dev/setup' },
          ],
        },
        {
          text: '理解代码',
          items: [
            { text: '仓库结构与分层', link: '/dev/architecture' },
            { text: '编码约定', link: '/dev/conventions' },
          ],
        },
        {
          text: '日常开发',
          items: [
            { text: '常用命令', link: '/dev/workflow' },
            { text: '代码生成', link: '/dev/codegen' },
            { text: '测试', link: '/dev/testing' },
          ],
        },
        {
          text: '发布',
          items: [
            { text: '发布流程', link: '/dev/release' },
            { text: '常见问题', link: '/dev/faq' },
          ],
        },
      ],
    },

    outline: { level: [2, 3], label: '本页目录' },

    search: {
      provider: 'local',
      options: {
        miniSearch: {
          options: { tokenize },
          searchOptions: { tokenize },
        },
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: {
            displayDetails: '显示详细列表',
            resetButtonTitle: '清空关键词',
            backButtonTitle: '返回',
            noResultsText: '没有找到相关结果',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              navigateUpKeyAriaLabel: '上一个',
              navigateDownKeyAriaLabel: '下一个',
              closeText: '关闭',
            },
          },
        },
      },
    },

    editLink: {
      pattern:
        'https://github.com/ZhuJHua/moodiary-docs/edit/master/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/ZhuJHua/moodiary' }],

    externalLinkIcon: true,

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
})
