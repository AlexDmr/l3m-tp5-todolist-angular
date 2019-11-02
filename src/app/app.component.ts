import { Component } from '@angular/core';
import {TodoService} from './todo.service';
import {TodoItem, TodoList} from './definitions';
import {Observable} from 'rxjs';
import { List } from 'immutable';

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

  append(label: string) {
    this.tds.append(label);
  }

  delete(item: TodoItem) {
    this.tds.remove(item);
  }

  setDone(item: TodoItem, isDone: boolean) {
    this.tds.updateIsDone(isDone, item);
  }

  setLabel(item: TodoItem, label: string) {
    this.tds.updateLabel(label, item);
  }

  isAllDone(items: List<TodoItem>): boolean {
    return items.reduce( (acc, item) => acc && item.isDone, true);
  }

  setAllDone(done: boolean, items: List<TodoItem>) {
    this.tds.updateIsDone(done, ...items);
  }

}
