class memoria {
    #tamaño; 
    #particion; 
  
    constructor(tamaño, particion) {
      this.#tamaño = tamaño;
      this.#particion = particion;
    }
  
    // Getter y Setter para tamaño
    get tamaño() {
      return this.#tamaño;
    }

    set tamaño(nuevoTamaño) {
      if (!Number.isInteger(nuevoTamaño) || nuevoTamaño < 0) {
        throw new Error("El tamaño debe ser un número entero positivo");
      }
      this.#tamaño = nuevoTamaño;
    }
  
    // Getter y Setter para particion
    get particion() {
      return this.#particion;
    }
  
    set particion(nuevaParticion) {
      if (!Array.isArray(nuevaParticion) || !nuevaParticion.every(Number.isInteger)) {
        throw new Error("La partición debe ser un arreglo de números enteros");
      }
      this.#particion = nuevaParticion;
    }
  }
  
  function gestionarMemoria() {
    // Obtener el tamaño de la memoria y el número de particiones del usuario
    const tamañoMemoria = document.getElementById("tamanioMemoria").value;
    const numParticiones = document.getElementById("numParticiones").value;
  
    // Validar los valores introducidos
    if (!validarValores(tamañoMemoria, numParticiones)) {
      return;
    }
  
    // Crear una instancia de la clase `Memoria`
    const memoria = new Memoria(tamañoMemoria, numParticiones);
  
    // Generar las particiones
    generarParticiones(memoria);
  
    // Mostrar la información de la memoria en la interfaz de usuario
    mostrarMemoria(memoria);
  
    // Obtener el método de gestión de memoria seleccionado
    const metodo = document.getElementById("metodo").value;
  
    // Seleccionar el algoritmo de asignación de memoria
    switch (metodo) {
      case "primerAjuste":
        primerAjuste(memoria);
        break;
      case "mejorAjuste":
        mejorAjuste(memoria);
        break;
      case "peorAjuste":
        peorAjuste(memoria);
        break;
      default:
        console.log("El método de gestión de memoria no es válido");
    }
  }
  
  function primerAjuste(proceso) {
    for (let particion of this.particiones) {
        if (particion.estado == "libre" && particion.tamaño >= proceso.tamaño) {
        if (particion.tamaño === proceso.tamaño) {
            particion.estado = "ocupada";
            particion.proceso = proceso;
            console.log(
             `El proceso ${proceso.id} de tamaño ${proceso.tamaño} bytes se ha asignado a la partición que empieza en ${particion.inicio} bytes`
                );
                } else {
                  const newPartition = new Particion(proceso.tamaño, particion.inicio);
                  newPartition.estado = "ocupada";
                  newPartition.proceso = proceso;
                  this.particiones.splice(this.particiones.indexOf(particion), 1, newPartition, particion);
                  console.log(
                    `El proceso ${proceso.id} de tamaño ${proceso.tamaño} bytes se ha asignado a una nueva partición que empieza en ${newPartition.inicio} bytes`
                  );
                }
                return;
              }
            }
            console.log(
              `El proceso ${proceso.id} de tamaño ${proceso.tamaño} bytes no se ha podido asignar a ninguna partición`
            );
  }
  
  function mejorAjuste(proceso) {
    let mejorFitIndex = -1;
    let mejorFitSize = Infinity;
  
    // Búsqueda binaria para encontrar la partición libre con el tamaño más cercano al del proceso
    let inicio = 0;
    let fin = this.particiones.length - 1;
    while (inicio <= fin) {
      let mitad = Math.floor((inicio + fin) / 2);
      const particion = this.particiones[mitad];
  
      if (particion.estado === "libre" && particion.tamaño >= proceso.tamaño) {
        if (particion.tamaño - proceso.tamaño < mejorFitSize) {
          mejorFitIndex = mitad;
          mejorFitSize = particion.tamaño - proceso.tamaño;
        }
        fin = mitad - 1;
      } else {
        inicio = mitad + 1;
      }
    }
  
    // Si se encontró una partición adecuada, se asigna el proceso a la misma
    if (mejorFitIndex !== -1) {
      const particion = this.particiones[mejorFitIndex];
      if (particion.tamaño === proceso.tamaño) {
        particion.estado = "ocupada";
        particion.proceso = proceso;
        console.log(`El proceso ${proceso.id} de tamaño ${proceso.tamaño} bytes se ha asignado a la partición que empieza en ${particion.inicio} bytes`);
      } else {
        const newPartition = new Particion(proceso.tamaño, particion.inicio);
        newPartition.estado = "ocupada";
      }
    }
  }  

  function peorAjuste(proceso) {
      let peorFitIndex = -1;
    let peorFitSize = -1;
        
        for (let i = 0; i < this.particiones.length; i++) {
        const particion = this.particiones[i];
        if (particion.estado === "libre" && particion.tamaño >= proceso.tamaño) {
        if (particion.tamaño > peorFitSize) {
            peorFitSize = particion.tamaño;
            peorFitIndex = i;
            }
        }
    }
        
    if (peorFitIndex !== -1) {
        const particion = this.particiones[peorFitIndex];
        if (particion.tamaño === proceso.tamaño) {
        particion.estado = "ocupada";
        particion.proceso = proceso;
        console.log(
            `El proceso ${proceso.id} de tamaño ${proceso.tamaño} bytes se ha asignado a la partición que empieza en ${particion.inicio} bytes`
             );
            } else {
                const newPartition = new Particion(proceso.tamaño, particion.inicio);
                newPartition.estado = "ocupada";
                newPartition.proceso = proceso;
                this.particiones.splice(peorFitIndex, 1, newPartition, particion);
                console.log(
                  `El proceso ${proceso.id} de tamaño ${proceso.tamaño} bytes se ha asignado a una nueva partición que empieza en ${newPartition.inicio} bytes`
                );
              }
            } else {
              console.log(
                `El proceso ${proceso.id} de tamaño ${proceso.tamaño} bytes no se ha podido asignar a ninguna partición`
              );
            }
  }
  
  function validarValores(tamañoMemoria, numParticiones) {
    if (!tamañoMemoria || !numParticiones) {
      alert("Debe introducir el tamaño de la memoria y el número de particiones");
      return false;
    }
  
    if (isNaN(tamañoMemoria) || isNaN(numParticiones)) {
      alert("El tamaño de la memoria y el número de particiones deben ser números");
      return false;
    }
  
    if (parseInt(tamañoMemoria) <= 0) {
      alert("El tamaño de la memoria debe ser un número positivo");
      return false;
    }
  
    if (parseInt(numParticiones) <= 0) {
      alert("El número de particiones debe ser un número positivo");
      return false;
    }
  
    return true;
  }
  

  function generarParticiones(memoria) {
        const metodoParticiones = document.getElementById("metodoParticiones").value;
      
        switch (metodoParticiones) {
          case "estaticasTamanoFijo":
            generarParticionesEstáticasTamañoFijo(memoria);
            break;
          case "estaticasTamanoVariable":
            generarParticionesEstáticasTamañoVariable(memoria);
            break;
          case "dinamicasSinCompactacion":
            generarParticionesDinámicasSinCompactacion(memoria);
            break;
          case "dinamicasConCompactacion":
            generarParticionesDinámicasConCompactacion(memoria);
            break;
          default:
            console.log("El método de generación de particiones no es válido");
        }
      }
  function mostrarMemoria(memoria) {
        const resultado = document.getElementById("resultado");
      
        // Mostrar el tamaño de la memoria
        resultado.innerHTML += `<p>Tamaño total de la memoria: ${memoria.tamaño} bytes</p>`;
      
        // Mostrar las particiones
        for (const particion of memoria.particiones) {
          resultado.innerHTML += `<p>Partición: Inicio: ${particion.inicio} bytes, Tamaño: ${particion.tamaño} bytes, Estado: ${particion.estado}</p>`;
        }
      }
      
