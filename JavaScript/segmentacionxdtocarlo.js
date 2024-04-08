class Segment {
    constructor(segmentNumber, base, limit, logicalAddress) {
        this.segmentNumber = segmentNumber;
        this.base = base;
        this.limit = limit;
        this.logicalAddress = logicalAddress;
    }
}

// Tabla de segmentos de memoria
let segmentTable = [];

// Tamaño total de la memoria
const totalMemory = 16777216;

// Función para traducir dirección lógica a física
function translateLogicalToPhysical() {
    let segmentNumber = parseInt(document.getElementById("segmentNumber").value);
    let offset = parseInt(document.getElementById("offset").value);
    
    // Buscar el segmento en la tabla de segmentos
    let segment = segmentTable.find(seg => seg.segmentNumber === segmentNumber);
    if (!segment) {
        document.getElementById("result").innerText = "Segment not found";
        return;
    }

    // Verificar si el desplazamiento está dentro del límite del segmento
    if (offset < 0 || offset >= segment.limit) {
        document.getElementById("result").innerText = "Offset out of bounds";
        return;
    }

    // Calcular la dirección física sumando la base del segmento al desplazamiento
    let physicalAddress = segment.base + offset;
    document.getElementById("result").innerText = "Physical address: " + physicalAddress;
}

// Ejemplo de uso
segmentTable.push(new Segment(0, 0, totalMemory, "0x000000"));
updateSegmentTable();

// Función para actualizar la tabla de segmentos en la interfaz
function updateSegmentTable() {
    let tableBody = document.getElementById("segmentTable").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = ""; // Limpiar el contenido existente de la tabla
    
    // Agregar filas a la tabla para cada segmento en la tabla de segmentos
    segmentTable.forEach(segment => {
        let row = tableBody.insertRow();
        row.insertCell(0).innerText = segment.segmentNumber;
        row.insertCell(1).innerText = segment.base;
        row.insertCell(2).innerText = segment.limit;
        row.insertCell(3).innerText = segment.logicalAddress;
    });
}
