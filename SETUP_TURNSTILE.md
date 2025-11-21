# Configuración de Cloudflare Turnstile para Producción

Este documento explica paso a paso cómo configurar Cloudflare Turnstile en tu aplicación para producción.

## 🎯 ¿Qué es Cloudflare Turnstile?

Turnstile es la alternativa moderna de Cloudflare a CAPTCHA:
- ✅ **Invisible y sin fricción** - No requiere interacción del usuario en la mayoría de casos
- ✅ **Más rápido** - Carga más rápido que reCAPTCHA
- ✅ **Privacidad** - No rastrea usuarios entre sitios
- ✅ **Gratuito** - Sin límites para la mayoría de sitios web

## 📋 Requisitos Previos

- Una cuenta de Cloudflare (gratuita)
- Acceso al dominio donde se desplegará la aplicación

## 🔧 Pasos de Configuración

### 1. Crear una Cuenta en Cloudflare (si no tienes una)

1. Ve a [Cloudflare](https://dash.cloudflare.com/sign-up)
2. Crea una cuenta gratuita
3. Verifica tu correo electrónico

### 2. Acceder a Turnstile

1. Inicia sesión en [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. En el menú lateral izquierdo, busca **"Turnstile"**
3. O ve directamente a: `https://dash.cloudflare.com/?to=/:account/turnstile`
4. Haz clic en **"Add site"** o **"Agregar sitio"**

### 3. Configurar el Sitio

Completa el formulario con la siguiente información:

#### **Site name (Nombre del sitio)**
- Nombre descriptivo para tu sitio (ej: "Block Change - Formulario de Contacto")

#### **Domain (Dominio)**
Agrega los dominios donde se usará Turnstile:

**Para desarrollo:**
```
localhost
```

**Para producción:**
```
tudominio.com
www.tudominio.com
```

⚠️ **Importante:** Puedes agregar múltiples dominios separados por comas o uno por línea.

#### **Widget Mode (Modo del Widget)**
Selecciona uno de estos modos:

- **Managed (Recomendado)** ✅
  - Cloudflare decide automáticamente si mostrar un desafío
  - Invisible en la mayoría de casos
  - Mejor experiencia de usuario

- **Non-Interactive**
  - Siempre invisible
  - Puede tener más falsos positivos

- **Invisible**
  - Similar a Managed pero sin UI visible

**Recomendación:** Usa **Managed** para el mejor balance entre seguridad y experiencia de usuario.

### 4. Obtener las Claves

Después de crear el sitio, Cloudflare te proporcionará dos claves:

#### **Site Key (Clave del Sitio)**
- Esta es la clave **pública**
- Se usa en el **frontend** (navegador)
- Es visible en el código del cliente
- Ejemplo: `0x4AAAAAAA...`

#### **Secret Key (Clave Secreta)**
- Esta es la clave **privada**
- Se usa en el **backend** (servidor)
- ⚠️ **NUNCA** debe exponerse en el frontend
- Ejemplo: `0x4AAAAAAA...`

### 5. Configurar Variables de Entorno

#### **Desarrollo Local**

Crea un archivo `.env` en la raíz del proyecto (si no existe):

```bash
# Cloudflare Turnstile
NUXT_PUBLIC_TURNSTILE_SITE_KEY=tu_site_key_aqui
TURNSTILE_SECRET_KEY=tu_secret_key_aqui
```

#### **Producción (Vercel, Netlify, AWS Amplify)**

**Vercel:**
1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agrega las siguientes variables:
   - `NUXT_PUBLIC_TURNSTILE_SITE_KEY` = tu Site Key
   - `TURNSTILE_SECRET_KEY` = tu Secret Key
4. Selecciona los entornos: Production, Preview, Development
5. Guarda los cambios
6. Redeploy tu aplicación

**Netlify:**
1. Ve a tu sitio en Netlify Dashboard
2. Site settings → Environment variables
3. Agrega las variables:
   - `NUXT_PUBLIC_TURNSTILE_SITE_KEY` = tu Site Key
   - `TURNSTILE_SECRET_KEY` = tu Secret Key
4. Guarda los cambios
5. Redeploy tu aplicación

**AWS Amplify:**
1. Ve a tu app en AWS Amplify Console
2. Environment variables
3. Agrega las variables y guarda
4. Redeploy tu aplicación

### 6. Verificar la Configuración

#### **Prueba en Desarrollo**

1. Inicia el servidor de desarrollo:
```bash
npm run dev
```

2. Abre el formulario de contacto en `http://localhost:3000/#contactanos`
3. Completa el formulario
4. Verifica que aparezca el widget de Turnstile (un pequeño checkbox o badge de Cloudflare)
5. Envía el formulario
6. Verifica en la consola del servidor que aparezca:
   ```
   ✅ Turnstile verificado exitosamente
   ```

#### **Prueba en Producción**

1. Despliega tu aplicación
2. Prueba el formulario en el dominio de producción
3. Verifica que el formulario funcione correctamente

### 7. Monitorear y Ajustar

#### **Panel de Administración de Turnstile**

1. Ve a [Cloudflare Turnstile Dashboard](https://dash.cloudflare.com/?to=/:account/turnstile)
2. Selecciona tu sitio
3. Revisa las métricas:
   - **Requests:** Número de verificaciones
   - **Solve rate:** Porcentaje de usuarios que pasaron la verificación
   - **Challenge rate:** Porcentaje de usuarios que recibieron un desafío

#### **Ajustar el Modo del Widget**

Si ves muchos desafíos o falsos positivos, puedes cambiar el modo:

1. Ve a tu sitio en Turnstile Dashboard
2. Haz clic en **"Settings"**
3. Cambia el **"Widget Mode"**
4. Guarda los cambios

## 🔒 Mejores Prácticas de Seguridad

### ✅ Hacer

1. **Mantén la Secret Key segura:**
   - Nunca la incluyas en el código del frontend
   - Nunca la subas a repositorios públicos
   - Usa variables de entorno

2. **Valida en el servidor:**
   - Siempre verifica el token en el backend
   - No confíes solo en la validación del frontend

3. **Monitorea las métricas:**
   - Revisa regularmente el panel de Turnstile
   - Ajusta el modo según tus necesidades

4. **Usa HTTPS:**
   - Turnstile requiere HTTPS en producción
   - Asegúrate de que tu sitio tenga un certificado SSL válido

### ❌ Evitar

1. **No hardcodees las claves:**
   ```typescript
   // ❌ MAL
   const siteKey = '0x4AAAAAAA...'
   
   // ✅ BIEN
   const siteKey = process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY
   ```

2. **No omitas la validación del servidor:**
   - Aunque el frontend valide, siempre valida en el backend

3. **No uses el mismo sitio para desarrollo y producción:**
   - Crea sitios separados en Turnstile para cada entorno

## 🐛 Solución de Problemas

### Error: "Token de verificación no proporcionado"

**Causas posibles:**
1. **Site Key incorrecta:** Verifica que la Site Key sea correcta
2. **Dominio no autorizado:** Agrega el dominio en Turnstile Dashboard
3. **Token expirado:** Los tokens expiran después de 5 minutos

**Solución:**
1. Verifica que `NUXT_PUBLIC_TURNSTILE_SITE_KEY` esté configurada
2. Reinicia el servidor de desarrollo
3. Limpia el caché del navegador (Cmd+Shift+R o Ctrl+Shift+R)

### Error: "Verificación de seguridad fallida"

**Causas posibles:**
1. **Secret Key incorrecta:** Verifica que la Secret Key sea correcta
2. **Token ya usado:** Los tokens solo se pueden usar una vez
3. **Dominio no coincide:** El dominio debe estar autorizado

**Solución:**
1. Verifica que `TURNSTILE_SECRET_KEY` esté configurada correctamente
2. Asegúrate de que el dominio esté en la lista de dominios autorizados
3. Verifica los logs del servidor para más detalles

### Widget no se muestra

**Solución:**
1. Verifica que la Site Key sea correcta
2. Asegúrate de que el dominio esté autorizado
3. Verifica que no haya bloqueadores de anuncios activos
4. Revisa la consola del navegador para errores

### Widget se muestra pero no funciona

**Solución:**
1. Verifica la conexión a internet
2. Asegúrate de que Cloudflare no esté bloqueado
3. Prueba en modo incógnito
4. Verifica que el dominio esté autorizado

## 📊 Comparación: Turnstile vs reCAPTCHA

| Característica | Turnstile | reCAPTCHA v3 |
|----------------|-----------|--------------|
| **Privacidad** | ✅ No rastrea usuarios | ❌ Rastrea usuarios |
| **Velocidad** | ✅ Más rápido | ⚠️ Más lento |
| **Experiencia** | ✅ Menos intrusivo | ⚠️ Más intrusivo |
| **Costo** | ✅ Gratis sin límites | ⚠️ Límites en plan gratuito |
| **Configuración** | ✅ Más simple | ⚠️ Más compleja |
| **Soporte** | ✅ Cloudflare | ✅ Google |

## 📚 Recursos Adicionales

- [Documentación oficial de Turnstile](https://developers.cloudflare.com/turnstile/)
- [Documentación de @nuxtjs/turnstile](https://github.com/nuxt-modules/turnstile)
- [Cloudflare Turnstile Dashboard](https://dash.cloudflare.com/?to=/:account/turnstile)

## 📞 Soporte

Si tienes problemas con la configuración:
1. Revisa la consola del navegador y del servidor
2. Verifica que todas las variables de entorno estén configuradas
3. Consulta el panel de Turnstile para ver errores
4. Revisa los logs del servidor

---

**Última actualización:** Noviembre 2025
