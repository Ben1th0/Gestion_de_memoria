// Array para almacenar los programas
let programas = [];

// Array para almacenar los procesos
let procesos = [];

// Array para tipodeajuste
let tipoAjusteSeleccionado = null;

// Array para particiones
const listaParticiones = [];

//clase para procesos
class Proceso {
  constructor(nombre, tamaño, identificador) {
      this.nombre = nombre;
      this.tamaño = tamaño;
      this.identificador = identificador;
  }
}

//primer ajuste

function aplicarPrimerAjuste(ident) {
    let proceso;
    let indiceParticionLibre = -1;
  
    //buscador de proceso 
    for (let i = 0; i < procesos.length; i++) {
        if(procesos[i].identificador == ident){
            proceso = procesos[i];
        }
    }

    // Buscar la primera partición libre que sea lo suficientemente grande
    for (let i = 0; i < listaParticiones.length; i++) {
      if (listaParticiones[i].estado === 'libre' && listaParticiones[i].tamaño >= proceso.tamano) {
        indiceParticionLibre = i;
        break;
      }
    }
  
    if (indiceParticionLibre === -1) {
      alert("no hay espacio disponible");
    }else {
        // Asignar el proceso a la partición libre
        listaParticiones[indiceParticionLibre].estado = 'ocupado';
        listaParticiones[indiceParticionLibre].nombre = proceso.nombre;
        listaParticiones[indiceParticionLibre].proceso = proceso.identificador;
        crearParticionesGraficas();
    }
}
  
// Ejemplo de función para aplicar el algoritmo de Peor Ajuste
function aplicarPeorAjuste(ident) {
    var proceso;
    let indiceParticionLibre = -1;
    let mayorTamañoLibre = -1;

    //buscador de proceso 
    for (let i = 0; i < procesos.length; i++) {
        if(procesos[i].identificador == ident){
            proceso = procesos[i];
        }
    }
  
    // Buscar la partición libre con el mayor tamaño
    for (let i = 0; i < listaParticiones.length; i++) {
      if (listaParticiones[i].estado === 'libre' && listaParticiones[i].tamaño >= proceso.tamano) {
        if (listaParticiones[i].tamaño > mayorTamañoLibre) {
          indiceParticionLibre = i;
          mayorTamañoLibre = listaParticiones[i].tamaño;
        }
      }
    }
  
    if (indiceParticionLibre === -1) {
        alert("no hay espacio disponible");
    }else{
        // Asignar el proceso a la partición libre
        listaParticiones[indiceParticionLibre].estado = 'ocupado';
        listaParticiones[indiceParticionLibre].nombre = proceso.nombre;
        listaParticiones[indiceParticionLibre].proceso = proceso.identificador;
        crearParticionesGraficas();
    }
}

function aplicarMejorAjuste(ident){
    var proceso;
    let indiceParticionLibre = -1;
    let mejorajuste = 16777216;

    //buscador de proceso 
    for (let i = 0; i < procesos.length; i++) {
        if(procesos[i].identificador == ident){
            proceso = procesos[i];
        }
    }

    for (let i = 0; i < listaParticiones.length; i++) {
        if (listaParticiones[i].estado === 'libre' && listaParticiones[i].tamaño >= proceso.tamano) {
          if ((mejorajuste - listaParticiones[i].tamaño) < mejorajuste){
            indiceParticionLibre = i;
            mejorajuste = mejorajuste - listaParticiones[i].tamaño;
            break;
          }
        }
    }

    if (indiceParticionLibre === -1) {
        alert("no hay espacio disponible");
    }else{
        // Asignar el proceso a la partición libre
        listaParticiones[indiceParticionLibre].estado = 'ocupado';
        listaParticiones[indiceParticionLibre].nombre = proceso.nombre;
        listaParticiones[indiceParticionLibre].proceso = proceso.identificador;
        crearParticionesGraficas();
    }
}

