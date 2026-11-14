# Proyecto — 13 mensajitos para ti ♡

Fecha de documentación: 13 de noviembre de 2026.

> Estado actualizado: Prompt 4 con QA local, metadatos e imagen social preparados; ver [informe final](./PROMPT_4_STATUS.md). No se ha desplegado el sitio. La bienvenida definitiva está en la sección 4 y los 13 mensajes y la dedicatoria siguen intactos en las secciones 7 y 8.

## Contexto y fuente de verdad

Un regalo digital personal para una amiga que es profesora de educación inicial, con cariño, alegría, motivación y cercanía. El tono es natural y de amistad, sin parecer una declaración romántica.

Este documento registra el último prompt maestro entregado por el usuario. Sus requisitos y textos sustituyen la versión anterior del encargo. Las secciones 7 y 8 son la fuente de verdad del contenido aprobado: conservar palabras, puntuación, emojis, orden y párrafos. Los títulos descriptivos de cada mensaje son metadatos editoriales, no parte de la frase que se mostrará sobre la carta. No introducir cambios de contenido sin autorización.

Las especificaciones siguientes recogen el prompt maestro y el ajuste puntual de bienvenida autorizado posteriormente (secciones 4 y 19). Los textos de las secciones 7 y 8 conservan su contenido aprobado. Los criterios verificables están en [ACCEPTANCE_CRITERIA.md](./ACCEPTANCE_CRITERIA.md).

## 1. Objetivo

Crear una experiencia web interactiva en la que la destinataria abra 13 sobres consecutivos.

Cada sobre contiene una frase diferente: motivadora, bonita, emotiva, personal o relacionada con su profesión.

Al completar los 13 mensajes, se desbloquea una dedicatoria final.

La experiencia debe sentirse como un regalo digital cuidado, no como una página genérica de frases.

## 2. Stack obligatorio

- React con TypeScript.
- Vite.
- Tailwind CSS.
- Motion for React, mediante el paquete `motion`.
- HTML5 Audio para música autorizada.
- GitHub para control de versiones.
- Netlify Free para producción.

NO utilizar backend, base de datos ni servicios de pago.

### Requisito fundamental

Desarrollar UNA SOLA aplicación web responsive que funcione en:

- Computadoras.
- Laptops.
- Tablets.
- Celulares Android.
- iPhone.

NO crear dos proyectos independientes.

NO utilizar React Native, Flutter ni desarrollar una aplicación móvil nativa.

Implementar un único código frontend con diseño Mobile First.

## 3. Diseño visual

Estilo delicado, cálido, moderno y elegante.

Paleta sugerida:
- Crema cálido.
- Rosa pastel.
- Lila suave.
- Blanco.
- Tonos de acento ligeramente más intensos para contrastes y botones.

Utilizar:
- Tipografía elegante y legible.
- Bordes redondeados.
- Sombras suaves.
- Pequeños corazones y estrellas.
- Animaciones delicadas.
- Transiciones fluidas.
- Espaciado equilibrado.

Evitar:
- Apariencia infantil.
- Exceso de elementos decorativos.
- Diseños genéricos.
- Animaciones bruscas.
- Textos demasiado pequeños.

## 4. Pantalla de bienvenida

Título exacto:

«13 mensajitos para ti ♡»

Frase exacta:

«No es la gran cosa, pero espero que te guste»

Botón exacto:

«Tengo algo para ti»

Al pulsarlo, comenzará la experiencia de los sobres y se intentará reproducir la música de fondo, si está disponible y autorizada.

## 5. Comportamiento de los sobres

La navegación será estrictamente secuencial.

1. Mostrar un único sobre cerrado.
2. Mostrar «Mensajito 1 de 13».
3. Al tocarlo, abrir su tapa superior.
4. Elevar parcialmente la carta desde el interior.
5. Mantener una parte de la carta dentro del sobre.
6. Revelar el mensaje en la zona visible.
7. Mostrar «Siguiente mensajito ♡».
8. Al pulsarlo, retirar el sobre actual.
9. Mostrar el siguiente sobre cerrado.
10. Repetir hasta completar los 13.

NUNCA mostrar los 13 sobres simultáneamente.

NUNCA sacar completamente la carta del sobre durante la lectura.

El mensaje debe estar escrito sobre la carta, no en un cuadro separado.

## 6. Legibilidad de los mensajes

Los mensajes tienen longitudes diferentes.

