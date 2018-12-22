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
        return this._http.post('/tarefas', newTask, new Header('Content-type', 'application/json'))
            .then(response => { 
                return new Task(new Date(response._date), response._name, response._priority, response._done)
            })
            
            .catch(error => {
                const errorParsed = JSON.parse(error);
                throw new Erro(errorParsed);
            });
    }

    emptiesListFromIDB() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new TaskDAO(connection))
            .then(dao => dao.emptiesList());
    }
    
    getTasksFromIDB() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new TaskDAO(connection))
            .then(dao => dao.listTaks());
    }

    addTaskInIDB(task) {
        return ConnectionFactory
            .getConnection()
            .then(connection => new TaskDAO(connection))
            .then(dao => dao.addTask(task));
    }
}