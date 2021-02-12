class Product {
    constructor(productObj) {
        this.varnish = productObj.varnish;
        this._id = productObj._id;
        this.name = productObj.name;
        this.price = productObj.price;
        this.humanReadablePrice = productObj.price / 100;
        this.description = productObj.description;
        this.imageUrl = productObj.imageUrl;
        this.cartId = productObj.cartId ? productObj.cartId : null;
    }

    setChosenVarnish(chosenVarnish) {
        this.varnish = chosenVarnish;
    }

    setCartId() {
        this.cartId = Date.now();
    }

    generatelistBlock() {
        const listBlock = document.createElement('div');
        listBlock.classList.add('card', 'mb-3');

        listBlock.innerHTML = `<div class="row no-gutters">
                                    <div class="col-md-4 overflow-hidden" style="height:200px;">
                                        <img src="${this.imageUrl}" class="card-img w-100" alt="...">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title">
                                                <a href="details.html?id=${this._id}" class=" aMark stretched-link">
                                                    ${this.name}
                                                </a>
                                            </h5>
                                            <p class="card-text">${this.description}</p>
                                        </div>
                                    </div>
                                </div>`;

        return listBlock                    
    }

    
    generateDetailBlock() {
        const detailBlock = document.createElement('div');
        detailBlock.classList.add('card', 'mb-3');

        detailBlock.innerHTML = `<div class="row no-gutters>">
                                    <div class="col-md-4 overflow-hidden" style="height:200px;">
                                        <img src="${this.imageUrl}" class="card-img w-100" alt="..." />
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title d-flex justify-content-between">
                                                <span id="${this._id}">
                                                    <strong>${this.name}</strong>
                                                </span>
                                                <span>${this.humanReadablePrice}€</span>
                                            </h5>
                                            <p class="card-text">${this.description}</p>
                                        </div>
                                    </div>
                                </div>`;

        return detailBlock;
    }

    generateVarnishBlock() {
        const varnishSelectorBlock = document.createElement('div');
        varnishSelectorBlock.classList.add('jumbotron', 'col-md-12', 'no-gutters');

        const optionGenerator = this.varnish.map((oneVarnish) => {
            return `<option id="${oneVarnish}" value="${oneVarnish}">${oneVarnish}</option>`;
        })

        varnishSelectorBlock.innerHTML =   `<p class="col-md-12">Choix du coloris :</p>
                                            <div class="input-group col-md-12" id="varnish-block">
                                                <select class="custom-select" id="select-varnish">
                                                    ${optionGenerator}
                                                </select>
                                            </div>`;

        return varnishSelectorBlock;
    }
    

    generateCartBlock() {
        const cartBlock = document.createElement('li');
        cartBlock.classList.add('list-group-item', 'pl-0', 'd-flex', 'flex-row', 'justify-content-between', 'align-items-center');

        cartBlock.innerHTML =  `<div>
                                    <i class="fas fa-times text-secondary pl-2 mr-3 deleteCross" id="${this.cartId}"></i>
                                    <span>${this.name} - <em>${this.varnish}</em> </span>
                                </div>
                                <span>${this.humanReadablePrice}€</span>`;
        return cartBlock;
    }
}