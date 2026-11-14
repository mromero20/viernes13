import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { dedication } from '../src/data/dedication.ts'
import { messages } from '../src/data/messages.ts'
import { initialExperience, transitionExperience } from '../src/lib/experience.ts'

test('los cuatro párrafos de dedicatoria son idénticos al brief, incluidos emoji y puntuación', () => {
  const brief = readFileSync(new URL('../docs/PROJECT_BRIEF.md', import.meta.url), 'utf8').replace(/\r\n/g, '\n')
  const block = brief.slice(brief.indexOf('Y bueno, llegaste al último sobre jajaja.'), brief.indexOf('\n\n## 9. Música'))
  assert.equal(dedication.length, 4)
  assert.deepEqual([...dedication], block.split('\n\n'))
})

test('completed solo se alcanza después de leer los 13; eventos duplicados no saltan al final', () => {
  let state = initialExperience
  for (let i = 0; i < messages.length; i++) {
    assert.equal(state.phase, 'closed')
    assert.equal(transitionExperience(state, { type: 'CONTINUE', index: i }, 13), state)
    state = transitionExperience(state, { type: 'OPEN', index: i, instant: true }, 13)
    assert.equal(state.phase, 'revealed')
    state = transitionExperience(state, { type: 'CONTINUE', index: i, instant: true }, 13)
    const duplicated = transitionExperience(state, { type: 'CONTINUE', index: i, instant: true }, 13)
    assert.equal(duplicated, state)
    assert.equal(state.phase === 'completed', i === 12)
  }
  // Un recorrido nuevo usa el mismo estado inicial sin alterar el anterior.
  const restarted = { ...initialExperience }
  assert.deepEqual(restarted, { index: 0, phase: 'closed' })
  assert.equal(state.phase, 'completed')
})
