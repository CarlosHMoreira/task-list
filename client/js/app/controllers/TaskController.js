class TaskController {

    constructor() {
        
        let $ = document.querySelector.bind(document);

        this._inputDate = $('#date');
        this._inputName = $('#name');
        this._inputPriority = $('#priority');

        this._taskList = new TaskList();
        this._taskView = new TaskListView($('#taskView'));
        
        this._message = new Message();
        this._messageView = new MessageView($('#messageView'));

        this._taskView.update(this._taskList);
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
        this._messageView.update(this._message);
    }

    addTask(event) {
        event.preventDefault();
        this._taskList.addTask(this._createTask());
        this._taskView.update(this._taskList);
        this._updateMessage("Tarefa adicionada com sucesso.");
        this._clearForm();
    }



}