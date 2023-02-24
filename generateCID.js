const fs = require('fs')
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

    if (data.metadataCID) {
      console.log(`Already have metadataCID, ignore generate for ${blog}`)
      return 
    }
    if (data.tokenId) {
      console.log(`Already have tokenId, ignore generate for ${blog}`)
      return
    }

    const name = data.title || contents[0].replace(/\s{2,}/g, '').trim()
    const description = data.description || contents
                .slice(1)
                .join('')
                .replace(/\s{2,}/g, '')
                .trim()

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
    console.log(`====> store blog to ipfs: ${name}`)
    const metadataCID = await client.storeBlob(new Blob([JSON.stringify(metadata, null, 2)], {
      type: "application/json",
    }))

    console.log(`====> insert metadataCID for blog: ${blog}`)
    file.data.metadataCID = metadataCID
    fs.outputFileSync(`${blogDir}/${blog}`, file.stringify())
  }));
}

main()