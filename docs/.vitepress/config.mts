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
                text: 'API 配置',
                items: [
                    {text: '天气 API 配置', link: '/api/weather'},
                    {text: 'AI 大模型配置', link: '/api/ai'},
                    {text: '地图 API 配置', link: '/api/map'},
                    {text: 'WebDav 配置', link: '/api/sync'},
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
