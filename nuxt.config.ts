// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content'
  ],

  ssr: true,

  app: {
    baseURL: '/',
    buildAssetsDir: '/_nuxt/'
  },

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  mdc: {
    highlight: {
      noApiRoute: false
    }
  },

  compatibilityDate: '2025-01-15',

  nitro: {
    preset: 'static',
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

  runtimeConfig: {
    // Variables privadas (solo servidor)
    // Variables públicas (cliente y servidor)
    public: {
    }
  }
})
