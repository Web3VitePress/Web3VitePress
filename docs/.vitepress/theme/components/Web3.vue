<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/24/outline'
import { useData } from 'vitepress'
import { useWeb3Auth } from '../composables/useWeb3Auth'
import DialogWide from './DialogWide.vue'

const { frontmatter } = $(useData())
const { doConnect, connectedChain, initContract, parseEther } = $(useWeb3Auth())

let errMsg = $ref('')
let basicPrice = $computed(() => frontmatter.basicPrice)
let tokenId = $computed(() => frontmatter.tokenId)

const canMint = $computed(() => basicPrice > 0 && tokenId >= 0)

let state = $ref('')
let showMintNFTDialog = $ref(false)
let txLink = $ref('')
const doMintNFT = async () => {
  if (showMintNFTDialog) return

  showMintNFTDialog = true
  txLink = ''
  state = 'minting'
  const amount = 1
  const contractWriter = await initContract('Web3VitePressV1', true)
  try {
    const value = parseEther('' + basicPrice).mul(amount)
    const tx = await contractWriter.mintNFT(tokenId, amount, { value })
    const rc = await tx.wait()
    state = 'mint-success'
    txLink = `https://hyperspace.filfox.info/en/tx/${tx.hash}`
  } catch (e) {
    state = 'mint-error'
    console.log('====> e :', e)
    errMsg = e
  }
}

</script>

<template>
  <div class="p-2 pt-6" v-if="tokenId >= 0">
    <div v-if="connectedChain">
      <button type="button" class="btn-primary" @click="doMintNFT" v-if="canMint">Mint NFT</button>
    </div>
    <button type="button" class="btn-primary" @click="doConnect" v-else>Connect Wallet</button>
  </div>
  <DialogWide :show="showMintNFTDialog" @close="showMintNFTDialog = false">
    <div>
      <div v-if="state === 'minting'" class="p-10 text-xl text-center">
        mint the NFT now, pls wait...
      </div>
      <div v-if="state === 'mint-error'">
        {{ errMsg }}
      </div>
      <div v-if="state === 'mint-success'">
        <div class="px-10">
          <div class="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
            <CheckIcon class="w-6 h-6 text-green-600" aria-hidden="true" />
          </div>
          <div class="mt-3 text-center sm:mt-5">
            <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">You already mint the NFT successful</DialogTitle>
          </div>
        </div>
        <div class="mt-5 sm:mt-6">
          <a :href="txLink" target="_blank" class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm">Check Tx Detail</a>
        </div>
      </div>
    </div>
  </DialogWide>
</template>