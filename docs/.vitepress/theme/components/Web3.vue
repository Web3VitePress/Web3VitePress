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
let inviteCommission = $ref(frontmatter.inviteCommission || '')
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
      basicPrice,
      inviteCommission,
    }
  }
  metadataCID = await storeJson(metadata)

  const contractWriter = initContract('Web3VitePress', true)
  const value = parseEther('0.01')
  const _basicPrice = parseEther('' + basicPrice)
  const _inviteCommission = parseInt(inviteCommission) * 100 // inviteCommission / 10000 = xx%
  const tx = await contractWriter.createToken(_basicPrice, _inviteCommission, metadataCID, { value })
  // const rz = await tx.wait()
  console.log(`====> tx :`, tx)
  msg = `create token, pls check tx: https://explorer.glif.io/wallaby/tx/${tx.hash}`
  isLoading = false
  // showCreateTokenDialog = false
}

const canCreateToken = $computed(() => !frontmatter.tokenId)

let showMintNFTDialog = $ref(false)
const doMintNFT = async () => {
  showMintNFTDialog = true
  isLoading = true
  const tokenId = 1
  const mintAmount = 1
  const contractWriter = await initContract('Web3VitePress', true)
  const data = {
    author: walletAddress,
    amount: mintAmount,
    tokenId,
  }
  try {
    const metadataCID = await storeJson(data)
    console.log(`====> metadataCID :`, metadataCID)
    const value = parseEther('' + basicPrice).mul(mintAmount)
    const tx = await contractWriter.mintNFT(tokenId, mintAmount, metadataCID, { value })
    await tx.wait()
  } catch (e) {
    msg = e.data.message
  }
  isLoading = false
}

</script>

<template>
  <div class="p-2 pt-6">
    <div v-if="connectedChain">
      <button type="button" class="mb-2 btn-primary" @click="showCreateTokenDialog = true">Create Token</button>
      <button type="button" class="btn-primary" @click="doMintNFT">Mint NFT</button>
    </div>
    <button type="button" class="btn-primary" @click="doConnect" v-else>Connect Wallet</button>
  </div>
  <DialogWide :show="showCreateTokenDialog" @close="showCreateTokenDialog = false">
    <div v-if="isLoading" class="text-xl text-center p-10">
      create token now, pls wait...
    </div>
    <div v-else-if="msg" class="text-xl text-center p-10">
      {{ msg }}
    </div>
    <div class="divide-y space-y-8 divide-gray-200 text-lg p-5" v-else>
      <div class="divide-y space-y-8 divide-gray-200">
        <div>
          <div class="mt-6 grid gap-y-6 gap-x-4 grid-cols-1 sm:grid-cols-6">
            <!-- <FileUploaderThumbnail v-model="logo" title="Category Logo" class="sm:col-span-6" /> -->
            <div class="sm:col-span-6">
              <label for="title" class="font-medium text-gray-700 block"> Title </label>
              <div class="mt-1">
                <input id="title" v-model="title" type="text" name="title" autocomplete="title" class="rounded-md border-gray-300 shadow-sm w-full block  focus:border-indigo-500 focus:ring-indigo-500">
              </div>
            </div>
            <div class="sm:col-span-6">
              <label for="description" class="font-medium text-gray-700 block"> description </label>
              <div class="mt-1">
                <textarea id="description" v-model="description" name="description" rows="2" class="bg-white border rounded-md border-gray-300 shadow-sm w-full p-4 block  focus:border-indigo-500 focus:ring-indigo-500" />
              </div>
            </div>
            <div class="sm:col-span-6">
              <label for="basicPrice" class="font-medium text-gray-700 block"> Basic Price </label>
              <div class="mt-1">
                <input id="basicPrice" v-model="basicPrice" type="text" name="basicPrice" autocomplete="basicPrice" class="rounded-md border-gray-300 shadow-sm w-full block  focus:border-indigo-500 focus:ring-indigo-500">
              </div>
              <p class="mt-2 text-gray-400">This is the price for your reader to mint NFT</p>
            </div>
            <div class="sm:col-span-6">
              <label for="inviteCommission" class="font-medium text-gray-700 block">Invite Commission </label>
              <div class="mt-1">
                <input id="inviteCommission" v-model="inviteCommission" type="text" name="inviteCommission" autocomplete="inviteCommission" class="rounded-md border-gray-300 shadow-sm w-full block  focus:border-indigo-500 focus:ring-indigo-500">
              </div>
              <p class="mt-2 text-gray-400">Anyone invite new reader for you will get the commission forever for the member's any payment</p>
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
    <div v-if="isLoading" class="text-xl text-center p-10">
      mint the NFT now, pls wait...
    </div>
    <div v-else>
      {{ msg }}
    </div>
  </DialogWide>
</template>