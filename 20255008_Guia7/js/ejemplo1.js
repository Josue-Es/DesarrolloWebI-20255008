// Ejemplo 2: creación de controles mediante nodos DOM.
const formularioNuevo = document.getElementById('idNewForm');
const btnCrear = document.getElementById('idBtnCrear');
const btnAgregar = document.getElementById('idBtnAddElement');
const combo = document.getElementById('idCmbElemento');
const titulo = document.getElementById('idTituloElemento');
const nombre = document.getElementById('idNombreElemento');
const modal = new bootstrap.Modal(document.getElementById('idModal'));
function verificarTipoElemento() {
    if (!combo.value) return alert('Seleccione el elemento que desea crear.');
    modal.show();
}
function crearControl(tipo, id, texto) {
    const bloque = document.createElement('div');
    bloque.className = 'mb-3 col-12';
    const etiqueta = document.createElement('label');
    etiqueta.textContent = texto;
    etiqueta.htmlFor = id;
    etiqueta.className = 'form-label';
    let control;
    if (tipo === 'select') {
        control = document.createElement('select');
        for (let i = 1; i <= 10; i++) {
            const opcion = document.createElement('option');
            opcion.value = String(i);
            opcion.textContent = `Opción ${i}`;
            control.appendChild(opcion);
        }
    } else if (tipo === 'textarea') {
        control = document.createElement('textarea');
        control.rows = 3;
    } else {
        control = document.createElement('input');
        control.type = tipo;
        if (tipo === 'radio' || tipo === 'checkbox') control.value = texto;
    }
    control.id = id;
    control.name = id;
    control.className = tipo === 'select' ? 'form-select' :
        ['radio', 'checkbox'].includes(tipo) ? 'form-check-input' : 'form-control';
    bloque.append(etiqueta, control);
    formularioNuevo.appendChild(bloque);
}
btnCrear.addEventListener('click', verificarTipoElemento);
btnAgregar.addEventListener('click', () => {
    const tipo = combo.value;
    const id = nombre.value.trim();
    const texto = titulo.value.trim();
    if (!tipo || !id || !texto) return alert('Complete ambos campos y seleccione un tipo.');
    if (!/^[a-zA-Z][\w-]*$/.test(id)) return alert('El nombre debe comenzar con una letra y no tener espacios.');
    if (document.getElementById(id)) return alert('Ya existe un elemento con ese identificador.');
    crearControl(tipo, id, texto);
    modal.hide();
});
document.getElementById('idModal').addEventListener('shown.bs.modal', () => titulo.focus());
document.getElementById('idModal').addEventListener('hidden.bs.modal', () => {
    titulo.value = '';
    nombre.value = '';
});
