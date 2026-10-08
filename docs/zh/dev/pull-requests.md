# Pull Request

PR 会 squash 合并。**PR 标题就是提交标题**，**PR 描述就是提交正文**。CHANGELOG 由这些提交生成，所以标题和描述要遵循下面的规则。两者都用英文写。

## 提 PR 之前

- 从 `develop` 拉分支，PR 提到 `develop`。`main` 只接收发版。
- **一个 PR 只做一件事。** 无关的重构和格式化请分开提，并且先在 issue 里达成一致。
- 跑覆盖你改动范围的检查（见 [测试](./testing#running-the-same-checks-locally)）。所有运行了的 CI 任务都通过后才会评审。
- 重新生成并提交生成文件，新增文案 `zh` 和 `en` 都要写。
- UI 改动请在真机或模拟器上试过，并附截图。
- 如果使用了 AI 工具，请阅读 [AI 政策](./ai-policy)。

## 标题

标题遵循 [约定式提交 1.0.0](https://www.conventionalcommits.org/zh-hans/v1.0.0/)：

```
<type>[(scope)][!]: <description>
```

| 部分 | 规则 |
| --- | --- |
| `type` | 小写，取下表之一 |
| `scope` | 可选，小写，功能或包名，如 `diary`、`sync`、`editor`、`moodiary_data`、`i18n/web` |
| `!` | 可选，标记破坏性变更 |
| `description` | 跟在 `: ` 后，祈使语气，结尾不加句号：写 `add`，不写 `added` 或 `adds` |

| 类型 | 用途 | CHANGELOG 分组 |
| --- | --- | --- |
| `feat` | 用户可见的新功能 | Features |
| `fix` | 修 bug | Bug Fixes |
| `perf` | 性能优化 | Performance |
| `refactor` | 既不修 bug 也不加功能的代码改动 | Refactor |
| `docs` | 只改文档 | Documentation |
| `test` | 只改测试 | Testing |
| `style` | 格式调整，行为不变 | Styling |
| `build` | 构建系统、hook、工具链 | Miscellaneous |
| `ci` | CI 工作流 | Miscellaneous |
| `chore` | 其它不改动产品代码的杂项 | Miscellaneous |
| `revert` | 回滚之前的提交 | Revert |

```
feat(diary): add a year view to the calendar
fix(sync): degrade when the remote rejects a conditional write
refactor(rag)!: move the sqlite-vec binding into its own package
```

标题不符合时，`PR title` 检查会失败；修改标题后它会重新运行。它还会按类型给 PR 打标签。标题带 `!` 或描述里有 `BREAKING CHANGE:` footer 时，会再加上 `breaking` 标签。

GitHub 的 Revert 按钮生成的标题形如 `Revert "…"`，过不了检查。请改成 `revert: <原提交标题>`，并在描述里写 `Refs: <sha>`。

## 描述与 footer {#description-and-footers}

按 PR 模板填写：改了什么、为什么、怎么测的，以及是否使用了 AI 工具。用不到的段落删掉。

footer 放在描述末尾，和上文之间隔一个空行，每行一个，格式为 `Token: value` 或 `Token #value`：

| footer | 作用 |
| --- | --- |
| `BREAKING CHANGE: <破坏了什么、怎么迁移>` | 标记为破坏性变更。可单独用，也可与标题里的 `!` 同时用 |
| `Changelog: skip` | 不写进 `CHANGELOG.md` |
| `Closes #123` | 合并后关闭对应 issue |

破坏性变更指：已有数据、备份、同步远端或局域网对端不经迁移就无法继续使用，或者删除了用户可见的功能。修改数据库结构、同步布局或局域网协议时，必须在 `BREAKING CHANGE:` footer 里写明，并附上迁移方案。

## CHANGELOG

维护者发版时用 git-cliff 生成 `CHANGELOG.md`，按上表的类型分组。

- 这些 scope 总是被跳过：`chore(deps)`、`chore(readme)`、`chore(pr)`、`chore(pull)`、`chore(release)`。
- 破坏性 PR 总会出现在 CHANGELOG 里，即使用了会被跳过的 scope。
- PR 里不要改版本号或 `CHANGELOG.md`。
