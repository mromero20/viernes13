import { motion } from 'motion/react'
import type { RefObject } from 'react'
import type { Phase } from '../lib/experience'

type LetterProps = {
  text: string
  phase: Phase
  travel: number
  measureRef: RefObject<HTMLDivElement | null>
  textRef: RefObject<HTMLParagraphElement | null>
  reduceMotion: boolean
  onLifted: () => void
  onRevealed: () => void
}

export function Letter({ text, phase, travel, measureRef, textRef, reduceMotion, onLifted, onRevealed }: LetterProps) {
  const isInside = phase === 'closed' || phase === 'opening'
  const showText = phase === 'revealing' || phase === 'revealed' || phase === 'closing'

  return (
    <motion.div
      className="letter"
      ref={measureRef}
      initial={false}
      animate={{ y: isInside ? travel : 0 }}
      transition={{ duration: reduceMotion || isInside ? 0 : 0.85, ease: [0.22, 0.61, 0.36, 1] }}
      onAnimationComplete={() => { if (phase === 'rising') onLifted() }}
      aria-hidden={phase !== 'revealed'}
    >
      <span className="letter-ornament" aria-hidden="true">✧</span>
      <motion.p
        className="letter-message"
        ref={textRef}
        tabIndex={-1}
        initial={false}
        animate={{ opacity: showText ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.25 }}
        onAnimationComplete={() => { if (phase === 'revealing') onRevealed() }}
      >
        {text}
      </motion.p>
    </motion.div>
  )
}
