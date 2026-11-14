# 13 mensajitos para ti ♡

Un regalo digital personal: una sola web responsive con bienvenida, 13 sobres animados, música opcional, dedicatoria final y reinicio. Los textos aprobados se conservan literalmente.

## Stack e instalación

React 19 + TypeScript + Vite 8, Tailwind CSS y Motion for React. Sitio estático sin backend, autenticación, base de datos ni analítica. Requisitos: Node 24 y npm; .nvmrc fija la versión principal.

~~~sh
npm ci
npm run dev
~~~

## Validación y producción local

~~~sh
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
~~~

El build genera dist/. La vista previa sirve ese resultado, normalmente en http://localhost:4173. Hay 20 pruebas: se conservan las 15 originales y se añaden regresiones de audio y metadatos.

Bienvenida definitiva: «13 mensajitos para ti ♡», «No es la gran cosa, pero espero que te guste» y «Tengo algo para ti». La frase se muestra solo en esta primera pantalla, no durante los sobres ni en la dedicatoria. Cada sobre se abre con mouse, tacto, Enter o Espacio. Recargar reinicia la sesión.

## Estructura

- src/components/Welcome.tsx: bienvenida y foco al regresar.
- src/components/MessageExperience.tsx y src/lib/experience.ts: recorrido secuencial, bloqueo de repeticiones y estado final.
- src/components/Envelope.tsx, EnvelopeFlap.tsx y Letter.tsx: capas, animación y carta adaptable parcialmente dentro del bolsillo.
- src/components/Dedication.tsx: cuatro párrafos y reinicio.
- src/hooks/useBackgroundMusic.ts, src/lib/backgroundMusic.ts y MusicPlayer.tsx: una instancia raíz de audio y controles accesibles.
- src/data/messages.ts y dedication.ts: contenido aprobado, comprobado contra el brief.
- scripts/site-metadata.ts: enlaces sociales absolutos al compilar.
- public/: MP3, imagen social y favicon; son los únicos recursos públicos adicionales al bundle.

## Audio autorizado

El usuario confirmó autorización del titular para publicar public/audio/viernes-13.mp3. Procedencia, tamaño y hash: [docs/AUDIO_SOURCE.md](docs/AUDIO_SOURCE.md). No se extrajo audio de YouTube ni se recodificó el archivo.

Para sustituirlo, usar un MP3 autorizado con ese nombre o ajustar src/config/audio.ts. Con src:null no se monta audio ni aparecen controles. Si play es bloqueado, se ofrece activación manual; si falla la carga, el recorrido continúa.

La reproducción comienza por el gesto inicial, usa preload=none, bucle y volumen inicial del 60 % (0.6) si el navegador lo permite. Al reiniciar conserva el tiempo y la preferencia de pausa. Una recarga completa vuelve a comenzar sin autoplay.

## WhatsApp y privacidad

La imagen [social-preview.png](public/social-preview.png) mide 1200 × 630 y pesa unos 18 KB. Incluye solo el título y un sobre pastel, sin mensajes ni dedicatoria. El PNG está versionado; se puede regenerar localmente en Windows con scripts/render-social-preview.ps1, sin instalar bibliotecas.

El HTML ya contiene Open Graph y Twitter Card con título y descripción aprobados. Las URLs absolutas se generan al compilar desde SITE_URL o, en Netlify, desde su variable URL. Sin dominio conocido no se inventan enlaces. Si se añade un dominio personalizado, definir SITE_URL con esa URL HTTPS real y reconstruir.

noindex,nofollow desalienta la indexación: **no hace privado el enlace**. Quien reciba la URL pública podrá abrir la página y sus recursos sin sesión. No hay rastreadores añadidos.

## Publicar en Netlify Free mediante GitHub

La publicación todavía no se realizó. La conexión de GitHub disponible tiene solo lectura y el repositorio existente es público. Desde tu cuenta, usar preferentemente un repositorio privado y revisar el destino antes de subir código.

1. Versionar el código, package-lock.json, public/, scripts/, tests/ y la documentación del proyecto. Excluir node_modules/, dist/, release/, .env y credenciales según .gitignore.
2. En Netlify, importar ese repositorio con tu cuenta autorizada y seleccionar el plan Free.
3. Mantener la raíz del proyecto como base, comando npm run build y directorio dist. Netlify lee netlify.toml y Node 24 de .nvmrc. No activar servicios de pago.
4. El build de Netlify usa su variable URL para producir los metadatos absolutos. Si necesitas el dominio personalizado definitivo, configurar SITE_URL y volver a desplegar.
5. Revisar la URL HTTPS real sin sesión: bienvenida, sobres, audio, dedicatoria, reinicio y recursos. Después comprobar la tarjeta al compartir en WhatsApp; sus cachés pueden conservar una vista anterior.

No se necesitan reglas de redirección SPA: el recorrido vive en una sola URL y no usa rutas de navegador.

Referencias: [Vite en Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/), [configuración del entorno](https://docs.netlify.com/build/configure-builds/manage-dependencies/).

## Publicación manual alternativa

Si no puedes conectar GitHub, el paquete local release/13-mensajitos-netlify.zip contiene el build final con index.html en la raíz. También puedes subir directamente la carpeta dist/.

1. Iniciar sesión en tu cuenta de Netlify y, cuando autorices la publicación pública, subir el ZIP o dist/ a [Netlify Drop](https://app.netlify.com/drop). Este paso publica la página; no lo realiza este repositorio automáticamente.
2. Copiar la URL real asignada. Para completar las imágenes sociales absolutas, definir SITE_URL y reconstruir antes de volver a subir dist/ al mismo proyecto. En PowerShell:

~~~powershell
$env:SITE_URL = Read-Host 'Pega la URL HTTPS real asignada por Netlify'
npm run build
~~~

3. Reemplazar el despliegue desde Deploys del mismo proyecto con el nuevo dist/. No subir el código fuente como sustituto del build.
4. Comprobar HTTPS, acceso sin sesión, recursos y vista previa de WhatsApp desde el enlace definitivo.

[Guía oficial de Netlify Drop](https://docs.netlify.com/start/quickstarts/netlify-drop-quickstart/).

## Actualizaciones posteriores

Editar sobre el mismo repositorio, ejecutar las cuatro validaciones y revisar el resultado con npm run preview. Con integración Git autorizada, subir los cambios a la rama conectada dispara el build de Netlify; revisar el despliegue real después. En modo manual, recompilar con SITE_URL y volver a subir dist/ al mismo proyecto.

## Documentación y estado de QA

- [Requisitos y contenido aprobado](docs/PROJECT_BRIEF.md).
- [Criterios de aceptación](docs/ACCEPTANCE_CRITERIA.md).
- [Prompt 1](docs/PROMPT_1_STATUS.md), [Prompt 2](docs/PROMPT_2_STATUS.md), [Prompt 3](docs/PROMPT_3_STATUS.md).
- [Prompt 4: informe final, limitaciones y producción](docs/PROMPT_4_STATUS.md).
- [Capturas y mediciones de producción](docs/qa/mediciones-produccion.json).

QA local: tipos, lint, 20 pruebas y build aprobados; recorrido con/sin audio y seis resoluciones comprobados. Pendientes: zoom 200 %, emulación visual de movimiento reducido, lectores de pantalla y dispositivos físicos. No hay URL pública verificada ni QA posterior al despliegue.

Si npm vuelve a devolver ENOTFOUND dentro del entorno aislado, comprobar conectividad antes de cambiar configuración. El registro oficial y SSL permanecen activados; en este entorno las instalaciones previas necesitaron acceso de red fuera del aislamiento.
