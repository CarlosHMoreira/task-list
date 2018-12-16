class View {

    constructor(viewElement) {
        this._viewElement = viewElement;
    }

    update(model) {

        this._viewElement.innerHTML = this.template(model);
    }

    template() { 
        throw new Error('Method template should be implemented');
    }
}