export class HttpService {

    _handleErrors(response) {
        if (!response.ok) throw new Error('Não possível completar a requisição.');
        return response;
    }

    get(url) {
        return fetch(url)
            .then(this._handleErrors)
            .then(response => response.json());
    }

    post(url, data,...headers) {

        const requestConfig = {
            headers: this._setHeaders(new Headers(), headers),
            method: 'post',
            body: data
        }

        return fetch(url, requestConfig)
            .then(this._handleErrors)
            .then(response => response.json());
    }

    _setHeaders(requestHeaders, headers) {
        headers.forEach(header => requestHeaders.append(header.name, header.value));
        return requestHeaders;
    }

    
    /**
     * Changes de type of response, default is Json.
     * @param {string} responseType 
     * @param {string} response The XMLHttpRequest.reponseText attribute
     */
    _changeResponseType(responseType, response) {
        switch (responseType) {
            case 'default':
                return response;
            default:
                return JSON.parse(response);
        }
    }

}