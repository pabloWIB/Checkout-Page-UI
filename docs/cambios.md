# Registro de cambios

Reorganización completa del proyecto, 2026-07-30. Agrupado por fase.
El inventario del estado de partida está en [auditoria.md](auditoria.md).

Ningún comando de git fue ejecutado. Todos los cambios son locales.

---

## Fase 1 — Auditoría

- Recorrido completo del proyecto: 1 HTML, 3 CSS, 1 JS, 13 imágenes, 4 dependencias externas.
- 42 hallazgos documentados en `docs/auditoria.md`.
- Sin credenciales, sin tokens, sin API keys en ningún archivo.
- Sin enlaces rotos, sin imágenes rotas, sin archivos basura (`.bak`, `node_modules`, `.DS_Store`).

## Fase 2 — Estructura

- `CSS/`, `IMG/` y `JS/` → `assets/css/`, `assets/img/`, `assets/js/`. Todo en minúsculas.
- `styles.css` (332 líneas sin sistema) dividido en tres archivos con orden interno explícito
  variables → reset → base → layout → componentes → utilidades → media queries:
  - `base.css` — tokens, reset, tipografía, utilidades
  - `layout.css` — contenedor, rejilla de la página, cabecera, pie, página de error
  - `components.css` — campos, botones, productos, selector de cantidad, totales
- `normalize.css` v8.0.1 sustituido por un reset moderno dentro de `base.css`: sus 357 líneas
  corregían bugs de IE9-IE11 y no incluía `box-sizing: border-box`, que es lo que este layout
  necesitaba de verdad.
- `script.js` → `assets/js/main.js` + `assets/js/modules/{cart,checkout-form}.js`.
- Imágenes renombradas con nombres semánticos: `photo1.png` → `product-canvas-backpack.webp`,
  `photo2.png` → `product-canvas-sneakers.webp`, `call.svg` → `phone`, `account.svg` → `user`,
  `location.svg` → `city`, `postal.svg` → `postal-code`.
- Creados `404.html`, `robots.txt`, `sitemap.xml`, `.gitignore`, `docs/`.
- Las 11 rutas de `index.html` actualizadas y verificadas una a una con petición HTTP: 14/14 → 200.

## Fase 3 — Higiene

- **Eliminado** `CSS/normalize.css` — reemplazado por el reset de `base.css`.
- **Eliminado** `CSS/fonts.css` — eran dos `@import` de Google Fonts, uno duplicado del otro, que
  además importaban Playfair Display y Playfair Display SC sin que ninguna regla las usara.
  Sustituido por `preconnect` + `<link>` a Montserrat con `display=swap` en el `<head>`.
- **Eliminado** el contenido íntegro de `JS/script.js`: 6 handlers de jQuery sobre `.1`, `.over`,
  `.cont-section-1`, `.cont-section-2` y `.cont-section-3`, clases que no existen en este
  proyecto. Era código importado de otro repositorio.
- **Eliminada** la dependencia de jQuery 3.0.0-beta1 desde cdnjs, que solo servía para ejecutar
  ese código muerto.
- **Eliminado** `IMG/favicon.png` — 207 KB y 1024 × 1024 px para un icono de 16 px, con una
  identidad azul y verde ajena al naranja del sitio.
- **Eliminados** los 9 SVG sueltos de iconos tras inlinearlos en un sprite `<symbol>`; se
  comprobó con grep que ningún archivo los referenciaba antes de borrarlos.
- Recuperado `IMG/icon.png`, que estaba huérfano, como fallback PNG del favicon.
- Reglas CSS muertas eliminadas: `.products-specification {}` (vacía), `.checkbox-class p`
  (no hay `<p>` ahí), `position: ;` (declaración inválida), `bottom: 4px` sin `position`,
  `display: flex` duplicado en `.chose-quantity`.
- Formato normalizado en los 14 archivos: 2 espacios, comillas dobles en HTML, punto y coma en
  JS, saltos LF, sin espacios al final de línea, salto de línea final. Verificado con script.
