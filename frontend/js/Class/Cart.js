class Cart {
    constructor() {
        this.productsInCart = [];
        this.productCount = 0;
        this.totalAmout = 0;
        this.humanReadableTotalAmout = 0;
    }

    fillCartWithStorage() {
         if (localStorage.getItem('cart')) { 
            let storagedProducts = localStorage.getItem('cart');
            storagedProducts = JSON.parse(storagedProducts);
           
            this.productsInCart = storagedProducts.productsInCart;
            this.productCount = this.productsInCart.length;
            this.totalAmout = this.calculateTotalAmout(this.productsInCart);
            this.humanReadableTotalAmout = this.totalAmout / 100;
        }
    }

    calculateTotalAmout(productsInCart) { 
        let totalAmout = 0;
        productsInCart.map((oneProduct) => {
            totalAmout += oneProduct.price;
        });
        
        return totalAmout;
    } 

    addProduct(productToAdd) {
        this.productsInCart.push(productToAdd);
        this.productCount++;
        this.totalAmout += productToAdd.price;
        this.humanReadableTotalAmout = this.totalAmout / 100;
    }

    removeOneProduct(cartId) {
        const productsInCart = this.productsInCart;

        let key = 0;
        while (productsInCart[key].cartId != cartId) {
            key++;
        }
        const productToDelete = productsInCart.splice(key, 1);
        this.productsInCart = productsInCart;
        
        this.productCount--;
        this.totalAmout -= productToDelete.price;
        this.humanReadableTotalAmout = this.totalAmout / 100;

        this.goToLocalStorage();
        window.location.reload();
    }

    removeAllProducts() {
        localStorage.removeItem('cart');
        window.location.reload();
    }

    getAllProductsToCommand() {
        const allProducts = [];
        this.productsInCart.forEach(oneProduct => {
            allProducts.push(oneProduct._id);
        }); 
        return allProducts;
    }

    goToLocalStorage() {
        const stringifiedCart = JSON.stringify(this);
        localStorage.setItem('cart', stringifiedCart);
    }
    
    generateCart() {
        const cartBlock = document.createElement('section');
        cartBlock.classList.add('container-fluid', 'd-flex', 'flex-column', 'align-items-center');
        cartBlock.id = 'panierSection';
        
        if (!this.productCount || this.productCount === 0) {
            cartBlock.innerHTML = '<p class="jumbotron col-md-12">Vous n\'avez pas d\'articles dans votre panier !</p>';
        } else {
            let allProductsInCart = this.productsInCart.map((oneProduct) => {
                oneProduct = new Product(oneProduct);
                return oneProduct.generateCartBlock().outerHTML;
            });
            allProductsInCart = allProductsInCart.join('');

            cartBlock.innerHTML = `<h1>Votre panier</h1>
                                    <div class="align-self-end">
                                        <i class="fas fa-trash-alt align-self-end text-danger" id="bin"></i>
                                    </div>
                                    <ul class="list-group col-md-12 pr-0" id="panierList">
                                        ${allProductsInCart}
                                    </ul>
                                    <div class="col-md-12 p-0" id="infosPanier">
                                        <p class="col-md-12 p-0 d-flex flex-column align-items-end">
                                            <span>Nombre total de produits <strong>${this.productCount}</strong></span>
                                            <span>Prix total des produits <strong>${this.humanReadableTotalAmout}€</strong></span>
                                        </p>
                                    </div>`
        }
        return cartBlock;
    }

    isEmpty() {
        if (Object.keys(this).length === 0) {
            return true;
        } else {
            return false;
        }
    }
}