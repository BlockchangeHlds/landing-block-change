<script setup lang="ts">
// Datos de testimonios
const testimonials = [
  {
    quote: 'Emprendedor fintech con más de una década de experiencia en innovación financiera, blockchain y gestión de inversiones. Fundador y ex CEO de Tranzfer.me, startup que movilizó más de USD 10 M en remesas internacionales, y actual fundador de Remesas.com. Graduado del MIT Bootcamps (New Ventures Leadership), combina su visión estratégica con una sólida base en auditoría y finanzas adquirida en PwC y BDO.',
    name: 'Alex Zúñiga',
    position: 'CEO & Co-fundador de BlockChange',
    avatar: 'https://ui-avatars.com/api/?name=Frederic+Hill&size=64&background=1DA977&color=fff',
    image: 'images/team/alex.png',
    isCompany: false
  },
  {
    quote: 'Bachiller en Administración por la Universidad de Lima, cuenta con más de ocho años de experiencia en finanzas corporativas, banca de inversión y desarrollo de negocios en sectores como energía, infraestructura y activos digitales. Ha trabajado en firmas como PwC, BTG Pactual, Citi, Credicorp Capital y Grupo UNACEM, participando en inversiones, fusiones y expansión regional.',
    name: 'Luis Diego Barandiarán',
    position: 'CFO & Co-fundador de BlockChange',
    avatar: 'https://ui-avatars.com/api/?name=Julie+Kyle&size=64&background=1DA977&color=fff',
    image: 'images/team/luis-diego.png',
    isCompany: false
  },
  {
    quote: 'Ingeniero industrial y cofundador de Sumato Brands, es un estratega en inversiones digitales y minería cripto. Con formación en Fintech e Inversión Digital por la Pontificia Universidad Católica de Chile y la University of Michigan, combina análisis técnico, gestión de riesgo y visión estratégica para liderar la expansión de BlockChange hacia un futuro financiero transparente y descentralizado.',
    name: 'Lawrence Campos',
    position: 'CIO & Co-fundador de Blockchange',
    avatar: 'https://ui-avatars.com/api/?name=Brendan+Buck&size=64&background=1DA977&color=fff',
    image: 'images/team/lawrence.png',
    isCompany: false
  },
  {
    quote: 'Profesional en comunicación y marketing, es socio y director en Sumato, donde lidera proyectos de branding y estrategia digital. Con experiencia previa en Yamaha Motor del Perú, dirige en BlockChange las áreas de comunicación, marketing y posicionamiento, integrando creatividad, innovación y estrategia para conectar la industria financiera con las nuevas tecnologías.',
    name: 'Gustavo Wong',
    position: 'CMO & Co-fundador de Blockchange',
    avatar: 'https://ui-avatars.com/api/?name=Brendan+Buck&size=64&background=1DA977&color=fff',
    image: 'images/team/gustavo.png',
    isCompany: false
  },
  {
    quote: 'Consultor legal especialista en Mercado de Valores, Protección de Datos Personales y Cumplimiento interno. Ha trabajado en repetidas ocasiones como especialista técnico en diversos proyectos de para organismos internacionales. Graduado del Programa de Especialización para Ejecutivos en Derecho Corporativo de la Universidad ESAN y premiado con el reconocimiento 4C por su perfil ético por la Universidad Antonio Ruiz de Montoya.',
    name: 'Bruno Jeri',
    position: 'Legal Counsel de BlockChange',
    avatar: 'https://ui-avatars.com/api/?name=Paige+Lowery&size=64&background=1DA977&color=fff',
    image: 'images/team/bruno.png',
    isCompany: false
  },
  {
    quote: 'Estrategas con experiencia en inversiones digitales, finanzas corporativas y marketing, unidos por una visión común: impulsar el futuro financiero descentralizado a través de la innovación, la tecnología y la comunicación estratégica..',
    name: 'Team BlockChange',
    position: '',
    avatar: 'https://ui-avatars.com/api/?name=Brendan+Buck&size=64&background=1DA977&color=fff',
    image: 'logos/block-change-logo2.png',
    isCompany: false
  }
]
</script>

<template>
  <!-- Testimonials Section -->
  <div
    id="quienes-somos"
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
        <p class="text-black">
          Tanto si estás dando tus primeros pasos como inversionista o quieres llevar tu capital a otro nivel, en
          BlockChange combinamos tecnología y estrategia para que tus inversiones trabajen por ti.
        </p>
      </div>

      <!-- Grid de testimonios: 3 columnas -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="testimonial in testimonials"
          :key="testimonial.name"
          class="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden"
        >
          <!-- Imagen superior con fondo oscuro -->
          <div
            class="h-64 relative overflow-hidden"
            :class="{ 'flex items-center justify-center': testimonial.isCompany }"
            :style="{ backgroundColor: testimonial.isCompany ? '#2C3E50' : '#E5E7EB' }"
          >
            <div
              v-if="testimonial.isCompany"
              class="flex flex-col items-center gap-4"
            >
              <div
                class="w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl font-bold"
                :style="{ backgroundColor: '#1DA977' }"
              >
                BC
              </div>
              <h3 class="text-white text-2xl font-bold">
                BlockChange
              </h3>
            </div>
            <NuxtImg
              v-else
              :src="testimonial.image"
              :alt="testimonial.name"
              class="w-full h-full object-cover"
              loading="lazy"
              format="webp"
              quality="80"
              width="600"
              height="400"
              fit="cover"
              position="top"
              sizes="sm:100vw md:50vw lg:33vw"
              densities="x1 x2"
              placeholder
            />
          </div>

          <!-- Contenido de la tarjeta -->
          <div class="p-6">
            <!-- Título y subtítulo -->
            <div class="mb-4">
              <h3
                class="text-xl font-bold mb-1"
                :style="{ color: '#00204B' }"
              >
                {{ testimonial.name }}
              </h3>
              <p
                class="text-sm font-medium"
                :style="{ color: '#1DA977' }"
              >
                {{ testimonial.position }}
              </p>
            </div>

            <!-- Descripción -->
            <p class="text-gray-700 leading-relaxed mb-6 text-sm">
              {{ testimonial.quote }}
            </p>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