- Sin credenciales que extraer: no había ninguna.

## Fase 4 — Imágenes

- `photo1.png` (136 KB) y `photo2.png` (132 KB) convertidas a WebP con calidad 82:
  **268 KB → 25 KB, un 91 % menos**. Ambas son 269 × 273 px de origen, por debajo del máximo de
  800 px para tarjetas, así que no hubo que redimensionar.
- `width` y `height` añadidos a las dos `<img>` para reservar el espacio y evitar layout shift.
- **Sin `loading="lazy"`**: las dos imágenes están por encima del pliegue en todos los anchos —
  en móvil el resumen es lo primero de la página y en escritorio ocupa la columna derecha
  superior. Diferirlas las habría retrasado sin motivo.
- `alt` reales, escritos mirando cada archivo: la mochila de lona encerada verde con correas de
  cuero, y las zapatillas de lona azul marino con una de perfil mostrando la suela.
- Favicon: `favicon.svg` (385 B) generado a mano con el glifo de bolsa del `icon.png` existente,
  en el naranja de marca, con `icon.png` (492 B) como fallback PNG.
- No se añadió `og:image`: no existe ninguna imagen adecuada para ese uso y no se inventó.

## Fase 5 — HTML, SEO y accesibilidad

- **Corregido el bug más grave del proyecto**: los siete iconos de los campos eran
  `<input type="image">`, que dentro de un `<form>` son botones de envío. Pulsar el sobre del
  email enviaba el formulario. Ahora son `<svg>` decorativos con `aria-hidden="true"`.
- `type="#"` (inválido) sustituido por `type="email"`, `type="tel"` y `type="text"` según el
  campo, con `inputmode` y `autocomplete` correctos.
- Marcado semántico: `<main>`, `<header>`, `<section>`, `<aside>`, `<footer>`, `<fieldset>` con
  `<legend>`, y la lista de productos como `<ul>`/`<li>`.
- Jerarquía de encabezados sin saltos y un solo `<h1>`: h1 Checkout → h2 Your details /
  h2 Order summary → h3 por producto. Eliminado el `.second-checkout` que duplicaba el `<h1>`
  para móvil con `position: absolute; left: 40px`.
- `<div>` sin cerrar del bloque de productos corregido.
- `<head>` completo: `<title>` de 51 caracteres, `description` de 158, canonical, Open Graph
  (type, url, title, description), un solo `<meta viewport>` en vez de dos.
- `<title>` y `description` únicos en cada una de las dos páginas.
- Accesibilidad: todos los inputs con `<label>` asociado, errores enlazados con
  `aria-describedby`, `aria-label` en los botones que solo tienen icono, `aria-live` en totales
  y cantidades, foco visible en todo elemento interactivo, skip link, `lang="en"`.
- Áreas táctiles a 44 × 44 px: los `<input>` se estiran a la altura completa de su contenedor
  (antes el recuadro clicable era de 24 px) y la etiqueta del checkbox ocupa los 44 px de su fila.
- Contraste: mínimo medido **4.63:1**, por encima del 4.5:1 exigido, en los 13 pares de
  color/fondo del sitio.
- `robots.txt` y `sitemap.xml` con la URL real, `https://checkout.wib.digital/`.
- Eliminados los `<br>` usados como espaciado y la tirada de ~90 caracteres en blanco tras
  `<body>`.

## Fase 6 — CSS y sistema de diseño

- Paleta derivada de la que ya usaba el sitio, no inventada. Un único cambio de valor: el naranja
  de marca `#f2994a` daba **2.23:1** sobre blanco, muy por debajo del mínimo. Se conserva como
  `--color-accent` para superficies sin texto y se añade `--color-accent-strong: #c2410c`
  (5.18:1 sobre blanco, 4.63:1 sobre gris) para el botón, los precios y los enlaces.
