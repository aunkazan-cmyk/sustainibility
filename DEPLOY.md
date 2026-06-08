# Deploying nexovia-web

Next.js 16 (App Router). All 26 pages are statically prerendered; the only
runtime surface is the contact Server Action (Nodemailer SMTP).

The 404 page needs no setup: the per-locale optional catch-alls call
`notFound()` for any unknown URL, rendering the localized, chrome-wrapped
`(tr)/not-found.tsx` / `(en)/not-found.tsx` with a real 404 status.

## Vercel (primary)

1. Import the GitHub repo at vercel.com — framework auto-detects as Next.js,
   build `next build`, no overrides needed.
2. **Project → Settings → Environment Variables** (Production + Preview) —
   set every var from `.env.local.example`:

   | Var | Value |
   | --- | --- |
   | `NEXT_PUBLIC_SITE_URL` | `https://nexovia.com.tr` |
   | `CONTACT_RECIPIENT` | `info@nexovia.com.tr` |
   | `MAIL_FROM` | `noreply@nexovia.com.tr` |
   | `SMTP_HOST` `SMTP_PORT` `SMTP_SECURE` `SMTP_USER` `SMTP_PASS` | SMTP transport creds |
   | `CONTACT_CAPTCHA_SECRET` | Random secret for signed contact-form math challenges (required in production) |
   | `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-DY0PRJ3F9W` (Google Analytics 4; omit locally to disable scripts and banner) |
   | `MATRIS_LEAD_WEBHOOK_URL` | Optional HTTPS endpoint for matrix report lead JSON (CRM integration) |

   `.env.local.example` is git-ignored, so it is **not** read on Vercel —
   these must be entered in the dashboard. `CONTACT_RECIPIENT` also has a
   safe code default of `info@nexovia.com.tr`, so leads still arrive even
   if the var is missed.
3. Notes: the Server Action runs on Vercel's Node runtime (not Edge), so
   Nodemailer + outbound SMTP (465/587) work unchanged and well within the
   function timeout. The in-memory rate limiter is per-instance/best-effort
   and resets on cold start — acceptable; move to a shared store only if
   abuse becomes real.
4. Point the `nexovia.com.tr` DNS at Vercel and ensure the SMTP/from domain
   has SPF + DKIM so lead mail isn't spam-filtered.

## AWS EC2 (alternative)

Standalone Node server.

## 1. Build

```bash
npm ci
npm run logos        # regenerate public/logos/optimized/*.png (sharp)
npm run build
```

## 2. Environment

Create `.env.production` on the instance (never commit it) from
`.env.local.example`. Required: `NEXT_PUBLIC_SITE_URL`, `CONTACT_RECIPIENT`,
`MAIL_FROM`, `CONTACT_CAPTCHA_SECRET`, and the `SMTP_*` group. Optional:
`NEXT_PUBLIC_GA_MEASUREMENT_ID` (`G-DY0PRJ3F9W` for production analytics).

- **Quick start:** a Gmail account + [App Password](https://support.google.com/accounts/answer/185833)
  (`SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`, `SMTP_SECURE=true`).
- **Production:** switch to AWS SES SMTP or a real sending domain — only the
  `SMTP_*` / `MAIL_FROM` vars change, no code change.

## 3. Run under a process manager

Next listens on `:3000` by default (`PORT` to override).

pm2:

```bash
npm i -g pm2
pm2 start "npm run start" --name nexovia-web
pm2 save && pm2 startup
```

or a systemd unit running `npm run start` in this directory with the env file.

## 4. Reverse proxy (Nginx)

Terminate TLS and proxy to the Node server:

```nginx
server {
  server_name nexovia.com.tr;
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

Use certbot for the certificate. Confirm `https://nexovia.com.tr/sitemap.xml`
and `/robots.txt` resolve, and submit the sitemap in Google Search Console.
