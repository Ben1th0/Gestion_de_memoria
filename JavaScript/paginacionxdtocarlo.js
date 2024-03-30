// Función para crear un segmento de memoria
function crearSegmento(id, tamaño) {
  return {
    id: id,
    tamaño: tamaño,
    datos: new Array(tamaño).fill(null)
  };
}

// Función para escribir datos en un segmento
function escribirSegmento(segmento, indice, valor) {
  if (indice < segmento.tamaño) {
    segmento.datos[indice] = valor;
  } else {
    console.error('Índice fuera de los límites del segmento.');
  }
}

// Función para leer datos de un segmento
function leerSegmento(segmento, indice) {
  if (indice < segmento.tamaño) {
    return segmento.datos[indice];
  } else {
    console.error('Índice fuera de los límites del segmento.');
    return null;
  }
}

// Función para eliminar un segmento
function eliminarSegmento(memoria, id) {
  memoria = memoria.filter(segmento => segmento.id !== id);
  return memoria;
}

// Función para mostrar el estado actual de la memoria
function mostrarEstado(memoria) {
  memoria.forEach(segmento => {
    console.log(`Segmento ${segmento.id}:`, segmento.datos);
  });
}

// Ejemplo de uso
let memoria = [];
memoria.push(crearSegmento('código', 10));
memoria.push(crearSegmento('datos', 20));

escribirSegmento(memoria[0], 0, 'funcionInicio()');
escribirSegmento(memoria[1], 0, 'datoImportante');

console.log(leerSegmento(memoria[0], 0)); // Salida: funcionInicio()
console.log(leerSegmento(memoria[1], 0));  // Salida: datoImportante

mostrarEstado(memoria); // Muestra el estado de todos los segmentos
