const displayItems = (object, x) => {
    let strHTML = '';
    for (let i in object) {
        if (i === "ID") {
            strHTML = `<td>${object[i]}</td>` + strHTML;
        }
        if (i != "id" && i != "username" && i != "ID") {
            strHTML += `<td>${object[i]}</td>`;
        }
    };
    x.innerHTML += '<tr>' + strHTML + `<td><button class=${object["id"]}>X</button></td>` +
        `<td><button class=${object["id"]}>U</button></td></tr>`;
}


async function displayArr(json, x) {
    x.innerHTML = '';
    for (let i = 0; i < json.length; i++) {
        displayItems(json[i], x);
    }
}

async function displayList(source, x, updButton) {
    theID.value = '';
    name1.value = '';
    grade.value = '';
    origin1.value = '';
    unitPrice.value = '';
    availability.value = '';
    shipping.value = '';
    promotion.value = '';
    updButton.style.display = 'none';
    const data = await fetch(source);
    const json = await data.json();
    displayArr(json, x);

    for (let i of json) {
        (document.getElementsByClassName(`${i["id"]}`)[0]).addEventListener('click', () => {
            deleteItem(source, x, `${i["id"]}`, updButton)
        })
    }
    if (source === stockRealTime) {
        updateOneItem(json, updButton)
    }
}


function updateOneItem(json, updButton) {
    for (let i of json) {
        document.getElementsByClassName(`${i["id"]}`)[1].addEventListener('click', () => {
            add.style.display = 'none';
            updButton.style.display = 'inline';
            theID.value = i["ID"];
            name1.value = i["name"];
            grade.value = i["grade"];
            origin1.value = i["origin"];
            unitPrice.value = i["unitprice"];
            availability.value = i["availability"];
            shipping.value = i["shipping"];
            promotion.value = i["promotion"];
            updButton.onclick = () => {
                updateListStock(`${i["id"]}`);
            }
        })
    }
}