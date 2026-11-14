export type MusicStatus = 'unavailable' | 'idle' | 'loading' | 'playing' | 'paused' | 'blocked' | 'error'
type MusicConfig = Readonly<{ src: string | null; initialVolume: number }>
type MusicElement = Pick<HTMLAudioElement,
  'src' | 'preload' | 'loop' | 'volume' | 'paused' | 'play' | 'pause' | 'load' |
  'addEventListener' | 'removeEventListener' | 'removeAttribute'>

/** No crea Audio ni solicita recursos hasta recibir una interacción real. */
export function createBackgroundMusic(config: MusicConfig, factory: () => MusicElement = () => new Audio()) {
  let audio: MusicElement | null = null
  let status: MusicStatus = config.src ? 'idle' : 'unavailable'
  let manuallyPaused = false
  let inFlight = false
  let request = 0
  const subscribers = new Set<() => void>()

  const publish = (next: MusicStatus) => {
    if (status === next) return
    status = next
    subscribers.forEach(notify => notify())
  }
  const onPlaying = () => {
    if (manuallyPaused || status === 'error') { audio?.pause(); return }
    publish('playing')
  }
  const onPause = () => {
    if (status !== 'error' && status !== 'unavailable') publish('paused')
  }
  const onWaiting = () => {
    if (!manuallyPaused && (status === 'playing' || status === 'loading')) publish('loading')
  }
  const onError = () => {
    request++
    inFlight = false
    publish('error')
    audio?.pause()
  }
  const listeners = { playing: onPlaying, pause: onPause, waiting: onWaiting, error: onError }

  const getAudio = () => {
    if (!audio) {
      audio = factory()
      audio.preload = 'none'
      audio.loop = true
      // Algunos navegadores móviles gestionan el volumen exclusivamente por hardware.
      try { audio.volume = Math.max(0, Math.min(1, config.initialVolume)) } catch { /* Conservar el volumen del sistema. */ }
      for (const [event, listener] of Object.entries(listeners)) audio.addEventListener(event, listener)
      audio.src = config.src ?? ''
    }
    return audio
  }

  const playFromInteraction = (): Promise<void> => {
    if (!config.src || manuallyPaused || status === 'error' || status === 'playing' || inFlight) return Promise.resolve()
    const currentRequest = ++request
    const reject = (error: unknown) => {
      if (request !== currentRequest) return
      const name = typeof error === 'object' && error !== null && 'name' in error ? error.name : ''
      if (name === 'NotAllowedError') publish('blocked')
      else if (name === 'AbortError') publish('paused')
      else onError()
    }
    try {
      const element = getAudio()
      inFlight = true
      publish('loading')
      // Esta llamada es síncrona: nunca se difiere a un efecto ni a una animación.
      const result = element.play()
      return Promise.resolve(result).then(() => {
        if (request === currentRequest && !manuallyPaused && status !== 'error') {
          publish(element.paused ? 'paused' : 'playing')
        }
      }, reject).finally(() => { if (request === currentRequest) inFlight = false })
    } catch (error) {
      inFlight = false
      reject(error)
      return Promise.resolve()
    }
  }

  return {
    getSnapshot: () => status,
    subscribe: (notify: () => void) => {
      subscribers.add(notify)
      return () => { subscribers.delete(notify) }
    },
    startFromInteraction: playFromInteraction,
    toggleFromInteraction: (): Promise<void> => {
      if (status === 'playing' || status === 'loading' || inFlight) {
        manuallyPaused = true
        request++
        inFlight = false
        audio?.pause()
        publish('paused')
        return Promise.resolve()
      }
      manuallyPaused = false
      return playFromInteraction()
    },
    dispose: () => {
      request++
      inFlight = false
      if (audio) {
        for (const [event, listener] of Object.entries(listeners)) audio.removeEventListener(event, listener)
        audio.pause()
        audio.removeAttribute('src')
        audio.load()
        audio = null
      }
      publish(config.src ? 'idle' : 'unavailable')
    },
  }
}

export type BackgroundMusic = ReturnType<typeof createBackgroundMusic>
