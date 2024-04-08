class SimuladorMemoriaPaginacion {
  constructor(memoriaTotal) {
    this.memoriaTotal = memoriaTotal;
    this.memoria = [];
  }

  // Función para crear una página de memoria
  crearPagina(id, tamaño) {
    const pagina = {
      id: id,
      tamaño: tamaño,
      datos: new Array(tamaño).fill(null)
    };
    this.memoria.push(pagina);
    return pagina;
  }

  // Función para escribir datos en una página
  escribirPagina(pagina, indice, valor) {
    if (indice < pagina.tamaño) {
      pagina.datos[indice] = valor;
    } else {
      console.error('Índice fuera de los límites de la página.');
    }
  }

  // Función para leer datos de una página
  leerPagina(pagina, indice) {
    if (indice < pagina.tamaño) {
      return pagina.datos[indice];
    } else {
      console.error('Índice fuera de los límites de la página.');
      return null;
    }
  }

  // Función para eliminar una página
  eliminarPagina(id) {
    this.memoria = this.memoria.filter(pagina => pagina.id !== id);
  }

  // Función para mostrar el estado actual de la memoria
  mostrarEstadoMemoria() {
    this.memoria.forEach(pagina => {
      console.log(`Página ${pagina.id}:`, pagina.datos);
    });
  }
}

// Ejemplo de uso
const simuladorMemoria = new SimuladorMemoriaPaginacion(16777216);

const pagina1 = simuladorMemoria.crearPagina('Página 1', simuladorMemoria.memoriaTotal / 4);
const pagina2 = simuladorMemoria.crearPagina('Página 2', simuladorMemoria.memoriaTotal / 2);

simuladorMemoria.escribirPagina(pagina1, 0, 'funcionInicio()');
simuladorMemoria.escribirPagina(pagina2, 0, 'datoImportante');

console.log(simuladorMemoria.leerPagina(pagina1, 0)); // Salida: funcionInicio()
console.log(simuladorMemoria.leerPagina(pagina2, 0)); // Salida: datoImportante

simuladorMemoria.mostrarEstadoMemoria(); // Muestra el estado de todas las páginas
