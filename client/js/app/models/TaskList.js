class TaskList {
    constructor(viewRenderer) {
        this._tasks = [];
        this._viewRenderer = viewRenderer;
    }

    get tasks() {
        return [].concat(this._tasks);
    }

    addTask(task) {
        this._tasks.push(task);
        this._viewRenderer(this);
    }

    emptiesList() {
        this._tasks = [];
        this._viewRenderer(this);
    }
}