# Prompt 4 — QA final y preparación de producción

Fecha: 13 de noviembre de 2026.

**QA técnico y funcional local aprobado. Producción preparada; sitio no desplegado.**
Zoom al 200 %, lector de pantalla real y movimiento reducido visual conservan las
limitaciones que se detallan abajo. No se afirma una aprobación de esas pruebas.

## 1. Resumen del trabajo

Se revisaron el brief, los criterios, los tres informes previos, componentes,
estado Git, dependencias y pruebas. Se preservaron la identidad visual, bienvenida
definitiva, 13 textos, geometría de sobres, dedicatoria y reinicio.

Se probó el build estático mediante Vite preview, no el servidor de desarrollo.
Se recorrieron los 13 mensajes con música y nuevamente sin música por teclado.
Se prepararon imagen de WhatsApp, Open Graph/Twitter Card, noindex y configuración
de URLs absolutas para cuando exista el dominio real. No hay analítica añadida.

## 2. Archivos creados y modificados

Nuevos:

- `public/social-preview.png`: imagen 1200 × 630, 17 938 bytes, solo título y sobre.
- `public/favicon.svg`: icono local coherente con el sobre.
- `scripts/render-social-preview.ps1`: generador local reproducible del PNG mediante System.Drawing, sin bibliotecas nuevas ni IA.
- `scripts/site-metadata.ts`: URLs sociales/canonical HTTPS solo cuando se conoce SITE_URL o URL de Netlify.
- `tests/siteMetadata.test.mjs`: cuatro pruebas de metadatos, dominio y textos.
- `.env.example`: configuración opcional, sin dominio inventado ni secretos.
- `docs/qa/`: seis capturas y mediciones JSON del recorrido de producción.
- `docs/PROMPT_4_STATUS.md`: este informe.

Modificados:

- `index.html`: descripción aprobada, OG, Twitter Card, noindex y favicon.
- `vite.config.ts`: inyección de enlaces absolutos en HTML estático.
- `tsconfig.node.json`: incluye el auxiliar de metadatos e importaciones TS con extensión explícita.
- `netlify.toml`: conserva build/dist y añade X-Robots-Tag.
- `src/lib/backgroundMusic.ts`: protege el estado ante eventos waiting tardíos.
- `tests/backgroundMusic.test.mjs`: añade la regresión de ese caso; no elimina las pruebas anteriores.
- `.gitignore`: excluye el paquete local release/.
- `docs/AUDIO_SOURCE.md`: conserva la procedencia y autorización del audio; movido desde public/audio/README.md para evitar publicar documentación interna como recurso estático.
- `README.md`, `docs/PROJECT_BRIEF.md` y `docs/ACCEPTANCE_CRITERIA.md`: documentación vigente, producción y límites.

No se cambiaron mensajes, dedicatoria, diseño, animaciones de apertura ni versiones
de dependencias. No se añadieron bibliotecas, backend, funciones ni base de datos.

## 3. Pruebas ejecutadas

### Técnicas

| Comprobación | Resultado |
| --- | --- |
| TypeScript | Aprobado mediante npm run typecheck y build |
| ESLint | Aprobado; reglas conservadas |
| Node Test Runner | 20 aprobadas, 0 fallos; las 15 anteriores siguen presentes |
| Compilación de producción | Aprobada, sin advertencias de Vite tras corregir extensión de importación |
| Vite preview | HTTP 200 en página, JS, CSS, MP3, favicon e imagen social |
| Contenido | 13 mensajes y cuatro párrafos exactos, comprobados contra brief |
| Git diff --check | Sin errores de espacios |

Los casos añadidos cubren ausencia de dominio, URLs absolutas reales, rechazo de
credenciales/HTTP en SITE_URL, metadatos aprobados y waiting después de play
bloqueado o pausa del sistema. No se redujeron controles de calidad.

### Funcionales y visuales

