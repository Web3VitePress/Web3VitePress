const fs = require('fs-extra')
const matter = require('gray-matter')
const ethers = require('ethers')
const { NFTStorage, Blob } = require('nft.storage')
require('dotenv').config()
const folder = process.env.folder

const client = new NFTStorage({ token: process.env.NFT_STORAGE_TOKEN })

const contractAddressMap = {
  'mumbai': '0xb170dC19fce49364b38a9B0290f48Fc856936209'
}
const chainMap = {
  'hardhat': {
    privateKey: '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
    rpcUrl:  'http://127.0.0.1:8545/',
    opts: {
      chainId: 0x7a69,
      name: 'hardhat'
    }
  },
  'hyperspace': {
    rpcUrl: 'https://api.hyperspace.node.glif.io/rpc/v1',
    opts: {
      chainId: 3141,
      name: 'Hyperspace'
    }
  },
  'mumbai': {
    rpcUrl: 'https://matic-mumbai.chainstacklabs.com',
    opts: {
      chainId: 80001,
      name: 'Polygon Testnet Mumbai'
    }
  },
}
const getContractWriter = () => {
  const {chainKey} = process.env
  const chainConfig = chainMap[chainKey]
  const contractAddress = contractAddressMap[chainKey]

  let privateKey = process.env.PRIVATE_KEY;
  if (chainKey === 'hardhat') {
    privateKey = chainConfig.privateKey
  }

  const provider = new ethers.providers.StaticJsonRpcProvider(chainConfig.rpcUrl, chainConfig.opts);
  const signer = new ethers.Wallet(privateKey, provider);
  const abi = fs.readJsonSync('./docs/.vitepress/theme/web3/abis/Web3VitePressV1.json')
  return new ethers.Contract(contractAddress, abi, signer)
}

const processOneArticle = async (blog, blogDir) => {
  const file = matter.read(`${blogDir}/${blog}`, {
    excerpt: true,
    excerpt_separator: '',
  });

  const { data } = file;

  if (!data.name) {
    console.log(`Do not have name metadata, ignore generate for ${blog}`)
    return 
  }
  if (!data.description) {
    console.log(`Do not have description metadata, ignore generate for ${blog}`)
    return 
  }
  if (!data.basicPrice) {
    console.log(`Do not have basicPrice metadata, ignore generate for ${blog}`)
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

  // const name = data.name
  // const description = data.description
  // console.log(`====> upload image to ipfs: ${data.image}`)
  // const image = await client.storeBlob(new Blob([fs.readFileSync(`${blogDir}/${data.image}`)]))
  // const contentCID = await client.storeBlob(new Blob([fs.readFileSync(`${blogDir}/${blog}`)]))
  // const metadata = {
  //   name,
  //   description,
  //   image,
  //   properties: {
  //     contentCID,
  //   }
  // }
  // console.log(`====> store blog to ipfs: ${blog}`)
  // const metadataCID = await client.storeBlob(new Blob([JSON.stringify(metadata, null, 2)], {
  //   type: "application/json",
  // }))
  // console.log(`====> metadataCID :`, metadataCID)

  const metadataCID = 'bafkreicde7hco6ga64o4jnqhthclk2eb4ytny7sgvmrnznb2hhhpszgn24'
  const basicPrice = ethers.utils.parseEther(data.basicPrice + '')
  const value = ethers.utils.parseEther('0.01')
  const contractWriter = getContractWriter()
  const tx = await contractWriter.createToken(basicPrice, metadataCID, {value})
  const rz = await tx.wait()
  const event = rz.events.find(event => event.event === 'CreateToken')
  const tokenId = event.args.tokenId.toString()
  console.log(`====> update metadata for blog "${blog}" with metadataCID: ${metadataCID}, tokenId: ${tokenId}`)
  file.data.metadataCID = metadataCID
  file.data.tokenId = tokenId
  fs.outputFileSync(`${blogDir}/${blog}`, file.stringify())
}

const main = async () => {
  const blogDir = `./docs/${folder}`
  let blogs = fs.readdirSync(blogDir);
  blogs = blogs.filter(item => item.endsWith('.md'))
  for (const blog of blogs) {
    await processOneArticle(blog, blogDir)
  }
}

main()