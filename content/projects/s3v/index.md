+++
title = "s3v"
description = "S3 バケットを読み取り専用で閲覧する TUI ブラウザ"
weight = 4

[taxonomies]
tags = ["rust", "cli", "tui", "aws"]

[extra]
link_to = "https://github.com/daisuke8000/s3v"
+++

S3 バケットの中身を 3 ペインレイアウトで直感的にブラウジングできる Rust 製 TUI アプリケーション。読み取り専用で安全に操作できる。

## 技術スタック

- **言語**: Rust
- **UI**: Ratatui（3 ペインレイアウト）
- **AWS**: aws-sdk-s3
- **プレビュー**: テキスト（シンタックスハイライト）、画像、PDF

## 主な機能

- **3 ペインブラウジング** — 親 / メイン / プレビューの Miller columns 風 UI
- **Vim スタイルナビゲーション** — `j`/`k`/`h`/`l` で直感操作
- **ファイルプレビュー** — テキスト、画像、PDF をターミナル内で表示
- **フォルダごとダウンロード** — フォルダ構造を保持した並列 DL
- **正規表現フィルタ** — `/` で絞り込み
- **SQL 検索** — `?` でメタデータ検索
- **AWS プロファイル・カスタムエンドポイント対応** — MinIO や LocalStack にも接続可能

## 使い方

```bash
# バケット一覧から開始
s3v

# 特定のバケットを開く
s3v my-bucket

# カスタムエンドポイント (MinIO, LocalStack)
s3v --endpoint http://localhost:9000
```

[GitHub](https://github.com/daisuke8000/s3v)
