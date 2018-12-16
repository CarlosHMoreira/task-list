class TaskController {

    constructor() {
        
        let $ = document.querySelector.bind(document);

        this._inputDate = $('#date');
        this._inputName = $('#name');
        this._inputPriority = $('#priority');

        this._taskList = new TaskList();
        this._taskView = new TaskListView($('#taskView'));

        this._taskView.update(this._taskList);
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

    adiciona(event) {
        event.preventDefault();
        this._taskList.addTask(this._createTask());
        this._taskView.update(this._taskList);
        this._clearForm();
    }
}