+++
title = "Coral"
description = "gRPC / Protobuf 依存関係ビジュアライザ"
weight = 1

[taxonomies]
tags = ["rust", "typescript", "grpc", "protobuf"]

[extra]
link_to = "https://github.com/daisuke8000/coral"
+++

`.proto` ファイルの依存関係グラフをインタラクティブに可視化するツール。

## 技術スタック

- **バックエンド / CLI**: Rust（Axum, prost_types）
- **フロントエンド**: TypeScript + React + React Flow + Vite
- **レイアウト**: Dagre アルゴリズム

## 主な機能

- **インタラクティブなグラフ表示** — ズーム、パン、パッケージグループの展開/折りたたみ
- **ネオンスタイルの UI** — ダークモードベースのグロー＆アニメーション
- **複数の出力形式** — JSON / Markdown レポート / Web サーバー（`coral serve`）
- **Proto diff** — 2 つのスナップショット間の差分検出（`coral diff base.json head.json`）
- **GitHub Action** — CI で proto 依存関係を分析し、PR にコメント＆ GitHub Pages へデプロイ
- **ノード分類** — Service（マゼンタ）、Message（シアン）、Enum（イエロー）で色分け

## 使い方

```bash
buf build -o - | coral serve
```

[GitHub](https://github.com/daisuke8000/coral) / [Live Demo](https://daisuke8000.github.io/coral/)
