# 测试

Moodiary 的测试分布在 Dart、Rust 与编辑器三条线上，CI 会在每次 Pull Request 上全部执行。

## Dart

```bash
dart tool/task.dart test          # 受影响的包
dart tool/task.dart test --all    # 全仓
dart tool/task.dart test-mobile   # 仅 mobile/
```

- 「受影响」依据 `--diff=<ref>`（默认 `HEAD`，含未提交与未跟踪文件）计算，再加上这些包的传递依赖方；
- 串行执行；
- 只有旧版数据库迁移测试需要 `ISAR_TEST_DYLIB` 环境变量。

### 仓库测试的写法

仓库层测试直接构造一个内存数据库：

```dart
final db = MoodiaryDatabase.forTesting(/* ... */);
final repo = DiaryRepository(db);
```

### 涉及 DI 的测试

在容器中替换为 fake，并在结束后重置：

```dart
setUp(() {
  getIt.registerSingleton<DiaryRepository>(FakeDiaryRepository());
});

tearDown(() => getIt.reset);
```

## Rust

对全部六个原生包执行 clippy 与测试：

```bash
for d in packages/foundation/*/rust; do
  (cd "$d" && cargo clippy --all-targets -- -D warnings && cargo test)
done
```

::: warning
不要用 `cargo test --workspace` 之类的通配方式在单个目录里跑，容易漏掉 `moodiary_rust`。
:::

## 编辑器（WebView）

```bash
cd packages/feature_base/moodiary_editor/editor
corepack pnpm type-check
corepack pnpm test
```

## CI 上跑什么

| Job | 内容 |
| --- | --- |
| Dart | `check_generated` → `flutter analyze` → `check_layers` → `task.dart test --all` |
| Rust | 六个原生包的 `cargo clippy -D warnings` 与 `cargo test` |
| Editor | `pnpm type-check` 与 `pnpm test` |

## 注意事项

- 构建钩子在测试（宿主平台）下提前返回，因此 **Dart 测试不会加载 Rust 库**，原生逻辑必须由 Rust 自己的测试覆盖；
- 测试生成文件缺失会直接失败，先跑 [代码生成](/dev/codegen)；
- 在仓库根目录执行 `flutter test` 什么都找不到，请始终使用 `task.dart`。