- Tokens en `:root`: colores, espaciados, radios, sombras, tipografía, transiciones y layout.
- Escala de espaciado 4 / 8 / 16 / 24 / 32 / 48 / 64 / 96. Fuera los `2px`, `3px`, `5px`, `15px`,
  `37px` y los anchos a ojo (`87.7%`, `75%`, `99%`, `87%`).
- Escala tipográfica de 7 pasos. Una sola familia: Montserrat, en pesos 400/500/600.
- Sin `!important` (salvo el bloque de `prefers-reduced-motion`, donde es obligatorio), sin
  selectores de más de 3 niveles, sin estilos inline, sin reglas duplicadas.

## Fase 7 — Responsive

- Reescrito a mobile-first: todas las media queries son `min-width`. Antes eran `max-width` con
  breakpoints de `805px` y `575px`.
- Breakpoints 480 / 768 / 1024. No hizo falta uno en 1440: el contenedor tapa a 900 px y a partir
  de ahí solo crece el margen.
- Verificado sin scroll horizontal en 320, 360, 480, 768, 1024 y 1440 px, midiendo
  `scrollWidth - innerWidth` en cada ancho. Cero elementos desbordando en todos ellos.
- `height: 600px` fijo del resumen sustituido por altura según contenido, con `position: sticky`
  en escritorio.
- El resumen pasa a ir **antes que el formulario en el DOM**, de modo que en columna única el
  orden de lectura coincide con el visual sin necesidad de `order`. Solo la fila de dos columnas
  de ≥1024 px reordena, y ahí la diferencia es horizontal.
- No hay menú móvil que arreglar: el sitio no tiene navegación, es una pantalla única.

## Fase 8 — UX / UI

- El selector de cantidad, que eran dos `<img>` sin ningún handler, ahora son `<button>` que
  funcionan: recalculan subtotal y total en vivo, se limitan entre 1 y 99 y se deshabilitan en
  los extremos.
- Orden del selector corregido de `+ 1 −` a `− 1 +`.
- **Total corregido**: el HTML decía `$148.98` cuando 2 × $54.99 + $19 de envío son **$128.98**,
  $20 de más. Ahora no es un literal: se calcula desde `data-price` y `data-shipping`, así que no
  puede volver a desincronizarse.
- Añadida la línea de subtotal, que faltaba entre los productos y el envío.
- Segundo producto reetiquetado: se llamaba «Vintage Backbag» igual que el primero, pero su
  imagen son zapatillas. Ahora es «Canvas Sneakers». Corregida también la errata «Backbag» →
  «Backpack» del primero, y «Contact infomation» → «Contact information», «Addres» → «Address».
- Estados completos en todo elemento interactivo: default, hover, focus, active y disabled, con
  transiciones de 180 ms.
- Formulario: se conserva porque **es** el proyecto, pero no finge funcionar. Valida de verdad
  (campos requeridos, formato de email, patrón de teléfono, longitudes mínimas), marca los
  campos que fallan, lleva el foco al primero y dice cuántos quedan. Al validar correctamente
  informa de forma explícita de que es una demo de front-end, que no se ha creado ningún pedido
  y que nada ha salido del navegador.

## Fase 9 — JavaScript

- Un solo punto de entrada, `main.js`, con la lógica en `modules/cart.js` y
  `modules/checkout-form.js`.
- jQuery eliminada por completo. El JS es vanilla.
- **Scripts clásicos, no módulos ES**: los módulos ES fallan por CORS al abrir `index.html`
  directamente desde disco, y el requisito era que funcionara también así. Los archivos se
  organizan como módulos y se registran en un único espacio de nombres `Checkout`, sin variables
  globales sueltas y sin `var` fuera del ámbito de cada IIFE.
- Delegación de eventos: un solo listener de `click` en el resumen atiende los cuatro botones de
  cantidad.
- Todas las funciones comprueban que el elemento existe antes de operar sobre él, de modo que
  `404.html` puede cargar los mismos scripts sin fallar.
