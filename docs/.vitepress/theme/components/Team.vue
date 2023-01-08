<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

</script>
<template>
  <VPTeamPage>
    <VPTeamPageTitle>
      <template #title>
        {{ $frontmatter.team.title }}
      </template>
      <template #lead>
        {{ $frontmatter.team.description }}
      </template>
    </VPTeamPageTitle>
    <div class="flex flex-col max-w-4xl gap-3 mx-auto mb-16">
      <h2 class="text-3xl font-bold text-gray-800">
        {{ $frontmatter.team.subTitle }}

      </h2>
      <p class="text-lg leading-relaxed text-slate-500">
        {{ $frontmatter.team.subDescription }}
      </p>
    </div>
    <VPTeamMembers :members="$frontmatter.team.members" />
  </VPTeamPage>
</template>