function generateList(response) 
{
    let jsonApi = JSON.parse(response);
    let listBlock = document.createElement('div');
    listBlock.className = 'productsList';
    
    for (const key in jsonApi) {
        listBlock.innerHTML += 
        '<div class="card mb-3">'
            +'<div class="row no-gutters">'
                +'<div class="col-md-4 overflow-hidden" style="height:200px;">' // TODO mettre le style dans un fichier css à part
                    +'<img src="'+jsonApi[key].imageUrl+'" class="card-img w-100" alt="...">'
                +'</div>'
                +'<div class="col-md-8">'
                    +'<div class="card-body">'
                        +'<h5 class="card-title">'
                            +'<a href="details.html?id='+jsonApi[key]._id+'" class=" aMark stretched-link">'
                                +jsonApi[key].name
                            +'</a>'
                        +'</h5>'
                        +'<p class="card-text">'+jsonApi[key].description+'</p>'
                    +'</div>'
                +'</div>'
            +'</div>'
        +'</div>'
    }
    return listBlock;
}

// function displayList() 
// {
//     // obligés de s'imbriquer à chauqe fois qu'une requete est effectuée?
//     let request = fetch("http://localhost:3000/api/furniture");
//     request.then(response => {
//         let productsList = generateList(response);
//         let section = document.getElementsByTagName('section')[0];
//         return section.append(productsList);
//     })
//     .catch(error => { console.log(error) });
// }