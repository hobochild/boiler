# Nawr Example

This is a minimal example using [nawr](https://github.com/hobochild/nawr).

## Getting Started

First, add the required Environment Variables to a .env file. Its important to ensure these
environment variables are also present in you build environment.

| Environment Variable | Required |
| -------------------- | -------- |
| NAWR_AWS_KEY_ID      | true     |
| NAWR_AWS_SECRET      | true     |
| NAWR_AWS_REGION      | false    |
| NAWR_SQL_IS_PROD     | false    |

Then run:

```bash
npx nawr init
```

Then run the dev server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.
