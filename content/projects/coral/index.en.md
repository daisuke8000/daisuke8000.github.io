+++
title = "Coral"
description = "gRPC / Protobuf dependency visualizer"
weight = 1

[taxonomies]
tags = ["rust", "typescript", "grpc", "protobuf"]

[extra]
link_to = "https://github.com/daisuke8000/coral"
+++

An interactive visualizer for `.proto` file dependency graphs.

## Tech Stack

- **Backend / CLI**: Rust (Axum, prost_types)
- **Frontend**: TypeScript + React + React Flow + Vite
- **Layout**: Dagre algorithm

## Features

- **Interactive graph** — zoom, pan, expand/collapse package groups
- **Neon-styled UI** — dark mode with glow & animated data flow edges
- **Multiple output formats** — JSON / Markdown reports / web server (`coral serve`)
- **Proto diff** — detect changes between two snapshots (`coral diff base.json head.json`)
- **GitHub Action** — analyze proto dependencies in CI, post PR comments & deploy to GitHub Pages
- **Node classification** — color-coded by type: Service (magenta), Message (cyan), Enum (yellow)

## Usage

```bash
buf build -o - | coral serve
```

[GitHub](https://github.com/daisuke8000/coral) / [Live Demo](https://daisuke8000.github.io/coral/)
