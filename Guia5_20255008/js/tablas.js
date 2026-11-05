// Ejemplo 2: tabla generada mediante JavaScript.
const alumnos = [
  { id: 1, nombre: 'Marcos Antonio', apellido: 'Alas', correo: 'marcos.alas@estudiante.esen.edu.sv' },
  { id: 2, nombre: 'Ana Paola', apellido: 'Rivas Polanco', correo: 'paola.rivas@estudiante.esen.edu.sv' },
  { id: 3, nombre: 'Alexis Armando', apellido: 'Quintanilla Peña', correo: 'alexis.quintanilla@estudiante.esen.edu.sv' },
  { id: 4, nombre: 'Vanessa Alejandra', apellido: 'Bermudez Urquilla', correo: 'vanessa.bermudez@estudiante.esen.edu.sv' },
  { id: 5, nombre: 'Oscar Armando', apellido: 'López Rodriguez', correo: 'oscar.lopez@estudiante.esen.edu.sv' }
];

const contenedor = document.querySelector('#idContenedor');
const tabla = document.createElement('table');
const encabezado = document.createElement('thead');
encabezado.innerHTML = '<tr><th scope="col">#</th><th scope="col">Nombre</th><th scope="col">Apellido</th><th scope="col">Correo electrónico</th></tr>';
const cuerpo = document.createElement('tbody');

alumnos.forEach(alumno => {
  const fila = document.createElement('tr');
  [alumno.id, alumno.nombre, alumno.apellido, alumno.correo].forEach(valor => {
    const celda = document.createElement('td');
    celda.textContent = valor;
    fila.appendChild(celda);
  });
  cuerpo.appendChild(fila);
});

tabla.append(encabezado, cuerpo);
contenedor.appendChild(tabla);
