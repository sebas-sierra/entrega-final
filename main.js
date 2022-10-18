/* - - - - - - - - - - - - - - - - -
L
O
G
I
N
- - - - - - - - - - - - - - - - - */
let formRegistro = document.getElementById('registrar');
formRegistro.addEventListener('click', registrarUsuario);

let formLogueo = document.getElementById('loguear');
formLogueo.addEventListener('click', loguearUsuario);

const divForms = document.getElementById('divForms')
const divProde = document.getElementById('divProde')
const menuFlotante = document.getElementById('menu-flotante')
function loguearUsuario(e) {
    e.preventDefault();

    const usuario = document.getElementById('logUsuario').value;
    const password = document.getElementById('logPassword').value;

    const recuperarUsuario = localStorage.getItem('usuario');
    const usuarioRecuperado = JSON.parse(recuperarUsuario);

    //console.log(usuarioRecuperado.password);

    const mensaje = document.getElementById("mensajeDelFormLogueo")

    if (usuarioRecuperado == null) {
        mensaje.innerText = "Ingresá un nombre de usuario válido!";
        setTimeout(() => {
            mensaje.className = "ocultarForm";
            document.getElementById('loginUsuario').reset();
        }, 3000);
    } else if (usuario == usuarioRecuperado.nombre && password == usuarioRecuperado.password) {
        divProde.className = "mostrarForm";
        divForms.className = "ocultarForm";
        menuFlotante.className = "mostrarContent navbar sticky-top bg-light d-lg-block"
        document.getElementById('loginUsuario').reset();
    } else {
        mensaje.innerText = "El password que ingresaste es incorrecto!";
        setTimeout(() => {
            mensaje.className = "ocultarForm";
        }, 3000);
    }
}


function registrarUsuario(e) {
    e.preventDefault();
    const usuario = document.getElementById('usuario').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const usuarioRegistrado = {
        nombre: usuario,
        email: email,
        password: password,
    }

    const msjRegistro = document.getElementById('msjDelFormRegistro')

    if (usuarioRegistrado.nombre && usuarioRegistrado.email && usuarioRegistrado.password) {
        const usuarioLocalStorage = JSON.stringify(usuarioRegistrado);
        localStorage.setItem('usuario', usuarioLocalStorage)
        console.log("usuario añadido al localStorage")

        document.getElementById("formRegistro").classList.remove("mostrarForm");
        document.getElementById("formLogueo").classList.remove("ocultarForm");
        document.getElementById('registroUsuario').reset()

    } else {
        msjRegistro.innerText = "Por favor, completa el formulario para registrarte como un nuevo usuario.";
        setTimeout(() => {
            msjRegistro.className = "ocultarForm";
        }, 5000);
    }
}

document.getElementById("btnToRegistro").onclick = function () { irAlRegistro() };
function irAlRegistro() {
    document.getElementById("formRegistro").classList.toggle("mostrarForm");
    document.getElementById("formLogueo").classList.toggle("ocultarForm");
}

document.getElementById("btnToLogin").onclick = function () { irAlLogin() };
function irAlLogin() {
    document.getElementById("formRegistro").classList.remove("mostrarForm");
    document.getElementById("formLogueo").classList.remove("ocultarForm");
}

document.getElementById("desloguear").onclick = function () { logOut() };
function logOut() {
    localStorage.removeItem('usuario')
    document.getElementById('divProde').className = "ocultarForm";
    document.getElementById("divForms").className = "mostrarForm";
    menuFlotante.className = "ocultarContent";
}

/* - - - - - - - - - - - - - - - - -
P
R
O
D
E
- - - - - - - - - - - - - - - - - */
let usuarioLogueado = JSON.parse(localStorage.getItem('usuario'));
function mostrarUsuarioLogueado (){
    const bienvenidamsg = document.getElementById('username')
    bienvenidamsg.innerText = usuarioLogueado.nombre;

}

//difinicion de la clase constructora para el objeto resultado
class Resultado {
    constructor(id, local, visitante, golesL, golesV, ) {
        this.id = id,
        this.equipoLocal = local;
        this.equipoVisitante = visitante;
        this.golesLocal = golesL;
        this.golesVisitante = golesV;
    }    
}

const misResultados = []

const lista = document.querySelector('#formulario')
const tablaResultadosGuardados = document.querySelector('#misResultadosGuardados2')

// - Tabla de puntajes de usuarios
/* - la idea es que cada usuario pueda comprar sus resultados con los "resultados oficiales" y obtenga un puntaje en base a dicha 
     comparacion y por lo tanto una ubicacion dentro de la tabla de posiciones. Esta tabla de posiciones se muestra a travez de la fn "mostrarPuntajes",
     dentro de la conts "tablaPuntos" en el div con id="tablapuntaje"
     */
