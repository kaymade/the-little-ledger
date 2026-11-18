# The Little Ledger - Development Setup

See the [project overview](../README.md) for the app's goals and release checklist.

## Requirements

- Node.js 20.19+ within the 20.x series, or Node.js 22.12+
- npm

## Run Locally

From the repository root, enter the app folder, install dependencies, and start the development server.

```bash
cd my-app
npm install
npm run dev
```

Open the local URL printed in the terminal. Keep the development server running while using the app.

Vite updates the page as you save source files.

## Check the Project

Run these commands from the `my-app` folder.

```bash
npm run lint
npm run build
```

- `npm run lint` checks the source files against the project's ESLint rules
- `npm run build` checks TypeScript and creates the production build in `dist`.

## Preview the Production Build

After running `npm run build`, start the local preview server.

```bash
npm run preview
```

Open the URL printed in the terminal.

## Current Data Storage

Budgets and transactions currently start from sample data and are stored in memory. Refreshing the page restores the samples.

Theme, date-format, and default rollover preferences are saved in the browser's local storage.
