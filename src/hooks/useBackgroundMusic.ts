import { useEffect, useState, useSyncExternalStore } from 'react'
import { audioConfig } from '../config/audio'
import { createBackgroundMusic } from '../lib/backgroundMusic'

export function useBackgroundMusic() {
  const [{ controller, attachAudio }] = useState(() => {
    // El callback ref se ejecuta al montar el elemento, nunca durante el render.
    let element: HTMLAudioElement | null = null
    return {
      controller: createBackgroundMusic(audioConfig, () => {
        if (!element) throw new Error('No está disponible el elemento de audio.')
        return element
      }),
      attachAudio: (next: HTMLAudioElement | null) => { element = next },
    }
  })
  const status = useSyncExternalStore(controller.subscribe, controller.getSnapshot)

  useEffect(() => () => controller.dispose(), [controller])

  return { status, controller, audioRef: attachAudio }
}
