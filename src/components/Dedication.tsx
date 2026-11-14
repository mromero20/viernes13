import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { dedication } from '../data/dedication'

export function Dedication({ onRestart }: { onRestart: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true })
    headingRef.current?.scrollIntoView({ block: 'start', behavior: 'instant' })
  }, [])

  return (
    <motion.section
      className="dedication-scene"
      aria-labelledby="dedication-title"
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.45, ease: 'easeOut' }}
    >
      <div className="dedication-card">
        <span className="dedication-ornament" aria-hidden="true">✧</span>
        <h1 id="dedication-title" ref={headingRef} tabIndex={-1}>Un último mensajito para ti ♡</h1>
        <div className="dedication-copy">
          {dedication.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div>
      <div className="restart-action text-center">
        <button type="button" className="restart-button" onClick={onRestart}>Volver a empezar</button>
      </div>
    </motion.section>
  )
}
