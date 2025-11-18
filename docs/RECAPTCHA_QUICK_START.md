# reCAPTCHA v3 - Guía Rápida

## Instalación Completada ✅

El proyecto ya tiene instalado y configurado `vue-recaptcha-v3`.

## Configuración en 3 Pasos

### 1. Obtener Claves de Google

1. Ve a: https://www.google.com/recaptcha/admin
2. Crea un nuevo sitio con **reCAPTCHA v3**
3. Agrega dominios: `localhost` y tu dominio de producción
4. Copia las claves generadas

### 2. Configurar Variables de Entorno

Edita `.env`:

```bash
NUXT_PUBLIC_RECAPTCHA_SITE_KEY=tu_site_key_aqui
RECAPTCHA_SECRET_KEY=tu_secret_key_aqui
```

### 3. Reiniciar Servidor

```bash
npm run dev
```

## Uso en Componentes

### Importar el composable:

```vue
<script setup lang="ts">
const { executeRecaptcha } = useGoogleRecaptcha()

async function handleSubmit() {
  // Obtener token de reCAPTCHA
  const token = await executeRecaptcha('nombre_accion')
  
  if (!token) {
    // Manejar error
    return
  }
  
  // Enviar formulario con el token
  const response = await $fetch('/api/endpoint', {
    method: 'POST',
    body: {
      ...formData,
      'g-recaptcha-response': token
    }
  })
}
</script>
```

## Archivos Importantes

- **Plugin**: `/plugins/recaptcha.client.ts`
- **Composable**: `/composables/useGoogleRecaptcha.ts`
- **Ejemplo**: `/app/components/CallToActionSection.vue`
- **Documentación completa**: `/RECAPTCHA_SETUP.md`

## Verificación

Abre la consola del navegador y busca:

```
✅ reCAPTCHA v3 inicializado correctamente
✅ reCAPTCHA token obtenido para acción: nombre_accion
```

## Características

- ✅ Invisible para el usuario
- ✅ Sin widgets ni checkboxes
- ✅ Funciona automáticamente en segundo plano
- ✅ Badge se oculta automáticamente
- ✅ Compatible con Nuxt 4
- ✅ TypeScript completo

## Soporte

Para más detalles, consulta `/RECAPTCHA_SETUP.md`
