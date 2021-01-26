function displayPanier() 
{
    let panierSection = document.getElementById('panierSection');
    if (localStorage.getItem('panier') && localStorage.getItem('panier') != "[]") {
        let panier = JSON.parse(localStorage.getItem('panier'));
        
        panierSection.innerHTML += 
        '<h1>Votre panier</h1>'
        +'<br>'
        +'<div class="align-self-end">'
            +'<i class="fas fa-trash-alt align-self-end text-danger"></i>'
        +'</div>'
        +'<ul class="list-group col-md-12 pr-0" id="panierList"></ul>'
        +'<section class="col-md-12 p-0" id="infosPanier"></section>';


        let ulMark = document.getElementById('panierList');
        let sectionMark = document.getElementById('infosPanier');

        let totalProduct = 0;
        let priceSum = 0;
        for (const key in panier) {
            ulMark.innerHTML +=
            '<li class="list-group-item pl-0 d-flex flex-row justify-content-between align-items-center">'
                +'<div>'
                    +'<i class="fas fa-times text-secondary pl-2 mr-3" id="'+ key +'"></i>'
                    +'<span>'+ panier[key].name + ' - <em>' + panier[key].varnish + '<em>'
                +'</div>' 
                +'<span>'+ panier[key].price /100 +'€</span>' 
            +'</li>'
            totalProduct++;
            priceSum += panier[key].price /100;
        }       
        sectionMark.innerHTML += 
        '<p class="col-md-12 p-0 d-flex flex-column align-items-end">'
            +'<span>Nombre total de produits <strong>'+ totalProduct + '</strong></span>'
            +'<span>Prix total des produits <strong>'+ priceSum + '€</strong></span>'
        +'</p>'

    } else {
        panierSection.innerHTML +=
        '<div class="jumbotron">'
            + '<p>Vous n\'avez pas d\'articles dans votre panier !</p>'
        + '</div>';
    }
}

function removeProduct() 
{
    if (typeof panier == undefined) {
        let panier = JSON.parse(localStorage.getItem('panier'));
    } else {
        panier = JSON.parse(localStorage.getItem('panier'));
    }
    let removeCrossArray = document.getElementsByClassName('fa-times');
    for (let i = 0; i < removeCrossArray.length; i++) {
        removeCrossArray[i].addEventListener('click', (function() {
            panier.splice(i, 1);

            panier = JSON.stringify(panier);
            localStorage.setItem('panier', panier);

            window.location.reload();
        }));
    }
}


function removeAllProducts() {
    if (typeof panier == undefined) {
        let panier = JSON.parse(localStorage.getItem('panier'));
    } else {
        panier = JSON.parse(localStorage.getItem('panier'));
    }
    if (panier != null && panier.length > 0) {
        let trashButton = document.getElementsByClassName('fa-trash-alt')[0];
        trashButton.addEventListener('click', (function() {
            localStorage.clear();
            window.location.reload();
        })); 
    }
}