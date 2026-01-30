# How to Write Blog Posts on Your Portfolio

## Quick Start

1. **Create a new file** in `src/content/blog/` folder
   - Name it something like `my-first-blog.md`
   - Use kebab-case (hyphens, no spaces)

2. **Copy this template** at the top of your file:

```yaml
---
title: "Your Blog Title Here"
date: 2025-01-30
description: "One sentence summary that appears in previews"
tags: ["AI", "Research", "Systems"]
draft: false
---
```

3. **Write your content** below the frontmatter in Markdown

4. **Push to GitHub** - your site will automatically rebuild

## Field Explanations

| Field | Required | Notes |
|-------|----------|-------|
| `title` | Yes | Keep it concise (50-70 chars) |
| `date` | Yes | Format: `YYYY-MM-DD` |
| `description` | Yes | Short summary (160 chars max) for previews |
| `tags` | Yes | Array of relevant topics |
| `draft` | No | Set to `true` to hide while writing |

## Markdown Cheat Sheet

```markdown
# H1 Heading (use for title)
## H2 Heading (main sections)
### H3 Heading (subsections)

**bold text**
*italic text*
***bold italic***

[Link text](https://url.com)
![Image alt](image.jpg)

- Bullet point
- Another point

1. Numbered item
2. Second item

> Blockquote
> Multiple lines

`inline code`

\`\`\`python
# Code block with language
def hello():
    print("hi")
\`\`\`
```

## Example Blog Post

See `sample-blog.md` in this folder for a complete working example.

## Publishing Workflow

1. Write in `draft: true` mode
2. When ready, set `draft: false`
3. Push to GitHub
4. Site rebuilds automatically
5. Your post appears on `/blogs` page

## Tips

- Keep descriptions under 160 characters (they show in previews)
- Use descriptive filenames: `ai-safety-overview.md` not `blog1.md`
- Organize posts chronologically by date
- Add 3-5 relevant tags for better categorization
- Use code blocks for technical content
- Link to your projects when relevant

Happy writing! 🚀
