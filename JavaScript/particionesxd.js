// Definir la clase Memoria
class Memoria {
  constructor(tamano, metodo) {
    this.tamano = tamano; // el tamaño total de la memoria en bytes
    this.metodo = metodo; // el método de gestión de memoria a usar
    this.particiones = []; // la lista de particiones de la memoria
  }

  // Método para crear particiones según el método de gestión
  crearParticiones(num) {
    // num es el número de particiones a crear (solo se usa para el método de particiones estáticas de tamaño fijo)
    switch (this.metodo) {
      case "Particiones estáticas de tamaño fijo":
        // crear particiones de tamaño fijo como en el ejemplo anterior
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
        break;
      case "Particiones estáticas de tamaño variable":
        // crear particiones de tamaño variable según el tamaño de los procesos que se van a asignar
        // para este ejemplo, se asume que los procesos se generan de forma aleatoria y se asignan inmediatamente después de crear la partición
        // se podría modificar el código para que los procesos se generen y se asignen por separado
        let inicioParticion = 0; // la dirección de inicio de cada partición
        let espacioLibre = this.tamano; // el espacio libre que queda en la memoria
        while (espacioLibre > 0) {
          // generar un tamaño aleatorio para el proceso entre 1 y el espacio libre
          let tamanoProceso = Math.floor(Math.random() * espacioLibre) + 1;
          // crear una nueva partición con el tamaño del proceso y el inicio calculados
          let particion = new Particion(tamanoProceso, inicioParticion);
          // crear un nuevo proceso con el tamaño generado y un tiempo aleatorio entre 1 y 10 segundos
          let proceso = new Proceso(
            this.particiones.length + 1,
            tamanoProceso,
            Math.floor(Math.random() * 10) + 1
          );
          // asignar el proceso a la partición
          particion.estado = "ocupada";
          particion.proceso = proceso;
          // añadir la partición a la lista de particiones de la memoria
          this.particiones.push(particion);
          // actualizar la dirección de inicio y el espacio libre de la siguiente partición
          inicioParticion += tamanoProceso;
          espacioLibre -= tamanoProceso;
        }
        break;
      case "Particiones dinámicas sin compactación":
        // crear una sola partición que ocupe toda la memoria
        let particion = new Particion(this.tamano, 0);
        // añadir la partición a la lista de particiones de la memoria
        this.particiones.push(particion);
        break;
      case "Particiones dinámicas con compactación":
        // crear una sola partición que ocupe toda la memoria
        let particion = new Particion(this.tamano, 0);
        // añadir la partición a la lista de particiones de la memoria
        this.particiones.push(particion);
        break;
      default:
        // mostrar un mensaje de error si el método de gestión no es válido
        console.log("El método de gestión de memoria no es válido");
        break;
    }
  }

  // Método para asignar un proceso a una partición disponible según el método de gestión
  asignarProceso(proceso) {
    // proceso es un objeto de la clase Proceso
    switch (this.metodo) {
      case "Particiones estáticas de tamaño fijo":
        // asignar el proceso a la primera partición libre que tenga suficiente espacio para el proceso
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
        break;
      case "Particiones estáticas de tamaño variable":
        // asignar el proceso a la partición que tenga el tamaño más cercano al del proceso (best fit)
        let mejorParticion = null; // la mejor partición encontrada hasta el momento
        let menorDiferencia = Infinity; // la menor diferencia de tamaño entre el proceso y la partición encontrada hasta el momento
        for (let particion of this.particiones) {
          if (particion.estado == "libre" && particion.tamano >= proceso.tamano) {
            // calcular la diferencia de tamaño entre el proceso y la partición
            let diferencia = particion.tamano - proceso.tamano;
            // si la diferencia es menor que la menor diferencia encontrada hasta el momento, actualizar la mejor partición y la menor diferencia
            if (diferencia < menorDiferencia) {
              mejorParticion = particion;
              menorDiferencia = diferencia;
            }
          }
        }
        // si se encuentra una partición disponible, asignar el proceso a la mejor partición
        if (mejorParticion) {
          // asignar el proceso a la partición
          mejorParticion.estado = "ocupada";
          mejorParticion.proceso = proceso;
          // mostrar un mensaje indicando la asignación
          console.log(
            `El proceso ${proceso.id} de tamaño ${proceso.tamano} bytes se ha asignado a la partición que empieza en ${mejorParticion.inicio} bytes`
          );
        } else {
          // si no se encuentra ninguna partición disponible, mostrar un mensaje de error
          console.log(
            `El proceso ${proceso.id} de tamaño ${proceso.tamano} bytes no se ha podido asignar a ninguna partición`
          );
        }
        break;
      case "Particiones dinámicas sin compactación":
        // asignar el proceso a la primera partición libre que tenga suficiente espacio para el proceso
        for (let particion of this.particiones) {
          if (particion.estado == "libre" && particion.tamano >= proceso.tamano) {
            // si la partición tiene el mismo tamaño que el proceso, asignar el proceso a la partición
            if (particion.tamano == proceso.tamano) {
              // asignar el proceso a la partición
              particion.estado = "ocupada";
              particion.proceso = proceso;
              // mostrar un mensaje indicando la asignación
              console.log(
                `El proceso ${proceso.id} de tamaño ${proceso.tamano} bytes se ha asignado a la partición que empieza en ${particion.inicio} bytes`
              );
              // terminar la búsqueda
              return;
            } else {
              // si la partición tiene más espacio que el proceso, dividir la partición en dos: una ocupada por el proceso y otra libre con el espacio restante
              // crear una nueva partición con el espacio restante
              let nuevaParticion = new Particion(
                particion.tamano - proceso.tamano, // el tamaño de la nueva partición es la diferencia entre el tamaño de la partición original y el tamaño del proceso
                particion.inicio + proceso.tamano // la dirección de inicio de la nueva partición es la suma de la dirección de inicio de la partición original y el tamaño del proceso
              );
              // asignar el proceso a la partición original
              particion.estado = "ocupada";
              particion.proceso = proceso;
              particion.tamano = proceso.tamano; // el tamaño de la partición original se reduce al tamaño del proceso
              // insertar la nueva partición en la lista de particiones de la memoria, después
