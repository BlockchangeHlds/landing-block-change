<script setup lang="ts">
// Estado de la calculadora
const calculatorForm = reactive({
  amount: 10000,
  frequency: 'Trimestral',
  additionalAmount: 5000,
  term: 12
})

const frequencyOptions = [
  'Mensual',
  'Trimestral',
  'Semestral',
  'Anual'
]

// Función para calcular las ganancias
const calculateEarnings = () => {
  // Lógica de cálculo básica (puede ser más compleja)
  const annualReturn = 0.20
  const totalInvestment = calculatorForm.amount + (calculatorForm.additionalAmount * (calculatorForm.term / 3))
  const projectedEarnings = totalInvestment * annualReturn
  console.log('Ganancias proyectadas:', projectedEarnings)
}

// Datos del gráfico de inversiones
const chartData = [
  { quarter: 'Q1', investment: 12000, earnings: 11000 },
  { quarter: 'Q2', investment: 19000, earnings: 17500 },
  { quarter: 'Q3', investment: 29000, earnings: 28000 },
  { quarter: 'Q4', investment: 34000, earnings: 33500 }
]

const maxValue = 40000
</script>

<template>
  <!-- Premium Benefits Section -->
  <div
    class="py-16 sm:py-24 rounded-3xl mx-4 sm:mx-8 my-8"
    :style="{
      background: 'linear-gradient(135deg, #00204B 0%, #151342 100%)'
    }"
  >
    <UContainer>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        <!-- Calculadora de Ganancias -->
        <div class="bg-white p-8 rounded-2xl h-full flex flex-col shadow-lg">
          <!-- Título principal -->
          <h2 class="text-3xl font-bold text-gray-900 mb-2">
            ¡Calcula tus ganancias!
          </h2>

          <!-- Subtítulo -->
          <p class="text-gray-700 mb-8">
            Que tus activos virtuales trabajen por ti
          </p>

          <!-- Formulario de la calculadora -->
          <div class="space-y-6 flex-1 flex flex-col">
            <!-- Vas a invertir en -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">
                Vas a invertir en:
              </h3>
            </div>

            <!-- Monto inicial -->
            <div class="space-y-2">
              <label class="text-base font-medium text-gray-900">
                ¿Cuál es el monto?
              </label>
              <UInput
                v-model="calculatorForm.amount"
                type="number"
                placeholder="$10,000.00"
                class="text-lg"
                size="lg"
              />
            </div>

            <!-- Aportes adicionales -->
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="text-base font-medium text-gray-900">
                  ¿Aportes adicionales?
                </label>
                <USelect
                  v-model="calculatorForm.frequency"
                  :options="frequencyOptions"
                  size="lg"
                />
              </div>

              <div class="space-y-2">
                <label class="text-base font-medium text-gray-900">
                  Monto de cada aporte
                </label>
                <UInput
                  v-model="calculatorForm.additionalAmount"
                  type="number"
                  placeholder="$5,000.00"
                  size="lg"
                />
              </div>
            </div>

            <!-- Plazo -->
            <div class="space-y-4">
              <label class="text-base font-medium text-gray-900">
                Plazo:
              </label>
              <div class="px-4">
                <URange
                  v-model="calculatorForm.term"
                  :min="1"
                  :max="36"
                  :step="1"
                  class="w-full"
                />
                <div class="flex justify-between text-sm text-gray-600 mt-2">
                  <span>1 mes</span>
                  <span>{{ calculatorForm.term }} meses</span>
                  <span>36 meses</span>
                </div>
              </div>
            </div>

            <!-- Rendimiento proyectado -->
            <div class="bg-white p-4 rounded-lg mt-auto">
              <p class="text-lg font-semibold text-gray-900 mb-4">
                Rendimiento anual proyectado: <span class="text-xl">20%*</span>
              </p>

              <!-- Botón Calcular -->
              <UButton
                label="Calcular"
                variant="solid"
                size="lg"
                class="w-full text-white py-3"
                :style="{
                  'background-color': '#1DA977'
                }"
                @click="calculateEarnings"
              />
            </div>

            <!-- Disclaimer -->
            <p class="text-xs text-gray-600 text-center mt-4">
              *Esta proyección es referencial y no constituye una oferta ni
            </p>
          </div>
        </div>

        <!-- Gráfico de Inversiones -->
        <div class="bg-white p-8 rounded-2xl h-full flex flex-col shadow-lg">
          <!-- Header del gráfico -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold mb-2 text-gray-900">
              En los últimos 12 meses pudiste haber alcanzado
            </h3>
            <div class="flex items-center gap-4">
              <span class="text-3xl font-bold text-gray-900">$36,000.00</span>
              <UBadge
                label="+ 20%"
                variant="solid"
                class="px-3 py-1 text-sm font-semibold text-white"
                :style="{ 'background-color': '#1DA977' }"
              />
            </div>
          </div>

          <!-- Gráfico de barras -->
          <div class="relative h-80 mb-6 flex-1">
            <!-- Líneas de referencia -->
            <div class="absolute inset-0 flex flex-col justify-between text-sm text-gray-700 font-medium">
              <div class="flex items-center">
                <span class="w-16">$40,000</span>
                <div class="flex-1 h-px bg-gray-400" />
              </div>
              <div class="flex items-center">
                <span class="w-16">$30,000</span>
                <div class="flex-1 h-px bg-gray-400" />
              </div>
              <div class="flex items-center">
                <span class="w-16">$20,000</span>
                <div class="flex-1 h-px bg-gray-400" />
              </div>
              <div class="flex items-center">
                <span class="w-16">$10,000</span>
                <div class="flex-1 h-px bg-gray-400" />
              </div>
              <div class="flex items-center">
                <span class="w-16">$0</span>
                <div class="flex-1 h-px bg-gray-400" />
              </div>
            </div>

            <!-- Barras y línea de tendencia -->
            <div class="absolute inset-0 pl-16 pr-4 pt-2 pb-8">
              <div class="relative h-full flex items-end justify-between gap-4">
                <!-- Barras por trimestre -->
                <div
                  v-for="data in chartData"
                  :key="data.quarter"
                  class="flex-1 flex flex-col items-center relative"
                >
                  <!-- Barra de inversión (verde) -->
                  <div
                    class="w-full rounded-sm relative"
                    :style="{
                      'height': `${(data.investment / maxValue) * 100}%`,
                      'background-color': '#1DA977'
                    }"
                  />
                  <!-- Etiqueta del trimestre -->
                  <span class="text-sm font-medium text-gray-700 mt-2">
                    {{ data.quarter }}
                  </span>
                </div>

                <!-- Línea de tendencia -->
                <svg
                  class="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <polyline
                    points="12.5,85 37.5,65 62.5,25 87.5,15"
                    fill="none"
                    :stroke="'#1DA977'"
                    stroke-width="3"
                    class="opacity-90"
                  />
                </svg>
              </div>
            </div>
          </div>

          <!-- Leyenda -->
          <div class="flex items-center justify-center gap-8 text-sm mt-auto">
            <div class="flex items-center gap-2">
              <div
                class="w-4 h-4 rounded-sm"
                :style="{ 'background-color': '#1DA977' }"
              />
              <span class="font-medium text-gray-700">Inversión</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-medium text-gray-700">Ganancia</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-bold text-gray-900">VS</span>
            </div>
            <div class="flex items-center gap-2">
              <div
                class="w-4 h-4 rounded-sm"
                :style="{ 'background-color': '#00204B' }"
              />
              <span class="font-medium text-gray-700">Depósito bancario</span>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
