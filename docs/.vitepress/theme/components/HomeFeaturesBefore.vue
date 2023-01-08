<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])
interface Props {
  modelValue?: string
}
const {
  modelValue,
} = defineProps<Props>()

</script>
<template>
  <div class="max-w-6xl py-12 mx-auto mt-16">
    <h2 class="text-4xl font-bold lg:text-5xl lg:tracking-tight">Everything you need to start a web3 business</h2>
    <p class="my-4 text-lg text-slate-600">
      SellX3 comes batteries included. It takes the best parts of state-of-the-art tools and adds its own innovations.
    </p>
  </div>
</template>