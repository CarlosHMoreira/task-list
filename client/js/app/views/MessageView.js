class MessageView extends View {

    constructor(viewElement) {
        super(viewElement);
    }

    _template(model) {
        return model.text ? `<p class="alert alert-info">${model.text}</p>` : `<p></p>`;
    }
}