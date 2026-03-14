+++
title = "grass-fireworks"
description = "GitHub コントリビューションを SVG 花火で表示"
weight = 3

[taxonomies]
tags = ["typescript", "cloudflare-workers"]

[extra]
link_to = "https://github.com/daisuke8000/grass-fireworks"
category = "creative"
+++

GitHub の日々のコントリビューション数に応じて、花火の SVG アニメーションを生成するツール。README に画像として埋め込める。

## 技術スタック

- **言語**: TypeScript
- **フレームワーク**: Hono
- **ランタイム**: Cloudflare Workers
- **出力**: Pure SVG + CSS アニメーション（JS 不要）

## 特徴

- **6 段階のレベル** — コミット数に応じて花火の派手さが変わる
- **2 つのテーマが日替わりで切り替わる**
  - **Kata** — 日本の伝統花火（牡丹、菊など）にインスパイア
  - **Matsuri** — 日本の花火大会（隅田川、長岡フェニックスなど）にインスパイア
- **ナイアガラ演出** — 50 コミット超 or 特定日に 30 コミット超でボーナス演出
- **サイズ指定可能** — クエリパラメータで幅・高さを調整

## 使い方

README にこう書くだけ:

```markdown
![My Fireworks](https://grass-fireworks.dsk8.workers.dev/api/fireworks?user=YOUR_USERNAME)
```

[GitHub](https://github.com/daisuke8000/grass-fireworks)
