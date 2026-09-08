# Install and update

## Supported platforms

| Platform | Status | How to get it |
| --- | --- | --- |
| Android | ✅ Released | Download the APK from [GitHub Releases](https://github.com/ZhuJHua/moodiary/releases) |
| iOS | 🚧 No public release yet | Build it yourself by following the [developer docs](../dev/setup) |
| Windows / macOS / Linux | 🚧 In progress | Coming soon |

::: tip System requirements
Android needs **9.0 (API 28)** or later; iOS needs **16.4** or later.
:::

## Install the Android app

1. Open the [Releases](https://github.com/ZhuJHua/moodiary/releases) page;
2. Find the `apk` attachment under the latest release and download it;
3. If your system warns about installing an app from an "unknown source", allow the installation to continue.

The package targets `arm64-v8a` devices — that is, the vast majority of phones and tablets from recent years.

## Update

Moodiary does not update itself. When a new version is released, just download the package again and install it over the old one; your data won't be lost.

::: warning Before installing over the old version
Overwriting is safe, but regular [backups](./sync#备份) are always a good habit.
:::

## Where your data lives

All of Moodiary's data is stored in the app's private directory, in a local SQLite database. Uninstalling the app **permanently deletes** this data, so:

- Before you switch phones or reinstall, first [export](./export-import) or [sync](./sync) your data;
- The app cannot read other apps' directories, and a system "clear storage" action will also wipe your journal.
