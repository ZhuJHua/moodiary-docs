# Service configuration overview

Moodiary works fully offline on its own. The optional services below enhance the experience, and they're all configured from **Settings → Services**.

| Service | Purpose | Required |
| --- | --- | --- |
| [QWeather](./weather) | Auto-records the weather when you write an entry | Optional |
| [Tianditu](./map) | Place management and a footprint map | Optional |
| [WebDAV](./webdav) | Sync and back up via a cloud drive | Optional |
| [S3 / MinIO](./s3) | Sync and back up via object storage | Optional |
| [LAN sync](./lan) | Direct peer-to-peer sync on the same network | No setup needed |
| [AI models](./ai) | Online models for the AI assistant | Optional, local models also work |

::: tip Privacy
Requests for these services are sent directly from the app to the provider — Moodiary runs no relay server. Keys are stored in your system's secure storage and are not carried over by [backups](../guide/export-import#backup) or sync data.
:::

## General steps

1. Sign up on the provider's site and create an application (API key).
2. In Moodiary, go to **Settings → Services**, find the matching entry, and paste in the key.
3. Return to the relevant feature page and verify it works.

The free tier offered by most providers is usually enough for personal use.
