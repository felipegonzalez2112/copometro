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

## Persistencia y privacidad

La clave publishable de Supabase se puede incluir en el cliente; nunca agregues una `service_role` ni una clave `sb_secret_…` a `.env` de Vite. Sin autenticación, Supabase identifica al cliente como `anon`. Por eso las políticas de ejemplo de `schema.sql` habilitan acceso de lectura y escritura para `anon`: cualquiera que conozca la URL pública y la clave publishable podría acceder a esos datos. Esas políticas cumplen el uso personal sin login, pero **no vuelven privada la base**. Para mantener la colección privada, dejá Supabase sin configurar y usá el modo local; si se requiere sincronización remota privada, hará falta autenticación o un backend con autorización.

La búsqueda externa consulta Open Food Facts; no bloquea el alta si no hay conexión o no encuentra coincidencias. El catálogo remoto puede traer datos incompletos y la app solo precompleta campos que efectivamente llegaron en la respuesta.
