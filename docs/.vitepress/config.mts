import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Moodiary",
    description: "Cross-platform open source diary application",
    lastUpdated: true,
    head: [
        [
            'script',
            {
                defer: '',
                src: 'https://stats.yooss.cn/meow.js',
                'data-website-id': 'ddf830ec-6cc7-47f8-94aa-97c4406f8459'
            }
        ],
        ['link', {rel: 'icon', href: '/favicon.ico'}]
    ],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: '首页', link: '/'},
        ],
        logo: {light: '/light_logo.svg', dark: '/dark_logo.svg'},
        editLink: {
            pattern: 'https://github.com/ZhuJHua/moodiary-docs/edit/master/docs/:path',
            text: '在 GitHub 上编辑此页',
        },
        docFooter: {
            prev: '上一篇',
            next: '下一篇'
        },

        darkModeSwitchLabel: '外观',
        outlineTitle: "目录",
        returnToTopLabel: '返回顶部',

        sidebarMenuLabel: '菜单',

        sidebar: [
            {
                text: '简介',
                items: [
                    {text: 'Moodiary', link: '/intro/moodiary'},
                    {text: '快速开始', link: '/intro/quick-start'},
                ]
            },
            {
                text: '第三方 API 配置',
                items: [
                    {text: '天气 API 配置', link: '/api/weather'},
                    {text: '地图 API 配置', link: '/api/map'},
                    {text: 'WebDav 配置', link: '/api/sync'},
                    {text: 'AI 大模型配置', link: '/api/ai'},
                    
                ]
            },
            {
                text: '手动编译',
                items: [
                    {text: '准备运行环境', link: '/compile/prepare'},
                    {text: '开始编译', link: '/compile/start'},
                    {text: '常见问题', link: '/compile/faq'},
                ]
            }
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/ZhuJHua/moodiary'}
        ],
        search: {
            provider: 'local',
        }
    }
})
