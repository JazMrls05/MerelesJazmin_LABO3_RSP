class Persona
{
    constructor(id, nombre,apellido, edad)
    {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }
    
}

class Heroe extends Persona
{

    constructor(id, nombre,apellido, edad, alterEgo, ciudad, publicado)
    { 
        super(id, nombre,apellido, edad);
        this.alterEgo = alterEgo;
        this.ciudad = ciudad;
        this.publicado = publicado;
        
    }

}

class Villano extends Persona
{

    constructor(id,nombre,apellido,edad, enemigo, robos, asesinatos)
    {
        super(id,nombre,apellido,edad);
        this.enemigo = enemigo;
        this.robos = robos;
        this.asesinatos = asesinatos;
    }

}

let lista = [];

//#region Elemento Spinner
const spinner = document.getElementById("spinner");
function mostrarSpinner()
{
    spinner.style.display = "block";
}

function ocultarSpinner()
{
    spinner.style.display = "none";
}
//#endregion

//#region OTROS ELEMENTOS

const selectTipo = document.getElementById("selectTipo");

// Formularios
const formLista = document.getElementById("formulario-lista");
const formABM = document.getElementById("formABM");

// Texto
const textoABM = document.getElementById("ABM_text");
const atrTipoLabel1 = document.getElementById("labelAtrTipo1");
const atrTipoLabel2 = document.getElementById("labelAtrTipo2");
const atrTipoLabel3 = document.getElementById("labelAtrTipo3");

//Inputs
const idInput = document.getElementById("inputId");
const nombreInput = document.getElementById("nombreInput");
const apellidoInput = document.getElementById("apellidoInput");
const edadInput = document.getElementById("edadInput");
const atrTipoInput1 = document.getElementById("inputAtrTipo1");
const atrTipoInput2 = document.getElementById("inputAtrTipo2");
const atrTipoInput3 = document.getElementById("inputAtrTipo3");

let listaInputs = [idInput,nombreInput,apellidoInput,edadInput,atrTipoInput1,atrTipoInput2,atrTipoInput3];

 //Botones
const btnAgregarPersona = document.getElementById("btn-agregar-persona");
const aceptarBtn = document.getElementById("enviarDatos");
const btnCancelar = document.getElementById("cancelar");

//#endregion

//#region Ocultar/Mostrar form
function mostrarFormListado()
{
    formLista.style.display = "block";
    mostrarTabla(lista);
    formABM.style.display = "none";
    
}
function ocultarFormListado()
{
    formLista.style.display = "none";
    formABM.style.display = "block";
}
//#endregion

//#region Eventos
aceptarBtn.addEventListener("click", async function(){
    mostrarSpinner();
    try{
        let index;
        switch(textoABM.innerText)
        {
            case "Alta":
                let persona;
                if (selectTipo.value === "heroe") {
                    persona = new Heroe(
                        null,
                        nombreInput.value,
                        apellidoInput.value,
                        edadInput.value,
                        atrTipoInput1.value,
                        atrTipoInput2.value,
                        parseInt(atrTipoInput3.value)
                    );

                } 
                else if (selectTipo.value === "villano") {
                    persona = new Villano(
                        null,
                        nombreInput.value,
                        apellidoInput.value,
                        edadInput.value,
                        atrTipoInput1.value,
                        parseInt(atrTipoInput2.value),
                        parseInt(atrTipoInput3.value)
                    );
                }
                darAltaPersona(persona);
                break;
            
            case "Modificar":
                index = BuscarPersona(idInput.value);
                await modificarPersona(lista[index]);
                break;
            case "Eliminar":
                index = BuscarPersona(idInput.value);
                await eliminarPersona(lista[index]);
                break;

        }

        ocultarSpinner();
        mostrarFormListado();
        
    }
    catch(error)
    {
        console.log(error);
        ocultarSpinner();
        mostrarFormListado();
        alert("Hubo un problema al realizar la operación");
    }
});

