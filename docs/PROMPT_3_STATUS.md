# Entrega del Prompt 3 — música, dedicatoria y reinicio

Fecha: 13 de noviembre de 2026. **Estado: completo dentro del alcance del Prompt 3.**

## 1. Resumen de implementación

Se revisaron el brief, la matriz de aceptación, los informes de Prompts 1 y 2,
App, Welcome, Envelope, la máquina de estados y las pruebas existentes antes de
editar. Se continuó sobre el mismo repositorio y se conservaron las capas y
animaciones del sobre, los 13 mensajes y la frase decorativa aprobada.

Se incorporaron el MP3 entregado por el usuario, música opcional con control
discreto, dedicatoria exacta tras el sobre 13 y «Volver a empezar». No se creó
un sistema de navegación paralelo ni se añadieron dependencias.

## 2. Archivos creados

- `public/audio/viernes-13.mp3`: copia exacta del archivo recibido del usuario.
- `src/lib/backgroundMusic.ts`: controlador de una instancia multimedia y su estado.
- `src/hooks/useBackgroundMusic.ts`: integración estable con React y el elemento raíz.
- `src/components/MusicPlayer.tsx`: controles accesibles según el estado real.
- `src/data/dedication.ts`: los cuatro párrafos extraídos literalmente del brief.
- `src/components/Dedication.tsx`: carta especial y botón de reinicio.
- `tests/backgroundMusic.test.mjs`: ocho pruebas de audio con un elemento simulado.
- `tests/dedication.test.mjs`: dos pruebas de contenido y acceso secuencial.
- `docs/PROMPT_3_STATUS.md`: este informe.

## 3. Archivos modificados

- `src/App.tsx`: mantiene el audio en la raíz, inicia play desde el evento real y permite reiniciar.
- `src/components/MessageExperience.tsx`: sustituye el cierre provisional por Dedication en el mismo estado completed.
- `src/components/Welcome.tsx`: añade foco al botón al volver; conserva textos, diseño y animaciones.
- `src/config/audio.ts`: configura `/audio/viernes-13.mp3` con volumen inicial 0.25; permite null.
- `src/styles.css`: añade tarjeta final, reinicio y barra musical en flujo normal.
- `tests/experience.test.mjs`: actualiza el nombre de una prueba histórica, conservando sus aserciones.
- `public/audio/README.md`: registra procedencia, hash y comportamiento del reproductor.
- `README.md`, `docs/PROJECT_BRIEF.md` y `docs/ACCEPTANCE_CRITERIA.md`: actualizan alcance, pruebas y pendientes.

Sin cambios en messages.ts, Envelope, Letter, EnvelopeFlap, la máquina de estados,
Vite/TypeScript, Netlify, package.json ni package-lock.json. No se eliminaron
pruebas, se desactivaron reglas ni se cambiaron ajustes de npm o SSL.

## 4. Arquitectura del reproductor musical

Un solo elemento HTML5 Audio permanece montado en App mientras la música está
configurada. No pertenece a un sobre ni a la dedicatoria y no se desmonta al
reiniciar el recorrido. El controlador es estable durante la vida de App;
useSyncExternalStore refleja playing, pause, waiting y error en los controles.

Antes del gesto inicial, el elemento no tiene src, permanece pausado en tiempo 0
y no hay controles. El manejador de «Tengo algo para ti» llama directamente a
startFromInteraction; dentro de esa misma pila de evento se asigna la fuente y
se invoca play(), sin await, efectos ni animaciones antes de la llamada.

Se configuran loop=true, preload="none" y volumen 0.25 con tolerancia a los
navegadores que gestionan el volumen solo mediante hardware. Pausar y reanudar
no cambian currentTime ni la fuente. Las promesas de play() se gestionan; un
identificador de solicitud invalida resultados tardíos tras pausar o desmontar.
Solo el desmontaje de App libera la fuente y los listeners.

### Procedencia y comprobación del MP3

El usuario aportó «Marcos Menchaca - Viernes 13 - (original Kbps).mp3» desde la
ruta indicada en su mensaje. Se copió byte por byte al nombre previsto por el
proyecto, sin tocar el original ni descargar, extraer o generar música.