- Recorrido 1–13 del build real, sin saltos, con un solo sobre visible y montado.
- Doble clic en apertura y continuación: no adelanta mensajes ni duplica transiciones.
- Fase opening con continuar ausente; fase rising con tapa en rotateX(180deg), z-index 0 y carta ascendiendo; revelación con texto y botón al terminar.
- Texto siempre sobre la carta; en los 13 mensajes medidos terminó por encima del cuerpo del sobre y la carta permaneció solapada con el bolsillo.
- Mensaje 5 abierto a 320/375/390/430/768/1440 px: texto íntegro, 18/19 px, sin desbordamiento horizontal.
- Bienvenida, sobre cerrado, mensaje 5 y dedicatoria comprobados en las seis resoluciones: 24 combinaciones distintas de estado/tamaño.
- Dedicatoria con cuatro párrafos exactos y foco en su título; reinicio devuelve a sobre 1 cerrado.
- Recorrido íntegro sin audio con Space, Tab y Enter, hasta la dedicatoria; sin controles inservibles ni errores de consola observados.

Se conservaron mediciones de DOM reales, no solo inspección del código, en
[qa/mediciones-produccion.json](./qa/mediciones-produccion.json).

## 4. Resultados del audio

El usuario confirmó expresamente la autorización del titular para publicar el
MP3. Se conserva el archivo local aportado, sin extracción de YouTube ni recodificación.

- HTTP 200 como audio/mpeg; archivo de 3 407 499 bytes.
- Reproducción por gesto, sin autoplay al cargar ni carga musical anticipada.
- Una instancia durante sobres y dedicatoria; controles de pausa/reanudación por teclado.
- Continuidad observada de aproximadamente 38.7 a 155.7 s durante el recorrido.
- Bucle real observado: después de 155.704 s pasó a 5.251 s sin cambiar de pista ni instancia; duración 177.354 s, loop=true y paused=false.
- Pausa antes de reiniciar: tiempo 33.356871 s; al volver a bienvenida y abrir el sobre 1 siguió pausado exactamente en ese tiempo.
- Sin audio: se compiló temporalmente con src:null y se recorrieron los 13 por teclado. Después se restauró el MP3 y se recompiló la versión final.
- Bloqueo de play, errores de carga y resultados tardíos se simularon en pruebas automatizadas; no se afirma haber forzado esas políticas en el navegador real.

## 5. Capturas y evidencias

- [Mensaje 5 en móvil](./qa/mensaje-5-movil.jpg).
- [Mensaje 5 en escritorio](./qa/mensaje-5-escritorio.jpg).
- [Sobre cerrado](./qa/sobre-cerrado-escritorio.jpg).
- [Carta ascendiendo](./qa/carta-ascendiendo.jpg).
- [Dedicatoria](./qa/dedicatoria-escritorio.jpg).
- [Bienvenida definitiva](./qa/bienvenida-escritorio.jpg).
- [Imagen social](../public/social-preview.png).

## 6. Problemas encontrados

Un waiting tardío podía reemplazar blocked/paused por loading, ocultando la
acción correcta después de un bloqueo o pausa. Se reprodujo en una prueba
automatizada y se limitó waiting a estados de reproducción/carga activos.

Vite advirtió sobre una importación de configuración sin extensión para su
futuro cargador nativo. Se corrigió a .ts con la opción de TypeScript adecuada,
sin silenciar advertencias.

Los documentos de etapas anteriores contenían dos rutas locales innecesarias;
se retiraron del material a versionar, preservando procedencia, hash y contenido. El documento de procedencia musical se trasladó de public/ a docs/ para excluirlo del despliegue.

## 7. Optimización y dependencias

El JavaScript final ocupa 378 755 bytes (aprox. 121–122 KB gzip, según compresor),
CSS 14 351 bytes (4 362 gzip) e imagen social 17 938 bytes. Las tipografías son
del sistema y las decoraciones son SVG/CSS, sin solicitudes a terceros.

El recurso mayor es el MP3, solicitado solo tras el gesto inicial. No se aplicó
compresión con pérdida a un archivo ya comprimido ni una división de bundle
innecesaria que pudiera introducir esperas o alterar las transiciones.

npm audit mantiene 9 avisos moderados propagados desde minimatch a ESLint y
typescript-eslint. **npm audit --omit=dev: cero vulnerabilidades.** No afectan
al bundle de producción; el riesgo señalado pertenece a herramientas de lint y
procesamiento de patrones. No se usó audit fix --force ni se hicieron cambios
mayores/degradaciones de versiones para ocultarlos. Queda pendiente una
actualización compatible de esa cadena.

