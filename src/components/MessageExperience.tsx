import { useReducer } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { messages } from '../data/messages'
import { initialExperience, transitionExperience } from '../lib/experience'
import type { ExperienceAction, ExperienceState } from '../lib/experience'
import { Envelope } from './Envelope'
import { MessageProgress } from './MessageProgress'
import { Dedication } from './Dedication'

function experienceReducer(state: ExperienceState, action: ExperienceAction) {
  return transitionExperience(state, action, messages.length)
}

export function MessageExperience({ onRestart }: { onRestart: () => void }) {
  const [state, dispatch] = useReducer(experienceReducer, initialExperience)
  const reduceMotion = Boolean(useReducedMotion())
  const message = messages[state.index]
  if (!message) throw new Error('El índice del mensaje está fuera del recorrido aprobado.')

  if (state.phase === 'completed') return <Dedication onRestart={onRestart} />

  const act = (type: ExperienceAction['type']) => {
    dispatch({ type, index: state.index, instant: reduceMotion })
  }

  return (
    <motion.section
      key={message.id}
      className="envelope-scene text-center"
      aria-labelledby="envelope-title"
      data-message={message.id}
      data-phase={state.phase}
      initial={{ opacity: 0 }}
      animate={{ opacity: state.phase === 'closing' ? 0 : 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.25 }}
      onAnimationComplete={() => { if (state.phase === 'closing') act('EXITED') }}
    >
      <p className="eyebrow">Un pequeño recordatorio</p>
      <h1 id="envelope-title" className="envelope-title">Mensajito {message.id} de {messages.length}</h1>

      <Envelope number={message.id} text={message.text} phase={state.phase} reduceMotion={reduceMotion} onAction={act} />

      <div className="envelope-actions">
        {state.phase === 'revealed' || state.phase === 'closing' ? (
          <button className="primary-button" type="button" disabled={state.phase !== 'revealed'} onClick={() => act('CONTINUE')}>
            {message.id === messages.length ? 'Un último mensajito para ti ♡' : 'Siguiente mensajito ♡'}
          </button>
        ) : (
          <p className="envelope-instruction" id="envelope-instruction">
            {state.phase === 'closed' ? 'Toca el sobre para abrirlo' : 'Abriendo tu mensajito…'}
          </p>
        )}
      </div>
      <MessageProgress current={message.id} total={messages.length} />
    </motion.section>
  )
}
