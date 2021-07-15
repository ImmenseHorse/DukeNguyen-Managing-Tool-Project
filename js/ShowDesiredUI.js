
const login = document.getElementById("login");
const username = document.getElementById("username");
const pass = document.getElementById("pass");
const rmCheck = document.getElementById("rememberMe");

//Login
async function load(){
    const conn = await fetch("https://60dab586801dcb0017290af3.mockapi.io/api/ducnguyen/loginData");
    const users = await conn.json();
    console.log(users);
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
                if (loginInfor.username == user.username && loginInfor.password == user.password) {
                    localStorage.setItem("checkLogin", 'true');
                    localStorage.setItem("registeredFunction", user.registeredFunction);
                    break;
                }
            }
        }

        if (localStorage.getItem('checkLogin') == 'true') {
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

    if(localStorage.checkbox && localStorage.checkbox !== ''){
        rmCheck.setAttribute("checked","checked");
        username.value = localStorage.username;
        pass.value = localStorage.pass;
    }
    else{
        rmCheck.removeAttribute("checked");
        username.value = "";
        pass.value = "";
    }

    login.addEventListener('click',() => {
        if(rmCheck.checked && username.value !== "" && pass.value !== ""){
            localStorage.username = username.value;
            localStorage.pass = pass.value;
            localStorage.checkbox = rmCheck.value;
        }
        else{
            localStorage.username = "";
            localStorage.pass = "";
            localStorage.checkbox = "";
        }
    });
}

load();

//Regis   =========================================================================================

let regisUsername = document.getElementById("regis-username");
let regisPass = document.getElementById("regis-pass");
let regisPassAgian = document.getElementById("passagain");
let regisEmail = document.getElementById("email");
let btnCheckMana = document.getElementById("ManageEmployees");
let regisSDT = document.getElementById("sdt");

let btnRegis = document.getElementById("register2");
const register = {};

async function postData(url = '', data = {}){
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
        'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return JSON.stringify(data);
}

btnRegis.addEventListener('click', () => {
    if(!(regisUsername.value) || !(regisPass.value) || !(regisPassAgian.value) || !(regisEmail.value) || !(regisSDT.value)){
        alert("Mời nhập đủ");
    }
    else if(regisPass.value != regisPassAgian.value){
        alert("Pass chưa được xác nhận");
    }
    else{
        register['username'] = regisUsername.value;
        register['password'] = regisPass.value;
        register['email'] = regisEmail.value;
        register['SDT'] = regisSDT.value;
        if(btnCheckMana == true) register["registeredFunction"] = btnCheckMana.value;
        else register["registeredFunction"] = "ManageStock";
        postData("https://60dab586801dcb0017290af3.mockapi.io/api/ducnguyen/loginData", register).then(data =>{
            console.log(data);
            alert("Đăng kí thành công");
        });
        document.getElementById("login-form").style.display = "block";
        document.getElementById("register").style.display = "none";
    } 
    
});
