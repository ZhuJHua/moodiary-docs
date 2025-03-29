import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Moodiary",
    description: "Cross-platform open source diary application",
    lastUpdated: true,
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
                text: 'API配置',
                items: [
                    {text: '天气API配置', link: '/USEAPI/weather_API.md'},
                    {text: 'AI大模型配置', link: '/USEAPI/AI_API.md'},
                    {text: '地图API配置', link: '/USEAPI/map_api.md'},
                    {text: 'WebDav配置', link: '/USEAPI/sync_API.md'},
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