const tablaPuntos = document.querySelector("#tablapuntaje tbody");
     
fetch('data.json')
.then((res) => res.json()
    .then((data) => {

        data.forEach((partido) => {
            const li = document.createElement('div')
            li.innerHTML = `<form class="card mb-3 forma" id="juego_${partido.partidoId}" >
                    <div class="datosParaGuardar">
                            <h6 class="card-title text-center"><span>Partido nro.: <span><label id="partido-ID${partido.partidoId}">${partido.partidoId}</label></h6>
                            <p class="text-center"><small>Fecha: ${partido.fecha} | Estadio: ${partido.estadio} | Horario: ${partido.horario}</small></p>
                            <div class="card-group">
                                <div class="partido-card card ">
                                    <img id="equipo-visitante${partido.partidoId}" class="card-image-top" src="${partido.escudo_equipoLocal}" alt="MDN">
                                    <div class="card-body">
                                        <div class="mb-3">
                                            <input class="form-control" id="goles-local${partido.partidoId}" name="golLocal" placeholder="0" autocomplete="off">
                                            <label id="equipo-local${partido.partidoId}" for="golLocal" class="form-label text-center">${partido.equipoLocal}</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="partido-card card">
                                    <img id="equipo-visitante${partido.partidoId}" class="card-image-top" src="${partido.escudo_equipoVisitante}" alt="MDN">
                                    <div class="card-body">
                                        <div class="mb-3">
                                            <input class="form-control" id="goles-visitante${partido.partidoId}" name="golVisitante" placeholder="0" autocomplete="off">
                                            <label id="equipo-visitante${partido.partidoId}" for="golVisitante" class="form-label text-center">${partido.equipoVisitante}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button id="guardarBtn_${partido.partidoId}" type="button" class="btn btn-primary guardarResultado">Guardar resultado</button>
                        </div>
                    </form>`

            lista.append(li)
            li.setAttribute('class', 'list-group-item')
            let botonGuardar = document.querySelector(`#guardarBtn_${partido.partidoId}`)
            botonGuardar.addEventListener ('click', fnGuardarResultado)
            
            function fnGuardarResultado(event) {
                event.preventDefault()
                console.log(event)

                let formulario = document.querySelector(`#juego_${partido.partidoId}`)
                console.dir(formulario);

                let golesLocalNuevoProde = document.getElementById(`goles-local${partido.partidoId}`).value;
                let golesVisitanteNuevoProde = document.getElementById(`goles-visitante${partido.partidoId}`).value;

                const nuevoProde = new Resultado(
                    `${partido.partidoId}`,
                    `${partido.equipoLocal}`,
                    `${partido.equipoVisitante}`,
                    golesLocalNuevoProde,
                    golesVisitanteNuevoProde
                );

                misResultados.push(nuevoProde)
                console.log(misResultados)
                mostrarListado()

                //limpia los inputs
                document.getElementById(`juego_${partido.partidoId}`).reset();
                document.getElementById(`guardarBtn_${partido.partidoId}`).disabled = true;
            }
	mostrarUsuarioLogueado ()
        })
    })
    );

//con estas constantes manejo la visibilidad de la tabla donde se guardan mis resultados
const divIdPreCarga = document.querySelector("#preCarga")
const divIdPostCarga = document.querySelector("#postCarga")

function mostrarListado() {
    divIdPreCarga.className = "ocultarContent";
    divIdPostCarga.className = "mostrarContent";
    tablaResultadosGuardados.innerHTML = "";
    misResultados.forEach((partido) => {
        const partidoHTML = document.createElement('tr');
        partidoHTML.innerHTML = `<td>${partido.id}</td>
                                 <td id="glocal">${partido.equipoLocal}: <span id="localg">${partido.golesLocal}</span></td>
                                 <td id="gvisitante">${partido.equipoVisitante}: <span id="visitanteg">${partido.golesVisitante}</span></td>
                                 <td id="comparacion_${partido.id}"> - 0 - </td>`;
        tablaResultadosGuardados.appendChild(partidoHTML);
        partidoHTML.setAttribute('id', `position_${partido.id}`);
    })
    
    if (misResultados.length >= 4) {
        document.getElementById('compararResultados').disabled = false;
    }
};

//- - - - - - - - - - LOCALSTORAGE && JASON - - - - - - - - - - 

//Aca esta mi array de usuarios para guardar en el localStorage
let usuarios =[ 
    {id:1, nombre:'Noe-CARP', aciertos_exactos: 4, puntos_total: 12 },
    {id:2, nombre:'HijosDelReyCrimson', aciertos_exactos: 3, puntos_total: 9 },
    {id:3, nombre:'NegroEl31', aciertos_exactos: 3, puntos_total: 9 },
    {id:4, nombre:'ParrillaCaco', aciertos_exactos: 2, puntos_total: 6 },
    {id:5, nombre:'Toni_capo_del_sur', aciertos_exactos: 0, puntos_total: 7 }
];