- Tamaño: 3 407 499 bytes.
- SHA256 original/public/dist: `8dc5fb7912f143a6e73254a83999905178e14a3438fa12bfd80b818e27a34113`.
- El servidor respondió HTTP 200, tipo audio/mpeg y Content-Length correcto.
- El navegador reconoció una duración aproximada de 177.354 segundos.

La procedencia del archivo queda registrada; no se inventa una licencia de
terceros. No se realizó publicación, commit, push ni despliegue.

## 5. Audio ausente, bloqueado o con error

- Configuración src:null: no se monta audio, no se solicita un archivo y no hay controles.
- NotAllowedError de play(): estado blocked y botón «Activar música» para un nuevo gesto.
- Error de carga, formato no soportado o fallo no recuperable: se retira el control y se informa discretamente que la música no está disponible; los sobres siguen funcionando.
- Pausa mientras una promesa sigue pendiente: se invalida el resultado y no se reanuda contra la preferencia de la usuaria.
- Pausas y esperas del sistema: los eventos actualizan el estado; la interfaz no afirma reproducción si el elemento está pausado.

El fallo de música nunca condiciona el índice o la fase de los sobres. No hay
autoplay al cargar la página ni reintentos en bucle sin interacción.

## 6. Dedicatoria final

El último botón aprobado continúa usando la transición revealed → closing →
completed de la máquina existente. Solo el estado completed monta Dedication.
Los eventos repetidos u obsoletos mantienen las protecciones del Prompt 2.

La tarjeta final tiene fondo crema, bordes suaves, un brillo decorativo y los
cuatro párrafos originales. El título reutiliza «Un último mensajito para ti ♡»;
no se añadió despedida ni contenido al texto aprobado. Los párrafos se extraen
del brief y se comparan literalmente en las pruebas.

La aparición usa opacidad y desplazamiento de 12 px durante 0.45 s; con movimiento
reducido se presenta inmediatamente. La lectura permanece estable. El título
recibe el foco al entrar, sin aria-live que duplique los anuncios. El texto usa
16 px en móvil y 17 px en pantallas mayores, con desplazamiento vertical natural.

## 7. Funcionamiento del reinicio

«Volver a empezar» cambia el estado de App a bienvenida. Se desmonta el recorrido
anterior y al comenzar de nuevo se crea su estado inicial: índice 0, fase closed.
El foco vuelve a «Tengo algo para ti» y el siguiente inicio presenta el sobre 1.

La música continúa si estaba sonando; si se pausó manualmente, sigue pausada al
volver a empezar y al pulsar otra vez el botón inicial. El tiempo de reproducción
se conserva. Solo la acción explícita «Reanudar música» revierte esa pausa.

## 8. Pruebas ejecutadas

### Automatizadas

**15 pruebas aprobadas, cero fallos**: las cinco anteriores permanecen, más ocho
casos de audio y dos de dedicatoria/acceso final.

Audio: ausencia de fuente, llamada síncrona a play, una instancia, continuidad del
tiempo, pausa persistente al reiniciar, reanudación, rechazo NotAllowedError y
reintento, formato no soportado, error de red, resolución tardía, eventos del
sistema y limpieza de recursos. Los errores se simulan con un elemento multimedia
de prueba; no se afirma haber forzado las políticas del navegador real.

Contenido: los 13 mensajes y los cuatro párrafos coinciden literalmente con el
brief. Las secciones 1–11 del brief también se compararon con el prompt maestro
vigente y se mantienen intactas.

### Navegador real integrado

- Antes de iniciar: un elemento de audio sin src, pausado en 0, sin controles ni dedicatoria.
- Tras el gesto: reproducción real del MP3 y duración reconocida; pausa por clic y reanudación con Enter.
- Recorrido completo 1–13. Un solo elemento de audio en todas las lecturas; las pausas se mantuvieron entre sobres.
- En la parte reproducida sin pausa, currentTime avanzó aproximadamente de 20.397 a 39.957 s entre los sobres 5–13, y a 54.450 s en la dedicatoria, sin reinicio de pista.
- El mensaje 5 a 320 px conservó texto completo sobre el bolsillo y carta parcialmente dentro. Se mantuvo literalmente la frase decorativa aprobada.
- Continuación final con Espacio: cuatro párrafos exactos, foco en dedication-title y ningún sobre restante.
- Pausa en la dedicatoria y reinicio con Enter: regreso a bienvenida, foco en el botón inicial, un solo audio pausado en el mismo tiempo (aprox. 54.658 s). Al comenzar otra vez apareció el sobre 1 cerrado y la pausa se conservó.
- Audio ausente simulado temporalmente con src:null: recorrido desde bienvenida por los 13 mensajes hasta la dedicatoria, sin elementos de audio ni controles y sin errores observados. Se restauró después la ruta real del MP3.
- Configuración final restaurada y página recargada: un elemento de audio sin src, pausado en 0, sin autoplay ni controles antes de iniciar.

