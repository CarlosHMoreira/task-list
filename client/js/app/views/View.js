class View {

    constructor (viewElement) {
        this._viewElement = viewElement;
    }

    update(model) {

        this._viewElement.innerHTML = this._template(model);
    }
}