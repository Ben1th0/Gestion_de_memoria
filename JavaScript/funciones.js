// Array para almacenar los programas
let programas = [];

// Array para almacenar los procesos
let procesos = [];

//array para las particiones
// let particiones = [];

// Array para tipodeajuste
let tipoAjusteSeleccionado = null;

// Array para particiones

let particiones = [
  { tamaño: 500, ocupada: false, procesos: [] },
];


let nombre = "Simulador de memoria";
let tamañoMemoriaTotal = 1024;
let listaParticiones = [
  { estado: 'libre', tamaño: tamañoMemoriaTotal, proceso: null },
];

const memoriaTotal = 1024; // Ejemplo de tamaño total de la memoria
class Proceso {
  constructor(nombre, tamaño) {
      this.nombre = nombre;
      this.tamaño = tamaño;
  }
}

function seleccionarTipoAjuste(tipo) {
    tipoAjusteSeleccionado = tipo;
    document.getElementById('tipoAjusteSeleccionado').textContent = `Tipo de ajuste seleccionado: ${tipo}`;
  
    // Lógica adicional según el tipo de ajuste seleccionado
    switch (tipo) {
      case 'Primer Ajuste':
        aplicarPrimerAjuste();
        break;
      case 'Peor Ajuste':
        aplicarPeorAjuste();
        break;
      case 'Mejor Ajuste':
        aplicarMejorAjuste();
        break;
      // Agrega más casos según sea necesario para otros tipos de ajuste
      default:
        // manejo de errores
        break;
    }
  }
  
  // Ejemplo de función para aplicar el algoritmo de Primer Ajuste
function aplicarPrimerAjuste(Proceso) {
    let indiceParticionLibre = -1;
  
    // Buscar la primera partición libre que sea lo suficientemente grande
    for (let i = 0; i < listaParticiones.length; i++) {
      if (listaParticiones[i].estado === "libre" && listaParticiones[i].tamaño >= tamañoProceso) {
        indiceParticionLibre = i;
        break;
      }
    }
  
    if (indiceParticionLibre === -1) {
      return false; // No hay memoria disponible
    }
  
    // Asignar el proceso a la partición libre
    listaParticiones[indiceParticionLibre].estado = "ocupado";
    listaParticiones[indiceParticionLibre].proceso = tamañoProceso;
  
    return true;
}
  
  // Ejemplo de función para aplicar el algoritmo de Peor Ajuste
function aplicarPeorAjuste(Proceso) {
    let indiceParticionLibre = -1;
    let mayorTamañoLibre = -1;
  
    // Buscar la partición libre con el mayor tamaño
    for (let i = 0; i < listaParticiones.length; i++) {
      if (listaParticiones[i].estado === "libre" && listaParticiones[i].tamaño >= tamañoProceso) {
        if (listaParticiones[i].tamaño > mayorTamañoLibre) {
          indiceParticionLibre = i;
          mayorTamañoLibre = listaParticiones[i].tamaño;
        }
      }
    }
  
    if (indiceParticionLibre === -1) {
      return false; // No hay memoria disponible
    }
  
    // Asignar el proceso a la partición libre
    listaParticiones[indiceParticionLibre].estado = "ocupado";
    listaParticiones[indiceParticionLibre].proceso = tamañoProceso;
  
    return true;
}

// Función para asignar un proceso a una partición
function asignarProceso(particion) {
    // Marcamos la partición como ocupada
    particion.ocupada = true;
  
    // Agregamos el proceso a la lista de procesos en esa partición
    particion.procesos.push(procesoActual);
  
    // Calcular fragmentación si el tamaño del proceso es menor que el tamaño de la partición
    const fragmentacion = particion.tamaño - procesoActual.tamaño;
    if (fragmentacion > 0) {
      particiones.push({
        tipo: 'Fragmentación',
        tamaño: fragmentacion,
      });
    }
  
    // Actualizamos la representación gráfica de la memoria
    actualizarSimulacionMemoria();
}

function actualizarSimulacionMemoria() {
    const reprMemoria = document.querySelector(".repr-memoria");
    
    // Calcular la memoria total utilizada
    let memoriaTotalUtilizada = 0;
    for (const particion of listaParticiones) {
        if (particion.estado === "ocupado") {
        memoriaTotalUtilizada += particion.tamaño;
        }
    }
    
        // Calcular la memoria fragmentada
    const memoriaFragmentada = memoriaTotal - memoriaTotalUtilizada;

        // Mostrar particiones, fragmentaciones y procesos
        for (const bloque of particiones) {
        const tipoBloque = bloque.tipo;
    const alturaBloque = (bloque.tamaño / tamañoMemoriaTotal) * alturaTotal;
    
        // Crear el elemento de bloque y aplicar estilos
        const elementoBloque = document.createElement("div");
        elementoBloque.className = tipoBloque;
        elementoBloque.style.height = `${alturaBloque}px`;
    
        // Mostrar el nombre o tamaño dentro del bloque
        if (tipoBloque === 'Proceso') {
            elementoBloque.innerText = `Partición ${bloque.particionId + 1}\n${bloque.proceso.nombre}`;
        } else if (tipoBloque === 'Fragmentación') {
            elementoBloque.innerText = `Fragmentación\n${bloque.tamaño}`;
        }
    
        // Agregar el bloque al contenedor de representación de memoria
        reprMemoria.appendChild(elementoBloque);
        
        }
}

