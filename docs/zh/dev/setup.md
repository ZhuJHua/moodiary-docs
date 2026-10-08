# 开发环境

Moodiary 是一个 **Flutter + Rust** 的 monorepo。工具版本和初始化命令见 [CONTRIBUTING.zh.md 的开发环境一节](https://github.com/ZhuJHua/moodiary/blob/develop/CONTRIBUTING.zh.md#开发环境)。本页只补充贡献指南没有写到的说明。

## 工具链说明

- **Rust 不需要 nightly。** 每个原生包的 `rust/rust-toolchain.toml` 钉定 stable **1.95.0**。`rustup` 会在首次构建时安装该工具链和对应的 target。
- **Android** 除了贡献指南里列出的 JDK 和 NDK，还需要 API 36 的 SDK。
- 目前支持的构建目标只有 **Android**（`build-apk`）与 **iOS**（`build-ios`）。

## 首次运行说明

- `melos bootstrap` 会激活 pub workspace 并重新生成 IDE 模块文件。它**不执行代码生成**。
- 编辑器（`moodiary_editor`）的 WebView 资源和原生库由构建钩子在首次 run/build 时生成。编辑器的构建需要 `corepack` 可用。所以第一次运行会比较慢。

## 下一步

- [仓库结构与分层](./architecture)：理解代码怎么组织。
- [常用命令](./workflow)：`task.dart` 的命令，以及测试如何挑选要跑的包。
- [常见问题](./faq)：构建失败时先看这里。
