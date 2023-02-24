<script setup>
import DefaultTheme from 'vitepress/theme'
import Web3 from './components/Web3.vue'
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #aside-outline-after>
      <ClientOnly>
        <Web3 />
      </ClientOnly>
    </template>
  </Layout>
</template>