---
contractAddress: 0xC7ce19577C040f9807f0Fdf1C7c64eEea5c137bB
basicPrice: 0.0001
description: "The article will guide you to make your blog to be a NFT that content store on IPFS.Step. 1: Write your blogCreate your new blog articl in the blog folder.Step. 2: Generate blog IPFS CIDnode generateCID.jsThis command will publish your blog article on to IPFS and auto generate new blog article's CID and store them into the data.json.You can find your blog article's CID and copy it into your article's frontmatter field"
title: 指引你为你的博客创建一个 NFT
imageCID: bafkreicp4smgidzdwbc7hazo43dvnopxmwlajjjcjvsfl574d5pq5vd64e
contentCID: bafkreiex7aahucycag35k7ejx2vnqpl7teda4jrjkhwvga4ttgljqrvn64
---

# 指引你为你的博客创建一个 NFT

本文将指引你设置你的博客作为一个 NFT 存储在 IPFS 上。

## Step. 1: 写你的博客内容

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
