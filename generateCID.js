const fs = require('fs-extra')
const matter = require('gray-matter')
const removeMd = require('remove-markdown')
const { NFTStorage, Blob } = require('nft.storage')
require('dotenv').config()
const folder = process.env.folder

const client = new NFTStorage({ token: process.env.NFT_STORAGE_TOKEN })

const main = async () => {
  const blogDir = `./docs/${folder}`
  let blogs = fs.readdirSync(blogDir);
  blogs = blogs.filter(item => item.endsWith('.md'))
  await Promise.all(blogs.map(async (blog) => {
    const file = matter.read(`${blogDir}/${blog}`, {
      excerpt: true,
      excerpt_separator: '',
    });

    const { data, excerpt } = file;
    const contents = removeMd(excerpt)
      .trim()
      .split(/\r\n|\n|\r/);

    if (!data.name) {
      console.log(`Do not have name metadata, ignore generate for ${blog}`)
      return 
    }
    if (!data.description) {
      console.log(`Do not have description metadata, ignore generate for ${blog}`)
      return 
    }
    if (!data.image) {
      console.log(`Do not have image metadata, ignore generate for ${blog}`)
      return 
    }
    if (data.metadataCID) {
      console.log(`Already have metadataCID, ignore generate for ${blog}`)
      return 
    }
    if (data.tokenId) {
      console.log(`Already have tokenId, ignore generate for ${blog}`)
      return
    }

    const name = data.name
    const description = data.description
    console.log(`====> upload image to ipfs: ${data.image}`)
    const image = await client.storeBlob(new Blob([fs.readFileSync(`${blogDir}/${data.image}`)]))
    const contentCID = await client.storeBlob(new Blob([fs.readFileSync(`${blogDir}/${blog}`)]))
    const metadata = {
      name,
      description,
      image,
      properties: {
        contentCID,
      }
    }
    console.log(`====> store blog to ipfs: ${blog}`)
    const metadataCID = await client.storeBlob(new Blob([JSON.stringify(metadata, null, 2)], {
      type: "application/json",
    }))

    console.log(`====> insert metadataCID for blog: ${blog}`)
    file.data.metadataCID = metadataCID
    fs.outputFileSync(`${blogDir}/${blog}`, file.stringify())
  }));
}

main()