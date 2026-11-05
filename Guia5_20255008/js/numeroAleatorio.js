// Ejemplo 3 + ejercicio complementario 1: pistas de mayor y menor.
const numeroIntentos = 3;
const salida = document.querySelector('#idParrafo');
let numeroAleatorio;
let intentos;
let terminado;

function reiniciarJuego() {
  numeroAleatorio = Math.floor(Math.random() * 25) + 1;
  intentos = 0;
  terminado = false;
  salida.textContent = `Nueva partida. Tienes ${numeroIntentos} intentos para adivinar un número entre 1 y 25.`;
}

function generarNumeroAleatorio() {
  if (terminado) {
    salida.textContent = 'La partida terminó. Presiona Nueva partida para volver a jugar.';
    return;
  }
  const respuesta = prompt(`¿Qué número se ha generado? (Intento ${intentos + 1} de ${numeroIntentos})`);
  if (respuesta === null) return;
  const numero = Number(respuesta.trim());
  if (respuesta.trim() === '' || !Number.isInteger(numero) || numero < 1 || numero > 25) {
    salida.textContent = 'Ingresa un número entero entre 1 y 25. No se consumió un intento.';
    return;
  }
  intentos++;
  if (numero === numeroAleatorio) {
    terminado = true;
    salida.textContent = `¡Correcto! Adivinaste el número ${numeroAleatorio} en ${intentos} intento(s).`;
  } else if (intentos === numeroIntentos) {
    terminado = true;
    salida.textContent = `Se terminaron tus intentos. El número era ${numeroAleatorio}. Inicia una nueva partida.`;
  } else {
    const pista = numero < numeroAleatorio ? 'más alto' : 'más bajo';
    salida.textContent = `El número que buscas es ${pista} que ${numero}. Te quedan ${numeroIntentos - intentos} intento(s).`;
  }
}

document.querySelector('#btnNumero').addEventListener('click', generarNumeroAleatorio);
document.querySelector('#btnReiniciar').addEventListener('click', reiniciarJuego);
reiniciarJuego();
