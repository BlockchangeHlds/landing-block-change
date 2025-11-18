import { Resend } from 'resend'

/**
 * Verifica el token de reCAPTCHA v3 con la API de Google
 */
async function verifyRecaptcha(token: string, secretKey: string, isDevelopment: boolean): Promise<boolean> {
  // Claves de prueba de Google - siempre pasan en desarrollo
  const TEST_SECRET_KEY = '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe'

  // Si estamos en desarrollo y usando claves de prueba, aceptar automáticamente
  if (isDevelopment && (secretKey.startsWith('6LeIxAcT') || secretKey === TEST_SECRET_KEY)) {
    console.log('🧪 [DESARROLLO] Usando claves de prueba de reCAPTCHA - verificación omitida')
    return true
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `secret=${secretKey}&response=${token}`
    })

    const data = await response.json()

    console.log('📊 Respuesta de reCAPTCHA:', {
      success: data.success,
      score: data.score,
      action: data.action,
      hostname: data.hostname
    })

    // reCAPTCHA v3 devuelve un score de 0.0 a 1.0
    // 1.0 es muy probable que sea humano, 0.0 es muy probable que sea bot
    // Usamos un umbral de 0.5 como recomendación de Google
    return data.success && data.score >= 0.5
  } catch (error) {
    console.error('❌ Error al verificar reCAPTCHA:', error)
    // En desarrollo, permitir si hay error
    if (isDevelopment) {
      console.warn('⚠️ [DESARROLLO] Error en verificación, permitiendo envío')
      return true
    }
    return false
  }
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { name, company, phone, email, message, recaptchaToken } = body

    // Validar campos requeridos
    if (!name || !phone || !email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Faltan campos requeridos'
      })
    }

    // Obtener la configuración desde las variables de entorno
    const config = useRuntimeConfig()
    const resendApiKey = config.resendApiKey
    const contactEmail = config.contactEmail
    const recaptchaSecretKey = config.recaptchaSecretKey

    // Validar token de reCAPTCHA
    // En desarrollo, permitir envíos sin reCAPTCHA si no está configurado
    const isDevelopment = process.env.NODE_ENV === 'development'

    if (!recaptchaToken && !isDevelopment) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Token de verificación requerido'
      })
    }

    if (!recaptchaSecretKey && !isDevelopment) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Configuración de reCAPTCHA no disponible'
      })
    }

    // Verificar el token con Google reCAPTCHA solo si está configurado
    if (recaptchaToken && recaptchaSecretKey) {
      const isValidRecaptcha = await verifyRecaptcha(recaptchaToken, recaptchaSecretKey, isDevelopment)

      if (!isValidRecaptcha) {
        throw createError({
          statusCode: 403,
          statusMessage: 'Verificación de reCAPTCHA fallida. Por favor intenta de nuevo.'
        })
      }
    } else if (isDevelopment) {
      console.warn('⚠️ DESARROLLO: reCAPTCHA no configurado, permitiendo envío sin verificación')
    }

    if (!resendApiKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Configuración de email no disponible'
      })
    }

    if (!contactEmail) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Correo de destino no configurado'
      })
    }

    // Inicializar Resend
    const resend = new Resend(resendApiKey)

    // Crear el contenido del email en HTML
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #00204B;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background-color: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 8px 8px;
            }
            .field {
              margin-bottom: 15px;
            }
            .label {
              font-weight: bold;
              color: #00204B;
            }
            .value {
              margin-top: 5px;
              padding: 10px;
              background-color: white;
              border-left: 3px solid #1DA977;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Nueva Consulta - Block Change</h1>
            </div>
            <div class="content">
              <p>Has recibido una nueva consulta desde el formulario de contacto:</p>

              <div class="field">
                <div class="label">Nombre:</div>
                <div class="value">${name}</div>
              </div>

              ${company
                ? `
              <div class="field">
                <div class="label">Apellidos:</div>
                <div class="value">${company}</div>
              </div>
              `
                : ''}

              <div class="field">
                <div class="label">Teléfono:</div>
                <div class="value">${phone}</div>
              </div>

              <div class="field">
                <div class="label">Correo electrónico:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>

              ${message
                ? `
              <div class="field">
                <div class="label">Mensaje:</div>
                <div class="value">${message}</div>
              </div>
              `
                : ''}

              <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">

              <p style="color: #666; font-size: 12px;">
                Este correo fue enviado automáticamente desde el formulario de contacto de Block Change.
              </p>
            </div>
          </div>
        </body>
      </html>
    `

    // Enviar el email usando Resend
    const data = await resend.emails.send({
      from: 'Block Change <onboarding@blockchangeholdings.com>', // Cambiar por tu dominio verificado
      to: [contactEmail],
      subject: `Nueva consulta de ${name}`,
      html: emailHtml
    })

    return {
      success: true,
      message: 'Correo enviado exitosamente',
      data
    }
  } catch (error: unknown) {
    console.error('Error al enviar correo:', error)

    const errorMessage = error instanceof Error ? error.message : 'Error al enviar el correo'
    throw createError({
      statusCode: 500,
      statusMessage: errorMessage
    })
  }
})
