import { defineConfig } from 'prisma/config'

// Prisma 7 doesn't auto-load .env, so load it here (Node 21+ built-in)
try {
  process.loadEnvFile()
} catch {
  // no .env file (e.g. in CI or production) - rely on real env vars
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env['DATABASE_URL'],
  },
})
