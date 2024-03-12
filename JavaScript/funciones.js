//pila 
const pila = 65536;
//monticulo
const monticulo = 131072;

// Función para generar programas automáticamente
function generarProgramasAutomaticos() {
    // Crear 5 programas automáticamente
        let programa1 = { nombre: "Notepad", text: 19524, data: 12352, bss: 1165, memoria: 19524+12352+1165+pila+monticulo };
        let programa2 = { nombre: 'Word', text: 77539, data: 32680, bss: 4100, memoria: 77539+32680+4100+pila+monticulo  };
        let programa3 = { nombre: 'Excel', text: 99542, data: 24245, bss: 7557, memoria: 99542+24245+7557+pila+monticulo  };
        let programa4 = { nombre: 'AutoCAD', text: 115000, data: 123470, bss: 1123, memoria: 115000+123470+1123+pila+monticulo  };
        let programa5 = { nombre: 'Calculadora', text: 12342, data: 1256, bss: 1756, memoria: 12342+1256+1756+pila+monticulo  };

        // Agregar programa al array
        programas.push(programa1);
        programas.push(programa2);
        programas.push(programa3);
        programas.push(programa4);
        programas.push(programa5);

    // Actualizar la tabla de procesos
    actualizarTablaProgramas();
}

// Array para almacenar los programas
let programas = [];

// Array para almacenar los procesos
let procesos = [];

// Array para tipodeajuste
let tipoAjusteSeleccionado = null;

// Array para particiones
let listaParticiones = [];

let tipoMemorita;

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
    let indiceDeProcesos = -1;
    let indiceParticionLibre = -1;
    for (let i = 0; i < procesos.length; i++) {
        if(procesos[i].identificador == ident){
            proceso = procesos[i];
        }
    }
    if(tipoMemorita == 1){
        
            for(let j = 0; j < listaParticiones.length; j++){
                if((listaParticiones[j].estado == 'libre') && (listaParticiones[j].tamaño > proceso.tamano)){
                    listaParticiones.splice(j,0,{
                        estado: 'ocupado', 
                        tamaño: proceso.tamano, 
                        proceso: proceso.identificador, 
                        nombre: proceso.nombre, 
                        porcentaje: proceso.tamano
                    })
                    listaParticiones[j+1].tamaño = (listaParticiones[j+ 1].tamaño - listaParticiones[j].tamaño);
                    actualizarTablaProcesos();
                    crearParticionesGraficas();
                    console.log(listaParticiones[i]);
                    break;
                }else if(([listaParticiones.length - 1] == j)){
                    listaParticiones.push({
                        estado: 'ocupado', 
                        tamaño: proceso.tamano, 
                        proceso: proceso.identificador, 
                        nombre: proceso.nombre, 
                        porcentaje:  proceso.tamano
                    });
                    crearParticionesGraficas();
                    actualizarTablaProcesos();
                    break;
                }
                console.log(listaParticiones[j]);
            }
        
    }else if(tipoMemorita == 2){
        listaParticiones.push({
            estado: 'ocupado', 
            tamaño: proceso.tamano, 
            proceso: proceso.identificador, 
            nombre: proceso.nombre, 
            porcentaje:  proceso.tamano
        });
        crearParticionesGraficas();
        actualizarTablaProcesos();
    }else{
    //buscador de proceso 
        for (let i = 0; i < procesos.length; i++) {
            if(procesos[i].identificador == ident){
                proceso = procesos[i];
                indiceDeProcesos = i;
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
            procesos.splice(indiceDeProcesos, 1);
        }else{
            //actualiza la tabla de procesos
            actualizarTablaProcesos() 
            // Asignar el proceso a la partición libre
            listaParticiones[indiceParticionLibre].estado = 'ocupado';
            listaParticiones[indiceParticionLibre].nombre = proceso.nombre;
            listaParticiones[indiceParticionLibre].proceso = proceso.identificador; 
            listaParticiones[indiceParticionLibre].porcentaje = ((proceso.tamano / listaParticiones[indiceParticionLibre].tamaño)*100)
            console.log(listaParticiones[indiceParticionLibre].porcentaje)
            crearParticionesGraficas();
        }
    }
}
  
