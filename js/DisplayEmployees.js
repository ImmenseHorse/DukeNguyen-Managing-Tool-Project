let employeesRealTime = 'https://60dab586801dcb0017290af3.mockapi.io/api/ducnguyen/employeesData';

const add2 = document.getElementById('add2');
const update3 = document.getElementById('myUpdate2');

const delete2 = document.getElementsByClassName('delBtn2');
const clear2 = document.getElementById('clear2');

const tID = document.getElementById("idy");
const name2 = document.getElementById('name2');
const degree = document.getElementById('degree');
const age = document.getElementById('age');
const gender = document.getElementById('gender');
const citizenship = document.getElementById('citizenship');
const salary = document.getElementById('salary');
const pStatus = document.getElementById('pStatus');
const bonus = document.getElementById('bonus');

const employeesBody = document.getElementById('EmployeesBody');

//search
const text1 = document.getElementById("textName1");
const btnSearch1 = document.getElementById("search1");
const btnRestore1 = document.getElementById("restore1");

btnSearch1.addEventListener('click', () => {
    btnRestore1.style.display = "inline";
    btnSearch1.style.display = "none";
    displayList(employeesRealTime, employeesBody, update3);
});

btnRestore1.addEventListener('click', () => {
    text1.value = "";
    btnRestore1.style.display = "none";
    btnSearch1.style.display = "inline";
    displayList(employeesRealTime, employeesBody, update3);
});

clear2.addEventListener('click', () => {
    tID.value = name2.value = degree.value = age.value = gender.value = citizenship.value = salary.value = pStatus.value = bonus.value = '';
    update3.style.display = 'none';
    add2.style.display = 'inline';
});


async function updateListEmployees(id) {
    await updateItem(employeesRealTime, id, {
        "name": name2.value,
        "degree": degree.value,
        "age": age.value,
        "gender": gender.value,
        "citizenship": citizenship.value,
        "salary": salary.value,
        "promotionstatus": pStatus.value,
        "bonus": bonus.value,
        "idy": tID.value,
    });
    displayList(employeesRealTime, employeesBody, update3)
    add2.style.display = 'inline';
};

add2.addEventListener('click', async function() {
    if (localStorage.username) {
        await addNewItem(employeesRealTime, {
            "name": name2.value,
            "degree": degree.value,
            "age": age.value,
            "gender": gender.value,
            "citizenship": citizenship.value,
            "salary": salary.value,
            "promotionstatus": pStatus.value,
            "bonus": bonus.value,
            "idy": tID.value,
            "username": localStorage.username,
        });
        tID.value = name2.value = degree.value = age.value = gender.value = citizenship.value = salary.value = pStatus.value = bonus.value = '';
        displayList(employeesRealTime, employeesBody, update3);
    } else if (sessionStorage.username) {
        await addNewItem(employeesRealTime, {
            "name": name2.value,
            "degree": degree.value,
            "age": age.value,
            "gender": gender.value,
            "citizenship": citizenship.value,
            "salary": salary.value,
            "promotionstatus": pStatus.value,
            "bonus": bonus.value,
            "idy": tID.value,
            "username": sessionStorage.username,
        });
        tID.value = name2.value = degree.value = age.value = gender.value = citizenship.value = salary.value = pStatus.value = bonus.value = '';
        displayList(employeesRealTime, employeesBody, update3);
    }
});

displayList(employeesRealTime, employeesBody, update3);