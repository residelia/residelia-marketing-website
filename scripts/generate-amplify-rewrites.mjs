/**
 * generate-amplify-rewrites.mjs
 *
 * Escanea el output estático generado por `nuxt generate` (.amplify-hosting/static/)
 * y actualiza automáticamente las reglas de rewrite de AWS Amplify via CLI.
 *
 * Ejecutar DESPUÉS de `nuxt generate`.
 * Uso: node scripts/generate-amplify-rewrites.mjs
 *
 * Requiere: AMPLIFY_APP_ID como variable de entorno (configurar en Amplify Console > App settings > Environment variables).
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const staticDir = path.resolve('.amplify-hosting/static')

if (!fs.existsSync(staticDir)) {
  console.error(`❌ Directorio no encontrado: ${staticDir}`)
  console.error('   Asegúrate de ejecutar "nuxt generate" antes de este script.')
  process.exit(1)
}

/**
 * Recorre recursivamente el directorio estático y devuelve todas las rutas
 * que contienen un archivo index.html (rutas navegables del sitio).
 */
function findIndexHtmlRoutes(dir, base = '') {
  const routes = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    if (!entry.isDirectory()) continue

    const subDir = path.join(dir, entry.name)
    const subRoute = `${base}/${entry.name}`

    if (fs.existsSync(path.join(subDir, 'index.html'))) {
      routes.push(subRoute)
    }

    // Recursivo para rutas anidadas (/resources/use-cases, etc.)
    routes.push(...findIndexHtmlRoutes(subDir, subRoute))
  }

  return routes
}

const routes = findIndexHtmlRoutes(staticDir)
console.log(`📄 ${routes.length} rutas encontradas en ${staticDir}`)

// Generar reglas Amplify: una por ruta explícita + catch-all al final
const rules = [
  ...routes.map(route => ({
    source: route,
    target: `${route}/index.html`,
    status: '200',
    condition: null,
  })),
  // Safety net: rutas que no estén en la lista (p.ej. páginas nuevas entre deploys)
  { source: '/<*>', target: '/[*]/index.html', status: '200', condition: null },
]

const appId = process.env.AMPLIFY_APP_ID

if (!appId) {
  // Fuera del entorno de Amplify: guardar para inspección manual
  const outFile = 'amplify-rewrites.json'
  fs.writeFileSync(outFile, JSON.stringify(rules, null, 2))
  console.warn(`⚠️  AMPLIFY_APP_ID no definido — reglas volcadas en ${outFile} (${rules.length} reglas)`)
  process.exit(0)
}

// Serializar y escapar las comillas simples para el shell
const rulesJson = JSON.stringify(rules).replace(/'/g, "'\\''")

try {
  execSync(
    `aws amplify update-app --app-id "${appId}" --custom-rules '${rulesJson}'`,
    { stdio: 'inherit' }
  )
  console.log(`✅ ${rules.length} reglas de rewrite actualizadas en Amplify (app: ${appId})`)
} catch (err) {
  console.error('❌ Error al actualizar las reglas en Amplify:', err.message)
  // Fallback: guardar para aplicación manual
  const outFile = 'amplify-rewrites.json'
  fs.writeFileSync(outFile, JSON.stringify(rules, null, 2))
  console.log(`   Reglas guardadas en ${outFile} para aplicación manual.`)
  process.exit(1)
}
