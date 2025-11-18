# 🔧 Solución al Error de reCAPTCHA

## Error que estás viendo:
```
[Vue warn]: injection "Symbol(VueReCaptchaInjectKey)" not found
```

## ¿Qué significa?
Este error indica que el plugin de reCAPTCHA no se está inicializando correctamente porque las variables de entorno no se están cargando.

## ✅ Solución Paso a Paso

### 1. Verifica tu archivo `.env`

Tu archivo `.env` debe tener EXACTAMENTE este formato (sin espacios extra):

```bash
NUXT_PUBLIC_RECAPTCHA_SITE_KEY=6LeIxAcTAAAAAJcZVRqyHv71UIEGN0_MXj1ZKhI
RECAPTCHA_SECRET_KEY=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
NUXT_HOST=0.0.0.0
NUXT_PORT=3000
RESEND_API_KEY=re_hKoX3P3w_G1f327q55hFootpx7Mwrm7aX
CONTACT_EMAIL=emmanuelbarturen@gmail.com
```

**IMPORTANTE:** 
- NO debe haber espacios antes o después del `=`
- NO debe haber comillas alrededor de los valores
- Cada variable debe estar en su propia línea

### 2. Detén COMPLETAMENTE el servidor

```bash
# Detener todos los procesos de Nuxt
pkill -f "nuxt dev"

# O presiona Ctrl+C en la terminal donde está corriendo
```

### 3. Inicia el servidor con el script personalizado

```bash
./start-dev.sh
```

O si prefieres el método tradicional:

```bash
npm run dev
```

### 4. Verifica en la consola del navegador

1. Abre `http://localhost:3000` en tu navegador
2. Presiona `F12` para abrir las herramientas de desarrollo
3. Ve a la pestaña **Console**
4. Busca mensajes que empiecen con `🔍 [reCAPTCHA Plugin]`

**Deberías ver:**
```
🔍 [reCAPTCHA Plugin] Iniciando...
🔍 [reCAPTCHA Plugin] Config público disponible: [...]
🔍 [reCAPTCHA Plugin] recaptchaSiteKey: 6LeIxAcTAAAAAJcZVRqy...
🔍 [reCAPTCHA Plugin] Registrando plugin de Vue...
✅ [reCAPTCHA Plugin] reCAPTCHA v3 inicializado correctamente
```

**Si ves esto en su lugar:**
```
❌ [reCAPTCHA Plugin] ERROR: Site key no configurada
```

Significa que Nuxt no está leyendo el archivo `.env`.

### 5. Si el problema persiste

#### Opción A: Reinicia tu terminal completamente
1. Cierra la terminal actual
2. Abre una nueva terminal
3. Navega al proyecto: `cd /ruta/a/tu/proyecto`
4. Inicia el servidor: `npm run dev`

#### Opción B: Usa el archivo `.env.local`
Nuxt a veces prioriza `.env.local` sobre `.env`:

```bash
# Copia tu .env a .env.local
cp .env .env.local

# Reinicia el servidor
npm run dev
```

#### Opción C: Configura las variables directamente en el comando
```bash
NUXT_PUBLIC_RECAPTCHA_SITE_KEY=tu_clave_aqui npm run dev
```

### 6. Modo desarrollo sin reCAPTCHA

Si necesitas probar el formulario urgentemente sin reCAPTCHA:

El código ya está configurado para funcionar en modo desarrollo sin reCAPTCHA. Simplemente:
1. El formulario mostrará una advertencia en la consola
2. Pero permitirá enviar el formulario sin verificación
3. Verás este mensaje en el servidor: `⚠️ DESARROLLO: reCAPTCHA no configurado, permitiendo envío sin verificación`

**⚠️ IMPORTANTE:** En producción (Vercel), DEBES configurar las variables de entorno o el formulario no funcionará.

## 🚀 Configuración en Vercel (Producción)

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Settings → Environment Variables
3. Agrega:
   - `NUXT_PUBLIC_RECAPTCHA_SITE_KEY` = tu clave pública
   - `RECAPTCHA_SECRET_KEY` = tu clave secreta
   - `RESEND_API_KEY` = tu API key de Resend
   - `CONTACT_EMAIL` = tu email
4. Redeploy la aplicación

## 📞 ¿Aún tienes problemas?

Ejecuta este comando para diagnosticar:

```bash
node check-config.js
```

Esto te dirá exactamente qué variables faltan.

## 🔗 Recursos

- [Documentación de reCAPTCHA v3](https://developers.google.com/recaptcha/docs/v3)
- [Obtener claves de reCAPTCHA](https://www.google.com/recaptcha/admin)
- [Documentación de Nuxt sobre variables de entorno](https://nuxt.com/docs/guide/directory-structure/env)
