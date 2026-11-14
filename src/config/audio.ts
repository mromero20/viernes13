/** Archivo local proporcionado por el usuario. Usar null para desactivar música. */
export const audioConfig: Readonly<{
  src: string | null
  initialVolume: number
}> = {
  src: '/audio/viernes-13.mp3',
  initialVolume: 0.25,
}
