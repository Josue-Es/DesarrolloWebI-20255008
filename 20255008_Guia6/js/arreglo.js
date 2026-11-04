// Ejemplo 5: arreglo numérico y ordenamiento con sort.
const arregloNumeros = [];
const contenedorArreglo = document.querySelector('#idContainerArreglo');
const contenedorOrdenado = document.querySelector('#idContainerArregloOrdenado');

document.querySelector('#idBtnAgregar').addEventListener('click', agregarElemento);
document.querySelector('#idBtnOrdenar').addEventListener('click', ordenarElementos);

function agregarElemento() {
    const entrada = document.querySelector('#inputNumero').value;
    const numero = Number(entrada);

    if (entrada.trim() === '' || !Number.isFinite(numero)) {
        alert('Debe ingresar un número válido');
        return;
    }

    arregloNumeros.push(numero);
    const caja = document.createElement('div');
    caja.className = 'col-md-1 colum-green';
    caja.textContent = numero;
    contenedorArreglo.appendChild(caja);
    document.querySelector('#inputNumero').value = '';
    document.querySelector('#inputNumero').focus();
}

function ordenarElementos() {
    if (arregloNumeros.length === 0) {
        alert('Primero debe agregar números');
        return;
    }

    const ordenado = [...arregloNumeros].sort((a, b) => a - b);
    contenedorOrdenado.innerHTML = '<h3>Arreglo ordenado</h3>';

    for (const numero of ordenado) {
        const caja = document.createElement('div');
        caja.className = 'col-md-1 colum-green';
        caja.textContent = numero;
        contenedorOrdenado.appendChild(caja);
    }
}
