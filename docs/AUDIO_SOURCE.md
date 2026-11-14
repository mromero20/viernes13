# Música de fondo local

`viernes-13.mp3` es el archivo entregado por el usuario para integrarlo en esta
experiencia. Se copió sin modificar, convertir ni extraer audio desde YouTube.

- Nombre recibido: Marcos Menchaca - Viernes 13 - (original Kbps).mp3.
- Procedencia: archivo local adjuntado por el usuario en esta conversación.
- Tamaño: 3 407 499 bytes.
- SHA256: `8dc5fb7912f143a6e73254a83999905178e14a3438fa12bfd80b818e27a34113`.
- Ruta pública: `/audio/viernes-13.mp3`, configurada en `src/config/audio.ts`.
- No se ha publicado el archivo ni se ha realizado un despliegue.

El 13 de noviembre de 2026, durante el Prompt 4, el usuario confirmó expresamente
que cuenta con autorización del titular para publicar este MP3 en una web pública.
Por ello, la versión de producción preparada incluye el archivo.

La entrega del archivo por el usuario documenta la procedencia para esta tarea;
no se añade una licencia de distribución inventada ni se acredita una licencia
de terceros que no haya sido aportada.

El único elemento HTML5 Audio vive en App y se mantiene al pasar entre sobres,
dedicatoria y bienvenida. Tiene preload="none", bucle y volumen inicial 0.25 si
el navegador permite ajustarlo. La fuente y play() se activan desde el evento
real de «Tengo algo para ti», no al cargar la página.

Para desactivar la música, usar `src: null` en la configuración: no se monta audio
ni se muestran controles. Si una ruta configurada falla, la navegación continúa
y se retira el control; si play() es bloqueado por el navegador, aparece
«Activar música» para reintentar mediante otro gesto.

Al reiniciar el recorrido se conserva el tiempo y la preferencia de pausa. No se
crea otro reproductor ni se vuelve al inicio de la canción. La recarga completa
de página inicia una sesión nueva sin autoplay.
