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
    <template #aside-outline-after>
      <ClientOnly>
        <Web3 />
      </ClientOnly>
    </template>
    <template #home-features-before>
      <ClientOnly>
        <Slogan v-if="$frontmatter.slogan" />
        <Pricing v-if="$frontmatter.pricing" />
        <Team v-if="$frontmatter.team" />
        <Blog v-if="$frontmatter.blog" />
      </ClientOnly>
    </template>
    <template #home-features-after>
      <ClientOnly>
        <CAT v-if="$frontmatter.cat" />
      </ClientOnly>
    </template>
  </Layout>
</template>