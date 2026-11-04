// Ejemplo 2: arreglo multidimensional de estudiantes.
document.addEventListener('DOMContentLoaded', function () {
    const estudiantes = [];
    const botonAgregar = document.querySelector('#idBtnAgregarEstudiante');
    const botonMostrar = document.querySelector('#idBtnMostrarEstudiantes');
    const contenedor = document.querySelector('#idContainerEstudiantes');

    botonAgregar.addEventListener('click', agregarEstudiante);
    botonMostrar.addEventListener('click', mostrarEstudiantes);

    function agregarEstudiante() {
        const carnet = document.querySelector('#inputCarnet').value.trim();
        const nombres = document.querySelector('#inputNombre').value.trim();
        const apellidos = document.querySelector('#inputApellidos').value.trim();

        if (carnet !== '' && nombres !== '' && apellidos !== '') {
            estudiantes.push([carnet, nombres, apellidos]);
            alert('Se registró el nuevo estudiante');
            document.querySelector('#formEstudiantes').reset();
            document.querySelector('#inputCarnet').focus();
        } else {
            alert('Existen campos por completar');
        }
    }

    function mostrarEstudiantes() {
        if (estudiantes.length === 0) {
            alert('No se han registrado estudiantes');
            contenedor.textContent = 'Ninguno';
            return;
        }

        let tabla = '<table class="table table-striped table-hover">';
        tabla += '<thead><tr><th>#</th><th>Carnet</th><th>Nombres</th><th>Apellidos</th></tr></thead><tbody>';

        for (let i = 0; i < estudiantes.length; i++) {
            const [carnet, nombres, apellidos] = estudiantes[i];
            tabla += `<tr><td>${i + 1}</td><td>${escapar(carnet)}</td><td>${escapar(nombres)}</td><td>${escapar(apellidos)}</td></tr>`;
        }

        tabla += '</tbody></table>';
        contenedor.innerHTML = tabla;
    }

    function escapar(valor) {
        const elemento = document.createElement('span');
        elemento.textContent = valor;
        return elemento.innerHTML;
    }
});
