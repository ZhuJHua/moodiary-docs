# Collections, search and calendar

Once you have many entries, finding them is everything. Moodiary gives you four ways to get content back.

## Collections

From the home screen's sidebar you can create and manage collections (for example "Work", "Life", or "Reading notes"), and assign an entry to one when you write it. The list view can be filtered by collection.

## Full-text search

The search box at the top of the home screen uses a **SQLite FTS5** full-text index:

- Results return in milliseconds;
- It handles Chinese, English, and mixed input;
- Results are ranked by relevance.

## Semantic search

Full-text search depends on exact keywords. If all you remember is "that downbeat entry about the rain", turn on **semantic search**:

- The first time, you download a local embedding model in Settings (tens of MB; once downloaded it runs fully offline);
- After that you can search with a natural-language description, and results are ranked by semantic relevance.

The model and its index are also stored locally — nothing is uploaded.

## Calendar view

The calendar view shows each day's entries month by month, great for looking back at "how much I wrote this month". Tap a day to jump to that day's entries.

## Media library

Every image, audio clip, and video you've ever inserted shows up in the **Media library**, where you can browse by type or jump straight to the entry that uses it.

## Trash

Deleted entries go to the trash first and can be restored at any time. The trash can also be filtered by collection, so nothing is truly "lost forever".
