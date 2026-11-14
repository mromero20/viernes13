import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { siteMetadata } from '../scripts/site-metadata.ts'

test('sin dominio conocido no se inventan enlaces sociales ni canonical', () => {
  assert.deepEqual(siteMetadata(), [])
  assert.deepEqual(siteMetadata(''), [])
})

test('un dominio HTTPS genera enlaces absolutos de la raíz y de la imagen', () => {
  const tags = siteMetadata('https://preview.example.test/')
  assert.equal(tags.find(t => t.attrs.property === 'og:url').attrs.content, 'https://preview.example.test/')
  assert.equal(tags.find(t => t.attrs.property === 'og:image').attrs.content, 'https://preview.example.test/social-preview.png')
  assert.equal(tags.find(t => t.attrs.name === 'twitter:image').attrs.content, 'https://preview.example.test/social-preview.png')
})

test('los metadatos no aceptan credenciales ni un dominio sin HTTPS', () => {
  assert.throws(() => siteMetadata('http://preview.example.test'))
  assert.throws(() => siteMetadata('https://user:pass@preview.example.test'))
})

test('el HTML base contiene los textos sociales aprobados y noindex', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
  assert.ok(html.includes('content="No es la gran cosa, pero espero que te guste"'))
  assert.ok(html.includes('content="13 mensajitos para ti ♡"'))
  assert.ok(html.includes('content="summary_large_image"'))
  assert.ok(html.includes('content="noindex, nofollow"'))
})
