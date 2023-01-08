<script setup>
import DefaultTheme from 'vitepress/theme'
import Web3 from './components/Web3.vue'
import HomeFeaturesBefore from './components/HomeFeaturesBefore.vue'
import HomeFeaturesAfter from './components/HomeFeaturesAfter.vue'
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
      <HomeFeaturesBefore />
    </template>
    <template #home-features-after>
      <HomeFeaturesAfter />
    </template>
  </Layout>
</template>