btnAgregarPersona.addEventListener("click", function() {
    ocultarFormListado();
    cambiarTextoABM("Alta");
});


btnCancelar.addEventListener("click", function() {
    mostrarFormListado();
});


selectTipo.addEventListener("change",function()
{
    switch(selectTipo.value)
    {
        case "heroe":
            atrTipoLabel1.textContent = "alterEgo:";
            atrTipoInput1.type = "text";
            atrTipoLabel2.textContent = "ciudad:";
            atrTipoInput2.type = "text";
            atrTipoLabel3.textContent = "publicado:";
            atrTipoInput3.type = "number";
            break;
        case "villano":
            atrTipoLabel1.textContent = "enemigo:";
            atrTipoInput1.type = "text";
            atrTipoLabel2.textContent = "robos:";
            atrTipoInput2.type = "number";
            atrTipoLabel3.textContent = "asesinatos:";
            atrTipoInput3.type = "number";
            break;
    }
});


function agregarEventos()
{
   const botonesModificar = document.getElementsByClassName("botonMod");
    for (let i = 0; i < botonesModificar.length; i++) {
        botonesModificar[i].addEventListener("click", function() {
            ocultarFormListado();
            cambiarTextoABM("Modificar");
            var tabla = document.getElementById("tabla-personas");
            var filas = tabla.getElementsByTagName("tr");

            for (var i = 1; i < filas.length; i++) {  
                filas[i].addEventListener("click", function() {
                    var celdas = this.getElementsByTagName("td"); 
                    var datos = [];
                    for (var j = 0; j < celdas.length; j++) {

                        datos.push(celdas[j].textContent);
                    }
                    for(var k = 0; k < listaInputs.length; k++)
                    {
                        listaInputs[k].value = datos[k];
                    }
   
                });
            }
        });
    }

    const botonesEliminar = document.getElementsByClassName("botonEli");
    for (let i = 0; i < botonesEliminar.length; i++) {
        botonesEliminar[i].addEventListener("click", function() {
            cambiarTextoABM("Eliminar");
            formLista.style.display = "none";
            formABM.style.display = "block";
            var tabla = document.getElementById("tabla-personas");
            var filas = tabla.getElementsByTagName("tr");

            for (var i = 1; i < filas.length; i++) {  
                filas[i].addEventListener("click", function() {
                    var celdas = this.getElementsByTagName("td"); 
                    var datos = [];
                    for (var j = 0; j < celdas.length; j++) {

                        datos.push(celdas[j].textContent);
                    }
                    for(var k = 0; k < listaInputs.length; k++)
                    {
                        listaInputs[k].value = datos[k];
                    }
   
                });
            }

            const id = this.id.replace("btnEli", "");
            

            eliminarPersona(id)
            .then(() => {
                ocultarSpinner();
                formLista.style.display = "block";
                alert("Elemento eliminado correctamente");
            })
            .catch(error => {
                ocultarSpinner();
                formLista.style.display = "block";
                alert("Hubo un problema al eliminar el elemento");
                console.log(error);
            });
        });
    }
    
}

//#endregion

