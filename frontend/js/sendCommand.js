function sendCommand()
{
    addToPanierButton = document.getElementById('addToPanier');
    addToPanierButton.addEventListener('click', (e) => {
        e.preventDefault();

        /* construction de l'array products à partir du panier */
        if (localStorage.getItem('panier') !== null) {
            let panier = localStorage.getItem('panier');
            panier = JSON.parse(panier);
            
            let products = [];
            let contact = {};
            let request = {};
    
            for (const i in panier) {
                products.push(panier[i]._id);
            }
            /* FIN construction de l'array products à partir du panier */
    
            /* Vérification des champs du formulaire */
            if (isValidName('prenom') && isValidName('nom') && isValidAdress() && isValidCity() && isValidEmail()) {
                contact.firstName = document.getElementById('prenom').value;
                contact.lastName = document.getElementById('nom').value;
                contact.address = document.getElementById('adresse').value;
                contact.city = document.getElementById('ville').value;
                contact.email = document.getElementById('email').value;
    
                request.products = products;
                request.contact = contact;
                request = JSON.stringify(request);
    
                var requestOptions = {
                    method: 'POST',
                    body: request,
                    headers : {
                        'Content-Type': 'application/json'
                    }
                };
                  
                /* TODO check le statut avecresponse.ok et ouvrir la page via localstorage et non window.open */
                fetch("http://localhost:3000/api/furniture/order", requestOptions)
                .then(response => response.text())
                .then(result => window.open('../html/confirmBuy.html?request='+result))
                .catch(error => console.log('error', error));
    
            } else {
                alert('Un des champs est mal renseigné');
            }
        } else {
            alert('Votre panier est vide');
        }
    });
}
const form = document.querySelector('form[id="buyingForm"]');

function isValidField(fieldId, stringRegex)
{
    const inputField = document.querySelector('input[id='+ fieldId +']');
    inputField.setAttribute('pattern', stringRegex);
    inputField.addEventListener('input', () => {
        inputField.setCustomValidity('');
        inputField.checkValidity();
    });
    
    inputField.addEventListener('invalid', () => {
        if(inputField.value === '') {
            inputField.setCustomValidity('Enter your username!');
        } else {
            inputField.setCustomValidity('Un prénom ne peut contenir que des lettres minuscules ou majuscules. Essayez encore !');
        }
    });

}
isValidField(fieldId, stringRegex);
isValidField(fieldId, stringRegex);
isValidField(fieldId, stringRegex);
isValidField(fieldId, stringRegex);
// function checkAllFieldValidity


// function isValidName(firstOrLastName)
// {
//     let name  = document.getElementById(firstOrLastName);
//     let nameValue = name.value.trim();

//     if (nameValue.match(/^[éèùêçàa-zA-Z-]{2,40}$/)) {
//         return true;
//     } else {
//         name.classList.add('bg-danger');
//         return false;
//     }
// }

// function isValidAdress()
// {
//     let adress  = document.getElementById('adresse');
//     let adressValue = adress.value.trim();
    
//     if (adressValue.match(/^[\séèùêçàa-zA-Z\d'-]{1,70}$/)) {
//         return true;
//     } else {
//         adress.classList.add('bg-danger');
//         return false;
//     }
// }

// function isValidCity()
// {
//     let city  = document.getElementById('ville');
//     let cityValue = city.value.trim();

//     if (cityValue.match(/^[éèùêçàa-zA-Z-]{2,40}$/)) {
//         return true;
//     } else {
//         city.classList.add('bg-danger');
//         return false;
//     }
// }

// function isValidEmail()
// {
//     let email  = document.getElementById('email');
//     let emailValue = email.value.trim();

//     if (emailValue.match(/^(?:[\w-]{1,20}@[\w-]{1,20}.[\w-]{1,5})$/)) {
//         return true;
//     } else {
//         email.classList.add('bg-danger');
//         return false;
//     }
// }