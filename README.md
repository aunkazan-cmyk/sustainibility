# sustainibility

Nexovia corporate website — a bilingual (TR / EN) [Next.js](https://nextjs.org) app.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Structure

- `src/app/(tr)` and `src/app/(en)` — locale route groups
- `src/components/pages` — page components
- `src/components/shared` — shared building blocks (hero, CTA band, etc.)
- `src/i18n` — translation dictionary
- Responsive spacing is centralized via `data-nx-*` hooks in `src/app/globals.css`

See [`DEPLOY.md`](./DEPLOY.md) for deployment notes.
