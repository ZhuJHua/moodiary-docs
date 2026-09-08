# Release process

A release is a collaboration between a script and CI. The **CHANGELOG is always generated locally**, never in CI.

## Versions and tags

- The version number lives in `mobile/pubspec.yaml`.
- The tag is only created once the release PR is merged and the draft release is published.

## Steps

Run this on `develop`, with a clean working tree that is in sync with the remote:

```bash
dart tool/release.dart --bump patch     # or name the version explicitly: dart tool/release.dart 2.9.0
```

The script will:

1. update the version number in `mobile/pubspec.yaml`;
2. generate the changelog section for the new version with git-cliff and prepend it to `CHANGELOG.md`;
3. open a `chore(release): X.Y.Z` Pull Request;
4. trigger `build.yml` from the release branch.

From there:

5. CI builds the artifacts and creates a **draft release** (no tag yet at this point);
6. review the CHANGELOG section and the artifacts by hand, then **merge the PR**;
7. the merge triggers `publish-release.yml`, which publishes the draft release — this is the step that actually creates the tag and posts a notification to the Telegram channel.

## Keeping a PR out of the CHANGELOG

Any one of these is enough:

- the body of the squashed commit contains `Changelog: skip`;
- the title uses one of the skipped scopes: `chore(deps)`, `chore(readme)`, `chore(pr)`, `chore(pull)`;
- release commits themselves (`chore(release)`) are skipped automatically.

## Commit message conventions

CI builds the CHANGELOG and labels PRs automatically based on [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) prefixes, so use `feat:`, `fix:`, `chore:` and the like.

## Build artifacts

- Android: `flutter build apk --release --target-platform android-arm64 --obfuscate --split-debug-info=splitMap`.
- Requires Java 21, Flutter (as pinned by `.fvmrc`), Node 24 and `cargo-about` 0.9.2 (for the third-party license manifest).
