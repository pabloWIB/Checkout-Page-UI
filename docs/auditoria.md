# Auditoría — Checkout Page UI

Fecha: 2026-07-30
Estado inicial: proyecto estático de una sola página, sin build, sin dependencias npm.

---

## 1.1 Inventario

### Archivos HTML

| Archivo | `<title>` | `<h1>` | Propósito real | Estado |
|---|---|---|---|---|
| `index.html` | `Checkout Page` | `Checkout` | Pantalla de checkout: datos de contacto, dirección de envío y resumen de pedido | Único archivo del sitio. 136 líneas |

No existía `404.html`.

### Archivos CSS

| Archivo | Peso | Líneas | ¿Se carga? | Observaciones |
|---|---|---|---|---|
| `CSS/normalize.css` | 6.5 KB | 357 | Sí | normalize.css v8.0.1 sin modificar salvo un bloque `html, body { height:100%; margin:0 }` añadido a mano |
| `CSS/styles.css` | 4.7 KB | 332 | Sí | Todos los estilos del proyecto |
| `CSS/fonts.css` | 357 B | 7 | Sí | Solo dos `@import` de Google Fonts, uno duplicado del otro |

### Archivos JS

| Archivo | Peso | Líneas | ¿Se carga? | Observaciones |
|---|---|---|---|---|
| `JS/script.js` | 907 B | 50 | Sí | **Huérfano funcional**: ninguno de sus selectores existe en el HTML |

### Imágenes

| Archivo | Formato | Dimensiones | Peso | ¿Referenciada? | Observaciones |
|---|---|---|---|---|---|
| `IMG/favicon.png` | PNG | 1024 × 1024 | 207 KB | Sí (`<link rel="icon">`) | 207 KB para un favicon de 16px. Icono genérico azul/verde, ajeno a la identidad naranja del sitio |
| `IMG/photo1.png` | PNG | 269 × 273 | 136 KB | Sí | Fotografía de mochila de lona encerada. PNG usado para una foto |
| `IMG/photo2.png` | PNG | 269 × 273 | 132 KB | Sí | Fotografía de zapatillas de lona. PNG usado para una foto |
| `IMG/icon.png` | PNG | 48 × 48 | 492 B | **No** | Huérfano. Glifo de bolsa de compra en negro |
| `IMG/account.svg` | SVG | 48 × 48 vb | 896 B | Sí | Icono Material Symbols |
| `IMG/call.svg` | SVG | 48 × 48 vb | 515 B | Sí | Icono Material Symbols |
| `IMG/globe.svg` | SVG | 48 × 48 vb | 562 B | Sí | Icono Material Symbols |
| `IMG/home.svg` | SVG | 48 × 48 vb | 218 B | Sí | Icono Material Symbols |
| `IMG/location.svg` | SVG | 48 × 48 vb | 368 B | Sí | Icono Material Symbols |
| `IMG/mail.svg` | SVG | 48 × 48 vb | 284 B | Sí | Icono Material Symbols |
| `IMG/postal.svg` | SVG | 48 × 48 vb | 281 B | Sí | Icono Material Symbols |
| `IMG/plus.svg` | SVG | 48 × 48 vb | 159 B | Sí (×2) | Icono Material Symbols |
| `IMG/minus.svg` | SVG | 48 × 48 vb | 128 B | Sí (×2) | Icono Material Symbols |

Peso total de imágenes: **482 KB**, de los cuales **475 KB** son tres PNG.

### Dependencias externas

| Dependencia | Origen | ¿Se usa? |
|---|---|---|
| jQuery 3.0.0-beta1 slim | `cdnjs.cloudflare.com` | **No**. Cargada para `script.js`, cuyos selectores no existen |
| Montserrat | `fonts.googleapis.com` vía `@import` | Sí, en todo el sitio |
| Playfair Display | `fonts.googleapis.com` vía `@import` | **No**. Importada, nunca aplicada |
| Playfair Display SC | `fonts.googleapis.com` vía `@import` | **No**. Importada, nunca aplicada |

### Archivos basura

Ninguno. No había `.bak`, `node_modules`, `.DS_Store`, `Thumbs.db` ni copias versionadas en el nombre.

---

## 1.2 Problemas detectados

### Bloqueantes

| # | Problema | Ubicación | Detalle |
|---|---|---|---|
| B1 | Los iconos de los campos son botones de envío | `index.html` 23, 28, 34, 39, 44, 51, 58 | `<input type="image">` dentro de un `<form>` **envía el formulario al hacer clic**. Siete iconos decorativos actuaban como submit |
| B2 | `type="#"` no es un tipo de input válido | `index.html` 24, 29, 35, 40, 45, 52, 59 | El navegador cae a `text`. Sin teclado adecuado en móvil, sin validación de email ni teléfono |
| B3 | `<div>` sin cerrar | `index.html` 78-109 | El primer `.products` nunca se cierra antes de abrir el segundo. El árbol lo repara el navegador, no el marcado |
| B4 | JS completamente muerto | `JS/script.js` | 6 handlers sobre `.1`, `.over`, `.cont-section-1`, `.cont-section-2`, `.cont-section-3`: **ninguna de esas clases existe** en el HTML. Es código de otro proyecto |
| B5 | jQuery beta cargada sin uso | `index.html` 11 | 3.0.0-beta1, una versión beta en producción, para ejecutar código muerto |

### Contenido y datos

