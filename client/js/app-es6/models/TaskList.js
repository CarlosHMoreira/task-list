export class TaskList {
    constructor() {
        this._tasks = [];
    }

    get tasks() {
        return [].concat(this._tasks);
    }

    addTask(task) {
        this._tasks.push(task);
    }

    emptiesList() {
        this._tasks = [];
    }

    totalFinished() {
        return this._tasks.reduce((count, task) => task.done ? ++count : count, 0)
    }

    orderColumn(criteria) {
        this._tasks.sort(criteria);
    }
}