Los más largos, especialmente el número 5, deberán poder leerse completos.

Adaptar dinámicamente las dimensiones de la carta y el espacio visible según su contenido.

La parte inferior de la carta debe permanecer oculta por el bolsillo frontal del sobre.

No ocultar palabras, recortar frases ni reducir exageradamente el tamaño de letra.

En pantallas pequeñas se permite desplazamiento vertical natural si resulta necesario.

## 7. LOS 13 MENSAJES DEFINITIVOS

Estos textos están aprobados.

NO cambiar palabras, puntuación, orden ni contenido sin autorización.

### Mensaje 1 — Motivador

No te olvides de todo lo que has logrado hasta ahora. A veces nos enfocamos tanto en lo que nos falta que no nos damos cuenta de lo lejos que hemos llegado.

### Mensaje 2 — Algo bonito

Ojalá tengas más días de esos en los que te ríes por cualquier cosa y, sin darte cuenta, terminas con una sonrisa que no se te quita.

### Mensaje 3 — Un recordatorio

A veces uno solo necesita respirar un poco y recordar que no todo día difícil significa una mala vida.

### Mensaje 4 — Esperanza

No dejes que los momentos difíciles te hagan olvidar todas las cosas bonitas que todavía te esperan.

### Mensaje 5 — Sobre su papá

Estoy seguro de que tu papá está muy orgulloso de ti. No solo por la gran profesional en la que te estás convirtiendo, sino también por la bonita persona que eres, por todo lo que te esfuerzas y por el cariño que pones en lo que haces. Ojalá tú también puedas sentirte igual de orgullosa de ti misma. 🤍

### Mensaje 6 — Nunca pierdas tu brillo

Nunca dejes de sonreír ni pierdas ese brillo tan bonito que tienes, incluso cuando las cosas no vayan como esperabas.

### Mensaje 7 — Sobre su profesión

Por lo que veo en tus estados, tus pequeños te tienen muchísimo cariño. Eso dice mucho de la profesora que eres y es algo de lo que puedes sentirte muy orgullosa.

### Mensaje 8 — Lo valiosa que eres

No olvides lo valiosa que eres y todas las cosas bonitas que tienes para ofrecer, aunque a veces tú misma no las notes.

### Mensaje 9 — Sueños e ilusiones

Ojalá nunca te falten motivos para ilusionarte, sueños por cumplir y ganas de seguir haciendo lo que te gusta.

### Mensaje 10 — Tiempo para ti

Con tantas cosas que tienes por hacer, ojalá siempre te guardes un ratito para ti. No para cumplir pendientes, sino para hacer algo que realmente disfrutes.

### Mensaje 11 — Los pequeños momentos

No todos los momentos bonitos tienen que ser grandes o especiales. A veces basta con un día tranquilo, tu canción favorita y un ratito sin preocupaciones.

### Mensaje 12 — Fortaleza

Has podido con días difíciles antes. No porque sea fácil, sino porque eres más fuerte de lo que aparentas.

### Mensaje 13 — Buenos deseos

Y ya para terminar, de corazón espero que pronto te pasen cosas muy bonitas. De esas que llegan sin avisar y te cambian el ánimo.

## 8. DEDICATORIA FINAL DEFINITIVA

Después del mensaje 13 aparecerá una pantalla independiente con el botón:

«Un último mensajito para ti ♡»

Al pulsarlo, mostrar exactamente la siguiente dedicatoria, conservando los párrafos:

Y bueno, llegaste al último sobre jajaja.

Quería tener un pequeño detalle contigo por este viernes 13. Sé que este mes no empezó de la mejor manera para ti, así que se me ocurrió dejarte estos mensajitos, con la intención de alegrarte un poquito el día.

Sé que unas cuantas frases no van a solucionar todo, pero espero que al menos te hayan regalado un momento bonito.

De corazón, espero que las cosas vayan mejorando para ti, que tengas días más tranquilos y que nunca te falten razones para sonreír. 🤍

## 9. Música de fondo

Canción seleccionada como referencia:

https://www.youtube.com/watch?v=3hiYJIyDoBI

La opción preferida es utilizar un archivo de audio local cuando se disponga de una copia autorizada para su uso y publicación.

No descargar ni extraer automáticamente la canción desde YouTube.

La página debe poder funcionar aunque el archivo musical no esté disponible.

La música comenzará mediante la interacción inicial, sujeta a las restricciones del navegador.

