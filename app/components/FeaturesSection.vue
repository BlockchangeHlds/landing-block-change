<script setup lang="ts">
// Datos de características del producto
const productFeatures = [
  {
    id: 1,
    icon: 'i-heroicons-credit-card',
    title: 'Bank account integration',
    description: 'Track balances, transactions, and categorize expenditures effortlessly.'
  },
  {
    id: 2,
    icon: 'i-heroicons-chart-pie',
    title: 'Investment insights',
    description: 'Receive recommendations and educational resources based on your financial goals.'
  },
  {
    id: 3,
    icon: 'i-heroicons-funnel',
    title: 'Goal tracking',
    description: 'Receive notifications as you reach milestones, adjust goals as circumstances change.'
  },
  {
    id: 4,
    icon: 'i-heroicons-document-chart-bar',
    title: 'Customizable reports',
    description: 'Tailor reports based on preferred time frames, and specific financial areas of interest.'
  },
  {
    id: 5,
    icon: 'i-heroicons-arrow-path',
    title: 'Sync across devices',
    description: 'Manage your finances easily without worrying about data discrepancies or manual syncing.'
  },
  {
    id: 6,
    icon: 'i-heroicons-chat-bubble-left-ellipsis',
    title: 'Management help',
    description: 'Take advantage of educational content, tutorials, and expert advice.'
  }
]
</script>

<template>
  <!-- Features Section -->
  <div class="py-16 sm:py-24 bg-white">
    <UContainer>
      <!-- Badge y título -->
      <div class="text-center mb-16">
        <UBadge
          label="Simple budgeting"
          variant="soft"
          size="md"
          class="mb-6 bg-gray-100 text-gray-700 border-gray-200"
        />

        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-4xl mx-auto"
          :style="{ color: '#00204B' }"
        >
          Enjoy peace of mind while effortlessly growing your funds
        </h2>
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
