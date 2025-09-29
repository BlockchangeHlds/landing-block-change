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
    class="py-16 sm:py-24 rounded-3xl mx-4 sm:mx-8 my-8"
    :style="{ backgroundColor: '#00204B' }"
  >
    <UContainer>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <!-- Contenido del CTA -->
        <div class="text-white">
          <!-- Badge -->
          <UBadge
            label="Get started"
            variant="soft"
            size="sm"
            class="mb-6 bg-white/10 text-white border-white/20"
          />

          <!-- Título -->
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Join thousands in achieving financial freedom
          </h2>

          <!-- Descripción -->
          <p class="text-lg text-white/80 mb-8 leading-relaxed">
            Experience the full potential of our app for enhanced financial control.
          </p>

          <!-- Botón CTA -->
          <UButton
            label="Start free trial"
            variant="solid"
            size="lg"
            class="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 mb-8"
          />

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
                Book free consultation
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
                  label="Your name *"
                  name="name"
                >
                  <UInput
                    v-model="consultationForm.name"
                    placeholder="Enter your name"
                    required
                  />
                </UFormField>

                <UFormField
                  label="Company name"
                  name="company"
                >
                  <UInput
                    v-model="consultationForm.company"
                    placeholder="Enter company name"
                  />
                </UFormField>
              </div>

              <!-- Segunda fila: Teléfono y Email -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <UFormField
                  label="Phone number *"
                  name="phone"
                >
                  <UInput
                    v-model="consultationForm.phone"
                    placeholder="Enter phone number"
                    type="tel"
                    required
                  />
                </UFormField>

                <UFormField
                  label="Email address *"
                  name="email"
                >
                  <UInput
                    v-model="consultationForm.email"
                    placeholder="Enter email address"
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
                  :rows="4"
                />
              </UFormField>

              <!-- Checkbox de privacidad -->
              <div class="flex items-start gap-3">
                <UCheckbox
                  v-model="consultationForm.agreeToPrivacy"
                  required
                />
                <label class="text-sm text-gray-600 leading-relaxed">
                  I understand and agree to the privacy policy.
                </label>
              </div>

              <!-- Botón de envío -->
              <UButton
                type="submit"
                label="Submit request"
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
