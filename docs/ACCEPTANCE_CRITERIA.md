# Criterios de aceptación — 13 mensajitos para ti ♡

Fecha: 13 de noviembre de 2026.

El estado vigente se detalla en [PROMPT_4_STATUS.md](./PROMPT_4_STATUS.md): QA local y preparación de producción, sin despliegue. Los informes anteriores conservan el registro histórico de sus etapas. Las filas DOC registran la entrega documental anterior.

La fuente de verdad es [PROJECT_BRIEF.md](./PROJECT_BRIEF.md), especialmente sus secciones 7 y 8 para el contenido aprobado. Esta matriz distingue la documentación terminada de las funciones aún pendientes. «Documentado» no equivale a «implementado».

## Entrega documental inicial (registro histórico)

| ID | Criterio | Comprobación | Estado |
| --- | --- | --- | --- |
| DOC-01 | Inspeccionar el mismo repositorio sin sobrescribir avances. | Revisar rama, remoto, archivos y estado de Git; registrar hallazgos en el brief. | Verificado |
| DOC-02 | Registrar todos los requisitos vigentes. | Comparar literalmente las secciones 1–11 del prompt nuevo con el brief. | Verificado |
| DOC-03 | Conservar los 13 mensajes definitivos sin cambios. | Comparación literal, incluidos puntuación y emojis, con orden 1–13 y sin omisiones. | Verificado |
| DOC-04 | Conservar la dedicatoria exacta y sus párrafos. | Comparar los cuatro párrafos literalmente con el prompt vigente. | Verificado |
| DOC-05 | Establecer una fuente de verdad y criterios verificables. | Existencia de ambos documentos, referencias cruzadas y requisitos pendientes identificados. | Verificado |
| DOC-06 | No implementar pantallas en esta etapa. | Revisar el alcance del cambio: solo se añaden estos documentos; App sigue retornando null. | Verificado |
| DOC-07 | Informar el estado real sin publicar. | Registrar instalación fallida y validación técnica pendiente; sin commit, push ni despliegue. | Verificado |

## Preparación técnica — estado tras el Prompt 1

| ID | Criterio | Evidencia necesaria | Estado |
| --- | --- | --- | --- |
| BASE-01 | React + TypeScript + Vite, Tailwind y paquete motion instalados. | Dependencias declaradas y archivo de bloqueo. Instalación correcta; npm ci queda como comprobación futura de instalación limpia. | Instalado y bloqueado; npm ci no ejecutado |
| BASE-02 | Base compilable. | npm run typecheck y npm run build terminan sin errores; dist contiene index.html y recursos válidos. | Verificado; lint también correcto |
| BASE-03 | HTML5 Audio preparado para archivo opcional autorizado. | Configuración sin ruta por defecto y documentación de integración sin solicitudes a archivos inexistentes. | Implementado; audio raíz opcional, configuración null probada y MP3 entregado por el usuario integrado |
| BASE-04 | Un único frontend, sin infraestructura fuera del alcance. | Revisar estructura y dependencias: sin backend, base de datos, autenticación, React Native, Flutter ni servicios de pago. | Decisión documentada; revisar al implementar |
| BASE-05 | Mantener el repositorio Git/GitHub existente. | Revisar origin y cambios locales; no crear otro proyecto ni sobrescribir trabajo. | Remoto local verificado; futuros cambios pendientes |

## Flujo del producto

