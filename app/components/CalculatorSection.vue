<script setup lang="ts">
import { ref, computed } from 'vue'

const initialInvestment = ref(10000)
const displayInvestment = ref('10,000.00')
const hasInteracted = ref(false)
const showButton = ref(false)
let interactionTimeout: ReturnType<typeof setTimeout> | null = null

// Marcar como interactuado
const markAsInteracted = () => {
  if (!hasInteracted.value) {
    hasInteracted.value = true

    // Limpiar timeout anterior si existe
    if (interactionTimeout) {
      clearTimeout(interactionTimeout)
    }

    // Esperar 3 segundos antes de mostrar el botón
    interactionTimeout = setTimeout(() => {
      showButton.value = true
    }, 5000)
  }
}

// Validar monto mínimo
const validateInvestment = () => {
  if (initialInvestment.value < 10000) {
    initialInvestment.value = 10000
  }
}

// Formatear input mientras el usuario escribe
const handleInvestmentInput = (event: Event) => {
  markAsInteracted()
  const input = event.target as HTMLInputElement
  const value = input.value.replace(/[^0-9.]/g, '')
  const numValue = parseFloat(value) || 0

  initialInvestment.value = numValue >= 10000 ? numValue : 10000
  displayInvestment.value = formatCurrency(initialInvestment.value)
}

// Actualizar display cuando pierde el foco
const handleInvestmentBlur = () => {
  markAsInteracted()
  validateInvestment()
  displayInvestment.value = formatCurrency(initialInvestment.value)
}

// Opciones de meses disponibles
const monthOptions = [6, 12, 24, 36]
const selectedMonthIndex = ref(1) // Índice 1 = 12 meses por defecto

// Computed para obtener los meses seleccionados
const investmentMonthsValue = computed(() => monthOptions[selectedMonthIndex.value] || 12)

// Tasa de rendimiento anual proyectada según los meses
const annualReturn = computed(() => {
  const months = investmentMonthsValue.value
  if (months <= 6) {
    return 1
  } else if (months <= 12) {
    return 22
  } else if (months <= 24) {
    return 44
  } else {
    return 66
  }
})

// Calcular el rendimiento
const calculateReturn = computed(() => {
  const months = investmentMonthsValue.value
  const principal = initialInvestment.value
  const multiplier = 1 + (annualReturn.value / 100)
  const totalAmount = principal * multiplier
  const profit = totalAmount - principal
  const monthlyAverage = profit / months

  return {
    totalAmount: totalAmount.toFixed(2),
    profit: profit.toFixed(2),
    monthlyAverage: monthlyAverage.toFixed(2),
    percentage: ((profit / principal) * 100).toFixed(1)
  }
})
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
    id="calculator"
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
      <UCard class="mb-8 bg-white">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <!-- Inversión Inicial -->
          <div>
            <label class="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              Inversión inicial en dólares
              <!--              <UTooltip text="Ingresa el monto que deseas invertir. El mínimo es $10,000.00 dólares">
                <UIcon name="i-heroicons-information-circle" class="w-4 h-4 text-gray-400 cursor-help" />
              </UTooltip> -->
            </label>
            <UInput
              v-model="displayInvestment"
              type="text"
              size="lg"
              :ui="{ base: 'text-lg' }"
              @input="handleInvestmentInput"
              @blur="handleInvestmentBlur"
            />
            <p class="text-xs text-gray-500 mt-1">
              Monto mínimo: $10,000.00
            </p>
          </div>

          <!-- Meses de inversión -->
          <div>
            <label class="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              Meses de inversión
              <!--              <UTooltip text="Selecciona el plazo de tu inversión: 6, 12, 24 o 36 meses">
                <UIcon
                  name="i-heroicons-information-circle"
                  class="w-4 h-4 text-gray-400 cursor-help"
                />
              </UTooltip> -->
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
                @input="markAsInteracted"
              >
            </div>
          </div>

          <!-- Rendimiento y Botones -->
          <div class="flex flex-col gap-4 items-center">
            <div class="text-center">
              <p class="text-sm text-gray-600 mb-1">
                Rendimiento anual proyectado:
              </p>
              <p class="text-3xl font-bold text-gray-900">
                {{ annualReturn }}%*
              </p>
            </div>
            <div
              v-if="showButton"
              class="flex gap-3 w-full justify-center"
            >
              <UButton
                color="primary"
                size="lg"
                class="flex-1 max-w-xs justify-center"
                to="#contactanos"
              >
                Contáctanos
              </UButton>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Resultados Card -->
      <UCard class="bg-white">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Gráfico -->
          <div>
            <div class="flex items-center gap-2 mb-3">
