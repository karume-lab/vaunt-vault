# Vaunt Vault

Vaunt Vault is a modern full-stack monorepo ecommerce application. It features a Next.js frontend and an Elysia backend, managed using Bun workspaces.

## Tech Stack

* Frontend: Next.js, React, Mantine
* Backend: Elysia, Better Auth
* Database: PostgreSQL, Drizzle ORM
* Package Manager and Runtime: Bun

## Project Structure

```text
vaunt-vault/
├── apps/
│   ├── api/            # Elysia backend application
│   │   ├── src/        # API source code (auth, mail, routes)
│   │   └── package.json
│   └── web/            # Next.js frontend application
│       ├── src/        # Frontend source code (app routing, components, features)
│       └── package.json
├── package.json        # Root workspace configuration
└── .gitignore          # Git ignore rules
```

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:
* Bun
* PostgreSQL

### Installation

1. Clone the repository.
2. Install dependencies at the project root:

```bash
bun install
```

### Development

To start the development servers for both the API and the web application concurrently, run:

```bash
bun run dev
```

The API will be available at http://localhost:8000 and the web interface at http://localhost:3000.

### Build

To create an optimized production build for the web application, run:

```bash
bun run build
```
