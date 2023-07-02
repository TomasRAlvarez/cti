function cotizar() {
    let m2 = document.getElementById("cantidadM2").value;
    let valorXm2 = document.getElementById("valorM2").value;
    let operacionVenta = document.getElementById("venta").checked;
    let operacionAlquiler = document.getElementById("alquiler").checked;

    if (m2 == "" || valorXm2 == "") {
        alert("Falta completar datos");
    } else if (operacionVenta == false && operacionAlquiler == false) {
        alert("Seleccionar una operacion");
    } else if (operacionVenta == true && operacionAlquiler == true) {
        alert("Seleccionar solo una operacion");
    } else {
        let valorTotal = m2 * valorXm2;
        document.getElementById("cantidadUSD").value = valorTotal;
    }
}

function eliminar() {
    document.getElementById("cantidadM2").value = "";
    document.getElementById("valorM2").value = "";
    document.getElementById("venta").checked = false;
    document.getElementById("alquiler").checked = false;
    document.getElementById("cantidadUSD").value = "";
}

let cantidadCotizaciones = 0;
function guardar() {
    cantidadCotizaciones = cantidadCotizaciones + 1;
    console.log(cantidadCotizaciones);
    alert("Su cotizacion se guardo correctamente");
    eliminar();
    contarCotizaciones(cantidadCotizaciones);
}

function contarCotizaciones(x) {
    for (i = 0; i <= x; i++) {
        if (i == x) {
            switch (i) {
                case 1:
                    alert("Usted guardo: " + i + " cotizacion");
                    break;
                default:
                    alert("Usted guardo: " + i + " cotizaciones");
            }
        }
    }
}
