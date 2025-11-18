#!/bin/bash

echo "🚀 Iniciando servidor de desarrollo de Block Change..."
echo ""

# Verificar que el archivo .env existe
if [ ! -f .env ]; then
    echo "❌ ERROR: Archivo .env no encontrado"
    echo "📖 Por favor crea un archivo .env basado en .env.example"
    exit 1
fi

# Verificar que las variables críticas estén configuradas
if ! grep -q "RESEND_API_KEY=.\+" .env; then
    echo "⚠️  ADVERTENCIA: RESEND_API_KEY no está configurada"
    echo "   No se podrán enviar correos electrónicos"
    echo ""
fi

echo "✅ Archivo .env encontrado"
echo "🔄 Cargando variables de entorno..."
echo ""

# Exportar variables de entorno del archivo .env
set -a
source .env
set +a

# Mostrar configuración (sin mostrar valores sensibles)
echo "📋 Configuración cargada:"
echo "   RESEND_API_KEY: ${RESEND_API_KEY:0:20}..."
echo "   CONTACT_EMAIL: $CONTACT_EMAIL"
echo ""

# Iniciar el servidor de desarrollo
echo "🌐 Iniciando servidor Nuxt..."
npm run dev
