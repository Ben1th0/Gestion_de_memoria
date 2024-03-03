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
            <table class="tb-procesos">
                <thead class="tb-proc-enc">
                    <th>Proceso</th>
                    <th>Tama;o</th>
                    <th>" "</th>
                </thead>
                <tbody class="tb-proc-cu">
                    <tr class="tb-proc-cu-item">
                        <td class="part-item">calculadora</td>
                        <td class="part-item">321.321</td>
                        <td class="part-item"><button>Terminar</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="cont-conf programa">
            <table class="tb-procesos">
                <thead class="tb-proc-enc">
                    <th>Programa</th>
                    <th>.text</th>
                    <th>.data</th>
                    <th>.bss</th>
                    <th>memoria <br>a usar</th>
                    <th>" "</th>
                </thead>
                <tbody class="tb-proc-cu">
                    <tr class="tb-proc-cu-item">
                        <td class="part-item">calculadora</td>
                        <td class="part-item">120.156</td>
                        <td class="part-item">89.255</td>
                        <td class="part-item">100.025</td>
                        <td class="part-item">321.321</td>
                        <td class="part-item"><button>Iniciar</button></td>
                    </tr>
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