<!--              <UIcon name="i-heroicons-chart-bar text-color-black" />-->
              <h3 class="text-lg font-bold text-gray-900">
                Resultados de la calculadora de ganancias
              </h3>
            </div>
            <div class="flex items-center gap-2 mb-1">
              <p class="text-xs text-gray-600">
                *Posible retorno proyectado
              </p>
              <!--              <UTooltip
                :ui="{
                  content: '!bg-white !text-gray-900 max-w-md z-50 shadow-xl border border-gray-200 p-3 rounded-lg',
                  text: 'whitespace-normal break-words !text-gray-900'
                }"
              >
                <UIcon name="i-heroicons-information-circle" />
                <template #content>
                  <p class="text-xs leading-relaxed max-w-md bg-white p-3 rounded-md border-gray-200">
                    Las estimaciones o simulaciones son ilustrativas y pueden o no corresponder al resultado final de la inversión.
                    Las estimaciones son producto del cálculo que incluye rentabilidades históricas, pagos por intereses y/o pagos por el vencimiento de los activos subyacentes.
                    La rentabilidad o ganancia obtenida en el pasado no garantiza que se repita en el futuro. La rentabilidad anual es calculada a partir de la información histórica de los últimos seis meses.
                  </p>
                </template>
              </UTooltip> -->
            </div>
            <p class="text-xl font-bold text-green-600 mb-3">
              +{{ calculateReturn.percentage }}%
            </p>

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
              <div
                class="flex-1 ml-12 flex items-end justify-center gap-12 relative z-20"
                style="height: calc(100% - 1.5rem);"
              >
                <!-- Columna inicial (inversión inicial - estática) -->
                <div
                  class="relative flex flex-col items-center"
                  style="height: 100%;"
                >
                  <div class="relative flex items-end w-full h-full">
                    <div
                      class="w-24 bg-gray-900 rounded-t mx-auto"
                      :style="{
                        height: `${(initialInvestment / parseFloat(calculateReturn.totalAmount)) * 100}%`
                      }"
                    />
                    <span class="text-xs text-gray-700 font-medium absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">${{ formatCurrency(initialInvestment) }}</span>
                  </div>
                  <!-- Etiqueta de tiempo debajo de la primera barra -->
                  <div class="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs text-gray-500">
                    <span>Hoy</span>
                  </div>
                </div>

                <!-- Columna final (capital + ganancia) -->
                <div
                  class="relative flex flex-col items-center"
                  style="height: 130%;"
                >
                  <div class="relative flex items-end w-full h-full">
                    <div
                      class="w-24 bg-green-600 rounded-t mx-auto"
                      style="height: 100%;"
                    />
                    <span class="text-xs text-gray-700 font-medium absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">${{ formatCurrency(parseFloat(calculateReturn.totalAmount)) }}</span>
                  </div>
                  <!-- Etiqueta de tiempo debajo de la segunda barra -->
                  <div class="absolute -bottom-10 left-1/2 -translate-x-1/3 text-xs text-gray-500 w-full">
                    <span>{{ investmentMonthsValue }} meses</span>
                  </div>
                </div>
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
                <div class="p-2 border border-gray-200 rounded-lg">
                  <p class="text-xs text-gray-600">
                    Capital invertido
                  </p>
                  <p class="text-lg font-bold text-green-600 mb-1 text-center p-2">
                    ${{ formatCurrency(initialInvestment) }}
                  </p>
                </div>

                <!-- Plazo -->
                <div class="p-2 border border-gray-200 rounded-lg">
                  <p class="text-xs text-gray-600">
                    Plazo
                  </p>
                  <p class="text-lg font-bold text-green-600 mb-1 p-2 text-center">
                    {{ investmentMonthsValue }} meses
                  </p>
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
                <div class="p-2 border border-gray-200 rounded-lg">
                  <p class="text-xs text-gray-600">
                    Capital + ganancia aproximada
                  </p>
                  <p class="text-lg font-bold text-gray-900 mb-1 text-center pt-2">
                    ${{ formatCurrency(parseFloat(calculateReturn.totalAmount)) }}
                  </p>
                  <p class="text-xs text-green-600 font-medium pl-6">
                    +${{ formatCurrency(parseFloat(calculateReturn.profit)) }}
                  </p>
                </div>

                <!-- Promedio mensual -->
                <div class="p-2 border border-gray-200 rounded-lg">
                  <p class="text-xs text-gray-600">
                    Promedio mensual aproximado
                  </p>
                  <p class="text-lg font-bold text-gray-900 mb-1 text-center pt-2">
                    +${{ formatCurrency(parseFloat(calculateReturn.monthlyAverage)) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </UContainer>
  </div>
</template>
