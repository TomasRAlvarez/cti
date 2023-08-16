const main = document.getElementById("mainLogin");
const form = document.getElementById("loginForm");

userId = localStorage.getItem("id");
console.log(userId);

if (userId !== null) {
    loginOk(userId);
} else {
    form.addEventListener("submit", (e) => {
        const user = document.getElementById("user").value;
        const password = document.getElementById("password").value;
        e.preventDefault();
        fetch("../json/users.json")
            .then((data) => data.json())
            .then((parsedData) => {
                if (parsedData[user] != undefined) {
                    if (parsedData[user].password === password) {
                        localStorage.setItem("id", user);
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
    console.log(user);
    main.innerHTML = `<section class="userPage">
        <div  class="userPageTitle">
            <h1>Bienvenido ${user}</h1>
        </div>

        <div  class="userPageStats"
            <h2>Propiedades guardadas: ${localStorage.length - 1}</h2>
        </div>
    </section>`;
}
