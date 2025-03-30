# 编译前准备

Moodiary 使用到的技术栈包括 Flutter、Rust。以下是来自官方的配置教程，关于开发环境的搭建，本文档不再赘述。

- [Flutter](https://docs.flutter.dev/get-started/install) 官方配置指南
- [Rust](https://www.rust-lang.org/learn/get-started) 官方配置指南

## 环境要求

- Flutter (版本 >= **3.29.0**，可以使用 FVM 管理 Flutter 版本)
- Rust Toolchain（**Nightly**）
- Clang/LLVM
- 兼容的 IDE（如 Android Studio、Visual Studio Code）

## 检查环境配置

### Flutter

在终端中运行以下命令，检查 Flutter 环境是否配置正确：

```bash
flutter doctor -v
```

如果输出类似：

```bash
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel stable, 3.29.2, on macOS 15.4 24E247 darwin-arm64, locale zh-Hans-CN)
[✓] Android toolchain - develop for Android devices (Android SDK version 36.0.0)
[✓] Xcode - develop for iOS and macOS (Xcode 16.2)
[✓] Chrome - develop for the web
[✓] Android Studio (version 2024.3)
[✓] IntelliJ IDEA Ultimate Edition (version 2024.3.5)
[✓] VS Code (version 1.98.2)
[✓] Connected device (4 available)
[✓] Network resources

• No issues found!
```

说明 Flutter
环境配置正确，如果其中有错误，请根据提示进行修复。需要注意的是，并不是所有的提示都需要修复，重点关注以下几个方面即可：

- Flutter
- Android toolchain
- Xcode（只有 MacOS 才有）

### Rust

在终端中运行以下命令，检查 Rust 环境是否配置正确：

```bash
rustup show
```

查看 `active toolchain` 中的版本号开头是否为 `nightly`，如果不是，请使用下面的命令切换到 Nightly 版本：

```bash
rustup default nightly
```

之后再次运行 `rustup show` 命令，确认版本已经切换成功。
