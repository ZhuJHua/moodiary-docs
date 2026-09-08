# LAN sync

LAN sync lets two devices exchange data directly over the **same network**, with nothing going through the cloud.

## How to use

1. Connect both devices to the same Wi-Fi and open Moodiary on each.
2. On the sender, go to **Sync → LAN** and choose **Send**.
3. On the receiver, choose **Receive** and wait to be discovered.
4. On the sender, select the other device and confirm to start syncing.

Discovery uses mDNS, so you **don't need to enter any address or account**.

## Transfer security

- Data is packed into entry-level **AES-256**-encrypted archives before transfer.
- The transfer protocol includes a version handshake to avoid data overwrites between old versions.
- Combine with [end-to-end encryption](../guide/sync#end-to-end-encryption) for extra content protection.

## Notes

- **Can't find the device**: check whether the router has "AP isolation / client isolation" enabled; public Wi-Fi often blocks device-to-device traffic.
- **Slow speed**: wireless speed depends on the Wi-Fi standard; 5 GHz networks are noticeably faster.
- **Version differences**: keep both devices on similar versions; before a large cross-version migration, make a [backup](../guide/export-import#backup) first.
