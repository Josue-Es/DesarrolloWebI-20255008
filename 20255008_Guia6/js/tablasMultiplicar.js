// Ejemplo 3: tabla de multiplicar con un ciclo while.
const contenedorResultado = document.querySelector('#idContainerResultado');
const botonCalcular = document.querySelector('#idBtnCalcular');
botonCalcular.addEventListener('click', calcularTabla);

function calcularTabla() {
    const numero = Number(document.querySelector('#inputTabla').value);

    if (!Number.isInteger(numero) || numero <= 0) {
        alert('Ingrese un número entero positivo');
        return;
    }

    let contador = 1;
    let tabla = `<h3>Tabla de multiplicar del ${numero}</h3>`;
    tabla += '<table class="table table-bordered table-striped">';

    do {
        tabla += `<tr><td>${contador}</td><td>×</td><td>${numero}</td>`;
        tabla += `<td>=</td><td>${contador * numero}</td></tr>`;
        contador++;
    } while (contador <= 12);

    tabla += '</table>';
    contenedorResultado.innerHTML = tabla;
    document.querySelector('#inputTabla').value = 1;
}
