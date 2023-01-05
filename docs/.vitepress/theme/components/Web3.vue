<script setup>
import { useData } from 'vitepress'
import { useWeb3Auth } from '../composables/useWeb3Auth'
import DialogWide from './DialogWide.vue'
import { NFTStorage, Blob } from 'nft.storage'

const { frontmatter } = $(useData())
const { doConnect, connectedChain, initContract, walletAddress, parseEther } = $(useWeb3Auth())

let msg = $ref('')
let showCreateTokenDialog = $ref(false)
let isLoading = $ref(false)
let title = $ref(frontmatter.title || '')
let description = $ref(frontmatter.description || '')
let basicPrice = $ref(frontmatter.basicPrice || '')
const contentCID = $computed(() => frontmatter.contentCID)
const imageCID = $computed(() => frontmatter.imageCID)
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDIxMmZkRTRBOEFhY0RCZWE3RWFkRGNFMGU1NkI0NTFDQzdlNTM2QjYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2ODk1MTU2MTkwNiwibmFtZSI6IldlYjNWaXRlUHJlc3MifQ.yxdHbHZAjmjYgo2WL5G0vmRH5OdOEhvh9dWys2EVGzk'
// const client = new NFTStorage({ token: import.meta.env.NFT_STORAGE_TOKEN })
const client = new NFTStorage({ token })

const storeJson = async data => {
  return await client.storeBlob(new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  }))
}

const doCreateToken = async () => {
  let metadataCID = ''
  isLoading = true
  const metadata = {
    name: title,
    description,
    image: imageCID,
    properties: {
      createdBy: walletAddress,
      contentCID,
    }
  }
  metadataCID = await storeJson(metadata)

  const contractWriter = initContract('Web3VitePress', true)
  const value = parseEther('0.0001')
  const nftInfoArr = [
    title,
    description,
    imageCID,
    metadataCID,
  ]
  const tx = await contractWriter.upsertBlog(nftInfoArr, { value })
  const rc = await tx.wait()
  console.log(`====> rc :`, rc)
  msg = `create blog, pls check tx: https://explorer.glif.io/wallaby/tx/${tx.hash}`
  isLoading = false
  // showCreateTokenDialog = false
}

const canCreateToken = $computed(() => !frontmatter.tokenId)

let showMintNFTDialog = $ref(false)
const doMintNFT = async () => {
  showMintNFTDialog = true
  isLoading = true
  // bafkreiapgycwszlvazlidzbbl6vkatxdikswow5ngcbbnz2seu42m5tbaq
  const blogId = '0'
  const amount = 1
  const mintType = 'comment'
  const articleCID = 'ipfs://bafkreiex7aahucycag35k7ejx2vnqpl7teda4jrjkhwvga4ttgljqrvn64'
  const contractWriter = await initContract('Web3VitePress', true)
  const data = {
    author: walletAddress,
    blogId, amount, mintType, articleCID
  }
  try {
    const mintMetadataCID = await storeJson(data)
    const value = parseEther('' + basicPrice).mul(amount)
    const tx = await contractWriter.mintNFT(blogId, amount, mintType, articleCID, mintMetadataCID, { value })
    const rc = await tx.wait()
    console.log(`====> rc :`, rc)
    msg = `mint nft success, pls check tx: https://explorer.glif.io/wallaby/tx/${tx.hash}`
  } catch (e) {
    msg = e.data.message
  }
  isLoading = false
}

</script>

<template>
  <div class="p-2 pt-6">
    <div v-if="connectedChain">
      <button type="button" class="mb-2 btn-primary" @click="showCreateTokenDialog = true">Create Blog</button>
      <button type="button" class="btn-primary" @click="doMintNFT">Mint NFT</button>
    </div>
    <button type="button" class="btn-primary" @click="doConnect" v-else>Connect Wallet</button>
  </div>
  <DialogWide :show="showCreateTokenDialog" @close="showCreateTokenDialog = false">
    <div v-if="isLoading" class="p-10 text-xl text-center">
      create token now, pls wait...
    </div>
    <div v-else-if="msg" class="p-10 text-xl text-center">
      {{ msg }}
    </div>
    <div class="p-5 space-y-8 text-lg divide-y divide-gray-200" v-else>
      <div class="space-y-8 divide-y divide-gray-200">
        <div>
          <div class="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
            <!-- <FileUploaderThumbnail v-model="logo" title="Category Logo" class="sm:col-span-6" /> -->
            <div class="sm:col-span-6">
              <label for="title" class="block font-medium text-gray-700"> Title </label>
              <div class="mt-1">
                <input id="title" v-model="title" type="text" name="title" autocomplete="title" class="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              </div>
            </div>
            <div class="sm:col-span-6">
              <label for="description" class="block font-medium text-gray-700"> description </label>
              <div class="mt-1">
                <textarea id="description" v-model="description" name="description" rows="2" class="block w-full p-4 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pt-5">
        <div class="flex justify-end">
          <button class="mr-4" @click="showCreateTokenDialog = false">Cancel</button>
          <button class="btn-primary" @click="doCreateToken" :isLoading="isLoading">CreateToken</button>
        </div>
      </div>
    </div>
  </DialogWide>
  <DialogWide :show="showMintNFTDialog" @close="showMintNFTDialog = false">
    <div v-if="isLoading" class="p-10 text-xl text-center">
      mint the NFT now, pls wait...
    </div>
    <div v-else>
      {{ msg }}
    </div>
  </DialogWide>
</template>