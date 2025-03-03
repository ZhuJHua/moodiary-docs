# 三、获取项目源码以及编译项目
## 5. 克隆 GitHub 仓库
1. 打开终端（CMD、PowerShell 或 Git Bash）。
2. 导航到您希望存放项目的目录，例如：
   ```bash
   cd C:\moodiary
   ```
3. 运行以下命令克隆仓库：
   ```bash
   git clone https://github.com/ZhuJHua/moodiary.git
   ```
4. 克隆完成后，进入项目目录：
   ```bash
   cd moodiary
   ```


## 7. 项目目录结构解析

```
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
```

### 详细说明
1. **`lib/` 目录**：
   - 这是 Flutter 项目的核心代码目录。
   - `main.dart` 是应用的入口文件，启动应用时会首先执行此文件。
   - `models/` 目录存放数据模型，通常用于定义与后端交互的数据结构。
   - `services/` 目录包含业务逻辑，如网络请求、数据处理等。
   - `pages/` 目录存放应用的不同页面组件。
   - `widgets/` 目录包含可复用的 UI 组件，如按钮、卡片等。
   - `utils/` 目录存放工具类，如日期格式化、字符串处理等。

2. **`assets/` 目录**：
   - 存放静态资源文件，如图片、字体、配置文件等。
   - 在 `pubspec.yaml` 中需要声明这些资源文件。

3. **`test/` 目录**：
   - 包含单元测试和集成测试代码。
   - 用于验证应用的功能和逻辑是否正确。

4. **`pubspec.yaml` 文件**：
   - 这是 Flutter 项目的配置文件，用于管理依赖、版本信息和资源声明。
   - 通过 `flutter pub get` 命令可以安装依赖。

5. **`android/` 和 `ios/` 目录**：
   - 分别存放 Android 和 iOS 平台的特定配置。
   - 通常不需要频繁修改，除非需要调整平台相关的设置。

## 8. 运行项目
1. 确保已安装 Flutter 并配置好环境。
2. 在项目根目录下运行以下命令安装依赖：
   ```bash
   flutter pub get
   ```
3. 运行项目：
###   设备准备
#### 启用开发者模式：

##### Android：进入 设置 > 关于手机，连续点击 版本号 直到出现 “你已成为开发者”。然后在 开发者选项 中启用 USB 调试。
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