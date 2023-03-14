let listaAlumnos = [];

const objAlumno = {
    id: '',
    nombre: '',
    programa: ''
}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const programaInput = document.querySelector('#programa');
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(nombreInput.value === '' || programaInput.value === '') {
        alert('Todos los campos se deben llenar');
        return;
    }

    if(editando) {
        editarAlumno();
        editando = false;
    } else {
        objAlumno.id = Date.now();
        objAlumno.nombre = nombreInput.value;
        objAlumno.programa = programaInput.value;

        agregarAlumno();
    }
}

function agregarAlumno() {

    listaAlumnos.push({...objAlumno});

    mostrarAlumnos();

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objAlumno.id = '';
    objAlumno.nombre = '';
    objAlumno.programa = '';
}

function mostrarAlumnos() {
    limpiarHTML();

    const divAlumnos = document.querySelector('.div-alumnos');
    
    listaAlumnos.forEach(alumno => {
        const {id, nombre, programa} = alumno;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${programa} - `;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarAlumno(alumno);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarAlumno(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divAlumnos.appendChild(parrafo);
        divAlumnos.appendChild(hr);
    });
}

function cargarAlumno(alumno) {
    const {id, nombre, programa} = alumno;

    nombreInput.value = nombre;
    programaInput.value = programa;

    objAlumno.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    
    editando = true;
}

function editarAlumno() { 

    objAlumno.nombre = nombreInput.value;
    objAlumno.programa = programaInput.value;

    listaAlumnos.map(alumno => {

        if(alumno.id === objAlumno.id) {
            alumno.id = objAlumno.id;
            alumno.nombre = objAlumno.nombre;
            alumno.programa = objAlumno.programa;

        }

    });

    limpiarHTML();
    mostrarAlumnos();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    
    editando = false;
}

function eliminarAlumno(id) {

    listaAlumnos = listaAlumnos.filter(alumno => alumno.id !== id);

    limpiarHTML();
    mostrarAlumnos();
}

function limpiarHTML() {
    const divAlumnos = document.querySelector('.div-alumnos');
    while(divAlumnos.firstChild) {
        divAlumnos.removeChild(divAlumnos.firstChild);
    }
}