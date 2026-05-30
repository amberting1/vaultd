# Vaultd

**Scoped credential infrastructure for AI agents.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.9+](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/downloads/)
[![Node.js 22+](https://img.shields.io/badge/node.js-22+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Fastify](https://img.shields.io/badge/Fastify-4.x-black.svg)](https://fastify.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![Status: Alpha](https://img.shields.io/badge/status-alpha-orange.svg)](https://github.com/vaultd/vaultd)

---

## The Problem

Every AI agent needs credentials to do useful work — a Gmail OAuth token, a Notion API key, a Stripe secret. Today, developers paste these directly into environment variables and hand them to agents at runtime.

**This is dangerous.**

- No scoping — the agent has full, permanent access
- No expiry — credentials never rotate
- No audit trail — you can't see what the agent accessed
- No revocation — rotating credentials breaks everything

If your agent gets prompt-injected, goes rogue, or your deployment is compromised, the attacker has the keys to everything.

## The Solution

**Vaultd is the badge system for AI agents.**

- **Store** credentials once in an encrypted vault
- **Define** policies: which agents can access which services
- **Issue** short-lived, scoped tokens at runtime
- **Audit** every access request (approved or denied)
- **Revoke** instantly without rotating real credentials

Agents never touch the real credential. Your secrets stay secret.

---

## How It Works

```python
# ❌ BEFORE — dangerous, what everyone does today
import os
token = os.getenv("GMAIL_TOKEN")  # raw, permanent, no audit
emails = gmail.read(token=token)

# ✅ AFTER — with Vaultd
from vaultd import Vault

vault = Vault(api_key="agt_sk_researcher_xxxx")
token = vault.get_token(service="gmail")  # scoped · 5-min TTL · logged
emails = gmail.read(token=token)