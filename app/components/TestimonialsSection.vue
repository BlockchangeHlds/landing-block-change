<script setup lang="ts">
// Datos de testimonios
const testimonials = [
  {
    id: 1,
    quote: 'This app transformed how I manage my money. Highly recommended.',
    name: 'Frederic Hill',
    position: 'Founder & CEO',
    avatar: '/api/placeholder/64/64'
  },
  {
    id: 2,
    quote: 'The budgeting features helped me understand my spending habits better. Thank you!',
    name: 'Julie Kyle',
    position: 'Account Executive',
    avatar: '/api/placeholder/64/64'
  },
  {
    id: 3,
    quote: 'I\'ve seen a noticeable improvement in my savings since using this app. It suits my unique financial needs.',
    name: 'Brendan Buck',
    position: 'Data Engineer',
    avatar: '/api/placeholder/64/64'
  },
  {
    id: 4,
    quote: 'Easy-to-use and effective. It\'s like having a financial advisor in my pocket. Great value for money.',
    name: 'Paige Lowery',
    position: 'Head of Brand',
    avatar: '/api/placeholder/64/64'
  },
  {
    id: 5,
    quote: 'The app\'s reminders keep me on track with bills. I love the custom options. Super helpful!',
    name: 'Stefan Ball',
    position: 'Marketing Manager',
    avatar: '/api/placeholder/64/64'
  }
]
</script>

<template>
  <!-- Testimonials Section -->
  <div
    id="testimonials"
    class="py-16 sm:py-24 bg-gray-50"
  >
    <UContainer>
      <!-- Título de la sección -->
      <div class="text-center mb-16">
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-4xl mx-auto"
          :style="{ color: '#00204B' }"
        >
          Hear success stories from our satisfied users
        </h2>
      </div>

      <!-- Grid de testimonios -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <!-- Primeros 3 testimonios -->
        <UCard
          v-for="testimonial in testimonials.slice(0, 3)"
          :key="testimonial.id"
          variant="outline"
          class="bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div class="space-y-4">
            <!-- Texto del testimonio -->
            <p class="text-gray-700 leading-relaxed">
              {{ testimonial.quote }}
            </p>

            <!-- Información del usuario -->
            <div class="flex items-center gap-3 pt-4 border-t border-gray-100">
              <UAvatar
                :src="testimonial.avatar"
                :alt="testimonial.name"
                size="md"
                class="flex-shrink-0"
              />
              <div>
                <h4
                  class="font-semibold"
                  :style="{ color: '#00204B' }"
                >
                  {{ testimonial.name }}
                </h4>
                <p class="text-sm text-gray-500">
                  {{ testimonial.position }}
                </p>
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Segunda fila con 2 testimonios y botón -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        <!-- Últimos 2 testimonios -->
        <UCard
          v-for="testimonial in testimonials.slice(3, 5)"
          :key="testimonial.id"
          variant="outline"
          class="bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div class="space-y-4">
            <!-- Texto del testimonio -->
            <p class="text-gray-700 leading-relaxed">
              {{ testimonial.quote }}
            </p>

            <!-- Información del usuario -->
            <div class="flex items-center gap-3 pt-4 border-t border-gray-100">
              <UAvatar
                :src="testimonial.avatar"
                :alt="testimonial.name"
                size="md"
                class="flex-shrink-0"
              />
              <div>
                <h4
                  class="font-semibold"
                  :style="{ color: '#00204B' }"
                >
                  {{ testimonial.name }}
                </h4>
                <p class="text-sm text-gray-500">
                  {{ testimonial.position }}
                </p>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Botón Read more reviews -->
        <div class="flex items-center justify-center lg:justify-start h-full">
          <UButton
            label="Read more reviews"
            variant="ghost"
            trailing-icon="i-heroicons-arrow-right"
            size="lg"
            class="text-gray-600 hover:text-gray-800 font-medium"
          />
        </div>
      </div>
    </UContainer>
  </div>
</template>
