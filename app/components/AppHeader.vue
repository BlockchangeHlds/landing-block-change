<script setup lang="ts">
const nuxtApp = useNuxtApp()
const { activeHeadings, updateHeadings } = useScrollspy()

const items = computed(() => [{
  label: 'Features',
  to: '#features',
  active: activeHeadings.value.includes('features') && !activeHeadings.value.includes('pricing')
}, {
  label: 'Pricing',
  to: '#pricing',
  active: activeHeadings.value.includes('pricing')
}, {
  label: 'Testimonials',
  to: '#testimonials',
  active: activeHeadings.value.includes('testimonials') && !activeHeadings.value.includes('pricing')
}])

nuxtApp.hooks.hookOnce('page:finish', () => {
  updateHeadings([
    document.querySelector('#features'),
    document.querySelector('#pricing'),
    document.querySelector('#testimonials')
  ].filter(Boolean) as Element[])
})
</script>

<template>
  <UHeader class="bg-white border-b border-gray-200">
    <template #title>
      <div class="flex items-center gap-2">
        <div
          class="text-2xl font-bold"
          :style="{ color: '#00204B' }"
        >
          <span style="color: #1DA977;">*</span> BlockChange
        </div>
      </div>
    </template>

    <UNavigationMenu
      :items="navigationItems"
      class="hidden lg:flex"
    />

    <template #right>
      <UButton
        label="Empieza aquí"
        color="primary"
        variant="solid"
        size="md"
        :style="{ backgroundColor: '#1DA977' }"
        class="hover:opacity-90 text-white"
      />
    </template>

    <template #body>
      <UNavigationMenu
        :items="navigationItems"
        orientation="vertical"
        class="-mx-2.5"
      />
      <div class="mt-4 px-2.5">
        <UButton
          label="Empieza aquí"
          color="primary"
          variant="solid"
          size="md"
          block
          :style="{ backgroundColor: '#1DA977' }"
          class="hover:opacity-90 text-white"
        />
      </div>
    </template>
  </UHeader>
</template>
