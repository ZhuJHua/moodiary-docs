# Development environment

Moodiary is a **Flutter + Rust** monorepo. This page takes you from nothing to a working development environment.

## Tools you need

| Tool | Version | Notes |
| --- | --- | --- |
| [FVM](https://fvm.app/) | latest | Manages the Flutter version; every command goes through it |
| Flutter | **3.47.2** (pinned by `.fvmrc`) | Installed automatically by `fvm use` |
| Rust | **1.95.0** stable (pinned by each package's `rust/rust-toolchain.toml`) | Requires `rustup` |
| Node.js + corepack | `^20.19.0` or `>=22.12.0` | The editor's WebView assets are bundled with pnpm by a build hook |
| JDK | **21** | The Android build daemon is pinned to 21 |
| Android SDK | API 36, NDK 28.2.13676358 | |
| Xcode | New enough for the iOS 16.4 deployment target | iOS development only |
| [melos](https://pub.dev/packages/melos) | 8.x | Workspace coordination |
| [cargo-about](https://github.com/EmbarkStudios/cargo-about) | 0.9.2 | Generates the third-party license manifest at build time |

::: warning Rust does not need nightly
The toolchain is **stable 1.95.0**, selected automatically by the `rust-toolchain.toml` of each native package. `rustup` installs the matching target for you on the first build.
:::

## Bootstrapping

```bash
git clone https://github.com/ZhuJHua/moodiary.git
cd moodiary

fvm use                    # install and select Flutter 3.47.2
dart pub global run melos bootstrap   # or, with melos installed globally: melos bootstrap
dart tool/task.dart setup  # flutter pub get
```

A couple of things worth knowing:

- `melos bootstrap` activates the pub workspace and regenerates the IDE module files — it does **not** run code generation.
- The WebView assets for the editor (`moodiary_editor`) are produced by a build hook on your first run/build, so `corepack` has to be available.

## Verifying your setup

```bash
dart tool/task.dart analyze   # generated-output consistency + layer check + flutter analyze
dart tool/task.dart test      # runs the affected packages
```

## Running the app

```bash
dart tool/task.dart run               # flutter run, picks a device automatically
dart tool/task.dart run -- --release  # extra flutter arguments go after --
```

The only build targets supported today are **Android** (`build-apk`) and **iOS** (`build-ios`).

## Next steps

- [Repository structure and layers](./architecture): how the code is organized.
- [Common commands](./workflow): every command you need day to day.
- [FAQ](./faq): start here when a build fails.
