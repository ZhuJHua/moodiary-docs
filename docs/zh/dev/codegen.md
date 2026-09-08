# 代码生成

大量代码由生成器产出，并且**生成文件会被提交**。改动之后记得重新生成并一起提交，否则 CI 会失败。

## Dart 代码生成（build_runner）

覆盖 `injectable`、`freezed`、`json_serializable` 等：

```bash
dart tool/task.dart build-runner
```

- 必须在**仓库根目录**执行：只跑 `mobile/` 会漏掉各包里的注解；
- 会顺带执行 `dart format .`；
- 触发时机：修改了 DI 绑定注解、Freezed 模型或 JSON 序列化标注。

## Rust FFI 绑定（flutter_rust_bridge）

```bash
dart tool/task.dart gen-rust
```

- 触发时机：修改了任何原生包的 `rust/src/api`；
- 会先校验 `flutter_rust_bridge_codegen` CLI 与 pubspec 中钉定的版本一致（不一致会直接拒绝，防止悄悄改写钉定版本），必要时安装：

  ```bash
  cargo install flutter_rust_bridge_codegen --version 2.13.0 --locked
  ```

- 生成完成后会执行 `cargo fmt` 与 analyze。

## 国际化（slang）

```bash
dart tool/task.dart i18n
```

- 触发时机：修改了 `moodiary_i18n` 或 `mui` 中的 `*.i18n.json`；
- 没有任何 CI 校验会捕捉「忘了重新生成」，务必手动执行并提交产物。

## 一次性执行两个

```bash
dart tool/task.dart gen
```

## 一致性检查

`tool/check_generated.dart` 在 `analyze` 与 CI 中运行，负责保证跨包一致：

- 六个原生包的 `Cargo.toml`、工具链、FRB / ffigen 版本必须完全一致；
- 若报错，通常意味着某个包被单独升级了，请同步修改或回退。

## 构建钩子补充说明

- 原生库由 **Native Assets build hooks** 编译，缓存位于仓库根的 `.dart_tool/hooks_runner/`；
- `flutter clean` **不会**清理该缓存；若修改 Rust 依赖后 APK 体积没有变化，先怀疑它；
- `dart tool/task.dart clean` 会删除编辑器产物与该缓存；
- 构建钩子在「目标平台 == 宿主平台」时提前返回，因此 `flutter test` 不会构建或加载任何 Rust 库、编辑器资源与许可证清单（`moodiary_sqlite_vec` 的 C 钩子除外）。
