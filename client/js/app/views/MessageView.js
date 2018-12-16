class MessageView {
    
    constructor (viewElement) {
        this._viewElement = viewElement;
    }

    _template(model) {
        return model.text ? `<p class="alert alert-info">${model.text}</p>` : `<p></p>`;
    }

    update(model) {
        this._viewElement.innerHTML = this._template(model);
    }
}