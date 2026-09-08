# QWeather

Weather is powered by [QWeather](https://www.qweather.com/) and is used to auto-record the weather when you write an entry.

## Get an API key

1. Sign up for [QWeather Development Services](https://console.qweather.com/).
2. In the console, create a **project**, then create an **API Key** under that project.
3. Note down the **API Key** and the **API Host** it belongs to (something like `xxxx.qweatherapi.com`).

::: warning The API Host is required
Since QWeather v3, every account has its own dedicated request endpoint. Filling in only the key without the host will keep failing requests.
:::

## Configure in Moodiary

Go to **Settings → Services → Weather**:

| Field | Description |
| --- | --- |
| API Key | The key created above |
| API Host | Your dedicated request domain |

Once configured, go back to **Settings → Services** and enable:

- **Weather feature**: records weather in your diary.
- **Auto-fetch weather**: writes the current weather automatically when you save an entry.

## FAQ

- **Requests keep failing**: check that the API Host matches the domain bound to the key in the console; the free subscription only takes effect after identity verification.
- **Free quota**: the developer subscription includes a daily free request allowance, enough for everyday use; if you exceed it, you can turn off auto-fetch.
