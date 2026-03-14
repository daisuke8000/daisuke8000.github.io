+++
title = "flowrs"
description = "Argo Workflows 向け高速 TUI クライアント"
weight = 5

[taxonomies]
tags = ["rust", "cli", "tui", "kubernetes"]

[extra]
link_to = "https://github.com/daisuke8000/flowrs"
category = "cli / tui"
+++

Argo Workflows を k9s ライクに操作できる Rust 製 TUI クライアント。ワークフローの一覧・詳細・ログをターミナルから素早く確認できる。

## 技術スタック

- **言語**: Rust
- **UI**: Ratatui
- **通信**: Argo Workflows REST API + SSE ストリーミング
- **設定**: TOML 設定ファイル + CLI オーバーライド + 環境変数

## 主な機能

- **ワークフロー一覧** — ライブステータス表示、ファジーフィルタ（`/`）、ソート
- **DAG ツリービュー** — ワークフロー詳細をツリー構造で可視化
- **リアルタイムログ** — SSE ストリーミングとスマートオートスクロール
- **ワークフロー操作** — retry / suspend / resume / stop / resubmit / delete
- **WorkflowTemplate からの submit** — テンプレートからワークフローを投入
- **Namespace 切り替え** — `Tab` キーで素早く切り替え
- **Vim ライクキーバインド** — `j`/`k`/`Enter`/`Esc`/`q`
- **トークンファイルサポート** — k8s ServiceAccount による自動認証更新

## 使い方

```bash
# 設定ファイルを作成
cat > ~/.config/flowrs/config.toml << 'EOF'
[server]
url = "https://argo.example.com"
namespace = "default"
EOF

# 起動
export FLOWRS_TOKEN="Bearer your-token"
flowrs
```

[GitHub](https://github.com/daisuke8000/flowrs)
