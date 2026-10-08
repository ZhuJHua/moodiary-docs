# 测试

## CI 跑什么

`Quality & Tests` 工作流在每个提到 `develop` 的 PR 上运行。`Changes` 任务先检查改动的路径，跳过这些路径影响不到的任务。只改了 Markdown、`docs/`、`res/` 或 `.github/` 时，不运行任何任务。运行了的任务必须全部通过。

| 任务 | 何时运行 | 步骤 |
| --- | --- | --- |
| Dart | 改了编辑器、`i18n/web` 和上述路径以外的文件 | `check_generated`、`flutter analyze`、`check_layers`、`dart tool/task.dart test --all` |
| Rust | 改了 `packages/foundation/*/rust`（Dart 也会运行） | 在六个原生包里分别执行 `cargo clippy --all-targets -- -D warnings` 和 `cargo test` |
| Editor | 改了 `packages/feature_base/moodiary_editor/editor` 或 `i18n/web` | `corepack pnpm type-check` 和 `corepack pnpm test` |

单独的 `PR title` 检查见 [Pull Request](./pull-requests)。

## 在本地跑同样的检查 {#running-the-same-checks-locally}

```bash
dart tool/task.dart analyze        # check_generated + check_layers + flutter analyze
dart tool/task.dart test           # 受影响的包的 Dart 测试

# 改了 packages/foundation/*/rust 时
for d in packages/foundation/*/rust; do (cd $d && cargo clippy --all-targets -- -D warnings && cargo test); done

# 改了编辑器或 i18n/web 时
cd packages/feature_base/moodiary_editor/editor && corepack pnpm type-check && corepack pnpm test
```

循环要遍历 `packages/foundation/*/rust`。手写 `fast_*` 包名单会漏掉 `moodiary_rust`。

## `task.dart test` 如何挑选测试

- 默认与 `origin/develop` 的 merge-base 比较，所以覆盖整个分支，以及未提交和未跟踪的文件。传 `--diff=<ref>` 可以换一个基准。
- 「受影响」指有改动的包，加上直接或间接依赖它们的包。根 `pubspec.yaml` 有改动或传了 `--all` 时跑全部。
- 受影响的包的 `test/` 目录交给仓库根目录下的**一次** `flutter test`。构建钩子和前端编译器在整次运行中只执行一次。
- `test-mobile` 只跑 `mobile/` 的测试。在根目录单独执行 `flutter test` 找不到测试，因为根目录没有 `test/`。
- 旧版数据库迁移测试在 `ISAR_TEST_DYLIB` 指向 Isar 动态库之前会被跳过。CI 会设置它，找不到库时直接失败。

## 编写测试

- **通过 `repoRoot` 读取仓库文件**，它来自 `package:moodiary_lint/testing.dart`。工作目录是仓库根目录而不是你的包，相对路径会出错。
- **只往你自己用 `Directory.systemTemp.createTempSync()` 建的目录里写文件。** 所有包的测试共用一个进程和一个临时根目录。
- **新用例尽量加到已有的测试文件里。** 每个文件加载约需 1.5 秒，这是运行时间的主要部分。
- **仓库层**使用真实的内存数据库：`XxxRepository(MoodiaryDatabase.forTesting(...))`。
- **仓库层以上的代码**在容器里注册 fake：在 `setUp` 中 `getIt.registerSingleton<XxxRepository>(fake)`，并 `tearDown(getIt.reset)`。
- **Dart 测试不加载原生代码。** 目标平台等于宿主平台时构建钩子提前返回，所以 Rust 库、编辑器产物和许可证清单都不存在。原生逻辑用 `cargo test` 覆盖，编辑器逻辑用编辑器自己的测试覆盖。三个第三方原生资源（`sqlite3_vec`、`sqlite3_simple` 和 `flutter_js`）是例外，它们会为宿主平台构建。
