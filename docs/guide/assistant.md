# AI assistant

Moodiary comes with a built-in AI assistant that understands your diary. You can chat with it, get help sorting out your moods, search directly, or even have it write entries for you.

## Two ways to run it

### 1. Connect an online service

Any service that speaks one of the following protocols is supported, including the official API and various self-hosted gateways:

- **OpenAI Chat Completions**
- **OpenAI Responses**
- **Anthropic Messages**

Create a new provider under **Settings → AI Assistant** and fill in the [base URL, API key, and model](../services/ai). Common providers ship with built-in presets, so you can pick one and just paste in your key.

### 2. Fully offline local models

Prefer not to hand your content to a third party? You can download **local models**:

- A mood suggestion model that analyzes your diary on-device and gives emotional feedback;
- A semantic search model — see [Semantic search](./organize#semantic-search).

Once downloaded, no network is required and nothing is ever sent anywhere.

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

- With an online service, only the context you actively send to the assistant leaves the device;
- With a local model, the whole process runs fully offline;
- A disclaimer is shown on first use, and the assistant stays disabled until you accept it.
