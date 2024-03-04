// Definir la clase Particion
class Particion {
  constructor(tamano, inicio) {
    this.tamano = tamano; // el tamaño de la partición en bytes
    this.inicio = inicio; // la dirección de inicio de la partición
    this.estado = "libre"; // el estado de la partición (libre u ocupada)
    this.proceso = null; // el proceso que ocupa la partición (si hay alguno)
  }
}

// Definir la clase Memoria
class Memoria {
  constructor(tamano) {
    this.tamano = tamano; // el tamaño total de la memoria en bytes
    this.particiones = []; // la lista de particiones de la memoria
  }

  // Método para crear particiones estáticas de tamaño fijo
  crearParticionesFijas(num) {
    // num es el número de particiones a crear
    let tamanoParticion = Math.floor(this.tamano / num); // el tamaño de cada partición en bytes
    let inicioParticion = 0; // la dirección de inicio de cada partición
    for (let i = 0; i < num; i++) {
      // crear una nueva partición con el tamaño y el inicio calculados
      let particion = new Particion(tamanoParticion, inicioParticion);
      // añadir la partición a la lista de particiones de la memoria
      this.particiones.push(particion);
      // actualizar la dirección de inicio de la siguiente partición
      inicioParticion += tamanoParticion;
    }
  }

  // Método para asignar un proceso a una partición disponible
  asignarProceso(proceso) {
    // proceso es un objeto de la clase Proceso
    // buscar una partición libre que tenga suficiente espacio para el proceso
    for (let particion of this.particiones) {
      if (particion.estado == "libre" && particion.tamano >= proceso.tamano) {
        // asignar el proceso a la partición
        particion.estado = "ocupada";
        particion.proceso = proceso;
        // mostrar un mensaje indicando la asignación
        console.log(
          `El proceso ${proceso.id} de tamaño ${proceso.tamano} bytes se ha asignado a la partición que empieza en ${particion.inicio} bytes`
        );
        // terminar la búsqueda
        return;
      }
    }
    // si no se encuentra ninguna partición disponible, mostrar un mensaje de error
    console.log(
      `El proceso ${proceso.id} de tamaño ${proceso.tamano} bytes no se ha podido asignar a ninguna partición`
    );
  }

  // Método para liberar una partición ocupada por un proceso
  liberarProceso(proceso) {
    // proceso es un objeto de la clase Proceso
    // buscar la partición que tiene asignado el proceso
    for (let particion of this.particiones) {
      if (particion.proceso == proceso) {
        // liberar la partición
        particion.estado = "libre";
        particion.proceso = null;
        // mostrar un mensaje indicando la liberación
        console.log(
          `El proceso ${proceso.id} ha terminado y se ha liberado la partición que empieza en ${particion.inicio} bytes`
        );
        // terminar la búsqueda
        return;
      }
    }
    // si no se encuentra la partición, mostrar un mensaje de error
    console.log(`El proceso ${proceso.id} no se ha encontrado en ninguna partición`);
  }

  // Método para mostrar el estado de la memoria
  mostrarEstado() {
    // mostrar el tamaño total de la memoria
    console.log(`La memoria tiene un tamaño de ${this.tamano} bytes`);
    // mostrar el número y el tamaño de las particiones
    console.log(
      `La memoria tiene ${this.particiones.length} particiones de ${this.particiones[0].tamano} bytes cada una`
    );
    // mostrar el estado de cada partición
    for (let i = 0; i < this.particiones.length; i++) {
      let particion = this.particiones[i];
      console.log(
        `La partición ${i + 1} que empieza en ${particion.inicio} bytes está ${
          particion.estado
        } ${
          particion.proceso
            ? `por el proceso ${particion.proceso.id} de tamaño ${particion.proceso.tamano} bytes`
            : ""
        }`
      );
    }
  }
}

// Definir la clase Proceso
class Proceso {
  constructor(id, tamano, tiempo) {
    this.id = id; // el identificador del proceso
    this.tamano = tamano; // el tamaño del proceso en bytes
    this.tiempo = tiempo; // el tiempo de ejecución del proceso en segundos
  }
}

// Definir una función que simule el comportamiento del sistema multiprogramado
function simularSistema(memoria, numProcesos, maxTamano, maxTiempo) {
  // memoria es un objeto de la clase Memoria
  // numProcesos es el número de procesos a generar
  // maxTamano es el tamaño máximo de los procesos en bytes
  // maxTiempo es el tiempo máximo de ejecución de los procesos en segundos

  // generar una lista de procesos aleatorios
  let procesos = [];
  for (let i = 0; i < numProcesos; i++) {
    // generar un identificador, un tamaño y un tiempo aleatorios para el proceso
    let id = i + 1;
    let tamano = Math.floor(Math.random() * maxTamano) + 1;
    let tiempo = Math.floor(Math.random() * maxTiempo) + 1;
    // crear un nuevo proceso con los datos generados
    let proceso = new Proceso(id, tamano, tiempo);
    // añadir el proceso a la lista de procesos
    procesos.push(proceso);
  }

  // mostrar el estado inicial de la memoria
  console.log("Estado inicial de la memoria:");
  memoria.mostrarEstado();

  // asignar los procesos a las particiones disponibles
  console.log("Asignación de los procesos:");
  for (let proceso of procesos) {
    memoria.asignarProceso(proceso);
  }

  // mostrar el estado de la memoria después de la asignación
  console.log("Estado de la memoria después de la asignación:");
  memoria.mostrarEstado();

  // liberar las particiones ocupadas cuando los procesos terminan
  console.log("Liberación de los procesos:");
  for (let proceso of procesos) {
    // simular el tiempo de ejecución del proceso con un setTimeout
    setTimeout(() => {
      memoria.liberarProceso(proceso);
    }, proceso.tiempo * 1000); // el tiempo se multiplica por 1000 para convertirlo a milisegundos
  }

  // mostrar el estado de la memoria después de la liberación
  console.log("Estado de la memoria después de la liberación:");
  setTimeout(() => {
    memoria.mostrarEstado();
  }, (maxTiempo + 1) * 1000); // el tiempo se calcula como el máximo tiempo de ejecución más uno, para asegurar que todos los procesos hayan terminado
}

// Crear un objeto de la clase Memoria con un tamaño de 1024 bytes
let memoria = new Memoria(1024);

// Crear 8 particiones estáticas de tamaño fijo
memoria.crearParticionesFijas(8);
