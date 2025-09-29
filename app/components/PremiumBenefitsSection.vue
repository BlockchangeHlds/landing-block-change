<script setup lang="ts">
// Características premium
const premiumFeatures = [
  {
    icon: 'i-heroicons-check-circle',
    text: 'Flexible solution'
  },
  {
    icon: 'i-heroicons-check-circle',
    text: 'Constant updates'
  }
]

// Datos de la tabla de inversiones
const investmentData = [
  {
    assetClass: 'Cash',
    year1: '100%',
    year2: '',
    year3: ''
  },
  {
    assetClass: 'Stocks',
    year1: '100%',
    year2: '50%',
    year3: ''
  },
  {
    assetClass: 'Bonds',
    year1: '90%',
    year2: '80%',
    year3: ''
  },
  {
    assetClass: 'Real Estate',
    year1: '90%',
    year2: '80%',
    year3: '30%'
  },
  {
    assetClass: 'Commodities',
    year1: '100%',
    year2: '50%',
    year3: '30%'
  }
]
</script>

<template>
  <!-- Premium Benefits Section -->
  <div
    class="py-16 sm:py-24 rounded-3xl mx-4 sm:mx-8 my-8"
    :style="{ backgroundColor: '#00204B' }"
  >
    <UContainer>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Contenido Premium -->
        <div class="text-white">
          <!-- Badge -->
          <UBadge
            label="Unlock premium benefits"
            variant="soft"
            size="sm"
            class="mb-6 bg-white/10 text-white border-white/20"
          />

          <!-- Título -->
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Access advanced tools, exclusive saving insights, ad-free experience
          </h2>

          <!-- Descripción -->
          <p class="text-lg text-white/80 mb-8 leading-relaxed">
            Experience the full potential of our app for enhanced financial control.
          </p>

          <!-- Botón CTA -->
          <UButton
            label="Upgrade to premium"
            variant="solid"
            size="lg"
            class="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 mb-8"
          />

          <!-- Características Premium -->
          <div class="flex flex-col sm:flex-row gap-6">
            <div
              v-for="feature in premiumFeatures"
              :key="feature.text"
              class="flex items-center gap-3 text-white/90"
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

        <!-- Investments Overview Table -->
        <div class="relative">
          <UCard
            variant="outline"
            class="bg-white shadow-xl"
          >
            <template #header>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">
                  Investments Overview
                </h3>
                <p class="text-sm text-gray-500">
                  Last updated 16 minutes ago
                </p>
              </div>
            </template>

            <!-- Tabla de Inversiones -->
            <div class="space-y-1">
              <!-- Header de la tabla -->
              <div class="grid grid-cols-4 gap-4 pb-3 border-b border-gray-200">
                <div class="text-sm font-medium text-gray-600">
                  Assets Classes
                </div>
                <div class="text-sm font-medium text-gray-600 text-center">
                  Year 1
                </div>
                <div class="text-sm font-medium text-gray-600 text-center">
                  Year 2
                </div>
                <div class="text-sm font-medium text-gray-600 text-center">
                  Year 3
                </div>
              </div>

              <!-- Filas de datos -->
              <div
                v-for="(row, index) in investmentData"
                :key="index"
                class="grid grid-cols-4 gap-4 py-3 items-center"
              >
                <div class="text-sm font-medium text-gray-900">
                  {{ row.assetClass }}
                </div>

                <!-- Year 1 -->
                <div class="flex justify-center">
                  <div
                    v-if="row.year1"
                    class="px-3 py-1 rounded-md text-xs font-medium text-white text-center min-w-[50px]"
                    :style="{ backgroundColor: '#00204B' }"
                  >
                    {{ row.year1 }}
                  </div>
                </div>

                <!-- Year 2 -->
                <div class="flex justify-center">
                  <div
                    v-if="row.year2"
                    class="px-3 py-1 rounded-md text-xs font-medium text-white text-center min-w-[50px]"
                    :style="{ backgroundColor: '#1DA977' }"
                  >
                    {{ row.year2 }}
                  </div>
                </div>

                <!-- Year 3 -->
                <div class="flex justify-center">
                  <div
                    v-if="row.year3"
                    class="px-3 py-1 rounded-md text-xs font-medium text-gray-600 text-center min-w-[50px] bg-gray-200"
                  >
                    {{ row.year3 }}
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
