# NutriLens

NutriLens is a food-intelligence web application for discovering, examining,
comparing, and organizing packaged-food records.

## Requirements

- Node.js 24.18.1
- npm 10.8.2 or newer

Use the Node.js version declared in `.nvmrc` before installing dependencies.

## Setup

```sh
npm install
npm run dev
```

## Available scripts

- `npm run dev` starts the Vite development server.
- `npm run build` type-checks and creates the production bundle.
- `npm run preview` builds and serves the production bundle locally.

## Project status

The application foundation includes Open Cells bootstrap and hash routing,
lazy-loaded Lit page hosts, and the typed bridge used by Vue custom elements.
Feature screens are still placeholders and will be implemented incrementally.

See the [architecture overview](docs/architecture/README.md) and
[ADR-001](docs/architecture/decisions/001-open-cells-lit-vue-interop.md) for the
framework boundaries and data-flow decisions.

