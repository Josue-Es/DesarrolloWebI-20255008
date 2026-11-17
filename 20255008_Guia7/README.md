# Guía 7 — DOM | Desarrollo Web I

Proyecto basado en los recursos originales proporcionados por ESEN. Carné: 20255008.

## Abrir el proyecto

Abrir la carpeta `Guia7_20255008` en Visual Studio Code y ejecutar `index.html` con Live Server. Desde la página principal se accede a los cuatro ejemplos adicionales y al explorador de fútbol.

## Parte III — Desarrollo de la práctica (50 %)

- `index.html` + `js/index.js`: contar elementos HTML.
- `pages/ejemplo1.html` + `js/ejemplo1.js`: crear controles dinámicos con DOM.
- `pages/ejemplo2.html` + `js/ejemplo2.js`: recorrer y contar controles.
- `pages/ejemplo3.html` + `js/ejemplo3.js`: manipular estilos y tamaños.
- `pages/ejemplo4.html` + `js/ejemplo4.js`: crear contenedor y clonar menú, títulos y párrafos.

## Parte IV — Ejercicios complementarios (50 %)

1. `pages/ejemplo2.html` + `js/validacion.js`: valida campos obligatorios, fecha no futura, correo con expresión regular, contraseñas coincidentes, intereses, carrera y país. Después genera una tabla mediante `createElement`, `append` y `textContent` dentro de un modal Bootstrap, sin usar `innerHTML`. Por seguridad no muestra contraseñas.
2. `pages/futbol.html` + `js/futbol.js`: TeamBase en RapidAPI. Usa `GET /team?search=...` para buscar equipos y `GET /team?id=...` para obtener sus detalles, con Fetch, async/await, estados de carga y errores. El proveedor puede devolver solo una parte de los equipos. La clave personal se introduce en el navegador durante pruebas locales y nunca se guarda en archivos.

## API y funcionamiento

La aplicación consulta TeamBase en RapidAPI. La búsqueda de equipos utiliza `GET /team?search=...`; al seleccionar un equipo se solicita `GET /team?id=...`. Si la segunda solicitud falla, se presentan los datos ya obtenidos en la búsqueda inicial. También se incorpora la consulta de ligas con `GET /leagues`, cuyo funcionamiento debe comprobarse en RapidAPI, ya que la ruta exacta no fue proporcionada en el código de ejemplo del proveedor.

La clave se introduce durante la ejecución y no se incluye en los archivos. En una publicación de producción debe utilizarse un servidor intermediario para proteger las credenciales. No se deben publicar claves en GitHub.

## Comprobaciones

Abrir con Live Server. Probar las funciones de DOM, las siete validaciones del formulario, la creación de la tabla mediante DOM, la búsqueda de equipos, la selección de detalles y la consulta de ligas. Las respuestas HTTP dependen de la disponibilidad del proveedor.
