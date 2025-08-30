[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/examples/tree/main/framework-boilerplates/hono&template=hono)

Live Example: https://hono.vercel.dev/

Prerequisites:

- [Vercel CLI](https://vercel.com/docs/cli) installed globally

To develop locally:

```
npm install
vc dev
```

```
open http://localhost:3000
```

To build locally:

```
npm install
vc build
```

To deploy:

```
npm install
vc deploy
```

To use the Google Sheets API functionality, refer to the `src/googleSheets.ts` and `src/sheetsSample.ts` files for implementation details, and set up your Google Sheets API credentials as described below:

## Google Sheets API Setup

To use the Google Sheets API with service account authentication, you need to set up Google Cloud credentials:

1.  **Enable the Google Sheets API:**
    - Go to the [Google Cloud Console](https://console.cloud.google.com/).
    - Create a new project or select an existing one.
    - Navigate to "APIs & Services" > "Library".
    - Search for "Google Sheets API" and enable it.

2.  **Create Service Account Credentials:**
    - In the "APIs & Services" > "Credentials" section, click on "Create Credentials" > "Service Account".
    - Provide a name for the service account and assign it the "Editor" role (or a more restrictive role if preferred).
    - After creating the service account, go to the "Keys" tab, click on "Add Key" > "Create new key", select "JSON", and download the key file. This file contains your service account's credentials.

3.  **Set `GOOGLE_SERVICE_ACCOUNT_KEY` Environment Variable:**
    - Open the downloaded JSON key file. Copy its entire content.
    - Set an environment variable named `GOOGLE_SERVICE_ACCOUNT_KEY` with the *entire JSON content* as its value.
      **Example (Linux/macOS):**
      ```bash
      export GOOGLE_SERVICE_ACCOUNT_KEY='{"type": "service_account", ...}'
      ```
      **Example (Windows Command Prompt):**
      ```cmd
      set GOOGLE_SERVICE_ACCOUNT_KEY={"type": "service_account", ...}
      ```
      **Example (Windows PowerShell):**
      ```powershell
      $env:GOOGLE_SERVICE_ACCOUNT_KEY='{"type": "service_account", ...}'
      ```
      *Ensure the JSON content is correctly escaped or quoted for your shell.*

4.  **Share Your Google Sheet:**
    - Open the Google Sheet you want to interact with.
    - Click on the "Share" button and add the service account's email (found in the JSON key file, typically `client_email` field) with "Editor" permissions.
