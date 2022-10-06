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

const misResultados = [
    //{"partidoId": 1, "equipoLocal": "Atletico Tucuman", "equipoVisitante": "Colon", "golesLocal": "", "golesVisitante": ""},
]

const lista = document.querySelector('#formulario')

const tablaResultadosGuardados = document.querySelector('#misResultadosGuardados')


fetch('data.json')
.then((res) => res.json()
    .then((data) => {

        data.forEach((partido) => {
            const li = document.createElement('li')
            li.innerHTML = 
            `
            <form class="card mb-3 forma" id="juego_${partido.partidoId}" >
                    <div class="card-body">
                        <div class="datosParaGuardar">

                            <h6 class="card-title"><span>Partido nro.: <span><label id="partido-ID${partido.partidoId}">${partido.partidoId}</label></h6>
                            
                            <div class="input-group mb-3">
                                <label id="equipo-local${partido.partidoId}" for="golLocal" class="input-group-text">${partido.equipoLocal}</label>
                                <input class="form-control" id="goles-local${partido.partidoId}" type="number" name="golLocal" >
                            </div>
                            <div class="input-group mb-3">
                                <label id="equipo-visitante${partido.partidoId}" for="golVisitante" class="input-group-text">${partido.equipoVisitante}</label>
                                <input class="form-control" id="goles-visitante${partido.partidoId}" type="number" name="golVisitante" value=" ">
                            </div>
                        </div>
                        <button id="guardarBtn_${partido.partidoId}" type="button" class="btn btn-primary">Guardar resultado</button>

                    </div>
                </div>   
            </form>
            `

            lista.append(li)
            li.setAttribute('class', 'list-group-item')
            // let inputgoleslocal = document.querySelector(`#goles-local${partido.partidoId}`)
            // console.dir(inputgoleslocal)
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

            }

            
        })
        

    })
    );

function mostrarListado() {
    tablaResultadosGuardados.innerHTML = "";

    misResultados.forEach((partido) => {
        const partidoHTML = document.createElement('tr');
        partidoHTML.innerHTML = `<td>${partido.id}</td>
                                     <td id="glocal">${partido.equipoLocal}: <span id="localg">${partido.golesLocal}</span></td>
                                     <td id="gvisitante">${partido.equipoVisitante}: <span id="visitanteg">${partido.golesVisitante}</span></td>
                                     <td><button id="editarBtn_${partido.id}" type="button" onclick="editarResultado(event)" class="btn btn-outline-primary">editar resultado</button></td>`;
        tablaResultadosGuardados.appendChild(partidoHTML);
        partidoHTML.setAttribute('id', `position_${partido.id}`);
    })
};
