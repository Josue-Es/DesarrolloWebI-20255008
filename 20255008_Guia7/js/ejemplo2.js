// Ejemplo 3: recorrer el formulario y contar controles por tipo.
const form = document.forms['frmRegistro'];
const modalResumen = new bootstrap.Modal(document.getElementById('idModal'));
const cuerpoModal = document.getElementById('idBodyModal');
function contarControles() {
    const tipos = ['text', 'password', 'radio', 'checkbox', 'date', 'email', 'file', 'select'];
    const conteos = Object.fromEntries(tipos.map(tipo => [tipo, 0]));
    Array.from(form.elements).forEach(elemento => {
        const tipo = elemento.tagName === 'SELECT' ? 'select' : elemento.type;
        if (Object.hasOwn(conteos, tipo)) conteos[tipo]++;
        console.log(elemento);
    });
    cuerpoModal.replaceChildren();
    const lista = document.createElement('ul');
    lista.className = 'list-group';
    Object.entries(conteos).forEach(([tipo, total]) => {
        const item = document.createElement('li');
        item.className = 'list-group-item';
        item.textContent = `${tipo}: ${total}`;
        lista.appendChild(item);
    });
    cuerpoModal.appendChild(lista);
    modalResumen.show();
}
// Botón de recorrido independiente del envío validado.
const botonRecorrer = document.createElement('button');
botonRecorrer.type = 'button';
botonRecorrer.className = 'btn btn-outline-primary mt-3 me-3';
botonRecorrer.textContent = 'Contar controles';
botonRecorrer.addEventListener('click', contarControles);
form.appendChild(botonRecorrer);