// Ejemplo de función para aplicar el algoritmo de Peor Ajuste
function aplicarPeorAjuste(ident) {
    var proceso;
    let indiceDeProcesos = -1;
    let indiceParticionLibre = -1;
    let mayorTamañoLibre = -1;
    for (let i = 0; i < procesos.length; i++) {
        if(procesos[i].identificador == ident){
            proceso = procesos[i];
        }
    }
    if(tipoMemorita == 1){
        for(let j = 0; j < listaParticiones.length; j++){
            if((listaParticiones[j].estado == 'libre') && (listaParticiones[j].tamaño > proceso.tamano)){
                listaParticiones.splice(j,0,{
                    estado: 'ocupado', 
                    tamaño: proceso.tamano, 
                    proceso: proceso.identificador, 
                    nombre: proceso.nombre, 
                    porcentaje: proceso.tamano
                })
                listaParticiones[j+1].tamaño = (listaParticiones[j+ 1].tamaño - listaParticiones[j].tamaño);
                actualizarTablaProcesos();
                crearParticionesGraficas();
                console.log(listaParticiones[i]);
                break;
            }else if(([listaParticiones.length - 1] == j)){
                listaParticiones.push({
                    estado: 'ocupado', 
                    tamaño: proceso.tamano, 
                    proceso: proceso.identificador, 
                    nombre: proceso.nombre, 
                    porcentaje:  proceso.tamano
                });
                crearParticionesGraficas();
                actualizarTablaProcesos();
                break;
            }
            console.log(listaParticiones[j]);
        }
    }else if(tipoMemorita == 2){
        listaParticiones.push({
            estado: 'ocupado', 
            tamaño: proceso.tamano, 
            proceso: proceso.identificador, 
            nombre: proceso.nombre, 
            porcentaje:  proceso.tamano
        });
        crearParticionesGraficas();
        actualizarTablaProcesos();
    }else{
        //buscador de proceso 
        for (let i = 0; i < procesos.length; i++) {
            if(procesos[i].identificador == ident){
                proceso = procesos[i];
                indiceDeProcesos = i;
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
            procesos.splice(indiceDeProcesos, 1);
        }else{
            //actualiza la tabla de procesos
            actualizarTablaProcesos() 
            // Asignar el proceso a la partición libre
            listaParticiones[indiceParticionLibre].estado = 'ocupado';
            listaParticiones[indiceParticionLibre].nombre = proceso.nombre;
            listaParticiones[indiceParticionLibre].proceso = proceso.identificador;
            crearParticionesGraficas();
        }
    }
}

function aplicarMejorAjuste(ident){
    var proceso;
    let indiceDeProcesos = -1;
    let indiceParticionLibre = -1;
    let mejorajuste = 16777216;
    for (let i = 0; i < procesos.length; i++) {
        if(procesos[i].identificador == ident){
            proceso = procesos[i];
        }
    }
    if(tipoMemorita == 1){
        for(let j = 0; j < listaParticiones.length; j++){
            if((listaParticiones[j].estado == 'libre') && (listaParticiones[j].tamaño > proceso.tamano)){
                listaParticiones.splice(j,0,{
                    estado: 'ocupado', 
                    tamaño: proceso.tamano, 
                    proceso: proceso.identificador, 
                    nombre: proceso.nombre, 
                    porcentaje: proceso.tamano
                })
                listaParticiones[j+1].tamaño = (listaParticiones[j+ 1].tamaño - listaParticiones[j].tamaño);
                actualizarTablaProcesos();
                crearParticionesGraficas();
                console.log(listaParticiones[i]);
                break;
            }else if(([listaParticiones.length - 1] == j)){
                listaParticiones.push({
                    estado: 'ocupado', 
                    tamaño: proceso.tamano, 
                    proceso: proceso.identificador, 
                    nombre: proceso.nombre, 
                    porcentaje:  proceso.tamano
                });
                crearParticionesGraficas();
                actualizarTablaProcesos();
                break;
            }
            console.log(listaParticiones[j]);
        }
    }else if(tipoMemorita == 2){
        listaParticiones.push({
            estado: 'ocupado', 
            tamaño: proceso.tamano, 
            proceso: proceso.identificador, 
            nombre: proceso.nombre, 
            porcentaje:  proceso.tamano
        });
        crearParticionesGraficas();
        actualizarTablaProcesos();
    }else{
        //buscador de proceso 
        for (let i = 0; i < procesos.length; i++) {
            if(procesos[i].identificador == ident){
                proceso = procesos[i];
                indiceDeProcesos = i;
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
            procesos.splice(indiceDeProcesos, 1);
        }else{
            //actualiza la tabla de procesos
            actualizarTablaProcesos() 
            // Asignar el proceso a la partición libre
            listaParticiones[indiceParticionLibre].estado = 'ocupado';
            listaParticiones[indiceParticionLibre].nombre = proceso.nombre;
            listaParticiones[indiceParticionLibre].proceso = proceso.identificador;
            crearParticionesGraficas();
        }
    }
}

function unificarParticionesLibres(){
    for(let i = 1; i < listaParticiones.length; i++){
        if(listaParticiones[i-1].estado == 'libre' && listaParticiones[i].estado == 'libre'){
            listaParticiones[i-1].tamaño = listaParticiones[i-1].tamaño + listaParticiones[i].tamaño;
            listaParticiones.splice(i, 1);
        }
    }
}

function borrarParticionesLibres(){
    for(let i = 0; i < listaParticiones.length; i++){
        if(listaParticiones[i].estado == 'libre'){
            listaParticiones.splice(i,1);
        }
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
    tablaProcesos.innerHTML = ``;

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
    var memoriaPrograma = textPrograma + dataPrograma + bssPrograma + pila + monticulo;

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
            tamano: programa.memoria,
            identificador: ident
        });
        aplicarPrimerAjuste(ident);
    }else if(ajuste == 'Peor Ajuste'){
        let ident = Math.random();
        // Agregar el programa a la lista de procesos
        procesos.push({
            nombre: programa.nombre,
            tamano: programa.memoria,
            identificador: ident
        });
        aplicarPeorAjuste(ident);
    }else if(ajuste == 'Mejor Ajuste'){
        let ident = Math.random();
        // Agregar el programa a la lista de procesos
        procesos.push({
            nombre: programa.nombre,
            tamano: programa.memoria,
            identificador: ident
        });
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
            listaParticiones[i].porcentaje = 0;
        }
    }
    procesos.splice(index, 1);
    if(tipoMemorita == 1){
        unificarParticionesLibres();
    }if(tipoMemorita == 2){
        borrarParticionesLibres();
    }
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
        var parti = {estado: 'libre', tamaño: parttam, proceso: '', nombre: '', porcentaje:  0}
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
function crearParticionesGraficas() {
    var imgMemoria = document.getElementById("repr-memoria");

    if (imgMemoria) {
        imgMemoria.innerHTML = '';

        if (listaParticiones && listaParticiones.length > 0) {
            for (let i = 0; i < listaParticiones.length; i++) {
                var tam = (listaParticiones[i].tamaño / 16777216) * 100;
                var nuevoDiv = document.createElement("div");
                nuevoDiv.classList.add("imgPrograma");
                nuevoDiv.id = `n${i}`;
                nuevoDiv.innerHTML = `<p>${listaParticiones[i].nombre}</p>`;
                imgMemoria.appendChild(nuevoDiv);
                document.getElementById(`n${i}`).style.height = `${tam}%`;
                // document.getElementById(`n${i}`).style.backgroundImage = `linear-gradient(to bottom, yellow ${parseInt(listaParticiones[i].porcentaje)}%, white ${100 - parseInt(listaParticiones[i].porcentaje)}%)`;
            }
        } else {
            console.error("La lista de particiones está vacía o no está definida.");
        }
    } else {
        console.error("El elemento repr-memoria no se encontró en el DOM");
    }
}

