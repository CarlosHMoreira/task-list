class TaskService {

    constructor() {
        this._http = new HttpService();
    }

    importTasks() {
        return this._http.get('tarefas').then(response => {
            const taskList = 
                response
                    .map(task => new Task(new Date(task.date), task.name, task.priority, task.done));

                return taskList;
        })
        .catch(error => {
            const errorParsed = JSON.parse(error);
            throw new Erro(errorParsed);
        });
    }

    addTask(newTask) {

        return this._http.post('/tarefas', newTask, false, new Header('Content-type', 'application/json'))
            .then(response => new Task(new Date(response.date), response.name, response.priority, response.done))
            .catch(error => {
                const errorParsed = JSON.parse(error);
                throw new Erro(errorParsed);
            });
    }
}