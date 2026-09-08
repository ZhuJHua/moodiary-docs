# Testing

Moodiary's tests are spread across three tracks — Dart, Rust and the editor — and CI runs all of them on every Pull Request.

## Dart

```bash
dart tool/task.dart test          # the affected packages
dart tool/task.dart test --all    # the whole repository
dart tool/task.dart test-mobile   # mobile/ only
```

- "Affected" is computed from `--diff=<ref>` (default `HEAD`, including uncommitted and untracked files), plus everything that transitively depends on those packages.
- Tests run serially.
- The only tests that need the `ISAR_TEST_DYLIB` environment variable are the legacy database migration tests.

### Writing repository tests

Tests at the repository layer build an in-memory database directly:

```dart
final db = MoodiaryDatabase.forTesting(/* ... */);
final repo = DiaryRepository(db);
```

### Tests that involve DI

Swap in a fake in the container, and reset it when you are done:

```dart
setUp(() {
  getIt.registerSingleton<DiaryRepository>(FakeDiaryRepository());
});

tearDown(() => getIt.reset);
```

## Rust

Run clippy and the tests across all six native packages:

```bash
for d in packages/foundation/*/rust; do
  (cd "$d" && cargo clippy --all-targets -- -D warnings && cargo test)
done
```

::: warning
Don't try to cover everything from a single directory with something like `cargo test --workspace` — it's easy to miss `moodiary_rust` that way.
:::

## The editor (WebView)

```bash
cd packages/feature_base/moodiary_editor/editor
corepack pnpm type-check
corepack pnpm test
```

## What CI runs

| Job | Contents |
| --- | --- |
| Dart | `check_generated` → `flutter analyze` → `check_layers` → `task.dart test --all` |
| Rust | `cargo clippy -D warnings` and `cargo test` across the six native packages |
| Editor | `pnpm type-check` and `pnpm test` |

## Things to watch out for

- Build hooks return early under tests (host platform), so **Dart tests never load the Rust libraries** — native logic has to be covered by Rust's own tests.
- Tests fail outright when generated files are missing, so run [code generation](./codegen) first.
- Running `flutter test` from the repository root finds nothing. Always use `task.dart`.