// Función para actualizar la tabla de programas
function actualizarTablaProgramas() {
    var tablaProgramas = document.getElementById('tablaProgramas');
    tablaProgramas.innerHTML = '';

    for (let i = 0; i < programas.length; i++) {
        var tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="part-item">${programas[i].nombre}</td>
            <td class="part-item">${programas[i].text}</td>
            <td class="part-item">${programas[i].data}</td>
            <td class="part-item">${programas[i].bss}</td>
            <td class="part-item">${programas[i].memoria}</td>
            <td class="part-item">
                <button onclick="agregarProcesoDesdePrograma(${i})">iniciar Proceso</button>
            </td>
        `;
        tablaProgramas.appendChild(tr);
    }
}

// Función para actualizar la tabla de procesos
function actualizarTablaProcesos() {
    var tablaProcesos = document.getElementById('tablaProcesos');
    tablaProcesos.innerHTML = '';

    for (let i = 0; i < procesos.length; i++) {
        var tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="part-item">${procesos[i].nombre}</td>
            <td class="part-item">${procesos[i].tamano}</td>
            <td class="part-item">
                <button onclick="terminarProceso(${i})">Terminar</button>
            </td>
        `;
        tablaProcesos.appendChild(tr);
    }
}

// Función para agregar un programa
function agregarPrograma() {
    var nombrePrograma = document.getElementById('nombrePrograma').value;
    var textPrograma = parseInt(document.getElementById('textPrograma').value);
    var dataPrograma = parseInt(document.getElementById('dataPrograma').value);
    var bssPrograma = parseInt(document.getElementById('bssPrograma').value);
    var memoriaPrograma = parseInt(document.getElementById('memoriaPrograma').value);

    // Validar que los campos no estén vacíos
    if (!nombrePrograma || isNaN(textPrograma) || isNaN(dataPrograma) || isNaN(bssPrograma) || isNaN(memoriaPrograma) || textPrograma < 0 || dataPrograma < 0 || bssPrograma < 0 || memoriaPrograma < 0) {
        alert('Ingresa valores válidos para el programa.');
    }

    // Crear objeto de programa
    var programa = { nombre: nombrePrograma, text: textPrograma, data: dataPrograma, bss: bssPrograma, memoria: memoriaPrograma};

    // Agregar programa al array
    programas.push(programa);

    // Actualizar la tabla de programas
    actualizarTablaProgramas();

    // Limpiar los campos del formulario
    document.getElementById('nombrePrograma').value = '';
    document.getElementById('textPrograma').value = '';
    document.getElementById('dataPrograma').value = '';
    document.getElementById('bssPrograma').value = '';
    document.getElementById('memoriaPrograma').value = '';
}

// Función para agregar un proceso desde un programa
function agregarProcesoDesdePrograma(index) {
    var programa = programas[index];

    //agregar al grafico
    var ajuste =  document.getElementById('tipo-ajuste').textContent;
    if (ajuste == 'Primer Ajuste'){
        let ident = Math.random();
        // Agregar el programa a la lista de procesos
        procesos.push({
            nombre: programa.nombre,
            tamaño: programa.memoria,
            identificador: ident
        });

        // Actualizar la tabla de procesos
        actualizarTablaProcesos();
        aplicarPrimerAjuste(ident);
    }else if(ajuste == 'Peor Ajuste'){
        let ident = Math.random();
        // Agregar el programa a la lista de procesos
        procesos.push({
            nombre: programa.nombre,
            tamaño: programa.memoria,
            identificador: ident
        });

        // Actualizar la tabla de procesos
        actualizarTablaProcesos();
        aplicarPeorAjuste(ident);
    }else if(ajuste == 'Mejor Ajuste'){
        let ident = Math.random();
        // Agregar el programa a la lista de procesos
        procesos.push({
            nombre: programa.nombre,
            tamaño: programa.memoria,
            identificador: ident
        });

        // Actualizar la tabla de procesos
        actualizarTablaProcesos();
        aplicarMejorAjuste(ident);
    }else{
        alert('aplique un tipo de ajuste');
    }
}

