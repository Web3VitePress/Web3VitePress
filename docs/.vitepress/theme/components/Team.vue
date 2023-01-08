<script setup lnag="ts">
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
    <div class="flex flex-col max-w-4xl gap-3 px-6 mx-auto mb-16 lg:px-0">
      <h2 class="text-3xl font-bold ">
        {{ $frontmatter.team.subTitle }}
      </h2>
      <p class="text-lg leading-relaxed">
        {{ $frontmatter.team.subDescription }}
      </p>
    </div>
    <VPTeamMembers :members="$frontmatter.team.members" />
  </VPTeamPage>
</template>