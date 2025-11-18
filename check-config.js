#!/usr/bin/env node

/**
 * Script para verificar la configuración de variables de entorno
 * Ejecutar con: node check-config.js
 */

console.log('\n🔍 Verificando configuración de variables de entorno...\n')

const requiredVars = {
  'NUXT_PUBLIC_RECAPTCHA_SITE_KEY': 'Clave pública de reCAPTCHA (frontend)',
  'RECAPTCHA_SECRET_KEY': 'Clave secreta de reCAPTCHA (backend)',
  'RESEND_API_KEY': 'API Key de Resend para envío de correos',
  'CONTACT_EMAIL': 'Email donde se recibirán los contactos'
}

let allConfigured = true
let missingVars = []

for (const [varName, description] of Object.entries(requiredVars)) {
  const value = process.env[varName]
  const isConfigured = value && value.trim() !== ''
  
  const status = isConfigured ? '✅' : '❌'
  const displayValue = isConfigured 
    ? (varName.includes('SECRET') || varName.includes('KEY') 
        ? `${value.substring(0, 10)}...` 
        : value)
    : 'NO CONFIGURADA'
  
  console.log(`${status} ${varName}`)
  console.log(`   ${description}`)
  console.log(`   Valor: ${displayValue}\n`)
  
  if (!isConfigured) {
    allConfigured = false
    missingVars.push(varName)
  }
}

if (!allConfigured) {
  console.log('❌ CONFIGURACIÓN INCOMPLETA\n')
  console.log('Faltan las siguientes variables de entorno:')
  missingVars.forEach(varName => console.log(`  - ${varName}`))
  console.log('\n📖 Pasos para configurar:')
  console.log('1. Crea un archivo .env en la raíz del proyecto')
  console.log('2. Copia el contenido de .env.example')
  console.log('3. Completa los valores con tus claves reales')
  console.log('4. Lee RECAPTCHA_SETUP.md para obtener las claves de reCAPTCHA')
  console.log('\n⚠️  Sin estas variables, el formulario de contacto NO funcionará.\n')
  process.exit(1)
} else {
  console.log('✅ CONFIGURACIÓN COMPLETA')
  console.log('Todas las variables de entorno están configuradas correctamente.\n')
  process.exit(0)
}
