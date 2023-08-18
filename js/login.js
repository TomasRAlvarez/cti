const main = document.getElementById("mainLogin");
const form = document.getElementById("loginForm");

userId = sessionStorage.getItem("id");

if (userId !== null) {
    //verifico si ya hay un usuario logueado
    loginOk(userId);
} else {
    //en caso de que no se haya logueado nigun usuario
    form.addEventListener("submit", (e) => {
        const user = document.getElementById("user").value;
        const password = document.getElementById("password").value;
        e.preventDefault();
        fetch("../json/users.json")
            .then((data) => data.json())
            .then((parsedData) => {
                if (parsedData[user] != undefined) {
                    if (parsedData[user].password === password) {
                        sessionStorage.setItem("id", user);
                        loginOk(user);
                    } else {
                        Toastify({
                            text: "Contraseña Incorrecta",
                            duration: 3000,
                            close: true,
                            stopOnFocus: false,
                            gravity: "top",
                            position: "right",
                            style: {
                                background: "linear-gradient(to right, #FF0707, #FF4E4E)",
                            },
                        }).showToast();
                    }
                } else {
                    Toastify({
                        text: "Usuario Incorrecto",
                        duration: 3000,
                        close: true,
                        stopOnFocus: false,
                        gravity: "top",
                        position: "right",
                        style: {
                            background: "linear-gradient(to right, #FF0707, #FF4E4E)",
                        },
                    }).showToast();
                }
            })
            .catch((e) => "error", e);
    });
}

function loginOk(user) {
    //logeo exitoso
    document.getElementById("userName").innerText = `${user}`;
    //contador de propiedades guardadas
    let props = [];
    let x = 0;
    for (i = 0; i < localStorage.length; i++) {
        //agrego a la variable todos los items del localstorage
        props.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
    for (i = 0; i < props.length; i++) {
        if (props[i].id === user) {
            x++;
        }
    }

    //modificacion de la pagina
    main.innerHTML = `<section class="userPage">
        <article class="userPagePrincipal"> 
            <div  class="userPageTitle">
                <h1>Bienvenido ${user}</h1>
            </div>

            <div  class="userPageStats">
                <h2>Propiedades guardadas: ${x}</h2>
            </div>
        </article>

        <article class="userPageLinks">         
            <div>
                <a href="../index.html"><button type="button" class="btn btn-primary">Cotizar una Propiedad</button></a>
            </div>

            <div>
            <a href="./props.html"><button type="button" class="btn btn-success">Mis Propiedades</button></a>
            </div>
        </article>

        <div class="userPageLogout">
            <button type="button" class="btn btn-danger" id="btnLogout">Cerrar Sesion</button>
        </div>
    </section>`;

    const btnLogout = document.getElementById("btnLogout");
    btnLogout.addEventListener("click", () => {
        Swal.fire({
            title: "Cerrar Sesion",
            text: "¿Seguro desea cerrar su sesion?",
            icon: "warning",
            confirmButtonText: "Ok",
            confirmButtonColor: "green",
            showCancelButton: true,
            cancelButtonText: "No",
            cancelButtonColor: "red",
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.removeItem("id");
                window.location.reload();
            }
        });
    });
}
