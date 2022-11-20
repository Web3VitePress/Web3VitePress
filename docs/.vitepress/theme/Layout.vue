<script setup>
import DefaultTheme from 'vitepress/theme'
import Web3 from './components/Web3.vue'
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #aside-outline-after>
      <Web3 />
    </template>
  </Layout>
</template>