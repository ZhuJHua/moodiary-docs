# 代码生成

大量代码由生成器产出，并且**生成文件会被提交**。改了什么之后该跑哪个命令，见 [CONTRIBUTING.zh.md 的代码生成一节](https://github.com/ZhuJHua/moodiary/blob/develop/CONTRIBUTING.zh.md#代码生成)。本页说明各个生成器做了什么，以及容易出问题的地方。

## Dart 代码生成（build_runner）

`build-runner` 覆盖 `injectable`、`freezed`、`json_serializable`、Riverpod 和 drift。

- 必须在**仓库根目录**执行。只跑 `mobile/` 会漏掉各包里的注解。
- 会顺带执行 `dart format .`。

## Rust FFI 绑定（flutter_rust_bridge）

- `gen-rust` 会先校验 `flutter_rust_bridge_codegen` CLI 与 pubspec 中钉定的版本一致。不一致会直接拒绝，防止钉定版本被意外改写。必要时安装匹配的版本：

  ```bash
  cargo install flutter_rust_bridge_codegen --version 2.13.0 --locked
  ```

- 生成完成后会执行 `cargo fmt` 与 analyze。

## 国际化（slang）

- App 的翻译文件在 `i18n/flutter/*.i18n.json`。`mui` 的翻译在 `packages/foundation/mui/lib/src/i18n`。`i18n` 任务会同时重新生成两者。
- 编辑器页面的翻译在 `i18n/web`，由 unplugin-vue-i18n 编进编辑器产物，不需要代码生成。
- 没有任何 CI 检查能发现漏跑了 `i18n`，请手动执行并提交产物。

## 一致性检查

`tool/check_generated.dart` 在 `analyze` 与 CI 中运行，负责保证各原生包一致：

- 六个原生包的 `Cargo.toml`、工具链、FRB / ffigen 版本必须完全一致；
- 若报错，通常意味着某个包被单独升级了，请同步修改或回退。

## 构建钩子补充说明

- 原生库由 **Native Assets build hooks** 编译，缓存位于仓库根的 `.dart_tool/hooks_runner/`。
- `flutter clean` **不会**清理该缓存。若修改 Rust 依赖后 APK 体积没有变化，先检查这个缓存。
- `dart tool/task.dart clean` 会删除编辑器产物与该缓存。
- 构建钩子在目标平台等于宿主平台时提前返回。因此 `flutter test` 不会构建或加载任何 Rust 库、编辑器资源与许可证清单。`moodiary_sqlite_vec` 的 C 钩子是例外。