// Función para terminar un proceso
function terminarProceso(index) {
    var proceso = procesos[index];
    for (let i = 0; i < listaParticiones.length; i++) {
        if(listaParticiones[i].proceso == proceso.identificador){
            listaParticiones[i].estado = 'libre';
            listaParticiones[i].nombre = '';
            listaParticiones[i].proceso = '';
        }
    }
    procesos.splice(index, 1);
    actualizarTablaProcesos();
    crearParticionesGraficas();
}

//funciones para miniventana
function abrirMiniVentana() {
    var estatica = document.getElementById("Estatica");
    var estaticaVar = document.getElementById("EstaticaVar");
    if (estatica.checked){
        document.querySelector(".particiones").style.display = 'none';
        document.getElementById("miniVentana").style.display = 'block';
        document.getElementById('btn-crearPart').style.display = 'none';
    }else if(estaticaVar.checked){
        document.getElementById('miniVentana').style.display = 'block';
        document.querySelector(".particiones").style.display = 'block';
        document.getElementById('btn-crearPart').style.display = 'inline';
    }else{
        crearsimulador();
    }
}

//funciones para ventanas emergentes
  
function cerrarMiniVentana() {
    document.getElementById('miniVentana').style.display = 'none';
}


function VenAgrPrograma(){
    document.getElementById('miniVentana').style.display = 'block';
}

//funcion para crear particiones
function crearParticion(){
    var parttam = parseInt(document.getElementById("tamPart").value);
    var tamdisp = parseInt(document.getElementById("part-dispo-text").textContent);
    if(parttam < tamdisp){
        let lista = document.getElementById("List-part");
        let particion = document.createElement("li");
        particion.innerText = parttam;
        lista.appendChild(particion);
        var parti = {estado: 'libre', tamaño: parttam, proceso: '', nombre: ''}
        listaParticiones.push(parti);
        var nuevoTamaño = tamdisp -parttam;
        document.getElementById("part-dispo-text").textContent = nuevoTamaño;
    }
}

//funcion para tipo de ajuste
function escojerAjuste(ajuste){
 document.getElementById("tipo-ajuste").innerText = ajuste;
 tipoAjusteSeleccionado = ajuste;
}


//recuadrar esta funcion con la creacicon de las particiones
function crearParticionesGraficas(){
    var imgMemoria = document.getElementById("repr-memoria");
    imgMemoria.innerHTML =``;
    for(let i = 0 ; i < listaParticiones.length ; i++){
        var tam = (((listaParticiones[i].tamaño)/16777216) *100);
        var nuevoDiv = document.createElement("div")
        nuevoDiv.classList.add("imgPrograma");
        nuevoDiv.id = `n${i}`;
        nuevoDiv.innerHTML = `<p>${listaParticiones[i].nombre}</p>`
        imgMemoria.appendChild(nuevoDiv);
        document.getElementById(`n${i}`).style.height = `${tam}%`;
    }
}
//Funciona para agregar particiones dinamicas
function crearParticionDinamica(nombre, tamano) {
    // Validar que el tamaño sea positivo
    if (tamaño <= 0) {
      alert("El tamaño de la partición debe ser positivo.");
      return;
    }
  
    // Buscar un espacio libre contiguo lo suficientemente grande
    let espacioLibreEncontrado = false;
    let indiceParticionInicio = -1;
    let espacioLibreTotal = 0;
    for (let i = 0; i < listaParticiones.length; i++) {
      if (listaParticiones[i].estado === "libre") {
        if (espacioLibreTotal === 0) {
          indiceParticionInicio = i;
        }
        espacioLibreTotal += listaParticiones[i].tamaño;
        if (espacioLibreTotal >= tamano) {
          espacioLibreEncontrado = true;
          break;
        }
      } else {
        espacioLibreTotal = 0;
        indiceParticionInicio = -1;
      }
    }
  
    // Si se encontró un espacio libre, crear la partición
    if (espacioLibreEncontrado) {
      let espacioRestante = espacioLibreTotal - tamano;
      for (let i = indiceParticionInicio; i < listaParticiones.length; i++) {
        if (listaParticiones[i].estado === "libre") {
          if (espacioRestante > 0) {
            listaParticiones[i].tamaño = listaParticiones[i].tamaño - espacioRestante;
            listaParticiones[i].estado = "ocupado";
            listaParticiones[i].nombre = nombre;
            listaParticiones[i].proceso = "";
            break;
          } else {
            listaParticiones[i].estado = "ocupado";
            listaParticiones[i].nombre = nombre;
            listaParticiones[i].proceso = "";
          }
        }
      }
      crearParticionesGraficas();
    } else {
      alert("No hay espacio disponible para la partición.");
    }
  }

  //Compactar particiones dinamicas
  function compactarParticionesDinamicas() {
    // Lista para almacenar las particiones libres después de la compactación
    let listaParticionesLibres = [];
  
    // Recorrer la lista de particiones
    for (let i = 0; i < listaParticiones.length; i++) {
      // Si la partición está libre, agregarla a la lista de particiones libres
      if (listaParticiones[i].estado === "libre") {
        listaParticionesLibres.push(listaParticiones[i]);
      } else {
        // Si la partición está ocupada, moverla al inicio de la lista de particiones
        if (i > 0) {
          let aux = listaParticiones[i];
          listaParticiones[i] = listaParticiones[0];
          listaParticiones[0] = aux;
        }
      }
    }
  
    // Actualizar la lista de particiones y la representación gráfica
    listaParticiones = listaParticionesLibres;
    crearParticionesGraficas();
  }
  

