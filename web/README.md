# Secure Software Dashboard

Cyberpunk glassmorphism dashboard with a two-step auth flow:
1. Website generates one-time Telegram token
2. User opens bot with `https://t.me/<bot>?start=<token>`
3. Bot confirms token and website links Telegram account
4. User binds internal credentials (username/password)

After both steps are complete, downloads are issued via Supabase Signed URLs so files are not exposed by public links.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Supabase (Postgres + Storage Signed URL)
- Cloudflare Workers via OpenNext

## Environment

Copy `.env.example` to `.env.local` and fill:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_STORAGE_BUCKET`
- `SUPABASE_SIGNED_URL_TTL`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_BOT_USERNAME`

## Supabase SQL bootstrap

```sql
create table if not exists public.user_credentials (
  telegram_id bigint primary key,
  username text unique not null,
  password_hash text not null,
  created_at timestamptz default now()
);

create table if not exists public.telegram_auth_tokens (
  token text primary key,
  status text not null default 'pending',
  telegram_id bigint,
  telegram_username text,
  expires_at timestamptz not null,
  confirmed_at timestamptz,
  created_at timestamptz not null default now()
);
```

Create a private storage bucket (example `software`) and upload build artifacts.

## Cloudflare deploy

This app must be deployed as a `Cloudflare Worker`, not as a static Pages output directory.

Required project files for Cloudflare:

- `wrangler.jsonc`
- `open-next.config.ts`
- `package.json` scripts with `opennextjs-cloudflare`

Install dependencies locally:

```bash
npm install
```

Useful commands:

```bash
npm run preview
npm run deploy
```

If you deploy from GitHub in Cloudflare:

- Root directory: `web`
- Build command: `npm run deploy`
- Do not set an output directory manually
- Add all environment variables from `.env.local` in the Cloudflare project settings

## Telegram bot setup

Set webhook to your deployed route:

`https://<your-domain>/api/telegram/webhook`

When user presses `/start <token>`, the webhook marks token as `confirmed` and frontend polling (`/api/auth/token/status`) completes login.
