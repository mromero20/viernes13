# Entrega del Prompt 2 — 13 sobres animados

Fecha: 13 de noviembre de 2026. **Estado: completo dentro del alcance del Prompt 2.**

## 1. Resumen de implementación

Se inspeccionaron el brief, la matriz de aceptación, el informe del Prompt 1 y
los componentes antes de modificar código. Se conservan el diseño y las
animaciones de `Welcome`, la configuración válida y el mismo repositorio.

Una sola aplicación responsive presenta los 13 mensajes aprobados en sobres
individuales. Cada sobre comienza cerrado; la tapa se abre, la carta sube
parcialmente, el texto aparece y se habilita la continuación. El último botón
lleva a un estado de recorrido completado, sin implementar todavía la dedicatoria.

La frase decorativa se reemplazó por la aprobada:
«No es la gran cosa, pero espero que te guste».

Los 13 mensajes se extrajeron literalmente de la sección 7 del brief, sin títulos
editoriales. La dedicatoria conserva sus cuatro párrafos originales y no se muestra
en esta etapa. Se comprobó su igualdad con el prompt maestro vigente.

## 2. Archivos creados

- `src/data/messages.ts`: los 13 mensajes aprobados con identificador y texto.
- `src/lib/experience.ts`: máquina de estados y rechazo de eventos inválidos/tardíos.
- `src/components/MessageExperience.tsx`: controlador, progreso y final provisional.
- `src/components/Envelope.tsx`: único sobre reutilizable, medición y foco.
- `src/components/EnvelopeFlap.tsx`: tapa animada.
- `src/components/Letter.tsx`: carta, elevación y aparición del texto.
- `src/components/MessageProgress.tsx`: indicador visual del recorrido.
- `tests/experience.test.mjs`: pruebas de contenido y navegación con Node Test Runner.
- `docs/PROMPT_2_STATUS.md`: este informe.

## 3. Archivos modificados y refactorizados

- `src/App.tsx`: integra `MessageExperience` conservando la bienvenida y la transición inicial.
- `src/styles.css`: refactoriza las capas del sobre y añade carta adaptable y controles.
- `package.json`: añade `npm test`, sin dependencias nuevas.
- `eslint.config.js`: incluye los archivos de pruebas en el lint con contexto Node.
- `README.md`: actualiza el estado y los comandos de validación.
- `docs/PROJECT_BRIEF.md`: actualiza el aviso de estado y documenta el alcance adicional, sin tocar las secciones 1–11.
- `docs/ACCEPTANCE_CRITERIA.md`: actualiza la evidencia del flujo y mantiene pendientes los criterios de otras etapas.
- `src/components/ClosedEnvelope.tsx`: retirado como parte de la refactorización justificada; su construcción CSS por capas se conserva y amplía en `Envelope.tsx`. No se mantienen dos sobres duplicados.

Sin cambios en `Welcome.tsx`, `src/main.tsx`, Vite/TypeScript/Netlify, la configuración
de audio ni `package-lock.json`. No se instalaron dependencias ni se cambiaron
ajustes de npm/SSL. No se hicieron commits, push ni despliegues.

## 4. Componentes y control central

`MessageExperience` mantiene un único índice y una fase:

```text
closed → opening → rising → revealing → revealed → closing
   ↑                                                   │
   └──────────────── siguiente mensaje ───────────────────┘
                                     mensaje 13 → completed
```

Cada evento incluye el índice al que pertenece. La función pura de transición
descarta acciones fuera de fase y callbacks de sobres anteriores. El índice solo
cambia al terminar la retirada del actual; React monta entonces un nuevo sobre
cerrado. No hay sobres simultáneos ni un selector para saltar mensajes.

`Envelope` coordina fondo, carta, bolsillo, tapa y sello; `Letter` y `EnvelopeFlap`
notifican el final de sus animaciones. `MessageProgress` se reutiliza durante todo
el recorrido. El estado `completed` es el punto de integración para el Prompt 3.

## 5. Animación y capas

1. Cerrado: sobre con sello y botón semántico transparente del tamaño del cuerpo.
2. Apertura: el sello se desvanece y la tapa gira 180° sobre su borde superior
   durante 0.55 s. Se reserva espacio para su giro.
3. Elevación: al terminar la tapa, la carta sube durante 0.85 s con desaceleración.
4. Revelación: el texto aparece con opacidad durante 0.25 s; solo entonces se
   habilita «Siguiente mensajito ♡».
5. Salida: la escena se desvanece durante 0.25 s; después se cambia el índice.

El fondo tiene z-index 1, la carta 2, el bolsillo 3 y la tapa cerrada/abriendo 4.
La tapa abierta pasa detrás de la carta. El sello y el disparador ocupan las capas
superiores solo mientras corresponde. El bolsillo nunca se retira al leer.

Con movimiento reducido, abrir y continuar cambian de estado inmediatamente.
El avance no depende de callbacks ni de temporizadores de animación en esa ruta.
También se conserva `MotionConfig reducedMotion="user"` a nivel raíz.

## 6. Mensajes largos y geometría

La carta contiene el texto real en flujo natural, sin duplicados para medirlo,
sin altura fija del texto, sin line-clamp y sin scroll interno. Un ResizeObserver
mide su altura y el ancho del conjunto, y adapta la altura total incluso al
cambiar de tamaño u orientación.

Se reserva al pie de la carta un tramo vacío proporcional al cuerpo del sobre.
La parte inferior de la carta queda a un 82 % de la altura del cuerpo desde su
borde superior; continúa detrás del bolsillo. El texto termina al menos unos
24 px antes del borde superior del cuerpo, evitando cualquier palabra tapada.
La carta se recorta únicamente durante su recorrido por el interior del sobre,
no en su posición final de lectura.

