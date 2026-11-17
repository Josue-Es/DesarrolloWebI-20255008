// Ejemplo 4: modificar estilos en tiempo real con DOM.
const fondo = document.getElementById('idFondo');
const titulos = document.getElementById('idTitulos');
const parrafos = document.getElementById('idParrafos');
let escala = 1;
function cambiarColorFondo(color) { document.body.style.backgroundColor = color; }
function cambiarColorTitulos(color) {
    document.querySelectorAll('h1, h2, h3').forEach(nodo => nodo.style.color = color);
}
function cambiarColorParrafos(color) {
    document.querySelectorAll('p').forEach(nodo => nodo.style.color = color);
}
function cambiarTamano(cambio) {
    escala = Math.max(0.7, Math.min(1.7, escala + cambio));
    document.querySelectorAll('h1, h2, h3, p').forEach(nodo => {
        if (!nodo.dataset.tamanoOriginal) {
            nodo.dataset.tamanoOriginal = String(parseFloat(getComputedStyle(nodo).fontSize));
        }
        nodo.style.fontSize = `${Number(nodo.dataset.tamanoOriginal) * escala}px`;
    });
}
['input', 'change'].forEach(evento => {
    fondo.addEventListener(evento, e => cambiarColorFondo(e.target.value));
    titulos.addEventListener(evento, e => cambiarColorTitulos(e.target.value));
    parrafos.addEventListener(evento, e => cambiarColorParrafos(e.target.value));
});
document.getElementById('idBtnAumentar').addEventListener('click', () => cambiarTamano(0.1));
document.getElementById('idBtnDisminuir').addEventListener('click', () => cambiarTamano(-0.1));
