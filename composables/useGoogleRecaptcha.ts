import { useReCaptcha } from 'vue-recaptcha-v3'

/**
 * Composable para ejecutar reCAPTCHA v3
 *
 * Este composable proporciona una función para ejecutar acciones de reCAPTCHA
 * y obtener el token de verificación.
 *
 * @example
 * const { executeRecaptcha } = useGoogleRecaptcha()
 * const token = await executeRecaptcha('submit_form')
 */
export const useGoogleRecaptcha = () => {
  const recaptchaInstance = useReCaptcha()

  /**
   * Ejecuta una acción de reCAPTCHA y devuelve el token
   *
   * @param action - Nombre de la acción (ej: 'submit_form', 'login', 'contact')
   * @returns Token de reCAPTCHA o null si hay error
   */
  const executeRecaptcha = async (action: string): Promise<string | null> => {
    try {
      // Esperar a que reCAPTCHA esté completamente cargado
      await recaptchaInstance?.recaptchaLoaded()

      // Ejecutar reCAPTCHA y obtener el token
      const token = await recaptchaInstance?.executeRecaptcha(action)

      if (!token) {
        console.error('reCAPTCHA: No se pudo obtener el token')
        return null
      }

      console.log(`✅ reCAPTCHA token obtenido para acción: ${action}`)
      return token
    } catch (error) {
      console.error('Error al ejecutar reCAPTCHA:', error)
      return null
    }
  }

  /**
   * Obtiene el token y lo formatea para headers HTTP
   *
   * @param action - Nombre de la acción
   * @returns Objeto con token y headerOptions
   */
  const getRecaptchaHeaders = async (action: string) => {
    const token = await executeRecaptcha(action)

    return {
      token,
      headerOptions: {
        headers: {
          'g-recaptcha-response': token || '',
          'google-recaptcha-token': token || ''
        }
      }
    }
  }

  return {
    executeRecaptcha,
    getRecaptchaHeaders
  }
}
