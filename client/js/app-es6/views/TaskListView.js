import { View } from './View'
import { PriorityEnum } from '../enums/PriorityEnum'

export class TaskListView extends View {

    template(model) {
        return `
        <table class="table table-hover table-bordered task-list">
            <thead>
                <tr class="task-list__headers-row">
                    <th onclick="taskController.orderColumn('date')">Data</th>
                    <th onclick="taskController.orderColumn('name')">Nome</th>
                    <th onclick="taskController.orderColumn('priority')">Prioridade</th>
                    <th onclick="taskController.orderColumn('done')">Feita</th>
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
                <td>${model.totalFinished()}</td>
            </tfoot>
        </table>
        `;
    }
}