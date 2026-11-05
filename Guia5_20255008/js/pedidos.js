// Ejercicio complementario 2: gestión de pedidos de cafetería.
// Los pedidos se guardan únicamente en memoria, sin persistencia.
const pedidos = [];
let precioMaximoActivo = null;

const formulario = document.querySelector('#formPedido');
const mensaje = document.querySelector('#mensaje');
const tablaPedidos = document.querySelector('#tablaPedidos');
const estadoTabla = document.querySelector('#estadoTabla');
const totalUnidades = document.querySelector('#totalUnidades');
const montoTotal = document.querySelector('#montoTotal');

function formatoMoneda(valor) {
  return `$${valor.toFixed(2)}`;
}

function validarPedido(producto, precio, cantidad) {
  if (!producto) return 'El nombre del producto es obligatorio.';
  if (!Number.isFinite(precio) || precio <= 0) return 'El precio debe ser mayor que cero.';
  if (!Number.isSafeInteger(cantidad) || cantidad <= 0) return 'La cantidad debe ser un número entero positivo.';
  return null;
}

function obtenerPedidosVisibles() {
  return precioMaximoActivo === null
    ? pedidos
    : pedidos.filter(pedido => pedido.precio <= precioMaximoActivo);
}

function calcularTotales(lista) {
  return lista.reduce((acumulado, pedido) => ({
    unidades: acumulado.unidades + pedido.cantidad,
    monto: acumulado.monto + pedido.precio * pedido.cantidad
  }), { unidades: 0, monto: 0 });
}

function actualizarTabla() {
  const visibles = obtenerPedidosVisibles();
  tablaPedidos.replaceChildren();
  // map() transforma cada objeto en una fila HTML.
  const filas = visibles.map(pedido => {
    const fila = document.createElement('tr');
    [pedido.producto, formatoMoneda(pedido.precio), pedido.cantidad,
      formatoMoneda(pedido.precio * pedido.cantidad)].forEach(valor => {
      const celda = document.createElement('td');
      celda.textContent = valor;
      fila.appendChild(celda);
    });
    return fila;
  });
  tablaPedidos.append(...filas);
  const totales = calcularTotales(visibles);
  totalUnidades.textContent = totales.unidades;
  montoTotal.textContent = formatoMoneda(totales.monto);
  estadoTabla.textContent = visibles.length === 0
    ? 'No hay pedidos para mostrar.'
    : `Mostrando ${visibles.length} de ${pedidos.length} pedido(s).`;
}

function agregarPedido(evento) {
  evento.preventDefault();
  const producto = document.querySelector('#producto').value.trim();
  const precioTexto = document.querySelector('#precio').value;
  const cantidadTexto = document.querySelector('#cantidad').value;
  const precio = precioTexto === '' ? NaN : Number(precioTexto);
  const cantidad = cantidadTexto === '' ? NaN : Number(cantidadTexto);
  const error = validarPedido(producto, precio, cantidad);
  if (error) {
    mensaje.className = 'note error';
    mensaje.textContent = error;
    return;
  }
  pedidos.push({ producto, precio, cantidad });
  formulario.reset();
  mensaje.className = 'note success';
  mensaje.textContent = `Se agregó el pedido de ${producto}.`;
  actualizarTabla();
  document.querySelector('#producto').focus();
}

function filtrarProductos() {
  const campo = document.querySelector('#precioMaximo');
  const valor = campo.value.trim();
  const maximo = Number(valor);
  if (valor === '' || !Number.isFinite(maximo) || maximo < 0) {
    mensaje.className = 'note error';
    mensaje.textContent = 'Ingresa un precio máximo válido, igual o mayor que cero.';
    return;
  }
  precioMaximoActivo = maximo;
  mensaje.className = 'note';
  mensaje.textContent = `Filtro activo: precio unitario hasta ${formatoMoneda(maximo)}.`;
  actualizarTabla();
}

function mostrarTodos() {
  precioMaximoActivo = null;
  document.querySelector('#precioMaximo').value = '';
  mensaje.className = 'note';
  mensaje.textContent = 'Se muestran todos los pedidos.';
  actualizarTabla();
}

function limpiarPedidos() {
  pedidos.length = 0;
  precioMaximoActivo = null;
  document.querySelector('#precioMaximo').value = '';
  mensaje.className = 'note';
  mensaje.textContent = 'Se eliminaron todos los pedidos de esta sesión.';
  actualizarTabla();
}

formulario.addEventListener('submit', agregarPedido);
document.querySelector('#btnFiltrar').addEventListener('click', filtrarProductos);
document.querySelector('#btnMostrar').addEventListener('click', mostrarTodos);
document.querySelector('#btnLimpiar').addEventListener('click', limpiarPedidos);
actualizarTabla();
