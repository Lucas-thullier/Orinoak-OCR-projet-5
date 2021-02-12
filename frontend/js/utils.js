function requestApi(urlToRequest, getOrPost = 'GET', requestBody = null) {
    let requestOptions = {
        method: getOrPost,
    };
    if (getOrPost === 'POST') {
        requestOptions.body = requestBody;
        requestOptions.headers = {
            'Content-Type': 'application/json'
        }
    }

    return fetch(urlToRequest, requestOptions)
    .then((response) => {
        const textPromise = response.text();
        return textPromise;
    })
    .catch((error) => {
        console.log(error);
    });
}

function getOneUrlParameter(parameterToGet) {
    const parsedUrl = new URL(window.location.href);
    const wantedParameter = parsedUrl.searchParams.get(parameterToGet);
    return wantedParameter;
}