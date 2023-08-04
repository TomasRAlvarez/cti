//Asignacion de btns a variables
const btnValorBarrio = document.getElementById("btnValorBarrio");
const btnCotizar = document.getElementById("btnCotizar");
const btnGuardar = document.getElementById("btnGuardar");
const btnEliminar = document.getElementById("btnEliminar");

//Funciones q ejecuta cada boton cuando se clickea
btnValorBarrio.addEventListener("click", () => (document.getElementById("valorM2").value = 1000)); //esta funcion es de ejemplo por ahora. Despues cada barrio va a tener un valor asignado y ese se le asignara "valorm2"
btnCotizar.addEventListener("click", validar);
btnGuardar.addEventListener("click", crearProp);
btnEliminar.addEventListener("click", eliminar);

function validar() {
    let nombreProp = document.getElementById("nombreProp").value;
    let direcProp = document.getElementById("direcProp").value;
    let valorXm2 = parseFloat(document.getElementById("valorM2").value);
    let m2Totales = parseFloat(document.getElementById("m2Totales").value);
    let m2Cubiertos = parseFloat(document.getElementById("m2Cubiertos").value);
    let m2Descubiertos = parseFloat(document.getElementById("m2Descubiertos").value);
    let m2Semicubiertos = parseFloat(document.getElementById("m2Semicubiertos").value);
    //reviso que todos los campos necesarios esten completos
    if (nombreProp === "" || direcProp === "" || valorXm2 === "" || m2Totales === "" || m2Cubiertos === "" || m2Semicubiertos === "" || m2Descubiertos === "") {
        alert("Falta ingresar datos de la propiedad");
    } else if (m2Totales != m2Cubiertos + m2Descubiertos + m2Semicubiertos) {
        alert("Los metros cubiertos, descubiertos y semicubiertos no coinciden con los metros totales");
    } else {
        cotizar(valorXm2, m2Totales, m2Cubiertos, m2Descubiertos, m2Semicubiertos);
    }
}

//realizo los calculos necesarios para llegar al valor de la propiedad
function cotizar(valorXm2, m2Totales, m2Cubiertos, m2Descubiertos, m2Semicubiertos) {
    let m2Homogeneizados = m2Cubiertos + m2Semicubiertos * 0.6 + m2Descubiertos * 0.4;
    let valorAprox = m2Homogeneizados * valorXm2;
    let estadoProp = parseFloat(document.getElementById("estadoProp").value);
    let valorFinal = valorAprox;

    if (estadoProp < 20) {
        valorFinal = valorAprox * 0.75;
    } else if (estadoProp < 50) {
        valorFinal = valorAprox * 0.9;
    } else if (estadoProp > 70) {
        valorFinal = valorAprox * 1.1;
    }
    document.getElementById("valorFinal").value = valorFinal.toFixed(2);
    //habilito el boton para guardar la propiedad
    btnGuardar.disabled = false;
    return valorFinal, m2Totales, m2Cubiertos, m2Semicubiertos, m2Descubiertos;
}

function eliminar() {
    //borra todos los valores
    document.getElementById("nombreProp").value = "";
    document.getElementById("direcProp").value = "";
    document.getElementById("valorM2").value = "";
    document.getElementById("m2Totales").value = "";
    document.getElementById("m2Cubiertos").value = "";
    document.getElementById("m2Descubiertos").value = "";
    document.getElementById("m2Semicubiertos").value = "";
    document.getElementById("estadoProp").value = "50";
    document.getElementById("valorFinal").value = "";
    document.getElementById("pileta").checked = false;
    document.getElementById("parrilla").checked = false;
    document.getElementById("jardin").checked = false;
    document.getElementById("sum").checked = false;
    document.getElementById("gimnasio").checked = false;
    //deshabilito el boton para guardar la propiedad
    btnGuardar.disabled = true;
}

//declaro array para guardar todas las propiedades
let propsGuardadas = [];
function crearProp() {
    //Declaracion de todos los datos de la propiedad a cargar
    let nombreProp = document.getElementById("nombreProp").value;
    let direcProp = document.getElementById("direcProp").value;
    let tipoCasa = document.getElementById("tipoCasa").checked;
    let tipoDepto = document.getElementById("tipoDepto").checked;
    let tipoPH = document.getElementById("tipoPH").checked;
    let barrioProp = document.getElementById("barrioProp").value;
    let estadoProp = document.getElementById("estadoProp").value;
    let pileta = document.getElementById("pileta").checked;
    let parrilla = document.getElementById("parrilla").checked;
    let jardin = document.getElementById("jardin").checked;
    let sum = document.getElementById("sum").checked;
    let gimnasio = document.getElementById("gimnasio").checked;

    //verifico que tipo de propiedad es
    let tipoProp = "";
    if (tipoCasa == true) {
        tipoProp = "casa";
    } else if (tipoDepto) {
        tipoProp = "departamento";
    } else if (tipoPH) {
        tipoProp = "ph";
    }

    //guardo la propiedad dentro del objeto
    let propiedad = {
        nombre: nombreProp,
        direccion: direcProp,
        barrio: barrioProp,
        tipo: tipoProp,
        valor: valorFinal.value,
        metrosTotales: m2Totales.value,
        metrosCubiertos: m2Cubiertos.value,
        metrosSemincubiertos: m2Semicubiertos.value,
        metrosDescubiertos: m2Descubiertos.value,
        estado: estadoProp,
        pileta: pileta,
        parrilla: parrilla,
        jardin: jardin,
        sum: sum,
        gimnasio: gimnasio,
    };
    //agrego la propiedad al array con todas las propiedades
    propsGuardadas.push(propiedad);
    localStorage.setItem(`${propiedad.nombre}`, JSON.stringify(propiedad)); //guarda las propiedades en el localstorage
    alert("Su propiedad se guardo correctamente");
    alert(`Usted guardo ${propsGuardadas.length} propiedades`);
    //ciclo para ver en la consola las propiedades guardadas
    for (let i = 0; i < propsGuardadas.length; i++) {
        console.log(propsGuardadas[i]);
    }
    //resetea los campos para crear cotizaciones
    eliminar();
}
