# 常用命令

所有日常操作都通过 `tool/task.dart` 完成，在仓库根目录运行：

```bash
dart tool/task.dart <命令>
```

初始化、运行以及提 PR 前要跑的检查见 [CONTRIBUTING.zh.md](https://github.com/ZhuJHua/moodiary/blob/develop/CONTRIBUTING.zh.md#开发环境)。本页列出全部命令，并说明测试的运行方式。

## 命令一览

| 命令 | 作用 |
| --- | --- |
| `setup` | `flutter pub get` |
| `run` | `flutter run`，额外参数放在 `--` 之后 |
| `build-apk` | 构建 Android APK |
| `build-ios` | 构建 iOS |
| `analyze` | 生成物一致性 + 分层检查 + `flutter analyze` |
| `check-layers` | 只跑分层检查 |
| `test` | 跑受影响的包的测试（见下） |
| `test-mobile` | 只跑 `mobile/` 的测试 |
| `build-runner` | 全 workspace 跑 `build_runner` 并格式化 |
| `gen-rust` | 重新生成 Rust FFI 绑定 |
| `i18n` | 重新生成 slang 文案 |
| `migrations` | 生成 drift 的 schema 快照和逐步迁移代码 |
| `gen` | `gen-rust` + `i18n` |
| `deps` | 输出包依赖图 |
| `clean` | 清理编辑器产物与构建钩子缓存 |

## 测试

```bash
dart tool/task.dart test                       # 默认：整个分支
dart tool/task.dart test --diff=<ref>          # 换一个基准
dart tool/task.dart test --all                 # 全仓
```

- 默认基准是与 `origin/develop` 的 merge-base。未提交和未跟踪的文件也算改动。
- 「受影响」指相对基准有改动的包，加上它们的传递依赖方。根 `pubspec.yaml` 有改动或传了 `--all` 时跑全部。
- 受影响的包的 `test/` 目录会交给仓库根目录下的一次 `flutter test`。构建钩子和前端编译器因此只跑一次，不会每个包各跑一次。
- 只有旧版数据库迁移测试需要设置 `ISAR_TEST_DYLIB` 指向动态库，其余无需额外配置。

::: warning
在仓库根目录单独执行 `flutter test` 找不到任何测试，因为根目录没有 `test/`。请始终使用 `task.dart`。
:::

## Rust 与编辑器检查

命令见 [CONTRIBUTING.zh.md 的提 PR 之前一节](https://github.com/ZhuJHua/moodiary/blob/develop/CONTRIBUTING.zh.md#提-pr-之前)。Rust 的循环遍历的是 `packages/foundation/*/rust`。按具体包名单跑容易漏掉 `moodiary_rust`。

## Melos

`melos bootstrap` 用于激活 workspace 与重建 IDE 模块文件。`melos list`、`melos run <script> --category <layer>` 可按层过滤。代码生成、检查与测试请使用 `task.dart`，它会按正确的顺序执行各步骤。
