# 🚀 Inicio Rápido - Google reCAPTCHA v2

## ✅ Lo que ya está hecho

- ✅ Componente `CallToActionSection.vue` actualizado con reCAPTCHA v2
- ✅ Widget de reCAPTCHA integrado en el formulario
- ✅ Validación del lado del cliente implementada
- ✅ Tipos de TypeScript para reCAPTCHA creados
- ✅ Configuración de runtime en `nuxt.config.ts`
- ✅ Archivo `.env.example` creado

## 📝 Lo que necesitas hacer

### 1. Obtener las claves de Google reCAPTCHA (5 minutos)

1. Ve a: https://www.google.com/recaptcha/admin
2. Inicia sesión con tu cuenta de Google
3. Haz clic en "+" para registrar un nuevo sitio
4. Completa:
   - **Etiqueta**: "Block Change App" (o el nombre que prefieras)
   - **Tipo**: reCAPTCHA v2 → "Casilla de verificación 'No soy un robot'"
   - **Dominios**: 
     - `localhost` (para desarrollo)
     - Tu dominio de producción
5. Acepta los términos y haz clic en "Enviar"
6. **Copia las dos claves** que aparecen:
   - Site Key (pública)
   - Secret Key (privada)

### 2. Configurar variables de entorno (2 minutos)

Crea un archivo `.env` en la raíz del proyecto:

```bash
# En la terminal, desde la raíz del proyecto:
touch .env
```

Agrega tus claves al archivo `.env`:

```env
# Google reCAPTCHA v2
NUXT_PUBLIC_RECAPTCHA_SITE_KEY=tu_site_key_aqui
RECAPTCHA_SECRET_KEY=tu_secret_key_aqui
```

**⚠️ IMPORTANTE**: Reemplaza `tu_site_key_aqui` y `tu_secret_key_aqui` con las claves reales que copiaste.

### 3. Reiniciar el servidor (1 minuto)

```bash
# Detén el servidor actual (Ctrl+C)
# Luego reinicia:
npm run dev
# o
pnpm dev
```

### 4. ¡Probar! (2 minutos)

1. Abre tu navegador en `http://localhost:3000`
2. Ve al formulario de contacto
3. Completa los campos
4. Marca "No soy un robot"
5. Haz clic en "Quiero más información"
6. Verifica en la consola del navegador que funcione

## 🔧 Próximos pasos (Opcional pero recomendado)

### Validación en el servidor

Para mayor seguridad, deberías validar el token de reCAPTCHA en el servidor. Crea el archivo:

`server/api/verify-recaptcha.post.ts`

```typescript
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { token } = body

  if (!token) {
    throw createError({
      statusCode: 400,
      message: 'Token de reCAPTCHA no proporcionado'
    })
  }

  const config = useRuntimeConfig()
  const secretKey = config.recaptchaSecretKey

  const verificationUrl = 'https://www.google.com/recaptcha/api/siteverify'
  
  try {
    const response = await $fetch(verificationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token
      })
    })

    return {
      success: response.success
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Error al verificar reCAPTCHA'
    })
  }
})
```

Luego actualiza la función `onSubmitConsultation` en `CallToActionSection.vue` para llamar a este endpoint antes de procesar el formulario.

## 📚 Documentación completa

Para instrucciones detalladas, consulta: `RECAPTCHA_TUTORIAL.md`

## ❓ Problemas comunes

### "Invalid site key"
- Verifica que copiaste correctamente la Site Key
- Asegúrate de que `localhost` esté en los dominios de reCAPTCHA
- Reinicia el servidor

### El widget no aparece
- Abre la consola del navegador y busca errores
- Desactiva bloqueadores de anuncios
- Limpia la caché del navegador

### Errores de TypeScript
- Son normales hasta que reinicies el servidor
- Reinicia el servidor de desarrollo
- Reinicia el servidor de TypeScript en tu IDE

## 🎉 ¡Eso es todo!

Tu formulario ahora está protegido con reCAPTCHA v2.

**Tiempo total estimado**: ~10 minutos
