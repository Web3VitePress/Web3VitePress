<script setup>
import { useData } from 'vitepress'
import { useWeb3Auth } from '../composables/useWeb3Auth'
import DialogWide from './DialogWide.vue'


const { frontmatter } = $(useData())
const { doConnect, connectedChain, initContract } = $(useWeb3Auth())

let showCreateTokenDialog = $ref(true)
let isLoading = $ref(false)
let title = $ref(frontmatter.title || '')
let description = $ref(frontmatter.description || '')
let basicPrice = $ref(frontmatter.basicPrice || '')
let inviteCommission = $ref(frontmatter.inviteCommission || '')

const doCreateToken = async () => {
  let metadataCID = ''
  const metadata = {
    createdBy: walletAddress,
    title,
    intro,
    logo,
    basicPrice,
    inviteCommission,
  }
  metadataCID = await storeJson(metadata)

  const contractWriter = initContract('Web3VitePress', true)
  const value = parseEther('0.01')
  const _basicPrice = parseEther(basicPrice)
  const _inviteCommission = parseInt(inviteCommission) * 100 // inviteCommission / 10000 = xx%
  const tx = await contractWriter.createToken(_basicPrice, _inviteCommission, metadataCID, { value })
  console.log(`====> rz :`, rz)
}

const canCreateToken = $computed(() => !frontmatter.tokenId)

const doMintNFT = async () => {
  console.log(`====> mint :`)
}


</script>

<template>
  <div class="p-2 pt-6">
    <div v-if="connectedChain">
      <button type="button" class="btn-primary" @click="showCreateTokenDialog = true" v-if="canCreateToken">Create Token</button>
      <button type="button" class="btn-primary" v-else @click="doMintNFT">Mint NFT</button>
    </div>
    <button type="button" class="btn-primary" @click="doConnect" v-else>Connect Wallet</button>
  </div>
  <DialogWide :show="showCreateTokenDialog" @close="showCreateTokenDialog = false">
    <div class="divide-y space-y-8 divide-gray-200 text-lg p-5">
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
          <button class="btn-primary" @click="doSubmit" :isLoading="isLoading">Submit</button>
        </div>
      </div>
    </div>
  </DialogWide>
</template>