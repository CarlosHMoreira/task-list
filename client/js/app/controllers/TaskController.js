class TaskController {

    constructor() {
       this._onInit();
    }

    _onInit() {
        let $ = document.querySelector.bind(document);

        this._inputDate = $('#date');
        this._inputName = $('#name');
        this._inputPriority = $('#priority');

        this._taskList = new Bind(
            new TaskList(), 
            new TaskListView($('#taskView')), 
            'addTask', 'emptiesList'
        );
        
        this._message = new Bind(
            new Message(), 
            new MessageView($('#messageView')), 
            'text'
        );
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

    _updateMessage(text) {
        this._message.text = text;
    }

    addTask(event) {
        event.preventDefault();
        this._taskList.addTask(this._createTask());
        this._updateMessage("Tarefa adicionada com sucesso.");
        this._clearForm();
    }

    emptiesTaskList() {
        this._taskList.emptiesList();
        this._updateMessage('Tarefas removidas com sucesso.');
    }
}