# AI models

The AI assistant can connect to any **OpenAI-compatible** or **Anthropic-compatible** service — official APIs, various aggregator gateways, and locally deployed inference services (such as Ollama and LM Studio).

## Supported protocols

| Protocol | Use case |
| --- | --- |
| OpenAI Chat Completions | Most compatible services |
| OpenAI Responses | OpenAI's newer API |
| Anthropic Messages | The Claude family and compatible gateways |

## Get your config

- **Official services**: create an API key in the console of platforms like OpenAI or Anthropic.
- **Aggregator gateways**: get the Base URL and key from the gateway's docs.
- **Local services**: enable the API service in Ollama / LM Studio; the Base URL is typically something like `http://127.0.0.1:11434/v1`.

## Configure in Moodiary

Go to **Settings → AI Assistant → Providers** and add a provider:

| Field | Description |
| --- | --- |
| Name | Free-form, used to tell providers apart |
| Protocol | One of the three above |
| Base URL | Locked for presets; fill in manually for self-hosted |
| API Key | The key provided by the service |
| Default model | The model used in conversations |
| Model list | Add manually or pull from the provider |

You can also toggle capability switches for the provider:

- **Tool call**: lets the assistant search and act on your diary.
- **Reasoning**: shows the chain of thought.
- **Attachments** (vision): allows sending images.

::: tip Presets
The app ships with presets for common providers (from the public directory at [models.dev](https://models.dev/), cached for 24 hours). After picking a preset, you only need to enter the API key.
:::

## Prefer not to go online?

You can switch to a fully offline [local model](../guide/assistant#2-fully-offline-local-models) — download it in Settings and use it with no key required.

## Privacy

Context sent to the assistant only reaches the provider you configured. Keys are stored in your system's secure storage and are not carried over by [backups](../guide/export-import#backup).
