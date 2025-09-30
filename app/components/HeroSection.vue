<script setup lang="ts">
// Características destacadas del hero
const heroFeatures = [
  {
    icon: 'i-heroicons-check-circle',
    text: 'Rentabilidad desde 180 días'
  },
  {
    icon: 'i-heroicons-check-circle',
    text: 'Inversiones desde $10,000'
  },
  {
    icon: 'i-heroicons-check-circle',
    text: 'Distribución de ganancias mensuales'
  }
]

// Métricas del dashboard
const dashboardMetrics = [
  {
    title: 'En Activos bajo nuestra\n' +
      'gestión desde el 2023',
    value: '$1,6M',
    change: '10% from last week',
    trend: 'up'
  },
  {
    title: 'De costo \n' +
      'de mantenimiento Anual',
    value: '0.083%',
    change: '12% from last week',
    trend: 'up'
  },
  {
    title: 'Rendimientos hasta',
    value: '24% Anual*',
    change: '*Es una proyección en base al comportamiento del mercado. No podemos garantizar la cifra.',
    trend: 'up'
  }
]
</script>

<template>
  <!-- Hero Section -->
  <div class="relative bg-teal-50 py-16 sm:py-24">
    <UContainer>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Contenido del Hero -->
        <div class="text-center lg:text-left">
          <!-- Título principal -->
          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            :style="{ color: '#00204B' }"
          >
            Hacemos crecer tu capital con estrategias en activos digitales, de forma segura.
          </h1>

          <!-- Descripción -->
          <p class="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Hacemos crecer tu capital con estrategias en activos digitales, de forma segura.
          </p>

          <!-- Botones CTA -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
            <UButton
              label="Empieza aquí"
              variant="solid"
              size="lg"
              :style="{ backgroundColor: '#1DA977' }"
              class="hover:opacity-90 text-white px-8 py-3"
            />
            <a href="#testimonials">
              <UButton
                label="¿Quiénes somos?"
                color="neutral"
                variant="outline"
                size="lg"
                class="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3"
              />
            </a>
          </div>

          <!-- Características destacadas -->
          <div class="mt-10 flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
            <div
              v-for="feature in heroFeatures"
              :key="feature.text"
              class="flex items-center gap-2 text-sm text-gray-600"
            >
              <UIcon
                :name="feature.icon"
                class="w-5 h-5 flex-shrink-0"
                :style="{ color: '#1DA977' }"
              />
              <span>{{ feature.text }}</span>
            </div>
          </div>
        </div>

        <!-- Dashboard Preview -->
        <div class="relative">
          <UCard
            variant="outline"
            class="bg-white shadow-xl overflow-hidden"
          >
            <!-- Header del Dashboard -->

            <!-- Contenido del Dashboard -->
            <div class="space-y-6">
              <!-- Métricas principales -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div
                  v-for="metric in dashboardMetrics"
                  :key="metric.title"
                  class="bg-gray-50 rounded-lg p-4"
                >
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="text-sm font-medium text-gray-600">
                      {{ metric.title }}
                    </h4>
                    <UIcon
                      name="i-heroicons-arrow-trending-up"
                      class="w-4 h-4"
                      :style="{ color: '#1DA977' }"
                    />
                  </div>
                  <div class="flex items-end justify-between">
                    <div>
                      <p
                        class="text-2xl font-bold"
                        :style="{ color: '#00204B' }"
                      >
                        {{ metric.value }}
                      </p>
                      <p class="text-xs text-gray-500">
                        {{ metric.change }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </UContainer>
  </div>
</template>