Incluir controles discretos para pausar y reanudar.

## 10. Experiencia de usuario

La aplicación debe garantizar:

- Una única experiencia responsive.
- Un sobre visible por vez.
- Navegación del 1 al 13.
- Apertura animada.
- Carta parcialmente visible.
- Mensajes legibles.
- Música opcional.
- Dedicatoria final.
- Accesibilidad mediante teclado.
- Compatibilidad táctil.
- Respeto a preferencias de movimiento reducido.
- Buena experiencia en celulares pequeños.

## 11. Reglas de desarrollo

- Mantener una arquitectura limpia.
- Crear componentes reutilizables.
- Evitar dependencias innecesarias.
- No modificar contenido aprobado.
- No utilizar servicios de pago.
- No incorporar funcionalidades fuera del alcance.
- Validar antes de avanzar entre etapas.
- Continuar siempre sobre el mismo repositorio.

Puedes ejecutar operaciones locales rutinarias y seguras sin solicitar autorización por cada comando.

No realizar operaciones destructivas, publicar cambios en cuentas ajenas ni sobrescribir trabajo existente sin autorización.

## 12. Alcance de esta etapa documental

- Inspeccionar el mismo repositorio y registrar requisitos completos.
- Crear este documento y la matriz de aceptación separada.
- Verificar los 13 mensajes y la dedicatoria contra el texto original vigente.
- No implementar pantallas, sobres, animaciones, navegación ni reproductor en esta etapa.
- No hacer commit, push ni despliegue automático; no sobrescribir trabajo existente.
- Las etapas futuras deben validar sus criterios antes de avanzar. Los requisitos de producto documentados no significan que estén implementados.

## 13. Decisiones técnicas para las próximas etapas

### Arquitectura

Una aplicación estática React + TypeScript + Vite, con Tailwind CSS y Motion mediante importaciones desde motion/react. No se requiere router para un flujo lineal en una sola URL. No habrá backend, base de datos, autenticación, aplicación nativa ni servicios de pago. npm y un archivo de bloqueo permitirán instalaciones reproducibles cuando se complete la preparación de dependencias.

Separar el contenido aprobado de la lógica y la presentación al implementar. Extraer las frases desde las secciones 7 y 8 de este documento y comprobar su igualdad literal antes de usarlas; evitar mantener versiones divergentes. Prever componentes reutilizables para sobre, carta, progreso, controles de audio y botones. No crear componentes vacíos ni dependencias adicionales en esta etapa.

### Flujo y estado

Secuencia prevista: bienvenida → sobre 1 cerrado → tapa abierta → carta parcialmente elevada y legible → siguiente sobre cerrado → … → lectura del sobre 13 → pantalla independiente con «Un último mensajito para ti ♡» → dedicatoria.

El avance solo se habilita cuando la carta actual ha terminado de revelarse. Bloquear activaciones repetidas durante apertura y retirada, sin permitir saltos. Un solo sobre montado y visible por vez; retirar el anterior antes de montar el siguiente. El último mensaje también requiere una acción explícita de continuación antes de la pantalla final. No incorporar selectores de mensajes ni enlaces de salto. Por simplicidad, el progreso vivirá en memoria; recargar reiniciará la experiencia. No añadir persistencia sin una necesidad posterior acordada.

### Carta y animación

Separar las capas: parte trasera del sobre, tapa, carta y bolsillo frontal. La tapa se abre primero; después la carta asciende parcialmente. El bolsillo permanece por delante de la zona inferior de la carta durante la lectura y las transiciones. Diseñar las dimensiones a partir de la altura real del texto, reservando un tramo inferior vacío que siga dentro del sobre. No recortar el bloque de texto para simular el bolsillo ni usar una altura fija que falle con el mensaje 5.

La longitud del mensaje determina el espacio visible y, cuando sea necesario, la altura total del conjunto. Se permite desplazamiento vertical de la página en celulares pequeños. No encoger excesivamente el texto, usar line-clamp ni sacar completamente la carta para que quepa. Probar especialmente el mensaje 5, el emoji final y los cambios de orientación o tamaño de fuente.

### Diseño y accesibilidad

Mobile First, paleta crema/rosa/lila/blanco y tinta oscura con contraste comprobable. Tipografía del sistema inicialmente, sin fuentes externas obligatorias. Los colores actuales son tokens provisionales; el diseño se validará cuando haya pantallas.

