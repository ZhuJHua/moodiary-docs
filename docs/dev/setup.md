# 开发环境

Moodiary 是一个 **Flutter + Rust** 的 monorepo。这一页带你从零搭起可运行的开发环境。

## 需要安装的工具

| 工具 | 版本 | 说明 |
| --- | --- | --- |
| [FVM](https://fvm.app/) | 最新 | 管理 Flutter 版本，所有命令都经由它调用 |
| Flutter | **3.47.2**（由 `.fvmrc` 钉定） | 通过 `fvm use` 自动安装 |
| Rust | **1.95.0** stable（各包 `rust/rust-toolchain.toml` 钉定） | 需要 `rustup` |
| Node.js + corepack | `^20.19.0` 或 `>=22.12.0` | 编辑器 WebView 资源由构建钩子用 pnpm 打包 |
| JDK | **21** | Android 构建守护进程已固定到 21 |
| Android SDK | API 36，NDK 28.2.13676358 | |
| Xcode | 支持 iOS 16.4 部署目标 | 仅 iOS 开发需要 |
| [melos](https://pub.dev/packages/melos) | 8.x | workspace 协调 |
| [cargo-about](https://github.com/EmbarkStudios/cargo-about) | 0.9.2 | 构建时生成第三方许可证清单 |

::: warning Rust 不需要 nightly
工具链版本为 **stable 1.95.0**，由每个原生包的 `rust-toolchain.toml` 自动选定，`rustup` 会在首次构建时自动安装对应 target。
:::

## 初始化

```bash
git clone https://github.com/ZhuJHua/moodiary.git
cd moodiary

fvm use                    # 安装并选中 Flutter 3.47.2
dart pub global run melos bootstrap   # 或全局安装 melos 后: melos bootstrap
dart tool/task.dart setup  # flutter pub get
```

说明：

- `melos bootstrap` 会激活 pub workspace 并重新生成 IDE 模块文件，它**不执行代码生成**；
- 编辑器（`moodiary_editor`）的 WebView 资源由构建钩子在首次 run/build 时生成，需要 `corepack` 可用。

## 验证环境

```bash
dart tool/task.dart analyze   # 生成物一致性 + 分层检查 + flutter analyze
dart tool/task.dart test      # 跑受影响的包
```

## 运行

```bash
dart tool/task.dart run               # flutter run，自动选择设备
dart tool/task.dart run -- --release  # 额外的 flutter 参数放在 -- 之后
```

目前支持的构建目标只有 **Android**（`build-apk`）与 **iOS**（`build-ios`）。

## 下一步

- [仓库结构与分层](/dev/architecture)：理解代码怎么组织；
- [常用命令](/dev/workflow)：日常开发用到的所有命令；
- [常见问题](/dev/faq)：构建失败时先看这里。
