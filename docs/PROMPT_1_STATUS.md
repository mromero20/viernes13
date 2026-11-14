# Entrega del Prompt 1

Fecha: 13 de noviembre de 2026. Etapa: bienvenida y primer sobre cerrado.

Este informe actualiza el estado histórico de la primera entrega documental.
No modifica los requisitos completos ni los textos aprobados del
[brief](./PROJECT_BRIEF.md).

## 1. Inspección y configuración conservada

Se revisaron archivos, rama, remoto y estado de Git antes de editar. Se continúa
en el mismo repositorio y en `main`, sin commits, push ni publicación. Los archivos
creados en los turnos anteriores estaban sin seguimiento y se conservaron.

Se mantuvieron `vite.config.ts` (React y plugin de Tailwind), los tres archivos de
TypeScript con modo estricto, `src/main.tsx` (StrictMode y MotionConfig con
reducedMotion="user"), `index.html` en español, `.nvmrc`, `.editorconfig`,
`.gitignore`, `netlify.toml` y la configuración de audio sin archivo.

No se encontraron instrucciones AGENTS.md aplicables en el repositorio ni sus
directorios ascendentes.

## 2. Diagnóstico específico de npm

| Comprobación | Resultado |
| --- | --- |
| `node --version` | `v24.14.1` |
| `npm --version` | `11.20.0` |
| `npm config get registry` | `https://registry.npmjs.org/` |
| `npm config get strict-ssl` | `true` |
| Proxy de npm | `proxy` y `https-proxy` sin configurar; no se encontraron variables de proxy en el entorno inspeccionado |
| `npm ping --fetch-timeout=15000 --fetch-retries=0`, dentro del aislamiento | `ENOTFOUND`, syscall `getaddrinfo`, host `registry.npmjs.org` |
| Resolución mediante `node:dns/promises`, dentro del aislamiento | El mismo `ENOTFOUND` para `registry.npmjs.org` |
| Mismo `npm ping`, fuera del aislamiento | Éxito: `PONG 454ms` |

**Causa comprobada:** la resolución DNS del registro oficial estaba bloqueada en
el entorno aislado de ejecución. No era un fallo de las versiones de Node/npm,
del registro configurado, de un proxy de npm ni un error de certificado SSL.
La resolución tuvo éxito al usar el entorno con acceso de red permitido.
Esto identifica el límite del aislamiento; no se atribuye a un proveedor DNS o
configuración del equipo sin evidencia adicional.

Se completó la instalación desde el mismo registro oficial fuera del aislamiento:

```sh
npm install --save-exact react react-dom motion
npm install --save-dev --save-exact vite @vitejs/plugin-react typescript @types/react @types/react-dom @types/node tailwindcss @tailwindcss/vite eslint @eslint/js typescript-eslint eslint-plugin-react-hooks eslint-plugin-react-refresh globals
```

No se desactivó SSL, no se cambió el registro, no se eliminaron configuraciones ni
se forzaron resoluciones de dependencias. Se creó `package-lock.json`; las
dependencias directas quedaron fijadas en `package.json`.

La vista previa también requirió iniciar Vite fuera del aislamiento: dentro de
él la petición local devolvía EACCES y desde el exterior no llegaba a ese servidor.
Tras reiniciarlo fuera, `http://127.0.0.1:5173/` respondió HTTP 200. Se mantuvo el
servidor ligado a loopback, sin exponerlo a la red local.

## 3. Archivos creados y modificados en esta continuación

| Archivo | Acción y propósito |
| --- | --- |
| `package.json` | Modificado: dependencias exactas de producción/desarrollo y script `lint`. Se conservan los scripts previos y Node 24. |
| `package-lock.json` | Creado por npm para fijar el árbol de dependencias. |
| `eslint.config.js` | Creado: configuración plana de ESLint con TypeScript, reglas de hooks y React Refresh. |
| `src/App.tsx` | Modificado: estructura de página y estado bienvenida → primer sobre, con transición Motion. |
| `src/components/Welcome.tsx` | Creado: título/subtítulo/botón exactos y pequeño dibujo botánico SVG local. |
| `src/components/ClosedEnvelope.tsx` | Creado: representación por capas del único sobre cerrado y gestión de foco. |
| `src/styles.css` | Modificado: estilos Mobile First, tipografía del sistema, paleta cálida, sobre CSS, foco y movimiento reducido. |
| `README.md` | Modificado: instalación, ejecución, alcance actual y enlaces a documentación. |
| `docs/PROJECT_BRIEF.md` | Modificado fuera del contenido aprobado: aviso de estado histórico y enlace a esta entrega. |
| `docs/ACCEPTANCE_CRITERIA.md` | Modificado: estado del Prompt 1 y criterios de base/bienvenida actualizados; los del producto completo siguen pendientes. |
| `docs/PROMPT_1_STATUS.md` | Creado: diagnóstico y entrega verificable de esta continuación. |

