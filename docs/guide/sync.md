# Backup and sync

Moodiary supports three sync methods plus a local backup, all with optional end-to-end encryption.

## Sync methods compared

| Method | Best for | Setup needed |
| --- | --- | --- |
| **LAN sync** | Two devices on the same Wi-Fi | No account |
| **WebDAV** | Cloud drives like Jianguoyun, Nextcloud | Server address, account |
| **S3 / MinIO** | Self-hosted object storage, most flexible capacity | Endpoint, keys |

All methods are **incremental** — only changed data is transferred.

## End-to-end encryption

Once encryption is on, you only set a **sync password**:

- The app derives a key from it (Argon2id) and encrypts your data with AES-GCM;
- The key that actually encrypts your data never leaves the device in plaintext;
- Your provider (cloud drive or object storage) only ever sees ciphertext.

::: warning Your sync password can't be recovered
If you forget your sync password, cloud data cannot be decrypted. Keep it somewhere safe.
:::

## LAN sync

1. Connect both devices to the same Wi-Fi and open Moodiary on each;
2. On one device go to **Sync → LAN** and choose send or receive;
3. The app discovers the other device automatically via mDNS, and transfer starts once you confirm.

Transfer uses an entry-level AES-256 encrypted archive — no account setup required.

::: tip
If the other device can't be found, check whether your router has "AP isolation" (client isolation) enabled.
:::

## WebDAV

Under **Sync → WebDAV**, fill in:

| Field | Notes |
| --- | --- |
| Server address | e.g. `https://dav.jianguoyun.com/dav/` |
| Username | Your cloud account |
| Password | The app password (some providers require a separately generated authorization token) |

For details see [WebDAV configuration](../services/webdav).

## S3 / MinIO

Under **Sync → S3**, fill in the Endpoint, Bucket, Region, Access Key, and Secret Key, and choose whether to use HTTPS. This works with a self-hosted MinIO or any S3-compatible object storage — see [S3 / MinIO configuration](../services/s3).

## Backup

If you don't plan to sync across devices, the simplest safeguard is to periodically generate a backup in **Settings** and store it elsewhere. Backup archives are also protected by end-to-end encryption.
