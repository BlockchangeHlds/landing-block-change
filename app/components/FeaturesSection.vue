<script setup lang="ts">
// Datos de características del producto
const productFeatures = [
  {
    id: 1,
    icon: 'i-heroicons-credit-card',
    title: 'Alto Rendimiento',
    description: 'Podrías generar más 20% anual en dólares*'
  },
  {
    id: 2,
    icon: 'i-heroicons-chart-pie',
    title: 'Liquidez',
    description: 'Retira tu capital después de 6 meses sin penalidad y recibe tus ganancias mensualmente.'
  },
  {
    id: 3,
    icon: 'i-heroicons-funnel',
    title: 'Riesgo estructurado y mitigado',
    description: 'El 30% se invierte en criptodivisas, ETFs y commodities tokenizados, otro 30% en activos virtuales a más de 6 meses, y el 40% restante en stablecoins y USD en protocolos de rentabilidad fija.'
  },
  {
    id: 4,
    icon: 'i-heroicons-document-chart-bar',
    title: 'Transparencia',
    description: 'Tailor reports based on preferred time frames, and specific financial areas of interest.'
  }
]
</script>

<template>
  <!-- Features Section -->
  <div class="py-16 sm:py-24 bg-white">
    <UContainer>
      <!-- Badge y título -->
      <div class="text-center mb-16">
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-4xl mx-auto"
          :style="{ color: '#00204B' }"
        >
          Forma parte del mercado más rentable
          de esta generación
        </h2>

        <p class="pt-2">
          Invierte en activos virtuales y genera hasta 20%
          de rentabilidad en soles y dólares.
        </p>
      </div>

      <!-- Grid de características -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="feature in productFeatures"
          :key="feature.id"
          class="bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-colors duration-200"
        >
          <!-- Icono -->
          <div class="mb-6">
            <div
              class="w-12 h-12 rounded-lg flex items-center justify-center"
              :style="{ backgroundColor: '#f3f4f6' }"
            >
              <UIcon
                :name="feature.icon"
                class="w-6 h-6"
                :style="{ color: '#00204B' }"
              />
            </div>
          </div>

          <!-- Título -->
          <h3
            class="text-xl font-semibold mb-4"
            :style="{ color: '#00204B' }"
          >
            {{ feature.title }}
          </h3>

          <!-- Descripción -->
          <p class="text-gray-600 leading-relaxed">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </UContainer>
  </div>
</template>
