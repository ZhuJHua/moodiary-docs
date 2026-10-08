# Testing

## What CI runs

The `Quality & Tests` workflow runs on every PR to `develop`. A `Changes` job first looks at the changed paths and skips the jobs those paths cannot affect. Changes limited to Markdown, `docs/`, `res/` or `.github/` run none of them. All jobs that run must pass.

| Job | Runs when you change | Steps |
| --- | --- | --- |
| Dart | anything except the editor, `i18n/web` and the paths above | `check_generated`, `flutter analyze`, `check_layers`, `dart tool/task.dart test --all` |
| Rust | `packages/foundation/*/rust` (Dart runs too) | `cargo clippy --all-targets -- -D warnings` and `cargo test` in each of the six native packages |
| Editor | `packages/feature_base/moodiary_editor/editor` or `i18n/web` | `corepack pnpm type-check` and `corepack pnpm test` |

The separate `PR title` check is described in [Pull requests](./pull-requests).

## Running the same checks locally

```bash
dart tool/task.dart analyze        # check_generated + check_layers + flutter analyze
dart tool/task.dart test           # Dart tests of the affected packages

# Rust, if you touched packages/foundation/*/rust
for d in packages/foundation/*/rust; do (cd $d && cargo clippy --all-targets -- -D warnings && cargo test); done

# Editor, if you touched the editor or i18n/web
cd packages/feature_base/moodiary_editor/editor && corepack pnpm type-check && corepack pnpm test
```

Loop over the `packages/foundation/*/rust` glob. A hand-written list of `fast_*` packages misses `moodiary_rust`.

## How `task.dart test` picks tests

- It compares against the merge-base with `origin/develop` by default, so it covers the whole branch plus uncommitted and untracked files. Pass `--diff=<ref>` to compare against another ref.
- "Affected" means the changed packages plus everything that depends on them, transitively. A change to the root `pubspec.yaml`, or `--all`, runs everything.
- The affected packages' `test/` directories go to **one** `flutter test` process at the repository root. Build hooks and the frontend compiler run once for the whole run.
- `test-mobile` runs only `mobile/`'s tests. Plain `flutter test` at the root finds nothing, because the root has no `test/` directory.
- The legacy database migration tests are skipped unless `ISAR_TEST_DYLIB` points at the Isar dynamic library. CI sets it and fails if the library is missing.

## Writing tests

- **Read repository files through `repoRoot`** from `package:moodiary_lint/testing.dart`. The working directory is the repository root, not your package, so relative paths break.
- **Write only into your own `Directory.systemTemp.createTempSync()` directory.** Every package's tests share one process and one temp root.
- **Add new cases to an existing test file** when one fits. Loading each file costs about 1.5 seconds, which dominates the run time.
- **Repositories** take a real in-memory database: `XxxRepository(MoodiaryDatabase.forTesting(...))`.
- **Code above repositories** registers fakes in the container: `getIt.registerSingleton<XxxRepository>(fake)` in `setUp`, and `tearDown(getIt.reset)`.
- **Native code is not loaded in Dart tests.** Build hooks return early when the target is the host, so Rust libraries, the editor bundle and the license manifest are absent. Cover native logic with `cargo test` and editor logic with the editor's own tests. Three third-party native assets (`sqlite3_vec`, `sqlite3_simple` and `flutter_js`) are the exception and do build for the host.
