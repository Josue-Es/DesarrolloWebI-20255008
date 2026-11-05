// Ejemplo 4: operaciones básicas y manejo de eventos con el DOM.
const parrafo = document.querySelector('#idParrafo');

function solicitarNumero(mensaje) {
  const entrada = prompt(mensaje);
  if (entrada === null) return null;
  if (entrada.trim() === '' || !Number.isFinite(Number(entrada))) {
    parrafo.textContent = 'Ingresa un número válido.';
    return null;
  }
  return Number(entrada);
}

function operar(tipo) {
  const primero = solicitarNumero('Ingrese el primer número:');
  if (primero === null) return;
  const segundo = solicitarNumero('Ingrese el segundo número:');
  if (segundo === null) return;
  let resultado;
  let simbolo;
  switch (tipo) {
    case 'sumar': resultado = primero + segundo; simbolo = '+'; break;
    case 'restar': resultado = primero - segundo; simbolo = '-'; break;
    case 'multiplicar': resultado = primero * segundo; simbolo = '×'; break;
    case 'dividir':
      if (segundo === 0) {
        parrafo.textContent = 'No se puede dividir entre cero.';
        return;
      }
      resultado = primero / segundo;
      simbolo = '÷';
      break;
    default: return;
  }
  parrafo.textContent = `${primero} ${simbolo} ${segundo} = ${resultado}`;
}

function sumar() { operar('sumar'); }
function restar() { operar('restar'); }
function multiplicar() { operar('multiplicar'); }
function dividir() { operar('dividir'); }

document.querySelectorAll('[data-operacion]').forEach(boton => {
  boton.addEventListener('click', () => operar(boton.dataset.operacion));
});
