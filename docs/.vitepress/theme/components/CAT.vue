<script setup lang="ts">
import { withBase } from 'vitepress'
</script>
<template>
  <div class="max-w-6xl px-6 pt-6 mx-auto mt-10 lg:px-0">
    <h2 class="text-center ">{{ $frontmatter.worksWith.title }}</h2>
    <div class="flex flex-wrap items-center justify-center gap-8 mt-10 md:gap-20">
      <img v-for="item in $frontmatter.worksWith.items" v-key="item.src" :src="withBase(item.src)" />
    </div>
    <div class="flex flex-col items-center max-w-5xl p-8 mx-auto mt-20 text-center bg-black rounded-lg md:px-20 md:py-20">
      <h2 class="text-4xl tracking-tight text-white md:text-6xl">
        {{ $frontmatter.cat.title }}
      </h2>
      <p class="mt-4 text-lg text-slate-400 md:text-xl">
        {{ $frontmatter.cat.description }}
      </p>
      <div class="flex mt-5">
        <a :href="$frontmatter.cat.btnLink" class="rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200 px-5 py-2.5 bg-white text-black border-2 border-transparent">{{ $frontmatter.cat.btnTxt }}
        </a>
      </div>
    </div>
  </div>
</template>