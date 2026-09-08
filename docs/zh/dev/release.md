# 发布流程

发布由脚本与 CI 协作完成，**CHANGELOG 始终在本地生成**，不会在 CI 中生成。

## 版本与标签

- 版本号写在 `mobile/pubspec.yaml`；
- tag 在 release PR 被合并、draft release 转正时才会创建。

## 步骤

在 `develop` 分支、工作区干净且与远端同步时执行：

```bash
dart tool/release.dart --bump patch     # 或显式指定版本：dart tool/release.dart 2.9.0
```

脚本会：

1. 更新 `mobile/pubspec.yaml` 中的版本号；
2. 用 git-cliff 生成新版本的变更段落，前置到 `CHANGELOG.md`；
3. 创建 `chore(release): X.Y.Z` 的 Pull Request；
4. 从 release 分支触发 `build.yml`。

之后：

5. CI 构建产物并创建一个 **draft release**（此时还没有 tag）；
6. 人工检查 CHANGELOG 段落与产物，**合并该 PR**；
7. 合并触发 `publish-release.yml`，将 draft release 转正 —— 这一步才真正创建 tag，并向 Telegram 频道推送通知。

## 让某个 PR 不进入 CHANGELOG

满足以下任一条件即可：

- 压缩后的提交正文中包含 `Changelog: skip`；
- 标题使用会被跳过的 scope：`chore(deps)`、`chore(readme)`、`chore(pr)`、`chore(pull)`；
- release 提交本身（`chore(release)`）自动跳过。

## 提交信息规范

CI 依据 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/) 前缀生成 CHANGELOG 并自动给 PR 打标签，请使用 `feat:`、`fix:`、`chore:` 等前缀。

## 构建产物

- Android：`flutter build apk --release --target-platform android-arm64 --obfuscate --split-debug-info=splitMap`；
- 需要 Java 21、Flutter（按 `.fvmrc`）、Node 24 与 `cargo-about` 0.9.2（生成第三方许可证清单）。
