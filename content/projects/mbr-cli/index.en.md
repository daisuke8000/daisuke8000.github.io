+++
title = "mbr-cli"
description = "Metabase CLI / TUI tool"
weight = 2

[taxonomies]
tags = ["rust", "cli", "tui"]

[extra]
link_to = "https://github.com/daisuke8000/mbr-cli"
+++

An async CLI / TUI tool for interacting with Metabase from the terminal.

## Tech Stack

- **Language**: Rust
- **Async**: Tokio
- **CLI**: Clap
- **TUI**: Ratatui
- **Config**: TOML

## Architecture

Cargo workspace with 3 crates:

| Crate | Role |
|-------|------|
| `mbr-core` | API client, storage, business logic |
| `mbr-cli` | Clap-based CLI interface |
| `mbr-tui` | Ratatui-based interactive TUI |

## Features

- **API key auth** — set via `MBR_API_KEY` environment variable
- **CLI** — execute queries, search, JSON output, parameterized queries
- **TUI** — tabbed view for Questions / Collections / Databases, vim-style navigation
- **Config management** — `config show/set/validate` for connection setup

## Usage

```bash
export MBR_API_KEY="your-api-key"
mbr-cli config set --url https://metabase.example.com
mbr-cli query --list
mbr-tui
```

[GitHub](https://github.com/daisuke8000/mbr-cli)
