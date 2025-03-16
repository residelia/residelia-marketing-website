# Nuxt 3 + Sanity RESIDELIA website

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash

# yarn
yarn dev --dotenv .env.development

# npx
npx nuxi dev --dotenv .env.development
```

## Production

Build the application for production:

```bash
# yarn
yarn generate --dotenv .env.development
```

Locally preview production build:

```bash

# yarn
npx serve -s -d -C -S .output/public
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
