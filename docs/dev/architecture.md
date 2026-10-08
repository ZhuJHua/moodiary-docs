# Architecture

Moodiary is a pub-workspace monorepo. `mobile/` is the only Flutter app (Android and iOS). About 30 shared packages live under `packages/` in four layers. The root `pubspec.yaml` coordinates the workspace and Melos and contains no app code.

This page covers the rules you will hit in review. The repository's [`CLAUDE.md`](https://github.com/ZhuJHua/moodiary/blob/develop/CLAUDE.md) is the detailed reference for each area (DI, routing, i18n, KV, search, Rust packages). Read the relevant section before you change an area.

## Layers

```
foundation  ->  core  ->  feature_base  ->  feature  ->  mobile/
```

| Layer | Contents |
| --- | --- |
| `foundation` | Leaf packages with no internal dependencies: DI container, logging, i18n, router primitives, the `mui` design system, utilities, and the native `fast_*` / `moodiary_rust` packages. |
| `core` | Domain-free infrastructure: platform, HTTP, KV storage, file layout, theme. `core` knows no domain type such as `Diary` or `Category`. |
| `feature_base` | Models, the drift database and repositories, shared components, migration, preferences, on-device ML, the media picker and the editor. |
| `feature` | `diary`, `sync`, `export`, `assistant`, `media`, `lock`. |
| `mobile/` | The composition layer: DI setup, routing, shell, lifecycle and settings. |

`core` and `feature_base` also have an order inside the layer. Packages at the same tier never import each other.

## Rules CI enforces

`tool/check_layers.dart` runs in `analyze` and in CI, against a zero baseline in `tool/layer_baseline.txt`. It rejects:

- a package depending on a layer to its right;
- a feature importing another feature. Shared logic moves down a layer; logic that combines features goes in `mobile/lib/app`;
- a violation of the order inside `core` or `feature_base`;
- business code importing `package:flutter/material.dart`. Import `package:mui/mui.dart` instead. `mui` re-exports Material and adds what Material lacks, with an `M` prefix.

Other rules checked in review:

- Dependency versions are pinned exactly, with no `^`.
- A new third-party dependency goes into the package in the layer that uses it, not into `mobile/`.
- A new package is registered in the root `pubspec.yaml` under `workspace` and in the Melos `categories`.

## Native code

- Rust code lives in `packages/foundation/*/rust`. There are six native packages. Each owns its crate, native library, build hook, `rust-toolchain.toml` and `Cargo.lock`. There is no `[workspace.dependencies]`; `tool/check_generated.dart` keeps the shared pins identical.
- Dart talks to Rust only through [flutter_rust_bridge](https://cjycode.com/flutter_rust_bridge/). After changing `rust/src/api`, run `dart tool/task.dart gen-rust`.
- Libraries are compiled by Native Assets build hooks. Each package exposes an idempotent `Xxx.ensureInitialized()`. Opaque handles such as `CancelToken` cannot cross library boundaries, so each library constructs its own.
- Full-text search uses [`sqlite3_simple`](https://github.com/ZhuJHua/sqlite3_simple), a fork of the `simple` FTS5 tokenizer pinned as a git dependency. It is the one native library outside FRB.

## Conventions that are not obvious

- **Barrels** export whole files without `show`. Hide file-private symbols with `_`, package-private ones with `@internal` plus a `hide` on the barrel, and test-only ones with `@visibleForTesting`.
- **DI** uses get_it + injectable. Annotate the implementation class. There is one `configureDependencies`, in `mobile/lib/app/di/di.dart`. Resolve with `getIt<X>()` and never call `getIt.register*` by hand outside tests. Riverpod holds UI state only.
- **Routing** uses go_router with no path or query parameters. Route classes live in `moodiary_router` and pass a `params` map of JSON scalars through `extra`. Each page has a `factory X.fromRoute(GoRouterState)`.
- **i18n** uses [slang](https://pub.dev/packages/slang). App strings live in `i18n/flutter`, editor-page strings in `i18n/web`. Add every new string in both `zh` and `en`. Use `context.l10n` in widgets and the top-level `l10n` in services. Prompts and tool descriptions sent to a model are hardcoded English and stay out of i18n.
- **KV storage** (MMKV) is synchronous. Secrets such as API keys go in `MoodiarySecureKVs`. The app-lock passcode is only read or written through `AppLockPin`.
- **Data formats**: a change to the database schema, the sync layout or the LAN protocol needs a migration path. Describe it in a `BREAKING CHANGE:` footer, as the PR template asks. See [Pull requests](./pull-requests#description-and-footers).
