# Deploy BotSync Site to Namecheap

This project is configured as a Node.js 22 application for `bot-sync.com`.

## cPanel application

Create the application in **Setup Node.js App** with:

- Node.js version: `22`
- Application mode: `Production`
- Application root: `botsync-site`
- Application URL: `https://bot-sync.com`
- Application startup file: `namecheap-start.js`

Keep the application outside `public_html`, for example
`/home/CPANEL_USERNAME/botsync-site`. Enable AutoSSL for both `bot-sync.com`
and `www.bot-sync.com` after DNS resolves.

## First deployment

Upload or clone the repository into the application root, then run:

```bash
npm ci
VITE_BOTSYNC_API_URL=https://api.bot-sync.com \
VITE_BOTSYNC_PORTAL_URL=https://portal.bot-sync.com \
npm run build
```

Restart the application from cPanel. The backend must allow
`https://bot-sync.com` and `https://www.bot-sync.com` in its CORS origins.

## Automated production deployments

`.github/workflows/deploy-namecheap.yml` validates and builds every push to
`main`, activates an immutable release, checks its public release marker, and
rolls back automatically when verification fails.

Create a GitHub `production` environment with these secrets:

- `VITE_BOTSYNC_API_URL`: production API origin, normally `https://api.bot-sync.com`
- `VITE_BOTSYNC_PORTAL_URL`: production portal origin, normally `https://portal.bot-sync.com`
- `NAMECHEAP_SSH_HOST`: SSH hostname from cPanel
- `NAMECHEAP_SSH_USER`: cPanel username
- `NAMECHEAP_SSH_PORT`: usually `21098` for shared hosting
- `NAMECHEAP_SSH_PRIVATE_KEY`: deployment private key
- `NAMECHEAP_SSH_KNOWN_HOSTS`: verified SSH host-key line
- `NAMECHEAP_APP_ROOT`: absolute path such as `/home/USERNAME/botsync-site`
- `NAMECHEAP_HEALTHCHECK_URL`: `https://bot-sync.com`

The app root must retain `namecheap-start.js`; it starts the release selected
by the workflow's atomic `current` symlink.
