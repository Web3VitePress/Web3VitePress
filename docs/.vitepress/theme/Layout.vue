<script setup>
import DefaultTheme from 'vitepress/theme'
import Web3 from './components/Web3.vue'
import Slogan from './components/Slogan.vue'
import CAT from './components/CAT.vue'
import Pricing from './components/Pricing.vue'
import Team from './components/Team.vue'
import Blog from './components/Blog.vue'
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <ClientOnly>
      <template #aside-outline-after>
        <Web3 />
      </template>
      <template #home-features-before>
        <Slogan v-if="$frontmatter.slogan" />
        <Pricing v-if="$frontmatter.pricing" />
        <Team v-if="$frontmatter.team" />
        <Blog v-if="$frontmatter.blog" />
      </template>
      <template #home-features-after>
        <CAT v-if="$frontmatter.cat" />
      </template>
    </ClientOnly>
  </Layout>
</template>