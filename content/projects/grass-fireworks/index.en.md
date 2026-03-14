+++
title = "grass-fireworks"
description = "Visualize GitHub contributions as SVG fireworks"
weight = 3

[taxonomies]
tags = ["typescript", "cloudflare-workers"]

[extra]
link_to = "https://github.com/daisuke8000/grass-fireworks"
category = "creative"
+++

Generates animated SVG fireworks based on your daily GitHub contribution count. Embed it in your README — no JavaScript required.

## Tech Stack

- **Language**: TypeScript
- **Framework**: Hono
- **Runtime**: Cloudflare Workers
- **Output**: Pure SVG + CSS animations (no JS)

## Features

- **6 intensity levels** — fireworks scale with your commit count
- **2 daily-rotating themes**
  - **Kata** — inspired by traditional Japanese firework types (Peony, Chrysanthemum, etc.)
  - **Matsuri** — inspired by famous Japanese firework festivals (Sumida River, Nagaoka Phoenix, etc.)
- **Niagara bonus** — 50+ commits or 30+ on lucky days triggers a waterfall effect
- **Customizable dimensions** — adjust width & height via query parameters

## Usage

Just drop this in your README:

```markdown
![My Fireworks](https://grass-fireworks.dsk8.workers.dev/api/fireworks?user=YOUR_USERNAME)
```

[GitHub](https://github.com/daisuke8000/grass-fireworks)
