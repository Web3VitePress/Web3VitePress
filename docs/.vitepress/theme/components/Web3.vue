<script setup>
import { useData } from 'vitepress'
import { useWeb3Auth } from '../composables/useWeb3Auth'
import DialogWide from './DialogWide.vue'

const { frontmatter } = $(useData())
const { doConnect, connectedChain, initContract, walletAddress, parseEther } = $(useWeb3Auth())

let msg = $ref('')
let showCreateTokenDialog = $ref(false)
let isLoading = $ref(false)
let title = $ref(frontmatter.title || '')
let description = $ref(frontmatter.description || '')
let basicPrice = $ref(frontmatter.basicPrice || '')


let showMintNFTDialog = $ref(false)
const doMintNFT = async () => {
  showMintNFTDialog = true
  isLoading = true
  // bafkreiapgycwszlvazlidzbbl6vkatxdikswow5ngcbbnz2seu42m5tbaq
  const blogId = '0'
  const amount = 1
  const mintType = 'comment'
  const articleCID = 'ipfs://bafkreiex7aahucycag35k7ejx2vnqpl7teda4jrjkhwvga4ttgljqrvn64'
  const contractWriter = await initContract('Web3VitePressV1', true)
  const data = {
    author: walletAddress,
    blogId, amount, mintType, articleCID
  }
  try {
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
  <DialogWide :show="showMintNFTDialog" @close="showMintNFTDialog = false">
    <div v-if="isLoading" class="p-10 text-xl text-center">
      mint the NFT now, pls wait...
    </div>
    <div v-else>
      {{ msg }}
    </div>
  </DialogWide>
</template>