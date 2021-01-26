async function requestOneProduct()
{
    let productId = getParameterByName(window.location.search);
    try {
        let request = await fetch("http://localhost:3000/api/furniture/" + productId)
        return await request.text();
    } catch (error) {
        console.log(error);
    }
}
function displayDetails()
{
    requestOneProduct().then((response) => {
        let section = document.getElementsByTagName('section')[0];

        /* Bloc à remplir */
        let detailsBlock = document.createElement('div');
        detailsBlock.className = 'detailsBlock';
        
        /* Génération des différentes parties */
        let productDetails = generateDetails(response);
        let varnishBlock = generateVarnish(response);
        let button = generateButton();
        
        /* On ajoute les différentes parties au bloc de détail */
        detailsBlock.append(productDetails);
        detailsBlock.append(varnishBlock);
        detailsBlock.append(button);
        
        
        addToPanier(button, response);
        return section.append(detailsBlock);
    });
}

function generateButton()
{
    let button = document.createElement('button');

    button.id = 'addToPanier';
    button.className = 'btn btn-primary col-md-12';
    button.setAttribute('type', 'button');
    button.textContent = 'Ajouter au panier';

    return button;
}

function generateDetails(response)
{
    response = JSON.parse(response);
    let productDetailsDiv = document.createElement('div');
    productDetailsDiv.className = 'card mb-3';
    

    productDetailsDiv.innerHTML += 
    '<div class="row no-gutters">'
        +'<div class="col-md-4 overflow-hidden" style="height:200px;">' // TODO mettre le style dans un fichier css à part
            +'<img src="'+response.imageUrl+'" class="card-img w-100" alt="...">'
        +'</div>'
        +'<div class="col-md-8">'
            +'<div class="card-body">'
                +'<h5 class="card-title d-flex justify-content-between">'
                    +'<span id='+response._id+'>'
                        +'<strong>'+response.name+'</strong>'
                    +'</span>'
                    +'<span>'+response.price / 100+'€</span>'
                +'</h5>'
                +'<p class="card-text">'+response.description+'</p>'
            +'</div>'
        +'</div>'
    +'</div>'
    
    return productDetailsDiv;
}

function generateVarnish(response) 
{
    response = JSON.parse(response);
    /* Création du jumbotron qui va etre retourné */
    const jumbotron = document.createElement('div');
    jumbotron.className ='jumbotron col-md-12 no-gutters';
    jumbotron.innerHTML = '<p class="col-md-12">Choix du coloris :</p>'
    
    /* création de la div qui va contenir le select */
    const varnishBlock = document.createElement('div');
    varnishBlock.className = 'input-group col-md-12';
    varnishBlock.id = 'varnish-block';

    /* Création du select qui va contenir les différentes options */
    const selectVarnish = document.createElement('select');
    selectVarnish.className = 'custom-select';
    selectVarnish.id = 'select-varnish';

    /* Boucle créant les options dans le select */
    for (const varnish of response.varnish) {
        selectVarnish.innerHTML += '<option id="'+varnish+'" value="'+varnish+'">'+varnish+'</option>'
    }

    /* On rempli la div avec le select puis le jumbotron avec la div */
    varnishBlock.append(selectVarnish);
    jumbotron.append(varnishBlock);

    return jumbotron;
}

function getParameterByName(parametersString) 
{
    /* Regex match ce qui est précédé par ?id= et suivi par un espace||retourLigne||tabulation ou rien */
    const productId = parametersString.match(/(?<=\?id=)\w+(?=\s?)/)[0];
    return productId;
}

function addToPanier(button, response) // button = élément sur lequel fixer l'eventListener
{
    button.addEventListener('click', () => {
        let panier = [];
        clientProduct = JSON.parse(response);
        /* On vérifie si une couleur est bien choisie, si oui on la récupère puis on créé le panier */
        clientProduct.varnish = document.getElementById('select-varnish').value;
        /* Vérification si panier déjà existant */
        if (localStorage.getItem('panier')) {
            panier = JSON.parse(localStorage.getItem('panier'));
        }
        panier.push(clientProduct);
        panier = JSON.stringify(panier);
        
        return localStorage.setItem('panier', panier);
    });
}