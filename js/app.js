// Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');
const resultado = document.querySelector('#resultado');

const max  = new Date().getFullYear();
const min = max -10;

// Generar un objeto con la búsqueda
const datosBusqueda = {
    marca: '',
    year: '',
    min: '',
    max: '',
    puertas: '',
    Transmision: '',
    color: '',
}

// Events
document.addEventListener('DOMContentLoaded', ()=>{
    mostrarAutos(autos); //Muestra los Automoviles al cargar

    // Llena las opciones de años
    llenarSelect();
 
})



// Event Listenner para los formularios de busqueda
marca.addEventListener('change',(e)=>{
  datosBusqueda.marca = e.target.value;
    filtrarAuto();
});

year.addEventListener('change',(e)=>{
    datosBusqueda.year = parseInt(e.target.value);
    filtrarAuto();
});

minimo.addEventListener('change', (e)=>{
    datosBusqueda.min = parseInt(e.target.value);
    filtrarAuto();
 
});

maximo.addEventListener('change',(e)=>{
    datosBusqueda.max = parseInt(e.target.value);
    filtrarAuto();
    
});
puertas.addEventListener('change',(e)=>{
    datosBusqueda.puertas = parseInt( e.target.value );
    filtrarAuto();
    
    
});

transmision.addEventListener('change',(e)=>{
    datosBusqueda.Transmision = e.target.value;
    
    filtrarAuto();

});

color.addEventListener('change',(e)=>{
    datosBusqueda.color = e.target.value;
    
    filtrarAuto();
});










// Functions
function mostrarAutos(autos){

    limpiarHTML();//elimina html previo


    autos.forEach((auto)=>{

        const {marca, modelo, year, precio, puertas, color, transmision} = auto
        const autosHTML = document.createElement('p');

        autosHTML.textContent= `
          ${marca} - Modelo: ${modelo} - Año: ${year} - Precio: ${precio}  -  ${puertas} Puertas  -  Transmisión: ${transmision} - Precio: ${precio} - Color: ${color} 
        `;

        // Insertar en el HTML 
        resultado.appendChild(autosHTML);
    })
}

// Limpiar HTML
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}




// Genera los años del select
function llenarSelect(){
    
    for(let i  = max; i >= min; i--){
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        year.appendChild(option); //Agrega las opciones de año al selct

    }

}


// Fuyncion que giltra en base a la busqueda
function  filtrarAuto(){
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtarMinimo).filter(filtarMaximo).filter(
        filtrarPuertas).filter( filtrarTransmision ).filter( filtrarColor );
    
    // console.log(resultado)
        if(resultado.length){
            mostrarAutos(resultado);
        }else{
            noResultado();

        }

    
}



function filtrarMarca(auto){

    // console.log(auto)
    const {marca} = datosBusqueda ;
    if(marca){
       return auto.marca === marca  
    }
    return auto;
}

function filtrarYear(auto){
    const {year} = datosBusqueda ;
    console.log(year)
    if(year){
       return auto.year === year;
    }
    return auto;
}

function filtarMinimo(auto){
    const {min} = datosBusqueda ;
    
    if(min){
       return auto.precio >= min ;
    }
    return auto;
}


function filtarMaximo(auto){
    const {max} = datosBusqueda;

    if(max){
        return auto.precio <= max;
    }
    return auto;
}

function filtrarPuertas(auto){
    const { puertas } = datosBusqueda;
    if( puertas ){
        return auto.puertas === puertas
    } 
    return auto;
}

function filtrarTransmision(auto){
    const { Transmision } = datosBusqueda;
    if( Transmision ){
        return auto.transmision === Transmision;
    }
    return auto;
}

function filtrarColor(auto){
    const { color } = datosBusqueda;
    if(color){
        return auto.color === color;
    }
    return auto;
}

function noResultado(){
    limpiarHTML();
    const noResultado = document.createElement('p');
    noResultado.classList.add('alerta','error');
    noResultado.textContent = 'No hay resultados, intenta con otros parámetros de Búsqueda';
    resultado.appendChild(noResultado);
}