Usar botones semánticos activables con Enter y Espacio, orden de tabulación natural, foco visible y áreas táctiles cómodas (objetivo mínimo 44 × 44 píxeles). Mantener legibilidad con zoom de texto al 200 %. Actualizar el foco al cambiar de etapa y anunciar el progreso sin leer decoraciones. Corazones y estrellas decorativos se ocultan a tecnologías de asistencia.

MotionConfig con reducedMotion="user" está previsto a nivel raíz; además, las futuras animaciones CSS y la lógica de secuencia deben respetar prefers-reduced-motion. Con movimiento reducido, revelar sin traslaciones/giros significativos ni esperas artificiales, conservando el mismo orden y acceso a continuar. No depender exclusivamente de la duración de una animación para desbloquear el avance.

No ocultar problemas de maquetación con overflow-x: hidden. El contenido debe adaptarse sin desbordamiento horizontal y permitir desplazamiento vertical natural.

### Música opcional

La URL de YouTube de la sección 9 identifica la referencia musical; no es una fuente de reproducción ni autorización. No insertar un reproductor remoto ni descargar o extraer su audio.

La configuración existente tiene src: null. Mientras no haya archivo autorizado, no montar ni solicitar audio ni mostrar controles que prometan reproducción. La experiencia debe funcionar en silencio. Cuando exista una copia autorizada para uso y publicación, colocarla en public/audio/, registrar procedencia y permiso y configurar su ruta local.

El futuro reproductor usará HTML5 Audio con preload="none" e intentará play() desde la interacción inicial. Gestionar la promesa rechazada y los errores de carga sin bloquear la apertura de sobres. Mantener una instancia entre mensajes, volumen inicial discreto y controles accesibles de pausa/reanudación basados en el estado real de reproducción. No reintentar reproducción sin interacción ni iniciar música al cargar la página.

### GitHub y Netlify

Continuar en el repositorio existente, con su remoto de GitHub. No crear un segundo proyecto. Usar ramas codex/ cuando corresponda realizar trabajo de implementación en una rama nueva; esta etapa no cambia de rama ni publica nada.

Producción futura: sitio estático en Netlify Free, comando npm run build y directorio dist, según netlify.toml. Node 24 está declarado en .nvmrc y package.json. No se necesitan funciones, variables secretas ni servicios de pago. No se ha creado ni conectado un sitio de Netlify. Revisar configuración de despliegue automático antes de conectar el repositorio o enviar cambios, para evitar publicar sin autorización.

## 14. Inspección y estado real del repositorio

- Carpeta: raíz del repositorio de trabajo actual.
- Rama inspeccionada: main; commit inicial a679a8e, «Primer commit - Viernes 13».
- Remoto origin: https://github.com/mromero20/viernes13.git. Se comprobó la configuración local; no se verificó el estado remoto en línea.
- Al inicio del encargo solo existían README.md y .git; no se encontraron instrucciones AGENTS.md aplicables en la carpeta ni sus directorios ascendentes.
- Del turno anterior quedaron archivos locales sin seguimiento: configuración de Vite/TypeScript/Netlify, package.json, estilos, montaje React, configuración de audio y archivos auxiliares. Se preservan. App retorna null: no hay pantallas, sobres ni flujo implementado.
- Entorno observado: Node 24.14.1 y npm 11.20.0.
- La instalación de dependencias iniciada previamente falló con ENOTFOUND al resolver registry.npmjs.org. package.json todavía no declara dependencias y no hay package-lock.json; la base no se considera funcional ni compilada. La instalación y las comprobaciones de tipos/build quedan para la preparación técnica posterior.
- Esta etapa añade únicamente los dos documentos solicitados. No se ejecutan pruebas visuales porque no hay interfaz implementada; tampoco se afirma compatibilidad real con dispositivos sin validarla.
- No se incluyó música ni se realizaron commits, pushes o despliegues.

## 15. Validación y siguientes etapas

En esta etapa: comparar literalmente el bloque de cada mensaje y los cuatro párrafos de dedicatoria con el prompt vigente, comprobar secuencia 1–13 y revisar cobertura de requisitos en la matriz.

Preparación técnica posterior: completar dependencias y archivo de bloqueo, instalar con npm ci y validar tipos y build antes de implementar las pantallas.

Implementación posterior: construir bienvenida y flujo secuencial, después el sobre por capas con tamaño adaptable, la pantalla final y la dedicatoria. Añadir audio solo si se dispone de un archivo autorizado.

