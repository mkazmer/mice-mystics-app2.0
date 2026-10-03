# Mice & Mystics App

A companion app for the board game [Mice & Mystics](https://www.plaidhatgames.com/games/mice-and-mystics).
It rolls dice for minions and bosses with one click, and lets you save campaigns to an account so you can
pick up where you left off.

## Tech stack

| | |
|---|---|
| **Client** | React 19, TypeScript, Vite, React Router, TanStack Query, Sass, Vitest |
| **Server** | Node.js, Express 5, TypeScript, Zod |
| **Database** | PostgreSQL + Prisma ORM |
| **Auth** | Email/password (argon2 hashing), server-side sessions in httpOnly cookies |

## Project structure

```
client/            React app (Vite)
  src/api/         fetch wrapper + TanStack Query hooks (auth, campaigns)
  src/features/    dice logic, dashboard reducer + components, creature data
  src/pages/       route components
server/            Express API
  prisma/          schema + migrations
  src/routes/      /api/auth, /api/campaigns
  src/lib/         db client, sessions, error handling
docker-compose.yml local Postgres
```

## Getting started

Requires Node 22+ and Docker (or any Postgres you can point `DATABASE_URL` at).

```bash
npm install
cp server/.env.example server/.env
npm run db:up        # start Postgres in Docker
npm run db:migrate   # create tables + generate the Prisma client
npm run dev          # API on :3001, client on http://localhost:5173
```

Other scripts: `npm test` (client unit tests), `npm run build` (both workspaces).

## API

| Method | Path | Auth | |
|---|---|---|---|
| POST | `/api/auth/register` | | `{ email, displayName, password }` |
| POST | `/api/auth/login` | | `{ email, password }` |
| POST | `/api/auth/logout` | | |
| GET | `/api/auth/me` | | current user, or 401 |
| GET | `/api/campaigns` | ✓ | your campaigns |
| POST | `/api/campaigns` | ✓ | `{ name }` |
| GET | `/api/campaigns/:id` | ✓ | includes heroes + items |
| PATCH | `/api/campaigns/:id` | ✓ | `{ name?, status?, currentChapter?, notes? }` |
| DELETE | `/api/campaigns/:id` | ✓ | |

## How auth works

On login the server creates a random 256-bit token, stores its SHA-256 hash in the `Session` table, and sends
the raw token in an `httpOnly`, `SameSite=Lax` cookie. Every authenticated request looks up the hash. Logging
out deletes the row, so sessions can be revoked server-side (unlike a stateless JWT). The client always calls
`/api` on its own origin (Vite proxies it in dev), so no CORS or cross-site cookies are needed.

When deploying with the client and API on different hosts, keep this same-origin setup by adding a rewrite
from `/api/*` to the API (e.g. Vercel/Netlify rewrites).

---

Created by Mike Kazmer - https://mikekazmer.com/
