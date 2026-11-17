'use strict';

const API_HOST = 'teambase-teams-players-leagues-and-fixtures.p.rapidapi.com';
const API_URL = `https://${API_HOST}/team`;
const LEAGUES_URL = `https://${API_HOST}/leagues`;

const API_KEY = 'd1b1dc386fmsh5a64383ad855f5fp148d71jsn01b27f6bea0b';

const $ = id => document.getElementById(id);

const equiposNodo = $('equipos');
const detalleNodo = $('detalle');
const estado = $('estado');
const estadoDetalle = $('estadoDetalle');
const buscar = $('buscar');
const consulta = $('consulta');
const botonCargar = $('cargar');
const botonLigas = $('cargarLigas');
const listaLigas = $('ligas');
const estadoLigas = $('estadoLigas');

let equipos = [];
let versionLista = 0;
let versionDetalle = 0;

function nodo(tag, texto, clase = '') {
    const elemento = document.createElement(tag);

    if (texto !== null && texto !== undefined) {
        elemento.textContent = String(texto);
    }

    if (clase) {
        elemento.className = clase;
    }

    return elemento;
}

function imagenSegura(url, alt, clase) {
    if (typeof url !== 'string' || !url.startsWith('https://')) {
        return null;
    }

    const imagen = nodo('img');

    imagen.src = url;
    imagen.alt = alt;
    imagen.className = clase;
    imagen.loading = 'lazy';
    imagen.referrerPolicy = 'no-referrer';

    return imagen;
}

async function solicitarEquipo(parametro, valor) {
    const url = new URL(API_URL);
    url.searchParams.set(parametro, valor);

    const respuesta = await fetch(url, {
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST,
            Accept: 'application/json'
        }
    });

    if (respuesta.status === 401 || respuesta.status === 403) {
        throw new Error(
            'Acceso denegado: revisá la clave y la suscripción a TeamBase.'
        );
    }

    if (respuesta.status === 429) {
        throw new Error('Se alcanzó el límite de consultas del plan.');
    }

    if (!respuesta.ok) {
        throw new Error(`La solicitud falló (HTTP ${respuesta.status}).`);
    }

    const datos = await respuesta.json();

    if (datos.error) {
        throw new Error(String(datos.error));
    }

    if (parametro === 'id') {
        if (
            !datos.team ||
            typeof datos.team !== 'object' ||
            Array.isArray(datos.team)
        ) {
            throw new Error(
                'La API no devolvió el detalle esperado del equipo.'
            );
        }

        return [datos.team];
    }

    if (!Array.isArray(datos.teams)) {
        throw new Error(
            'La API no devolvió la colección esperada de equipos.'
        );
    }

    return datos.teams;
}

function pintarEquipos() {
    equiposNodo.replaceChildren();

    const filtro = buscar.value.trim().toLocaleLowerCase('es');

    const visibles = equipos.filter(e =>
        `${e.name || ''} ${e.alternate || ''}`
            .toLocaleLowerCase('es')
            .includes(filtro)
    );

    for (const equipo of visibles) {
        const columna = nodo('div', null, 'col-md-6');

        const boton = nodo(
            'button',
            null,
            'equipo d-flex align-items-center gap-3 h-100'
        );

        boton.type = 'button';

        const imagen = imagenSegura(
            equipo.badge,
            `Escudo de ${equipo.name}`,
            'escudo'
        );

        if (imagen) {
            boton.appendChild(imagen);
        }

        const datos = nodo('span');

        datos.append(
            nodo(
                'strong',
                equipo.alternate || equipo.name || 'Equipo',
                'd-block'
            ),
            nodo(
                'small',
                equipo.league || 'Liga no disponible',
                'text-secondary'
            )
        );

        boton.appendChild(datos);

        boton.addEventListener('click', () => {
            cargarDetalle(equipo.id);
        });

        columna.appendChild(boton);
        equiposNodo.appendChild(columna);
    }

    estado.textContent =
        `${visibles.length} equipo(s) visible(s) de ${equipos.length} recibido(s).`;

    if (!visibles.length) {
        estado.textContent = equipos.length
            ? 'No hay equipos que coincidan con el filtro.'
            : 'No se encontraron equipos con ese nombre.';
    }
}

async function cargarEquipos() {
    const version = ++versionLista;
    ++versionDetalle;

    equipos = [];

    equiposNodo.replaceChildren();
    detalleNodo.replaceChildren();

    estadoDetalle.textContent =
        'Seleccioná un equipo del listado para ver sus detalles.';

    const termino = consulta.value.trim();

    if (!termino) {
        estado.textContent =
            'Escribí el nombre de un equipo para buscar.';
        return;
    }

    estado.textContent = 'Consultando equipos en TeamBase...';
    botonCargar.disabled = true;

    try {
        const encontrados = await solicitarEquipo('search', termino);

        if (version !== versionLista) {
            return;
        }

        equipos = encontrados.filter(e => e && e.id && e.name);

        pintarEquipos();

    } catch (error) {
        if (version === versionLista) {
            estado.textContent =
                `No se pudo cargar el listado: ${error.message}`;
        }
    } finally {
        if (version === versionLista) {
            botonCargar.disabled = false;
        }
    }
}

