sendCommand();
setInputsValidityListener();

function sendCommand() {
    const addToPanierButton = document.getElementById('sendCommand');
    addToPanierButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (cart.isEmpty()) {
            window.alert('Votre panier est vide !');
        } else if (!checkInputsValidity()) {
            window.alert('Un des champs du formulaire de commande est mal renseigné !');
            
        } else {
            const requestBody = prepareRequestBody();
            const urlToRequest = "http://localhost:3000/api/furniture/order";

            requestApi(urlToRequest, 'POST', requestBody)
            .then((result) => {
                window.open('../html/confirmBuy.html?request='+result)
            })
            .catch((error) => {
                console.log(error);
            })            
        }
    });
}

function setInputsValidityListener() {
    const allInputs = document.querySelectorAll('input');
    allInputs.forEach(singleInput => {
        singleInput.addEventListener('input', () => {
            singleInput.setCustomValidity('');
            singleInput.checkValidity();
        });
        
        singleInput.addEventListener('invalid', () => {
            singleInput.setCustomValidity(`Le champ est mal renseigné !`);
        });
    });
}

function checkInputsValidity() {
    const allInputs = document.querySelectorAll('input');
    for (const singleInput of allInputs) {
        if (!singleInput.validity.valid || singleInput.value === "") {
            return false;
        }
    }
    return true;
}

function prepareContact() {
    const allInputs = document.querySelectorAll('input');
    let contact = {};

    allInputs.forEach(singleInput => {
        const fieldId = singleInput.id;
        contact[fieldId] = singleInput.value;
    });

    return contact;
}

function prepareRequestBody() {
    const products = cart.getAllProductsToCommand();
    const contact = prepareContact();
    let requestBody = {};

    requestBody.products = products;
    requestBody.contact = contact;
    requestBody = JSON.stringify(requestBody);

    return requestBody;
}