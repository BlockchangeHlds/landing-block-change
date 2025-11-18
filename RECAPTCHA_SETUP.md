# Configuración de reCAPTCHA v3 con vue-recaptcha-v3

## ¿Qué es reCAPTCHA v3?

reCAPTCHA v3 es la versión más moderna de Google reCAPTCHA que funciona de manera invisible, sin requerir que el usuario haga clic en un checkbox o resuelva desafíos. Analiza el comportamiento del usuario y asigna una puntuación de 0.0 a 1.0 (donde 1.0 es muy probablemente un humano).

## Ventajas sobre reCAPTCHA v2

- ✅ **Experiencia de usuario mejorada**: No interrumpe el flujo del usuario
- ✅ **Sin widgets visibles**: Funciona en segundo plano
- ✅ **Más seguro**: Analiza el comportamiento completo del usuario
- ✅ **Fácil integración**: Menos código y configuración

## Implementación Actual

Este proyecto usa `vue-recaptcha-v3` para integrar reCAPTCHA v3 en Nuxt 4.

### Archivos creados:

1. **Plugin**: `/plugins/recaptcha.client.ts` - Inicializa reCAPTCHA v3
2. **Composable**: `/composables/useGoogleRecaptcha.ts` - Funciones para ejecutar reCAPTCHA
3. **Componente**: `/app/components/CallToActionSection.vue` - Implementación en el formulario

## Solución

### Paso 1: Verificar las claves de reCAPTCHA

1. Ve a [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Inicia sesión con tu cuenta de Google
3. Verifica que tu sitio esté registrado

### Paso 2: Crear un sitio reCAPTCHA v3

Si aún no tienes un sitio configurado:

1. En [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin), haz clic en el botón "+"
2. Completa el formulario:
   - **Etiqueta**: Nombre de tu proyecto (ej: "Block Change App")
   - **Tipo de reCAPTCHA**: Selecciona **reCAPTCHA v3**
   - **Dominios**: Agrega:
     - `localhost` (para desarrollo)
     - Tu dominio de producción (ej: `tudominio.com`)
3. Acepta los términos de servicio
4. Haz clic en "Enviar"
5. **Copia las claves** que se generan (Site Key y Secret Key)

### Paso 3: Actualizar las variables de entorno

Edita el archivo `.env` en la raíz del proyecto:

```bash
# Site Key (pública - se usa en el frontend)
NUXT_PUBLIC_RECAPTCHA_SITE_KEY=TU_NUEVA_SITE_KEY_AQUI

# Secret Key (privada - se usa en el backend)
RECAPTCHA_SECRET_KEY=TU_NUEVA_SECRET_KEY_AQUI
```

### Paso 4: Reiniciar el servidor de desarrollo

```bash
# Detén el servidor actual (Ctrl+C)
# Luego reinicia:
npm run dev
```

## Verificación

Después de configurar correctamente:

1. Reinicia el servidor de desarrollo
2. Abre la consola del navegador (F12)
3. Deberías ver el mensaje: `✅ reCAPTCHA v3 inicializado correctamente`
4. Al enviar el formulario, verás: `✅ reCAPTCHA token obtenido para acción: submit_consultation`
5. El badge de reCAPTCHA aparecerá brevemente en la esquina inferior derecha (se oculta automáticamente)

## Cómo Funciona

### En el formulario:

```typescript
// El composable se inicializa automáticamente
const { executeRecaptcha } = useGoogleRecaptcha()

// Al enviar el formulario
async function onSubmitConsultation() {
  // Ejecutar reCAPTCHA v3 y obtener el token
  const token = await executeRecaptcha('submit_consultation')
  
  // El token se envía con los datos del formulario
  const formData = {
    ...consultationForm,
    'g-recaptcha-response': token
  }
  
  // Enviar al backend...
}
```

### Acciones personalizadas:

Puedes usar diferentes acciones para diferentes formularios:

```typescript
await executeRecaptcha('login')
await executeRecaptcha('contact')
await executeRecaptcha('purchase')
```

Esto te permite analizar el comportamiento en diferentes contextos.

## Validación en el Backend

El backend debe verificar el token recibido:

```javascript
// Ejemplo de validación en el servidor
const verifyRecaptcha = async (token) => {
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`
  })
  
  const data = await response.json()
  
  // data.success: true/false
  // data.score: 0.0 - 1.0 (mayor es mejor)
  // data.action: la acción que se ejecutó
  
  return data.success && data.score >= 0.5 // Umbral recomendado
}
```

## Desarrollo Local

Para desarrollo local, **debes crear un sitio reCAPTCHA v3 real** en Google Console y agregar `localhost` como dominio autorizado.

**No existen claves de prueba para reCAPTCHA v3** como en v2.

## Solución de Problemas

### El token es null

- Verifica que la Site Key esté correctamente configurada en `.env`
- Asegúrate de que el dominio esté autorizado en Google Console
- Revisa la consola del navegador para ver errores

### El badge no aparece

- Esto es normal, el badge se oculta automáticamente (`autoHideBadge: true`)
- Si quieres verlo, cambia esta opción en `/plugins/recaptcha.client.ts`

### Error de CORS

- Verifica que el dominio esté exactamente como aparece en la URL
- Para `localhost`, no incluyas el puerto en Google Console
