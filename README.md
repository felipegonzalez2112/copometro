# ChinChin 🥂

PWA personal para guardar bebidas y notas de cata. Es un sitio estático hecho con HTML, CSS y JavaScript: no necesita Node, React, una base remota ni una cuenta.

## Ejecutar en local

Desde la carpeta del proyecto:

```sh
python3 -m http.server 5173 --directory site
```

Abrí `http://localhost:5173`. Para probar la instalación y el modo sin conexión, usá HTTPS o `localhost`.

## Uso y datos

- Agregá bebidas manualmente y elegí una foto de la galería.
- Guardá, editá o eliminá las calificaciones desde el detalle.
- La colección se guarda en el almacenamiento local del navegador de ese dispositivo.
- El tema sigue la apariencia del sistema por defecto; también podés elegir claro u oscuro manualmente.
- Las fotos se reducen antes de guardarse. Si el navegador se queda sin espacio, mostrará un aviso.
- No hay sincronización entre dispositivos ni búsqueda externa de productos.
- La PWA guarda sus archivos para abrir la aplicación sin conexión. Los datos quedan en el propio navegador.

## GitHub Pages

El workflow `.github/workflows/deploy.yml` publica el contenido de `site/` al actualizar `main`. En **Settings → Pages**, elegí **GitHub Actions** como fuente. La aplicación funciona bajo la ruta del repositorio, por ejemplo `https://felipegonzalez2112.github.io/copometro/`.

En Android, abrí la web publicada en Chrome y elegí **Instalar aplicación** o **Agregar a pantalla de inicio** desde el menú del navegador. La colección no se sincroniza al cambiar de dispositivo.