//Guardo cada uno de los objetos del array en el localStorage 
const usuariosJSON = (clave, valor) =>{localStorage.setItem(clave, valor)};
//Guardo el array completo definiendo 'listausuarios' como clave y el valor viene a ser el array 'usuarios'
usuariosJSON('listausuarios', JSON.stringify(usuarios));

//Para sacar los objetos del array defino una clase constructora
class Usuario {
    constructor(el) {
        this.nombre = el.nombre;
        this.aciertos_exactos = el.aciertos_exactos;
        this.puntos_total = el.puntos_total;
    }
}

//Tomo mi 'listadusuarios' del localStorage y la separo usando un for para formatear 
//el string con la clase constructora anterior y lo meto en un nuevo array guardados
const guardados = JSON.parse(localStorage.getItem('listausuarios'));
usuarios = [];

for (const coso of guardados) {
    usuarios.push(new Usuario(coso));
    
};

//lo muestro por consola
console.log(usuarios);
console.log(guardados[2].nombre);

//Esta es la fn que toma los datos de los usuarios dentro del array 'guardados' y me los muestra en una tabla a traves de la constante tablaPuntos
function mostrarpuntajes() {
    tablaPuntos.innerHTML = "";
    let counterUsuarios = 1;
    guardados.forEach((usuarioenguardados) => {
        const puntajeHTML = document.createElement("tr");
        puntajeHTML.innerHTML = `<th scope="row">${counterUsuarios++}</th>
                          <td>${usuarioenguardados.nombre}</td>
                          <td class="text-center">${usuarioenguardados.aciertos_exactos}</td>
                          <td class="text-center">${usuarioenguardados.puntos_total}</td>
                          <td class="text-center ocultarContent">${usuarioenguardados.id}</td>
                           `;
        tablaPuntos.appendChild(puntajeHTML);
        puntajeHTML.setAttribute('id', `${usuarioenguardados.id}`);
    });
}
mostrarpuntajes()

//Esta es la clase constructor de los objetos del array resultadosOficiales
class ResultadoFinal {
    constructor(id, local, visitante, golesL, golesV) {
        this.id = id,
        this.equipoLocal = local;
        this.equipoVisitante = visitante;
        this.golesLocal = golesL;
        this.golesVisitante = golesV;
    }    
}

let resultadosOficiales=[]

resultadosOficiales.push(new ResultadoFinal(1,"Banfield", "Defensa y Justicia", 1, 2));
resultadosOficiales.push(new ResultadoFinal(2,"Quilmes", "Arsenal de Sarandi", 3, 0));
resultadosOficiales.push(new ResultadoFinal(3,"Deportivo Moron", "Patronato", 1, 1));
resultadosOficiales.push(new ResultadoFinal(4,"Central Cordoba", "Atlanta", 2, 3));

//- - - - - - - - - - USO DE OPERADOR TERNARIO Y DESESTRUCTURACION - - - - - - - - - - 

const puntos =[]
let counter = 0;
console.log(misResultados);

let botonComparar = document.querySelector('#compararResultados')