| ID | Criterio | Cómo se aceptará | Estado |
| --- | --- | --- | --- |
| UX-01 | Bienvenida con título, frase aprobada y botón exactos. | Mostrar «13 mensajitos para ti ♡», «No es la gran cosa, pero espero que te guste» y «Tengo algo para ti»; cotejar con brief §4 y §19. | Verificado: textos exactos, revisión móvil/escritorio y cuatro validaciones aprobadas |
| UX-02 | Inicio por interacción explícita. | Antes de pulsar no hay sobres ni música; al pulsar empieza el sobre 1 cerrado y se intenta audio solo si está configurado. | Verificado: el gesto inicia sobre 1 y solicita play directamente; sin autoplay previo |
| UX-03 | Un único sobre cerrado al entrar a cada mensaje. | Recorrer toda la experiencia; nunca hay galería ni dos sobres visibles. En la retirada, desmontar el anterior antes de mostrar el siguiente. | Verificado: recorrido 1–13 en navegador; un sobre montado por vez |
| UX-04 | Progreso claro y correcto. | Mostrar «Mensajito 1 de 13» al principio y actualizar de uno en uno hasta «Mensajito 13 de 13». | Verificado: 1–13 en orden en navegador |
| UX-05 | Apertura con orden definido. | Tocar o activar por teclado: abre tapa, luego asciende parcialmente la carta y finalmente se revela el mensaje. | Verificado: tapa, elevación y revelación secuenciales |
| UX-06 | Carta siempre parcialmente dentro del sobre. | Observar apertura, lectura y retirada en móvil y escritorio: el bolsillo frontal cubre una parte inferior de la carta y esta nunca sale por completo. | Verificado: capas y solapamiento; mensaje 5 medido en los seis tamaños del Prompt 2 |
| UX-07 | Mensaje sobre la carta. | Todo el texto aparece en su zona visible, sin cuadro externo que sustituya la carta. | Verificado: texto dentro de la carta, sin modal ni tarjeta externa |
| UX-08 | Continuación con texto exacto y sin saltos. | «Siguiente mensajito ♡» se habilita tras la revelación; cada activación válida avanza exactamente un mensaje. Probar doble toque y Enter repetido durante transiciones. | Verificado: botón tras revelación, dobles clics y callbacks tardíos; último botón específico |
| UX-09 | Cada sobre nuevo empieza cerrado. | Avanzar del 1 al 13, comprobando retirada del anterior y reinicio de tapa/carta. | Verificado: los 13 empiezan cerrados |
| UX-10 | Dedicatoria bloqueada hasta terminar el 13. | Sin acceso anticipado; el botón «Un último mensajito para ti ♡» del sobre 13 lleva a la tarjeta especial, según Prompt 3. | Verificado: la dedicatoria solo se monta en completed tras el sobre 13 |
| UX-11 | Revelación final mediante botón. | Solo al pulsar ese botón se muestra la dedicatoria completa con cuatro párrafos exactos. | Verificado: tarjeta final con cuatro párrafos exactos y control de reinicio |
| UX-12 | Contenido definitivo íntegro. | Comparar lo renderizado en cada paso con brief §7 y §8, incluidos orden, puntuación y 🤍; no mostrar las etiquetas editoriales como parte de la frase. | 13 mensajes y cuatro párrafos verificados literalmente; recorrido completo con y sin música |

## Diseño, legibilidad y accesibilidad

| ID | Criterio | Cómo se aceptará | Estado |
| --- | --- | --- | --- |
| UI-01 | Estética cálida y adulta, tono de amistad. | Revisar crema, rosa, lila y blanco, acentos con contraste, bordes redondeados, sombras y decoración discreta; sin exceso romántico, infantil o genérico. | Inspección visual realizada manteniendo el estilo del Prompt 1 |
| UI-02 | Todos los mensajes caben completos. | Recorrer los 13, especialmente el 5; ninguna palabra queda tapada por el bolsillo ni recortada. Medidas adaptables al contenido, sin texto excesivamente pequeño. | Verificado en recorrido completo; mensaje 5 inspeccionado y medido sin recortes |
| UI-03 | Carta adaptable y desplazamiento natural. | Con mensaje 5 y zoom de texto al 200 %, permitir scroll vertical de página manteniendo la parte inferior de carta dentro del sobre, sin scroll interno obligatorio del mensaje. | Altura adaptable y scroll natural verificados; zoom al 200 % pendiente |
| UI-04 | Sin desbordamiento horizontal. | En los tamaños indicados abajo, comprobar ancho del documento frente al viewport; no esconder contenido con overflow-x para aprobar. | Verificado en build de producción: cuatro estados en seis resoluciones, sin desbordamiento |
| UI-05 | Una experiencia responsive para todos los dispositivos. | Revisar móviles pequeños, Android, iPhone, tablet, laptop y escritorio; mismo frontend y orden de contenido. | Una base responsive y seis viewports comprobados; dispositivos físicos pendientes |
| A11Y-01 | Acceso completo por teclado. | Recorrer de bienvenida a dedicatoria con Tab, Shift+Tab, Enter y Espacio; foco visible, sin trampas ni saltos involuntarios. | Pendiente |
| A11Y-02 | Controles táctiles cómodos. | Comprobar objetivos de al menos 44 × 44 px y separación suficiente; sin depender de hover. | Pendiente |
| A11Y-03 | Información accesible. | Con lector de pantalla, comprobar nombre del sobre/botones, progreso y nuevo contenido; decoraciones ocultas y foco lógico en cada etapa. | Pendiente |
| A11Y-04 | Contraste y tamaño de letra legibles. | Comprobar contraste de texto normal mínimo 4.5:1, texto grande 3:1 y controles/foco 3:1; cuerpo de texto con objetivo de 16 px o más. | Pendiente |
| A11Y-05 | Respeto a prefers-reduced-motion. | Activar la preferencia: sin traslaciones/giros significativos ni esperas artificiales, mismo contenido y secuencia; continuar sigue disponible. Revisar Motion y CSS. | Pendiente |

## Música opcional

