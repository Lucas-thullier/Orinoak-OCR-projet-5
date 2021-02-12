const cart = new Cart();
cart.fillCartWithStorage();
displayCart();

function displayCart() {
    const navBar = document.getElementsByTagName('nav')[0];
    navBar.after(cart.generateCart());

    setDeleteCrossListeners();
    setDeleteBinListener();
}

function setDeleteCrossListeners() {
    if (document.querySelectorAll('.deleteCross')) {
        const deleteCrosses = document.querySelectorAll('.deleteCross');
    
        deleteCrosses.forEach((actualCross) => {
            actualCross.addEventListener('click', (clickEvent) => {
                cart.removeOneProduct(actualCross.id);
            });
        })
    }
}

function setDeleteBinListener() {
    if (document.getElementById('bin')) {
        const deleteBin = document.getElementById('bin');
        deleteBin.addEventListener('click', () => {
            cart.removeAllProducts();
        });
    }
}