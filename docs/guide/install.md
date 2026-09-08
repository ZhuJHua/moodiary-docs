# 安装与更新

## 支持的平台

| 平台 | 状态 | 获取方式 |
| --- | --- | --- |
| Android | ✅ 已发布 | [GitHub Releases](https://github.com/ZhuJHua/moodiary/releases) 下载 APK |
| iOS | 🚧 暂无公开发布渠道 | 可参照[开发者文档](/dev/setup)自行编译 |
| Windows / macOS / Linux | 🚧 重构中 | 敬请期待 |

::: tip 系统要求
Android 需要 **9.0（API 28）** 及以上；iOS 需要 **16.4** 及以上。
:::

## 安装 Android 版

1. 打开 [Releases](https://github.com/ZhuJHua/moodiary/releases) 页面；
2. 在最新版本下找到 `apk` 附件并下载；
3. 安装时若系统提示「未知来源应用」，允许安装即可。

安装包仅面向 `arm64-v8a` 设备，即近几年的绝大多数手机与平板。

## 更新

Moodiary 不会自动更新。新版本发布时，重新下载安装包覆盖安装即可，数据不会丢失。

::: warning 覆盖安装前
虽然覆盖安装是安全的，但定期[备份](/guide/sync#备份)永远是好习惯。
:::

## 数据在哪里

Moodiary 的所有数据都保存在应用的私有目录中，使用本地 SQLite 数据库存储。卸载应用会**永久删除**这些数据，因此：

- 换机或重装前，请先[导出](/guide/export-import)或[同步](/guide/sync)你的数据；
- 应用无法读取其它应用目录，系统「清除存储数据」同样会清空日记。
