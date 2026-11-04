// Ejemplo 2: función recursiva y validación de entrada.
const campoNumero = document.querySelector('#idTxtNumero');
const botonCalcular = document.querySelector('#idBtnCalcular');
const resultado = document.querySelector('#idDivResultado');

campoNumero.addEventListener('input', validarNumero);
botonCalcular.addEventListener('click', calcular);

document.querySelector('#idForm').addEventListener('submit', function (evento) {
    evento.preventDefault();
    calcular();
});

function validarNumero() {
    const valor = campoNumero.value;
    const valido = valor === '' || /^\d+$/.test(valor);
    campoNumero.classList.toggle('is-invalid', !valido);
    return valido;
}

function factorial(numero) {
    if (numero <= 1) {
        return 1;
    }
    return numero * factorial(numero - 1);
}

function calcular() {
    const numero = Number(campoNumero.value);

    if (!validarNumero() || campoNumero.value.trim() === '' || !Number.isInteger(numero) || numero > 170) {
        alert('Ingrese un número entero entre 0 y 170');
        return;
    }

    resultado.textContent = `El factorial de ${numero} es ${factorial(numero)}`;
}
