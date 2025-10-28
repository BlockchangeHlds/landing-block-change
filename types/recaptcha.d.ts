// Tipos para Google reCAPTCHA v2
interface ReCaptchaV2 {
  render: (container: string | HTMLElement, parameters: {
    'sitekey': string
    'callback'?: (token: string) => void
    'expired-callback'?: () => void
    'error-callback'?: () => void
    'theme'?: 'light' | 'dark'
    'size'?: 'normal' | 'compact'
  }) => number
  reset: (widgetId: number) => void
  getResponse: (widgetId: number) => string
}

interface Window {
  grecaptcha: ReCaptchaV2
  onRecaptchaLoad?: () => void
}
