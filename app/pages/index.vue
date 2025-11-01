<script setup lang="ts">
// Meta tags para SEO
useHead({
  title: 'Block Change',
  meta: [
    {
      name: 'description',
      content: 'Hacemos crecer tu capital con estrategias en activos digitales, de forma segura.'
    }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <HeroSection />

    <!-- Calculator Section -->
    <CalculatorSection />

    <!-- Team Section -->
    <TeamSection />

    <!-- Features Section -->
    <FeaturesSection />

    <!-- Call to Action Section -->
    <CallToActionSection />
  </div>
</template>
