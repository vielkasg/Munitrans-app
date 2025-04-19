# Munitrans - Sistema de Gestión de Transporte Municipal

Aplicación móvil desarrollada con Ionic + Vue.js para la gestión del transporte público y permisos especiales de circulación en Santiago de los Caballeros.

## Funcionalidades principales

- Inicio de sesión para usuarios autenticados.
- Escaneo de permisos mediante código QR.
- Registro de multas con detalles del vehículo y evidencia fotográfica.
- Consulta de multas, recaudaciones, franjas y rutas.
- Pruebas automatizadas con **Cypress**.

## Tecnologías utilizadas

- [Ionic Framework](https://ionicframework.com/)
- [Vue 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Cypress](https://www.cypress.io/) + Mochawesome (para reportes)
- [Capacitor](https://capacitorjs.com/) para funcionalidades nativas

## Instalación y ejecución local

### 1. Clonar el repositorio

-bash
git clone https://github.com/vielkasg/Munitrans-app.git
cd Munitrans-app

2. Instalar dependencias
-bash
npm install

3. Ejecutar en desarrollo
-bash
npm run dev
La app se ejecutará en: http://localhost:5173

*USUARIO PARA PODER INGRESAR A LA APLICACION: vsanchez
CLAVE: VSG0515*

*Asegúrate de tener la API corriendo en paralelo.*

Ejecutar pruebas automatizadas

Para abrir el entorno visual de pruebas Cypress:
-bash
npx cypress open

O para ejecutar pruebas y generar reportes:
-bash
npx cypress run

Los resultados estarán en tests/e2e/screenshots y tests/e2e/videos.
