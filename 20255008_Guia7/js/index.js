// Ejemplo 1: recuperar y contar etiquetas del documento.
const botones = {
    span: document.getElementById('idBtnSpan'),
    p: document.getElementById('idBtnP'),
    div: document.getElementById('idBtnDiv'),
    button: document.getElementById('idBtnButton')
};
function contarElementos(etiqueta) {
    const elementos = document.getElementsByTagName(etiqueta);
    console.log(`Se encontraron ${elementos.length} elementos <${etiqueta}>`);
    Array.from(elementos).forEach((elemento, indice) => console.log(indice + 1, elemento));
    alert(`Se encontraron ${elementos.length} etiquetas <${etiqueta}>. Revisa la consola.`);
}
Object.entries(botones).forEach(([etiqueta, boton]) => {
    boton.addEventListener('click', () => contarElementos(etiqueta));
});
