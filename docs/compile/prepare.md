# 编译前准备
**官方文档：**
[谷歌官方教程](https://docs.flutter.cn/get-started/install/windows/mobile)
## 开发环境要求
- **Flutter SDK** (版本 >= 3.27.0 Stable，建议使用 FVM 管理 Flutter 版本)
- **Dart** (版本 >= 3.6.0)
- Rust Toolchain
- Clang/LLVM
- 兼容的 IDE（如 Android Studio、Visual Studio Code）

**本教程将以 Windows 10 最新版作为演示系统。**

### 更新 Windows 到最新版
1. **打开设置**：
   - 按下 `Win + I` 快捷键，或者点击开始菜单中的 **设置**（齿轮图标）。
2. **进入更新页面**：
   - 选择 **“Windows 更新”**。
3. **检查更新**：
   - 点击 **“检查更新”**，系统会自动搜索可用更新。
4. **下载并安装**：
   - 如果有更新，点击 **“下载并安装”**。
   - 如果是大型版本更新（如年度功能更新），可能需要手动确认下载。
5. **重启电脑**：
   - 安装完成后，按提示重启电脑（可以选择稍后重启，但确保最终完成重启）。
6. 返回 **“Windows 更新”** 页面，确认显示 **“你的设备已是最新版本”**。
7. 运行 `winver` 命令，再次检查版本号是否已更新。

#### **常见问题解决**
1. **更新卡住或失败**：
   - 重启电脑后重试。
   - 运行 **“疑难解答”**（在更新页面点击 **“疑难解答”**）。
   - 清理磁盘空间（至少保留 20GB 可用空间）。

2. **无法检测到更新**：
   - 手动下载补丁：访问 [Microsoft Update Catalog](https://www.catalog.update.microsoft.com/)，搜索并下载对应补丁。

### 开发环境搭建
#### **Flutter 环境搭建**
##### 1. 配置环境变量
官方文档：[Flutter 中文网](https://flutterchina.club/)
> 1. 官方文档提供的是 Linux 的下载方法：
> ```bash
> export PUB_HOSTED_URL=https://pub.flutter-io.cn
> export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
> ```
> 2. Windows 用户直接将以下内容添加到环境变量中：
> ```
> PUB_HOSTED_URL=https://pub.flutter-io.cn
> FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
> ```
> **注意：** 这两个环境变量一定要添加，否则可能导致后续 `flutter doctor` 命令连接不上服务。

##### 2. 下载 Git for Windows
官方地址：[Git for Windows](https://git-scm.com/download/win)，下载并安装。

如果已经安装了 Git for Windows，请确保在命令提示符或 PowerShell 中运行 `git` 命令，否则在运行 `flutter doctor` 时会出现 `Unable to find git in your PATH` 错误。此时需要手动将 `C:\Program Files\Git\bin` 添加到 `Path` 系统环境变量中。

##### 3. 下载 Flutter SDK
###### 环境要求
- 操作系统：Windows 10 或更高版本
- 磁盘空间：至少 2 GB 可用空间
- 工具：Git、Android Studio（可选，用于 Android 开发）

###### 下载教程
1. 访问 Flutter 官方网站：[Flutter SDK 下载页面](https://flutter.dev/docs/get-started/install/windows)。
2. 找到 Flutter 3.27.0 Stable 版本，点击下载适用于 Windows 的 SDK 压缩包（`flutter_windows_3.27.0-stable.zip`）。
3. 将下载的压缩包解压到您希望安装的目录，例如 `C:\flutter`。

###### 配置环境变量
1. 右键点击“此电脑”或“我的电脑”，选择“属性”。
2. 点击“高级系统设置”，然后选择“环境变量”。
3. 在“系统变量”部分，找到 `Path`，点击“编辑”。
4. 点击“新建”，输入 Flutter SDK 的路径，例如 `C:\flutter\bin`。
5. 点击“确定”保存更改。

###### 安装依赖工具
1. 打开命令提示符（CMD）或 PowerShell。
2. 运行以下命令安装 Flutter 所需的依赖：
   ```bash
   flutter doctor
   ```
3. 根据 `flutter doctor` 的输出，安装缺失的工具。例如：
   - 安装 Android SDK：下载并安装 [Android Studio](https://developer.android.com/studio)，然后配置 Android SDK。

###### 验证安装
1. 运行以下命令检查 Flutter 是否安装成功：
   ```bash
   flutter --version
   ```
2. 如果显示类似以下信息，说明安装成功：
   ```
   Flutter 3.27.0 • channel stable • https://github.com/flutter/flutter.git
   Framework • revision xxxxxxxx (xx days ago) • 2023-xx-xx xx:xx:xx -xxxx
   Engine • revision xxxxxxxx
   Tools • Dart 2.xx.x • DevTools 2.xx.x
   ```

##### 常见问题
###### `flutter doctor` 提示 Android SDK 未安装
- 打开 Android Studio，进入“SDK Manager”，确保已安装最新版本的 Android SDK 和 Android SDK Build-Tools。

###### `flutter doctor` 提示许可证未接受
- 运行以下命令接受 Android SDK 许可证：
  ```bash
  flutter doctor --android-licenses
  ```

###### 网络问题导致下载失败
- 确保网络畅通，或者配置代理。可以通过以下命令设置代理：
  ```bash
  set HTTP_PROXY=http://your_proxy:port
  set HTTPS_PROXY=http://your_proxy:port
  ```

##### 4. 下载 Android Studio
参考教程：[Android Studio 安装指南](https://blog.csdn.net/weixin_45143788/article/details/127498365)

##### 5. 设置 Android 模拟器
**注意！推荐使用实机进行演示！**
1. 在您的机器上启用 VM acceleration。
2. 启动 Android Studio > Tools > Android > AVD Manager，然后选择 Create Virtual Device。
3. 选择一个设备并点击 Next。
4. 为要模拟的 Android 版本选择一个或多个系统映像，然后点击 Next。建议使用 x86_64 image。
5. 在 Emulated Performance 下，选择 Hardware - GLES 2.0 以启用硬件加速。
6. 验证 AVD 配置是否正确，然后点击 Finish。
7. 选择 Android 12 版本进行下载。
8. 设置机型名称、方向、硬件加速。
9. 启动模拟器。

##### 6. 安装插件
安装 Flutter 和 Dart 插件需要以下两个插件：
- **Flutter 插件**：支持 Flutter 开发工作流（运行、调试、热重载等）。
- **Dart 插件**：提供代码分析（输入代码时进行验证、代码补全等）。

安装步骤：
1. 启动 Android Studio。
2. 打开插件首选项（Preferences > Plugins），搜索并安装。
3. 选择 Browse repositories…，选择 Flutter 插件并点击 install。
4. 重启 Android Studio 后插件生效。

# 相关视频教程：
- [Bilibili 教程](https://www.bilibili.com/video/BV1ag411M7VG/?spm_id_from=333.788.recommend_more_video.1)
- [CSDN 教程](https://blog.csdn.net/qq_40976321/article/details/121806555)