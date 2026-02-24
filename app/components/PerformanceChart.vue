<script setup lang="ts">
// Datos de resultados mensuales 2024
const monthlyData = [
  { month: 'Ene', value: 2.06 },
  { month: 'Feb', value: 0.68 },
  { month: 'Mar', value: 1.75 },
  { month: 'Abr', value: 1.88 },
  { month: 'May', value: 1.67 },
  { month: 'Jun', value: 1.72 },
  { month: 'Jul', value: 2.08 },
  { month: 'Ago', value: 1.41 },
  { month: 'Set', value: 0.52 },
  { month: 'Oct', value: 2.22 },
  { month: 'Nov', value: 1.43 },
  { month: 'Dic', value: 1.29 }
]

// Configuración del gráfico
const maxValue = 2.5
const chartHeight = 300
const barWidth = 60
const gap = 20
const leftPadding = 50
const rightPadding = 20
const topPadding = 40
const chartWidth = (barWidth + gap) * monthlyData.length + leftPadding + rightPadding - gap

// Función para calcular la altura de la barra
const getBarHeight = (value: number) => {
  return (value / maxValue) * chartHeight
}

// Función para formatear el porcentaje
const formatPercentage = (value: number) => {
  return `${value.toFixed(2).replace('.', ',')}%`
}
</script>

<template>
  <div class="bg-gray-50 rounded-3xl p-6 sm:p-8 lg:p-12">
    <!-- Título -->
    <h3
      class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
      :style="{ color: '#00204B' }"
    >
      Resultados del año 2025
    </h3>

    <p class="text-gray-600 mb-8 text-sm sm:text-base">
      Operando contratos de futuros perpetuos en las criptomonedas con mayor capitalización de mercado.
    </p>

    <!-- Leyenda -->
    <div class="flex items-center gap-2 mb-6">
      <div
        class="w-3 h-3 rounded-full"
        :style="{ backgroundColor: '#00D9A3' }"
      />
      <span class="text-xs sm:text-sm text-gray-600">
        Ganancias y pérdidas realizadas en %
      </span>
    </div>

    <!-- Contenedor del gráfico -->
    <div class="w-full">
      <!-- SVG Chart -->
      <svg
        viewBox="0 0 1000 380"
        preserveAspectRatio="xMidYMid meet"
        class="w-full h-auto"
      >
        <!-- Líneas de referencia -->
        <g :transform="`translate(0, ${topPadding})`">
          <line
            v-for="i in 6"
            :key="`line-${i}`"
            :x1="leftPadding"
            :y1="(chartHeight / 5) * (i - 1)"
            :x2="950"
            :y2="(chartHeight / 5) * (i - 1)"
            stroke="#E5E7EB"
            stroke-width="1"
          />
        </g>

        <!-- Etiquetas del eje Y -->
        <g :transform="`translate(0, ${topPadding})`">
          <text
            v-for="(label, i) in ['2.5%', '2.0%', '1.5%', '1.0%', '0.5%', '0.0%']"
            :key="`label-y-${i}`"
            :x="leftPadding - 10"
            :y="(chartHeight / 5) * i + 5"
            text-anchor="end"
            class="text-xs fill-gray-500"
          >
            {{ label }}
          </text>
        </g>

        <!-- Barras -->
        <g :transform="`translate(0, ${topPadding})`">
          <g
            v-for="(data, index) in monthlyData"
            :key="data.month"
            :transform="`translate(${index * 75 + leftPadding}, 0)`"
          >
            <!-- Barra -->
            <rect
              :x="0"
              :y="chartHeight - getBarHeight(data.value)"
              :width="60"
              :height="getBarHeight(data.value)"
              fill="#00D9A3"
              rx="4"
              class="hover:opacity-80 transition-opacity cursor-pointer"
            />

            <!-- Porcentaje encima de la barra -->
            <text
              :x="30"
              :y="chartHeight - getBarHeight(data.value) - 8"
              text-anchor="middle"
              class="text-xs font-semibold"
              :style="{ fill: '#00204B' }"
            >
              {{ formatPercentage(data.value) }}
            </text>

            <!-- Mes debajo de la barra -->
            <text
              :x="30"
              :y="chartHeight + 20"
              text-anchor="middle"
              class="text-sm fill-gray-600 font-medium"
            >
              {{ data.month }}
            </text>
          </g>
        </g>
      </svg>
    </div>

    <!-- Nota al pie -->
    <div class="mt-8 pt-6 border-t border-gray-200">
      <p class="text-sm text-gray-600 mb-3">
        En el 2025 tuvimos un drawdown del 3.19%. Drawdown: En el contexto financiero, el término drawdown se
        refiere a la máxima caída que experimenta el fondo desde su punto más alto hasta su punto más bajo.
      </p>
      <p class="text-xs text-gray-500 italic">
        *Drawdown: En el contexto financiero, el término drawdown se refiere a la máxima caída que experimenta el fondo desde su punto más alto hasta su punto más bajo.
      </p>
    </div>
  </div>
</template>
