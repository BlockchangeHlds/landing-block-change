<script setup lang="ts">
// Estado del formulario de consulta
const consultationForm = reactive({
  name: '',
  company: '',
  phone: '',
  email: '',
  message: '',
  agreeToPrivacy: false
})

// Características del CTA final
const ctaFeatures = [
  {
    icon: 'i-heroicons-check-circle',
    text: 'Flexible solution'
  },
  {
    icon: 'i-heroicons-check-circle',
    text: 'Constant updates'
  }
]

// Función para enviar el formulario
function onSubmitConsultation() {
  console.log('Consultation form submitted:', consultationForm)
  // Aquí iría la lógica para enviar el formulario
}
</script>

<template>
  <!-- Call to Action Section -->
  <div
    class="py-16 sm:py-24 rounded-3xl mx-4 sm:mx-8"
    :style="{ backgroundColor: '#00204B' }"
  >
    <UContainer>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <!-- Contenido del CTA -->
        <div class="text-white">
          <!-- Título -->
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            ¿Quieres saber más de nosotros?
          </h2>

          <!-- Descripción -->
          <p class="text-lg text-white/80 mb-8 leading-relaxed">
            Dejanos tus datos y nosotros te contactamos
          </p>

          <!-- Botón CTA -->

          <!-- Características del CTA -->
          <div class="flex flex-col sm:flex-row gap-6">
            <div
              v-for="feature in ctaFeatures"
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

        <!-- Formulario de consulta -->
        <div class="relative">
          <UCard
            variant="outline"
            class="bg-white shadow-xl"
          >
            <template #header>
              <h3 class="text-xl font-semibold text-gray-900">
                Dejanos tus datos y nosotros te contactamos
              </h3>
            </template>

            <!-- Formulario -->
            <UForm
              :state="consultationForm"
              class="space-y-4"
              @submit="onSubmitConsultation"
            >
              <!-- Primera fila: Nombre y Empresa -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <UFormField
                  label="Nombres *"
                  name="name"
                >
                  <UInput
                    v-model="consultationForm.name"
                    placeholder="Ingresa tu nombre"
                    required
                  />
                </UFormField>

                <UFormField
                  label="Apellidos"
                  name="company"
                >
                  <UInput
                    v-model="consultationForm.company"
                    placeholder="Ingresa tus apellidos"
                  />
                </UFormField>
              </div>

              <!-- Segunda fila: Teléfono y Email -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <UFormField
                  label="Teléfono *"
                  name="phone"
                >
                  <UInput
                    v-model="consultationForm.phone"
                    placeholder="Ingresa tu teléfono"
                    type="tel"
                    required
                  />
                </UFormField>

                <UFormField
                  label="Correo electrónico *"
                  name="email"
                >
                  <UInput
                    v-model="consultationForm.email"
                    placeholder="Ingresa tu correo"
                    type="email"
                    required
                  />
                </UFormField>
              </div>

              <!-- Área de texto -->
              <UFormField
                label="Anything else you would like us to know?"
                name="message"
              >
                <UTextarea
                  v-model="consultationForm.message"
                  placeholder="Tell us more about your needs..."
                  :rows="5"
                  class="w-full"
                />
              </UFormField>

              <!-- Checkbox de privacidad -->
              <div class="flex items-start gap-3">
                <UCheckbox
                  v-model="consultationForm.agreeToPrivacy"
                  required
                />
                <label class="text-sm text-gray-600 leading-relaxed">
                  <b>Acepto los términos y condiciones. </b>
                  Solo usaremos tus datos para contactarte
                </label>
              </div>

              <!-- Botón de envío -->
              <UButton
                type="submit"
                label="Quiero más información"
                variant="solid"
                size="lg"
                block
                :style="{ backgroundColor: '#1DA977' }"
                class="hover:opacity-90 text-white mt-6"
                :disabled="!consultationForm.agreeToPrivacy"
              />
            </UForm>
          </UCard>
        </div>
      </div>
    </UContainer>
  </div>
</template>
