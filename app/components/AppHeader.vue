<script setup lang="ts">
</script>

<template>
  <UHeader
    class="bg-white border-b border-gray-200"
    :toggle="false"
  >
    <template #title>
      <div class="flex items-center gap-2">
        <div
          class="text-2xl font-bold"
          :style="{ color: '#00204B' }"
        >
          BLOCK
          CHANGE
        </div>
      </div>
    </template>

    <template #right>
      <a href="#testimonials">
        <UButton
          label="¿Quiénes somos?"
          color="primary"
          variant="solid"
          size="md"
          :style="{ backgroundColor: '#1DA977' }"
          class="hover:opacity-90 text-white"
        />
      </a>
    </template>
  </UHeader>
</template>
