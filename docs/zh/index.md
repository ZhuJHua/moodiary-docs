---
layout: home

hero:
  name: 'Moodiary'
  text: '跨平台开源日记应用'
  tagline: 基于 Flutter 与 Rust 构建，离线优先、无广告、不收集数据。在这里，只有你和你的日记。
  image:
    light: /logo-light.svg
    dark: /logo-dark.svg
    alt: Moodiary
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/guide/quick-start
    - theme: alt
      text: 安装 Moodiary
      link: /zh/guide/install
    - theme: alt
      text: 参与贡献
      link: /zh/dev/

features:
  - title: 离线优先
    details: 所有日记保存在本地 SQLite 数据库中，不联网也能完整使用，没有广告，也不收集任何数据。
  - title: 富文本编辑
    details: 基于 TipTap 的编辑器支持图文混排，可插入图片、音频与视频，也能用 Markdown 顺手书写。
  - title: 全文与语义检索
    details: 基于 SQLite FTS5 的全文检索毫秒级返回，还可选配本地语义搜索，凭模糊印象也能找回那篇日记。
  - title: 多种同步方式
    details: 支持 WebDAV、S3 / MinIO 与局域网直连同步，端到端加密后云端也看不到你的内容。
  - title: 主题与字体
    details: 默认黑白灰度配色，支持跟随系统动态取色、自定义强调色，以及导入包括可变字体在内的自定义字体。
  - title: AI 助手
    details: 接入任意 OpenAI 或 Anthropic 兼容服务，也可以完全离线运行本地模型，让它帮忙整理心情、检索日记。
---
