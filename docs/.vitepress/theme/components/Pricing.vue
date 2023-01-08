<script setup lang="ts">
import { useData } from 'vitepress'
const { frontmatter } = $(useData())

const title = $computed(() => frontmatter.pricing.title)
const description = $computed(() => frontmatter.pricing.description)
const items = $computed(() => frontmatter.pricing.items || [])
</script>
<template>
  <div class="max-w-screen-xl px-5 mx-auto">
    <div class="mt-16 text-center">
      <h1 class="text-4xl font-bold lg:text-5xl lg:tracking-tight">
        {{ title }}
      </h1>
      <p class="mt-4 text-lg ">
        {{ description }}
      </p>
    </div>
    <div class="grid max-w-screen-lg gap-10 mx-auto mt-12 md:grid-cols-3">
      <div v-for="item in items">
        <div class="flex flex-col w-full order-first lg:order-none border-2 border-[#D8DEE9] border-opacity-50 py-5 px-6 rounded-md">
          <div class="text-center">
            <h4 class="text-lg font-medium ">{{ item.type }}</h4>
            <p class="mt-3 text-4xl font-bold md:text-4xl">
              {{ item.price }}
            </p>
          </div>
          <ul class="grid mt-8 text-left gap-y-4">
            <li class="flex items-start gap-3 " v-for="_item in item.items">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" fill="currentColor" fill-opacity=".16"></circle>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.75 12a8.25 8.25 0 0 1 11.916-7.393.75.75 0 1 0 .668-1.343A9.713 9.713 0 0 0 12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75c0-.366-.02-.727-.06-1.082a.75.75 0 1 0-1.49.164A8.25 8.25 0 1 1 3.75 12Zm17.78-6.47a.75.75 0 0 0-1.06-1.06L12 12.94l-2.47-2.47a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l9-9Z" fill="currentColor"></path>
              </svg>
              <span>{{ _item }}</span>
            </li>
          </ul>
          <div class="flex mt-8">
            <a :href="item.btnLink" class="rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200 w-full px-5 py-2.5  border-2 " :class="item.isRecommented ? 'bg-black text-white hover:bg-gray-800 border-transparent' : 'border-black hover:bg-gray-100 text-black bg-white'">{{ item.btnTxt }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>