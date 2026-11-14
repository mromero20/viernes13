/** Solo emitir enlaces absolutos cuando se conoce el dominio verdadero. */
export function siteMetadata(siteUrl?: string) {
  if (!siteUrl?.trim()) return []
  const parsed = new URL(siteUrl)
  if (parsed.protocol !== 'https:' || parsed.username || parsed.password) {
    throw new Error('SITE_URL debe ser una URL HTTPS sin credenciales.')
  }
  const canonical = new URL('/', parsed).href
  const image = new URL('/social-preview.png', canonical).href
  return [
    { tag: 'link', attrs: { rel: 'canonical', href: canonical }, injectTo: 'head' as const },
    { tag: 'meta', attrs: { property: 'og:url', content: canonical }, injectTo: 'head' as const },
    { tag: 'meta', attrs: { property: 'og:image', content: image }, injectTo: 'head' as const },
    { tag: 'meta', attrs: { name: 'twitter:image', content: image }, injectTo: 'head' as const },
  ]
}
