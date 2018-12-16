class Task {
    constructor(date, name, priority, done = false, dateFinished = null) {
        this._date = new Date(date);
        this._name = name;
        this._priority = priority;
        this._done = done;
        this._dateFinished = dateFinished;
        Object.freeze(this);
    }

    get date() {
        return new Date(this._date.getTime());
    }

    get name() {
        return this._name;
    }

    get priority() {
        return this._priority;
    }

    get done() {
        return this._done;
    }

    get dateFinished() {
        return this._dateFinished;
    }

    finish() {
        if (this._done) 
            throw new Error('This task has already finished')
        
        this._done = true;
        this._dateFinished = new Date();
    }

}