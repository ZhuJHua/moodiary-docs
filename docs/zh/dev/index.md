# 参与贡献

Moodiary 是一个基于 Flutter + Rust 的开源日记应用，采用 [AGPL-3.0](https://github.com/ZhuJHua/moodiary/blob/develop/LICENSE) 协议。问题反馈、功能建议、翻译、文档和代码都欢迎。提交 PR 即表示你同意以 AGPL-3.0 授权你的贡献。

## 参与方式

- **反馈问题或提建议**：使用 [Issue 模板](https://github.com/ZhuJHua/moodiary/issues/new/choose)。先搜一下，给已有 issue 点 👍 比重复提交更有用。
- **翻译**：App 文案在 `i18n/flutter`，编辑器文案在 `i18n/web`，都是 `zh` 和 `en` 的 JSON 文件。
- **改进本站文档**：文档位于 [moodiary-docs](https://github.com/ZhuJHua/moodiary-docs)。每页都有「在 GitHub 上编辑此页」入口。
- **写代码**：先读下面的流程，再看 [开发环境](./setup)。

## 在哪里提问

提问请到 [论坛](https://answer.moodiary.net)、Telegram 群 [openmoodiary](https://t.me/openmoodiary) 或 QQ 群 760014526。Issue 只用于 Bug 和功能建议。

## PR 流程

1. **先讨论。** 小修复可以直接提 PR。新功能或大重构请先开 issue，方向达成一致再写代码。
2. **从 `develop` 拉分支**，在你的 fork 上开发，PR 提到 `develop`。
3. **一个 PR 只做一件事。**
4. **遵循 [PR 规范](./pull-requests)。** 标题是约定式提交，标题和描述都用英文。
5. **CI 必须全绿。** 先在本地跑一遍[检查](./testing#running-the-same-checks-locally)。
6. 使用 AI 工具前，**阅读 [AI 政策](./ai-policy)**。

发版由维护者负责。

## 开发者指南

| 页面 | 内容 |
| --- | --- |
| [开发环境](./setup) | Flutter 之外的工具链、首次运行、生成代码、问题排查 |
| [架构](./architecture) | 分层、CI 检查的规则、原生代码、约定 |
| [测试](./testing) | CI 任务、本地检查、编写测试 |
| [Pull Request](./pull-requests) | 标题格式、footer、CHANGELOG |
| [AI 政策](./ai-policy) | 使用 AI 辅助贡献的规则 |

::: tip 行为准则
请保持友善与尊重。骚扰内容会被移除，屡犯者将被限制参与。
:::
