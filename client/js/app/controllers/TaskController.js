class TaskController {

    constructor() {
       this._onInit();
    }

    _onInit() {
        let $ = document.querySelector.bind(document);

        this._inputDate = $('#date');
        this._inputName = $('#name');
        this._inputPriority = $('#priority');

        this._taskListView = new TaskListView($('#taskView'));
        this._taskList = new Bind(
            new TaskList(), 
            this._taskListView, 
            ['addTask', 'emptiesList']
        );
        // ProxyFactory.create(
        //     new TaskList(), 
        //     ['addTask', 'emptiesList'],
        //     model => this._taskListView.update(model)
        // ); 
        
        this._messageView = new MessageView($('#messageView'));
        this._message = new Bind(
            new Message(), 
            this._messageView, 
            ['text']
        );
        
        // ProxyFactory.create(
        //     new Message(),
        //     ['text'] ,
        //     model => this._messageView.update(model)
        // );

        this._taskListView.update(this._taskList);
        this._messageView.update(this._message);
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