//Funciona para agregar particiones dinamicas
function crearParticionDinamica(nombre) {
    
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

function verificarMemoriaDisponible(nombreParticion) {
    // Buscar la partición con el nombre indicado
    let particion = listaParticiones.find(particion => particion.nombre === nombreParticion);
  
    if (particion) {
      // Obtener la memoria libre de la partición
      let memoriaLibre = particion.memoriaDisponible;
  
      // Mostrar la memoria libre
      alert("Memoria libre en la partición " + nombreParticion + ": " + memoriaLibre + " bytes");
    } else {
      alert("No se encontró la partición " + nombreParticion);
    }
}

function liberarMemoria(nombreParticion) {
    // Buscar la partición con el nombre indicado
    let particion = listaParticiones.find(particion => particion.nombre === nombreParticion);

    if (particion) {
        // Liberar la partición
        particion.estado = "libre";
        particion.proceso = "";
        particion.nombre = "";
        particion.memoriaDisponible = particion.tamaño;
        crearParticionesGraficas();
    } else {
        alert("No se encontró la partición " + nombreParticion);
    }
}
  
//funcion para iniciar el simulador, recuadrar esta funcion con la creacicon de las particiones estaticas
function crearsimulador(){
    var estatica = document.getElementById("Estatica");
    var dinamica = document.getElementById("Dinamica");
    var dinamicaCom = document.getElementById("DinamicaCom");
    if (estatica.checked){
        programas = [];
        listaParticiones = []; 
        var SO = {estado: 'ocupado', tamaño: 1048576, proceso: 'SO', nombre: 'Sistema Operativo'}
        listaParticiones.push(SO);
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
    }else if(dinamica.checked){
        tipoMemorita = 1;
        listaParticiones = [];
        var SO = {estado: 'ocupado', tamaño: 1048576, proceso: 'SO', nombre: 'Sistema Operativo'}
        listaParticiones.push(SO);
    }else if(dinamicaCom.checked){
        tipoMemorita = 2;
        listaParticiones = [];
        var SO = {estado: 'ocupado', tamaño: 1048576, proceso: 'SO', nombre: 'Sistema Operativo'}
        listaParticiones.push(SO);
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
                    <button type="button" onclick="agregarPrograma()">Agregar Programa</button>
                </form>
            </div> 
        </div>
        <!-- Tabla de programas existentes -->
        <table class="tb-procesos">
            <!-- Encabezado de la tabla -->
            <thead class="tb-proc-enc">
                <th>Programa</th>
                <th>tamaño codigo</th>
                <th>tamaño datos inicializados</th>
                <th>tamaño datos sin inicializar</th>
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
    generarProgramasAutomaticos();
}

//funcion para volver al inicio
function volverInicio(){
    programas = [];
    listaParticiones = [];
    var SO = {estado: 'ocupado', tamaño: 1048576, proceso: 'SO', nombre: 'Sistema Operativo'}
    listaParticiones.push(SO);
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
