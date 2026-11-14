import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { MessageExperience } from './components/MessageExperience'
import { Welcome } from './components/Welcome'
import { MusicPlayer } from './components/MusicPlayer'
import { useBackgroundMusic } from './hooks/useBackgroundMusic'
import { audioConfig } from './config/audio'

export default function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasRestarted, setHasRestarted] = useState(false)
  const { status, controller, audioRef } = useBackgroundMusic()
  const reduceMotion = useReducedMotion()

  const start = () => {
    void controller.startFromInteraction()
    setHasStarted(true)
  }
  const restart = () => {
    setHasRestarted(true)
    setHasStarted(false)
  }

  return (
    <div className="gift-page flex min-h-dvh flex-col">
      {audioConfig.src && <audio ref={audioRef} preload="none" hidden aria-hidden="true" />}
      <header className="page-header mx-auto flex w-full items-center justify-between gap-4">
        <span className="brand-label flex items-center gap-2">
          <span className="brand-flower" aria-hidden="true">✳</span>
          un pequeño detalle
        </span>
        <span className="date-label">viernes <span className="date-number">13</span></span>
      </header>

      <div className="music-bar mx-auto flex w-full justify-end px-5">
        <MusicPlayer status={status} controller={controller} />
      </div>

      <main className="main-content flex flex-1 items-center justify-center px-5 py-8 sm:px-8 sm:py-12">
        <div className="letter-frame relative w-full">
          <span className="corner-mark corner-mark--top" aria-hidden="true" />
          <span className="corner-mark corner-mark--bottom" aria-hidden="true" />

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={hasStarted ? 'first-envelope' : 'welcome'}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
              transition={{ duration: reduceMotion ? 0 : 0.3, ease: 'easeOut' }}
            >
              {hasStarted ? (
                <MessageExperience onRestart={restart} />
              ) : (
                <Welcome onStart={start} isStarting={hasStarted} focusOnMount={hasRestarted} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

    </div>
  )
}
