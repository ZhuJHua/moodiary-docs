# Common commands

Everything you do day to day goes through `tool/task.dart`, run from the repository root:

```bash
dart tool/task.dart <command>
```

## Command reference

| Command | What it does |
| --- | --- |
| `setup` | `flutter pub get` |
| `run` | `flutter run`; extra arguments go after `--` |
| `build-apk` | Builds the Android APK |
| `build-ios` | Builds for iOS |
| `analyze` | Generated-output consistency + layer check + `flutter analyze` |
| `check-layers` | Runs only the layer check |
| `test` | Runs the affected packages (see below) |
| `test-mobile` | Runs only the tests in `mobile/` |
| `build-runner` | Runs `build_runner` across the workspace and formats the result |
| `gen-rust` | Regenerates the Rust FFI bindings |
| `i18n` | Regenerates the slang copy |
| `gen` | `gen-rust` + `i18n` |
| `deps` | Prints the package dependency graph |
| `clean` | Clears the editor output and the build hook cache |

## Running and building

```bash
dart tool/task.dart run                # development
dart tool/task.dart run -- --release   # extra flutter arguments go after --
dart tool/task.dart build-apk          # APK and iOS are the only two targets
```

## Testing

```bash
dart tool/task.dart test                 # default: packages touched since HEAD
dart tool/task.dart test --diff=origin/develop
dart tool/task.dart test --all           # the whole repository, which is what CI uses
```

- "Affected" means the packages that changed relative to the baseline, plus everything that transitively depends on them.
- Tests run **serially**, so that packages don't starve each other by running in parallel.
- Only the legacy database migration tests need `ISAR_TEST_DYLIB` pointing at the dynamic library; nothing else requires setup.

::: warning
Running `flutter test` directly in the repository root finds no tests at all. Always go through `task.dart`.
:::

## Code generation

```bash
dart tool/task.dart build-runner   # injectable / freezed / json_serializable
dart tool/task.dart gen-rust       # after changing rust/src/api
dart tool/task.dart i18n           # after changing *.i18n.json
```

See [Code generation](./codegen) for the details.

## Checks on the Rust side

```bash
for d in packages/foundation/*/rust; do
  (cd "$d" && cargo clippy --all-targets -- -D warnings && cargo test)
done
```

Note the glob over `packages/foundation/*/rust`: iterating over a hand-written list of package names makes it easy to miss `moodiary_rust`.

## The editor (WebView)

```bash
cd packages/feature_base/moodiary_editor/editor
corepack pnpm type-check
corepack pnpm test
```

## Melos

Use `melos bootstrap` to activate the workspace and rebuild the IDE module files; `melos list` and `melos run <script> --category <layer>` let you filter by layer. For everyday code generation, checks and tests, stick to `task.dart` — it guards the order in which things run.
