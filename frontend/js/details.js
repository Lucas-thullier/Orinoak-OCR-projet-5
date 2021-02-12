displayDetails();

function displayDetails() {
    const productId = getOneUrlParameter('id');
    requestApi(`http://localhost:3000/api/furniture/${productId}`)
    .then((oneProductString) => {
        const oneProductParsed = JSON.parse(oneProductString);
        const product = new Product(oneProductParsed);    
        const detailsSection = document.getElementById('detailsSection');

        const productDetailsBlock = product.generateDetailBlock();
        const varnishBlock = product.generateVarnishBlock();
        const button = generateButton();
        
        detailsSection.append(productDetailsBlock);
        detailsSection.append(varnishBlock);
        detailsSection.append(button);
        
        addedProductFeedback();
        setToCartListener(button, product);
    })
    .catch((error) => {
        console.log(error);
    });
}

function generateButton() {
    const button = document.createElement('button');

    button.id = 'addToPanier';
    button.className = 'btn btn-primary col-md-12';
    button.setAttribute('type', 'button');
    button.textContent = 'Ajouter au panier';

    return button;
}

function setToCartListener(button, product) {
    button.addEventListener('click', () => {
        const cart = new Cart();
        product.varnish = document.getElementById('select-varnish').value;
        product.setCartId();

        cart.fillCartWithStorage();
        cart.addProduct(product);
        cart.goToLocalStorage();
    });
}

function addedProductFeedback() {
    const buttonBlock = document.getElementById('addToPanier');

    buttonBlock.addEventListener('click', () => {
        buttonBlock.classList.remove('btn-primary');
        buttonBlock.classList.add('btn-success');
        buttonBlock.innerHTML = 'Produit ajouté au panier';
        setTimeout(() => {
            buttonBlock.classList.remove('btn-success');
            buttonBlock.classList.add('btn-primary');
            buttonBlock.innerHTML = 'Ajouter au panier';
        }, 1000)
    });
}