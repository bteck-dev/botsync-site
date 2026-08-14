# Deploy BotSync Site to the VPS

Namecheap is used only for DNS. The website runs as a Docker container on the
same VPS as the BotSync backend and portal.

## DNS

Create these records in Namecheap Advanced DNS:

- `A` record: host `@` -> `162.0.228.215`
- `A` record: host `www` -> `162.0.228.215`

## Nginx and HTTPS

Copy `docker/nginx/bot-sync.com.conf` to
`/etc/nginx/sites-available/bot-sync.com`, enable it, validate Nginx, and reload.
Then issue the certificate:

```bash
sudo ln -s /etc/nginx/sites-available/bot-sync.com /etc/nginx/sites-enabled/bot-sync.com
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d bot-sync.com -d www.bot-sync.com
```

## GitHub production environment

Create a `production` environment in `bteck-dev/botsync-site` with:

- `VPS_HOST`: `162.0.228.215`
- `VPS_USER`: the VPS deployment user
- `VPS_PORT`: normally `22`
- `VPS_SSH_KEY`: the private deployment key
- `VITE_BOTSYNC_API_URL`: `https://api.bot-sync.com`
- `VITE_BOTSYNC_PORTAL_URL`: `https://portal.bot-sync.com`

Pushes to `release/production` run lint, type-check, build, upload the release,
build the Docker image on the VPS, and verify both the container and public URL.
