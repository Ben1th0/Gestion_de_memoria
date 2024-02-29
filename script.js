function abrirMiniVentana() {
    document.getElementById('miniVentana').style.display = 'block';
  }
  
function cerrarMiniVentana() {
    document.getElementById('miniVentana').style.display = 'none';
  }
  
  document.getElementById('crear').addEventListener('click', abrirMiniVentana);