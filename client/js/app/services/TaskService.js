class TaskService {

    importTasks(callback) {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', 'tarefas');

        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {

                if(xhr.status == 200) {
                    const taskList = JSON.parse(xhr.responseText)
                        .map(task => new Task(new Date(task.date), task.name, task.priority, task.done));
                    
                    callback(null, taskList);
                } else {
                    console.error(xhr.responseText);
                    cb('Não foi possível obter as tarefas', null);
                }  
            }
        }
        xhr.send();
    }

    addTask(newTask, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/tarefas", true);
        xhr.setRequestHeader("Content-type", "application/json");

        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    const response = JSON.parse(xhr.responseText);
                    const task = new Task(new Date(response.date), response.name, response.priority, response.done);
                    callback(null, task);
                } else {
                    callback('Não foi possível criar a tarefa', xhr.responseText);
                }
            }
        }
        xhr.send(JSON.stringify(newTask));
    }
}