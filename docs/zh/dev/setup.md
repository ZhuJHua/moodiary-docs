# 开发环境

本页假定你已经能构建 Android 或 iOS 的 Flutter 应用，只说明 Moodiary 在此之上需要的东西：Rust 原生库、网页编辑器产物和 pub workspace。

## 前置工具

版本都钉在仓库里。请以钉定文件为准，不要以本页为准。

| 工具 | 钉定位置 | 说明 |
| --- | --- | --- |
| Flutter | `.fvmrc` | 使用 [FVM](https://fvm.app)。安装了 FVM 时，`tool/task.dart` 会调用 `fvm flutter`。 |
| Melos | 根 `pubspec.yaml`（`dev_dependencies`） | 全局激活同一版本。 |
| Rust | `packages/foundation/*/rust/rust-toolchain.toml` | 安装 `rustup`。首次构建时它会下载钉定的 stable 工具链和 target。不需要 nightly。 |
| cargo-about | `mobile/hook/build.dart` | 生成第三方许可页。缺少它时构建会失败，报错信息里给出安装命令。 |
| Node.js + Corepack | `packages/feature_base/moodiary_editor/editor/package.json` 的 `engines` 和 `packageManager` | 执行 `corepack enable`，Corepack 会提供钉定的 pnpm。 |
| JDK | `mobile/android/gradle/gradle-daemon-jvm.properties` | Gradle 守护进程要求这个 JDK 版本。 |
| Android SDK 与 NDK | `mobile/android/app/build.gradle.kts` 的 `compileSdk` 和 `ndkVersion` | |
| Xcode | `mobile/ios/Runner.xcodeproj` 的 `IPHONEOS_DEPLOYMENT_TARGET` | 在 Xcode 里换成你自己的签名团队。 |
| flutter_rust_bridge_codegen | `packages/foundation/fast_image/pubspec.yaml` 的 `flutter_rust_bridge` | 只有修改 `rust/src/api` 时才需要。 |

## 首次运行

```bash
fvm use
melos bootstrap
dart tool/task.dart setup
dart tool/task.dart run            # 额外的 flutter 参数放在 -- 之后，如 -- --release
```

- 所有命令都在仓库根目录通过 `dart tool/task.dart` 执行。它会为每一步选择正确的工作目录。
- `melos bootstrap` 激活 workspace 并重新生成 IDE 模块文件，不执行代码生成。
- 首次 `run` 或构建时，构建钩子会编译 Rust 库、编辑器产物和许可证清单，需要几分钟。
- 构建目标只有 Android（`build-apk`）和 iOS（`build-ios`），目前没有桌面端和 Web。

## 生成代码

生成文件会提交进仓库。修改源文件后，运行对应任务并提交产物：

| 改了什么 | 运行 |
| --- | --- |
| Freezed、json、Riverpod、injectable 或 drift 源文件 | `dart tool/task.dart build-runner` |
| 原生包的 `rust/src/api` | `dart tool/task.dart gen-rust` |
| `i18n/flutter/*.i18n.json` 或 `mui` 的文案 | `dart tool/task.dart i18n` |
| drift 的 `schemaVersion` | `dart tool/task.dart migrations` |

- `build-runner` 在整个 workspace 上运行并格式化结果。只在单个包里跑 `build_runner` 会漏掉其它包。
- `i18n/web` 会被编进编辑器产物，不需要代码生成。
- `dart tool/task.dart analyze` 会运行 `tool/check_generated.dart`。六个原生包的 `Cargo.toml` 钉定、工具链或 FRB / ffigen 版本不一致时，它会报错。

其它任务：`analyze`、`check-layers`、`test`、`test-mobile`、`deps`（输出包依赖图）、`gen`（`gen-rust` + `i18n`）和 `clean`。不带参数运行 `dart tool/task.dart` 可以看到完整列表。

## 问题排查

**Rust 的改动在应用里没有生效。** 构建钩子缓存位于 `.dart_tool/hooks_runner/`，`flutter clean` 不会清理它。运行 `dart tool/task.dart clean`，它同时会删除编辑器产物。

**构建报编辑器资源缺失。** 编辑器产物通过 Corepack 调用 pnpm 构建。确认 `corepack pnpm --version` 可以执行。

**`gen-rust` 拒绝执行。** 本机的 `flutter_rust_bridge_codegen` 与钉定版本不一致。用 `cargo install flutter_rust_bridge_codegen --version <版本> --locked` 安装钉定版本。

**Android 构建一开始就失败。** 对照 `gradle-daemon-jvm.properties` 检查 JDK 版本。Gradle 发行版从腾讯镜像下载，网络受限时可能需要配置代理。

**`check_generated` 报错。** 有一个原生包被单独升级了。把另外五个包对齐到同样的版本，或者回退它。

**analyze 提示某个 i18n 键未使用。** 把键完整写成 `l10n.xxx.yyy`。局部别名会让 analyzer 看不到这次使用。

分层检查报错见 [架构](./architecture#rules-ci-enforces)。
