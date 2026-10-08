# Common commands

Everything you do day to day goes through `tool/task.dart`, run from the repository root:

```bash
dart tool/task.dart <command>
```

The commands for setting up, running and checking a change before a PR are in [CONTRIBUTING.md](https://github.com/ZhuJHua/moodiary/blob/develop/CONTRIBUTING.md#development-setup). This page lists every command and explains how testing works.

## Command reference

| Command | What it does |
| --- | --- |
| `setup` | `flutter pub get` |
| `run` | `flutter run`; extra arguments go after `--` |
| `build-apk` | Builds the Android APK |
| `build-ios` | Builds for iOS |
| `analyze` | Generated-output consistency + layer check + `flutter analyze` |
| `check-layers` | Runs only the layer check |
| `test` | Runs the tests of the affected packages (see below) |
| `test-mobile` | Runs only the tests in `mobile/` |
| `build-runner` | Runs `build_runner` across the workspace and formats the result |
| `gen-rust` | Regenerates the Rust FFI bindings |
| `i18n` | Regenerates the slang copy |
| `migrations` | Writes the drift schema snapshot and the step-by-step migration code |
| `gen` | `gen-rust` + `i18n` |
| `deps` | Prints the package dependency graph |
| `clean` | Clears the editor output and the build hook cache |

## Testing

```bash
dart tool/task.dart test                       # default: the whole branch
dart tool/task.dart test --diff=<ref>          # compare against another ref
dart tool/task.dart test --all                 # the whole repository
```

- By default the baseline is the merge-base with `origin/develop`. Uncommitted and untracked files count as changes too.
- "Affected" means the packages that changed relative to the baseline, plus everything that transitively depends on them. A change to the root `pubspec.yaml`, or `--all`, runs everything.
- The affected packages' `test/` directories are passed to a single `flutter test` run at the repository root. Build hooks and the frontend compiler therefore run once instead of once per package.
- Only the legacy database migration tests need `ISAR_TEST_DYLIB` pointing at the dynamic library. Nothing else requires setup.

::: warning
Running `flutter test` on its own in the repository root finds no tests, because the root has no `test/` directory. Always go through `task.dart`.
:::

## Rust and editor checks

The commands are in the [Before you open a PR section of CONTRIBUTING.md](https://github.com/ZhuJHua/moodiary/blob/develop/CONTRIBUTING.md#before-you-open-a-pr). The Rust loop iterates over the glob `packages/foundation/*/rust`. A hand-written list of package names makes it easy to miss `moodiary_rust`.

## Melos

`melos bootstrap` activates the workspace and rebuilds the IDE module files. `melos list` and `melos run <script> --category <layer>` filter by layer. For code generation, checks and tests, use `task.dart`, because it runs the steps in the right order.