function iniciarSimulacionMemoria() {
    // Asegúrate de que haya al menos un proceso en la lista de procesos
    if (procesos.length > 0) {
        // Inicializa el proceso actual (puedes ajustar según tu lógica)
        procesoActual = procesos[0];

        // Llama a la función correspondiente según el tipo de ajuste seleccionado
        switch (tipoAjusteSeleccionado) {
            case 'Primer Ajuste':
                aplicarPrimerAjuste();
                break;
            case 'Peor Ajuste':
                aplicarPeorAjuste();
                break;
            case 'Mejor Ajuste':
                aplicarMejorAjuste();
                break;
            // Agrega más casos según sea necesario para otros tipos de ajuste
            default:
                // manejo de errores
                break;
        }

        // Actualiza la representación gráfica de la memoria después de asignar el proceso
        actualizarSimulacionMemoria();
    }
}


//desde aqui para abajo ya esta cuadrado

// Función para actualizar la tabla de programas
function actualizarTablaProgramas() {
    const tablaProgramas = document.getElementById('tablaProgramas');
    tablaProgramas.innerHTML = '';

    for (let i = 0; i < programas.length; i++) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="part-item">${programas[i].nombre}</td>
            <td class="part-item">${programas[i].text}</td>
            <td class="part-item">${programas[i].data}</td>
            <td class="part-item">${programas[i].bss}</td>
            <td class="part-item">${programas[i].memoria}</td>
            <td class="part-item">
                <button onclick="agregarProcesoDesdePrograma(${i})">Agregar a Procesos</button>
            </td>
        `;
        tablaProgramas.appendChild(tr);
    }
}


// Función para actualizar la tabla de programas
function actualizarTablaProgramas() {
    const tablaProgramas = document.getElementById('tablaProgramas');
    tablaProgramas.innerHTML = '';

    for (let i = 0; i < programas.length; i++) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="part-item">${programas[i].nombre}</td>
            <td class="part-item">${programas[i].text}</td>
            <td class="part-item">${programas[i].data}</td>
            <td class="part-item">${programas[i].bss}</td>
            <td class="part-item">${programas[i].memoria}</td>
            <td class="part-item">
                <button onclick="agregarProcesoDesdePrograma(${i})">Agregar a Procesos</button>
            </td>
        `;
        tablaProgramas.appendChild(tr);
    }
}

// Función para actualizar la tabla de procesos
function actualizarTablaProcesos() {
    const tablaProcesos = document.getElementById('tablaProcesos');
    tablaProcesos.innerHTML = '';

    for (let i = 0; i < procesos.length; i++) {
        const tr = document.createElement('tr');
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
    const nombrePrograma = document.getElementById('nombrePrograma').value;
    const textPrograma = parseInt(document.getElementById('textPrograma').value);
    const dataPrograma = parseInt(document.getElementById('dataPrograma').value);
    const bssPrograma = parseInt(document.getElementById('bssPrograma').value);
    const memoriaPrograma = parseInt(document.getElementById('memoriaPrograma').value);

    // Validar que los campos no estén vacíos
    if (!nombrePrograma || isNaN(textPrograma) || isNaN(dataPrograma) || isNaN(bssPrograma) || isNaN(memoriaPrograma) || textPrograma < 0 || dataPrograma < 0 || bssPrograma < 0 || memoriaPrograma < 0) {
        alert('Ingresa valores válidos para el programa.');
        return;
    }

    // Crear objeto de programa
    const programa = { nombre: nombrePrograma, text: textPrograma, data: dataPrograma, bss: bssPrograma, memoria: memoriaPrograma };

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
    const programa = programas[index];

    // Agregar el programa a la lista de procesos
    procesos.push({
        nombre: programa.nombre,
        tamano: programa.memoria
    });

    // Actualizar la tabla de procesos
    actualizarTablaProcesos();

    //agregar al grafico

}

// Función para terminar un proceso
function terminarProceso(index) {
    procesos.splice(index, 1);
    actualizarTablaProcesos();
}

//funciones para miniventana
function abrirMiniVentana() {
    var estatica = document.getElementById("Estatica");
    var estaticaVar = document.getElementById("EstaticaVar");
    if (estatica.checked){
        document.querySelector(".particiones").style.display = 'none';
        document.getElementById("miniVentana").style.display = 'block';
        document.getElementById('btn-crearPart').remove();
    }else if(estaticaVar.checked){
        document.getElementById('miniVentana').style.display = 'block';
    }else{
        crearsimulador();
    }
}
  
function cerrarMiniVentana() {
    document.getElementById('miniVentana').style.display = 'none';
}

//ventana abrir programa
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
        particiones.push(parttam);
        var nuevoTamaño = tamdisp -parttam;
        document.getElementById("part-dispo-text").textContent = nuevoTamaño;
    }
}

//funcion para tipo de ajuste
function escojerAjuste(ajuste){
 document.getElementById("tipo-ajuste").innerText = ajuste;
}

function crearParticionesGraficas(){
    var imgMemoria = document.getElementById("repr-memoria");
    for(let i = 0 ; i <= particiones.length ; i++){
        var tam = (particiones[i]/16777216) *100;
        var nuevoDiv = document.createElement("div")
        nuevoDiv.classList.add("imgPrograma");
        nuevoDiv.id = "n" + (i);
        nuevoDiv.innerHTML = `
        <div class="imgPrograma" id="n${i}"></div>
        `
        imgMemoria.appendChild(nuevoDiv)
        document.getElementById(`n${i}`).style.height = `${tam}%`;
    }
}

//funcion para iniciar el simulador
function crearsimulador(){
    var estatica = document.getElementById("Estatica");
    if (estatica.checked){
        var memoria = 15728640 ;
        var parttam = parseInt(document.getElementById("tamPart").value);
        for (let i = memoria ; i > 0 ; i -= parttam){
            if(i<parttam){
                particiones.push(i);
            }else{
                particiones.push(parttam);
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