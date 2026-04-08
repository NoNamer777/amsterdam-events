# Amsterdam Events

An Angular application for browsing and managing Amsterdam events.

## Prerequisites

This project uses [mise](https://mise.jdx.dev) to manage the Node.js and pnpm versions defined in `package.json`. Tool versions are read directly from the package manifest — no separate mise config file is needed.

### 1. Install mise

Follow the [mise installation guide](https://mise.jdx.dev/installing-mise.html) for your platform.

### 2. Enable package manifest support

Mise needs to be configured to read tool versions from `package.json` for Node.js, npm, and pnpm. Run these commands once globally:

```bash
mise settings add idiomatic_version_file_enable_tools node
mise settings add idiomatic_version_file_enable_tools npm
mise settings add idiomatic_version_file_enable_tools pnpm
```

### 3. Disable Corepack

Corepack conflicts with mise's package manager shims and must be disabled:

```bash
corepack disable
```

## Getting started

Install the required tools and dependencies:

```bash
mise install
pnpm install
```

## Development server

```bash
pnpm start
```

Navigate to `http://localhost:4200/`. The app reloads automatically when source files change.

## Build

```bash
# Production build
pnpm build

# Development build
pnpm build:dev
```

Build output is written to the `dist/` directory.

## Testing

```sh
# Install browser binaries (first time only or after the @playwright/test package has upgraded)
pnpm test:install-browsers

# Run tests
pnpm test

# Run tests in development configuration
pnpm test:dev
```

Tests run in the browser via [Vitest](https://vitest.dev) and [Playwright](https://playwright.dev).

## Linting and formatting

```bash
# Lint
pnpm lint

# Check formatting
pnpm format:check

# Fix formatting
pnpm format:write
```

## Code scaffolding

Use the Angular CLI to generate new components and other constructs:

```bash
pnpm ng g|generate c|component component-name
pnpm ng g d|directive directive-name
pnpm ng g s|service service-name
pnpm ng g g|guard guard-name
pnpm ng g p|pipe pipe-name
```

## Further help

See the [Angular CLI documentation](https://angular.dev/tools/cli) for a full command reference.
