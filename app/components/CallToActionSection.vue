<script setup lang="ts">
// Estado del formulario de consulta
const consultationForm = reactive({
  name: '',
  company: '',
  phone: '',
  email: '',
  message: '',
  agreeToPrivacy: false,
  recaptchaToken: ''
})

// Referencia para el contenedor de reCAPTCHA
const recaptchaContainer = ref<HTMLDivElement>()
const recaptchaWidgetId = ref<number | null>(null)
const isRecaptchaReady = ref(false)

// Características del CTA final
const ctaFeatures = []

// Cargar el script de reCAPTCHA
onMounted(() => {
  // Verificar si el script ya está cargado
  if (window.grecaptcha) {
    initRecaptcha()
    return
  }

  // Cargar el script de reCAPTCHA
  const script = document.createElement('script')
  script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit'
  script.async = true
  script.defer = true

  // Definir callback global
  window.onRecaptchaLoad = () => {
    initRecaptcha()
  }

  document.head.appendChild(script)
})

// Inicializar reCAPTCHA
function initRecaptcha() {
  if (!recaptchaContainer.value || !window.grecaptcha) return

  const config = useRuntimeConfig()
  const siteKey = config.public.recaptchaSiteKey || 'TU_SITE_KEY_AQUI'

  try {
    recaptchaWidgetId.value = window.grecaptcha.render(recaptchaContainer.value, {
      'sitekey': siteKey,
      'callback': onRecaptchaSuccess,
      'expired-callback': onRecaptchaExpired,
      'error-callback': onRecaptchaError
    })
    isRecaptchaReady.value = true
  } catch (error) {
    console.error('Error al inicializar reCAPTCHA:', error)
  }
}

// Callback cuando reCAPTCHA es exitoso
function onRecaptchaSuccess(token: string) {
  consultationForm.recaptchaToken = token
}

// Callback cuando reCAPTCHA expira
function onRecaptchaExpired() {
  consultationForm.recaptchaToken = ''
}

// Callback cuando hay error en reCAPTCHA
function onRecaptchaError() {
  consultationForm.recaptchaToken = ''
  console.error('Error en reCAPTCHA')
}

// Función para enviar el formulario
function onSubmitConsultation() {
  // Validar que reCAPTCHA esté completado
  if (!consultationForm.recaptchaToken) {
    alert('Por favor, completa el reCAPTCHA')
    return
  }

  console.log('Consultation form submitted:', consultationForm)
  // Aquí iría la lógica para enviar el formulario

  // Resetear reCAPTCHA después del envío
  if (recaptchaWidgetId.value !== null && window.grecaptcha) {
    window.grecaptcha.reset(recaptchaWidgetId.value)
    consultationForm.recaptchaToken = ''
  }
}

// Limpiar al desmontar
onBeforeUnmount(() => {
  if (window.onRecaptchaLoad) {
    delete window.onRecaptchaLoad
  }
})
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
                    :ui="{ base: 'bg-white', root: 'w-full' }"
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
                    :ui="{ base: 'bg-white', root: 'w-full' }"
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
                    :ui="{ base: 'bg-white', root: 'w-full' }"
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
                    :ui="{ base: 'bg-white', root: 'w-full' }"
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
                  :ui="{ base: 'bg-white', root: 'w-full' }"
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

              <!-- reCAPTCHA v2 -->
              <div class="flex justify-center py-4">
                <div ref="recaptchaContainer" />
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
                :disabled="!consultationForm.agreeToPrivacy || !consultationForm.recaptchaToken"
              />
            </UForm>
          </UCard>
        </div>
      </div>
    </UContainer>
  </div>
</template>