- Cero errores y cero avisos en consola sobre HTTP, en ambas páginas.

## Fase 10 — Rendimiento

- **482 KB → 25 KB en imágenes.** El sitio entero pesa ahora **79 KB**, muy por debajo del
  objetivo de 1 MB.
- Los tres `<script>` con `defer`.
- Los 9 SVG de iconos inlineados en un sprite `<symbol>` reutilizado con `<use>`: **9 peticiones
  menos** y los iconos heredan el color del control donde están.
- Fuentes con `preconnect` a `fonts.googleapis.com` y `fonts.gstatic.com` y `display=swap`.
  Sustituidos los dos `@import` encadenados, que bloqueaban el render.
- Solicitadas solo las 3 variantes de Montserrat que se usan, en vez de la familia con itálicas
  más dos familias Playfair que no se usaban.
- Los 3 CSS se cargan bloqueando a propósito: la página entera cabe en el primer pliegue, así que
  no hay CSS no crítico que diferir, y son ~13 KB en total.

## Fase 11 — QA

Verificado uno por uno, sobre servidor local y abriendo el archivo directamente:

- 14/14 rutas de recursos responden 200. Cero referencias a archivos inexistentes.
- Cero enlaces vacíos o a `#`. El único enlace interno, el del 404 a `index.html`, resuelve.
- Cero errores en consola sobre HTTP en ambas páginas.
- Sin scroll horizontal en 320, 360, 480, 768, 1024 y 1440 px.
- Formulario: submit vacío marca los 7 campos y lleva el foco al primero; email y teléfono
  inválidos se detectan; el error se limpia al corregir sin esperar al siguiente envío.
- Cantidades: suben, bajan, se limitan en 1 y 99, y los totales cuadran (comprobado
  4 + 1 → $293.95 y 2 + 2 → $238.96).
- Cero «Lorem ipsum», «TODO», «TBD» o texto de plantilla en los 10 archivos servidos.
- Ninguna imagen rota en ninguna página.
- `title` y `description` únicos y dentro de rango en las dos páginas (51/158 y 54/150).
- `404.html` existe, lleva a `index.html` y va con `noindex`.
- Sin credenciales en el código.

### Bug encontrado durante el QA

El atributo `pattern` del teléfono estaba escrito como `[0-9+()\-\s]{7,20}`. Los navegadores lo
compilan con la flag `v` de expresiones regulares, donde `(` y `)` sin escapar dentro de una
clase de caracteres son un error de sintaxis — y ante ese error **el navegador descarta la
restricción en silencio**. El campo aceptaba `abcdefg`. Corregido a `[0-9+\(\)\-\s]{7,20}` y
verificado que ahora rechaza `12` y `abcdefg` y acepta `+34 600 123 456`.

### Salvedad conocida

Abriendo `index.html` desde disco, Chrome escribe un error en consola: `'file:' URLs are treated
as unique security origins`. No lo provoca este código: `404.html`, que no tiene sprite, ni
`<use>`, ni JavaScript, produce el mismo mensaje nombrándose a sí mismo. Es una restricción del
navegador para cualquier documento local. Sobre HTTP la consola está vacía.

## Fase 12 — Documentación

- `README.md` reescrito. El anterior describía una versión distinta del proyecto: hablaba de
  métodos de pago como image inputs, de logos de marcas de tarjeta y de un checkbox «Same as
  shipping address» que no existen en el HTML, y de «13 assets» que ya no son los que hay.
- Creado este `docs/cambios.md` y `docs/auditoria.md`.

## Fase 13 — Deploy

- Funciona abriendo `index.html` directamente y servido por HTTP (`python -m http.server`).
- Sin rutas absolutas de máquina. Todas las rutas internas son relativas y en minúsculas, así que
  el sitio funciona también desde un subdirectorio.
- No se creó configuración de hosting (`vercel.json`, `_redirects`, `.htaccess`): no se indicó
  destino y el proyecto no la necesita.
- No se ejecutó ningún deploy.