`node_modules/`, `dist/` y los metadatos de compilación son generados locales
ignorados por Git. No forman parte del código a versionar.

## 4. Funcionalidades implementadas

- Una sola base React + Vite + TypeScript para computadora, tablet y celular.
- Tailwind integrado con su plugin de Vite y estilos compartidos Mobile First.
- Bienvenida con título «13 mensajitos para ti ♡», subtítulo aprobado y botón
  «Tengo algo para ti».
- El botón cambia al estado «Mensajito 1 de 13», con un solo sobre cerrado.
- Sobre estático compuesto por fondo, bolsillo, tapa y sello; no se abre todavía.
- Transición breve con Motion y alternativa sin desplazamiento ni duración
  cuando se solicita movimiento reducido.
- Botón nativo accesible con teclado/tacto, tamaño mínimo observado de 54 px de
  alto y foco visible. El foco pasa al título del sobre después de iniciar.
- Recargar reinicia la experiencia en la bienvenida.
- Tipografías del sistema y dibujo SVG local: no hay carga de fuentes ni recursos
  gráficos externos.
- Sin audio, solicitudes a archivos musicales inexistentes ni controles ficticios.

## 5. Validación ejecutada

| Prueba | Resultado |
| --- | --- |
| Instalación de producción y herramientas de desarrollo | Correcta; archivo de bloqueo generado |
| `npm run typecheck` | Correcto, salida 0 |
| `npm run lint` | Correcto, salida 0, cero advertencias permitidas |
| `npm run build` | Correcto, salida 0; genera HTML, CSS y JavaScript en `dist/` |
| Respuesta HTTP de Vite fuera del aislamiento | HTTP 200 |
| Bienvenida en navegador | Título, subtítulo y botón aprobados presentes |
| Activación mediante clic, Enter y Espacio | Muestra un único sobre cerrado y «Mensajito 1 de 13» |
| Foco después de iniciar | `envelope-title` |
| Recarga | Regresa a la bienvenida |
| Audio sin configurar | Cero elementos de audio en bienvenida y sobre |
| Consola durante recorrido | Sin advertencias ni errores observados |
| Mensajes/dedicatoria | Comparación literal con el prompt vigente: 13 mensajes y cuatro párrafos intactos |

En navegador integrado se revisó el tamaño móvil pequeño de 320 px, móvil de
375 px, tablet de 768 px y escritorio de 1440 px. Las lecturas del ancho del
documento no superaron el ancho del viewport en los estados comprobados.
Se inspeccionó visualmente la bienvenida y el sobre; esto no certifica dispositivos
Android/iPhone reales ni todos los navegadores.

La vista previa temporal se cerró al terminar la validación. Para continuar
localmente, ejecutar `npm run dev`; no hay un servidor de producción publicado.

La preferencia de movimiento reducido se revisó en el código (MotionConfig,
useReducedMotion y CSS), pero no se activó en el navegador de pruebas: no se
declara una prueba de esa preferencia ni de lector de pantalla realizada.

### Avisos de dependencias

`npm audit` detectó **9 avisos moderados** en el árbol de herramientas de lint,
derivados de `minimatch` (GHSA-g3hv-75wg-m249). Los avisos propagados a ESLint y
typescript-eslint no son nueve fallos independientes de la aplicación.

`npm audit --omit=dev --json` terminó con salida 0 y **cero vulnerabilidades** en
las dependencias de producción en el momento de la revisión. No se ejecutó
`npm audit fix --force` ni se degradaron herramientas automáticamente: las
soluciones sugeridas requieren cambiar las versiones de la cadena de lint.
Queda pendiente revisar una actualización compatible cuando esté disponible.

## 6. Preparación para el Prompt 2

La base está instalada, comprobada con TypeScript/lint/build y lista para continuar
sobre el mismo repositorio. Los requisitos y textos aprobados siguen en el brief.

Se detiene aquí el trabajo funcional. **No se ha avanzado al Prompt 2.**

Pendientes para etapas posteriores:

- Apertura de tapa, carta con altura adaptable y mensaje visible sin salir por
  completo del bolsillo.
- Navegación secuencial de los 13 mensajes y dedicatoria final.
- Reproductor y controles solo cuando haya archivo autorizado.
- Validación con dispositivos/navegadores reales, lector de pantalla, zoom y
  preferencia de movimiento reducido activada.
- Revisión de los avisos moderados de herramientas de desarrollo.
- Publicación autorizada en Netlify Free; no hay despliegue, push ni commit nuevo.
