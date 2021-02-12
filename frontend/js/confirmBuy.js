displayRecap();

function displayRecap() {
    let requestParameter = getOneUrlParameter('request');
    requestParameter = JSON.parse(requestParameter);
        
    const navBar = document.getElementsByTagName('nav')[0];
    const recapBlock = generateRecap(requestParameter);
    navBar.after(recapBlock);
    
    localStorage.clear();
}

function generateRecap(requestParameter) {
    const sumCommand = calculateSumCommand(requestParameter);
    const orderId = requestParameter.orderId;
    const recapBlock = document.createElement('div');

    recapBlock.innerHTML = `<section class="container jumbotron text-center">
                                <h1>Merci pour vos achats !</h1>
                                <p class="row">Votre numéro de commande : <strong> ${orderId} </strong></p>
                                <p class="row">Le montant total de vos achats s\'élève à <strong> ${sumCommand}€</strong></p>
                            </section>`

    return recapBlock;
}

function calculateSumCommand(requestParameter) {
    let sumCommand = 0;
    requestParameter.products.forEach(singleProduct => {
        sumCommand += singleProduct.price / 100;
    });
    return sumCommand;
}