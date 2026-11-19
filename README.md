# ChinChin 🍸

PWA sencilla y moderna para recomendar tragos y cócteles según los ingredientes y bebidas que tenés disponibles en casa, consumiendo la API pública de [24cocktails](https://24cocktails.com/developers.html).

Es un sitio estático construido con HTML5, CSS y JavaScript Vanilla (sin frameworks ni dependencias pesadas).

## Funcionalidades

- **Mis ingredientes:**
  - Buscador con autocompletado en vivo de licores, mezcladores y botellas.
  - Explorador por categorías: *Frecuentes, Espirituosas, Licores & Aperitivos, Mezcladores, Frutas & Cítricos, Básicos & Especias*.
  - Etiquetas con eliminación individual y persistencia local en el navegador (`localStorage`).
  - Botón "Buscar tragos".
- **Resultados Claros y Priorizados:**
  - **Identificación visual de ingredientes:** Cada tarjeta y receta muestra claramente qué ingredientes tenés (`✓ Tenés`) y cuáles te faltan (`✕ Falta`), **priorizando y listando primero los que ya tenés en tu barra**.
  - **Pestañas organizadas:** Alternar entre *Podés preparar* y *Te falta 1 ingrediente*.
  - **Filtros avanzados:** Filtrar por bebida alcohólica base (Gin, Vodka, Ron, etc.), buscador rápido por nombre, y filtro por ingrediente faltante.
  - **Botón `+ Tengo esto`:** Si ves un trago al que le falta un ingrediente y lo tenés en casa, lo sumás con un solo toque y se recalcula la búsqueda al instante.
- **Detalle del trago:**
  - Medidas exactas, tipo de vaso, graduación alcohólica, método, guarnición, instrucciones paso a paso y enlace a la receta original en 24cocktails.com.
- **Favoritos & Calificaciones:**
  - Guardá tus cócteles favoritos con un botón de corazón.
  - Calificá si te gustó o no (👍 / 👎), puntuá de 1 a 5 estrellas ⭐ y agregá notas o comentarios personales.
  - Sección dedicada **"Favoritos"** que te indica en tiempo real si podés preparar cada trago hoy con los ingredientes actuales de tu barra.
- **PWA & Temas:**
  - Shell offline con Service Worker.
  - Tema claro / oscuro / sistema con paleta sobria grafito y salvia.

## Ejecutar en local

Desde la carpeta del proyecto:

```sh
python3 -m http.server 5173 --directory site
```

Abrí `http://localhost:5173` en tu navegador.

## GitHub Pages

El workflow `.github/workflows/deploy.yml` publica automáticamente el contenido de `site/` al actualizar la rama `main`.
