class Message {

    constructor(text) {

        this._text = text || ''; //Using this way for the compatibility with olders brownser to default params
    }

    get text() {
        return this._text;
    }

    set text(text) {
        this._text = text;
    }
}