| # | Problema | Detalle |
|---|---|---|
| C1 | Total incorrecto | 2 × $54.99 + $19 de envío = **$128.98**. El HTML dice **$148.98**, $20 de más |
| C2 | Segundo producto mal etiquetado | Ambos productos se llaman «Vintage Backbag». La imagen del segundo son zapatillas, no una mochila |
| C3 | Falta subtotal | El resumen salta de «Shipping» a «Total» sin línea de subtotal |
| C4 | Selector de cantidad inerte | Los `+` / `−` son `<img>` sin handler. No cambian nada |
| C5 | Erratas visibles | «Contact infomation», «Addres», «Backbag» |
| C6 | Orden invertido | El selector muestra `+ 1 −`. La convención es `− 1 +` |

### SEO / cabecera

| # | Problema |
|---|---|
| S1 | `<meta name="viewport">` duplicado (líneas 5 y 6) |
| S2 | `<title>` de 13 caracteres, muy por debajo del rango útil de 50-60 |
| S3 | Sin `<meta name="description">` |
| S4 | Sin Open Graph |
| S5 | Sin `<link rel="canonical">` |
| S6 | Sin `robots.txt` ni `sitemap.xml` |
| S7 | Scripts en `<head>` sin `defer`, bloqueando el render |

### Accesibilidad

| # | Problema |
|---|---|
| A1 | Sin `<main>`, `<header>`, `<footer>`, `<section>`. Todo son `<div>` |
| A2 | Dos `<h1>` visualmente: `.main h1` y `.second-checkout h2`, alternados por media query |
| A3 | `<img>` de productos y de `+`/`−` con `alt=""` en elementos no decorativos |
| A4 | Sin estado `:focus-visible` en ningún elemento interactivo |
| A5 | Contraste insuficiente: `#F2994A` sobre blanco = **2.23:1**; texto blanco sobre botón `#F2994A` = **2.23:1**. Mínimo exigido 4.5:1 |
| A6 | `<input type="submit" placeholder="Continue">` — `placeholder` no aplica a `submit`, el botón se renderiza con el texto por defecto «Submit» |
| A7 | Áreas táctiles de `+`/`−` de 20 × 20 px. Mínimo 44 × 44 |
| A8 | `lang="en"` correcto, pero `<h2>` como encabezado de sección sin `<section>` que encabezar |

### CSS

| # | Problema | Ubicación |
|---|---|---|
| E1 | Declaración inválida `position: ;` | `styles.css` 82 |
| E2 | Regla vacía `.products-specification {}` | `styles.css` 197 |
| E3 | Regla muerta `.checkbox-class p` | `styles.css` 100. No hay `<p>` dentro de `.checkbox-class` |
| E4 | `bottom: 4px` sin `position` | `styles.css` 90. No hace nada |
| E5 | `display: flex` declarado dos veces en la misma regla | `styles.css` 232 y 236 |
| E6 | Anchos en porcentajes arbitrarios | `87.7%`, `75%`, `99%`, `90%`, `87%` — parcheados a ojo |
| E7 | `height: 600px` fijo en `.main2` | El contenido desborda o deja hueco según el número de productos |
| E8 | Media queries `max-width` | Desktop-first, contra la regla mobile-first |
| E9 | Breakpoints arbitrarios | `805px` y `575px` |
| E10 | Sin variables CSS | Cada color y cada fuente repetidos literalmente. `font-family: Montserrat` aparece 11 veces |
| E11 | Espaciados fuera de escala | `2px`, `3px`, `5px`, `15px`, `50px` mezclados sin sistema |
| E12 | `.second-checkout` en `position: absolute` con `left: 40px` | Título móvil clavado a coordenadas fijas |

### Marcado

| # | Problema |
|---|---|
| M1 | `<body><br><br>` seguido de ~90 caracteres de espacios y tabuladores en blanco |
| M2 | `<br>` usados como espaciado vertical en 4 sitios |
| M3 | Indentación mezclada: tabuladores, espacios y sangrías huérfanas heredadas del editor |
| M4 | `.second-checkout` duplica el `<h1>` para móvil en vez de estilarlo |

### Enlaces, rutas y credenciales

- **Enlaces rotos:** ninguno. El sitio no tiene un solo `<a>`.
- **Imágenes rotas:** ninguna. Las 12 rutas referenciadas existen en disco.
- **CSS/JS referenciados inexistentes:** ninguno.
- **Credenciales, tokens o API keys:** **ninguna**. Revisado `index.html`, `script.js` y los tres CSS.
- **Contenido de plantilla:** no hay «Lorem ipsum». El contenido de relleno real es `JS/script.js` completo, importado de otro proyecto.

---

## 1.3 Resumen

Es una pantalla de checkout estática de una sola página: formulario de contacto y envío a la
izquierda, resumen del pedido a la derecha, sin backend ni estado de carrito.

Visualmente estaba terminada y era razonable; por dentro no. Lo más grave, en orden: los siete
iconos de los campos eran `<input type="image">`, es decir **botones de envío disfrazados de
decoración** — pulsar el sobrecito del email enviaba el formulario. Detrás de eso, 50 líneas de
jQuery importadas de otro proyecto que no tocaban un solo elemento de esta página, y una beta de
jQuery cargada desde CDN para ejecutarlas. El total del pedido estaba mal calculado ($148.98 en
vez de $128.98) y el naranja de marca no alcanzaba el contraste mínimo en ningún sitio donde se
usaba como texto o como fondo de botón.