Tipografía de mensajes: 18 px en móvil y 19 px en pantallas mayores, interlineado
1.8. El mensaje 5 aumenta la altura de la página y se lee con scroll vertical
natural. El conjunto no se obliga a caber entero en la altura de un celular.

## 7. Pruebas automatizadas y funcionales

`npm test`: **5 pruebas aprobadas**, sin dependencias nuevas:

1. Igualdad literal de los 13 mensajes con el brief y orden 1–13.
2. Rechazo de avances o revelaciones antes de las fases correctas.
3. Recorrido exacto de 13 mensajes, eventos repetidos y callbacks obsoletos.
4. Recorrido completo con movimiento reducido sin callbacks de animación.
5. Registro de los cuatro párrafos de dedicatoria y ausencia de ellos en los mensajes de esta etapa.

Además se compararon literalmente los cuatro párrafos de dedicatoria con el
prompt maestro original vigente: sin cambios.

En el navegador integrado se realizó un recorrido real de 1 a 13, capturando el
texto de cada carta. Cada nuevo sobre se presentó cerrado y en el orden correcto.
Se probaron dobles clics al continuar del 5 y al abrir el 6: llegó únicamente al
6, no hubo apertura doble y no apareció continuar durante la fase de apertura.

Se comprobaron apertura con Enter y Espacio, continuación final con Espacio,
foco en el sobre nuevo y foco en el mensaje al terminar de revelarlo. El árbol
de accesibilidad ocultó el texto mientras el sobre estaba cerrado y lo expuso
al terminar la revelación. No hay aria-live que repita su anuncio durante las
animaciones. Esto no sustituye una prueba con lector de pantalla real.

El botón «Un último mensajito para ti ♡» respondió mostrando:
«Recorrido completado», «13 de 13 mensajitos ♡» y «Has abierto todos los sobres.».
No hay pantalla vacía ni dedicatoria implementada anticipadamente.

### Inspección visual y medidas del mensaje 5

Se observaron visualmente sobres cerrados y cartas abiertas en el navegador.
Se inspeccionó el mensaje 5 completo a 320 px y en escritorio, además de su vista
móvil a 390 px. En los seis tamaños solicitados se midieron los rectángulos del
texto, carta, cuerpo y bolsillo:

| Viewport | Ancho del documento | Texto | Texto sobre el bolsillo | Carta dentro del cuerpo |
| --- | --- | --- | --- | --- |
| 320 × 568 | 305 px | 18 px | Sí | Sí |
| 375 × 667 | 360 px | 18 px | Sí | Sí |
| 390 × 844 | 375 px | 18 px | Sí | Sí |
| 430 × 932 | 415 px | 18 px | Sí | Sí |
| 768 × 1024 | 753 px | 19 px | Sí | Sí |
| 1440 × 900 | 1425 px | 19 px | Sí | Sí |

La diferencia de 15 px corresponde a la barra vertical del navegador. En todos
los casos el texto quedó dentro del ancho de la carta y no hubo desbordamiento
horizontal. La altura del texto del mensaje 5 varió entre aproximadamente 292 y
518 px en móviles, confirmando la adaptación al contenido/ancho.

Contrastes calculados de los colores usados: texto de carta 10.47:1, texto de
botón 6.37:1 y texto secundario 5.88:1. Consola: sin errores ni advertencias
observados durante el recorrido. Vite respondió HTTP 200.

## 8. TypeScript, lint y build

| Comando | Resultado |
| --- | --- |
| `npm run typecheck` | Aprobado, salida 0 |
| `npm run lint` | Aprobado, salida 0; sin desactivar reglas |
| `npm test` | 5 aprobadas, 0 fallos |
| `npm run build` | Aprobado, salida 0; HTML, CSS y JS generados en dist |

La vista previa utilizó loopback fuera del aislamiento de red previamente
diagnosticado. El servidor temporal se detuvo al finalizar las comprobaciones.

## 9. Problemas encontrados y resueltos

- El sobre estático del Prompt 1 no tenía contenido ni navegación: se refactorizó
  en un único componente por capas, sin duplicarlo para cada mensaje.
- Una carta de altura uniforme comprometería el mensaje 5: se usa altura natural
  medida y una reserva inferior sin texto cubierta por el bolsillo.
- Los callbacks tardíos o clics dobles podrían cambiar el índice varias veces:
  se validan índice y fase centralmente, y los botones se bloquean al iniciar
  cada transición.
- Las rutas sin movimiento no deben esperar animaciones: tienen cambios de
  estado inmediatos comprobados mediante pruebas automatizadas.
- La frase decorativa anterior se sustituyó únicamente por la nueva aprobada.

## 10. Limitaciones pendientes

- No se dispuso de dispositivos Android/iPhone reales ni de pruebas en Safari.
  Las medidas corresponden al navegador integrado, no a certificación de dispositivos.
- El navegador disponible no expone emulación de prefers-reduced-motion. Se
  probó esa ruta en la máquina de estados y se revisó su integración con Motion,
  pero no se declara una prueba visual con la preferencia activada.
- Pendientes lector de pantalla real, zoom de texto al 200 % y rotación en dispositivos reales.
- No hay archivo musical autorizado; el audio continúa opcional y desactivado.
- Los avisos moderados de herramientas de lint registrados en Prompt 1 siguen
  como antecedente; no se volvió a consultar npm audit en esta etapa ni se
  forzaron cambios de dependencias.

## 11. Preparación para el Prompt 3

El estado `completed` está preparado para sustituir el cierre provisional por
la integración de la dedicatoria en la siguiente etapa. Los cuatro párrafos
aprobados permanecen en el brief y no se han modificado ni mostrado.

**No se avanzó al Prompt 3. No hay commit, push ni despliegue.**
