+++
title = "mbr-cli"
description = "Metabase CLI / TUI ツール"
weight = 2

[taxonomies]
tags = ["rust", "cli", "tui"]

[extra]
link_to = "https://github.com/daisuke8000/mbr-cli"
+++

Metabase をターミナルから操作する非同期 CLI / TUI ツール。

## 技術スタック

- **言語**: Rust
- **非同期**: Tokio
- **CLI**: Clap
- **TUI**: Ratatui
- **設定**: TOML

## アーキテクチャ

Cargo ワークスペースで 3 クレートに分割。

| クレート | 役割 |
|---------|------|
| `mbr-core` | API クライアント・ストレージ・ビジネスロジック |
| `mbr-cli` | Clap ベースの CLI インターフェース |
| `mbr-tui` | Ratatui ベースのインタラクティブ TUI |

## 主な機能

- **API キー認証** — `MBR_API_KEY` 環境変数で設定
- **CLI** — クエリ実行、検索、JSON 出力、パラメータ指定
- **TUI** — Questions / Collections / Databases のタブ表示、vim スタイルのキー操作
- **設定管理** — `config show/set/validate` で接続先を管理

## 使い方

```bash
export MBR_API_KEY="your-api-key"
mbr-cli config set --url https://metabase.example.com
mbr-cli query --list
mbr-tui
```

[GitHub](https://github.com/daisuke8000/mbr-cli)
