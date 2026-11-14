import { useEffect, useRef } from 'react'

type WelcomeProps = {
  onStart: () => void
  isStarting: boolean
  focusOnMount?: boolean
}

export function Welcome({ onStart, isStarting, focusOnMount = false }: WelcomeProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (focusOnMount) {
      buttonRef.current?.focus({ preventScroll: true })
      buttonRef.current?.scrollIntoView({ block: 'nearest', behavior: 'instant' })
    }
  }, [focusOnMount])

  return (
    <section className="welcome-scene text-center" aria-labelledby="welcome-title">
      <div className="botanical-mark mx-auto" aria-hidden="true">
        <svg viewBox="0 0 120 90" fill="none">
          <path d="M59 77C61 58 63 42 62 25M60 65C47 64 37 57 32 45M61 55C76 53 84 44 88 33" />
          <path d="M45 60C34 62 25 56 26 48C34 47 41 51 45 60ZM78 48C77 38 83 31 91 31C94 39 87 46 78 48Z" className="botanical-leaves" />
          <path d="M62 30C45 33 45 19 54 18C47 9 60 3 64 13C70 3 82 12 73 19C85 22 76 36 67 28C67 35 62 35 62 30Z" className="botanical-petals" />
          <circle cx="63" cy="22" r="3" className="botanical-center" />
          <path d="M24 22V30M20 26H28M95 61V69M91 65H99" className="botanical-sparkles" />
        </svg>
      </div>

      <p className="eyebrow">Una pequeña sorpresa</p>
      <h1 id="welcome-title" className="welcome-title">
        13 mensajitos{' '}
        <span className="block">para ti <span className="title-heart">♡</span></span>
      </h1>
      <p className="welcome-caption mx-auto">
        No es la gran cosa, pero espero que te guste
      </p>

      <div className="welcome-action">
        <button
          ref={buttonRef}
          type="button"
          className="primary-button inline-flex items-center justify-center gap-4"
          onClick={onStart}
          disabled={isStarting}
        >
          Tengo algo para ti
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M13 6L19 12L13 18" />
          </svg>
        </button>
      </div>

      <div className="welcome-signoff flex items-center justify-center gap-3" aria-hidden="true">
        <span /> <span>✧</span> <span />
      </div>
    </section>
  )
}