//funcion para iniciar el simulador, recuadrar esta funcion con la creacicon de las particiones estaticas
function crearsimulador(){
    var estatica = document.getElementById("Estatica");
    if (estatica.checked){
        var memoria = 15728640 ;
        var parttam = parseInt(document.getElementById("tamPart").value);
        for (let i = memoria ; i > 0 ; i -= parttam){
            if(i<parttam){
                var parti = {estado: 'libre', tamaño: i, proceso: '', nombre: ''}
                listaParticiones.push(parti);
            }else{
                var parti = {estado: 'libre', tamaño: parttam, proceso: '', nombre: ''}
                listaParticiones.push(parti);
            }
            console.log(i);
        }
        
    }
    document.getElementById("caja-principal").innerHTML = "";
    document.getElementById("caja-principal").innerHTML = 
    `
    <div class="memoria">
    <h2>16 MG</h2>
    <div class="memoria-graf">
        <div class="repr-memoria" id="repr-memoria">
            <div class="img-SO"><p>Sistema Operativo</p></div>
        </div>
        <div class="divi-memoria"></div>
    </div>
    </div>
    <div class="configuraciones">
        <div class="cont-conf procesos">
            <h2>Procesos</h2>
            
            <!-- Tabla de procesos existentes -->
            <table class="tb-procesos">
                <!-- Encabezado de la tabla -->
                <thead class="tb-proc-enc">
                    <th>Proceso</th>
                    <th>Tamaño</th>
                    <th>Acciones</th>
                </thead>
                <!-- Cuerpo de la tabla -->
                <tbody class="tb-proc-cu" id="tablaProcesos">
                    <!-- Filas de procesos se agregarán dinámicamente aquí -->
                </tbody>
            </table>
        </div>
        

        <div class="cont-conf programa" id="contPrograma">
        <h2>Programa</h2>
        <!-- Agregar formulario para agregar programas -->
        <div id="miniVentana" class="miniVentana">
            <span class="cerrar" onclick="cerrarMiniVentana()">X</span>
            <div>
                <form id="formPrograma">
                    <label for="nombrePrograma">Nombre:</label>
                    <input type="text" id="nombrePrograma" required>
                    <label for="textPrograma">.text:</label>
                    <input type="number" id="textPrograma" min="0" step="1" required>
                    <label for="dataPrograma">.data:</label>
                    <input type="number" id="dataPrograma" min="0" step="1" required>
                    <label for="bssPrograma">.bss:</label>
                    <input type="number" id="bssPrograma" min="0" step="1" required>
                    <label for="memoriaPrograma">Memoria a usar:</label>
                    <input type="number" id="memoriaPrograma" min="0" step="1" required>
                    <button type="button" onclick="agregarPrograma()">Agregar Programa</button>
                </form>
            </div> 
        </div>
        <!-- Tabla de programas existentes -->
        <table class="tb-procesos">
            <!-- Encabezado de la tabla -->
            <thead class="tb-proc-enc">
                <th>Programa</th>
                <th>.text</th>
                <th>.data</th>
                <th>.bss</th>
                <th>Memoria a usar</th>
                <th>" "</th>
            </thead>
            <!-- Cuerpo de la tabla -->
            <tbody class="tb-proc-cu" id="tablaProgramas">     
            </tbody>
        </table>
    </div>
        <div class="cont-conf ajuste">
            <h2>Tipo de ajuste:</h2>
            <p id="tipo-ajuste">""</p>
            <button class="btn-ajuste" value="Primer Ajuste" onclick="escojerAjuste(value)">Primer Ajuste</button>
            <button class="btn-ajuste" value="Peor Ajuste" onclick="escojerAjuste(value)">Peor Ajuste</button>
            <button class="btn-ajuste" value="Mejor Ajuste" onclick="escojerAjuste(value)">Mejor Ajuste</button>
        </div>
        <div class="cont-conf botones">
            <button class="btn-boton" id="agregar-programa" onclick="VenAgrPrograma()">Agregar programa</button>
            <button class="btn-boton" id="volver-inicio" onclick="volverInicio()">Volver al inicio</button>
        </div>
    </div>
    `;
    document.getElementById('caja-principal').style.display = 'grid';
    document.getElementById('caja-principal').style.gridTemplateColumns = '1fr 2fr';

    crearParticionesGraficas();
}

