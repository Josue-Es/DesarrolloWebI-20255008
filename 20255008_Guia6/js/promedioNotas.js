// Ejemplo 4: ciclos anidados para registrar y promediar notas.
const contenedorEstudiantes = document.querySelector('#idContainerEstudiantes');
const botonPromedio = document.querySelector('#idBtnPromedio');
botonPromedio.addEventListener('click', generarEstudiantes);

function generarEstudiantes() {
    const totalEstudiantes = Number(document.querySelector('#inputNumeroEstudiantes').value);
    const estudiantes = [];

    if (!Number.isInteger(totalEstudiantes) || totalEstudiantes <= 0 || totalEstudiantes > 100) {
        alert('Ingrese una cantidad válida de estudiantes (1 a 100)');
        return;
    }

    let contador = 1;
    while (contador <= totalEstudiantes) {
        const nombre = prompt(`Ingrese el nombre del estudiante ${contador}`);
        if (nombre === null) {
            return;
        }
        if (nombre.trim() === '') {
            alert('Debe ingresar un nombre');
            continue;
        }

        const notas = [];
        let indice = 1;
        do {
            const entrada = prompt(`Ingrese la calificación ${indice} del estudiante ${contador} (0 a 10)`);
            if (entrada === null) {
                return;
            }
            const nota = Number(entrada);
            if (entrada.trim() === '' || !Number.isFinite(nota) || nota < 0 || nota > 10) {
                alert('Ingrese una nota entre 0 y 10');
                continue;
            }
            notas.push(nota);
            indice++;
        } while (indice <= 3);

        estudiantes.push({ nombre: nombre.trim(), notas });
        contador++;
    }

    let sumaPromedios = 0;
    let listado = '<h3>Listado de estudiantes registrados</h3><ol>';

    for (const estudiante of estudiantes) {
        let suma = 0;
        for (const nota of estudiante.notas) {
            suma += nota;
        }
        const promedio = suma / estudiante.notas.length;
        sumaPromedios += promedio;
        listado += `<li>${escaparTexto(estudiante.nombre)}: ${promedio.toFixed(2)}</li>`;
    }

    listado += '</ol>';
    listado += `<p>Promedio de calificaciones: ${(sumaPromedios / estudiantes.length).toFixed(2)}</p>`;
    contenedorEstudiantes.innerHTML = listado;
}

function escaparTexto(valor) {
    const span = document.createElement('span');
    span.textContent = valor;
    return span.innerHTML;
}