Validación del producto: teclado, tacto, lector de pantalla, movimiento reducido, zoom, móviles pequeños y escritorio; comprobar los 13 mensajes y las rutas sin audio, con reproducción bloqueada y con archivo autorizado. Ver matriz para casos concretos. Publicar en Netlify Free únicamente en una etapa autorizada.

## 16. Referencias técnicas consultadas

Estas referencias respaldan las decisiones de integración; no sustituyen los requisitos aprobados:

- [Vite: guía de inicio](https://vite.dev/guide/).
- [Tailwind: integración con Vite](https://tailwindcss.com/docs/installation/using-vite).
- [Motion: instalación para React](https://motion.dev/docs/react-installation).
- [Netlify: Vite](https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/).
- [Netlify: software disponible y selección de Node](https://docs.netlify.com/build/configure-builds/available-software-at-build-time/).


## 17. Alcance adicional autorizado — Prompt 2

Se conserva la bienvenida del Prompt 1 y se implementan los 13 sobres animados, uno por vez, con carta adaptable parcialmente dentro del bolsillo. La frase decorativa vigente es «No es la gran cosa, pero espero que te guste». Los mensajes de la sección 7 y la dedicatoria de la sección 8 permanecen sin cambios.

El botón del mensaje 13 lleva al estado completed con un cierre provisional claro; la dedicatoria no se implementa hasta el Prompt 3. Para la arquitectura, geometría, pruebas y limitaciones reales, consultar [PROMPT_2_STATUS.md](./PROMPT_2_STATUS.md). No hay commits, push ni despliegues.


## 18. Alcance adicional autorizado — Prompt 3

El botón final del sobre 13 integra directamente la tarjeta especial de dedicatoria en el estado completed del recorrido existente, sustituyendo el cierre provisional. La tarjeta conserva exactamente los cuatro párrafos aprobados y añade el control «Volver a empezar». No hay navegación paralela.

Se integró el archivo MP3 entregado por el usuario en public/audio/viernes-13.mp3. Un reproductor raíz comienza por el gesto inicial, ofrece pausa/reanudación, continúa entre sobres y conserva el tiempo y la preferencia de pausa al reiniciar. La configuración src:null permite la experiencia en silencio; los bloqueos o fallos no impiden avanzar.

Consultar [PROMPT_3_STATUS.md](./PROMPT_3_STATUS.md) para archivos, arquitectura, pruebas y limitaciones reales. No se avanzó al Prompt 4 ni se hicieron commits, push o despliegues.


## 19. Ajuste puntual autorizado — textos de bienvenida

Textos visibles definitivos del bloque principal:

- Título: «13 mensajitos para ti ♡».
- Frase aprobada: «No es la gran cosa, pero espero que te guste».
- Botón: «Tengo algo para ti».

Se retiraron el subtítulo introductorio anterior y la nota secundaria del botón. Se eliminaron sus estilos sin uso y se compactaron los márgenes de la bienvenida, conservando el diseño responsive. La frase aprobada se muestra exclusivamente en la bienvenida y desaparece al iniciar el recorrido. Al volver a empezar, vuelve a mostrarse con la bienvenida. Este ajuste no inicia el Prompt 4.

Validación del ajuste: npm run typecheck, npm run lint, npm test (15 aprobadas) y npm run build finalizaron correctamente. Se revisó visualmente la bienvenida a 320 × 568 y 1440 × 900, con el título, la frase y el botón exactos, sin desbordamiento horizontal. Se compararon hashes de 13 archivos de contenido, sobres y audio: ninguno cambió.


## 20. QA final y producción — Prompt 4

Se realizaron pruebas del build de producción con y sin audio, cuatro estados en seis resoluciones y recorrido completo por teclado. Se prepararon imagen social, metadatos y Netlify Free, sin cambiar textos ni diseño. El usuario confirmó expresamente autorización para publicar el MP3.

El sitio no está desplegado y no existe URL pública verificada. Acceso de GitHub de solo lectura, sin conector/credenciales Netlify disponibles. El control de computadora se detuvo durante la comprobación adicional de zoom al no poder verificar la URL de Opera; no se intentó eludirlo. Las limitaciones, capturas, resultados y pasos manuales figuran en [PROMPT_4_STATUS.md](./PROMPT_4_STATUS.md).
