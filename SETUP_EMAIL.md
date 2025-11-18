# Configuración del Sistema de Envío de Correos

Este proyecto utiliza **Resend** para el envío de correos electrónicos desde el formulario de contacto.

## Pasos para Configurar

### 1. Crear una cuenta en Resend

1. Ve a [https://resend.com](https://resend.com)
2. Crea una cuenta gratuita
3. Verifica tu correo electrónico

### 2. Obtener tu API Key

1. Una vez dentro del dashboard de Resend, ve a **API Keys**
2. Haz clic en **Create API Key**
3. Dale un nombre descriptivo (ej: "Block Change Production")
4. Copia la API key generada (solo se mostrará una vez)

### 3. Configurar Variables de Entorno

1. Crea un archivo `.env` en la raíz del proyecto (si no existe)
2. Agrega la siguiente línea con tu API key:

```bash
RESEND_API_KEY=re_tu_api_key_aqui
```

### 4. Configurar Dominio de Envío (Opcional pero Recomendado)

Por defecto, Resend usa `onboarding@resend.dev` como remitente. Para usar tu propio dominio:

1. En el dashboard de Resend, ve a **Domains**
2. Haz clic en **Add Domain**
3. Ingresa tu dominio (ej: `blockchange.com`)
4. Sigue las instrucciones para verificar el dominio mediante registros DNS
5. Una vez verificado, actualiza el archivo `server/api/contact.post.ts`:

```typescript
from: 'Block Change <contacto@tudominio.com>',
```

### 5. Configurar Correo de Destino

El correo de destino está configurado en `server/api/contact.post.ts`:

```typescript
to: ['emmanuelbarturen@gmail.com'],
```

Puedes agregar múltiples destinatarios si lo deseas:

```typescript
to: ['emmanuelbarturen@gmail.com', 'otro@ejemplo.com'],
```

## Estructura del Sistema

### Endpoint API
- **Archivo**: `server/api/contact.post.ts`
- **Método**: POST
- **Ruta**: `/api/contact`

### Componente Frontend
- **Archivo**: `app/components/CallToActionSection.vue`
- **Función**: `onSubmitConsultation()`

### Datos del Formulario

El formulario captura:
- **name**: Nombre del contacto (requerido)
- **company**: Apellidos (opcional)
- **phone**: Teléfono (requerido)
- **email**: Correo electrónico (requerido)
- **message**: Mensaje (opcional)

## Plantilla de Email

El correo se envía con formato HTML profesional que incluye:
- Header con branding de Block Change
- Campos organizados con etiquetas claras
- Diseño responsive
- Colores corporativos (#00204B, #1DA977)

## Testing

Para probar el sistema:

1. Asegúrate de tener la API key configurada en `.env`
2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Ve a la sección de contacto en tu aplicación
4. Llena el formulario y envíalo
5. Verifica que el correo llegue a `emmanuelbarturen@gmail.com`

## Límites del Plan Gratuito de Resend

- **100 correos por día**
- **3,000 correos por mes**
- Perfecto para sitios de bajo a medio tráfico

Si necesitas más, considera actualizar al plan Pro.

## Troubleshooting

### Error: "Configuración de email no disponible"
- Verifica que `RESEND_API_KEY` esté en tu archivo `.env`
- Reinicia el servidor de desarrollo

### Los correos no llegan
- Verifica que la API key sea válida
- Revisa los logs del servidor para ver errores
- Verifica que el correo de destino sea correcto

### Error de CORS o dominio
- Si usas un dominio personalizado, asegúrate de que esté verificado en Resend
- Usa `onboarding@resend.dev` para pruebas iniciales

## Seguridad

⚠️ **IMPORTANTE**: 
- Nunca subas el archivo `.env` al repositorio
- El archivo `.env` ya está incluido en `.gitignore`
- La API key solo se usa en el servidor (nunca se expone al cliente)
- Para producción, configura la variable de entorno en tu plataforma de hosting

## Producción

Para desplegar en producción (ej: AWS Amplify, Vercel, Netlify):

1. Agrega la variable de entorno `RESEND_API_KEY` en la configuración de tu plataforma
2. Asegúrate de que el preset de Nitro sea compatible con tu plataforma
3. Verifica que el dominio de envío esté configurado correctamente

## Soporte

- Documentación de Resend: [https://resend.com/docs](https://resend.com/docs)
- API Reference: [https://resend.com/docs/api-reference](https://resend.com/docs/api-reference)
