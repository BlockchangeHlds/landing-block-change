<script setup lang="ts">
// Datos de testimonios
const testimonials = [
  {
    id: 1,
    quote: 'Emprendedor fintech con más de una década de experiencia en innovación financiera, blockchain y gestión de inversiones. Fundador y ex CEO de Tranzfer.me, startup que movilizó más de USD 10 M en remesas internacionales, y actual fundador de Remesas.com. Graduado del MIT Bootcamps (New Ventures Leadership), combina su visión estratégica con una sólida base en auditoría y finanzas adquirida en PwC y BDO.',
    name: 'Alex Zuñiga',
    position: 'CEO & Co-fundador de BlockChange',
    avatar: 'https://ui-avatars.com/api/?name=Frederic+Hill&size=64&background=1DA977&color=fff'
  },
  {
    id: 2,
    quote: 'Bachiller en Administración por la Universidad de Lima, Luis Diego cuenta con más de ocho años de experiencia en finanzas corporativas, banca de inversiones y desarrollo de negocios en sectores como energía, infraestructura y activos digitales. A lo largo de su carrera, ha formado parte de firmas líderes como PwC, BTG Pactual, Citi, Credicorp Capital, Kallpa Generación (Inkia Energy) y Celepsa (Grupo UNACEM), donde participó en procesos de inversiones, fusiones y adquisiciones, y expansión regional.',
    name: 'Luis Diego Barandiaran',
    position: 'CFO & Co-fundador de BlockChange',
    avatar: 'https://ui-avatars.com/api/?name=Julie+Kyle&size=64&background=1DA977&color=fff'
  },
  {
    id: 3,
    quote: 'Estratega con sólida experiencia en inversiones digitales y minería cripto, enfocado en conectar tecnología y finanzas para generar valor sostenible. Ingeniero industrial y cofundador de Sumato Brands.\n' +
      'Formación en Fintech, Criptomonedas y Estrategias de Inversión Digital por la Pontificia Universidad Católica de Chile y la University of Michigan respalda su visión integral sobre el futuro de los activos digitales.\n' +
      'En BlockChange, lidera la estrategia y expansión del fondo, combinando análisis técnico, gestión de riesgo y visión estratégica para construir modelos de inversión transparentes, rentables y alineados con el futuro financiero descentralizado.',
    name: 'Lawrence Campos',
    position: 'CIO & Co-fundador de Blockchange',
    avatar: 'https://ui-avatars.com/api/?name=Brendan+Buck&size=64&background=1DA977&color=fff'
  },
  {
    id: 4,
    quote: 'Consultor legal especialista en Mercado de Valores, Protección de Datos Personales y Cumplimiento interno. Ha trabajado en repetidas ocasiones como especialista técnico en diversos proyectos de para organismos internacionales. Graduado del Programa de Especialización para Ejecutivos en Derecho Corporativo de la Universidad ESAN y premiado con el reconocimiento 4C por su perfil ético por la Universidad Antonio Ruiz de Montoya.',
    name: 'Bruno Jeri',
    position: 'Head of Legal de BlockChange',
    avatar: 'https://ui-avatars.com/api/?name=Paige+Lowery&size=64&background=1DA977&color=fff'
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
          class="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-4xl mx-auto pb-5"
          :style="{ color: '#00204B' }"
        >
          Quienes Somos
        </h2>
        <p>Tanto si estás dando tus primeros pasos como inversionista o quieres llevar tu capital a otro nivel, en BlockChange combinamos tecnología y estrategia para que tus inversiones trabajen por ti.</p>
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
