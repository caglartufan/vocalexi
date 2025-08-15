Vocalexi is a multi-language word learning app.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Creating SSL Certificates

Step 1: Update package lists

```bash
sudo apt update
```

Step 2: Install required packages

You’ll need:

- curl to download the config file
- openssl to generate DH parameters

Install them with:

```bash
sudo apt install -y curl openssl
```

Step 3: Create the /etc/letsencrypt directory (if it doesn’t exist)

```bash
sudo mkdir -p /etc/letsencrypt
```

Step 4: Download the recommended SSL options config file

```bash
sudo curl -o /etc/letsencrypt/options-ssl-nginx.conf https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf
```

Step 5: Generate the Diffie-Hellman parameters file

```bash
sudo openssl dhparam -out /etc/letsencrypt/ssl-dhparams.pem 2048
```

Step 6: Ensure SSL certificates are provided

Ensure there are SSL certificate files required by the application are
provided in the /nginx/certificates/ directory. These files are:

- `domain.cert.pem`
- `private.key.pem`
