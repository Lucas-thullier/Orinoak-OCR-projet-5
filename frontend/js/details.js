displayDetails();

function displayDetails()
{
    requestOneProduct()
    .then((oneProductString) => {
        const detailsSection = document.getElementById('detailsSection');
        console.log();

        /* Génération des différentes parties */
        const oneProductParsed = JSON.parse(oneProductString);
        const product = new Product(oneProductParsed);    

        const productDetailsBlock = product.detailDisplay();
        const varnishBlock = product.varnishSelectorDisplay();
        const button = generateButton();
        
        /* On ajoute les différentes parties au bloc de détail */
        detailsSection.append(productDetailsBlock);
        detailsSection.append(varnishBlock);
        detailsSection.append(button);
        
        addToPanier(button, product);
    })
    .catch((error) => {
        console.log(error);
    });
}

function requestOneProduct() 
{
    const productId = getProductIdByUrl(window.location.href);
    const urlToRequestOneProduct = `http://localhost:3000/api/furniture/${productId}`
    return requestApi(urlToRequestOneProduct)
}

function getProductIdByUrl(locationHref) 
{
    const parsedUrl = new URL(locationHref);
    const productId = parsedUrl.searchParams.get('id');
    return productId;
}

function generateButton()
{
    const button = document.createElement('button');

    button.id = 'addToPanier';
    button.className = 'btn btn-primary col-md-12';
    button.setAttribute('type', 'button');
    button.textContent = 'Ajouter au panier';

    return button;
}

function addToPanier(button, product) // button = élément sur lequel fixer l'eventListener
{
    button.addEventListener('click', () => {
        const cart = new Cart();
        product.varnish = document.getElementById('select-varnish').value;
        cart.addProduct(product);
        cart.goToLocalStorage();
    });
}