//#region TABLA
function mostrarTabla(lista)
{
    const tabla = document.getElementById("tabla-personas");
    tabla.innerHTML = "";

    const listaEncabezado = ["ID","Nombre","Apellido","Edad","AlterEgo","Ciudad","Publicado","Enemigo","Robos","Asesinatos","Modificar/eliminar"];

    const encabezado = document.createElement("tr");

    listaEncabezado.forEach(atributo => {
        const tablaHead = document.createElement("th");
        tablaHead.textContent = atributo; 
        tablaHead.className = "col-" + atributo.toLowerCase();
        encabezado.appendChild(tablaHead);
        
    });
    tabla.appendChild(encabezado);

    lista.forEach(persona => 
        {
            const fila = document.createElement("tr");

            //ID

            const celdaID = document.createElement("td");
            celdaID.textContent = persona.id;
            celdaID.className = "col-id";
            fila.appendChild(celdaID);
            
            // Nombre
            const celdaNombre = document.createElement("td");
            celdaNombre.textContent = persona.nombre;
            celdaNombre.className = "col-nombre";
            fila.appendChild(celdaNombre);

            // Apellido
            const celdaApellido = document.createElement("td");
            celdaApellido.textContent = persona.apellido;
            celdaApellido.className = "col-apellido";
            fila.appendChild(celdaApellido);

            // Edad
            const celdaEdad = document.createElement("td");
            celdaEdad.textContent = persona.edad;
            celdaEdad.className = "col-edad";
            fila.appendChild(celdaEdad);


            // AlterEgo
            const celdaAlterEgo = document.createElement("td");
            celdaAlterEgo.textContent = persona.alterEgo || "N/A";
            celdaAlterEgo.className = "col-alterEgo";
            fila.appendChild(celdaAlterEgo);

            // Ciudad
            const celdaCiudad = document.createElement("td");
            celdaCiudad.textContent = persona.ciudad || "N/A";
            celdaCiudad.className = "col-ciudad";
            fila.appendChild(celdaCiudad);

            // Publicado
            const celdaPublicado = document.createElement("td");
            celdaPublicado.textContent = persona.publicado || "N/A";
            celdaPublicado.className = "col-publicado";
            fila.appendChild(celdaPublicado);

            // Enemigo
            const celdaEnemigo = document.createElement("td");
            celdaEnemigo.textContent = persona.enemigo || "N/A";
            celdaEnemigo.className = "col-enemigo";
            fila.appendChild(celdaEnemigo);

            // Robos
            const celdaRobos = document.createElement("td");
            celdaRobos.textContent = persona.robos || "N/A";
            celdaRobos.className = "col-robos";
            fila.appendChild(celdaRobos);

            // Asesinatos
            const celdaAsesinatos = document.createElement("td");
            celdaAsesinatos.textContent = persona.asesinatos || "N/A";
            celdaAsesinatos.className = "col-asesinatos";
            fila.appendChild(celdaAsesinatos);
            
            // Modificar
            const celdaModificar = document.createElement("button");
            celdaModificar.textContent = "Modificar";
            celdaModificar.className = "botonMod";
            celdaModificar.id = persona.id + "btnMod";
            fila.appendChild(celdaModificar);
            
            // Eliminar 
            const celdaEliminar = document.createElement("button");
            celdaEliminar.textContent = "Eliminar";
            celdaEliminar.className = "botonEli";
            celdaEliminar.id = persona.id + "btnEli";
            fila.appendChild(celdaEliminar);      
            
            tabla.appendChild(fila);
            
        }

    );
    agregarEventos();
}
//#endregion


function cambiarTextoABM(palabra)
{
    textoABM.innerText = palabra;
}


//#region GET
function obtenerPersonas()
{
    mostrarSpinner();
    setTimeout(function() {
        const xhttp = new XMLHttpRequest(); 
        xhttp.open("GET", "https://examenesutn.vercel.app/api/PersonasHeroesVillanos", true);
        xhttp.setRequestHeader('Content-type', 'application/json'); 
        xhttp.onload = function() {
            ocultarSpinner();
            if (xhttp.status === 200)
            {
                listaJSON = JSON.parse(xhttp.responseText);
                let listaPersonas = listaJSON.map(persona => {
                    if(persona.ciudad != null)
                        {return new Heroe(persona.id, persona.nombre,persona.apellido, persona.edad,persona.alterEgo,persona.ciudad,persona.publicado);}
                    else if (persona.enemigo != null)
                        {return new Villano(persona.id, persona.nombre, persona.apellido,persona.edad,persona.enemigo,persona.robos,persona.asesinatos);}
                    else {return new Persona(persona.id, persona.nombre,persona.apellido,persona.edad);}
                });
                
                lista = [...listaPersonas];
                mostrarFormListado();
                
            }
            else
            {alert("Error. No se pudo obtener la lista de personas.");}
        }; 
        xhttp.send(); 
    }, 1500);
   
}
//#endregion 

