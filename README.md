# FMC Ranks

App for generating and displaying scrambles for Fewest Moves, an official [WCA](https://www.worldcubeassociation.org/) event.

You can check a live version of this repo [here](https://campos20.github.io/fmc-ranks/).

## Getting Started

Requires Node 24 (see `.nvmrc`).

- Clone this project with `git clone https://github.com/campos20/fmc-ranks.git`
- Navigate to it with `cd fmc-ranks`
- Run `npm install` to install dependencies
- Run `npm run dev` and open the browser in the specified address.

Other scripts:

- `npm run build`: type-check and build into `dist/`
- `npm run preview`: serve the production build locally
- `npm run lint`: run ESLint
- `npm test`: run tests with Vitest

## How this works

The app is built with [Vite](https://vite.dev/), React and TypeScript.

- Scrambles are generated in the browser with [cubing.js](https://github.com/cubing/cubing.js) (random-state FMC scrambles, in a web worker). No backend is needed.
- Scramble images use [Scramble Display](https://github.com/cubing/scramble-display), which is also built on cubing.js.
- `vite.config.ts` has a small plugin so Vite bundles the cubing.js scramble worker correctly.

## Deploy

Every push to `main` is built and deployed to GitHub Pages by [GitHub Actions](.github/workflows/deploy.yml). Pull requests run lint, tests and build only.
