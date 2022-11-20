
# Guide you to create a NFT for your blog

The article will guide you to make your blog to be a NFT that content store on IPFS.

## Step. 1: Write your blog

Create your new blog articl in the blog folder.

## Step. 2: Generate blog NFT image and content IPFS CID

```sh
node generateCID.js
```

This command will publish your blog article on to IPFS and auto generate new blog article's CID and store them into the `data.json`.

You can find your blog article's CID and copy it into your article's `frontmatter` field

```md
---
contractAddress: xxxx
imageCID: yyyy
contentCID: zzzz
---

```

## Step. 3: CreateToken for your new blog article

```sh
npm run dev
```

Navigate to your blog page, and you will find the `CreateToken` button on the right sidebar.

Click it will show a dialog and input the field you missing then click `submit` button.

Add the `CreateToken` result into your blog article's `frontmatter` field.

```md
---
contractAddress: xxxx
CID: yyyy
tokenId: zzzz
---

```

## Step. 4: Your reader can mint the article NFT to support you

Your reader now can see the `mint nft` button after they `connect wallet` on the right sidebar.
