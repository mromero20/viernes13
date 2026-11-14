import type { BackgroundMusic, MusicStatus } from '../lib/backgroundMusic'

export function MusicPlayer({ status, controller }: { status: MusicStatus; controller: BackgroundMusic }) {
  if (status === 'idle' || status === 'unavailable') return null
  if (status === 'error') return <p className="music-notice" role="status">La música no está disponible.</p>

  const canPause = status === 'playing' || status === 'loading'
  const label = canPause ? 'Pausar música' : status === 'blocked' ? 'Activar música' : 'Reanudar música'

  return (
    <div className="music-player">
      <button className="music-button inline-flex items-center justify-center gap-2" type="button" onClick={() => { void controller.toggleFromInteraction() }} aria-label={label} title={label}>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          {canPause ? <path d="M8 5V19M16 5V19" /> : <path d="M8 5L19 12L8 19V5Z" />}
        </svg>
        <span>{status === 'loading' ? 'Cargando música…' : canPause ? 'Música' : label}</span>
      </button>
      {status === 'blocked' && <span className="sr-only" role="status">El navegador pausó el inicio. Puedes activar la música con este botón.</span>}
    </div>
  )
}
