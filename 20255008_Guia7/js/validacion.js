// Complementario 1: validar el formulario y crear una tabla con métodos DOM.
const registro = document.forms['frmRegistro'];
const mensajeError = document.createElement('div');
mensajeError.className = 'alert alert-danger mt-3 d-none';
mensajeError.setAttribute('role', 'alert');
registro.prepend(mensajeError);
const botonValidar = document.createElement('button');
botonValidar.type = 'submit';
botonValidar.className = 'btn btn-success mt-3';
botonValidar.textContent = 'Validar y mostrar información';
registro.appendChild(botonValidar);
function valor(id) { return document.getElementById(id).value.trim(); }
function seleccionados(selector) {
    return Array.from(registro.querySelectorAll(selector)).filter(input => input.checked);
}
function textoEtiqueta(input) {
    const etiqueta = registro.querySelector(`label[for="${input.id}"]`);
    return etiqueta ? etiqueta.textContent.trim() : input.value;
}
function validarDatos() {
    const campos = ['idNombre', 'idApellidos', 'idFechaNac', 'idCorreo', 'idPassword', 'idPasswordRepetir'];
    for (const id of campos) {
        if (!valor(id)) return 'Complete todos los campos obligatorios.';
    }
    const fecha = valor('idFechaNac');
    const hoy = new Date();
    const fechaLocal = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`;
    if (fecha > fechaLocal) return 'La fecha de nacimiento no puede ser futura.';
    if (!/^\S+@\S+\.[a-zA-Z]{2,}$/.test(valor('idCorreo'))) return 'Ingrese un correo electrónico válido.';
    if (valor('idPassword') !== valor('idPasswordRepetir')) return 'Las contraseñas no coinciden.';
    if (!seleccionados('input[type="checkbox"]').length) return 'Seleccione al menos un interés.';
    if (!seleccionados('input[name="idRdCarrera"]').length) return 'Seleccione una carrera.';
    if (document.getElementById('idCmPais').selectedIndex === 0) return 'Seleccione un país de origen.';
    return null;
}
function mostrarDatos() {
    const intereses = seleccionados('input[type="checkbox"]').map(textoEtiqueta).join(', ');
    const carrera = textoEtiqueta(seleccionados('input[name="idRdCarrera"]')[0]);
    const pais = document.getElementById('idCmPais').selectedOptions[0].textContent.trim();
    const datos = [
        ['Nombres', valor('idNombre')],
        ['Apellidos', valor('idApellidos')],
        ['Fecha de nacimiento', valor('idFechaNac')],
        ['Correo electrónico', valor('idCorreo')],
        ['Intereses', intereses],
        ['Carrera', carrera],
        ['País de origen', pais]
    ];
    const tabla = document.createElement('table');
    tabla.className = 'table table-striped table-bordered';
    const cuerpo = document.createElement('tbody');
    datos.forEach(([campo, contenido]) => {
        const fila = document.createElement('tr');
        const encabezado = document.createElement('th');
        encabezado.scope = 'row';
        encabezado.textContent = campo;
        const celda = document.createElement('td');
        celda.textContent = contenido;
        fila.append(encabezado, celda);
        cuerpo.appendChild(fila);
    });
    tabla.appendChild(cuerpo);
    document.getElementById('idBodyModal').replaceChildren(tabla);
    document.querySelector('#idModal .modal-title').textContent = 'Datos validados del registro';
    bootstrap.Modal.getOrCreateInstance(document.getElementById('idModal')).show();
}
registro.addEventListener('submit', evento => {
    evento.preventDefault();
    const error = validarDatos();
    mensajeError.classList.toggle('d-none', !error);
    mensajeError.textContent = error || '';
    if (error) return;
    mostrarDatos();
});
