// Files in public/ are copied verbatim and are NOT rewritten by Vite, so a
// hard-coded "/assets/x.jpg" breaks the moment the site is served from a
// subpath (vite.config.js sets base: '/karyonzschool/'). Resolving against
// BASE_URL keeps every image correct at the root and on a subpath alike.
export function asset(path) {
  return `${import.meta.env.BASE_URL}${String(path).replace(/^\/+/, '')}`
}
