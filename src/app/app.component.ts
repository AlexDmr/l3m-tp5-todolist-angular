import { Component } from '@angular/core';
import {TodoService} from './todo.service';
import {TodoItem, TodoList} from './definitions';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private tds: TodoService) {
  }

  get todoListObs(): Observable<TodoList> {
    return this.tds.observable;
  }

  get toutEstFait(): boolean {
    return this.tds.getCurrentTodoList().items.find(
      item => !item.isDone
    ) === undefined;
  }

  ToutFaireOuDefaire() {
    const isDone = !this.toutEstFait;
    this.tds.updateIsDone(isDone, ...this.tds.getCurrentTodoList().items);
  }

  append(label: string) {
    this.tds.append(label);
  }

  trackByIndex(index: number, ref: TodoItem) {
    return index;
  }

  updateItemLabel(item: TodoItem, label: string) {
    this.tds.updateLabel(label, item);
  }

  updateItemDone(item: TodoItem, isDone: boolean) {
    this.tds.updateIsDone(isDone, item);
  }

  deleteItem(item: TodoItem) {
    this.tds.remove(item);
  }
}
