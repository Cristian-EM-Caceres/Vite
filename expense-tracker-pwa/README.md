# ExpenseTracker PWA

ExpenseTracker es una Progressive Web App para registrar gastos personales con una experiencia mobile-first equivalente a la versión móvil.

## Incluye

- Pantalla de bienvenida con resumen del total y cantidad de movimientos
- Listado de gastos con navegación por detalle
- Modal bottom-sheet para registrar nuevos gastos
- Bottom navigation estilo app nativa
- Manifest para instalación en Android/iOS
- Service worker con cache offline mediante Vite PWA

## Scripts

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`

## PWA notes

- El manifest está en `public/manifest.json`
- Los íconos de instalación se encuentran en `public/icons/`
- La app usa `vite-plugin-pwa` para registrar el worker y cachear recursos estáticos

## Publicación

Para publicar esta app en HTTPS, se puede desplegar en Vercel, Netlify o cualquier hosting compatible con SPA. Asegurarse de configurar rutas con fallback a `index.html`.
