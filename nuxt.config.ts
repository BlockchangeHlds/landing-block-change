// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/turnstile'
  ],

  turnstile: {
    siteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY || ''
  },
  ssr: true,

  app: {
    baseURL: '/',
    buildAssetsDir: '/_nuxt/',
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/favicon.png' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  mdc: {
    highlight: {
      noApiRoute: false
    }
  },

  runtimeConfig: {
    // Variables privadas (solo servidor)
    resendApiKey: process.env.RESEND_API_KEY || '',
    contactEmail: process.env.CONTACT_EMAIL || '',
    turnstileSecretKey: process.env.TURNSTILE_SECRET_KEY || ''
  },

  compatibilityDate: '2025-01-15',

  nitro: {
    preset: 'vercel',
    prerender: {
      routes: [
        '/'
      ],
      failOnError: false
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  image: {
    provider: 'none',
    domains: ['ui-avatars.com']
  },
})
