function validar() {
    let m2 = document.getElementById("cantidadM2").value;
    let valorXm2 = document.getElementById("valorM2").value;
    let operacionVenta = document.getElementById("venta").checked;
    let operacionAlquiler = document.getElementById("alquiler").checked;

    if (m2 == "" || valorXm2 == "") {
        alert("Falta completar datos");
        return false; //para validar en la funcion guardar
    } else if (operacionVenta == false && operacionAlquiler == false) {
        alert("Seleccionar una operacion");
        return false; //para validar en la funcion guardar
    } else if (operacionVenta == true && operacionAlquiler == true) {
        alert("Seleccionar solo una operacion");
        return false; //para validar en la funcion guardar
    } else {
        cotizar(m2, valorXm2);
        return true; //para validar en la funcion guardar
    }
}

function cotizar(m2, valorXm2) {
    let valorTotal = m2 * valorXm2;
    document.getElementById("valorFinal").value = valorTotal;
}

function eliminar() {
    //borra todos los valores
    document.getElementById("cantidadM2").value = "";
    document.getElementById("valorM2").value = "";
    document.getElementById("venta").checked = false;
    document.getElementById("alquiler").checked = false;
    document.getElementById("valorFinal").value = "";
}

let cantidadCotizaciones = 0; //declaro afuera de la funcion para que sea 0 al iniciar
function guardar() {
    let valorCotizacion = document.getElementById("valorFinal").value; //si esta vacia, validar() se ejecuta
    if (validar() == true && valorCotizacion != "") {
        cantidadCotizaciones = cantidadCotizaciones + 1;
        console.log(cantidadCotizaciones);
        alert("Su cotizacion se guardo correctamente");
        eliminar();
        contarCotizaciones(cantidadCotizaciones);
    }
}

//contador de cotizaciones con un for
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
