# Deploy BotSync Site to Namecheap

This project is configured as a Node.js 22 application for `bot-sync.com`.

## 1. Point the domain to Namecheap hosting

For Namecheap shared hosting, use these nameservers in the domain settings:

- `dns1.namecheaphosting.com`
- `dns2.namecheaphosting.com`

If the hosting account provides different nameservers, use those from the Namecheap welcome email.

## 2. Upload the project

Upload the project to a directory outside `public_html`, for example:

```text
/home/CPANEL_USERNAME/botsync-site
```

Do not upload `node_modules`, `.output`, `.env`, or local log files. They are recreated on the server.

## 3. Create the Node.js application

In cPanel, open **Setup Node.js App** and create an application with:

- Node.js version: `22`
- Application mode: `Production`
- Application root: `botsync-site`
- Application URL: `https://bot-sync.com`
- Application startup file: `namecheap-start.js`

## 4. Configure the backend

Create `.env.production` in the application root before building:

```env
VITE_BOTSYNC_API_URL=https://YOUR-BACKEND-DOMAIN
```

Use only the backend origin; do not append `/api/v1`.

The backend must allow `https://bot-sync.com` and `https://www.bot-sync.com` in its CORS configuration.

## 5. Install and build

From cPanel Terminal or SSH, enter the application directory and run:

```bash
npm install
npm run build
```

Then return to **Setup Node.js App** and click **Restart**.

## 6. Enable HTTPS

Open cPanel **SSL/TLS Status** and run AutoSSL for `bot-sync.com` and `www.bot-sync.com` after DNS resolves.

## Updating the site

Upload the changed files, run `npm install` and `npm run build`, then restart the Node.js application.

## Automatic deployment with GitHub Actions

The workflow in `.github/workflows/deploy-namecheap.yml` deploys every push to `main`.
It validates and builds before touching production, deploys to a versioned release, and rolls back
automatically if the new release marker cannot be reached.

Create a `production` environment in the GitHub repository and add these secrets:

- `VITE_BOTSYNC_API_URL`: production backend origin, without `/api/v1`
- `NAMECHEAP_SSH_HOST`: server hostname from cPanel or the hosting welcome email
- `NAMECHEAP_SSH_USER`: cPanel username
- `NAMECHEAP_SSH_PORT`: `21098` for shared hosting, or `22` for a self-managed VPS
- `NAMECHEAP_SSH_PRIVATE_KEY`: private deployment key whose public key is authorized in cPanel
- `NAMECHEAP_SSH_KNOWN_HOSTS`: verified host-key line for the Namecheap SSH server
- `NAMECHEAP_APP_ROOT`: absolute path such as `/home/USERNAME/botsync-site`
- `NAMECHEAP_HEALTHCHECK_URL`: `https://bot-sync.com`

Keep the cPanel startup file set to `namecheap-start.js`. The launcher reads the release selected
by the workflow's atomic `current` symlink.
