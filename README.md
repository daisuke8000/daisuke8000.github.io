# dsk8.dev

The source for [dsk8.dev](https://daisuke8000.github.io), a small portfolio of tools built by daisuke8000.

The site is a static showcase built with [Blume](https://useblume.dev/). It currently highlights two projects:

- [Coral](https://github.com/daisuke8000/coral) — an interactive graph for gRPC / Protobuf dependencies.
- [rustern](https://github.com/daisuke8000/rustern) — a Rust CLI for following logs across Kubernetes pods and containers.

## Repository layout

```text
blume/
├── content/projects/       Project detail pages in MDX
├── pages/index.astro       The custom portfolio homepage
├── public/                 Static assets copied as-is
├── blume.config.ts         Blume configuration
├── package.json             Local scripts and dependencies
└── theme.css               Site tokens and visual styles
.github/
├── workflows/              GitHub Pages deployment
└── dependabot.yml          Dependency update configuration
```

Generated directories (`blume/.astro`, `blume/.blume`, and `blume/dist`) and dependencies are intentionally ignored.

## Local development

Use Node.js 24.18.0, the LTS version pinned by [.nvmrc](.nvmrc).

```bash
cd blume
npm ci --omit=peer
npm run dev
```

Open <http://localhost:4321> in a browser. The dev server reloads when source files change.

To build and preview the production output:

```bash
npm run build
npm run preview
```

The generated static site is written to `blume/dist`.

## Editing content

Project detail pages live in `blume/content/projects/<slug>/index.mdx`. Keep frontmatter and body copy in English, use concise descriptions, and link to the canonical GitHub repository from the page.

The homepage is intentionally curated rather than generated from every content entry. To add or replace a featured project, update the project data and visual block in `blume/pages/index.astro`, then add its detail page under `blume/content/projects/`.

Before publishing a change, run:

```bash
cd blume
npm run build
```

## Deployment

Pushing to `main` builds `blume` and deploys `blume/dist` to GitHub Pages through [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

## Maintenance

Dependabot checks npm dependencies and GitHub Actions weekly. For a local dependency check:

```bash
cd blume
npm outdated
npm audit --omit=peer
```
