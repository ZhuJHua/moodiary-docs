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
        ]
    ],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
//         nav: [
//             {text: 'Home', link: '/'},
//             {text: 'Examples', link: '/markdown-examples'}
//         ],
        // logo: {light: '/light_logo.svg', dark: '/dark_logo.svg'},

        sidebar: [
            {
                text: '简介',
                items: [
                    {text: '什么是 Moodiary', link: '/intro/moodiary'},
                    {text: '快速开始', link: '/intro/quick-start'},
                    {text: 'Flutter', link: '/intro/flutter'},
                    {text: 'Material Design', link: '/intro/design'},
                ]
            },
            {
                text: '功能指南',
                items: [
                    {text: '撰写日记', link: '/guide/write'},
                    {text: '跨设备同步', link: '/guide/sync'},
                    {text: '数据备份', link: '/guide/backup'},
                    {text: '个性化', link: '/guide/customize'},
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
