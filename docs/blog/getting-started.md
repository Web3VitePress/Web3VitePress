---
CID: xxxx
contractAddress: xx
---

# Getting Started(mock)

This section will help you build a basic VitePress documentation site from ground up. If you already have an existing project and would like to keep documentation inside the project, start from Step 2.

You can also try VitePress online on [StackBlitz](https://vitepress.new/). It runs the VitePress-based site directly in the browser, so it is almost identical to the local setup but doesn't require installing anything on your machine.

::: warning
VitePress is currently in `alpha` status. It is already suitable for out-of-the-box documentation use, but the config and theming API may still change between minor releases.
:::

## Step. 1: Create a new project

Create and change into a new directory.

```sh
mkdir vitepress-starter && cd vitepress-starter
```

Then, initialize with your preferred package manager.

```sh
yarn init
```

## Step. 2: Install VitePress

Add VitePress and Vue as dev dependencies for the project.

```sh
yarn add --dev vitepress vue
```

::: details Getting missing peer deps warnings?
`@docsearch/js` has certain issues with its peer dependencies. If you see some commands failing due to them, you can try this workaround for now:

If using PNPM, add this in your `package.json`:

```json
"pnpm": {
  "peerDependencyRules": {
    "ignoreMissing": [
      "@algolia/client-search"
    ]
  }
}
```

:::

Create your first document.

```sh
mkdir docs && echo '# Hello VitePress' > docs/index.md
```

## Step. 3: Boot up dev environment

Add some scripts to `package.json`.

```json
{
  ...
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:serve": "vitepress serve docs"
  },
  ...
}
```

Serve the documentation site in the local server.

```sh
yarn docs:dev
```

VitePress will start a hot-reloading development server at `http://localhost:5173`.

## Step. 4: Add more pages

Let's add another page to the site. Create a file name `getting-started.md` along with `index.md` you've created in Step. 2. Now your directory structure should look like this.

```
.
├─ docs
│  ├─ getting-started.md
│  └─ index.md
└─ package.json
```

Then, try to access `http://localhost:5173/getting-started.html` and you should see the content of `getting-started.md` is shown.

This is how VitePress works basically. The directory structure corresponds with the URL path. You add files, and just try to access it.

## What's next?

By now, you should have a basic but functional VitePress documentation site. But currently, the user has no way to navigate around the site because it's missing for example sidebar menu we have on this site.
