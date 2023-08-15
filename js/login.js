const form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {
    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;
    e.preventDefault();
    fetch("../json/users.json")
        .then((data) => data.json())
        .then((parsedData) => {
            if (parsedData[user] != undefined) {
                if (parsedData[user].password === password) {
                    loginOk();
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

function loginOk() {
    console.log("Logueo");
}
