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
  
    crearParticiones(num) {
      switch (this.metodo) {
              
        case "Particiones estáticas de tamaño fijo":
          let tamañoParticion = Math.floor(this.tamaño / num);
          let inicioParticion = 0;
          for (let i = 0; i < num; i++) {
            let particion = new Particion(tamañoParticion, inicioParticion);
            this.particiones.push(particion);
            inicioParticion += tamañoParticion;
          }
          break;
              
        case "Particiones estáticas de tamaño variable":
          let inicioParticion = 0;
          let espacioLibre = this.tamaño;
          while (espacioLibre > 0) {
            let tamañoProceso = Math.floor(Math.random() * espacioLibre) + 1;
            let particion = new Particion(tamañoProceso, inicioParticion);
            let proceso = new Proceso(
              this.particiones.length + 1,
              tamañoProceso,
              Math.floor(Math.random() * 10) + 1
            );
              
            particion.estado = "ocupada";
            particion.proceso = proceso;
            this.particiones.push(particion);
            inicioParticion += tamañoProceso;
            espacioLibre -= tamañoProceso;
          }
          break;
              
        case "Particiones dinámicas sin compactación":
          let particion = new Particion(this.tamaño, 0);
          this.particiones.push(particion);
          break;
              
        case "Particiones dinámicas con compactación":
          let particion = new Particion(this.tamaño, 0);
          this.particiones.push(particion);
          break;
              
        default:
          console.log("El método de gestión de memoria no es válido");
          break;         
      }
    }

    asignarProceso(proceso) {
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
                let nuevaParticion = new Particion(
                  particion.tamaño - proceso.tamaño, 
                  particion.inicio + proceso.tamaño);
                particion.estado = "ocupada";
                particion.proceso = proceso;
                particion.tamaño = proceso.tamaño;
              }
            }
          }
        }
    }
}
