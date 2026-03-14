+++
title = "flowrs"
description = "A fast TUI client for Argo Workflows"
weight = 5

[taxonomies]
tags = ["rust", "cli", "tui", "kubernetes"]

[extra]
link_to = "https://github.com/daisuke8000/flowrs"
+++

A k9s-like TUI client for Argo Workflows built in Rust. Browse workflow lists, inspect DAG details, and stream logs — all from your terminal.

## Tech Stack

- **Language**: Rust
- **UI**: Ratatui
- **Communication**: Argo Workflows REST API + SSE streaming
- **Config**: TOML config file + CLI overrides + environment variables

## Features

- **Workflow list** — live status display, fuzzy filtering (`/`), and sorting
- **DAG tree view** — visualize workflow details as a tree structure
- **Real-time logs** — SSE streaming with smart auto-scroll
- **Workflow operations** — retry / suspend / resume / stop / resubmit / delete
- **Submit from WorkflowTemplates** — launch workflows from templates
- **Namespace switching** — quick toggle with `Tab` key
- **Vim-like keybindings** — `j`/`k`/`Enter`/`Esc`/`q`
- **Token file support** — automatic credential rotation via k8s ServiceAccount

## Usage

```bash
# Create config file
cat > ~/.config/flowrs/config.toml << 'EOF'
[server]
url = "https://argo.example.com"
namespace = "default"
EOF

# Start
export FLOWRS_TOKEN="Bearer your-token"
flowrs
```

[GitHub](https://github.com/daisuke8000/flowrs)
