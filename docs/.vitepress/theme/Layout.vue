<script setup>
import DefaultTheme from 'vitepress/theme'
import Web3 from './components/Web3.vue'
import Team from './components/Team.vue'
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
      <ClientOnly>
        <Team v-if="$frontmatter.team" />
      </ClientOnly>
    </template>
  </Layout>
</template>