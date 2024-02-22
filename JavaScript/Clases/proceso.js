class proceso {
    #tamaño; 
    #nombre; 
    constructor(nombre, tamaño) {
      this.#nombre = nombre;
      this.#tamaño = tamaño;
    }
  
    // Getter y setter para nombre
    get nombre() {
      return this.#nombre;
    }
  
    set nombre(nuevoNombre) {
      if (typeof nuevoNombre !== "string") {
        throw new Error("El nombre debe ser una cadena de texto");
      }
      this.#nombre = nuevoNombre;
    }
  
    // Getter y Setter para tamaño
    get tamaño() {
      return this.#tamaño;
    }
  
    set tamaño(nuevoTamaño) {
      if (typeof nuevoTamaño !== "number") {
        throw new Error("El tamaño debe ser un número");
      }
      this.#tamaño = nuevoTamaño;
    }
  }