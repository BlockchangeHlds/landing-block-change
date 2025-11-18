import { VueReCaptcha } from 'vue-recaptcha-v3'

/**
 * Plugin de reCAPTCHA v3 para Nuxt 4
 * Este plugin inicializa reCAPTCHA v3 en el lado del cliente
 * y lo hace disponible en toda la aplicación
 */
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const siteKey = config.public.recaptchaSiteKey

  // Validar que la clave del sitio esté configurada
  if (!siteKey) {
    console.error('RECAPTCHA ERROR: Site key no configurada. Verifica NUXT_PUBLIC_RECAPTCHA_SITE_KEY en .env')
    return
  }

  // Configuración de reCAPTCHA v3
  const options = {
    siteKey,
    loaderOptions: {
      autoHideBadge: true, // Ocultar el badge automáticamente
      useRecaptchaNet: true, // Usar recaptcha.net en lugar de google.com
      renderParameters: {
        hl: 'es' // Idioma español
      }
    }
  }

  // Registrar el plugin de reCAPTCHA
  nuxtApp.vueApp.use(VueReCaptcha, options)

  console.log('✅ reCAPTCHA v3 inicializado correctamente')
})
