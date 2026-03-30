/**
 * Migración: renombrar valores del campo `type` en documentos `resource` de Sanity
 *
 * Cambios:
 *   ebook  → reports
 *   report → trends
 *   pill   → tips
 *
 * Ejecutar DESPUÉS de haber actualizado el enum en el Sanity Studio.
 * Uso: node scripts/migrate-resource-types.js
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.development' })

const client = createClient({
  projectId: 'asqz10j2',
  dataset: 'production',
  apiVersion: '2023-08-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const TYPE_MIGRATION = {
  'ebook':  'reports',
  'report': 'trends',
  'pill':   'tips',
}

console.log('Iniciando migración de tipos de recursos...\n')

for (const [oldType, newType] of Object.entries(TYPE_MIGRATION)) {
  const docs = await client.fetch(
    `*[_type == "resource" && type == $oldType] { _id, "title": title[_key == "es"][0].value }`,
    { oldType }
  )
  console.log(`[${oldType} → ${newType}] ${docs.length} documento(s)`)
  for (const doc of docs) {
    await client.patch(doc._id).set({ type: newType }).commit()
    console.log(`  ✓ ${doc.title ?? doc._id}`)
  }
}

console.log('\n✓ Migración completada.')