| ID | Criterio | Cómo se aceptará | Estado |
| --- | --- | --- | --- |
| AUDIO-01 | Sin archivo, experiencia íntegra en silencio. | Con src: null, llegar hasta la dedicatoria sin errores, solicitudes de audio ni controles engañosos. | Build temporal src:null y recorrido completo por teclado verificados; MP3 restaurado en build final |
| AUDIO-02 | Solo archivo local autorizado. | Verificar procedencia y permiso de uso/publicación antes de añadirlo. Sin extracción de YouTube ni reproducción remota añadida. | Usuario confirmó autorización del titular para publicar el MP3; hash exacto y sin extracción |
| AUDIO-03 | Reproducción iniciada por gesto. | Con archivo autorizado, intentar play() desde «Tengo algo para ti»; no reproducir automáticamente al cargar la página. | Verificado: play en pila del evento y reproducción real del MP3 tras el gesto; sin autoplay previo |
| AUDIO-04 | Fallos de reproducción no bloquean el regalo. | Simular archivo ausente, formato no soportado y rechazo de play(); no debe haber promesas sin gestionar ni interrupciones de navegación. | Pruebas de errores/bloqueo y waiting tardío aprobadas; navegación sin audio verificada en producción |
| AUDIO-05 | Pausa y reanudación accesibles. | Probar controles discretos por tacto y teclado, etiquetas acordes al estado real; mantener la misma instancia y reproducción entre sobres. | Producción: una instancia, pausa/reanudación, continuidad, bucle real y pausa persistente al reiniciar verificados |

## Calidad y producción futura

| ID | Criterio | Cómo se aceptará | Estado |
| --- | --- | --- | --- |
| QA-01 | Arquitectura mantenible y alcance controlado. | Revisar componentes reutilizables, separación de contenido/estado/vista y ausencia de dependencias o funciones innecesarias. | Sobre reutilizable, datos separados y controlador musical raíz; sin dependencias nuevas |
| QA-02 | Validar antes de avanzar de etapa. | Registrar tipos/build cuando exista base instalable y pruebas de flujo, legibilidad y accesibilidad cuando exista interfaz. No marcar funciones sin comprobarlas. | Tipos/lint, 20 pruebas, build y Vite preview aprobados; limitaciones manuales registradas |
| DEPLOY-01 | Configuración estática para Netlify Free. | Confirmar build npm run build, publicación dist y Node consistente; no usar backend ni servicios de pago. | Configuración Netlify Free y build/dist preparados, metadatos sociales listos para dominio real |
| DEPLOY-02 | Publicación solo en etapa autorizada. | Revisar automatismos de GitHub/Netlify antes de enviar cambios; después de autorización, validar URL HTTPS y recursos. | Pendiente: autorización pública del sitio, acceso Netlify y comprobación de URL real; no se publicó |

## Plan de comprobación de la interfaz futura

1. Instalar dependencias reproduciblemente y ejecutar tipos/build. Corregir fallos antes de probar pantallas.
2. Recorrer los 13 mensajes y la dedicatoria con ratón, teclado y tacto. Comparar los textos renderizados con el brief, sin normalizar puntuación ni emojis.
3. Revisar al menos anchos de 320, 375, 390, 768, 1024 y 1440 px; probar retrato y paisaje, y zoom de texto al 200 %. Incluir mensaje 5, primer/último mensaje y dedicatoria.
4. Comprobar en Chrome/Android y Safari/iPhone, además de navegadores de escritorio. La emulación ayuda a revisar diseño, pero no certifica audio o interacción en dispositivos reales. Registrar las limitaciones si no están disponibles.
5. Repetir apertura/continuación con movimiento reducido y activaciones rápidas. Verificar que ninguna ruta salta mensajes o depende de una animación para avanzar.
6. Probar sin audio y con fallos simulados; probar un archivo real únicamente cuando esté autorizado. Revisar consola y red para detectar errores y recursos ausentes.
7. Revisar foco, lector de pantalla, contraste y ausencia de scroll horizontal. Registrar evidencia y estado de cada criterio antes de una publicación autorizada.

## Reinicio — Prompt 3

| ID | Criterio | Comprobación | Estado |
| --- | --- | --- | --- |
| RESTART-01 | Volver a bienvenida y comenzar por el sobre 1. | Activar «Volver a empezar», comprobar foco y nuevo sobre cerrado. | Verificado en navegador |
| RESTART-02 | Conservar una instancia de audio y la pausa elegida. | Reiniciar con música pausada y comprobar mismo tiempo y pausa al empezar otra vez. | Verificado en navegador y pruebas |

## Resultado de esta etapa

QA local de producción completado con 20 pruebas aprobadas, sin cambiar contenido ni identidad. Preparados imagen social, metadatos, Netlify y paquete manual. Pendientes zoom 200 %, movimiento reducido visual, tecnologías de asistencia/dispositivos físicos y publicación con acceso válido y autorización. No hay URL pública verificada. Ver [PROMPT_4_STATUS.md](./PROMPT_4_STATUS.md).
