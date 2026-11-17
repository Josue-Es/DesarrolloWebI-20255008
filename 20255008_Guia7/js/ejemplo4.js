// Ejemplo 5: construir y clonar elementos HTML.
const pagina = document.getElementById('idPagina');
let contenedor = null;
let menuCreado = false;
function avisar(mensaje) { alert(mensaje); }
document.getElementById('idAgregarPagina').addEventListener('click', () => {
    if (contenedor) return avisar('Ya existe un contenedor.');
    contenedor = document.createElement('div');
    contenedor.id = 'idDivPage';
    contenedor.className = 'border rounded p-4 my-3';
    contenedor.style.minHeight = '350px';
    pagina.appendChild(contenedor);
});
document.getElementById('idAgregarMenu').addEventListener('click', () => {
    if (!contenedor) return avisar('Primero debe agregar una página.');
    if (menuCreado) return avisar('El menú ya fue agregado.');
    const original = document.querySelector('header');
    if (!original) return avisar('No se encontró el menú original.');
    const copia = original.cloneNode(true);
    copia.querySelectorAll('[id]').forEach(nodo => nodo.removeAttribute('id'));
    contenedor.appendChild(copia);
    menuCreado = true;
});
document.getElementById('idAgregarTitulo').addEventListener('click', () => {
    if (!contenedor || !menuCreado) return avisar('Primero agregue la página y el menú.');
    const texto = prompt('Ingrese el título:');
    if (!texto || !texto.trim()) return;
    const titulo = document.createElement('h2');
    titulo.className = 'fw-bold py-3';
    titulo.textContent = texto.trim();
    contenedor.appendChild(titulo);
});
document.getElementById('idAgregarParrafo').addEventListener('click', () => {
    if (!contenedor || !menuCreado) return avisar('Primero agregue la página y el menú.');
    const texto = prompt('Ingrese un párrafo:');
    if (!texto || !texto.trim()) return;
    const parrafo = document.createElement('p');
    parrafo.className = 'py-2';
    parrafo.textContent = texto.trim();
    contenedor.appendChild(parrafo);
});
