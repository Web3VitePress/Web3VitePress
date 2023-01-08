<script setup>
import DefaultTheme from 'vitepress/theme'
import Web3 from './components/Web3.vue'
import Slogan from './components/Slogan.vue'
import CAT from './components/CAT.vue'
import Pricing from './components/Pricing.vue'
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #aside-outline-after>
      <ClientOnly>
        <Web3 />
      </ClientOnly>
    </template>
    <template #home-features-before>
      <Slogan v-if="$frontmatter.slogan" />
      <Pricing v-if="$frontmatter.pricing" />
    </template>
    <template #home-features-after>
      <CAT v-if="$frontmatter.cat" />
    </template>
  </Layout>
</template>