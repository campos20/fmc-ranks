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

- Scrambles are fetched from the live version of [Scramble Web API](https://github.com/campos20/scramble-web-api), scramble images use [Scramble Display](https://github.com/cubing/scramble-display).
