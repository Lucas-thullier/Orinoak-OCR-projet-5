displayProductsList();

function displayProductsList() 
{
    requestAllProducts()
    .then((allProductsString) => {
        generateProductsList(allProductsString);
    })
    .catch((error) => {
        console.log(error);
    });
}

function requestAllProducts() 
{
    const urlToRequestAllProducts = "http://localhost:3000/api/furniture";
    return requestApi(urlToRequestAllProducts);
}

function generateProductsList(allProductsString) {
    const allProductsParsed = JSON.parse(allProductsString);
    const listSection = document.getElementById('productsList');
    
    for (const key in allProductsParsed) {
        const product = new Product(allProductsParsed[key]);
        listSection.append(product.listDisplay());
    }
}