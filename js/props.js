const propsView = document.getElementById("propsView");
const buscarProp = document.getElementById("buscarProp");
//array para guardar las claves del localStorage
let verProps = [];
//cuando carga el documento
addEventListener("DOMContentLoaded", () => {
    for (i = 0; i < localStorage.length; i++) {
        //agrego las claves al array
        verProps.push(localStorage.key(i));
    }
    if (verProps.length === 0) {
        //check si hay propiedades guardaas
        propsView.innerHTML = '<h6 class="noProps-text">No hay ninguna propiedad guardada</h6>';
    } else {
        //agrego al dom las propiedades guardadas
        for (let i = 0; i < verProps.length; i++) {
            let mostrarProp = JSON.parse(localStorage.getItem(`${verProps[i]}`));

            propsView.innerHTML += `<article class="datosPropiedad" id=${verProps[i]}>
                <div class="datosPropiedadTitle">
                    <img src="https://placeholder.com/100x100" alt="" />
                    <h4>${mostrarProp.nombre}</h4>
                </div>

                <div class="datosPropiedadDatos">
                    <h6>Direccion: ${mostrarProp.direccion}</h6>
                    <h6>Barrio: ${mostrarProp.barrio}</h6>
                    <h6>M²: ${mostrarProp.metrosTotales}</h6>
                    <h6>Valor de Cotizacion: $${mostrarProp.valor}</h6>
                    <h6>Estado: ${mostrarProp.estado}</h6>
                    <h6>Amenietes: ${mostrarProp.pileta}</h6>
                </div>
            </article>`;
        }
    }
});

//buscador de propiedades
buscarProp.addEventListener("keyup", () => {
    for (i = 0; i < verProps.length; i++) {
        if (!verProps[i].includes(buscarProp.value)) {
            document.getElementById(`${verProps[i]}`).style.display = "none";
        } else {
            document.getElementById(`${verProps[i]}`).style.display = "block";
        }
    }
});
