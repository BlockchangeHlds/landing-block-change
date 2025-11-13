<script setup lang="ts">
// Características destacadas del hero
const heroFeatures = [
  {
    icon: 'i-heroicons-check-circle',
    text: 'Plazo mínimo de permanencia: 6 meses'
  },
  {
    icon: 'i-heroicons-check-circle',
    text: 'Inversión desde $10,000'
  },
  {
    icon: 'i-heroicons-check-circle',
    text: 'Distribución de ganancias mensuales'
  },
  {
    icon: 'i-heroicons-check-circle',
    text: 'Reportes mensuales con detalle de operaciones'
  }
]

// Métricas del dashboard
const dashboardMetrics = [
  {
    title: 'Activos bajo nuestra\n' +
      'gestión desde el 2023',
    value: '$1,6M',
    change: '',
    trend: 'up'
  },
  {
    title: 'Costo \n' +
      'de mantenimiento Anual',
    value: '0.083%',
    change: '',
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
      <div class="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
        <!-- Contenido del Hero -->
        <div class="text-center lg:text-left lg:order-1 w-full">
          <!-- Título principal - Se muestra primero en mobile -->
          <div class="order-1">
            <h1
              class="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              :style="{ color: '#00204B' }"
            >
              Hacemos crecer tu capital con estrategias en activos digitales, de forma segura.
            </h1>
          </div>

          <!-- Dashboard en mobile - aparece después del título -->
          <div class="order-2 lg:hidden mb-8">
            <UCard
              variant="outline"
              class="bg-white shadow-xl overflow-hidden"
            >
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

          <!-- Resto del contenido del hero -->
          <div class="order-3">
            <!-- Descripción -->
            <p class="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Diversificamos tus inversiones en activos digitales con análisis, estrategia y control
            </p>

            <!-- Botones CTA -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <UButton
                label="Proyecta tus rendimientos"
                variant="solid"
                size="lg"
                :style="{ backgroundColor: '#1DA977' }"
                class="hover:opacity-90 text-white px-8 py-3 justify-center"
              />
              <!-- <a href="#testimonials">
                <UButton
                  label="¿Quiénes somos?"
                  color="neutral"
                  variant="outline"
                  size="lg"
                  class="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3"
                />
              </a> -->
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
        </div>

        <!-- Dashboard Preview - Solo visible en desktop -->
        <div class="relative hidden lg:block lg:order-2">
          <UCard
            variant="outline"
            class="bg-white shadow-xl overflow-hidden"
          >
            <!-- Contenido del Dashboard -->
            <div class="space-y-6">
              <!-- Métricas principales -->
              <div class="grid grid-cols-1 gap-4">
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
