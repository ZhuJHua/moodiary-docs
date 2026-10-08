# Contributing

Moodiary is an open-source Flutter + Rust diary app licensed under [AGPL-3.0](https://github.com/ZhuJHua/moodiary/blob/develop/LICENSE). Bug reports, ideas, translations, documentation and code are all welcome. By submitting a PR you agree that your contribution is licensed under AGPL-3.0.

## Ways to help

- **Report a bug or suggest a feature** with one of the [issue templates](https://github.com/ZhuJHua/moodiary/issues/new/choose). Search first; a 👍 on an existing issue helps more than a duplicate.
- **Translate**: app strings live in `i18n/flutter` and editor strings in `i18n/web`, as `zh` and `en` JSON files.
- **Improve these docs**: they live in [moodiary-docs](https://github.com/ZhuJHua/moodiary-docs). Every page has an "Edit this page on GitHub" link.
- **Write code**: read the process below, then [Development setup](./setup).

## Where to ask

Ask questions on the [forum](https://answer.moodiary.net), in the Telegram group [openmoodiary](https://t.me/openmoodiary) or in QQ group 760014526. Use issues for bugs and feature requests only.

## The PR process

1. **Discuss first.** Small fixes can go straight to a PR. For a new feature or a large refactor, open an issue and agree on the direction before you write the code.
2. **Branch from `develop`** in your fork, and open the PR against `develop`.
3. **One topic per PR.**
4. **Follow the [PR conventions](./pull-requests).** The title is a Conventional Commit, and the title and description are in English.
5. **CI must be green.** Run the [checks](./testing#running-the-same-checks-locally) locally first.
6. **AI tools are welcome.** You still review, understand and own the result; see the [AI policy](./ai-policy).

Releases are cut by the maintainer.

## Developer guide

| Page | Covers |
| --- | --- |
| [Development setup](./setup) | Toolchain beyond Flutter, first run, generated code, troubleshooting |
| [Architecture](./architecture) | Layers, rules CI enforces, native code, conventions |
| [Testing](./testing) | CI jobs, running checks locally, writing tests |
| [Pull requests](./pull-requests) | Title format, footers, changelog |
| [AI policy](./ai-policy) | Using AI tools in contributions |

::: tip Code of conduct
Be kind and respectful. Harassment is removed, and repeat offenders are barred from taking part.
:::
