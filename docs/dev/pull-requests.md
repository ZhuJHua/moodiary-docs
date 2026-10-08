# Pull requests

PRs are squash-merged. The **PR title becomes the commit subject** and the **PR description becomes the commit body**. The changelog is generated from those commits, so the title and description follow the rules below. Write both in English.

## Before you open one

- Branch from `develop` and target `develop`. `main` only receives releases.
- Keep to **one topic per PR**. Send unrelated refactors and formatting sweeps separately, and only after an issue agrees on them.
- Run the checks for what you touched (see [Testing](./testing#running-the-same-checks-locally)). Every CI job that runs must be green before review.
- Regenerate and commit generated files, and add new strings in both `zh` and `en`.
- For UI changes, try them on a device or emulator and attach screenshots.
- If you used AI tools, read the [AI policy](./ai-policy).

## Title

The title follows [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/):

```
<type>[(scope)][!]: <description>
```

| Part | Rule |
| --- | --- |
| `type` | Lowercase, one of the types below |
| `scope` | Optional, lowercase: the feature or package, e.g. `diary`, `sync`, `editor`, `moodiary_data`, `i18n/web` |
| `!` | Optional, marks a breaking change |
| `description` | After `: `, imperative mood, no trailing period: `add`, not `added` or `adds` |

| Type | For | Changelog section |
| --- | --- | --- |
| `feat` | A new user-facing feature | Features |
| `fix` | A bug fix | Bug Fixes |
| `perf` | A performance improvement | Performance |
| `refactor` | A code change that neither fixes a bug nor adds a feature | Refactor |
| `docs` | Documentation only | Documentation |
| `test` | Tests only | Testing |
| `style` | Formatting, no behaviour change | Styling |
| `build` | Build system, hooks, toolchains | Miscellaneous |
| `ci` | CI workflows | Miscellaneous |
| `chore` | Anything else that ships no code | Miscellaneous |
| `revert` | Reverting an earlier commit | Revert |

```
feat(diary): add a year view to the calendar
fix(sync): degrade when the remote rejects a conditional write
refactor(rag)!: move the sqlite-vec binding into its own package
```

The `PR title` check fails until the title matches, and it re-runs when you edit the title. It also labels the PR with its type, and adds a `breaking` label when the title has `!` or the description has a `BREAKING CHANGE:` footer.

GitHub's Revert button creates a title of the form `Revert "…"`, which the check rejects. Rename it to `revert: <original subject>` and put `Refs: <sha>` in the description.

## Description and footers

Fill in the PR template: what changed and why, how you tested it, and whether you used AI tools. Delete the sections that don't apply.

Footers go at the end of the description, after a blank line, one per line, in the form `Token: value` or `Token #value`:

| Footer | Effect |
| --- | --- |
| `BREAKING CHANGE: <what breaks and how to migrate>` | Marks the PR as breaking. Use it alone or together with `!` in the title |
| `Changelog: skip` | Keeps the PR out of `CHANGELOG.md` |
| `Closes #123` | Closes the issue on merge |

A breaking change is anything that stops existing data, backups, sync remotes or LAN peers from working without a migration, or that removes a user-facing feature. A change to the database schema, the sync layout or the LAN protocol must be described in a `BREAKING CHANGE:` footer together with its migration path.

## Changelog

The maintainer generates `CHANGELOG.md` with git-cliff when cutting a release, grouping commits by type as in the table above.

- These scopes are always left out: `chore(deps)`, `chore(readme)`, `chore(pr)`, `chore(pull)`, `chore(release)`.
- Breaking PRs always appear, even under a skipped scope.
- Don't bump versions or edit `CHANGELOG.md` in a PR.
