+++
title = "s3v"
description = "A read-only S3 browser TUI"
weight = 4

[taxonomies]
tags = ["rust", "cli", "tui", "aws"]

[extra]
link_to = "https://github.com/daisuke8000/s3v"
category = "cli / tui"
+++

A Rust-based TUI application for browsing S3 buckets in a 3-pane Miller columns layout. Read-only by design for safe exploration.

## Tech Stack

- **Language**: Rust
- **UI**: Ratatui (3-pane layout)
- **AWS**: aws-sdk-s3
- **Preview**: Text (syntax highlighted), images, PDF

## Features

- **3-pane browsing** — Miller columns style with parent / main / preview panes
- **Vim-style navigation** — `j`/`k`/`h`/`l` for intuitive movement
- **File preview** — render text, images, and PDFs directly in the terminal
- **Folder download** — parallel downloads preserving directory structure
- **Regex filter** — press `/` to filter items
- **SQL search** — press `?` for metadata queries
- **AWS profile & custom endpoint support** — works with MinIO, LocalStack, etc.

## Usage

```bash
# Start from bucket list
s3v

# Open a specific bucket
s3v my-bucket

# Custom endpoint (MinIO, LocalStack)
s3v --endpoint http://localhost:9000
```

[GitHub](https://github.com/daisuke8000/s3v)
