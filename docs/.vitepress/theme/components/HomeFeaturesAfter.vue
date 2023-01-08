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
  <div class="max-w-6xl pt-6 mx-auto mt-10">
    <h2 class="text-center text-slate-500">Works with your bussiness</h2>
    <div class="flex flex-wrap items-center justify-center gap-8 mt-10 md:gap-20">
      <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 448 512">
        <rect x="0" y="0" width="448" height="512" fill="none" stroke="none" />
        <path fill="currentColor"
          d="M162.4 196c4.8-4.9 6.2-5.1 36.4-5.1c27.2 0 28.1.1 32.1 2.1c5.8 2.9 8.3 7 8.3 13.6c0 5.9-2.4 10-7.6 13.4c-2.8 1.8-4.5 1.9-31.1 2.1c-16.4.1-29.5-.2-31.5-.8c-10.3-2.9-14.1-17.7-6.6-25.3zm61.4 94.5c-53.9 0-55.8.2-60.2 4.1c-3.5 3.1-5.7 9.4-5.1 13.9c.7 4.7 4.8 10.1 9.2 12c2.2 1 14.1 1.7 56.3 1.2l47.9-.6l9.2-1.5c9-5.1 10.5-17.4 3.1-24.4c-5.3-4.7-5-4.7-60.4-4.7zm223.4 130.1c-3.5 28.4-23 50.4-51.1 57.5c-7.2 1.8-9.7 1.9-172.9 1.8c-157.8 0-165.9-.1-172-1.8c-8.4-2.2-15.6-5.5-22.3-10c-5.6-3.8-13.9-11.8-17-16.4c-3.8-5.6-8.2-15.3-10-22C.1 423 0 420.3 0 256.3C0 93.2 0 89.7 1.8 82.6C8.1 57.9 27.7 39 53 33.4c7.3-1.6 332.1-1.9 340-.3c21.2 4.3 37.9 17.1 47.6 36.4c7.7 15.3 7-1.5 7.3 180.6c.2 115.8 0 164.5-.7 170.5zm-85.4-185.2c-1.1-5-4.2-9.6-7.7-11.5c-1.1-.6-8-1.3-15.5-1.7c-12.4-.6-13.8-.8-17.8-3.1c-6.2-3.6-7.9-7.6-8-18.3c0-20.4-8.5-39.4-25.3-56.5c-12-12.2-25.3-20.5-40.6-25.1c-3.6-1.1-11.8-1.5-39.2-1.8c-42.9-.5-52.5.4-67.1 6.2c-27 10.7-46.3 33.4-53.4 62.4c-1.3 5.4-1.6 14.2-1.9 64.3c-.4 62.8 0 72.1 4 84.5c9.7 30.7 37.1 53.4 64.6 58.4c9.2 1.7 122.2 2.1 133.7.5c20.1-2.7 35.9-10.8 50.7-25.9c10.7-10.9 17.4-22.8 21.8-38.5c3.2-10.9 2.9-88.4 1.7-93.9z" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
        <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
        <path fill="currentColor" d="M4 20q-.825 0-1.412-.587Q2 18.825 2 18V6q0-.825.588-1.412Q3.175 4 4 4h12q.825 0 1.413.588Q18 5.175 18 6v4.5l3.15-3.15q.225-.225.538-.113Q22 7.35 22 7.7v8.6q0 .35-.312.462q-.313.113-.538-.112L18 13.5V18q0 .825-.587 1.413Q16.825 20 16 20Zm2.025-4h7.95q.325 0 .463-.275q.137-.275-.063-.525l-2.425-3.175q-.15-.2-.4-.2t-.4.2L9.25 14.5L8.1 13q-.15-.2-.4-.2t-.4.2l-1.675 2.2q-.2.25-.063.525q.138.275.463.275Z" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
        <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
        <path fill="currentColor" d="M12.5 15q1.05 0 1.775-.725Q15 13.55 15 12.5V7h3V5h-4v5.5q-.325-.25-.7-.375q-.375-.125-.8-.125q-1.05 0-1.775.725Q10 11.45 10 12.5q0 1.05.725 1.775Q11.45 15 12.5 15ZM8 18q-.825 0-1.412-.587Q6 16.825 6 16V4q0-.825.588-1.413Q7.175 2 8 2h12q.825 0 1.413.587Q22 3.175 22 4v12q0 .825-.587 1.413Q20.825 18 20 18Zm-4 4q-.825 0-1.412-.587Q2 20.825 2 20V6h2v14h14v2Z" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
        <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
        <path fill="currentColor" d="M12 22q-.65 0-1.175-.312q-.525-.313-.825-.838q-.825 0-1.412-.587Q8 19.675 8 18.85V15.3q-1.475-.975-2.362-2.575q-.888-1.6-.888-3.475q0-3.025 2.112-5.138Q8.975 2 12 2t5.137 2.112Q19.25 6.225 19.25 9.25q0 1.925-.887 3.5q-.888 1.575-2.363 2.55v3.55q0 .825-.587 1.413q-.588.587-1.413.587q-.3.525-.825.838Q12.65 22 12 22Zm-2-3.15h4v-.9h-4Zm0-1.9h4V16h-4ZM12.75 14v-2.7l2.2-2.2l-1.05-1.05l-1.9 1.9l-1.9-1.9L9.05 9.1l2.2 2.2V14Z" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
        <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
        <path fill="currentColor" d="M6 22q-.825 0-1.412-.587Q4 20.825 4 20V4q0-.825.588-1.413Q5.175 2 6 2h12q.825 0 1.413.587Q20 3.175 20 4v16q0 .825-.587 1.413Q18.825 22 18 22Zm5-11l2.5-1.5L16 11V4h-5Z" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
        <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
        <path fill="currentColor" d="M2 15s0-3 2-3c.68 0 1.46-.05 2.28-.18C7.2 12.54 8.5 13 10 13h.25l-1.69-1.71c.35-.11.69-.24 1.03-.38l1.91 1.91c.39-.08.75-.19 1.08-.32l-2.03-2.05c.3-.17.59-.34.88-.54L13.5 12c.3-.21.54-.44.75-.68l-2.03-2.03c.24-.22.48-.46.7-.71l1.87 1.87c.12-.31.21-.62.21-.95c0-.85-.45-1.61-1.16-2.22c.05-.09.11-.18.16-.28l1.53-.77c.85.94 2.61 1.61 4.72 1.74l.05.03h.7s1 1 1 4.5c0 .57 0 1.07-.04 1.5H19c-1.1 0-2.42.26-3.7.5c-1.18.26-2.4.5-3.3.5H2m19 2s.58 0 .86-2H19c-2 0-5 1-7 1H2.28c.34.6.98 1 1.72 1h17Z" />
      </svg>
    </div>
    <div class="flex flex-col items-center max-w-5xl p-8 mx-auto mt-20 text-center bg-black rounded-lg md:px-20 md:py-20">
      <h2 class="text-4xl tracking-tight text-white md:text-6xl">
        Start your Web3 Business Now
      </h2>
      <p class="mt-4 text-lg text-slate-400 md:text-xl">
        With some clicks and start selling in seconds.
      </p>
      <div class="flex mt-5">
        <a href="/blog/getting-started" class="rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200 px-5 py-2.5 bg-white text-black border-2 border-transparent">Get Started
        </a>
      </div>
    </div>
  </div>
</template>