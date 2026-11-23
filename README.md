# Xsign — Vercel frontend

Blue-and-white Next.js frontend for the Xsign iOS IPA signing service. This package contains the website only. The Render API and signing worker are delivered separately and must be deployed before real signing can work.

## Included pages and assets

- `/` — simplified Xsign homepage with direct signer and Discord support links
- `/sign` — compact single-panel IPA, P12, P12-password and mobileprovision form, with a smaller collapsed advanced-options menu
- `/privacy` — privacy policy starter template with a Discord support invitation
- `/terms` — terms of service starter template with a Discord support invitation
- `public/xsign-logo.webp` — supplied Xsign logo used in the site header and footer
- `public/favicon.ico`, `public/favicon.png`, `public/xsign-icon.png`, `public/apple-touch-icon.png` — browser, shortcut and Apple touch icons made from the supplied logo
- `public/xsign-twitter-card.png` — 1200×630 Open Graph / Twitter large-image preview
- `public/site.webmanifest` — installable-site manifest and icon configuration

The social metadata is configured for Open Graph and Twitter `summary_large_image`. Set `NEXT_PUBLIC_SITE_URL` to the real public site origin in Vercel so crawler metadata resolves to the deployed Xsign URL rather than the development fallback.

## Requirements

- Node.js 20.9 or newer
- npm
- A Vercel project
- The matching Xsign Render API (provided in the backend package)

## Local development

1. Copy `.env.example` to `.env.local`.
2. Set `NEXT_PUBLIC_API_BASE_URL` to the Render API origin once the backend is deployed. Do not add Tigris credentials to this frontend project.
3. Install dependencies with `npm install`.
4. Start the local server with `npm run dev`.
5. Open `http://localhost:3000`.

The home, privacy and terms pages can be viewed before the backend exists. The signer reports that the API is not configured until `NEXT_PUBLIC_API_BASE_URL` is set.

## Deploy to Vercel

### Git deployment (recommended)

1. Extract this ZIP.
2. Create a new GitHub repository and upload the contents of this folder to its root.
3. In Vercel, select **Add New → Project**, import the repository and keep the framework as **Next.js**.
4. Keep the project root as the repository root. Vercel detects `package.json` and `vercel.json`.
5. Add this Environment Variable in Vercel Project Settings → Environment Variables:

   `NEXT_PUBLIC_API_BASE_URL` = `https://YOUR-RENDER-API.onrender.com`

6. Set `NEXT_PUBLIC_SITE_URL` to the exact public Xsign origin, including `https://` and with no trailing slash. This is used for canonical and social-card URLs.
7. Deploy. After changing environment variables, redeploy so the frontend build receives the new public API origin.

### Vercel CLI deployment

From this folder:

```bash
npm install
npx vercel
```

Follow the prompts to link or create the Vercel project. Add the environment variables in the Vercel dashboard, then deploy production:

```bash
npx vercel --prod
```

## Render API contract expected by this frontend

The separate Render project must implement these endpoints and enable CORS for the Vercel site origin:

### `POST /v1/uploads/presign`

Request:

```json
{
  "fileName": "application.ipa",
  "contentType": "application/octet-stream",
  "size": 123456,
  "purpose": "ipa"
}
```

Allowed `purpose` values used by the frontend: `ipa`, `p12`, `mobileprovision`, `app-icon`, `tweak`.

Response:

```json
{
  "uploadUrl": "https://...short-lived-presigned-put-url...",
  "objectKey": "incoming/random-object-key",
  "headers": { "Content-Type": "application/octet-stream" }
}
```

The `uploadUrl` should be short-lived and scoped to a random object key in the private `ipa-signer` bucket. Tigris CORS must allow the exact Vercel origin to `PUT` objects with the required headers.

### `POST /v1/signing/jobs`

Request:

```json
{
  "inputs": {
    "ipaObjectKey": "incoming/ipa-key",
    "ipaUrl": null,
    "p12ObjectKey": "incoming/p12-key",
    "mobileprovisionObjectKey": "incoming/profile-key",
    "iconObjectKey": null,
    "tweakObjectKeys": []
  },
  "p12Password": "certificate-password-or-empty-string",
  "options": {
    "appName": null,
    "bundleId": null,
    "appVersion": null,
    "buildNumber": null,
    "minimumIOS": null,
    "proMotion": false,
    "gameMode": false,
    "removeExtensions": false,
    "removeWatchApp": false
  }
}
```

The frontend may instead send `ipaUrl` and `ipaObjectKey: null`. The backend must validate remote URLs against SSRF, private IP, redirect and size attacks before fetching them.

Response:

```json
{ "jobId": "job-id", "stage": "Queued for signing" }
```

The P12 password is submitted over HTTPS with the job. The backend must never log it, must not put it in a URL, and should erase it from in-memory/job state as soon as certificate processing is complete. Do not persist it in a general job history table.

### `GET /v1/signing/jobs/:jobId`

While processing:

```json
{ "jobId": "job-id", "status": "processing", "progress": 42, "stage": "Signing application" }
```

When successful:

```json
{
  "jobId": "job-id",
  "status": "completed",
  "progress": 100,
  "stage": "Signing completed",
  "result": {
    "installUrl": "itms-services://?action=download-manifest&url=https://.../manifest.plist",
    "downloadUrl": "https://.../signed.ipa",
    "manifestUrl": "https://.../manifest.plist"
  }
}
```

When failed:

```json
{ "jobId": "job-id", "status": "failed", "error": "A clear user-safe error message" }
```

The frontend polls the status endpoint every 2.2 seconds until completion or failure.

## Tigris configuration for the Render backend

Use the AWS S3 SDK variable set (recommended for the Node.js Render worker using the AWS SDK). Set these on the Render backend service only; do not add them to Vercel or commit them to source control:

```env
AWS_ACCESS_KEY_ID=YOUR_ROTATED_TIGRIS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY=YOUR_ROTATED_TIGRIS_SECRET_ACCESS_KEY
AWS_ENDPOINT_URL_S3=https://t3.storage.dev
AWS_ENDPOINT_URL_IAM=https://iam.storage.dev
AWS_REGION=auto
TIGRIS_BUCKET=ipa-signer
```

The bucket must be created in Tigris and kept private. The Render backend should use the bucket name `ipa-signer` for uploads, signed outputs, manifests and short-lived job artifacts, with separate random object-key prefixes for each job. The credentials supplied in chat are not included in this ZIP; rotate them before using the service and store the replacement values as Render environment secrets.

## Important security requirements for the Render backend

- Keep all Tigris access credentials and signing keys exclusively in Render environment variables or secret files. Never use `NEXT_PUBLIC_` for secrets.
- Use the AWS S3 SDK environment variable set for Tigris on Render, not in this Vercel project.
- Keep the `ipa-signer` bucket private. Return short-lived signed upload URLs and short-lived result download URLs where suitable.
- Validate file sizes, extensions, file signatures, archive paths and certificate/profile compatibility server-side.
- Do not log P12 passwords, private key material, complete certificate contents, signed URLs or raw request bodies.
- Set restrictive CORS to the exact Xsign frontend origin; do not use `*` with credentials.
- Use random object keys, job ownership/authorization controls, rate limits and cleanup for abandoned uploads and completed jobs.
- Configure the requested file-retention policy in the backend and verify deletion from Tigris, temporary disk and backups before stating retention guarantees publicly.
- Validate all user-provided IPA URLs to prevent SSRF. Only allow HTTP(S), block private, loopback, link-local and metadata IP ranges, and re-check every redirect.

## Legal pages

The Privacy Policy and Terms of Service pages are starter text, not legal advice. Replace every bracketed placeholder and have the final text reviewed for the jurisdiction and actual data practices before public launch.
