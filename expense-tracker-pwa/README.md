# ExpenseTracker PWA

ExpenseTracker es una Progressive Web App para registrar gastos personales con una experiencia mobile-first equivalente a la versión móvil.

## Incluye

- Pantalla de bienvenida con resumen del total y cantidad de movimientos
- Listado de gastos con navegación por detalle
- Modal bottom-sheet para registrar nuevos gastos
- Bottom navigation estilo app nativa
- Tema oscuro
- Pantallas de inicio de sesión, registro y verificación de recuperación
- Menú de usuario con perfil, acceso a gastos y cierre de sesión
- Manifest para instalación en Android/iOS
- Service worker con cache offline mediante Vite PWA

## Autenticación de demostración

El inicio de sesión, el registro y la recuperación son una demostración del frontend: las cuentas solo se mantienen en memoria mientras la app está abierta. Después de registrarse, se vuelve al inicio de sesión. Los códigos de recuperación se simulan y se muestran en pantalla; no se envían correos ni SMS ni se restablece una contraseña. No uses contraseñas reales en esta versión.

Para habilitar autenticación persistente y recuperación real, conectar un backend o proveedor de autenticación con envío de correo/SMS antes de publicar.

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
