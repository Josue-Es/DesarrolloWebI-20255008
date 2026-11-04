# Guía de Laboratorio Nº 6 — Desarrollo Web I

**Carné:** 20255008  
**Tema:** Funciones y eventos en JavaScript  
**Base:** Guía 06.pdf (34 páginas) y RecursosGuia6.zip entregados por el docente.

## Navegación

- `index.html`: Parte I — estructuras de control y arreglos.
- `indexFunciones.html`: Parte II — funciones y eventos.
- `pages/validaciones.html`: ejercicio complementario 3.

## Ejercicios de la guía

| Páginas | Ejercicio | Archivo HTML | JavaScript |
|---|---|---|---|
| 7–8 | Índice de estructuras de control | `index.html` | — |
| 9–11 | Arreglos multidimensionales | `pages/registroAcademico.html` | `js/registroAcademico.js` |
| 12–13 | Estructuras de control | `pages/tablasMultiplicar.html` | `js/tablasMultiplicar.js` |
| 14–16 | Estructuras anidadas | `pages/promedioNotas.html` | `js/promedioNotas.js` |
| 16–18 | Arreglos | `pages/arreglo.html` | `js/arreglo.js` |
| 19–21 | Índice de funciones | `indexFunciones.html` | — |
| 21–22 | Recursividad | `pages/recursividad.html` | `js/recursividad.js` |
| 23–26 | Crear tabla con funciones | `pages/tabla.html` | `js/tabla.js` |
| 26–33 | Formulario de pacientes | `pages/formulario.html` | `js/formulario.js` |
| 34 | Editar/eliminar y LocalStorage | `pages/formulario.html` | `js/formulario.js` |
| 34 | Expresiones regulares | `pages/validaciones.html` | `js/validaciones.js` |

## Cómo ejecutar

Abrir `index.html` en un navegador o usar Live Server de Visual Studio Code.
Para probar LocalStorage, utilizar un origen estable (Live Server o GitHub Pages).

## Ejercicio complementario 3 — Investigación

Las expresiones regulares representan patrones de caracteres. En JavaScript, `patron.test(texto)`
comprueba si el texto cumple el patrón. Se utilizan `^` y `$` para exigir coincidencia completa;
`\d` para dígitos, `[A-Za-z]` para letras y `{n}` para una cantidad exacta.

Patrones utilizados en `js/validaciones.js`:

- Carnet: dos letras seguidas de tres dígitos.
- Nombre completo: al menos dos palabras con letras, incluidos acentos y ñ.
- DUI: ocho dígitos, guion y un dígito.
- NIT: cuatro, seis, tres y un dígito separados por guiones.
- Fecha: día/mes/año con dos, dos y cuatro dígitos, más comprobación de fecha real.
- Correo: caracteres antes y después de `@`, con punto en el dominio.
- Edad: uno o más dígitos.

**Alcance:** se verifica el formato de DUI/NIT y correo, no la existencia de documentos ni
la disponibilidad real de una dirección de correo. La guía pide validación de formato.

## Notas sobre la implementación

Se conservan las carpetas Bootstrap, CSS, imágenes y páginas suministradas. Los ejemplos
se desarrollaron en el orden de la guía, con ciclos, arreglos, funciones, eventos y DOM.
Se agregaron validaciones básicas para evitar entradas vacías o incorrectas.
La guía muestra algunas secciones de JavaScript únicamente como capturas de código;
se implementa la lógica visible y el comportamiento solicitado sin afirmar reproducción literal.

## Comprobaciones recomendadas

1. Registrar y mostrar dos estudiantes.
2. Generar la tabla del 10 y rechazar valores negativos.
3. Registrar notas y verificar el promedio.
4. Agregar números negativos y positivos; comprobar orden numérico.
5. Comprobar factorial de 0 y 5.
6. Crear tabla de 2 filas y 3 columnas.
7. Registrar, editar, eliminar y recargar para comprobar persistencia de pacientes.
8. Agregar un país nuevo.
9. Validar una ficha correcta e intentar los siete formatos incorrectos.
