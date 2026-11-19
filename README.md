# ChinChin 🍸

PWA sencilla y moderna para recomendar tragos y cócteles según los ingredientes y bebidas que tenés disponibles en casa, consumiendo la API pública de [24cocktails](https://24cocktails.com/developers.html).

Es un sitio estático construido con HTML5, CSS y JavaScript Vanilla (sin frameworks ni dependencias pesadas).

## Funcionalidades

- **Mis ingredientes:**
  - Buscador para agregar cualquier bebida o ingrediente.
  - Selección rápida de ingredientes frecuentes: *Gin, Vodka, Ron, Whisky, Fernet, Tequila, Lima, Limón, Naranja, Coca-Cola, Tónica y Soda*.
  - Etiquetas con eliminación individual y persistencia local en el navegador (`localStorage`).
  - Botón "Buscar tragos".
- **Resultados:**
  - **Podés preparar:** Tragos que podés hacer con los ingredientes disponibles, con nombre, fotografía, graduación alcohólica (ABV), tiempo de preparación e ingredientes.
  - **Te falta un ingrediente:** Tragos a los que solo les falta un ingrediente específico, destacando cuál falta.
- **Detalle del trago:**
  - Pantalla con fotografía, nombre, tipo de vaso, graduación alcohólica, tiempo, método, medidas e ingredientes exactos, instrucciones de preparación paso a paso y enlace a la receta completa original en 24cocktails.com.
- **PWA & Temas:**
  - Modo sin conexión para el shell de la aplicación.
  - Tema claro / oscuro / sistema con paleta sobria grafito y salvia.

## Ejecutar en local

Desde la carpeta del proyecto:

```sh
python3 -m http.server 5173 --directory site
```

Abrí `http://localhost:5173` en tu navegador.

## GitHub Pages

El workflow `.github/workflows/deploy.yml` publica automáticamente el contenido de `site/` al actualizar la rama `main`.
