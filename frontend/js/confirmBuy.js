function getParameterByName(parametersString) 
{
    /* Regex match ce qui est précédé par ?request= */
    let productId = decodeURI(parametersString).match(/(?<=\?request=).+/)[0];
    return productId;
}

function displayRecap()
{
    let request = getParameterByName(window.location.search);
    request = JSON.parse(request);
    
    let sumCommand = 0;
    request.products.forEach(object => {
        sumCommand += object.price / 100;
    });

    let section = document.getElementsByTagName('section')[0];
    section.innerHTML =
        '<h1>Merci pour vos achats !</h1>'
        +'<p class="row">Votre numéro de commande : <strong> '+ request.orderId +'</strong>'
        +'<p class="row">Le montant total de vos achats s\'élève à <strong> '+ sumCommand +' €</strong></p>';
    localStorage.clear();
}