// Ejemplo 1: interacción básica con alert, prompt y confirm.
function aviso() {
  alert('¡Bienvenido al mundo JavaScript!');
}

function capturarDatos() {
  const nombre = prompt('¿Cuál es tu nombre?');
  if (nombre === null) return;
  const edad = prompt('¿Cuál es tu edad?');
  if (edad === null) return;
  alert(`Tu nombre es ${nombre.trim() || 'Sin nombre'} y tu edad es ${edad.trim() || 'No indicada'}.`);
}

function confirmar() {
  const confirmacion = confirm('¿Desea salir de la sesión?');
  alert(`Valor seleccionado: ${confirmacion}`);
}

function dibujarParrafo() {
  const parrafo = prompt('Escriba la información que desea visualizar en el párrafo:');
  if (parrafo === null) return;
  document.querySelector('#idParrafo').textContent = parrafo;
}

document.querySelector('#btnAviso').addEventListener('click', aviso);
document.querySelector('#btnDatos').addEventListener('click', capturarDatos);
document.querySelector('#btnConfirm').addEventListener('click', confirmar);
document.querySelector('#btnParrafo').addEventListener('click', dibujarParrafo);
