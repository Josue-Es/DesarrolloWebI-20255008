// Complementario 3: patrones de validación solicitados en la página 34.
const patrones = {
    carnet: /^[A-Za-z]{2}\d{3}$/,
    nombre: /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:\s+[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)+$/,
    dui: /^\d{8}-\d$/,
    nit: /^\d{4}-\d{6}-\d{3}-\d$/,
    fecha: /^\d{2}\/\d{2}\/\d{4}$/,
    correo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    edad: /^\d+$/
};

const mensajes = {
    carnet: 'El carnet debe contener dos letras y tres números, por ejemplo AB001.',
    nombre: 'Ingrese nombre y apellido usando únicamente letras y espacios.',
    dui: 'El DUI debe tener el formato ########-#.',
    nit: 'El NIT debe tener el formato ####-######-###-#.',
    fecha: 'Ingrese una fecha real con formato DD/MM/AAAA.',
    correo: 'Ingrese un correo electrónico válido.',
    edad: 'La edad debe contener únicamente números.'
};

document.querySelector('#idFormValidaciones').addEventListener('submit', validarFormulario);
document.querySelector('#idFormValidaciones').addEventListener('reset', function () {
    document.querySelector('#resultadoValidaciones').textContent = '';
    document.querySelectorAll('#idFormValidaciones .form-control').forEach(campo => {
        campo.classList.remove('is-valid', 'is-invalid');
    });
});

function fechaReal(texto) {
    const [dia, mes, anio] = texto.split('/').map(Number);
    const fecha = new Date(anio, mes - 1, dia);
    return fecha.getFullYear() === anio && fecha.getMonth() === mes - 1 && fecha.getDate() === dia;
}

function validarFormulario(evento) {
    evento.preventDefault();
    const errores = [];

    for (const [campoId, patron] of Object.entries(patrones)) {
        const campo = document.getElementById(campoId);
        const valor = campo.value.trim();
        let valido = patron.test(valor);

        if (campoId === 'fecha' && valido) {
            valido = fechaReal(valor);
        }

        campo.classList.toggle('is-valid', valido);
        campo.classList.toggle('is-invalid', !valido);

        if (!valido) {
            errores.push(mensajes[campoId]);
        }
    }

    const resultado = document.querySelector('#resultadoValidaciones');
    resultado.replaceChildren();

    if (errores.length === 0) {
        resultado.className = 'alert alert-success mt-3';
        resultado.textContent = 'Todos los campos cumplen con las validaciones.';
    } else {
        resultado.className = 'alert alert-danger mt-3';
        const lista = document.createElement('ul');
        errores.forEach(mensaje => {
            const elemento = document.createElement('li');
            elemento.textContent = mensaje;
            lista.appendChild(elemento);
        });
        resultado.append('Revise los siguientes campos:', lista);
    }
}
