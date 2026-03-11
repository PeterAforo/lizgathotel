# LIZGAT Hotel — cPanel (Namecheap) Deployment Guide

## Prerequisites
- Namecheap shared hosting with **cPanel** access
- **Setup Node.js App** feature available in cPanel
- A domain pointed to your Namecheap hosting
- File Manager or FTP/SFTP access

---

## Step 1: Create MySQL Database in cPanel

1. Log into **cPanel** → **MySQL Databases**
2. Create a new database (e.g. `lizgathotel`)
3. Create a new MySQL user with a strong password
4. Add the user to the database with **ALL PRIVILEGES**
5. Note down: `database name`, `username`, `password`

---

## Step 2: Prepare the Production Build Locally

### 2a. Create `.env.production` in the project root

```env
DATABASE_URL="mysql://DB_USER:DB_PASSWORD@localhost:3306/DB_NAME"
NEXTAUTH_SECRET="your-random-secret-string-here"
NEXTAUTH_URL="https://yourdomain.com"
SMTP_HOST="mail.yourdomain.com"
SMTP_PORT="465"
SMTP_USER="info@yourdomain.com"
SMTP_PASS="your-email-password"
SMTP_FROM="LIZGAT Hotel <info@yourdomain.com>"
```

> Generate a secret at: https://generate-secret.vercel.app/32

### 2b. Build the project

```bash
npx next build
```

This creates the `.next/standalone` directory with everything needed.

---

## Step 3: Upload Files to cPanel

### Files to upload (via File Manager or FTP):

Upload these to your app directory (e.g. `/home/username/lizgathotel/`):

```
.next/standalone/          → Upload ENTIRE folder contents to app root
.next/static/              → Upload to: .next/static/
public/                    → Upload to: public/
prisma/schema.prisma       → Upload to: prisma/schema.prisma
.env.production            → Rename to .env in the server
app.js                     → Upload to app root (Passenger entry)
package.json               → Upload to app root
```

### Simplified upload structure on server:
```
/home/username/lizgathotel/
├── .env                     (your production env vars)
├── .next/
│   ├── standalone/          (the built server files)
│   └── static/              (static assets)
├── app.js                   (Passenger entry point)
├── node_modules/            (from standalone build)
├── package.json
├── prisma/
│   └── schema.prisma
├── public/
│   └── (static files)
└── server.js                (from standalone build)
```

> **Important**: The `.next/standalone` folder already contains a minimal `node_modules` and `server.js`. Copy the contents of `.next/standalone/` into the app root directory.

---

## Step 4: Setup Node.js App in cPanel

1. Go to **cPanel** → **Setup Node.js App**
2. Click **Create Application**
3. Configure:
   - **Node.js version**: 18.x or 20.x (latest available)
   - **Application mode**: Production
   - **Application root**: `lizgathotel` (your app directory)
   - **Application URL**: your domain
   - **Application startup file**: `app.js`
4. Click **Create**
5. Note the **virtual environment path** shown (e.g. `/home/username/nodevenv/lizgathotel/20/...`)

---

## Step 5: Install Dependencies & Setup Database on Server

1. In the Node.js App panel, click **Run NPM Install** or open the terminal
2. Enter the virtual environment (copy the command shown in cPanel):
   ```bash
   source /home/username/nodevenv/lizgathotel/20/bin/activate
   ```
3. Install Prisma CLI and push the schema:
   ```bash
   cd ~/lizgathotel
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

---

## Step 6: Restart & Verify

1. In cPanel → **Setup Node.js App**, click **Restart** on your app
2. Visit your domain — the site should be live!
3. Visit `/admin/login` to access the admin panel
   - Default credentials are in `prisma/seed.ts` (email: `admin@lizgathotel.com`)

---

## Troubleshooting

### App shows 503 or blank page
- Check **stderr.log** in your app directory for errors
- Verify `.env` file exists with correct DATABASE_URL
- Make sure Node.js version is 18+ in cPanel

### Database connection error
- Ensure the MySQL user has privileges on the database
- DATABASE_URL should use `localhost` (not 127.0.0.1) on shared hosting
- Check that the database name matches exactly (cPanel prefixes with your username, e.g. `username_lizgathotel`)

### Static assets not loading (CSS/JS)
- Ensure `.next/static/` is uploaded to the correct path
- Ensure `public/` folder is uploaded

### Email not sending
- Use cPanel email or configure with an external SMTP (Gmail, SendGrid)
- For cPanel email: SMTP_HOST is usually `mail.yourdomain.com`, port 465 with SSL

---

## Updating the Site

When you make changes:

1. Build locally: `npx next build`
2. Re-upload `.next/standalone/` and `.next/static/`
3. In cPanel → **Setup Node.js App** → click **Restart**
