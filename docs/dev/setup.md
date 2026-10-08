# Development environment

Moodiary is a **Flutter + Rust** monorepo. The tool versions and the setup commands are listed in the [Development setup section of CONTRIBUTING.md](https://github.com/ZhuJHua/moodiary/blob/develop/CONTRIBUTING.md#development-setup). This page adds the notes that the guide does not cover.

## Notes on the toolchain

- **Rust does not need nightly.** Each native package pins stable **1.95.0** in its `rust/rust-toolchain.toml`. `rustup` installs that toolchain and the matching targets on the first build.
- **Android** needs the SDK for API 36 in addition to the JDK and NDK listed in the guide.
- The only build targets supported today are **Android** (`build-apk`) and **iOS** (`build-ios`).

## Notes on the first run

- `melos bootstrap` activates the pub workspace and regenerates the IDE module files. It does **not** run code generation.
- The editor's (`moodiary_editor`) WebView assets and the native libraries are built by build hooks on your first run or build. `corepack` has to be available for the editor build. The first run therefore takes a while.

## Next steps

- [Repository structure and layers](./architecture): how the code is organized.
- [Common commands](./workflow): the `task.dart` commands and how testing selects packages.
- [FAQ](./faq): start here when a build fails.