### Dedicatoria responsive

Se inspeccionó visualmente la tarjeta en los seis tamaños solicitados y se
midieron sus párrafos y controles. En todos los casos los cuatro párrafos cabían
dentro de la tarjeta, sin recortes horizontales ni superposición con la música.

| Viewport | Ancho de documento observado | Texto | Música / reinicio | Solapamiento |
| --- | --- | --- | --- | --- |
| 320 × 568 | 320 px | 16 px | 44 / 48 px | Ninguno |
| 375 × 667 | 360 px | 16 px | 44 / 48 px | Ninguno |
| 390 × 844 | 375 px | 16 px | 44 / 48 px | Ninguno |
| 430 × 932 | 415 px | 16 px | 44 / 48 px | Ninguno |
| 768 × 1024 | 768 px | 17 px | 44 / 48 px | Ninguno |
| 1440 × 900 | 1425 px | 17 px | 44 / 48 px | Ninguno |

Las diferencias de ancho corresponden a la barra vertical del navegador. Se
permite scroll de página y no se usa una altura fija para comprimir la dedicatoria.
Consola del recorrido sin música: sin errores ni advertencias observados.

## 9. Resultados técnicos

| Comando o comprobación | Resultado |
| --- | --- |
| npm run typecheck | Aprobado, salida 0 |
| npm run lint | Aprobado, salida 0, sin desactivar reglas |
| npm test | 15 aprobadas, 0 fallos |
| npm run build | Aprobado, salida 0; HTML/CSS/JS y MP3 en dist |
| HTTP de página y MP3 | 200; MP3 servido como audio/mpeg |
| Hash del MP3 en el build | Idéntico al original aportado |

No fue necesario instalar dependencias ni modificar el archivo de bloqueo.
La vista previa usó loopback fuera del aislamiento de red ya diagnosticado.
El servidor temporal se detuvo al cerrar la validación.

## 10. Problemas encontrados y corregidos

- La lectura de una referencia de React dentro de una fábrica inicial fue
  rechazada por ESLint: se sustituyó por un callback ref ejecutado al montar el
  elemento. Se corrigió la arquitectura sin desactivar la regla.
- El cierre provisional no mostraba la dedicatoria: se integró en completed,
  conservando la navegación existente y sus protecciones.
- Un reinicio podría reproducir contra una pausa anterior: la preferencia vive
  en el controlador raíz y se respeta al empezar otro recorrido.
- Una promesa tardía podría reactivar música tras pausar: las solicitudes quedan
  invalidadas y los eventos de reproducción respetan la pausa manual.
- Los controles musicales podían competir por espacio en el encabezado pequeño:
  se colocaron en una fila propia, en flujo normal, sin posición flotante sobre cartas.

## 11. Limitaciones pendientes

- Sin dispositivos Android/iPhone físicos ni Safari real disponibles. Las pruebas
  visuales corresponden al navegador integrado.
- Preferencia de movimiento reducido revisada en código y ruta del recorrido
  comprobada automáticamente; no activada visualmente por falta de esa capacidad
  en el navegador disponible. Pendientes lector de pantalla real y zoom de texto al 200 %.
- Rechazo de play y errores de medios simulados automáticamente; no se forzó un
  bloqueo real del navegador ni se escuchó un ciclo completo del bucle de 177 s.
- El volumen puede quedar bajo control del sistema en algunos navegadores móviles.
- Los avisos de dependencias de desarrollo registrados en Prompt 1 no se
  reconsultaron ni se corrigieron mediante cambios forzados en esta etapa.

## 12. Preparación para el Prompt 4

La experiencia completa —bienvenida, 13 sobres, música, dedicatoria y reinicio—
está implementada y validada dentro de los límites indicados. El MP3 ya forma
parte del resultado estático local. El Prompt 4 puede continuar desde esta base.

**No se avanzó al Prompt 4. No hay commit, push ni despliegue.**