function mostrarDetalle(equipo, mensaje) {
    detalleNodo.replaceChildren();

    const imagen = imagenSegura(
        equipo.badge || equipo.logo,
        `Escudo de ${equipo.name}`,
        'escudo-detalle'
    );

    if (imagen) {
        detalleNodo.appendChild(imagen);
    }

    detalleNodo.appendChild(
        nodo(
            'h3',
            equipo.alternate || equipo.name,
            'h4 mt-3'
        )
    );

    const tabla = nodo('dl', null, 'row');

    const campos = [
        ['Liga', equipo.league],
        ['Estadio', equipo.stadium],
        ['Fundación', equipo.formedYear],
        ['Ciudad', equipo.location],
        ['Deporte', equipo.sport]
    ];

    for (const [titulo, valor] of campos) {
        tabla.append(
            nodo('dt', titulo, 'col-5'),
            nodo('dd', valor ?? 'No disponible', 'col-7')
        );
    }

    detalleNodo.appendChild(tabla);

    if (equipo.description) {
        detalleNodo.append(
            nodo('h4', 'Descripción', 'h6'),
            nodo('p', equipo.description, 'descripcion')
        );
    }

    if (
        equipo.website &&
        /^(https?:\/\/)?[a-z0-9.-]+\.[a-z]{2,}/i.test(equipo.website)
    ) {
        const enlace = nodo('a', 'Sitio oficial del equipo');

        enlace.href = equipo.website.startsWith('http')
            ? equipo.website
            : `https://${equipo.website}`;

        enlace.target = '_blank';
        enlace.rel = 'noopener noreferrer';

        detalleNodo.appendChild(enlace);
    }

    estadoDetalle.textContent = mensaje;
}

async function cargarDetalle(id) {
    if (!/^\d+$/.test(String(id))) {
        return;
    }

    const version = ++versionDetalle;

    const respaldo = equipos.find(
        e => String(e.id) === String(id)
    );

    detalleNodo.replaceChildren();

    estadoDetalle.textContent =
        'Consultando detalles del equipo...';

    try {
        const encontrados = await solicitarEquipo('id', String(id));

        if (version !== versionDetalle) {
            return;
        }

        const equipo =
            encontrados.find(
                e => String(e.id) === String(id)
            ) || encontrados[0];

        if (!equipo) {
            throw new Error('No se encontró el equipo solicitado.');
        }

        mostrarDetalle(
            equipo,
            'Detalles actualizados desde RapidAPI.'
        );

    } catch (error) {
        if (version !== versionDetalle) {
            return;
        }

        if (respaldo) {
            mostrarDetalle(
                respaldo,
                'Se muestran los datos disponibles de la búsqueda inicial; la actualización del detalle no está disponible en este momento.'
            );
        } else {
            estadoDetalle.textContent =
                `No se pudieron consultar los detalles: ${error.message}`;
        }
    }
}

async function cargarLigas() {
    botonLigas.disabled = true;

    listaLigas.replaceChildren();

    estadoLigas.textContent = 'Consultando ligas...';

    try {
        const respuesta = await fetch(LEAGUES_URL, {
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': API_HOST,
                Accept: 'application/json'
            }
        });

        if (respuesta.status === 401 || respuesta.status === 403) {
            throw new Error('Acceso denegado a TeamBase');
        }

        if (respuesta.status === 429) {
            throw new Error('Se alcanzó el límite de consultas');
        }

        if (!respuesta.ok) {
            throw new Error(`HTTP ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        if (!Array.isArray(datos.leagues)) {
            throw new Error('Formato de ligas no reconocido.');
        }

        const ligas = datos.leagues.filter(
            l => l && l.name
        );

        for (const liga of ligas) {
            const elemento = nodo(
                'li',
                liga.name,
                'list-group-item'
            );

            listaLigas.appendChild(elemento);
        }

        estadoLigas.textContent =
            `${ligas.length} liga(s) recibida(s).`;

    } catch (error) {
        estadoLigas.textContent =
            `No se pudieron cargar las ligas: ${error.message}.`;
    } finally {
        botonLigas.disabled = false;
    }
}

botonCargar.addEventListener('click', cargarEquipos);

consulta.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        cargarEquipos();
    }
});

buscar.addEventListener('input', pintarEquipos);

document.querySelectorAll('[data-equipo]').forEach(boton => {
    boton.addEventListener('click', () => {
        consulta.value = boton.dataset.equipo;
        cargarEquipos();
    });
});

botonLigas.addEventListener('click', cargarLigas);
