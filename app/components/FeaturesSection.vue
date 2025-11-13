<script setup lang="ts">
// Datos de características del producto
const productFeatures = [
  {
    id: 1,
    icon: 'i-heroicons-arrow-trending-up',
    title: 'Alto Rendimiento',
    description: 'Podrás generar hasta 20% anual en dólares con estrategias optimizadas y probadas en el mercado cripto. Nuestro equipo experto monitorea constantemente las mejores oportunidades de inversión.',
    bullets: []
  },
  {
    id: 2,
    icon: 'i-heroicons-eye',
    title: 'Transparencia',
    description: '',
    bullets: [
      'Recibe tus reportes con el detalle de nuestras operaciones todos los meses',
      'Comunicate con nuestros socios las veces que creas necesarias'
    ]
  },
  {
    id: 3,
    icon: 'i-heroicons-shield-check',
    title: 'Riesgo estructurado y mitigado',
    description: '',
    bullets: [
      '30%: En criptodivisas, ETFs y commodities tokenizados',
      '30%: En activos virtuales en Spot',
      '40%: En protocolos de rentabilidad fija de stablecoins'
    ]
  },
  {
    id: 4,
    icon: 'i-heroicons-bolt',
    title: 'Liquidez Garantizada',
    description: 'Retira tu capital después de 6 meses sin penalidad y recibe tu ganancia de forma inmediata. Sin trabas ni complicaciones, tu dinero disponible cuando lo necesites.'
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
          Forma parte del mercado más rentable de esta generación
        </h2>

        <p class="pt-2 text-black">
          Invierte en activos digitales y genera hasta 20%
          de rentabilidad en dólares.
        </p>
      </div>

      <!-- Gráfico de Performance -->
      <div class="mb-16">
        <PerformanceChart />
      </div>

      <!-- Grid de características -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <p
            v-if="feature.description"
            class="text-gray-600 leading-relaxed"
          >
            {{ feature.description }}
          </p>

          <!-- Lista de bullets -->
          <ul
            v-if="feature.bullets && feature.bullets.length > 0"
            class="space-y-3"
          >
            <li
              v-for="(bullet, index) in feature.bullets"
              :key="index"
              class="flex items-start"
            >
              <span
                class="inline-block w-1.5 h-1.5 rounded-full mt-2 mr-3 flex-shrink-0"
                :style="{ backgroundColor: '#00204B' }"
              />
              <span class="text-gray-600 leading-relaxed">
                {{ bullet }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </UContainer>
  </div>
</template>
