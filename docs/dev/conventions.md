# 编码约定

这些约定让 30 多个包在长期演进中保持一致。提 PR 前请过一遍。

## 分层与导入

- 遵守 `foundation → core → feature_base → feature → apps` 的方向，`tool/check_layers.dart` 会拦截违规；
- **业务代码只能 `import 'package:mui/mui.dart'`**，不要直接 import `material`；
- `mui` 是 Material 的补充而非替代：Material 够用就直接用，不够才往 `mui` 加（带 `M` 前缀）；
- 主题的唯一构造点是 `mui` 的 `buildMuiTheme()`，取值走 `ColorScheme` / `TextTheme` 与 `MuiTokens`。

## Barrel 导出与可见性

- 包的 barrel 使用**裸 export**（不写 `show`）；
- 不想共享的符号加 `_` 前缀；
- 包内要用、对外不该暴露的加 `@internal`，并在 barrel 上 `hide`；
- 只有测试使用的加 `@visibleForTesting`；
- `show` 仅保留给确实裁不掉的场景（FRB 生成物、第三方重导出、picker 皮肤）。

## 依赖注入：get_it + injectable

- 绑定注解写在**实现类**上（`@Singleton(as:)` 等）；
- 全仓库只有一个 `configureDependencies`（`mobile/lib/app/di/di.dart`），各基础设施包以 micro-module 挂载；
- 解析一律 `getIt<X>()`；**不要手写 `getIt.register*`**（唯一例外是同步会话作用域）;
- 不使用 `@PostConstruct`，启动逻辑放在 `main` 的 bootstrap 中；
- 修改注解后必须跑 `dart tool/task.dart build-runner`，生成文件需要提交。

## 路由：go_router + extra

- 路由类统一放在 `moodiary_router`，每个路由持有 `location` 与 `params`；
- 应用不面向 Web，因此**不使用路径或查询参数**，参数通过 `extra` 以 snake_case 键传递；
- `params` 只放 JSON 标量（id、bool 等），对象会被快照化导致状态恢复时过期；
- 每个页面提供 `factory X.fromRoute(GoRouterState)`。

## 国际化：slang

- 文案使用 `context.l10n.xxx`（随语言切换刷新）；服务与回调用顶层 `l10n.xxx`；
- 参数使用命名参数，键名完整写出，不要起局部别名（会让 analyzer 误判为死键）;
- 修改 `*.i18n.json` 后运行 `dart tool/task.dart i18n`，生成文件需要提交；
- 面向模型的文本（提示词、工具描述）硬编码英文，不进入 i18n；
- `mui` 自带一套独立的 slang 输出（`context.muiL10n`）。

## KV 存储

- `IKVStorage.set / remove / clear` 是同步的，返回 `void`；
- Key 只支持 `int / bool / double / String / List<String>`；
- 密钥（PIN、API Key）存 `MoodiarySecureKVs`；
- 应用锁密码一律走 `AppLockPin`，不要直接读写 `password`。

## Rust 与原生库

- 每个原生包拥有自己的 crate、原生库、build hook、`rust-toolchain.toml` 与 `Cargo.lock`；
- **不使用** `[workspace.dependencies]`，相同 crate 在各包内分别钉版本，`tool/check_generated.dart` 会校验一致性；
- 修改 `rust/src/api` 后必须运行 `dart tool/task.dart gen-rust`；
- 不透明句柄（如 `CancelToken`）不能跨 `.so` 边界，每个库各自构造，且必须在 `await ensureInitialized()` 之后；
- 每个包暴露 `Xxx.ensureInitialized()`，可重复调用。

## 提交与版本

- 提交信息遵循 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/)，CI 依据它生成 CHANGELOG；
- 不希望进入 CHANGELOG 的 PR：在压缩后的提交正文写 `Changelog: skip`，或使用会被跳过的 scope（`chore(deps|readme|pr|pull)`）；
- **所有版本号精确钉定**，唯一例外是根 `pubspec.yaml` 中的 melos。
