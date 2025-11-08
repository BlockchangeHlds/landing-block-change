<script setup lang="ts">
import { ref, computed } from 'vue'

const initialInvestment = ref(100)

// Opciones de meses disponibles
const monthOptions = [6, 12, 24, 36]
const selectedMonthIndex = ref(1) // Índice 1 = 12 meses por defecto

// Computed para obtener los meses seleccionados
const investmentMonthsValue = computed(() => monthOptions[selectedMonthIndex.value] || 12)

// Tasa de rendimiento anual proyectada según los meses
const annualReturn = computed(() => {
  const months = investmentMonthsValue.value
  if (months <= 12) {
    return 17.9
  } else if (months <= 24) {
    return 41.44
  } else {
    return 59.11
  }
})

// Calcular el rendimiento
const calculateReturn = computed(() => {
  const monthlyRate = annualReturn.value / 100 / 12
  const months = investmentMonthsValue.value
  const principal = initialInvestment.value

  const totalAmount = principal * Math.pow(1 + monthlyRate, months)
  const profit = totalAmount - principal
  const monthlyAverage = profit / months

  return {
    totalAmount: totalAmount.toFixed(2),
    profit: profit.toFixed(2),
    monthlyAverage: monthlyAverage.toFixed(2),
    percentage: ((profit / principal) * 100).toFixed(1)
  }
})

const clearCalculator = () => {
  initialInvestment.value = 100
  selectedMonthIndex.value = 1 // Reset a 12 meses
}

// Función para formatear montos con comas y decimales
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}
</script>

