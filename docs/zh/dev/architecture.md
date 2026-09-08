# 仓库结构与分层

Moodiary 采用 **分层 pub workspace monorepo**：根目录的 `pubspec.yaml` 只负责协调 workspace 与 Melos，应用本体在 `mobile/`，共享代码在 `packages/` 下按依赖方向分为四层。

## 顶层结构

```
moodiary/
├── tool/          # 任务运行器、分层检查、发布脚本
├── mobile/        # Flutter 应用（pub 名 moodiary，Android + iOS）
│   └── lib/
│       ├── app/   # 组合层：DI、路由、壳、生命周期、设置
│       └── main.dart
├── packages/
│   ├── foundation/    # 第 1 层：无内部依赖
│   ├── core/          # 第 2 层：领域无关的基础设施
│   ├── feature_base/  # 第 3 层：可复用的领域基础
│   └── feature/       # 第 4 层：彼此独立的功能模块
└── pubspec.yaml       # workspace + Melos 配置，没有应用代码
```

## 四个依赖层

依赖方向严格为 `foundation → core → feature_base → feature → apps`：

### foundation

叶子层，不依赖任何内部包。

| 包 | 职责 |
| --- | --- |
| `moodiary_lint` | 共享 analyzer 规则 |
| `moodiary_di` | 全局唯一的 get_it 实例 |
| `moodiary_logging` | 日志；磁盘路径由组合根注入 |
| `moodiary_i18n` | 基于 slang 的文案与查找入口 |
| `moodiary_router` | 基于 go_router 的类型化路由原语 |
| `mui` | 设计系统，Material 的补充 |
| `moodiary_utils` | 纯工具函数与内容转换 |
| `moodiary_rust` | HTTP 客户端/服务端、WebDAV/S3 同步、LLM、图布局 |
| `fast_image` | 图片管线（缩略图、区域解码、平铺查看） |
| `fast_press` | 排版导出为 PDF / DOCX |
| `fast_tokenizer` | jieba + HF tokenizer 分词 |
| `fast_crypto` | AES-GCM + Argon2id |
| `fast_zip` | 压缩与解压（支持条目级 AES） |
| `moodiary_sqlite_vec` | sqlite-vec，本地向量检索 |

### core

领域无关的基础设施：`moodiary_platform`（目录/生物识别/网络状态）、`moodiary_http`、`moodiary_storage`（KV 与安全 KV）、`moodiary_files`（文件布局与媒体管线）、`moodiary_theme`（配色、字体、ThemeData）。

**core 不认识任何领域类型**（`Diary`、`Category`、`Font` 都不在这一层）。

### feature_base

`moodiary_models`（Freezed 模型与 DTO）、`moodiary_data`（drift 数据库、仓库、控制器）、`moodiary_components`、`moodiary_migration`（旧版本一次性迁移）、`moodiary_preferences`、`moodiary_ml`（本地 ML）、`moodiary_picker`（媒体选择）、`moodiary_editor`（TipTap 编辑器）。

### feature

彼此**互不引用**的功能包：`moodiary_diary`、`moodiary_sync`、`moodiary_export`、`moodiary_assistant`、`moodiary_media`、`moodiary_lock`。

跨功能组合统一放在 `mobile/lib/app` 中完成。

## 分层是如何强制的

pub 只能保证无环，无法保证方向。`tool/check_layers.dart` 以 `tool/layer_baseline.txt` 为基线做静态检查，会拒绝：

- 下层依赖上层；
- 同层互引；
- 层内顺序违规（core 与 feature_base 各有内部顺序）；
- 业务代码直接 import `material`（必须经由 `package:mui/mui.dart`）。

CI 会在每次 Pull Request 上运行该检查。

## 应用内分层

`mobile/lib` 内部也有自己的顺序：`gen → core → data → component → feature/<x> → app → main.dart`。

## 放代码的原则

- **feature 之间不互相引用**。需要共享的逻辑下沉一层；
- 跨功能的组合逻辑写进 `mobile/lib/app`；
- 新增第三方依赖时，优先放进它所属的那一层的包，而不是 `mobile/`。
