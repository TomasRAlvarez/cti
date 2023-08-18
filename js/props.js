//verifico que haya un usuario logueado, sino lo redirijo a login
userId = sessionStorage.getItem("id");
if (userId === null) {
    window.location.href = "./pages/login.html";
}
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
        //variable de contol para ver si se muetsra alguna propiedad
        let control = false;
        //agrego al dom las propiedades guardadas
        for (let i = 0; i < verProps.length; i++) {
            let mostrarProp = JSON.parse(localStorage.getItem(`${verProps[i]}`));
            //selecciono solo las propiedades con el mismo id de la sesion
            if (mostrarProp.id === userId) {
                //guardar imagen del tipo de propiedad
                let tipoProp = "";
                switch (mostrarProp.tipo) {
                    case "casa":
                        tipoProp = "../assets/casa.svg";
                        break;
                    case "departamento":
                        tipoProp = "../assets/departamento.svg";
                        break;
                    case "ph":
                        tipoProp = "../assets/ph.svg";
                        break;
                }

                //asignarle uina palabra al estado de la propiedad
                let tipoEstado = parseInt(mostrarProp.estado);
                switch (true) {
                    case tipoEstado >= 70:
                        tipoEstado = "A estrenar";
                        break;
                    case tipoEstado >= 50 && tipoEstado < 70:
                        tipoEstado = "En condiciones";
                        break;
                    case tipoEstado >= 20 && tipoEstado < 50:
                        tipoEstado = "A mejorar";
                        break;
                    case tipoEstado < 20:
                        tipoEstado = "A reciclar";
                        break;
                }

                //array para guardar los amenietes de la propiedad
                let amenietes = [];
                mostrarProp.pileta ? amenietes.push("Pileta") : null;
                mostrarProp.parrilla ? amenietes.push(" Parrilla") : null;
                mostrarProp.jardin ? amenietes.push(" Jardin") : null;
                mostrarProp.sum ? amenietes.push(" SUM") : null;
                mostrarProp.gimnasio ? amenietes.push(" Gimnasio") : null;
                amenietes.length === 0 ? amenietes.push("No tiene") : null;

                //creacion de la tarjeta de propiedad
                propsView.innerHTML += `<article class="datosPropiedad" id=${verProps[i]}>
                    <div class="datosPropiedadTitle">
                        <img src="${tipoProp}" alt="" />
                        <h4>${mostrarProp.nombre}</h4>
                    </div>

                    <div class="datosPropiedadDatos">
                        <h6>Direccion: ${mostrarProp.direccion}</h6>
                        <h6>Barrio: ${mostrarProp.barrio}</h6>
                        <h6>M²: ${mostrarProp.metrosTotales}</h6>
                        <h6>Valor de Cotizacion: $${mostrarProp.valor}</h6>
                        <h6>Estado: ${tipoEstado}</h6>
                        <h6>Amenietes: ${amenietes}</h6>
                    </div>
                </article>`;
                //se mostro una propiedad
                control = true;
            }
        }

        //caso de que no se haya mostrado ninguna propiedad
        if (control !== true) {
            propsView.innerHTML = '<h6 class="noProps-text">No hay ninguna propiedad guardada</h6>';
        }
    }
});

//buscador de propiedades
buscarProp.addEventListener("keyup", () => {
    let propsGuardadas = [];
    for (let i = 0; i < verProps.length; i++) {
        propsGuardadas.push(JSON.parse(localStorage.getItem(`${verProps[i]}`)));
    }
    for (let i = 0; i < propsGuardadas.length; i++) {
        if (propsGuardadas[i].id === userId) {
            if (!propsGuardadas[i].nombre.includes(buscarProp.value)) {
                document.getElementById(`${propsGuardadas[i].nombre}`).style.display = "none";
            } else {
                document.getElementById(`${propsGuardadas[i].nombre}`).style.display = "block";
            }
        }
    }
});
