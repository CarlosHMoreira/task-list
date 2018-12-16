class TaskList {
    constructor() {
        this._tasks = [];
    }

    get tasks() {
        return [].concat(this._tasks);
    }

    addTask(task) {
        
        this._tasks.push(task);
    }
}