function compararResultados() {
    // swal("Bien ahi!", "Clickeaste el boton Comparar resultados!", "success", {
    //     buttons: false,
    //     timer: 3000,
    // });

    //Mensajes que se muestran segun el resultado de la ejecucion de los condicionales usados para comprar los resultados
    let msg1 = "Tu pronostico para el partido fue exacto, ademas de los 3 ptos por acertar el final del encuentro tenes 2 puntos extra!!!";
    let msg2 = "Tu pronostico no fue exacto, pero el partido fue empate por lo tanto sumas 3 puntos!";
    let msg3 = "Tu pronostico no fue exacto, pero acertaste el ganador local por lo tanto sumas 3 puntos!";
    let msg4 = "Tu pronostico no fue exacto, pero acertaste el ganador visitante por lo tanto sumas 3 puntos!";
    let msg5 = "Tu pronostico fue errado, no sumas puntos";

    resultadosOficiales.forEach(function (i) {
        misResultados.forEach(function (j) {
            if (i.id == j.id) {
                //roid -> resultados oficiales id || rogl -> resultados oficiales goles local || rogv -> resultados oficiales goles visitante
                let roid = i.id;
                let rogl = i.golesLocal;
                let rogv = i.golesVisitante;
                console.log("resultado oficial partido nro." + roid + ":" + rogl + "-" + rogv);

                //mrid -> mis resultados id || mrgl -> mis resultados goles local || mrgv -> mis resultados goles visitantes
                let mrid = j.id;
                let mrgl = j.golesLocal;
                let mrgv = j.golesVisitante;
                console.log("mi resultado partido nro." + mrid + ":" + mrgl + "-" + mrgv);

                //TERNARIO
                (mrgl == rogl) && (mrgv == rogv) ? pronosticoExacto() : (mrgl == mrgv) && (rogl == rogv) ? partidoEmpate() : (mrgl > mrgv) && (rogl > rogv) ? partidoganaLocal() : (mrgl < mrgv) && (rogl < rogv) ? partidoganaVisitante() : pronosticoFallido();
                
                function pronosticoExacto() {
                    puntos.push(5);
                    counter++;//este counter lo necesito en la tabla de puntaje para indicar la cantidad de los resultados exactos
                    console.log(msg1);
                    let puntaje = `<span class="puntaje_exacto">5</span>`;
                    document.getElementById(`comparacion_${i.id}`).innerHTML = puntaje;
                }

                function partidoEmpate() {
                    puntos.push(3);
                    console.log(msg2);
                    let puntaje = `<span class="puntaje">3</span>`;
                    document.getElementById(`comparacion_${i.id}`).innerHTML = puntaje;
                }

                function partidoganaLocal() {
                    puntos.push(3);
                    console.log(msg3);
                    let puntaje = `<span class="puntaje">3</span>`;
                    document.getElementById(`comparacion_${i.id}`).innerHTML = puntaje;
                }

                function partidoganaVisitante() {
                    puntos.push(3);
                    console.log(msg4);
                    let puntaje = `<span class="puntaje">3</span>`;
                    document.getElementById(`comparacion_${i.id}`).innerHTML = puntaje;
                }

                function pronosticoFallido() {
                    puntos.push(0);
                    console.log(msg5);
                    let puntaje = `<span class="puntaje-0">0</span>`;
                    document.getElementById(`comparacion_${i.id}`).innerHTML = puntaje;
                }
            }
        })
    });
    sumaPuntos()
    nuevoPuntajeEnTabla()
    mostrarTotal()
    //una vez que el boton corre la funcion de comparacion se deshabilita
    document.getElementById("compararResultados").disabled = true;

}
botonComparar.addEventListener ('click', compararResultados)
//Funcion para sumar puntos
let totalPuntos = 0;
function sumaPuntos(){
    for (let i = 0; i < puntos.length; i++) {
        totalPuntos += puntos[i];
    }
    console.log(totalPuntos);
}

function mostrarTotal() {
    const puntaje = document.createElement("p");
    puntaje.innerHTML = totalPuntos;
    document.getElementById("misPuntosTotal").className ='mostarContent'
    document.getElementById("misPuntosTotal").appendChild(puntaje)
}
//Con esta funcion agrega un nuevo objeto al array 'guardados', este array contiene una lista de usuarios guardados usando localStorage. 
//El objeto contiene las propiedades nombre + aciertos_exactos + puntos_total del usuario logueado
function nuevoPuntajeEnTabla() {
    guardados.push({ id: 'uchuario', nombre: usuarioLogueado.nombre, aciertos_exactos: counter, puntos_total: totalPuntos })
    
    console.log(guardados)
    //ordenandoArray => atraves del metodo sort ordena los elementos dentro del array 'guardados' segun el valor del puntaje
    guardados.sort((a, b) => {
        if (a.puntos_total == b.puntos_total) {
            return 0;
        }
        if (a.puntos_total > b.puntos_total) {
            return -1;
        }
        return 1;
    });
    console.log(guardados)
    mostrarpuntajes()
    document.getElementById('uchuario').className = "table-info";
}


//funcion para guardar la tabla con mi prode en un archivo pdf
window.jsPDF = window.jspdf.jsPDF
let btnToPDF = document.querySelector('#pasarPDF');
btnToPDF.addEventListener ('click', pasarHTMLaPDF);
function pasarHTMLaPDF() {
    let doc = new jsPDF('p', 'pt', 'a4', true);
	
    // Source HTMLElement or a string containing HTML.
    let elementHTML = document.querySelector("#postCarga");
    let margin = 10;
    let scale = (doc.internal.pageSize.width - margin * 2) / elementHTML.scrollWidth;
    doc.html(elementHTML, {
        x: margin,
        y: margin,
        html2canvas: {scale: scale,},
        callback: function(doc) {
            // guardar PDF como:
            doc.save('miProde.pdf');
        }
        
    });
}
/* esta es otra opcion de libreria para convertir a pdf


    script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>

function generatePDF() {
   const element = document.getElementById('container_content');
   var opt = {
      margin:       1,
      filename:     'html2pdf_example.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    // Choose the element that our invoice is rendered in.
    html2pdf().set(opt).from(element).save();
   }*/
