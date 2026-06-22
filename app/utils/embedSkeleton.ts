// Skeleton que se muestra mientras embed.js (lead-capture) carga el formulario.
// Fuente única del markup, compartida por HeroRadar y los heroes de recursos.
// El estilo vive en app/assets/css/main.scss (.residelia-form-skeleton / .rfs-bar).
export const EMBED_SKELETON_HTML = `
  <div class="residelia-form-skeleton" aria-hidden="true">
    <span class="rfs-bar"></span>
    <span class="rfs-bar"></span>
    <span class="rfs-bar"></span>
    <span class="rfs-bar rfs-bar--btn"></span>
  </div>
`

// Inserta el skeleton dentro de un .residelia-form vacío (solo cliente).
// embed.js elimina su contenido al renderizar el formulario, así que se limpia solo.
export const injectEmbedSkeleton = (root: ParentNode | null | undefined) => {
  const host = root?.querySelector?.('.residelia-form')
  if (host && host.children.length === 0) {
    host.innerHTML = EMBED_SKELETON_HTML
  }
}
