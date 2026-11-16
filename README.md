# ChinChin 🥂

PWA personal para registrar bebidas y guardar notas de cata. Está hecha con React, JavaScript, Vite, CSS y Supabase.

## Desarrollo

```sh
npm install
npm run dev
```

Sin variables de entorno la app funciona en modo local usando `localStorage`, incluyendo los datos y fotos del dispositivo. Para persistir en Supabase, copiá `.env.example` a `.env`, completá la URL, la clave publishable (`sb_publishable_…`) y el bucket, y ejecutá `supabase/schema.sql` en el SQL Editor del proyecto. Luego reiniciá Vite.

```sh
npm run build
npm run preview
```

La compilación produce el manifest y el service worker. Publicá el sitio bajo HTTPS para instalarlo en Android. Las imágenes de OFF y Supabase Storage se guardan en caché al visitarlas. La última colección y sus calificaciones se mantienen en una copia local para consulta sin conexión.

## Publicar en GitHub Pages

El workflow `.github/workflows/deploy.yml` construye y publica `dist` automáticamente cada vez que se actualiza `main`. Para este repositorio, la URL esperada es `https://felipegonzalez2112.github.io/copometro/`. El build detecta el nombre del repositorio desde GitHub Actions y agrega el prefijo `/copometro/`; en local conserva `/`.

1. En GitHub abrí **Settings → Pages** y elegí **GitHub Actions** en **Build and deployment → Source**.
2. Hacé push a `main` o ejecutá manualmente **Actions → Deploy ChinChin to GitHub Pages → Run workflow**.
3. Esperá que termine el workflow y abrí la URL que aparece en el paso `Deploy to GitHub Pages`.

La publicación funciona sin configurar Supabase, pero en ese caso los datos quedan guardados en el navegador de cada dispositivo. Para sincronizar mediante Supabase, creá estas variables del repositorio en **Settings → Secrets and variables → Actions → Variables**: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` y, opcionalmente, `VITE_SUPABASE_BUCKET` (por defecto `drink-images`). Después volvé a ejecutar el workflow. Nunca agregues `service_role` ni una clave `sb_secret_…` a las variables del cliente.

La búsqueda de productos desde GitHub Pages necesita la función pública `search-products`, porque Search-a-licious no permite lecturas desde otro origen en el navegador. Con Supabase CLI instalado, iniciá sesión, enlazá el proyecto y desplegá la función:

```sh
supabase login
supabase link --project-ref TU_PROJECT_REF
supabase functions deploy search-products
```

Después agregá `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` a **Settings → Secrets and variables → Actions → Variables** y volvé a ejecutar el workflow de Pages. La función no usa la clave `service_role`; solo reenvía la búsqueda a Open Food Facts y permite CORS para la web publicada y localhost. Sin proyecto/variables de Supabase, el formulario manual sigue disponible y la búsqueda avisa cómo habilitarse.

## Persistencia y privacidad

La clave publishable de Supabase se puede incluir en el cliente; nunca agregues una `service_role` ni una clave `sb_secret_…` a `.env` de Vite. Sin autenticación, Supabase identifica al cliente como `anon`. Por eso las políticas de ejemplo de `schema.sql` habilitan acceso de lectura y escritura para `anon`: cualquiera que conozca la URL pública y la clave publishable podría acceder a esos datos. Esas políticas cumplen el uso personal sin login, pero **no vuelven privada la base**. Para mantener la colección privada, dejá Supabase sin configurar y usá el modo local; si se requiere sincronización remota privada, hará falta autenticación o un backend con autorización.

La búsqueda externa consulta la API de texto completo Search-a-licious de Open Food Facts; no bloquea el alta si no hay conexión o no encuentra coincidencias. El catálogo remoto puede traer datos incompletos y la app solo precompleta campos que efectivamente llegaron en la respuesta.
