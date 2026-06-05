# Vaultd — Agent Instructions

## What this project is
Vaultd is a SaaS API that stores credentials encrypted and issues scoped 
short-lived tokens to AI agents. Agents call GET /v1/token instead of 
holding raw credentials.

## HARD RULES — never break these
1. NEVER modify or create files in src/crypto/ — that directory is off-limits
2. NEVER log, return, or persist a decrypted credential value anywhere
3. NEVER store plaintext in the database — only ciphertext and encrypted DEKs
4. ALL API routes must have JSON Schema / Zod validation
5. NEVER write a migration that drops or alters the audit_events table

## Tech stack
- Runtime: Node.js 22, TypeScript
- Framework: Fastify 4 with @fastify/type-provider-typebox
- ORM: Prisma
- DB: PostgreSQL (Neon) via DATABASE_URL env var
- Cache: Redis (Upstash) via UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
- Encryption: libsodium-wrappers (I write this myself — do not touch)
- Validation: Zod for policy schemas, TypeBox for route schemas
- Testing: Vitest

## Folder structure
/api
  /src
    /crypto     ← OFF LIMITS TO AGENT
    /routes     ← route handlers
    /services   ← business logic
    /db         ← prisma client singleton
    /middleware ← auth, rate limiting
  /tests
  /prisma
    schema.prisma
    migrations/

## Environment variables available
DATABASE_URL, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN, 
MASTER_KEY, NODE_ENV, PORT

## When generating tests
- Use Vitest
- Tests go in /tests
- Mock external services (Redis, Prisma) — don't hit real services in unit tests
- For integration tests use a test database (TEST_DATABASE_URL)
