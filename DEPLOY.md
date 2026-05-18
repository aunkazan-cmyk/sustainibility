# Deploying nexovia-web (AWS EC2)

Standalone Next.js 16 (App Router, Node server). All 26 pages are statically
prerendered; the only runtime surface is the contact Server Action (Nodemailer).

## 1. Build

```bash
npm ci
npm run logos        # regenerate public/logos/optimized/*.png (sharp)
npm run build
```

## 2. Environment

Create `.env.production` on the instance (never commit it) from
`.env.local.example`. Required: `NEXT_PUBLIC_SITE_URL`, `CONTACT_RECIPIENT`,
`MAIL_FROM`, and the `SMTP_*` group.

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
