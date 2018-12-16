class TaskListView {

    constructor (viewElement) {
        this._viewElement = viewElement;
    }

    _template(model) {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Nome</th>
                    <th>Prioridade</th>
                    <th>Feita</th>
                </tr>
            </thead>
            
            <tbody>
                ${model.tasks.map(task => `
                    <tr>
                        <td>${DateHelper.dateToString(task.date)}</td>
                        <td>${task.name}</td>
                        <td>${PriorityEnum[task.priority]}</td>
                        <td>${task.done ? `Sim` : '<span class="text-danger">Não<span>'}</td>
                    </tr>
                `).join('')}
            </tbody>
            
            <tfoot>
                <td colspan="3"></td>
                <td>${model.tasks.reduce((count, task) => task.done ? ++count : count, 0)}</td>
            </tfoot>
        </table>
        `;
    }

    update(model) {
        this._viewElement.innerHTML = this._template(model);
    }
}