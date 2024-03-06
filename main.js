// datos de prueba
let alumnos = [
    { id: 1, nombre: 'Juan', apellido: 'Perez', escuela: 'Bachillerato 1', materias: ['Matemáticas', 'Español'], dificultad: 'facil' },
    { id: 2, nombre: 'María', apellido: 'González', escuela: 'Bachillerato 2', materias: ['Historia', 'Ciencias'], dificultad: 'medio' }
];


function displayAlumnos() {
    const tableBody = document.getElementById('alumnos-body');
    tableBody.innerHTML = '';

    alumnos.forEach(alumno => {
        const row = `
            <tr>
                <td>${alumno.id}</td>
                <td>${alumno.nombre}</td>
                <td>${alumno.apellido}</td>
                <td>${alumno.escuela}</td>
                <td>${alumno.materias.join(', ')}</td>
                <td>${alumno.dificultad}</td>
                <td>
                    <button class="edit-btn" data-id="${alumno.id}">Editar</button>
                    <button class="delete-btn" data-id="${alumno.id}">Eliminar</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}


function openModal() {
    document.getElementById('modal').style.display = 'block';
}


function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// para agregar
document.getElementById('add-btn').addEventListener('click', () => {
    openModal();
    document.getElementById('alumno-id').value = '';
    document.getElementById('alumno-form').reset();
});

// Para guardar los cambios
document.getElementById('alumno-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById('alumno-id').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const escuela = document.getElementById('escuela').value;
    const materias = Array.from(document.querySelectorAll('input[name="materia"]:checked')).map(input => input.value);
    const dificultad = document.querySelector('input[name="dificultad"]:checked').value;

    if (id) {
        // Editar al alumno que ya existe
        const index = alumnos.findIndex(alumno => alumno.id == id);
        if (index !== -1) {
            alumnos[index] = { id, nombre, apellido, escuela, materias, dificultad };
        }
    } else {
        // Este es para añadir a un nuevo alumno.
        const newId = alumnos.length > 0 ? alumnos[alumnos.length - 1].id + 1 : 1;
        alumnos.push({ id: newId, nombre, apellido, escuela, materias, dificultad });
    }

    displayAlumnos();
    closeModal();
});

// cerrar botón
document.getElementsByClassName('close')[0].addEventListener('click', () => {
    closeModal();
});

// Editar los alumno
document.getElementById('alumnos-body').addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
        const id = e.target.getAttribute('data-id');
        const alumno = alumnos.find(alumno => alumno.id == id);
        if (alumno) {
            document.getElementById('alumno-id').value = alumno.id;
            document.getElementById('nombre').value = alumno.nombre;
            document.getElementById('apellido').value = alumno.apellido;
            document.getElementById('escuela').value = alumno.escuela;
            document.querySelector(`input[name="dificultad"][value="${alumno.dificultad}"]`).checked = true;
            
            const materiasCheckboxInputs = document.querySelectorAll('input[name="materia"]');
            materiasCheckboxInputs.forEach(input => {
                input.checked = alumno.materias.includes(input.value);
            });

            openModal();
        }
    } else if (e.target.classList.contains('delete-btn')) {
        const id = e.target.getAttribute('data-id');
        alumnos = alumnos.filter(alumno => alumno.id != id);
        displayAlumnos();
    }
});

displayAlumnos();