<template>
  <!-- Calculadora de Ganancias Section -->
  <div
    class="py-16 sm:py-24 rounded-3xl mx-4 sm:mx-8 my-8"
    :style="{
      background: 'linear-gradient(135deg, #00204B 0%, #001a3d 100%)'
    }"
  >
    <UContainer>
      <!-- Título y descripción -->
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
          ¡Potenciales ganancias!
        </h2>
        <p class="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto">
          Que tus activos digitales trabajen por ti
        </p>
      </div>

      <!-- Calculadora Card -->
      <UCard class="mb-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <!-- Inversión Inicial -->
          <div>
            <label class="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              Inversión inicial en dólares
              <UIcon name="i-heroicons-information-circle" class="w-4 h-4 text-gray-400" />
            </label>
            <UInput
              v-model.number="initialInvestment"
              type="number"
              size="lg"
              :ui="{ base: 'text-lg' }"
            />
          </div>

          <!-- Meses de inversión -->
          <div>
            <label class="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              Meses de inversión
              <UIcon name="i-heroicons-information-circle" class="w-4 h-4 text-gray-400" />
            </label>
            <div class="space-y-3">
              <div class="flex items-center justify-between text-sm text-gray-600">
                <span>6 meses</span>
                <span class="font-bold text-lg text-gray-900">{{ investmentMonthsValue }} meses</span>
                <span>36 meses</span>
              </div>
              <input
                v-model.number="selectedMonthIndex"
                type="range"
                min="0"
                max="3"
                step="1"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
              />
            </div>
          </div>

          <!-- Rendimiento y Botones -->
          <div class="flex flex-col gap-4">
            <div class="text-center lg:text-left">
              <p class="text-sm text-gray-600 mb-1">Rendimiento anual proyectado:</p>
              <p class="text-3xl font-bold text-gray-900">{{ annualReturn }}%*</p>
            </div>
            <div class="flex gap-3">
              <UButton
                color="primary"
                size="lg"
                class="flex-1"
                @click="() => {}"
              >
                Calcular resultados
              </UButton>
              <UButton
                color="neutral"
                size="lg"
                variant="outline"
                @click="clearCalculator"
              >
                <UIcon name="i-heroicons-arrow-path" class="w-5 h-5" />
                Limpiar
              </UButton>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Resultados Card -->
      <UCard>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Gráfico -->
          <div>
            <div class="flex items-center gap-2 mb-3">
              <UIcon name="i-heroicons-chart-bar" class="w-5 h-5 text-primary-500" />
              <h3 class="text-lg font-bold text-gray-900">
                Resultados de la calculadora de ganancias
              </h3>
            </div>
            <p class="text-xs text-gray-600 mb-1">*Retorno anual-últimos 6M</p>
            <p class="text-xl font-bold text-green-600 mb-3">+{{ calculateReturn.percentage }}%</p>

            <!-- Gráfico simple con barras -->
            <div class="relative h-32 flex items-end justify-between gap-1 pb-6">
              <!-- Líneas horizontales de referencia -->
              <div class="absolute left-0 right-0 top-0 bottom-6 flex flex-col justify-between pointer-events-none">
                <div class="w-full border-t border-gray-200" />
                <div class="w-full border-t border-gray-200" />
                <div class="w-full border-t border-gray-200" />
              </div>

              <!-- Eje Y -->
              <div class="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-xs text-gray-500 z-10">
                <span class="bg-white pr-2">${{ formatCurrency(parseFloat(calculateReturn.totalAmount)) }}</span>
                <span class="bg-white pr-2">${{ formatCurrency(parseFloat(calculateReturn.totalAmount) * 0.5) }}</span>
                <span class="bg-white pr-2">$0.00</span>
              </div>

              <!-- Barras del gráfico -->
              <div class="flex-1 ml-12 flex items-end justify-center gap-12 relative z-20" style="height: calc(100% - 1.5rem);">
                <!-- Columna inicial (inversión inicial - estática) -->
                <div class="flex flex-col items-center gap-1 h-full justify-end relative">
                  <div
                    class="w-24 bg-gray-900 rounded-t"
                    :style="{
                      height: `${(initialInvestment / parseFloat(calculateReturn.totalAmount)) * 100}%`
                    }"
                  />
                  <span class="text-xs text-gray-700 font-medium absolute -bottom-5">${{ formatCurrency(initialInvestment) }}</span>
                </div>

                <!-- Columna final (capital + ganancia) -->
                <div class="flex flex-col items-center gap-1 h-full justify-end relative">
                  <div
                    class="w-24 bg-green-600 rounded-t"
                    :style="{
                      height: `${(parseFloat(calculateReturn.totalAmount) / parseFloat(calculateReturn.totalAmount)) * 100}%`
                    }"
                  />
                  <span class="text-xs text-gray-700 font-medium absolute -bottom-5">${{ formatCurrency(parseFloat(calculateReturn.totalAmount)) }}</span>
                </div>
              </div>

              <!-- Eje X -->
              <div class="absolute bottom-0 left-12 right-0 flex justify-between text-xs text-gray-500">
                <span>Hoy</span>
                <span>{{ investmentMonthsValue }} meses</span>
              </div>
            </div>
          </div>

          <!-- Resultados detallados -->
          <div>
            <h3 class="text-lg font-bold text-gray-900 mb-4">
              Tu dinero podría rendir en
            </h3>

            <div class="space-y-2">
              <!-- Fila 1: Capital invertido y Plazo -->
              <div class="grid grid-cols-2 gap-2">
                <!-- Capital invertido -->
                <div class="p-4 border border-gray-200 rounded-lg">
                  <p class="text-2xl font-bold text-green-600 mb-1">
                    ${{ formatCurrency(initialInvestment) }}
                  </p>
                  <p class="text-xs text-gray-600">Capital invertido</p>
                </div>

                <!-- Plazo -->
                <div class="p-4 border border-gray-200 rounded-lg">
                  <p class="text-2xl font-bold text-green-600 mb-1">
                    {{ investmentMonthsValue }} meses
                  </p>
                  <p class="text-xs text-gray-600">Plazo</p>
                </div>
              </div>

              <!-- Tasa de retorno -->
              <div class="p-3 bg-[#00204B] rounded-lg h-10 flex items-center">
                <p class="text-white text-sm font-medium">
                  Tasa de retorno {{ calculateReturn.percentage }}%
                </p>
              </div>

              <!-- Fila 2: Capital + ganancia y Promedio mensual -->
              <div class="grid grid-cols-2 gap-2">
                <!-- Capital + ganancia -->
                <div class="p-4 border border-gray-200 rounded-lg">
                  <p class="text-2xl font-bold text-gray-900 mb-1">
                    ${{ formatCurrency(parseFloat(calculateReturn.totalAmount)) }}
                  </p>
                  <p class="text-xs text-green-600 font-medium mb-1">
                    +${{ formatCurrency(parseFloat(calculateReturn.profit)) }}
                  </p>
                  <p class="text-xs text-gray-600">Capital + ganancia aproximada</p>
                </div>

                <!-- Promedio mensual -->
                <div class="p-4 border border-gray-200 rounded-lg">
                  <p class="text-2xl font-bold text-gray-900 mb-1">
                    +${{ formatCurrency(parseFloat(calculateReturn.monthlyAverage)) }}
                  </p>
                  <p class="text-xs text-gray-600">Promedio mensual aproximado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </UContainer>
  </div>
</template>