//#region ALTA 

function darAltaPersona(persona)
{
    mostrarSpinner();
    fetch('https://examenesutn.vercel.app/api/PersonasHeroesVillanos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(persona)
        
    })
    
    .then(response => {
        console.log(persona);
        ocultarSpinner();
        console.log(response);
        if (!response.ok) {
            throw new Error('No se pudo agregar la persona.');
        }
        return response.json();
    })
    .then(respuesta => {
        persona.id = respuesta.id; 
        lista.push(persona); 

        mostrarFormListado();
    })
    .catch(error => {
        console.error('Error al agregar persona:', error);
        alert('Error al agregar la persona. Por favor, intenta nuevamente.');
        
        mostrarFormListado();
    })
    .finally(() => {
        ocultarSpinner();
    });
}

//#region MODIFICACIÓN


async function modificarPersona(persona)
{
    mostrarSpinner();
     
    try
    {
        const response = await fetch('https://examenesutn.vercel.app/api/PersonasHeroesVillanos', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(persona)
        });

        ocultarSpinner();
        if (response.ok) {
            const respuesta = await response.text();

            let personaModificada;
            

        if (persona instanceof Heroe) {
            personaModificada = new Heroe(
                persona.id,
                nombreInput.value,
                apellidoInput.value,
                edadInput.value,
                atrTipoInput1.value,
                atrTipoInput2.value,
                atrTipoInput3.value
            );
        } else if (persona instanceof Villano) {
            personaModificada = new Villano(
                persona.id,
                nombreInput.value,
                apellidoInput.value,
                edadInput.value,
                atrTipoInput1.value,
                atrTipoInput2.value,
                atrTipoInput3.value
            );
        } else {
            throw new Error('Tipo de persona no reconocido');
        }


        actualizarPersonaEnLista(personaModificada);
        mostrarFormListado();

        return respuesta;
    }

    }
    catch(error)
    {
        console.error('Error al modificar persona:', error);
        ocultarSpinner();
        mostrarFormListado();
        alert('Hubo un problema al modificar la persona');
        reject(error);
    }

}

function actualizarPersonaEnLista(personaModificada) {
    const index = lista.findIndex(p => p.id === personaModificada.id);
    if (index !== -1) {
        lista[index] = personaModificada;
    } else {
        throw new Error('Persona no encontrada en la lista');
    }
}
function BuscarPersona(id) {
	let index = -1;
	for (let i = 0; i < lista.length; i++) {
		let persona = lista[i];
		if (persona.id == id) {
			index = i;
			break;
		}
	}

	return index;
}

//#endregion

//#region ELIINACIÓN


function eliminarPersona(id) 
{
    return new Promise((resolve, reject) => {
        mostrarSpinner();
        setTimeout(function() {
            const xhttp = new XMLHttpRequest();
            xhttp.open('DELETE', 'https://examenesutn.vercel.app/api/PersonasHeroesVillanos', true);
            xhttp.setRequestHeader('Content-Type', 'application/json');
    
            xhttp.onload = function() {
                ocultarSpinner(); 
                if (xhttp.status === 200) {
                    const index = lista.findIndex(e => e.id === parseInt(id));
                    if (index !== -1) {
                        lista.splice(index, 1); 
                        mostrarFormListado();
                        resolve();
                    } else {
                        reject('Error al buscar a la persona');
                    }
 
                } else {
                    reject('No se pudo eliminar a la persona.'); 
                }
            };
    
            xhttp.send(JSON.stringify({ id: parseInt(id) }));
    
        }, 2000);
    });

}

//#endregion

obtenerPersonas();
