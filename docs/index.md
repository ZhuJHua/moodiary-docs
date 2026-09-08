---
layout: home

hero:
  name: 'Moodiary'
  text: 'Open source diary app'
  tagline: Built with Flutter and Rust. Offline-first, no ads, no tracking.
  image:
    light: /logo-light.svg
    dark: /logo-dark.svg
    alt: Moodiary
  actions:
    - theme: brand
      text: Get Started
      link: /guide/quick-start
    - theme: alt
      text: Install Moodiary
      link: /guide/install
    - theme: alt
      text: Contribute
      link: /dev/

features:
  - title: Offline-first
    details: Every entry lives in a local SQLite database. Moodiary works in full without a network connection — no ads, and nothing is collected about you.
  - title: Rich text
    details: The TipTap-based editor mixes text with images, audio and video, and Markdown is always at hand when you prefer plain syntax.
  - title: Search and categories
    details: Full-text search on SQLite FTS5 returns results in milliseconds, categories keep everything tidy, and an optional local semantic search finds that one entry even when you only remember the vibe.
  - title: Backup and sync
    details: Sync through WebDAV, S3 / MinIO or direct LAN connections. With end-to-end encryption, even your cloud provider can't read what you wrote.
  - title: Themes and fonts
    details: Ships with a default monochrome palette, plus dynamic color that follows your system, custom accent colors, and custom fonts — variable fonts included.
  - title: Assistant
    details: Connect any OpenAI- or Anthropic-compatible provider — or run local models fully offline — for chat, diary tools and mood suggestions.
---
