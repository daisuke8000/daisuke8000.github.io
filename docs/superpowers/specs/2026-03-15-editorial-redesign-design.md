# Editorial Redesign — C3 Numbered Index Style

## Overview

Full site redesign of daisuke8000.github.io (Zola + tabi theme) with an editorial/magazine aesthetic. Numbered project indices, monospace accents, dot-separated tech stacks, and consistent dark teal color scheme across all pages.

## Design Direction

**Style**: C3 Numbered Index — Editorial/magazine aesthetic
**Color**: Teal (#00f5ff) accent on dark (#0a0a0a) background (existing teal skin preserved)
**Typography**: Inter (body) + monospace (numbers, tech labels, dates, accents)
**Key elements**:
- Numbered indices for projects (01, 02, 03...)
- Dot-separated tech stacks instead of pill/badge tags
- Uppercase letter-spaced category labels
- Top-gradient cards with subtle teal borders
- Clean list-based layouts for blog and archive

## Scope

All pages on the site:
1. Top page (hero, featured projects, tech stack)
2. Projects page (card grid)
3. Blog page (post listings)
4. Archive page (year-grouped posts)
5. Tags page (tag cloud)
6. Navigation and footer
7. Overall typography and spacing

## Implementation Approach

**Strategy**: Override tabi theme templates by placing custom templates in project-root `templates/` directory. Rewrite `static/custom.css` with the new design system. No theme files modified directly.

### Template Resolution Notes

- Zola resolves templates from project-root `templates/` first, then falls back to theme `templates/`.
- All overridden templates must still `{% extends "base.html" %}` (the theme's base.html — NOT overridden).
- All hardcoded strings in templates must use the tabi i18n system (`macros_translate::translate(...)`) for bilingual support.
- No inline `style` attributes in templates (CSP enabled).

### Files to Create/Modify

#### Template Overrides (new files in `templates/`)

1. **`templates/index.html`** — Override homepage (standalone, extends `base.html` directly)
   - Does NOT extend `section.html` — completely standalone to avoid conflicts
   - Hero section with large typography
   - Dot-separated tech stack line
   - Featured projects as compact numbered list (fetched via `get_section()` from projects path)
   - "See all projects" link
   - Blog posts section via `list_posts` macro

2. **`templates/cards.html`** — Override projects page (extends `base.html`)
   - Projects page uses `template = "cards.html"` in frontmatter
   - Replaces card grid with C3 numbered index cards
   - Removes filter_card_tags.html include (no filter bar)
   - Renders projects directly with editorial layout

3. **`templates/partials/cards_pages.html`** — Override card partial
   - C3 numbered index cards: number + category + name + description + dot-separated tech
   - Number: zero-padded based on `loop.index` (01, 02, ... 10, 11...)
   - Category: derived from first tag in `page.taxonomies.tags` (e.g., "rust" → displayed as uppercase label)
   - Tags displayed as dot-separated text from `page.taxonomies.tags`
   - Keeps `data-tags` attribute for potential future use

4. **`templates/partials/main_page_projects_list.html`** — Override homepage project list
   - Renders featured projects as compact numbered list (not cards)
   - Each row: number + name + description + tech (right-aligned) + arrow
   - Uses `get_section()` to fetch projects, respects `max_projects` setting

5. **`templates/section.html`** — Override section layout
   - Add editorial page labels (uppercase monospace section titles with line)
   - Used by blog section — handles `is_root_section` check
   - If `is_root_section`, delegates to `index.html` behavior (but since homepage uses its own template, this mainly affects blog/other sections)

6. **`templates/archive.html`** — Override archive layout
   - Large monospace year headings (teal, 32px)
   - Clean date (MM-DD monospace) + title list items
   - Minimal borders

7. **`templates/macros/list_posts.html`** — Override blog post list macro
   - Keeps same macro signature for compatibility with all callers
   - Date (monospace) + title + tags (dot-separated, no commas)
   - Hover effect with subtle background shift + border-radius
   - Still handles: pinned posts, pagination, thumbnails (simplified styling)

8. **`templates/tags/list.html`** — Override tag listing
   - Tag name + count badges in a flex-wrap grid
   - Subtle bordered items with hover

9. **`templates/tags/single.html`** — Override single tag page
   - Uses overridden `list_posts` macro (inherits new editorial style automatically)
   - Page label showing tag name

#### Style Changes

10. **`static/custom.css`** — Complete rewrite
    - Uses `var(--primary-color)` from tabi theme instead of defining new `--accent` variable
    - Design system spacing/typography tokens as CSS custom properties
    - All component styles (see Component Specifications below)
    - Navigation: subtle, clean link styling
    - Footer: monospace copyright, minimal social links
    - "See all projects" link: monospace, teal, arrow indicator
    - Transitions: 0.2s ease for hovers, 0.3s ease for transforms
    - Responsive: 640px breakpoint for grid collapse and layout stacking
    - Light mode: `[data-theme="light"]` overrides for backgrounds (rgba black instead of white), borders, and text colors

#### Content Changes

11. **`content/_index.md`** — Update top page content
    - Remove emoji-heavy project list and tech stack badges
    - Simplified intro text (the template handles layout/styling)
    - Remove `## 🛠 つくったもの` section (rendered by template now)
    - Remove `## ⚡ 技術スタック` section (rendered by template now)
    - Add `[extra]` fields: `projects_path = "projects/_index.md"`, `max_projects = 5`

12. **`content/_index.en.md`** — Same for English

13. **`content/projects/**/index.md`** — Add `extra.category` field to each project
    - coral: `category = "visualizer"`
    - mbr-cli: `category = "cli / tui"`
    - grass-fireworks: `category = "creative"`
    - s3v: `category = "cli / tui"`
    - flowrs: `category = "cli / tui"`

### Design Tokens

```
Colors (mapped to tabi theme variables):
  accent: var(--primary-color) — teal, from theme skin
  bg-base: var(--background-color) — dark bg from theme
  text-primary: var(--text-color) — from theme
  text-secondary: rgba(var(--text-color-rgb), 0.4) — muted
  text-tertiary: rgba(var(--text-color-rgb), 0.25) — very muted
  border-subtle: rgba(var(--text-color-rgb), 0.06)
  border-accent: rgba(var(--primary-color-rgb), 0.12)

Typography:
  --font-mono: 'Cascadia Code', 'SF Mono', 'Fira Code', monospace (from theme fonts)
  --text-xs: 10px
  --text-sm: 12px
  --text-base: 14px
  --text-md: 15px
  --text-lg: 18px
  --text-xl: 22px
  --text-2xl: 32px
  --text-3xl: 36px

Spacing:
  --space-xs: 4px
  --space-sm: 8px
  --space-md: 16px
  --space-lg: 24px
  --space-xl: 48px
  --space-2xl: 80px

Borders:
  --radius-sm: 8px
  --radius-md: 12px
  --radius-lg: 16px

Transitions:
  --transition-fast: 0.2s ease
  --transition-normal: 0.3s ease
```

### Component Specifications

#### Project Card (C3 Style) — Projects Page
- Border: 1px solid var(--border-accent)
- Border-radius: var(--radius-lg) (16px)
- Background: linear-gradient(180deg, rgba(primary-color, 0.03), transparent)
- Padding: var(--space-lg) (24px)
- Hover: border brightens to 0.35 opacity, translateY(-2px), box-shadow 0 8px 32px rgba(primary, 0.08), transition var(--transition-normal)
- Content order: number + dash + category → name → description → tech (dot-separated)
- Grid: 2 columns, gap var(--space-md), collapse to 1 column at 640px

#### Blog Post Item
- Layout: flex row (date | title | tags)
- Date: monospace, var(--text-secondary), fixed width 90px
- Title: var(--text-md) (15px), font-weight 600, var(--text-primary)
- Tags: monospace, var(--primary-color) at 0.4 opacity, no commas, text only
- Hover: background rgba(primary, 0.02), padding shift, border-radius var(--radius-sm), transition var(--transition-fast)
- Border-bottom: 1px solid var(--border-subtle)
- Mobile (< 640px): date stacks above title

#### Featured Project Item (Top Page)
- Container: bordered rounded box with 1px gap dividers
- Number: teal monospace, 16px bold, min-width 28px
- Info: name (var(--text-base) bold) + description (var(--text-sm), var(--text-secondary))
- Tech: teal monospace var(--text-xs), right-aligned
- Arrow: → in var(--text-tertiary)
- Hover: background rgba(primary, 0.03), transition var(--transition-fast)

#### Archive Item
- Year heading: var(--text-2xl) (32px), monospace, teal, font-weight 800
- Items: date MM-DD (monospace, var(--text-tertiary)) + title (var(--text-base), var(--text-secondary))
- Border-bottom: 1px solid rgba(white, 0.03)

#### Tag Item
- Border: 1px solid var(--border-subtle), border-radius var(--radius-sm)
- Background: rgba(white, 0.02)
- Padding: 8px 16px
- Name: var(--text-secondary), 13px
- Count: var(--primary-color), monospace, 11px
- Hover: border-color rgba(primary, 0.3), transition var(--transition-fast)

#### Navigation
- Keep tabi nav structure, add subtle styling refinements via CSS
- Logo: primary-color, 18px, font-weight 800, letter-spacing -0.5px
- Links: var(--text-secondary), 13px, letter-spacing 0.5px, hover: primary-color

#### Footer
- Keep tabi footer structure
- Copyright: monospace, var(--text-tertiary), 11px
- Social: var(--text-secondary), hover: primary-color

#### "See All" Link
- Monospace, var(--primary-color), 12px, letter-spacing 0.5px
- Arrow suffix: →
- Hover: underline

### What Not To Change

- **tabi theme source files** — All overrides go in project-root `templates/`
- **base.html** — Not overridden; all templates extend it
- **config.toml theme settings** — Keep teal skin, dark default, existing menu
- **Content structure** — Keep existing project markdown files, blog section, archive section
- **Zola features** — Keep feeds, multilingual, search functionality
- **Individual project pages** — These use `page.html` which is already clean enough
- **Shortcodes** — Keep all existing shortcodes from theme

### Responsive Considerations

- Breakpoint: 640px (single breakpoint for simplicity)
- Project card grid: 2 columns → 1 column
- Blog post items: flex row → stacked (date above title)
- Navigation: stays horizontal (only 4 items)
- Featured projects: already vertical, no change
- Tag cloud: flex-wrap handles naturally

### Light Mode

Custom CSS uses tabi theme CSS variables (`var(--primary-color)`, `var(--text-color)`, `var(--background-color)`) where possible for automatic light/dark adaptation. For new editorial styles using rgba overlays, add `[data-theme="light"]` overrides:
- Card backgrounds: rgba(0,0,0,0.02) instead of rgba(255,255,255,0.02)
- Borders: rgba(0,0,0,0.06/0.12) instead of rgba(255,255,255,0.06/0.12)
- Text muted colors: rgba(0,0,0,0.4/0.25) instead of rgba(255,255,255,0.4/0.25)
- Gradient overlays: use primary-color with same opacity values (works in both modes)

### Empty States

- Blog with no posts: show section title only, no empty list
- Tags with no tags: show section title only
- Archive with no posts: show section title only
- These are handled by Zola template conditionals (`{% if pages %}`)
