# 架构

Moodiary 是一个 pub workspace monorepo。`mobile/` 是唯一的 Flutter 应用（Android 和 iOS）。约 30 个共享包放在 `packages/` 下，分为四层。根 `pubspec.yaml` 只负责 workspace 和 Melos，不含应用代码。

本页只讲评审中会遇到的规则。各部分的详细说明（DI、路由、i18n、KV、搜索、Rust 包）见仓库里的 [`CLAUDE.md`](https://github.com/ZhuJHua/moodiary/blob/develop/CLAUDE.md)。改动某一块之前，先读对应章节。

## 分层

```
foundation  ->  core  ->  feature_base  ->  feature  ->  mobile/
```

| 层 | 内容 |
| --- | --- |
| `foundation` | 没有内部依赖的底层包：DI 容器、日志、i18n、路由原语、`mui` 设计系统、工具函数，以及原生包 `fast_*` / `moodiary_rust`。 |
| `core` | 与业务无关的基础设施：平台、HTTP、KV 存储、文件布局、主题。`core` 不知道 `Diary`、`Category` 这类业务类型。 |
| `feature_base` | 模型、drift 数据库与仓库、共享组件、迁移、偏好设置、端侧 ML、媒体选择器和编辑器。 |
| `feature` | `diary`、`sync`、`export`、`assistant`、`media`、`lock`。 |
| `mobile/` | 组装层：DI 配置、路由、外壳、生命周期和设置。 |

`core` 和 `feature_base` 层内还有顺序。同一级的包互不导入。

## CI 检查的规则 {#rules-ci-enforces}

`tool/check_layers.dart` 在 `analyze` 和 CI 中运行，以 `tool/layer_baseline.txt` 为零基线。它会拒绝：

- 包依赖右边的层；
- feature 之间互相导入。共享逻辑下沉一层，组合多个 feature 的逻辑放在 `mobile/lib/app`；
- 违反 `core` 或 `feature_base` 层内顺序；
- 业务代码导入 `package:flutter/material.dart`。请改为导入 `package:mui/mui.dart`。`mui` 重新导出 Material，并以 `M` 前缀补充 Material 没有的组件。

评审时还会检查：

- 依赖版本精确钉死，不用 `^`。
- 新的第三方依赖加到实际使用它的那一层的包里，不加到 `mobile/`。
- 新包要在根 `pubspec.yaml` 的 `workspace` 和 Melos 的 `categories` 中登记。

## 原生代码

- Rust 代码位于 `packages/foundation/*/rust`，共有六个原生包。每个包有自己的 crate、原生库、构建钩子、`rust-toolchain.toml` 和 `Cargo.lock`。不使用 `[workspace.dependencies]`，由 `tool/check_generated.dart` 保证共享依赖的版本一致。
- Dart 只通过 [flutter_rust_bridge](https://cjycode.com/flutter_rust_bridge/) 调用 Rust。修改 `rust/src/api` 后运行 `dart tool/task.dart gen-rust`。
- 原生库由 Native Assets 构建钩子编译。每个包提供可重复调用的 `Xxx.ensureInitialized()`。`CancelToken` 这类不透明句柄不能跨库传递，所以每个库各自构造自己的句柄。
- 全文搜索使用 [`sqlite3_simple`](https://github.com/ZhuJHua/sqlite3_simple)，它是 `simple` FTS5 分词器的 fork，以 git 依赖钉定。它是唯一不走 FRB 的原生库。

## 不明显的约定

- **Barrel** 导出整个文件，不用 `show`。文件私有的符号用 `_`，包内私有的用 `@internal` 并在 barrel 上 `hide`，只给测试用的标 `@visibleForTesting`。
- **DI** 使用 get_it + injectable。注解写在实现类上。全仓只有一个 `configureDependencies`，位于 `mobile/lib/app/di/di.dart`。用 `getIt<X>()` 取实例，测试以外不要手写 `getIt.register*`。Riverpod 只管理 UI 状态。
- **路由** 使用 go_router，不用路径参数和查询参数。路由类都在 `moodiary_router`，通过 `extra` 传递只含 JSON 标量的 `params`。每个页面提供 `factory X.fromRoute(GoRouterState)`。
- **i18n** 使用 [slang](https://pub.dev/packages/slang)。App 文案在 `i18n/flutter`，编辑器页面文案在 `i18n/web`。新增文案 `zh` 和 `en` 都要写。Widget 里用 `context.l10n`，服务里用顶层 `l10n`。发给模型的提示词和工具描述硬编码为英文，不进入 i18n。
- **KV 存储**（MMKV）是同步的。API Key 等密钥放在 `MoodiarySecureKVs`。应用锁密码只能通过 `AppLockPin` 读写。
- **数据格式**：修改数据库结构、同步布局或局域网协议必须带迁移方案。按 PR 模板的要求，在 `BREAKING CHANGE:` footer 里写明。见 [Pull Request](./pull-requests#description-and-footers)。
