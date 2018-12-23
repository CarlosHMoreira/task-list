export class TaskDAO {

    constructor(connection) {
        this._connection = connection;
        this._store = 'task-store';
    }


    addTask(task) {
        return new Promise((resolve, reject) => {

            const request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(task);

            request.onsuccess = event => {
                resolve()
            }

            request.onerror = event => {
                console.error(event.target.error);
                reject('Ops, something wrong that isn\'t right happen');
            }
        });
    }

    listTaks() {
        return new Promise((resolve, reject) => {

            const taskList = new TaskList();
            
            const cursor = this._connection
                .transaction([this._store], 'readonly')
                .objectStore(this._store)
                .openCursor();
            
            cursor.onsuccess = event => {
                const cursorPosition = event.target.result;

                if (cursorPosition) {
                    const data = cursorPosition.value;
                    const task = new Task(data._date, data._name, data._priority, data._done, data._dateFinished);
                    taskList.addTask(task);
                    cursorPosition.continue();
                } else {
                    resolve(taskList)
                }
            }

            cursor.onerror = event => {
                console.error(event.target.error);
                reject('Ops, something wrong that isn\'t right happen');
            }
        });
    }

    emptiesList() {
        return new Promise((resolve, reject) => {
            const request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();
            
            request.onsuccess = event => resolve('Tasks removed');

            request.onerror = event => {
                console.log(event.target.error);
                reject('Error when trying to remove tasks from IDB');
            };
        });
    }
}