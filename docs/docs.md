# 前言：

本心绪日记Wiki  由社区维护，可能存在问题，目前为**云烨**负责日常更新。在此教程最后，有开箱即用的Windows系统镜像（已预装所需环境，开箱即用），并附上详尽的操作视频教程。所有视频教程将统一发布在B站，相关文件则上传至123云盘，供大家便捷获取。

**注意！**此教程仅适用于**2.72**版本，过低/过高版本可能存在严重错误！其他版本可能100%编译成功,请自行更新/降级组件。此教程仅在Windows平台下做了测试。

心绪日记QQ群：**760014526**

心绪日记TG群：[]()**https://t.me/openmoodiary**

**广告：** 若您尚未注册123云盘，可通过以下邀请链接快速注册：![注册链接](#)

# 编译前准备

![常见问题](https://blog.csdn.net/qq_27404929/article/details/135015876)

## 开发环境要求

**Flutter SDK** (\>= 3.27.0 Stable) (It is recommended to use FVM to manage the Flutter version)

**Dart** (\>= 3.6.0)

Rust Toolchain

Clang/LLVM

Compatible IDE (e.g. Android Studio, Visual Studio Code)

**本教程将会以Windows 10最新版作为演示系统**

### 更新Windows至最新版

1. **打开设置**：

- 按下 `Win + I` 或点击开始菜单中的 **设置**（齿轮图标）。

2. **进入更新页面**：

- 选择 **“Windows 更新”**

3. **检查更新**：

- 点击 **“检查更新”**，系统会自动搜索可用更新。

4. **下载并安装**：

- 如果有更新，点击 **“下载并安装”**。
    - 大型版本更新（如年度功能更新）可能需要手动确认下载。

5. **重启电脑**：

- 安装完成后，按提示重启（可选择稍后重启，但需确保完成）。

6. 返回 **“Windows 更新”** 页面，确认显示 **“你的设备已是最新版本”**。
7. 运行 `winver` 再次检查版本号是否更新。





#### **常见问题解决**

1. **更新卡住或失败**：

- 重启电脑后重试。
    - 运行 **“疑难解答”**（在更新页面点击 **“疑难解答”**）。
        - 清理磁盘空间（至少保留20GB可用空间）。



2. **无法检测到更新**：

- 手动下载补丁：访问 [Microsoft Update Catalog]([https://www.catalog.update.microsoft.com/](https://www.catalog.update.microsoft.com/))，搜索并下载对应补丁。

### 开发环境搭建

Flutter环境搭建



#### 1、配置环境变量

官方文档：[https://flutterchina.club/](https://flutterchina.club/)

> 1、官方文档的是Linux的下载方法
> export PUB*HOSTED*URL=[https://pub.flutter-io.cn](https://pub.flutter-io.cn)
> export FLUTTER*STORAGE*BASE*URL=*[https://storage.flutter-io.cn](https://storage.flutter-io.cn)
> 2、window的用户直接将下面的添加到环境变量中
> PUB*HOSTED*URL=[https://pub.flutter-io.cn](https://pub.flutter-io.cn)
> FLUTTER*STORAGE*BASE*URL=*[https://storage.flutter-io.cn](https://storage.flutter-io.cn)
> 注意：这两个环境变量一定要加，否则可能导致后面 flutter doctor 命令连接不上服务

#### 2、下载 Git for Windows

官方地址：[https://git-scm.com/download/win](https://git-scm.com/download/win) ，下载并安装



如果已安装 Git for Windows，请确保命令提示符或PowerShell中运行 git 命令，不然在后面运行flutter doctor时将出现Unable to find git in your PATH错误, 此时需要手动添加C:Program FilesGitbin至Path系统环境变量中。

#### 3、下载Flutter SDK

##### 环境要求

- 操作系统：Windows 10 或更高版本
- 磁盘空间：至少 2 GB 可用空间
- 工具：Git、Android Studio（可选，用于 Android 开发）



##### 安装步骤



###### 下载 Flutter SDK

2. 访问 Flutter 官方网站：[Flutter SDK 下载页面]([https://flutter.dev/docs/get-started/install/windows](https://flutter.dev/docs/get-started/install/windows))。
3. 找到 Flutter 3.27.0 Stable 版本，点击下载适用于 Windows 的 SDK 压缩包（`flutter_windows_3.27.0-stable.zip`）。
4. 将下载的压缩包解压到您希望安装的目录，例如 `C:\flutter`。



----



###### 配置环境变量

3. 右键点击“此电脑”或“我的电脑”，选择“属性”。
4. 点击“高级系统设置”，然后选择“环境变量”。
5. 在“系统变量”部分，找到 `Path`，点击“编辑”。
6. 点击“新建”，输入 Flutter SDK 的路径，例如 `C:\flutter\bin`。
7. 点击“确定”保存更改。



----



###### 安装依赖工具

4. 打开命令提示符（CMD）或 PowerShell。
5. 运行以下命令安装 Flutter 所需的依赖：

   ```bash`

   flutter doctor

   ````

3. 根据 `flutter doctor` 的输出，安装缺失的工具。例如：

- 安装 Android SDK：下载并安装 [Android Studio]([https://developer.android.com/studio](https://developer.android.com/studio))，然后配置 安卓SDK



###### 验证安装

5. 运行以下命令检查 Flutter 是否安装成功：

   ```flutter --version`

   ````

2. 如果显示类似以下信息，说明安装成功：

   ````

   Flutter 3.27.0 • channel stable • [https://github.com/flutter/flutter.git](https://github.com/flutter/flutter.git)

   Framework • revision xxxxxxxx (xx days ago) • 2023-xx-xx xx:xx:xx -xxxx

   Engine • revision xxxxxxxx

   Tools • Dart 2.xx.x • DevTools 2.xx.x

   ````



----



##### 常见问题

###### `flutter doctor` 提示 Android SDK 未安装

- 打开 Android Studio，进入“SDK Manager”，确保已安装最新版本的 Android SDK 和 Android SDK Build-Tools。



###### `flutter doctor` 提示许可证未接受

- 运行以下命令接受 Android SDK 许可证：

  ```bash`

  flutter doctor --android-licenses

  ````



###### 网络问题导致下载失败

- 确保网络畅通，或者配置代理。可以通过以下命令设置代理：

  ```bash`

  set HTTP*PROXY=*[http://your\_proxy:port](http://your_proxy:port)

  set HTTPS*PROXY=*[http://your\_proxy:port](http://your_proxy:port)

下面表示未安装 Android SDK 和 Android studio



#### 4、下载Android Studio

.目前官网上已经没有单独的SDK下载安装包了。目前官网推荐的是下载包含有Android SDK的Android Studio。（下面链接为知识拓展，可忽略，直接下载android studio 即可）

[https://www.cnblogs.com/nebie/p/9145627.html](https://www.cnblogs.com/nebie/p/9145627.html)（Android SDK下载与安装）

[https://www.androiddevtools.cn/](https://www.androiddevtools.cn/) （Android工具插件下载，）

android studio 下载地址：[https://developer.android.google.cn/studio](https://developer.android.google.cn/studio)





下载后安装，处理选择安装环境，其它next即可

第一次安装，报错，点取消，后会引导你安装android sdk

安装android sdk 并设置安装位置，之后耐心等待安装即可

sdk 安装完成之后进行环境变量配置



ANDROID*HOME = Android sdk 安装的位置添加完成之后 *

输入 flutter docotr进行检测

如果新终端显示 Android sdk 处还是红叉，就重启电脑再进行 flutter docotr进行检测

[!] Android toolchain - develop for Android devices (Android SDK version 31.0.0)



 X cmdline-tools component is missing



 Run path/to/sdkmanager --install "cmdline-tools;latest"



 See [https://developer.android.com/studio/command-line](https://developer.android.com/studio/command-line) for more details.



 X Android license status unknown.



 Run flutter doctor --android-licenses to accept the SDK licenses.



 See [https://flutter.dev/docs/get-started/install/windows#android-setup](https://flutter.dev/docs/get-started/install/windows#android-setup) for more details.



> [！Android工具链-为Android设备开发(Android SDK version 31.0.0)
> 缺少X cmdline-tools组件
> 运行' path/to/sdkmanager——install "cmdline-tools;latest"
> 详情请参见[https://developer.android.com/studio/command-line。](https://developer.android.com/studio/command-line。)
> X Android许可状态未知。
> 运行' flutter doctor --android-licenses '来接受SDK许可证。
> 详情请参见[https://flutter.dev/docs/get-started/install/windows#android-setup。](https://flutter.dev/docs/get-started/install/windows#android-setup。)

Android sdk 感叹号问题解决方案

> 根据上面提示运行 flutter doctor -android-licenses 发现还是报错，如下
> Android sdkmanager not found. Update to the latest Android SDK and 
> ensure that the cmdline-tools are installed toresolve this.
> --没有找到Android sdkmanager。更新到最新的Android SDK，
> --并确保cmdline-tools安装到解决这个问题。

打开studio–选择sdk manager – sdk tools – 底部取消勾选 – 再勾选2个sdk tools – 点击ok

安装完成后打开终端–输入指令–不报错，出现输入，一直Y即可



flutter doctor --android-licenses

之后再

flutter doctor 检查环境状况

一般情况 检查应该是全部通过的

如果不通过就看下面的失败示例

失败实例

[!] Android toolchain - develop for Android devices



 X Unable to locate Android SDK.



 Install Android Studio from: [https://developer.android.com/studio/index.html](https://developer.android.com/studio/index.html)



 On first launch it will assist you in installing the Android SDK components.



 (or visit [https://flutter.dev/docs/get-started/install/windows#android-setup](https://flutter.dev/docs/get-started/install/windows#android-setup) for detailed instructions).



 If the Android SDK has been installed to a custom location, please use



 flutter config --android-sdk to update to that location.



 X No valid Android SDK platforms found in D:evnandroid*SDK**platforms. Candidates were:*



 - android-31



[！Android工具链-为Android设备开发

X无法定位Android SDK。

安装Android Studio从:[https://developer.android.com/studio/index.html](https://developer.android.com/studio/index.html)

在第一次启动时，它将帮助您安装Android SDK组件。

(或[https://flutter.dev/docs/get-started/install/windows#android-setup获取详说明](https://flutter.dev/docs/get-started/install/windows#android-setup获取详说明))

如果Android SDK已经安装到自定义位置，请使用

' flutter config -android-sdk '更新到该位置。

在D:evnandroid*SDK**平台中找不到有效的Android SDK平台。候选人:*

——android-31

如果还报错就添加，之后再尝试 flutter doctor

%ANDROID*HOME%**platform-tools*

%ANDROID*HOME%**tools *

两个path变量



检查全通过，表示环境配置已经完成了

在这里插入图片描述

5、设置Android模拟器

**注意！推荐使用实机演示！**

在您的机器上启用 VM acceleration .

启动 Android Studio\>Tools\>Android\>AVD Manager 并选择 Create Virtual Device.

选择一个设备并选择 Next。

为要模拟的Android版本选择一个或多个系统映像，然后选择 Next. 建议使用 x86*64 image .*

在 Emulated Performance下, 选择 Hardware - GLES 2.0 以启用 硬件加速.

验证AVD配置是否正确，然后选择 Finish。

在这里插入图片描述

选android 12 版本的进行下载

设置机型名称、方向、硬件加速

启动模拟器

6、安装插件

安装Flutter和Dart插件需要安装两个插件:



Flutter插件： 支持Flutter开发工作流 (运行、调试、热重载等).

Dart插件： 提供代码分析 (输入代码时进行验证、代码补全等).

（1）启动Android Studio.



（2）打开插件首选项 (Preferences\>Plugins 搜索并安装）.



（3）选择 Browse repositories…, 选择 Flutter 插件并点击 install.



（4）重启Android Studio后插件生效.

相关视频教程：

[https://www.bilibili.com/video/BV1ag411M7VG/?spm\_id\_from=333.788.recommend\_more\_video.1](https://www.bilibili.com/video/BV1ag411M7VG/?spm_id_from=333.788.recommend_more_video.1)

[https://blog.csdn.net/qq\_40976321/article/details/121806555](https://blog.csdn.net/qq_40976321/article/details/121806555)

# 三、获取项目源码以及编译项目

## 5. 克隆 GitHub 仓库

1. 打开终端（CMD、PowerShell 或 Git Bash）。
2. 导航到您希望存放项目的目录，例如：

   ```bash`

   cd C:moodiary

   ````

3. 运行以下命令克隆仓库：

   ```bash`

   git clone [https://github.com/ZhuJHua/moodiary.git](https://github.com/ZhuJHua/moodiary.git)

   ````

4. 克隆完成后，进入项目目录：

   ```bash`

   cd moodiary

   ````





## 7. 项目目录结构解析



````

moodiary/

├── lib/                  # 项目的主要代码目录

│   ├── main.dart         # 应用入口文件

│   ├── models/           # 数据模型定义

│   ├── services/         # 业务逻辑和服务层

│   ├── pages/            # 页面组件

│   ├── widgets/          # 可复用的 UI 组件

│   └── utils/            # 工具类和辅助函数

├── assets/               # 静态资源文件（如图片、字体等）

├── test/                 # 单元测试和集成测试

├── pubspec.yaml          # 项目依赖配置文件

├── README.md             # 项目说明文档

└── android/              # Android 平台相关配置

└── ios/                  # iOS 平台相关配置

````



### 详细说明

1. ****`lib/`** 目录**：

            - 这是 Flutter 项目的核心代码目录。
            - `main.dart` 是应用的入口文件，启动应用时会首先执行此文件。
            - `models/` 目录存放数据模型，通常用于定义与后端交互的数据结构。
            - `services/` 目录包含业务逻辑，如网络请求、数据处理等。
            - `pages/` 目录存放应用的不同页面组件。
            - `widgets/` 目录包含可复用的 UI 组件，如按钮、卡片等。
            - `utils/` 目录存放工具类，如日期格式化、字符串处理等。



2. ****`assets/`** 目录**：

            - 存放静态资源文件，如图片、字体、配置文件等。
            - 在 `pubspec.yaml` 中需要声明这些资源文件。



3. ****`test/`** 目录**：

            - 包含单元测试和集成测试代码。
            - 用于验证应用的功能和逻辑是否正确。



4. ****`pubspec.yaml`** 文件**：

            - 这是 Flutter 项目的配置文件，用于管理依赖、版本信息和资源声明。
            - 通过 `flutter pub get` 命令可以安装依赖。



5. ****`android/`** 和 **`ios/`** 目录**：

            - 分别存放 Android 和 iOS 平台的特定配置。
            - 通常不需要频繁修改，除非需要调整平台相关的设置。



## 8. 运行项目

1. 确保已安装 Flutter 并配置好环境。
2. 在项目根目录下运行以下命令安装依赖：

   ```bash`

   flutter pub get

   ````

3. 运行项目：

###   设备准备

#### 启用开发者模式：



##### Android：进入 设置 \> 关于手机，连续点击 版本号 直到出现 “你已成为开发者”。然后在 开发者选项 中启用 USB 调试。

##### iOS：连接设备到电脑，信任电脑。

#### 连接设备：



使用 USB 数据线连接设备到电脑。

#### 配置系统

##### 对于 Android：



确保 Android 设备在设备列表中显示。可以通过运行 flutter devices 来检查。

如果设备没有显示，检查 USB 驱动程序是否已安装。

##### 对于 iOS：



使用 Xcode 打开项目，确保设备被识别。

可能需要设置开发者账号并信任设备。

启动调试

#### 运行应用：



##### 在终端中导航到你的 Flutter 项目目录。

运行 flutter run，Flutter 会自动检测连接的设备并在其上运行应用。

##### 使用 IDE：



在 Android Studio 或 Visual Studio Code 中打开 Flutter 项目。

选择目标设备（连接的真机），然后点击运行按钮。

