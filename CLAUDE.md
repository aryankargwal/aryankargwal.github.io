# Claude Code Instructions

This is Aryan Kargwal's personal portfolio site built with Astro, deployed to GitHub Pages from the `master` branch.

## How Writing Is Displayed

All writing links (articles, blog posts, research) live in **`src/data/content.json`** — not in `src/content/blog/`. There are three sections:

| Section | Where it renders | Purpose |
|---|---|---|
| `systems_writing` | Homepage + `/blogs` page | Strategy, product, architecture articles |
| `technical_blogs` | Homepage + `/blogs` page | Engineering deep-dives, tutorials |
| `research_talks` | Homepage carousel only | YouTube videos and talks |

The homepage **BlogCarousel** shows items from all three sections where `"featured": true`, sorted by date (newest first).

## Adding a New Writing Link

Edit `src/data/content.json` and add an entry to the correct section.

**`systems_writing` entry schema:**
```json
{
  "title": "Article title",
  "platform": "Publication name (e.g. Arize AI, SeedToScale)",
  "category": "One of: Analysis | Architecture | Strategy | Product | Engineering | Security | Tools & Platforms | Market Analysis",
  "url": "https://...",
  "date": "YYYY-MM-DD",
  "excerpt": "One or two sentence summary shown on the card.",
  "featured": true
}
```

**`technical_blogs` entry schema:**
```json
{
  "title": "Article title",
  "platform": "Publication name (e.g. Dev.to, Botpress)",
  "category": "Short category label (e.g. Agent Ops, RL, Engineering)",
  "url": "https://...",
  "date": "YYYY-MM-DD",
  "excerpt": "One or two sentence summary.",
  "featured": true
}
```

**`research_talks` entry schema:**
```json
{
  "title": "Video title",
  "platform": "YouTube",
  "type": "Tutorial | Demo | PhD Talk",
  "url": "https://www.youtube.com/watch?v=...",
  "date": "YYYY-MM-DD",
  "excerpt": "One sentence description.",
  "badge": "Short topic label (e.g. VLM, Botpress, Agent Ops)",
  "featured": true
}
```

**Steps:**
1. Identify which section the content belongs to
2. Add the JSON object at the **top** of the relevant array (newest first)
3. Set `"featured": true` to include it in the homepage carousel
4. Commit with message: `content: add <title>`
5. Push to `master`

## What NOT to do
- Do not add entries to `src/content/blog/` — that collection is not rendered anywhere on the site
- Do not edit `astro.config.mjs`, `tailwind.config.mjs`, or any config file
- Do not touch anything in `css/`, `js/`, `lib/`, or `public/` unless explicitly asked
- Do not change the JSON key names in `content.json`
