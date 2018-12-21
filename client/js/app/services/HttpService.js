class HttpService {
    get(url, responseType) {
        return new Promise((resolve, reject) => {
            
            let xhr = new XMLHttpRequest();
    
            xhr.open('GET', url);
            
            xhr.onreadystatechange = () => {
                
                if(xhr.readyState === xhr.DONE) {

                    if(xhr.statusText == 'OK') {
                       resolve(this._changeResponseType(responseType, xhr.response));
                    } else {
                        console.error(xhr.response);
                        reject(xhr.response);
                    }  
                }
            }

            xhr.send();
        });
    }

    post(url, data, responseType, ...headers) {
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);

            this._setHeaders(xhr, headers)

            xhr.onreadystatechange = () => {

                if(xhr.readyState === xhr.DONE) {

                    if(xhr.status >= 200 && xhr.status < 300) {
                       resolve(this._changeResponseType(responseType, xhr.response));
                    } else {
                        console.error(xhr.response);
                        reject(xhr.response);
                    }  
                }
            };
            
            xhr.send(JSON.stringify(data));
        });
    }

    _setHeaders(xhr, header) {
        if (!header) return;
        
        if (Array.isArray(header)) {
            header.forEach(item => {
                this._setHeaders(xhr, item);
            });
        } else if (header instanceof Header) {
             xhr.setRequestHeader(header.name, header.value);   
        } else {
            throw new Error('HttpService headers must be a Header class instance or array of it.');
        }
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