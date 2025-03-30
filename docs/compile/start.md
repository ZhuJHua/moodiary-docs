---
name: Robot Editor
avatar: <any image file>
gravatar: gravatarid
twitter: '@twitter'
---

# 开始编译

相信你已经安装好了 Flutter 和 Dart 环境，并且配置好了 Android Studio 或 Visual Studio Code 等 IDE。

现在我们来看看如何编译和运行 Moodiary 项目。

## 克隆 GitHub 仓库

首先，你需要从 GitHub 上克隆 Moodiary 的源代码。打开终端，运行以下命令：

```bash
git clone https://github.com/ZhuJHua/moodiary.git
```

或者使用 SSH：

```bash
git clone git@github.com:ZhuJHua/moodiary.git
```

然后进入项目目录：

```bash
cd moodiary
```

## 项目目录结构解析

```
moodiary             
├── lib  
│   ├── api          # API 接口  
│   ├── common       # 普通变量  
│   ├── components   # 组件  
│   ├── config       # 配置文件  
│   ├── gen          # 代码生成  
│   ├── l10n         # 国际化  
│   ├── merge        # 合并  
│   ├── pages        # 页面  
│   ├── presentation # 持久化  
│   ├── router       # 路由  
│   ├── services     # 服务  
│   └── utils        # 工具类  
├── rust             # Rust 代码
└── test             # 测试代码

```

### 详细说明

- **lib**：Flutter 代码目录，包含了所有的 Dart 代码
- **rust**：Rust 代码目录，包含了所有的 Rust 代码
- **test**：测试代码目录，包含了所有的测试代码
- **pubspec.yaml**：Flutter 项目的配置文件，包含了项目的依赖、版本等信息

## 设备准备

### Android 真机

1. 进到 设置 > 关于手机，连续点击 版本号 直到出现 “你已成为开发者”。然后在 开发者选项 里打开 USB 调试
2. 用 USB 数据线把设备连到电脑，并在手机上点击 “允许 USB 调试”，当然你也可以选择无线调试
3. 在终端中运行 `flutter devices`，检查设备是否显示在列表中

### Android 模拟器

1. 在 Android Studio 中打开 AVD 管理器，创建一个新的虚拟设备，选择合适的配置
2. 启动虚拟设备，确保它能够正常运行
3. 在终端中运行 `flutter devices`，检查虚拟设备是否显示在列表中

### iOS 真机

iOS 调试相比 Android 要麻烦一些，主要是因为苹果的生态系统比较封闭。以下是一些步骤：

#### 启用开发者模式

对于 iOS 16 以上的设备：设置>隐私与安全>开发者模式

## 调试项目（Debug）

在 Debug 模式下，依赖于 Dart 的 JIT 能力，可以使用 Flutter 的热重载功能，快速查看代码修改的效果，但是需要注意的是，Debug
模式下的性能远低于 Release
模式，只适合开发和调试使用。

### 拉取依赖

在终端中运行以下命令，拉取项目依赖：

```bash
flutter pub get
```

### 运行项目

在终端中运行以下命令，运行项目：

```bash
flutter run
```

## 编译项目（Release）

在 Release 模式下，Dart 会进行 AOT 编译，生成原生代码，性能更高，但是编译时间较长，同时需要注意的是，Release 模式需要配置签名文件。

### 配置签名文件

#### Android

在 `android/app/build.gradle` 文件中，找到以下代码：

```groovy
android {
    ...
    signingConfigs {
        config {
            keyAlias 'your-key-alias'
            keyPassword 'your-key-password'
            storeFile file('your-key-store-file')
            storePassword 'your-store-password'
        }
    }
}
```

将 `your-key-alias`、`your-key-password`、`your-key-store-file` 和 `your-store-password` 替换为你的签名文件信息。

#### iOS

iOS 比较特殊，需要在 Xcode 中配置签名文件。打开 `ios/Runner.xcworkspace` 文件，选择 Runner 项目，在 Signing & Capabilities
配置你的签名文件。同时需要注意，iOS 的签名文件需要在 Apple Developer
网站上申请，具体步骤可以参考 [Apple Developer](https://developer.apple.com/) 的文档。

### MacOS

同上，只是目录不同，打开 `macos/Runner.xcworkspace` 文件。

### Windows

待补充