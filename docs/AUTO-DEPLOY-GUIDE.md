# LIZGAT Hotel — Auto-Deploy with GitHub + SSH

Push to GitHub → GitHub Actions SSHs into your server → pulls, builds, restarts. Fully automated.

---

## One-Time Setup

### 1. Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Create a **private** repo named `lizgathotel`
3. Do NOT initialize with README (we already have code)

### 2. Initialize Git & Push (Run locally)

```bash
cd D:\xampp\htdocs\lizgathotel
git init
git add .
git commit -m "Initial commit - Lizgat Hotel"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/lizgathotel.git
git push -u origin main
```

### 3. Enable SSH on Namecheap

1. Log into **cPanel** → **SSH Access** (or **Terminal**)
2. If SSH is not enabled, contact Namecheap support to enable it (shared hosting may need activation)
3. Note your SSH details:
   - **Host**: your server IP or hostname (e.g. `server123.web-hosting.com`)
   - **Port**: usually `21098` for Namecheap shared hosting
   - **Username**: your cPanel username

### 4. Generate SSH Key Pair

Run locally:
```bash
ssh-keygen -t ed25519 -C "deploy-lizgathotel" -f ~/.ssh/lizgathotel_deploy
```

This creates:
- `~/.ssh/lizgathotel_deploy` (private key)
- `~/.ssh/lizgathotel_deploy.pub` (public key)

### 5. Add Public Key to Server

1. Copy the public key content:
   ```bash
   cat ~/.ssh/lizgathotel_deploy.pub
   ```
2. In **cPanel** → **SSH Access** → **Manage SSH Keys** → **Import Key**
3. Paste the public key and authorize it

### 6. Clone Repo on Server

SSH into your server:
```bash
ssh -p 21098 username@your-server-host
```

Then:
```bash
cd ~
git clone https://github.com/YOUR_USERNAME/lizgathotel.git
cd lizgathotel
```

Create the `.env` file on the server:
```bash
cp .env.production.example .env
nano .env
# Fill in your real database credentials, domain, SMTP, etc.
```

Run the initial setup:
```bash
source ~/nodevenv/lizgathotel/20/bin/activate
npm install
npx prisma generate
npx prisma db push
npx prisma db seed
npx next build
chmod +x deploy.sh
```

### 7. Add GitHub Secrets

Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add these 4 secrets:

| Secret Name | Value |
|---|---|
| `SSH_HOST` | Your server hostname (e.g. `server123.web-hosting.com`) |
| `SSH_USER` | Your cPanel username |
| `SSH_PORT` | SSH port (usually `21098` for Namecheap) |
| `SSH_KEY` | Entire contents of `~/.ssh/lizgathotel_deploy` (the PRIVATE key) |

### 8. Setup Node.js App in cPanel

1. **cPanel** → **Setup Node.js App** → **Create Application**
2. Set:
   - **Node.js version**: 20.x
   - **App root**: `lizgathotel`
   - **App URL**: your domain
   - **Startup file**: `app.js`
3. Click **Create**, then **Restart**

---

## How It Works

```
You make changes locally
        ↓
git add . && git commit -m "message" && git push
        ↓
GitHub Actions triggers deploy.yml
        ↓
SSHs into your Namecheap server
        ↓
Runs deploy.sh (pull → install → build → restart)
        ↓
Site is live with your changes!
```

---

## Daily Workflow

After the one-time setup, deploying is just:

```bash
git add .
git commit -m "Updated room prices"
git push
```

That's it. GitHub Actions handles the rest. You can monitor the deployment at:
`https://github.com/YOUR_USERNAME/lizgathotel/actions`

---

## Troubleshooting

### GitHub Action fails with "Permission denied"
- Verify SSH_KEY secret contains the full private key (including `-----BEGIN...` and `-----END...` lines)
- Ensure the public key is authorized in cPanel → SSH Access

### GitHub Action fails with "Connection refused"
- Confirm SSH_PORT is `21098` (not 22) for Namecheap shared hosting
- Confirm SSH_HOST is correct

### Build fails on server
- SSH into the server and run `bash ~/lizgathotel/deploy.sh` manually to see the error
- Check Node.js version: `node -v` (must be 18+)
- Check memory: shared hosting may run out during build — contact Namecheap if this happens

### Changes not showing after deploy
- Check GitHub Actions log for errors
- SSH in and verify: `cd ~/lizgathotel && git log -1` (should show your latest commit)
- Restart manually: `touch ~/lizgathotel/tmp/restart.txt`
