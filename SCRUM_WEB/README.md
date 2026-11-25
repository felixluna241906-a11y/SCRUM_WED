# SCRUM PLANING — Inicio de Sesión (React + TSX + Tailwind CSS)
Integrantes 
1.Hellen Barrera 
2.Felix Luna
Proyecto web completo para **SCRUM PLANING** construido con **React**, **TypeScript (`.tsx`)**, **Vite** y **Tailwind CSS**, diseñado con fondos claros, degradados suaves, logotipo propio, eslogan, validación de entradas y sistema de notificaciones **Toast**.

## Estructura del proyecto

- `index.html`: Documento principal con el título **SCRUM PLANING** y favicon vectorial.
- `src/components/BrandLogo.tsx`: Logotipo vectorial propio (**SCRUM PLANING**) y eslogan (*"Planifica tus sprints con claridad, impulsa cada entrega."*).
- `src/components/LoginForm.tsx`: Formulario de inicio de sesión con validación de correo electrónico o usuario y contraseña, botón para ver/ocultar contraseña, indicadores de requisitos, persistencia opcional de usuario (`localStorage`) y botón de datos de ejemplo.
- `src/pages/LoginPage.tsx`: Pantalla principal con fondos claros, degradados suaves y vista de resumen tras iniciar sesión.
- `src/context/ToastContext.tsx` y `src/components/ui/ToastContainer.tsx`: Sistema de notificaciones Toast (`success`, `error`, `warning`, `info`) con barra de progreso y cierre manual.
- `src/utils/validation.ts`: Reglas de validación para correo electrónico, nombre de usuario y contraseña.
- `src/types/auth.ts`: Interfaces TypeScript para el formulario y el usuario autenticado.

## Cómo ejecutarlo

Requiere tener instalado **Node.js** (v18 o superior) y **npm**:

```bash
npm install
npm run dev
```

Para verificar tipos y compilar para producción:

```bash
npm run build
```
