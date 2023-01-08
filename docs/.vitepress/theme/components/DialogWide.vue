<script setup lang="ts">
import { Dialog, TransitionChild, TransitionRoot, DialogOverlay } from '@headlessui/vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <TransitionRoot as="template" :show="props.show" @close="$emit('close')">
    <Dialog as="div" class="fixed inset-0 z-20 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0 sm:block">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:h-screen sm:inline-block sm:align-middle" aria-hidden="true">&#8203;</span>
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
          <div class="relative inline-block w-auto px-4 pt-5 pb-4 overflow-hidden text-left text-gray-700 align-middle transition-all transform bg-white rounded-lg shadow-xl max-w-4/5 max-h-4/5">
            <slot />
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
