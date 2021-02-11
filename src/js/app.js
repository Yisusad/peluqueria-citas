let pagina = 1;

const cita = {
    nombre: '',
    fecha: '',
    hora: '',
    servicios:[]
}

document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    mostrarServicios();

    //resalta Div actual
    mostrarSeccion();

    //Oculta seccion 
    cambiarSeccion();

    //Paginacion Sig Ant
    paginaSiguiente();
    paginaAnterior();

    //Comprobar pagina Actual para definir Siguiente/Anterior
    botonesPaginador();

    //Muestra el resumen de la cita o mensaje de error en caso de no pasar la validacion
    mostrarResumen();
}
function mostrarSeccion() {
    //Eliminar mostrar-seccion de secion anterior
    const seccionAnterior = document.querySelector('.mostrar-seccion');
    if (seccionAnterior){
        seccionAnterior.classList.remove('mostrar-seccion');
    }

    const seccionActual = document.querySelector(`#paso-${pagina}`);
    seccionActual.classList.add('mostrar-seccion');

    const tabAnterior = document.querySelector('.tabs .actual');
    if(tabAnterior){
        tabAnterior.classList.remove('actual');
    }
      // Resalta el Tab Actual
      const tab = document.querySelector(`[data-paso="${pagina}"]`);
      tab.classList.add('actual');
   
}

function cambiarSeccion() {
    const enlaces = document.querySelectorAll('.tabs button');

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', e => {
            e.preventDefault();
            pagina = parseInt(e.target.dataset.paso);

            mostrarSeccion();
            botonesPaginador();
        });
    });
}

async function mostrarServicios(){
    try {
        const resultado = await fetch('./servicios.json');
        const db = await resultado.json();
        const {servicios} = db;

        //Generar HTML
        servicios.forEach(servicio => {
            const {id, nombre, precio} = servicio;

            //DOM Scripting
            //Generar Nombre de Servicio
            const nombreServicio = document.createElement('P');
            nombreServicio.textContent = nombre;
            nombreServicio.classList.add('nombre-servicio');

            //Generar PrecioServicio
            const precioServicio = document.createElement('P');
            precioServicio.textContent = `$ ${precio}`;
            precioServicio.classList.add('precio-servicio');

            //Generar div contenedor de Servicio
            const servicioDiv = document.createElement('DIV');
            servicioDiv.classList.add('servicio');
            servicioDiv.dataset.idServicio = id;

            //Seleccionar servicio
            servicioDiv.onclick = selecionarServicio;

            //Agregar precio y nombre a Div
            servicioDiv.appendChild(nombreServicio);
            servicioDiv.appendChild(precioServicio);

            //Agregar en Html
            document.querySelector('#servicios').appendChild(servicioDiv);

        });
    } catch (error) {
        console.log(error);
    }
}

function selecionarServicio(e){

    let elemento;
    // Forzar click al DIV
    if(e.target.tagName === 'P'){
        elemento = e.target.parentElement;
    }else{
        elemento = e.target;
    }

    if(elemento.classList.contains('seleccionado')){
        elemento.classList.remove('seleccionado');
        
        const id = parseInt(elemento.dataset.idServicio);
        eliminarServicio(id);
    }else{
        elemento.classList.add('seleccionado');
        const servicioObj = {
            id: parseInt(elemento.dataset.idServicio),
            nombre: elemento.firstElementChild.textContent,
            precio: elemento.firstElementChild.nextElementSibling.textContent
        }
        agregarServicio(servicioObj);
    }
}

function eliminarServicio(id) {
    const {servicios} = cita;
    cita.servicios = servicios.filter(servicio => servicio.id !== id);
    
}

function agregarServicio(servicioObj){
    const {servicios} = cita;

    cita.servicios = [...servicios, servicioObj];

}

function paginaSiguiente(){
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', () => {
    pagina++;

    botonesPaginador();
    });
}

function paginaAnterior(){
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', () => {
    pagina--;

    botonesPaginador();
    });
}

function botonesPaginador(){
    const paginaSiguiente = document.querySelector('#siguiente');
    const paginaAnterior = document.querySelector('#anterior');

    if(pagina === 1){
        paginaAnterior.classList.add('ocultar');
    } else if(pagina === 3){
        paginaSiguiente.classList.add('ocultar');
        paginaAnterior.classList.remove('ocultar');
    } else {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }

    mostrarSeccion();
}

function mostrarResumen() {
    //Destructuring
    const {nombre, fecha, hora, servicios} = cita;
    
    //Seleccionar Resumen
    const resumenDiv = document.querySelector('.contenido-resumen');

    //Validacion de Objeto

    if(Object.values(cita).includes('')){
        const noServicios = document.createElement('P');
        noServicios.textContent = 'Faltan datos de Servicios, hora, fecha, nombre';

        noServicios.classList.add('invalidar-cita');
        
        //Agregar a resumenDiv
        resumenDiv.appendChild(noServicios);
    }
}