# Development setup

This page assumes you already build Flutter apps for Android or iOS. It covers what Moodiary needs on top of that: Rust native libraries, a web editor bundle and a pub workspace.

## Prerequisites

Versions are pinned in the repository. Read them from the pin file rather than from this page.

| Tool | Pinned in | Notes |
| --- | --- | --- |
| Flutter | `.fvmrc` | Use [FVM](https://fvm.app). `tool/task.dart` calls `fvm flutter` when FVM is installed. |
| Melos | root `pubspec.yaml` (`dev_dependencies`) | Activate the same version globally. |
| Rust | `packages/foundation/*/rust/rust-toolchain.toml` | Install `rustup`. It fetches the pinned stable toolchain and the targets on the first build. Nightly is not needed. |
| cargo-about | `mobile/hook/build.dart` | Generates the third-party license page. The build fails without it, and the error message gives the install command. |
| Node.js + Corepack | `engines` and `packageManager` in `packages/feature_base/moodiary_editor/editor/package.json` | Run `corepack enable`. Corepack then provides the pinned pnpm. |
| JDK | `mobile/android/gradle/gradle-daemon-jvm.properties` | The Gradle daemon requires this JDK version. |
| Android SDK and NDK | `compileSdk` and `ndkVersion` in `mobile/android/app/build.gradle.kts` | |
| Xcode | `IPHONEOS_DEPLOYMENT_TARGET` in `mobile/ios/Runner.xcodeproj` | Set your own signing team in Xcode. |
| flutter_rust_bridge_codegen | `flutter_rust_bridge` in `packages/foundation/fast_image/pubspec.yaml` | Only needed when you change `rust/src/api`. |

## First run

```bash
fvm use
melos bootstrap
dart tool/task.dart setup
dart tool/task.dart run            # extra flutter flags go after --, e.g. -- --release
```

- Run every command from the repository root through `dart tool/task.dart`. It picks the right working directory for each step.
- `melos bootstrap` activates the workspace and regenerates the IDE module files. It runs no code generation.
- The first `run` or build compiles the Rust libraries, the editor bundle and the license manifest through build hooks. Expect it to take several minutes.
- Android (`build-apk`) and iOS (`build-ios`) are the only targets. There is no desktop or web target today.

## Generated code

Generated files are committed. After you edit a source, run the matching task and commit the output:

| You changed | Run |
| --- | --- |
| Freezed, json, Riverpod, injectable or drift sources | `dart tool/task.dart build-runner` |
| `rust/src/api` in a native package | `dart tool/task.dart gen-rust` |
| `i18n/flutter/*.i18n.json` or `mui`'s strings | `dart tool/task.dart i18n` |
| drift `schemaVersion` | `dart tool/task.dart migrations` |

- `build-runner` runs over the whole workspace and formats the result. Running `build_runner` inside one package misses the others.
- `i18n/web` is compiled into the editor bundle and needs no codegen step.
- `dart tool/task.dart analyze` runs `tool/check_generated.dart`, which fails when the six native packages disagree on `Cargo.toml` pins, toolchain or FRB / ffigen versions.

Other tasks: `analyze`, `check-layers`, `test`, `test-mobile`, `deps` (prints the package graph), `gen` (`gen-rust` + `i18n`) and `clean`. Run `dart tool/task.dart` without arguments for the full list.

## Troubleshooting

**A Rust change does not show up in the app.** The build hook cache lives in `.dart_tool/hooks_runner/`, and `flutter clean` does not clear it. Run `dart tool/task.dart clean`, which also removes the editor bundle.

**The build reports missing editor assets.** The editor bundle is built with pnpm through Corepack. Check that `corepack pnpm --version` works.

**`gen-rust` refuses to run.** Your `flutter_rust_bridge_codegen` does not match the pinned version. Install the pinned one with `cargo install flutter_rust_bridge_codegen --version <version> --locked`.

**The Android build fails early.** Check the JDK version against `gradle-daemon-jvm.properties`. The Gradle distribution is downloaded from a Tencent mirror, so a restricted network may need a proxy.

**`check_generated` fails.** One native package was upgraded on its own. Bring the other five to the same versions, or revert it.

**analyze reports an i18n key as unused.** Write the key out in full as `l10n.xxx.yyy`. A local alias hides the use from the analyzer.

For layer check errors, see [Architecture](./architecture#rules-ci-enforces).
