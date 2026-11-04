// Ejemplo 4: eventos y formulario de pacientes.
// Complementarios 1 y 2: editar, eliminar y persistir con LocalStorage.
document.addEventListener('DOMContentLoaded', function () {
    const clave = 'guia6_pacientes';
    let pacientes = leerPacientes();
    let indiceEdicion = -1;

    const formulario = document.querySelector('#idForm');
    const tablaPacientes = document.querySelector('#idTablaPacientes');
    const botonGuardar = document.querySelector('#idBtnAgregar');
    const paises = document.querySelector('#idCmbPais');

    document.querySelector('#idBtnAgregar').addEventListener('click', guardarPaciente);
    document.querySelector('#idBtnMostrar').addEventListener('click', mostrarPacientes);
    document.querySelector('#idBtnLimpiar').addEventListener('click', limpiarFormulario);
    document.querySelector('#idBtnAddPais').addEventListener('click', agregarPais);
    formulario.addEventListener('submit', function (evento) {
        evento.preventDefault();
        guardarPaciente();
    });

    mostrarPacientes();

    function leerPacientes() {
        try {
            const datos = JSON.parse(localStorage.getItem(clave) || '[]');
            return Array.isArray(datos) ? datos : [];
        } catch (error) {
            return [];
        }
    }

    function persistirPacientes() {
        try {
            localStorage.setItem(clave, JSON.stringify(pacientes));
            return true;
        } catch (error) {
            alert('No se pudo guardar en LocalStorage. Revise el almacenamiento del navegador.');
            return false;
        }
    }

    function obtenerDatos() {
        const sexoSeleccionado = document.querySelector('input[name="rdSexo"]:checked');
        const paisSeleccionado = paises.options[paises.selectedIndex];

        return {
            nombre: document.querySelector('#idTxtNombre').value.trim(),
            apellido: document.querySelector('#idTxtApellido').value.trim(),
            nacimiento: document.querySelector('#idTxtFechaNacimiento').value,
            sexo: sexoSeleccionado ? sexoSeleccionado.value : '',
            pais: paisSeleccionado.value === '0' ? '' : paisSeleccionado.text,
            direccion: document.querySelector('#idTxtDireccion').value.trim()
        };
    }

    function guardarPaciente() {
        const paciente = obtenerDatos();

        if (Object.values(paciente).some(valor => valor === '')) {
            notificar('Complete todos los campos del expediente', false);
            return;
        }

        if (indiceEdicion === -1) {
            pacientes.push(paciente);
            notificar('Paciente registrado correctamente');
        } else {
            pacientes[indiceEdicion] = paciente;
            notificar('Paciente actualizado correctamente');
        }

        persistirPacientes();
        limpiarFormulario();
        mostrarPacientes();
    }

    function mostrarPacientes() {
        if (pacientes.length === 0) {
            tablaPacientes.textContent = 'Ninguno';
            return;
        }

        // Se crea la tabla usando la API del DOM para mantener seguros los textos ingresados.
        const tabla = document.createElement('table');
        tabla.className = 'table table-striped table-hover table-responsive';
        const cabecera = document.createElement('thead');
        const filaCabecera = document.createElement('tr');

        ['#', 'Nombre', 'Apellido', 'Nacimiento', 'Sexo', 'País', 'Dirección', 'Acciones'].forEach(titulo => {
            const celda = document.createElement('th');
            celda.textContent = titulo;
            filaCabecera.appendChild(celda);
        });

        cabecera.appendChild(filaCabecera);
        tabla.appendChild(cabecera);
        const cuerpo = document.createElement('tbody');

        pacientes.forEach((paciente, indice) => {
            const fila = document.createElement('tr');
            [indice + 1, paciente.nombre, paciente.apellido, paciente.nacimiento,
                paciente.sexo, paciente.pais, paciente.direccion].forEach(valor => {
                const celda = document.createElement('td');
                celda.textContent = valor;
                fila.appendChild(celda);
            });

            const acciones = document.createElement('td');
            const editar = document.createElement('button');
            editar.type = 'button';
            editar.className = 'btn btn-sm btn-primary me-2';
            editar.textContent = 'Editar';
            editar.addEventListener('click', () => editarPaciente(indice));

            const eliminar = document.createElement('button');
            eliminar.type = 'button';
            eliminar.className = 'btn btn-sm btn-danger';
            eliminar.textContent = 'Eliminar';
            eliminar.addEventListener('click', () => eliminarPaciente(indice));

            acciones.append(editar, eliminar);
            fila.appendChild(acciones);
            cuerpo.appendChild(fila);
        });

        tabla.appendChild(cuerpo);
        tablaPacientes.replaceChildren(tabla);
    }

    function editarPaciente(indice) {
        const paciente = pacientes[indice];
        indiceEdicion = indice;
        document.querySelector('#idTxtNombre').value = paciente.nombre;
        document.querySelector('#idTxtApellido').value = paciente.apellido;
        document.querySelector('#idTxtFechaNacimiento').value = paciente.nacimiento;
        document.querySelector('#idTxtDireccion').value = paciente.direccion;

        const radio = [...document.querySelectorAll('input[name="rdSexo"]')]
            .find(opcion => opcion.value === paciente.sexo);
        if (radio) {
            radio.checked = true;
        }

        let opcion = [...paises.options].find(elemento => elemento.text === paciente.pais);
        if (!opcion) {
            opcion = new Option(paciente.pais, String(paises.options.length));
            paises.add(opcion);
        }
        paises.value = opcion.value;
        botonGuardar.textContent = 'Actualizar Datos';
        formulario.scrollIntoView({ behavior: 'smooth' });
    }

    function eliminarPaciente(indice) {
        if (!confirm('¿Desea eliminar este paciente?')) {
            return;
        }

        pacientes.splice(indice, 1);
        persistirPacientes();
        limpiarFormulario();
        mostrarPacientes();
        notificar('Paciente eliminado correctamente');
    }

    function limpiarFormulario() {
        formulario.reset();
        indiceEdicion = -1;
        botonGuardar.textContent = 'Guardar Datos';
    }

    function agregarPais() {
        const campo = document.querySelector('#idNombrePais');
        const nombre = campo.value.trim();
        if (nombre === '') {
            notificar('Ingrese el nombre del país', false);
            return;
        }
        const existente = [...paises.options].find(opcion => opcion.text.toLowerCase() === nombre.toLowerCase());
        if (!existente) {
            paises.add(new Option(nombre, String(paises.options.length)));
        }
        campo.value = '';
        bootstrap.Modal.getInstance(document.querySelector('#idModal'))?.hide();
        notificar('País agregado correctamente');
    }

    function notificar(mensaje, correcto = true) {
        const elemento = document.querySelector('#idNotificacion');
        document.querySelector('#idMensaje').textContent = mensaje;
        elemento.classList.toggle('text-bg-success', correcto);
        elemento.classList.toggle('text-bg-danger', !correcto);
        bootstrap.Toast.getOrCreateInstance(elemento).show();
    }
});
