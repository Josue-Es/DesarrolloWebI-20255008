// Ejemplo 3: funciones con parámetros y generación dinámica de tablas.
const generarFila = (tipo, fila, columnas) => {
    let tr = '<tr>';

    for (let columna = 0; columna <= columnas; columna++) {
        if (tipo === 1) {
            if (columna === 0) {
                tr += '<th scope="col" class="text-center">#</th>';
            } else {
                tr += `<th scope="col" class="text-center">Título ${columna}</th>`;
            }
        } else if (columna === 0) {
            tr += `<td class="text-center fw-bold text-success">Fila ${fila}</td>`;
        } else {
            tr += `<td class="text-center">Celda ${fila},${columna}</td>`;
        }
    }

    return tr + '</tr>';
};

const generarTabla = (filas, columnas) => {
    let tabla = '<div class="table-responsive"><table class="table table-striped table-hover table-bordered">';
    tabla += '<thead>' + generarFila(1, 0, columnas) + '</thead><tbody>';

    for (let fila = 1; fila <= filas; fila++) {
        tabla += generarFila(2, fila, columnas);
    }

    tabla += '</tbody></table></div>';
    return tabla;
};

function crearTabla() {
    const filas = Number(document.querySelector('#idNumFila').value);
    const columnas = Number(document.querySelector('#idNumColumnas').value);

    if (!Number.isInteger(filas) || !Number.isInteger(columnas) || filas < 1 || columnas < 1 || filas > 100 || columnas > 100) {
        alert('Ingrese cantidades enteras entre 1 y 100');
        return;
    }

    document.querySelector('#idDivResultado').innerHTML = generarTabla(filas, columnas);
    bootstrap.Modal.getInstance(document.querySelector('#idModal'))?.hide();
}
