//16777216 bytes
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

class Utilidades {
    static listaAArray(lista) {
        let array = [];
        let nodoActual = lista.head;
        while (nodoActual != null) {
            array.push(nodoActual.value);
            nodoActual = nodoActual.next;
        }
        return array;
    }
}
  
    switch (this.metodo) {

            case "Particiones estáticas de tamaño fijo":
            const tamañoParticion = Math.floor(this.tamaño / num);
            for (let i = 0, inicioParticion = 0; i < num; i++, inicioParticion += tamañoParticion) {
                let particion = new Particion(tamañoParticion, inicioParticion);
                this.particiones.push(particion);
            }
            break;

            case "Particiones estáticas de tamaño variable":
            let inicioParticion = 0;
            for (let i = 0; i < num; i++) {
                let particion = new Particion(tamañoParticion, inicioParticion);
                this.particiones.push(particion);
                inicioParticion += tamañoParticion;
            }
            break;
              
            case "Particiones dinámicas sin compactación":
            let particionDinamica = particionDinamicaSinCompactacion(this.tamaño);
            let arrayMemoria = listaAArray(particionDinamica.listaMemoria);
            this.particiones = arrayMemoria;
            break;
              
            case "Particiones dinámicas con compactación":
            const arrayMemoria2 = listaAArray(particionDinamica2.listaMemoria);
            this.particiones = arrayMemoria2;
            break;
              
            default:
            console.log("El método de gestión de memoria no es válido");
            break;         
        }

    asignarProceso(proceso);
      switch (this.metodo) {
        case "Particiones estáticas de tamaño fijo":
          for (let particion of this.particiones) {
            if (particion.estado == "libre" && particion.tamaño >= proceso.tamaño) {
              particion.estado = "ocupada";
              particion.proceso = proceso;
              console.log(
                `El proceso ${proceso.id} de tamaño ${proceso.tamaño} bytes se ha asignado a la partición que empieza en ${particion.inicio} bytes`
              );
              return;
            }
          }
          console.log(
            `El proceso ${proceso.id} de tamaño ${proceso.tamaño} bytes no se ha podido asignar a ninguna partición`
          );
          break;
        case "Particiones estáticas de tamaño variable":
          let mejorParticion = null;
          let menorDiferencia = Infinity;
          for (let particion of this.particiones) {
            if (particion.estado == "libre" && particion.tamaño >= proceso.tamaño) {
              let diferencia = particion.tamaño - proceso.tamaño;
              if (diferencia < menorDiferencia) {
                mejorParticion = particion;
                menorDiferencia = diferencia;
              }
            }
          }
          if (mejorParticion) {
            mejorParticion.estado = "ocupada";
            mejorParticion.proceso = proceso;
            console.log(
              `El proceso ${proceso.id} de tamaño ${proceso.tamaño} bytes se ha asignado a la partición que empieza en ${mejorParticion.inicio} bytes`
            );
          } else {
            console.log(
              `El proceso ${proceso.id} de tamaño ${proceso.tamaño} bytes no se ha podido asignar a ninguna partición`
            );
          }
          break;
        case "Particiones dinámicas sin compactación":
          for (let particion of this.particiones) {
            if (particion.estado == "libre" && particion.tamaño >= proceso.tamaño) {
              if (particion.tamaño == proceso.tamaño) {
                particion.estado = "ocupada";
                particion.proceso = proceso;
                console.log(
                  `El proceso ${proceso.id} de tamaño ${proceso.tamaño} bytes se ha asignado a la partición que empieza en ${particion.inicio} bytes`
                );
                return;
              } else {
                particion.estado = "ocupada";
                particion.proceso = proceso;
                particion.tamaño = proceso.tamaño;
              }
            }
          }
        }

primerAjuste(proceso);
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
        
peorAjuste(proceso);
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
        
mejorAjuste(proceso);
    let mejorFitIndex = -1;
    let mejorFitSize = Infinity;
        
    for (let i = 0; i < this.particiones.length; i++) {
    const particion = this.particiones[i];
        if (particion.estado === "libre" && particion.tamaño >= proceso.tamaño) {
        }
    }
