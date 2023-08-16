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
    main.innerHTML = `<section class="userPage">
        <div  class="userPageTitle">
            <h1>Bienvenido ${user}</h1>
        </div>

        <div  class="userPageStats">
            <h2>Propiedades guardadas: </h2>
        </div>

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
