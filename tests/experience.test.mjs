import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { initialExperience, transitionExperience } from '../src/lib/experience.ts'
import { messages } from '../src/data/messages.ts'

const send = (state, type, extra = {}) => transitionExperience(state, { type, index: state.index, ...extra }, messages.length)

test('los 13 textos coinciden literalmente con el brief y conservan el orden', () => {
  const brief = readFileSync(new URL('../docs/PROJECT_BRIEF.md', import.meta.url), 'utf8').replace(/\r\n/g, '\n')
  const approved = [...brief.matchAll(/^### Mensaje (\d+) — [^\n]+\n\n([^]+?)(?=\n\n### Mensaje |\n\n## 8\.)/gm)]
  assert.equal(approved.length, 13)
  assert.deepEqual(messages, approved.map(m => ({ id: Number(m[1]), text: m[2] })))
  assert.deepEqual(messages.map(m => m.id), Array.from({ length: 13 }, (_, i) => i + 1))
})

test('no se avanza ni se revela antes de la apertura y la elevación completas', () => {
  let state = initialExperience
  for (const type of ['CONTINUE', 'EXITED', 'FLAP_OPENED', 'LETTER_LIFTED', 'TEXT_REVEALED']) {
    assert.equal(send(state, type), state)
  }
  state = send(state, 'OPEN')
  assert.equal(state.phase, 'opening')
  assert.equal(send(state, 'OPEN'), state)
  assert.equal(send(state, 'CONTINUE'), state)
  assert.equal(send(state, 'LETTER_LIFTED'), state)
  state = send(state, 'FLAP_OPENED')
  assert.equal(state.phase, 'rising')
  assert.equal(send(state, 'CONTINUE'), state)
  state = send(state, 'LETTER_LIFTED')
  assert.equal(state.phase, 'revealing')
  assert.equal(send(state, 'CONTINUE'), state)
  state = send(state, 'TEXT_REVEALED')
  assert.equal(state.phase, 'revealed')
})

test('recorre exactamente 13 mensajes, ignora repeticiones y callbacks de sobres anteriores', () => {
  let state = initialExperience
  for (let i = 0; i < messages.length; i++) {
    assert.deepEqual(state, { index: i, phase: 'closed' })
    for (const type of ['OPEN', 'FLAP_OPENED', 'LETTER_LIFTED', 'TEXT_REVEALED', 'CONTINUE']) {
      state = send(state, type)
      const duplicate = send(state, type)
      assert.equal(duplicate, state)
    }
    assert.equal(state.phase, 'closing')
    const oldIndex = state.index
    state = send(state, 'EXITED')
    for (const type of ['OPEN', 'FLAP_OPENED', 'LETTER_LIFTED', 'TEXT_REVEALED', 'CONTINUE', 'EXITED']) {
      assert.equal(transitionExperience(state, { type, index: oldIndex }, messages.length), state)
    }
  }
  assert.deepEqual(state, { index: 12, phase: 'completed' })
})

test('movimiento reducido conserva el recorrido completo sin esperar callbacks de animación', () => {
  let state = initialExperience
  for (let i = 0; i < messages.length; i++) {
    assert.equal(state.index, i)
    state = send(state, 'OPEN', { instant: true })
    assert.equal(state.phase, 'revealed')
    assert.equal(send(state, 'OPEN', { instant: true }), state)
    state = send(state, 'CONTINUE', { instant: true })
  }
  assert.equal(state.phase, 'completed')
})

test('la dedicatoria conserva cuatro párrafos y no se mezcla con los 13 mensajes', () => {
  const brief = readFileSync(new URL('../docs/PROJECT_BRIEF.md', import.meta.url), 'utf8').replace(/\r\n/g, '\n')
  const block = brief.slice(brief.indexOf('Y bueno, llegaste al último sobre jajaja.'), brief.indexOf('\n\n## 9. Música'))
  assert.equal(block.split('\n\n').length, 4)
  assert.ok(block.endsWith('razones para sonreír. 🤍'))
  assert.ok(!JSON.stringify(messages).includes('Y bueno, llegaste'))
})
