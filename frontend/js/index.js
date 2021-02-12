displayProductsList();

function displayProductsList() {
    requestApi("http://localhost:3000/api/furniture")
    .then((allProductsString) => {
        generateProductsList(allProductsString);
    })
    .catch((error) => {
        console.log(error);
    });
}

function generateProductsList(allProductsString) {
    const allProductsParsed = JSON.parse(allProductsString);
    const listSection = document.getElementById('productsList');
    
    for (const key in allProductsParsed) {
        const product = new Product(allProductsParsed[key]);
        listSection.append(product.generatelistBlock());
    }
}