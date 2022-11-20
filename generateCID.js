const fs = require('fs')
const matter = require('gray-matter')
const removeMd = require('remove-markdown')
const { NFTStorage, File, Blob } = require('nft.storage')
require('dotenv').config()

const client = new NFTStorage({ token: process.env.NFT_STORAGE_TOKEN })

const main = async () => {
  let blogs = fs.readdirSync('./docs/blog');
  blogs = blogs.filter(item => item.endsWith('.md'))
  let blogsArr = await Promise.all(blogs.map(async (blog) => {
    const file = matter.read(`./docs/blog/${blog}`, {
      excerpt: true,
      excerpt_separator: '',
    });

    const { data, excerpt, path } = file;
    const contents = removeMd(excerpt)
      .trim()
      .split(/\r\n|\n|\r/);

    if (data.CID) {
      return {}
    }

    const name = data.title || contents[0].replace(/\s{2,}/g, '').trim()
    const description = data.description || contents
                .slice(1)
                .join('')
                .replace(/\s{2,}/g, '')
                .trim()

              
    const image = await client.storeBlob(new Blob([fs.readFileSync(`./docs/blog/${data.image}`)]))
    const contentCID = await client.storeBlob(new Blob([fs.readFileSync(`./docs/blog/${blog}`)]))
    const metadata = {
      name,
      description,
      image,
      properties: {
        contentCID,
      }
    }

    const metadataCID = await client.storeBlob(new Blob([JSON.stringify(metadata, null, 2)], {
      type: "application/json",
    }))

    return {
      metadataCID,
      metadata,
      name,
      description,
      image,
    };
  }));
  blogsArr = blogsArr.filter(item => item.metadataCID)

  fs.writeFileSync('./data.json', JSON.stringify(blogsArr), 'utf-8');
}

main()