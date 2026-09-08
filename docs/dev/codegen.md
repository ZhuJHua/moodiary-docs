# Code generation

A large amount of code comes out of generators, and the **generated files are committed**. Whenever you change an input, regenerate and commit the output along with it, or CI will fail.

## Dart code generation (build_runner)

Covers `injectable`, `freezed`, `json_serializable` and others:

```bash
dart tool/task.dart build-runner
```

- It has to run from the **repository root**: running it only in `mobile/` misses the annotations inside the packages.
- It runs `dart format .` for you as part of the job.
- Run it when you change a DI binding annotation, a Freezed model or a JSON serialization annotation.

## Rust FFI bindings (flutter_rust_bridge)

```bash
dart tool/task.dart gen-rust
```

- Run it when you change `rust/src/api` in any native package.
- It first checks that the `flutter_rust_bridge_codegen` CLI matches the version pinned in the pubspec (a mismatch is rejected outright, so that the pinned version can't be rewritten by accident). Install the right one if needed:

  ```bash
  cargo install flutter_rust_bridge_codegen --version 2.13.0 --locked
  ```

- Once generation finishes it runs `cargo fmt` and analyze.

## Internationalization (slang)

```bash
dart tool/task.dart i18n
```

- Run it when you change a `*.i18n.json` in `moodiary_i18n` or `mui`.
- No CI check catches a forgotten regeneration, so make a point of running this yourself and committing the output.

## Doing both at once

```bash
dart tool/task.dart gen
```

## Consistency checks

`tool/check_generated.dart` runs as part of `analyze` and in CI, and is responsible for keeping things aligned across packages:

- the `Cargo.toml` files, toolchains and FRB / ffigen versions of the six native packages have to match exactly;
- an error here usually means one package was upgraded on its own, so either bring the others along or revert it.

## More about build hooks

- The native libraries are compiled by **Native Assets build hooks**, and the cache lives in `.dart_tool/hooks_runner/` at the repository root.
- `flutter clean` does **not** clear that cache. If the APK size doesn't change after you modify a Rust dependency, suspect the cache first.
- `dart tool/task.dart clean` removes both the editor output and that cache.
- Build hooks return early when the target platform equals the host platform, which is why `flutter test` never builds or loads any Rust library, editor asset or license manifest (the C hook in `moodiary_sqlite_vec` being the exception).
