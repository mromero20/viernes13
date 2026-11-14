import assert from 'node:assert/strict'
import test from 'node:test'
import { createBackgroundMusic } from '../src/lib/backgroundMusic.ts'

class FakeAudio extends EventTarget {
  src = ''
  preload = ''
  loop = false
  volume = 1
  paused = true
  currentTime = 0
  plays = 0
  pauses = 0
  loads = 0
  playResult = null
  play() {
    this.plays++
    if (this.playResult) return this.playResult()
    this.paused = false
    this.dispatchEvent(new Event('playing'))
    return Promise.resolve()
  }
  pause() { this.pauses++; this.paused = true; this.dispatchEvent(new Event('pause')) }
  load() { this.loads++ }
  removeAttribute(name) { if (name === 'src') this.src = '' }
}

const setup = (src = '/audio/viernes-13.mp3') => {
  const element = new FakeAudio()
  let created = 0
  const player = createBackgroundMusic({ src, initialVolume: 0.25 }, () => { created++; return element })
  return { element, player, created: () => created }
}

test('sin archivo configurado no crea instancia ni intenta reproducir', async () => {
  const { player, element, created } = setup(null)
  assert.equal(player.getSnapshot(), 'unavailable')
  await player.startFromInteraction()
  await player.toggleFromInteraction()
  assert.equal(created(), 0)
  assert.equal(element.plays, 0)
})

test('play se invoca en el mismo evento, sin autoplay previo, y conserva una sola instancia', async () => {
  const { player, element, created } = setup()
  assert.equal(created(), 0)
  assert.equal(player.getSnapshot(), 'idle')
  const result = player.startFromInteraction()
  assert.equal(element.plays, 1, 'play debe haberse llamado antes de devolver la promesa')
  await result
  assert.equal(player.getSnapshot(), 'playing')
  assert.equal(element.preload, 'none')
  assert.equal(element.loop, true)
  assert.equal(element.volume, 0.25)
  element.currentTime = 42
  for (let i = 0; i < 13; i++) await player.startFromInteraction()
  assert.equal(created(), 1)
  assert.equal(element.plays, 1)
  assert.equal(element.currentTime, 42)
})

test('pausa manual se respeta al reiniciar; reanudar conserva el tiempo y la instancia', async () => {
  const { player, element, created } = setup()
  await player.startFromInteraction()
  element.currentTime = 25
  await player.toggleFromInteraction()
  assert.equal(player.getSnapshot(), 'paused')
  await player.startFromInteraction()
  assert.equal(element.plays, 1)
  await player.toggleFromInteraction()
  assert.equal(player.getSnapshot(), 'playing')
  assert.equal(element.currentTime, 25)
  assert.equal(created(), 1)
})

test('play bloqueado se gestiona y permite activación manual por otro gesto', async () => {
  const { player, element, created } = setup()
  element.playResult = () => Promise.reject(new DOMException('Requiere interacción', 'NotAllowedError'))
  await player.startFromInteraction()
  assert.equal(player.getSnapshot(), 'blocked')
  element.playResult = null
  await player.toggleFromInteraction()
  assert.equal(player.getSnapshot(), 'playing')
  assert.equal(created(), 1)
})

test('archivo ausente o formato no soportado termina sin rechazo no gestionado', async () => {
  const { player, element } = setup()
  element.playResult = () => Promise.reject(new DOMException('No soportado', 'NotSupportedError'))
  await player.startFromInteraction()
  assert.equal(player.getSnapshot(), 'error')
  assert.equal(element.paused, true)
  await player.startFromInteraction()
  assert.equal(element.plays, 1)
})

test('error de red y promesas tardías no reanudan una reproducción pausada', async () => {
  const { player, element } = setup()
  let finish
  element.playResult = () => new Promise(resolve => { finish = resolve })
  const pending = player.startFromInteraction()
  assert.equal(player.getSnapshot(), 'loading')
  await player.toggleFromInteraction()
  finish()
  await pending
  assert.equal(player.getSnapshot(), 'paused')
  element.dispatchEvent(new Event('playing'))
  assert.equal(element.paused, true)
  element.dispatchEvent(new Event('error'))
  assert.equal(player.getSnapshot(), 'error')
})

test('dispose libera recursos, elimina listeners e invalida resultados pendientes', async () => {
  const { player, element } = setup()
  let finish
  element.playResult = () => new Promise(resolve => { finish = resolve })
  const pending = player.startFromInteraction()
  player.dispose()
  finish()
  await pending
  assert.equal(player.getSnapshot(), 'idle')
  assert.equal(element.src, '')
  assert.equal(element.loads, 1)
  element.dispatchEvent(new Event('playing'))
  assert.equal(player.getSnapshot(), 'idle')
})

test('observa reproducción, pausa del sistema y buffering con estado consistente', async () => {
  const { player, element } = setup()
  const changes = []
  const unsubscribe = player.subscribe(() => changes.push(player.getSnapshot()))
  await player.startFromInteraction()
  element.dispatchEvent(new Event('waiting'))
  assert.equal(player.getSnapshot(), 'loading')
  element.dispatchEvent(new Event('playing'))
  element.pause()
  assert.equal(player.getSnapshot(), 'paused')
  unsubscribe()
  const count = changes.length
  element.dispatchEvent(new Event('error'))
  assert.equal(changes.length, count)
})

test('waiting tardío no oculta el control de activación tras bloquearse play', async () => {
  const { player, element } = setup()
  element.playResult = () => Promise.reject(new DOMException('Bloqueado', 'NotAllowedError'))
  await player.startFromInteraction()
  element.dispatchEvent(new Event('waiting'))
  assert.equal(player.getSnapshot(), 'blocked')
  element.playResult = null
  await player.toggleFromInteraction()
  element.pause()
  element.dispatchEvent(new Event('waiting'))
  assert.equal(player.getSnapshot(), 'paused')
})
