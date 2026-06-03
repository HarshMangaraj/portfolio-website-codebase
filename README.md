# tanstack_start_ts

A minimal starter app using TanStack tooling, React, TypeScript and Vite.

This repository scaffolds a component-first UI library and example app built with the TanStack React stack and Vite.

## Quickstart

Requirements

- Node.js 18+ (or Bun) and a package manager (npm / pnpm / yarn / bun).

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

Lint & format:

```bash
npm run lint
npm run format
```

## Project Structure

- `src/` — application source (routes, components, server entry).
- `src/components/ui/` — UI primitives and components.
- `package.json` — scripts and dependencies. See [package.json](package.json).
- `.gitignore` — ignore rules. See [.gitignore](.gitignore).

## Tech Overview

- React 19
- TypeScript
- Vite
- TanStack Router / React Query
- Tailwind + utility libraries

## Notes about git

This workspace was reinitialized locally. The original git pointer was backed up to `.git.backup`.
If you have a remote repository URL, add it and fetch the history:

```bash
git remote add origin <repo-url>
git fetch origin --prune
git checkout -b main origin/main
```

If you want help connecting the remote or restoring history, paste the repo URL and I can add it for you.

## License

This project is marked `private` in `package.json`.
