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

const toast = useToast()
const isSubmitting = ref(false)

// Características del CTA final
const ctaFeatures: Array<{ icon: string, text: string }> = []

// Función para enviar el formulario
async function onSubmitConsultation() {
  try {
    isSubmitting.value = true

    // Preparar datos del formulario
    const formData = {
      name: consultationForm.name,
      company: consultationForm.company,
      phone: consultationForm.phone,
      email: consultationForm.email,
      message: consultationForm.message
    }

    // Enviar formulario al backend
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: formData
    })

    console.log('✅ Respuesta del servidor:', response)

    // Mostrar mensaje de éxito
    toast.add({
      title: '¡Mensaje enviado!',
      description: 'Gracias por contactarnos. Te responderemos pronto.',
      color: 'success'
    })

    // Limpiar formulario
    consultationForm.name = ''
    consultationForm.company = ''
    consultationForm.phone = ''
    consultationForm.email = ''
    consultationForm.message = ''
    consultationForm.agreeToPrivacy = false
  } catch (error) {
    console.error('❌ Error al enviar formulario:', error)
    toast.add({
      title: 'Error',
      description: 'Hubo un problema al enviar el formulario. Por favor intenta de nuevo.',
      color: 'error'
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <!-- Call to Action Section -->
  <div
    id="contactanos"
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
                  :ui="{ label: 'block font-medium text-gray-900' }"
                >
                  <UInput
                    v-model="consultationForm.name"
                    :ui="{ base: 'bg-white text-black', root: 'w-full' }"
                    placeholder="Ingresa tu nombre"
                    required
                  />
                </UFormField>

                <UFormField
                  label="Apellidos"
                  name="company"
                  :ui="{ label: 'block font-medium text-gray-900' }"
                >
                  <UInput
                    v-model="consultationForm.company"
                    :ui="{ base: 'bg-white text-black', root: 'w-full' }"
                    placeholder="Ingresa tus apellidos"
                  />
                </UFormField>
              </div>

              <!-- Segunda fila: Teléfono y Email -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <UFormField
                  label="Teléfono *"
                  name="phone"
                  :ui="{ label: 'block font-medium text-gray-900' }"
                >
                  <UInput
                    v-model="consultationForm.phone"
                    :ui="{ base: 'bg-white text-black', root: 'w-full' }"
                    placeholder="Ingresa tu teléfono"
                    type="tel"
                    required
                  />
                </UFormField>

                <UFormField
                  label="Correo electrónico *"
                  name="email"
                  :ui="{ label: 'block font-medium text-gray-900' }"
                >
                  <UInput
                    v-model="consultationForm.email"
                    :ui="{ base: 'bg-white text-black', root: 'w-full' }"
                    placeholder="Ingresa tu correo"
                    type="email"
                    required
                  />
                </UFormField>
              </div>

              <!-- Área de texto -->
              <UFormField
                label="Cuéntanos un poco sobre ti"
                name="message"
                :ui="{ label: 'block font-medium text-gray-900' }"
              >
                <UTextarea
                  v-model="consultationForm.message"
                  :ui="{ base: 'bg-white text-black', root: 'w-full' }"
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                  :rows="5"
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
                :disabled="!consultationForm.agreeToPrivacy || isSubmitting"
                :loading="isSubmitting"
              />
            </UForm>
          </UCard>
        </div>
      </div>
    </UContainer>
  </div>
</template>
