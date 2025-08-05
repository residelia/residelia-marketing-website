/*
composable for loading and previewing data from sanity
*/

import { createClient } from "@sanity/client";
import { useMainStore } from "../../stores/mainStore";

// Puedes mover estos valores a variables de entorno para mayor seguridad
const projectId = "asqz10j2";
const dataset = "production";
const apiVersion = "2023-08-01";
const token = 'skHqzduJvPr2TrtA3ugj1NEBAWvZkqY1jJgQWdZewbnyaJKuy5KGFECZLFNcVat0JD4xeWOpXDnzPzC0GDGgCb0JiKWJ2cIt0FplMbZJxLYicS3FNRwGwXEWlmWs4z1WRBrG6UinrlVgx9ehOJH8pVfkhIc3o90zcQQgpJ1c4DUzM61mmxWh';
const previewToken = undefined; // O usa process.env.SANITY_PREVIEW_TOKEN si lo tienes

export default async function ({ query, params = {}, livePreview = false }) {
  const mainStore = useMainStore();

  // Configuración básica del cliente
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: !mainStore.previewIsActive, // CDN solo para producción
    token
  });

  // Si necesitas soporte para live preview, puedes agregar lógica aquí
  // pero @sanity/client no soporta listen en edge/SSG, solo en cliente

  // Ejecutar la consulta
  try {
    const data = await client.fetch(query, params);
    return data;
  } catch (err) {
    // Siempre lanza un Error estándar
    throw new Error(err?.message || JSON.stringify(err) || 'Sanity fetch error');
  }
}
