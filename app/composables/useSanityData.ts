/*
composable for loading and previewing data from sanity
*/

import { createClient } from "@sanity/client";
import { useMainStore } from "../../stores/mainStore";

export default async function ({ query, params = {}, livePreview = false }: { query: string; params?: Record<string, unknown>; livePreview?: boolean }) {
  const mainStore = useMainStore();
  const config = useRuntimeConfig();

  const client = createClient({
    projectId: config.public.sanityProjectId,
    dataset: config.public.sanityDataset,
    apiVersion: config.public.apiVersion,
    useCdn: !mainStore.previewIsActive,
    token: config.public.sanityToken,
  });

  // Stable cache key so useAsyncData can deduplicate and serialize into page payload
  const key = `sanity:${query}:${JSON.stringify(params)}`;

  const { data, error } = await useAsyncData(key, () =>
    client.fetch(query, params)
  );

  if (error.value) {
    throw new Error((error.value as Error)?.message || 'Sanity fetch error');
  }

  // Return raw data (not a ref) to preserve backward compatibility with callers using data[0]
  return data.value;
}
