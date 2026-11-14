import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { motion } from 'motion/react'
import type { ExperienceAction, Phase } from '../lib/experience'
import { EnvelopeFlap } from './EnvelopeFlap'
import { Letter } from './Letter'

type EnvelopeProps = {
  number: number
  text: string
  phase: Phase
  reduceMotion: boolean
  onAction: (action: ExperienceAction['type']) => void
}

export function Envelope({ number, text, phase, reduceMotion, onAction }: EnvelopeProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const letterRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [size, setSize] = useState({ body: 160, letter: 320 })

  useLayoutEffect(() => {
    const viewport = viewportRef.current
    const letter = letterRef.current
    if (!viewport || !letter) return
    const measure = () => {
      const body = viewport.clientWidth / 1.55
      const height = letter.offsetHeight
      setSize(previous => previous.body === body && previous.letter === height
        ? previous : { body, letter: height })
    }
    const observer = new ResizeObserver(measure)
    observer.observe(viewport)
    observer.observe(letter)
    measure()
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    triggerRef.current?.focus({ preventScroll: true })
    triggerRef.current?.scrollIntoView({ block: 'nearest', behavior: 'instant' })
  }, [])

  useEffect(() => {
    if (phase !== 'revealed') return
    textRef.current?.focus({ preventScroll: true })
    textRef.current?.scrollIntoView({ block: 'nearest', behavior: 'instant' })
  }, [phase])

  // El 82 % del alto del cuerpo sigue cubriendo la parte inferior de la carta.
  const insideDepth = size.body * 0.82
  const closedHeight = size.body * 1.65 + 18
  const openHeight = Math.max(closedHeight, size.letter + size.body * 0.18 + 18)
  const style = { '--body-height': `${size.body}px` } as CSSProperties

  return (
    <div className="envelope-composition mx-auto" style={style}>
      <motion.div
        className="envelope-viewport"
        ref={viewportRef}
        data-phase={phase}
        initial={false}
        animate={{ height: phase === 'closed' ? closedHeight : openHeight }}
        transition={{ duration: reduceMotion ? 0 : 0.45, ease: 'easeInOut' }}
      >
        <span className="envelope-back" aria-hidden="true" />
        <Letter
          text={text}
          phase={phase}
          travel={Math.max(0, size.letter - insideDepth + 8)}
          measureRef={letterRef}
          textRef={textRef}
          reduceMotion={reduceMotion}
          onLifted={() => onAction('LETTER_LIFTED')}
          onRevealed={() => onAction('TEXT_REVEALED')}
        />
        <span className="envelope-pocket" aria-hidden="true" />
        <EnvelopeFlap phase={phase} reduceMotion={reduceMotion} onOpened={() => onAction('FLAP_OPENED')} />
        <motion.span
          className="envelope-seal"
          aria-hidden="true"
          initial={false}
          animate={{ opacity: phase === 'closed' ? 1 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.15 }}
        >♡</motion.span>
        <button
          className="envelope-trigger"
          ref={triggerRef}
          type="button"
          disabled={phase !== 'closed'}
          aria-label={`Abrir mensajito ${number} de 13`}
          aria-describedby="envelope-instruction"
          onClick={() => onAction('OPEN')}
        />
      </motion.div>
    </div>
  )
}
