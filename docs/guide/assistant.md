# AI assistant

Moodiary comes with a built-in AI assistant that understands your diary. You can chat with it, get help sorting out your moods, search directly, or even have it write entries for you.

## Providers and on-device models

### 1. Connect an online service

Any service that speaks one of the following protocols is supported, including the official API and various self-hosted gateways:

- **OpenAI Chat Completions**
- **OpenAI Responses**
- **Anthropic Messages**

Create a new provider under **Settings → AI Assistant** and fill in the [base URL, API key, and model](../services/ai). Common providers ship with built-in presets, so you can pick one and just paste in your key.

### 2. On-device models

Beyond the provider that powers chat, the app ships with two small models that run **fully offline** once downloaded:

- **Mood suggestion**: analyzes what you write on-device and suggests a mood;
- **Semantic search**: enable it in Settings, then describe what you're looking for in one sentence — see [Semantic search](./organize#semantic-search).

Both models are downloaded from Settings; afterwards no network is required and nothing is ever sent anywhere.

::: tip Chat always goes through a provider
Chat and diary tool calls are handled by your configured provider — on-device models don't take part in chat. To keep third-party cloud services out of the loop entirely, self-host an inference service like Ollama or LM Studio; see [AI models](../services/ai).
:::

## What it can do

The assistant can call a set of controlled tools to work with your diary:

- Query and semantically search your diary;
- Create, update, and delete entries (always with your explicit confirmation);
- List your categories;
- Remember preferences you tell it;
- Run JavaScript in a controlled sandbox to process data.

::: warning
Any write or delete action asks for your confirmation first. Keep an eye on each step the assistant takes.
:::

## Privacy

- Chat goes through your configured provider, and only the context you actively send leaves the device;
- Mood suggestion and semantic search run on-device, fully offline;
- A disclaimer is shown on first use, and the assistant stays disabled until you accept it.
