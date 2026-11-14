import { motion } from 'motion/react'
import type { Phase } from '../lib/experience'

type EnvelopeFlapProps = {
  phase: Phase
  onOpened: () => void
  reduceMotion: boolean
}

export function EnvelopeFlap({ phase, onOpened, reduceMotion }: EnvelopeFlapProps) {
  return (
    <motion.span
      className="envelope-flap"
      aria-hidden="true"
      style={{ zIndex: phase === 'closed' || phase === 'opening' ? 4 : 0 }}
      initial={false}
      animate={{ rotateX: phase === 'closed' ? 0 : 180 }}
      transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.4, 0, 0.2, 1] }}
      onAnimationComplete={() => { if (phase === 'opening') onOpened() }}
    />
  )
}
