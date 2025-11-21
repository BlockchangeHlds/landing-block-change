<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#171717' : 'white')

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  ogImage: '/logos/block-change-logo2.png',
  twitterImage: '/logos/block-change-logo2.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp :toaster="{ expand: false }">
    <ClientOnly>
      <AppHeader />
    </ClientOnly>

    <UMain>
      <NuxtPage />
    </UMain>

    <ClientOnly>
      <AppFooter />
    </ClientOnly>
  </UApp>
</template>
