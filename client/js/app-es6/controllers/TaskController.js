const $ = document.querySelector.bind(document);

import { Message, Task, TaskList } from '../models';
import { MessageView, TaskListView } from '../views'
import { TaskService } from '../services';
import { Bind, DateHelper } from '../helpers';

class TaskController {

    constructor() {

        this._inputDate = $('#date');
        this._inputName = $('#name');
        this._inputPriority = $('#priority');

       this._onInit();
    }

    _onInit() {
        this._taskList = new Bind(
            new TaskList(), 
            new TaskListView($('#taskView')), 
            'addTask', 'emptiesList', 'orderColumn'
        );
        
        this._message = new Bind(
            new Message(), 
            new MessageView($('#messageView')), 
            'text'
        );

        this._service = new TaskService();
        this._service
            .getTasksFromIDB()
            .then(taskList => taskList.tasks.forEach(task => this._taskList.addTask(task)))
            .catch(error => {
                console.log(error);
                this._updateMessage('Something went wrong...');
            });
    }

    
    
    _createTask() {
        return new Task(
            DateHelper.stringToDate(this._inputDate.value),
            this._inputName.value,
            this._inputPriority.value
        );
    }
        
    _clearForm() {
        this._inputDate.value = '';
        this._inputName.value = '';
        this._inputPriority.value = 0;
        
        this._inputDate.focus();
    }
    
    _updateMessage(text='') {
        this._message.text = text;
        setTimeout(() => {
            this._updateMessage();
        }, 3000);
    }
    
    addTask(event) {
        event.preventDefault();
        // Using try-catch because DateHelper may throw exception
        try {
            this._service
                .addTask(this._createTask())
                .then( taskCreated => {
                    this._taskList.addTask(taskCreated);
                    this._service
                        .addTaskInIDB(taskCreated)
                        .catch(errorMessage => Promise.reject(errorMessage));
                    this._clearForm();
                    this._updateMessage("Tarefa adicionada com sucesso.");
                })
                .catch(error => this._updateMessage(error));
        } catch(error) {
            this._updateMessage(error);
        }
    }
    
    /**
     * @todo Maybe erase tasks from db too
     */
    emptiesTaskList() {
        this._service
            .emptiesListFromIDB()
            .then(sucessMessage => {
                this._taskList.emptiesList();
                this._updateMessage('Tarefas removidas com sucesso.');
            })
            .catch(errorMessage => this._updateMessage(errorMessage));;
    }
    
    importTasks() {
        this._service.importTasks().then(tasks => {
            
            tasks.forEach(task => this._taskList.addTask(task));
            this._updateMessage('Tarefas importadas com sucesso');
        })
        .catch(error => this._updateMessage(error));
    }
    
    orderColumn(columnName) {
        this._taskList.orderColumn((a, b) => a[columnName] - b[columnName]);
    }
}