# Code generation

A large amount of code comes out of generators, and the **generated files are committed**. Which command to run after which change is listed in the [Code generation section of CONTRIBUTING.md](https://github.com/ZhuJHua/moodiary/blob/develop/CONTRIBUTING.md#code-generation). This page explains what each generator does and what can go wrong.

## Dart code generation (build_runner)

`build-runner` covers `injectable`, `freezed`, `json_serializable`, Riverpod and drift.

- It has to run from the **repository root**. Running it only in `mobile/` misses the annotations inside the packages.
- It runs `dart format .` as part of the job.

## Rust FFI bindings (flutter_rust_bridge)

- `gen-rust` first checks that the `flutter_rust_bridge_codegen` CLI matches the version pinned in the pubspec. A mismatch is rejected outright, so that the pinned version can't be rewritten by accident. Install the matching CLI if needed:

  ```bash
  cargo install flutter_rust_bridge_codegen --version 2.13.0 --locked
  ```

- Once generation finishes it runs `cargo fmt` and analyze.

## Internationalization (slang)

- App translations live in `i18n/flutter/*.i18n.json`. `mui` keeps its own in `packages/foundation/mui/lib/src/i18n`. The `i18n` task regenerates both.
- The editor page's translations in `i18n/web` are compiled into the editor bundle by unplugin-vue-i18n and need no codegen step.
- No CI check catches a forgotten `i18n` run, so run it yourself and commit the output.

## Consistency checks

`tool/check_generated.dart` runs as part of `analyze` and in CI, and keeps the native packages aligned:

- the `Cargo.toml` files, toolchains and FRB / ffigen versions of the six native packages have to match exactly;
- an error here usually means one package was upgraded on its own, so either bring the others along or revert it.

## More about build hooks

- The native libraries are compiled by **Native Assets build hooks**, and the cache lives in `.dart_tool/hooks_runner/` at the repository root.
- `flutter clean` does **not** clear that cache. If the APK size doesn't change after you modify a Rust dependency, suspect the cache first.
- `dart tool/task.dart clean` removes both the editor output and that cache.
- Build hooks return early when the target platform equals the host platform. As a result `flutter test` never builds or loads any Rust library, editor asset or license manifest. The C hook in `moodiary_sqlite_vec` is the exception.
