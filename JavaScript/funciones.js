// Array para almacenar los programas
let programas = [];

// Array para almacenar los procesos
let procesos = [];

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
    
    //Eliminar el programa de la lista de programas si lo deseas opcional xd *_*
    programas.splice(index, 1);

    // Actualizar la tabla de programas
    actualizarTablaProgramas();
}

// Función para terminar un proceso
function terminarProceso(index) {
    procesos.splice(index, 1);
    actualizarTablaProcesos();
}
function abrirMiniVentana() {
    document.getElementById('miniVentana').style.display = 'block';
  }
  
function cerrarMiniVentana() {
    document.getElementById('miniVentana').style.display = 'none';
}

function crearsimulador(){
    document.getElementById("caja-principal").innerHTML = "";
    document.getElementById("caja-principal").innerHTML = 
    `
    <div class="memoria">
    <h2>16 MG</h2>
    <div class="memoria-graf">
        <div class="repr-memoria"></div>
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
        <p>""</p>
        <button class="btn-ajuste">Primer Ajuste</button>
        <button class="btn-ajuste">Peor Ajuste</button>
        <button class="btn-ajuste">Mejor Ajuste</button>
    </div>
    <div class="cont-conf botones">
        <button class="btn-boton">Agregar programa</button>
        <button class="btn-boton" id="volver-inicio">Volver al inicio</button>
    </div>
</div>
    `
    document.getElementById('caja-principal').style.display = 'grid';
    document.getElementById('caja-principal').style.gridTemplateColumns = '1fr 2fr';
    document.getElementById('volver-inicio').addEventListener('click', volverInicio); 
}

function volverInicio(){
    document.getElementById("caja-principal").innerHTML = "";
    document.getElementById("caja-principal").innerHTML =`
    
    <div class='caja-menu'>
        <h2 class='sub-titulo'>Escoja el tipo de particion de memoria</h2>
        <div class='opciones'>
            <div class='sub-opciones'><input type='radio' name='particion' id='Estatica'><label for='Estatica'>Particion Estatica</label></div>
            <div class='sub-opciones'><input type='radio' name='particion' id='Dinamica'><label for='Dinamica'>Particion Dinamica</label></div>
            <div class='sub-opciones'><input type='radio' name='particion' id='DinamicaCom'><label for='DinamicaCom'>Particion Dinamica compacta</label></div>
            <div class='sub-opciones'><input type='radio' name='particion' id='EstaticaVar'><label for='EstaticaVar'>Particion Estatica Variable</label></div>
        </div>                
        <button class='crear'>crear</button>
        <div id="miniVentana" class="miniVentana">
        <div class="contenido">
        <span class="cerrar" onclick="cerrarMiniVentana()">X</span>
        <h2>Particionar memoria</h2>
        <p>Coloca las dimenciones de la memoria</p>
        <div class="particiones">
            <div class="part-creadas">
                <h3>particiones <br>creadas</h3>
                <ul>
                    <li>1400</li>
                    <li>1552</li>
                    <li>15654</li>
                </ul>
            </div>
            <div class="part-disponible">
                <h3>disponible</h3>
                <p class="part-dispo-text">1656</p>
            </div>
        </div>
        <div class="crear-particiones">
            <input type="number" name="tamPart" id="tamPart" min="0" step="1" placeholder="tamaño de particion">
            <button for="tamPart">Crear<br>particion</button>
        </div>
        <button class="crear-simu" id="crear-simu">Crear simulador</button>
        </div>
    </div>
    </div>
    

    `
    document.getElementById('caja-principal').style.display = 'flex';
    document.getElementById('caja-principal').style.gridTemplateColumns = '';

    document.getElementById('crear').addEventListener('click', abrirMiniVentana);
    document.getElementById('crear-simu').addEventListener('click', crearsimulador); 
}