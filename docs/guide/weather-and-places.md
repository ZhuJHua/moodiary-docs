# Weather, places and footprints

Moodiary can write "where you were and what the weather was like" into your entries, and replay the path you've walked on a map.

## Weather

### Log the weather

When editing an entry you can pick the weather by hand; or turn on the auto-fetch switch under **Settings → Services → Weather** so the app records the current weather automatically when you save.

### Configure the weather service

Auto-fetching the weather needs a [QWeather](../services/weather) API key — see [Weather service setup](../services/weather).

::: tip
QWeather offers a free tier for individual developers, which is more than enough for everyday use.
:::

## Places and footprints

### Frequently visited places

You can save places you go often — home, the office, the gym — and pick them with one tap when writing, instead of locating yourself each time. Manage your places on the **Place management** screen.

### Footprint map

The map screen drops a pin at every place you've recorded; tap one to read what you wrote that day.

### Configure the map service

Map features are provided by [Tianditu](../services/map), which needs a free API key — see [Map service setup](../services/map).

## Privacy notes

- Location is read only when you save an entry or manage places; it is never uploaded in the background;
- Weather and map requests go straight to the respective provider — Moodiary routes through no intermediate server.
