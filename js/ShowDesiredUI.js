const login = document.getElementById("login");
const username = document.getElementById("username");
const pass = document.getElementById("pass");
const rmCheck = document.getElementById("rememberMe");

//Login
async function load() {
    const conn = await fetch("https://60dab586801dcb0017290af3.mockapi.io/api/ducnguyen/loginData");
    const users = await conn.json();
    login.addEventListener('click', (e) => {
        e.preventDefault();
        const loginInfor = {
            username: username.value,
            password: pass.value,
        }
        if (!loginInfor.username) {
            alert("Enter your username");
        } else if (!loginInfor.password) {
            alert("Enter your password");
        } else {
            localStorage.setItem("checkLogin", 'false');
            for (let user of users) {
                if (loginInfor.username === user.username && loginInfor.password === user.password) {
                    localStorage.setItem("checkLogin", 'true');
                    localStorage.setItem("registeredFunction", user.registeredFunction);
                    break;
                }
            }
        }

        if (localStorage.getItem('checkLogin') === 'true') {
            switch (localStorage.getItem('registeredFunction')) {
                case 'ManageEmployees':
                    location.replace("ManageEmployees.html");
                    break;
                case 'ManageStock':
                    location.replace("ManageStock.html");
                    break;
            }
        }

    });

    if (localStorage.checkbox && localStorage.checkbox !== '') {
        rmCheck.setAttribute("checked", "checked");
        username.value = localStorage.username;
        pass.value = localStorage.pass;
    } else {
        rmCheck.removeAttribute("checked");
        username.value = "";
        pass.value = "";
    }

    login.addEventListener('click', () => {
        if (rmCheck.checked === "checked" && username.value !== "" && pass.value !== "") {
            localStorage.username = username.value;
            localStorage.pass = pass.value;
            localStorage.checkbox = rmCheck.value;
        } else if (!rmCheck.checked && username.value !== "" && pass.value !== "") {
            localStorage.username = username.value;
            localStorage.pass = pass.value;
            localStorage.checkbox = '';
        } else {
            localStorage.setItem("checkLogin", 'false');
        }
    });
}

load();


//Register   =========================================================================================

let regisUsername = document.getElementById("regis-username");
let regisPass = document.getElementById("regis-pass");
let regisPassAgain = document.getElementById("passagain");
let regisEmail = document.getElementById("email");
let btnCheckEmployees = document.getElementById("ManageEmployees");
let regisTel = document.getElementById("tel");

let btnRegis = document.getElementById("register2");
const register = {};

btnRegis.addEventListener('click', () => {
    if (!(regisUsername.value) || !(regisPass.value) || !(regisPassAgain.value) || !(regisEmail.value) || !(regisTel.value)) {
        alert("Please Enter All Values");
    }
    if (regisPass.value != regisPassAgain.value) {
        alert("Invalid Password");
    } else {
        register['username'] = regisUsername.value;
        register['password'] = regisPass.value;
        register['email'] = regisEmail.value;
        register['tel'] = regisTel.value;
        if (btnCheckEmployees === true) {
            register["registeredFunction"] = btnCheckEmployees.value;
        } else {
            register["registeredFunction"] = "ManageStock";
        }
        addNewItem("https://60dab586801dcb0017290af3.mockapi.io/api/ducnguyen/loginData", register).then(data => {
            alert("Congratulations, your account has been successfully created.");
            alert("Welcome to Managing Tool, " + regisUsername.value + '.');
        });
        document.getElementById("login-form").style.display = "block";
        document.getElementById("register").style.display = "none";
    }

});