# Tutorial: Configuración de Google reCAPTCHA v2 en Nuxt

Este tutorial te guiará paso a paso para completar la configuración de reCAPTCHA v2 en tu formulario.

## 📋 Tabla de Contenidos

1. [Obtener las claves de Google reCAPTCHA](#1-obtener-las-claves-de-google-recaptcha)
2. [Configurar las variables de entorno](#2-configurar-las-variables-de-entorno)
3. [Actualizar el componente](#3-actualizar-el-componente)
4. [Validación en el backend](#4-validación-en-el-backend)
5. [Pruebas](#5-pruebas)

---

## 1. Obtener las claves de Google reCAPTCHA

### Paso 1.1: Acceder a la consola de Google reCAPTCHA

1. Ve a [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Inicia sesión con tu cuenta de Google

### Paso 1.2: Registrar un nuevo sitio

1. Haz clic en el botón **"+"** o **"Registrar un sitio nuevo"**
2. Completa el formulario:
   - **Etiqueta**: Nombre descriptivo (ej: "Block Change App")
   - **Tipo de reCAPTCHA**: Selecciona **"reCAPTCHA v2"** → **"Casilla de verificación 'No soy un robot'"**
   - **Dominios**: Agrega tus dominios:
     - `localhost` (para desarrollo)
     - Tu dominio de producción (ej: `tudominio.com`)
   - **Propietarios**: Tu email (ya debería estar)
   - Acepta los términos de servicio

3. Haz clic en **"Enviar"**

### Paso 1.3: Guardar las claves

Después de registrar, obtendrás dos claves:

- **Site Key (Clave del sitio)**: Se usa en el frontend (pública)
- **Secret Key (Clave secreta)**: Se usa en el backend (privada, NUNCA la expongas)

**Ejemplo:**
```
Site Key: 6LdXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
Secret Key: 6LdYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
```

---

## 2. Configurar las variables de entorno

### Paso 2.1: Crear archivo `.env`

Crea un archivo `.env` en la raíz del proyecto (si no existe):

```bash
touch .env
```

### Paso 2.2: Agregar las claves

Agrega las siguientes variables al archivo `.env`:

```env
# Google reCAPTCHA v2
NUXT_PUBLIC_RECAPTCHA_SITE_KEY=tu_site_key_aqui
RECAPTCHA_SECRET_KEY=tu_secret_key_aqui
```

**⚠️ IMPORTANTE:**
- Reemplaza `tu_site_key_aqui` con tu **Site Key**
- Reemplaza `tu_secret_key_aqui` con tu **Secret Key**
- La variable con prefijo `NUXT_PUBLIC_` estará disponible en el cliente
- La variable sin prefijo solo estará disponible en el servidor

### Paso 2.3: Agregar `.env` al `.gitignore`

Verifica que `.env` esté en tu `.gitignore`:

```gitignore
# .gitignore
.env
.env.*
!.env.example
```

### Paso 2.4: Crear archivo de ejemplo (opcional)

Crea un `.env.example` para documentar las variables necesarias:

```env
# .env.example
NUXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=
```

---

## 3. Actualizar el componente

### Paso 3.1: Modificar el componente CallToActionSection.vue

Abre el archivo `app/components/CallToActionSection.vue` y actualiza la línea 58:

**Antes:**
```typescript
'sitekey': 'TU_SITE_KEY_AQUI', // Reemplazar con tu Site Key de Google reCAPTCHA
```

**Después:**
```typescript
'sitekey': useRuntimeConfig().public.recaptchaSiteKey,
```

### Paso 3.2: Agregar la configuración al runtime config

Abre `nuxt.config.ts` y agrega la configuración de reCAPTCHA:

```typescript
export default defineNuxtConfig({
  // ... otras configuraciones
  
  runtimeConfig: {
    // Variables privadas (solo servidor)
    recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
    
    // Variables públicas (cliente y servidor)
    public: {
      recaptchaSiteKey: process.env.NUXT_PUBLIC_RECAPTCHA_SITE_KEY
    }
  }
})
```

---

## 4. Validación en el backend

Para validar el token de reCAPTCHA en el servidor, necesitas crear un endpoint API.

### Paso 4.1: Crear el endpoint de validación

Crea el archivo `server/api/verify-recaptcha.post.ts`:

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

  // Verificar el token con Google
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
      success: response.success,
      score: response.score,
      action: response.action,
      challenge_ts: response.challenge_ts,
      hostname: response.hostname
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Error al verificar reCAPTCHA'
    })
  }
})
```

### Paso 4.2: Actualizar la función de envío del formulario

Modifica la función `onSubmitConsultation` en `CallToActionSection.vue`:

```typescript
async function onSubmitConsultation() {
  // Validar que reCAPTCHA esté completado
  if (!consultationForm.recaptchaToken) {
    alert('Por favor, completa el reCAPTCHA')
    return
  }

  try {
    // Verificar el token en el servidor
    const verification = await $fetch('/api/verify-recaptcha', {
      method: 'POST',
      body: {
        token: consultationForm.recaptchaToken
      }
    })

    if (!verification.success) {
      alert('Verificación de reCAPTCHA fallida. Por favor, intenta de nuevo.')
      // Resetear reCAPTCHA
      if (recaptchaWidgetId.value !== null && window.grecaptcha) {
        window.grecaptcha.reset(recaptchaWidgetId.value)
        consultationForm.recaptchaToken = ''
      }
      return
    }

    // Aquí va tu lógica de envío del formulario
    console.log('Formulario verificado y enviado:', consultationForm)
    
    // Ejemplo: Enviar a tu API
    // await $fetch('/api/contact', {
    //   method: 'POST',
    //   body: consultationForm
    // })

    alert('¡Formulario enviado exitosamente!')

    // Resetear formulario
    Object.assign(consultationForm, {
      name: '',
      company: '',
      phone: '',
      email: '',
      message: '',
      agreeToPrivacy: false,
      recaptchaToken: ''
    })

    // Resetear reCAPTCHA
    if (recaptchaWidgetId.value !== null && window.grecaptcha) {
      window.grecaptcha.reset(recaptchaWidgetId.value)
    }
  } catch (error) {
    console.error('Error al enviar el formulario:', error)
    alert('Error al enviar el formulario. Por favor, intenta de nuevo.')
  }
}
```

---

## 5. Pruebas

### Paso 5.1: Reiniciar el servidor de desarrollo

```bash
# Detener el servidor actual (Ctrl+C)
# Iniciar nuevamente
npm run dev
# o
pnpm dev
```

### Paso 5.2: Probar en desarrollo

1. Abre tu navegador en `http://localhost:3000` (o el puerto que uses)
2. Navega al formulario
3. Completa los campos del formulario
4. Marca la casilla de términos y condiciones
5. Completa el reCAPTCHA (marca "No soy un robot")
6. Haz clic en "Quiero más información"
7. Verifica en la consola del navegador que el token se genera correctamente

### Paso 5.3: Verificar en la consola de Google reCAPTCHA

1. Ve a [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Selecciona tu sitio
3. Ve a la pestaña **"Analytics"**
4. Deberías ver las solicitudes de verificación

### Paso 5.4: Probar casos de error

- **Sin completar reCAPTCHA**: Intenta enviar el formulario sin marcar el reCAPTCHA
- **Token expirado**: Espera más de 2 minutos después de completar el reCAPTCHA y luego intenta enviar
- **Múltiples envíos**: Verifica que el reCAPTCHA se resetee correctamente después de cada envío

---

## 🔧 Solución de problemas comunes

### Error: "Invalid site key"

**Causa**: La Site Key no es correcta o no coincide con el dominio.

**Solución**:
1. Verifica que la Site Key en `.env` sea correcta
2. Asegúrate de que `localhost` esté agregado en los dominios de reCAPTCHA
3. Reinicia el servidor de desarrollo

### Error: "Timeout or duplicate"

**Causa**: El token de reCAPTCHA expiró o ya fue usado.

**Solución**:
- Los tokens de reCAPTCHA expiran después de 2 minutos
- Cada token solo puede usarse una vez
- Asegúrate de resetear el reCAPTCHA después de cada envío

### El widget de reCAPTCHA no aparece

**Causa**: El script no se cargó correctamente o hay un error de JavaScript.

**Solución**:
1. Abre la consola del navegador y busca errores
2. Verifica que no haya bloqueadores de anuncios activos
3. Verifica la conexión a internet
4. Limpia la caché del navegador

### Error de TypeScript: "Property 'grecaptcha' does not exist"

**Causa**: Los tipos de TypeScript no están siendo reconocidos.

**Solución**:
1. Reinicia el servidor de desarrollo
2. Reinicia el servidor de TypeScript en tu IDE
3. Verifica que el archivo `types/recaptcha.d.ts` exista

---

## 📚 Recursos adicionales

- [Documentación oficial de Google reCAPTCHA](https://developers.google.com/recaptcha/docs/display)
- [Documentación de Nuxt Runtime Config](https://nuxt.com/docs/guide/going-further/runtime-config)
- [Documentación de Nuxt Server API](https://nuxt.com/docs/guide/directory-structure/server)

---

## ✅ Checklist final

Antes de pasar a producción, verifica:

- [ ] Las claves de reCAPTCHA están configuradas en `.env`
- [ ] El archivo `.env` está en `.gitignore`
- [ ] La Site Key está configurada en `nuxt.config.ts`
- [ ] El componente usa `useRuntimeConfig()` para obtener la Site Key
- [ ] El endpoint de validación en el servidor está implementado
- [ ] Se valida el token en el servidor antes de procesar el formulario
- [ ] El reCAPTCHA se resetea después de cada envío
- [ ] Has probado el formulario en desarrollo
- [ ] Has agregado tu dominio de producción en la consola de Google reCAPTCHA
- [ ] Las variables de entorno están configuradas en tu servidor de producción

---

## 🚀 Despliegue a producción

### Variables de entorno en producción

Asegúrate de configurar las variables de entorno en tu plataforma de hosting:

**Vercel/Netlify:**
1. Ve a la configuración del proyecto
2. Agrega las variables de entorno:
   - `NUXT_PUBLIC_RECAPTCHA_SITE_KEY`
   - `RECAPTCHA_SECRET_KEY`

**Otras plataformas:**
Consulta la documentación de tu plataforma para configurar variables de entorno.

### Actualizar dominios en Google reCAPTCHA

1. Ve a [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Selecciona tu sitio
3. Haz clic en "Configuración"
4. En "Dominios", agrega tu dominio de producción (ej: `tudominio.com`)
5. Guarda los cambios

---

¡Listo! Tu formulario ahora está protegido con Google reCAPTCHA v2. 🎉
