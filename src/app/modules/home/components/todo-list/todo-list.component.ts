import { Component, DoCheck } from '@angular/core';
import { TaskList } from '../../pages/home/model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements DoCheck {
  ngDoCheck(): void {
    this.setLocalStorage();
  }
  public taskList: TaskList[] = JSON.parse(
    localStorage.getItem('list') || '[]'
  );

  public deleteItemTaskList(event: number) {
    this.taskList.splice(event, 1);
  }

  public setEmit(event: string) {
    this.taskList.push({ task: event, checked: false });
  }

  public deleAllTaskList() {
    const confirm = window.confirm('Você realmente deseja deletar tudo?');
    if (confirm) {
      this.taskList = [];
    }
  }

  public validationInput(event: string, index: number) {
    if (!event.length) {
      const confirm = window.confirm('Task está vazia, deseja deletar?');

      if (confirm) {
        this.deleteItemTaskList(index);
      }
    }
  }

  public setLocalStorage() {
    if (this.taskList) {
      this.taskList.sort(
        (first, last) => Number(first.checked) - Number(last.checked)
      );
      localStorage.setItem('list', JSON.stringify(this.taskList));
    }
  }
}