## 8. Limitaciones pendientes

- No hay pruebas en Android/iPhone físicos, Safari real ni lector de pantalla real.
- El navegador integrado solo expone visibilidad y viewport. No permite emular prefers-reduced-motion. La ruta reducida está cubierta en la máquina de estados; su presentación visual sigue pendiente.
- Ctrl++ no cambió el zoom del navegador integrado. Se intentó comprobar 200 % en Opera, pero el control de computadora se detuvo al no poder verificar con suficiente confianza su URL. No se afirma que el zoom al 200 % haya aprobado ni se intentó eludir esa detención.
- WhatsApp y sus cachés no se han probado con un enlace real, porque todavía no hay dominio de producción.

## 9. Estado del repositorio

Se conserva el repositorio existente y la rama main. Solo README estaba
versionado al comenzar; el código y las etapas previas siguen como cambios
locales sin seguimiento. No se hizo commit, push, cambio de visibilidad ni
operación sobre el historial.

La integración de GitHub consultada confirma que el remoto existente es público
y concede lectura, sin push ni administración. Se recomienda que el usuario
publique el código en un repositorio privado desde su propia cuenta antes de
conectarlo a Netlify. No se enviaron archivos ni secretos a GitHub.

.gitignore excluye node_modules, dist, entornos locales, logs, .netlify y release.
Las capturas dentro de docs/qa son evidencias solicitadas del proyecto. El paquete
de despliegue contiene solo dist, sin documentación, credenciales ni archivos personales.

## 10. Estado de Netlify y metadatos

Configuración preparada para Netlify Free: npm run build, carpeta dist y Node 24
mediante .nvmrc. No hay router de URLs, por lo que no se añade redirección SPA.
La recarga de la raíz funciona en preview.

La imagen social está preparada a 1200 × 630. El HTML contiene título, descripción,
Twitter Card, dimensiones/alt y noindex,nofollow. Cuando Netlify proporciona URL,
o el usuario define SITE_URL con el dominio HTTPS real, Vite genera og:url,
og:image, twitter:image y canonical absolutos en el HTML estático.

Sin dominio no se inventan esos enlaces. Tras un Drop manual inicial se debe
recompilar con el dominio recibido y volver a subir dist para completar la vista
previa. README explica ambos métodos de publicación.

**noindex,nofollow desalienta la indexación, pero no convierte la página en privada.**
El enlace público, sus recursos y sus textos se podrán abrir sin iniciar sesión.

No se encontró conector de Netlify en el catálogo consultado ni credencial o CLI
de Netlify disponible en el entorno. La interrupción del control de computadora
impidió continuar una comprobación de cuenta mediante UI. Se deja la publicación
manual preparada; no se simula acceso ni despliegue.

Referencias: [Vite en Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/),
[Netlify Drop](https://docs.netlify.com/start/quickstarts/netlify-drop-quickstart/).

## 11. URL de producción

**No existe una URL de producción verificada. No se ha publicado el sitio.**

Artefacto local: release/13-mensajitos-netlify.zip, generado desde el build final.
No es un despliegue ni reemplaza la comprobación de HTTPS, acceso externo y
metadatos después de publicar.

## 12. Pasos restantes y recomendaciones

1. Revisar manualmente zoom 200 %, movimiento reducido y, si se dispone, un lector de pantalla/dispositivo real.
2. Desde la cuenta del usuario, autorizar la publicación pública y usar un proyecto Netlify Free. No seleccionar planes de pago.
3. Importar un repositorio privado con build/dist o subir el paquete local en Netlify Drop, según README.
4. Obtener el dominio real, completar SITE_URL si hace falta y recompilar/republicar para metadatos absolutos.
5. Abrir el enlace sin sesión, revisar HTTPS y recursos, recorrer los 13 mensajes, audio, dedicatoria y reinicio; compartir el enlace real en WhatsApp y revisar su vista previa.

No se declara QA posterior al despliegue aprobado hasta disponer de una URL real.
