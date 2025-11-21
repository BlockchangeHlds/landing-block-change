import { Resend } from 'resend'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { name, company, phone, email, message, turnstileToken } = body

    // Validar campos requeridos
    if (!name || !phone || !email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Faltan campos requeridos'
      })
    }

    // Validar token de Turnstile
    if (!turnstileToken) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Token de verificación no proporcionado'
      })
    }

    // Obtener la configuración desde las variables de entorno
    const config = useRuntimeConfig()
    const resendApiKey = config.resendApiKey
    const contactEmail = config.contactEmail
    const turnstileSecretKey = config.turnstileSecretKey

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

    if (!turnstileSecretKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Configuración de Turnstile no disponible'
      })
    }

    // Verificar el token de Turnstile con Cloudflare
    const turnstileResponse = await $fetch<{
      success: boolean
      'error-codes'?: string[]
      challenge_ts?: string
      hostname?: string
    }>('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: {
        secret: turnstileSecretKey,
        response: turnstileToken
      }
    })

    // Validar respuesta de Turnstile
    if (!turnstileResponse.success) {
      console.error('Error de Turnstile:', turnstileResponse['error-codes'])
      throw createError({
        statusCode: 400,
        statusMessage: 'Verificación de seguridad fallida'
      })
    }

    console.log('✅ Turnstile verificado exitosamente')

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
