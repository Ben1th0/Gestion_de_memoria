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
  
    // Funciones cambio tipo de memoria
    cambiarParticion() {}
    parEst() {}
    parEstVar() {}
    parDin() {}
    parDinCon() {}
  }