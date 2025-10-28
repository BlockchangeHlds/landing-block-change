<script setup lang="ts">
</script>

<template>
  <UHeader
    class="bg-white border-b border-gray-200"
    :toggle="false"
  >
    <template #title>
      <div class="flex items-center gap-2">
        <a
          href="/"
          class="flex items-center"
        >
          <img
            src="/logos/logo.png"
            class="h-10 w-auto object-contain"
            alt="BlockChange Logo"
          >
        </a>
      </div>
    </template>

    <template #right>
      <a href="#contactanos">
        <UButton
          label="Contáctanos"
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