//funcion para volver al inicio
function volverInicio(){
    document.getElementById("caja-principal").innerHTML = "";
    document.getElementById("caja-principal").innerHTML =`
    
    <div class='caja-menu'>
        <h2 class='sub-titulo'>Escoja el tipo de particion de memoria</h2>
        <div class='opciones'>
            <div class='sub-opciones'><input type='radio' name='particion' id='Estatica'><label for='Estatica'>Particion Estatica</label></div>
            <div class='sub-opciones'><input type='radio' name='particion' id='EstaticaVar'><label for='EstaticaVar'>Particion Estatica Variable</label></div>
            <div class='sub-opciones'><input type='radio' name='particion' id='Dinamica'><label for='Dinamica'>Particion Dinamica</label></div>
            <div class='sub-opciones'><input type='radio' name='particion' id='DinamicaCom'><label for='DinamicaCom'>Particion Dinamica compacta</label></div>
        </div>                
        <button class='crear' onclick="abrirMiniVentana()">crear</button>
        <div id="miniVentana" class="miniVentana">
        <div class="contenido">
        <span class="cerrar" onclick="cerrarMiniVentana()">X</span>
        <h2>Particionar memoria</h2>
        <p>Coloca las dimenciones de la memoria</p>
        <div class="particiones">
            <div class="part-creadas">
                <h3>particiones <br>creadas</h3>
                <ul class="List-part" id="List-part">
                </ul>
            </div>
            <div class="part-disponible">
                <h3>disponible</h3>
                <p class="part-dispo-text" id="part-dispo-text">15728640</p>
            </div>
        </div>
        <div class="crear-particiones">
            <input type="number" name="tamPart" id="tamPart" min="0" step="1" placeholder="tamaño de particion">
            <button for="tamPart" id="btn-crearPart" onclick="crearParticion()">Crear<br>particion</button>
        </div>
        <button class="crear-simu" id="crear-simu" onclick="crearsimulador()">Crear simulador</button>
        </div>
    </div>
    `
    document.getElementById('caja-principal').style.display = 'flex';
    document.getElementById('caja-principal').style.gridTemplateColumns = '';
}
