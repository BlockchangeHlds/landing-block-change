# Configuración de Google reCAPTCHA v3

Este documento explica cómo configurar Google reCAPTCHA v3 para proteger el formulario de contacto contra bots.

## ¿Qué es reCAPTCHA v3?

reCAPTCHA v3 es un sistema de verificación invisible de Google que analiza el comportamiento del usuario y asigna un puntaje (score) de 0.0 a 1.0, donde:
- **1.0** = Muy probable que sea un humano
- **0.0** = Muy probable que sea un bot

A diferencia de reCAPTCHA v2, **no requiere que el usuario haga clic en "No soy un robot"**, lo que mejora la experiencia del usuario.

## Paso 1: Obtener las claves de reCAPTCHA

1. Ve a la [consola de administración de reCAPTCHA](https://www.google.com/recaptcha/admin)
2. Inicia sesión con tu cuenta de Google
3. Haz clic en el botón **"+"** para crear un nuevo sitio
4. Completa el formulario:
   - **Etiqueta**: Nombre de tu proyecto (ej: "Block Change Contact Form")
   - **Tipo de reCAPTCHA**: Selecciona **"reCAPTCHA v3"**
   - **Dominios**: Agrega tus dominios:
     - Para desarrollo: `localhost`
     - Para producción: `tudominio.com` (ej: `blockchangeholdings.com`)
   - Acepta los términos de servicio
5. Haz clic en **"Enviar"**
6. Copia las dos claves que se generan:
   - **Site Key (Clave del sitio)**: Esta es pública y se usa en el frontend
   - **Secret Key (Clave secreta)**: Esta es privada y se usa en el backend

## Paso 2: Configurar las variables de entorno

### Desarrollo local

1. Crea un archivo `.env` en la raíz del proyecto (si no existe)
2. Agrega las siguientes variables:

```bash
# Google reCAPTCHA v3
NUXT_PUBLIC_RECAPTCHA_SITE_KEY=tu_site_key_aqui
RECAPTCHA_SECRET_KEY=tu_secret_key_aqui

# Otras variables necesarias
RESEND_API_KEY=tu_resend_api_key
CONTACT_EMAIL=tu_email@ejemplo.com
```

3. Guarda el archivo

### Producción (Vercel)

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Settings** → **Environment Variables**
4. Agrega las siguientes variables:
   - `NUXT_PUBLIC_RECAPTCHA_SITE_KEY`: Tu Site Key
   - `RECAPTCHA_SECRET_KEY`: Tu Secret Key
   - `RESEND_API_KEY`: Tu API Key de Resend
   - `CONTACT_EMAIL`: El email donde recibirás los contactos
5. Haz clic en **"Save"**
6. Redeploy tu aplicación para que los cambios surtan efecto

## Paso 3: Verificar la instalación

1. Inicia el servidor de desarrollo:
```bash
npm run dev
```

2. Abre tu navegador y ve a la sección de contacto
3. Abre la consola del navegador (F12)
4. Deberías ver el mensaje: `✅ reCAPTCHA v3 inicializado correctamente`
5. Completa y envía el formulario de contacto
6. Si todo está configurado correctamente, el formulario se enviará sin problemas

## Cómo funciona

### Frontend (Cliente)
1. El plugin `plugins/recaptcha.client.ts` inicializa reCAPTCHA v3 cuando la página carga
2. Cuando el usuario envía el formulario, el componente `CallToActionSection.vue`:
   - Obtiene un token de reCAPTCHA usando `executeRecaptcha('contact_form')`
   - Envía el token junto con los datos del formulario al servidor

### Backend (Servidor)
1. El endpoint `server/api/contact.post.ts` recibe el token
2. Envía el token a la API de Google para verificación
3. Google responde con:
   - `success`: Si el token es válido
   - `score`: Un número de 0.0 a 1.0 indicando la probabilidad de que sea humano
4. Si el score es >= 0.5, se procesa el formulario
5. Si el score es < 0.5, se rechaza el envío

## Ajustar el umbral de detección

El umbral actual es **0.5**. Puedes ajustarlo en el archivo `server/api/contact.post.ts`:

```typescript
// Línea 21
return data.success && data.score >= 0.5  // Cambia 0.5 por el valor deseado
```

**Recomendaciones de Google:**
- **0.5**: Balance entre seguridad y experiencia de usuario (recomendado)
- **0.7**: Más estricto, puede rechazar algunos usuarios legítimos
- **0.3**: Más permisivo, puede dejar pasar algunos bots

## Monitoreo

Puedes monitorear las solicitudes y scores en la [consola de reCAPTCHA](https://www.google.com/recaptcha/admin):
1. Selecciona tu sitio
2. Ve a la pestaña **"Analytics"**
3. Verás estadísticas de:
   - Solicitudes totales
   - Distribución de scores
   - Intentos sospechosos bloqueados

## Solución de problemas

### Error: "Site key no configurada"
- Verifica que `NUXT_PUBLIC_RECAPTCHA_SITE_KEY` esté en tu archivo `.env`
- Reinicia el servidor de desarrollo

### Error: "Verificación de reCAPTCHA fallida"
- Verifica que `RECAPTCHA_SECRET_KEY` esté configurada correctamente
- Asegúrate de que el dominio esté registrado en la consola de reCAPTCHA
- Verifica que estés usando las claves correctas (v3, no v2)

### El badge de reCAPTCHA no aparece
- Esto es normal, está configurado con `autoHideBadge: true`
- Si quieres mostrarlo, cambia esta opción en `plugins/recaptcha.client.ts`

### Problemas en producción (Vercel)
- Verifica que todas las variables de entorno estén configuradas en Vercel
- Asegúrate de haber agregado tu dominio de producción en la consola de reCAPTCHA
- Redeploy la aplicación después de cambiar las variables de entorno

## Recursos adicionales

- [Documentación oficial de reCAPTCHA v3](https://developers.google.com/recaptcha/docs/v3)
- [Mejores prácticas de reCAPTCHA](https://developers.google.com/recaptcha/docs/v3#best_practices)
- [Preguntas frecuentes](https://developers.google.com/recaptcha/docs/faq)
